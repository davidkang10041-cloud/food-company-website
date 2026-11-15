import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

/** 문의 목록 (관리자) — 최신순 */
export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    const counts = {
      total: messages.length,
      new: messages.filter((m) => m.status === "NEW").length,
      inProgress: messages.filter((m) => m.status === "IN_PROGRESS").length,
      done: messages.filter((m) => m.status === "DONE").length,
    };
    return NextResponse.json({ ok: true, messages, counts });
  } catch (error) {
    console.error("[messages][GET]", error);
    return NextResponse.json(
      { ok: false, error: "문의 목록 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
