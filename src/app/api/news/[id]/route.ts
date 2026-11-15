import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const updateSchema = z.object({
  category: z.string().trim().min(1).max(20).optional(),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}\.\d{2}$/, "날짜 형식은 YYYY.MM 입니다.")
    .optional(),
  title: z.string().trim().min(2).max(120).optional(),
  desc: z.string().trim().min(2).max(300).optional(),
  highlight: z.boolean().optional(),
  published: z.boolean().optional(),
});

type Params = { params: Promise<{ id: string }> };

/** 뉴스 수정 (관리자) */
export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const { id } = await params;
    const parsed = updateSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." },
        { status: 400 }
      );
    }
    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { ok: false, error: "수정할 내용이 없습니다." },
        { status: 400 }
      );
    }

    const existing = await db.newsPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "해당 공지사항을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updated = await db.newsPost.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ ok: true, news: updated });
  } catch (error) {
    console.error("[news][PATCH]", error);
    return NextResponse.json(
      { ok: false, error: "뉴스 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/** 뉴스 삭제 (관리자) */
export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const { id } = await params;
    const existing = await db.newsPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "해당 공지사항을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    await db.newsPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[news][DELETE]", error);
    return NextResponse.json(
      { ok: false, error: "뉴스 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
