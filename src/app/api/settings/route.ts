import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { DEFAULT_SETTINGS, SETTING_FIELDS } from "@/lib/company";

const SETTING_KEYS = SETTING_FIELDS.map((f) => f.key) as unknown as string[];

const putSchema = z.object(
  Object.fromEntries(
    SETTING_KEYS.map((key) => [key, z.string().trim().max(300).optional()])
  )
);

/** 사이트 설정 조회 (공개) — DB 값 + 기본값 병합 */
export async function GET() {
  try {
    const rows = await db.siteSetting.findMany();
    const stored: Record<string, string> = {};
    for (const row of rows) stored[row.key] = row.value;

    const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const key of SETTING_KEYS) {
      if (typeof stored[key] === "string" && stored[key].length > 0) {
        settings[key] = stored[key];
      }
    }

    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    console.error("[settings][GET]", error);
    return NextResponse.json(
      { ok: false, error: "설정 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/** 사이트 설정 저장 (관리자) */
export async function PUT(request: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const body = await request.json().catch(() => null);
    const parsed = putSchema.safeParse(body?.settings ?? body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "입력값을 확인해주세요." },
        { status: 400 }
      );
    }

    const entries = Object.entries(parsed.data).filter(
      (entry): entry is [string, string] =>
        typeof entry[1] === "string" && entry[1].length > 0 && SETTING_KEYS.includes(entry[0])
    );

    for (const [key, value] of entries) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    return NextResponse.json({ ok: true, updated: entries.length });
  } catch (error) {
    console.error("[settings][PUT]", error);
    return NextResponse.json(
      { ok: false, error: "설정 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
