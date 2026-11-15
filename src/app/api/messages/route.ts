import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const bulkPatchSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(500),
  status: z.enum(["NEW", "IN_PROGRESS", "DONE"]),
});

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

/** 문의 상태 일괄 변경 (관리자) */
export async function PATCH(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const parsed = bulkPatchSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "입력값이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const result = await db.contactMessage.updateMany({
      where: { id: { in: parsed.data.ids } },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ ok: true, updated: result.count });
  } catch (error) {
    console.error("[messages][bulk][PATCH]", error);
    return NextResponse.json(
      { ok: false, error: "문의 변경 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
