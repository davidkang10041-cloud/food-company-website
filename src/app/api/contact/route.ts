import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { notifyNewInquiry } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(1, "성함을 입력해주세요.").max(50),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, "연락처를 정확히 입력해주세요.")
    .max(30),
  email: z
    .string()
    .trim()
    .email("이메일 형식이 올바르지 않습니다.")
    .max(120)
    .optional()
    .or(z.literal("")),
  inquiryType: z
    .enum(["식자재 공급", "OEM·ODM 제조", "MEALBOX25·밀키트", "기타"])
    .default("기타"),
  message: z.string().trim().min(5, "문의 내용을 5자 이상 입력해주세요.").max(2000),
  // honeypot — 숨은 필드, 사람이 채우면 스팸으로 간주
  website: z.string().max(200).optional(),
});

/* --------------------- IP 기반 간이 rate limit (메모리) --------------------- */

const WINDOW_MS = 10 * 60 * 1000; // 10분
const MAX_PER_WINDOW = 5;

const hitStore: Map<string, number[]> = new Map();

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** 윈도우 내 기록을 정리하고, 한도 초과 여부를 반환 (미초과 시 이번 요청 기록) */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (hitStore.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    hitStore.set(ip, hits);
    return true;
  }
  hits.push(now);
  hitStore.set(ip, hits);
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // honeypot: 숨은 필드가 채워져 있으면 봇으로 간주 — 저장 없이 조용히 성공 응답
    if (typeof body?.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (rateLimited(clientIp(request))) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "문의 접수가 일시적으로 제한되었습니다. 급한 문의는 032-752-7227로 전화주세요.",
        },
        { status: 429 }
      );
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "입력값을 확인해주세요.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, company, phone, email, inquiryType, message } = parsed.data;

    await db.contactMessage.create({
      data: {
        name,
        company: company || null,
        phone,
        email: email || null,
        inquiryType,
        message,
      },
    });

    // 메일 발송은 요청 응답을 지연시키지 않도록 fire-and-forget (실패해도 무시)
    void notifyNewInquiry({
      name,
      company,
      phone,
      email,
      inquiryType,
      message,
      createdAt: new Date(),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed to save message:", error);
    return NextResponse.json(
      { ok: false, error: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
