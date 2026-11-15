import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "DONE"]),
});

type Params = { params: Promise<{ id: string }> };

/** 문의 상태 변경 (관리자) */
export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const { id } = await params;
    const parsed = patchSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "상태값이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const existing = await db.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "해당 문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ ok: true, message: updated });
  } catch (error) {
    console.error("[messages][PATCH]", error);
    return NextResponse.json(
      { ok: false, error: "문의 상태 변경 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/** 문의 삭제 (관리자) */
export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const { id } = await params;
    const existing = await db.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "해당 문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[messages][DELETE]", error);
    return NextResponse.json(
      { ok: false, error: "문의 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
