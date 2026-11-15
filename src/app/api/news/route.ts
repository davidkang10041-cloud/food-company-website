import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { isAdminRequest, requireAdmin } from "@/lib/auth";
import { DEFAULT_NEWS } from "@/lib/company";

const createSchema = z.object({
  category: z.string().trim().min(1).max(20),
  date: z.string().trim().regex(/^\d{4}\.\d{2}$/, "날짜 형식은 YYYY.MM 입니다."),
  title: z.string().trim().min(2).max(120),
  desc: z.string().trim().min(2).max(300),
  highlight: z.boolean().optional(),
  published: z.boolean().optional(),
});

/** 기본 공지 자동 시딩 — 동시 요청 시 중복 시딩 방지용 인프로세스 뮤텍스 */
let seeding: Promise<void> | null = null;

function ensureSeeded(): Promise<void> {
  if (seeding) return seeding;
  seeding = (async () => {
    const count = await db.newsPost.count();
    if (count === 0) {
      await db.newsPost.createMany({
        data: DEFAULT_NEWS.map((n) => ({
          category: n.category,
          date: n.date,
          title: n.title,
          desc: n.desc,
          highlight: n.highlight ?? false,
          published: true,
        })),
      });
    }
  })().finally(() => {
    seeding = null;
  });
  return seeding;
}

/** 뉴스룸 목록 — 공개는 게시중만, 관리자 세션이면 전체 반환. 비어 있으면 기본 공지 자동 시딩 */
export async function GET() {
  try {
    const admin = await isAdminRequest();
    const where = admin ? undefined : { published: true };

    await ensureSeeded();

    const news = await db.newsPost.findMany({
      where,
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ ok: true, news });
  } catch (error) {
    console.error("[news][GET]", error);
    return NextResponse.json(
      { ok: false, error: "뉴스 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/** 뉴스 등록 (관리자) */
export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const parsed = createSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." },
        { status: 400 }
      );
    }

    const created = await db.newsPost.create({ data: parsed.data });
    return NextResponse.json({ ok: true, news: created }, { status: 201 });
  } catch (error) {
    console.error("[news][POST]", error);
    return NextResponse.json(
      { ok: false, error: "뉴스 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
