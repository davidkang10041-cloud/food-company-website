import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  DEFAULT_GROWTH_METRICS,
  DEFAULT_HISTORY,
  DEFAULT_PARTNERS,
} from "@/lib/company";

/** 콘텐츠 조회 (공개) — 성과지표 · 연혁 · 파트너사, DB 값 우선 / 비어 있으면 기본값 */
export async function GET() {
  try {
    const [growthRows, historyRows, partnerRows] = await Promise.all([
      db.growthMetric.findMany({ orderBy: { sort: "asc" } }),
      db.historyEntry.findMany({ orderBy: { sort: "asc" } }),
      db.partnerEntry.findMany({ orderBy: { sort: "asc" } }),
    ]);

    return NextResponse.json({
      ok: true,
      growth: growthRows.length
        ? growthRows.map((r) => ({ value: r.value, label: r.label }))
        : DEFAULT_GROWTH_METRICS,
      history: historyRows.length
        ? historyRows.map((r) => ({ year: r.year, month: r.month, text: r.text }))
        : DEFAULT_HISTORY,
      partners: partnerRows.length
        ? partnerRows.map((r) => ({ name: r.name, ko: r.ko }))
        : DEFAULT_PARTNERS,
    });
  } catch (error) {
    console.error("[content][GET]", error);
    return NextResponse.json(
      { ok: false, error: "콘텐츠 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

const contentSchema = z.object({
  growth: z
    .array(
      z.object({
        value: z.string().trim().min(1).max(40),
        label: z.string().trim().min(1).max(60),
      })
    )
    .max(20)
    .optional(),
  history: z
    .array(
      z.object({
        year: z.number().int().min(1990).max(2100),
        month: z.string().regex(/^\d{2}$/).or(z.literal("")),
        text: z.string().trim().min(1).max(120),
      })
    )
    .max(60)
    .optional(),
  partners: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(60),
        ko: z.string().trim().min(1).max(60),
      })
    )
    .max(20)
    .optional(),
});

/** 콘텐츠 저장 (관리자) — 제공된 컬렉션만 전체 교체 */
export async function PUT(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const parsed = contentSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "입력값을 확인해주세요." },
        { status: 400 }
      );
    }

    const { growth, history, partners } = parsed.data;
    let updatedGrowth = 0;
    let updatedHistory = 0;
    let updatedPartners = 0;

    if (growth) {
      await db.growthMetric.deleteMany({});
      await db.growthMetric.createMany({
        data: growth.map((r, i) => ({ value: r.value, label: r.label, sort: i })),
      });
      updatedGrowth = growth.length;
    }

    if (history) {
      await db.historyEntry.deleteMany({});
      await db.historyEntry.createMany({
        data: history.map((r, i) => ({
          year: r.year,
          month: r.month,
          text: r.text,
          sort: i,
        })),
      });
      updatedHistory = history.length;
    }

    if (partners) {
      await db.partnerEntry.deleteMany({});
      await db.partnerEntry.createMany({
        data: partners.map((r, i) => ({ name: r.name, ko: r.ko, sort: i })),
      });
      updatedPartners = partners.length;
    }

    return NextResponse.json({
      ok: true,
      updated: {
        growth: updatedGrowth,
        history: updatedHistory,
        partners: updatedPartners,
      },
    });
  } catch (error) {
    console.error("[content][PUT]", error);
    return NextResponse.json(
      { ok: false, error: "콘텐츠 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
