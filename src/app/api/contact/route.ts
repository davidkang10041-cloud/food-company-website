import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().trim().min(1, "성함을 입력해주세요.").max(50),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, "연락처를 정확히 입력해주세요.")
    .max(30),
  message: z.string().trim().min(5, "문의 내용을 5자 이상 입력해주세요.").max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "입력값을 확인해주세요.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, company, phone, message } = parsed.data;

    await db.contactMessage.create({
      data: {
        name,
        company: company || null,
        phone,
        message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed to save message:", error);
    return NextResponse.json(
      { ok: false, error: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
