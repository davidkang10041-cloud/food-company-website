import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * 관리자 세션 — HMAC 서명 토큰을 httpOnly 쿠키로 발급/검증한다.
 * (외부 라이브러리 없이 동작하는 경량 인증)
 */

export const ADMIN_COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7일

function secret(): string {
  return process.env.ADMIN_SECRET || "chedawon-admin-secret-key";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "chedawon2025";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  return `${exp}.${sign(String(exp))}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!expStr || !exp || !sig) return false;
  if (Date.now() > exp) return false;
  const expected = sign(expStr);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** 요청의 쿠키로 관리자 인증 여부를 확인한다. */
export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** 관리자 전용 API 보호용 — 인증 실패 시 401 응답, 통과 시 null 반환 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const ok = await isAdminRequest();
  if (ok) return null;
  return NextResponse.json(
    { ok: false, error: "관리자 로그인이 필요합니다." },
    { status: 401 }
  );
}

export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
