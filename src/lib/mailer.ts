import nodemailer from "nodemailer";

export type MailResult = { sent: boolean; reason?: string };

type InquiryPayload = {
  name: string;
  company?: string | null;
  phone: string;
  email?: string | null;
  inquiryType: string;
  message: string;
  createdAt?: Date;
};

/**
 * 새 문의 접수 알림 메일 — 관리자 계정으로 발송.
 * 요청 응답에 영향을 주지 않도록 fire-and-forget으로 호출되며,
 * 미설정/실패 시 절대 예외를 던지지 않는다.
 */
export async function notifyNewInquiry(msg: InquiryPayload): Promise<MailResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.ADMIN_NOTIFY_EMAIL;

  if (!host || !user || !pass || !to) {
    console.info("[mailer] SMTP not configured — inquiry notification skipped");
    return { sent: false, reason: "not_configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const receivedAt = (msg.createdAt ?? new Date()).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    const text = [
      "홈페이지에서 새 문의가 접수되었습니다.",
      "",
      `접수일시: ${receivedAt}`,
      `문의유형: ${msg.inquiryType}`,
      `성명: ${msg.name}`,
      `회사: ${msg.company || "-"}`,
      `연락처: ${msg.phone}`,
      `이메일: ${msg.email || "-"}`,
      "",
      "[문의내용]",
      msg.message,
      "",
      "— 채다원 홈페이지 자동 알림",
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      subject: `[채다원 홈페이지] 새 문의 접수 — ${msg.inquiryType} / ${msg.name}님`,
      text,
    });

    return { sent: true };
  } catch (error) {
    console.error("[mailer] send failed:", error);
    return { sent: false, reason: String(error) };
  }
}
