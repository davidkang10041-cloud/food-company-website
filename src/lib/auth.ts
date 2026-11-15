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

/* ------------------------------------------------------------------ */
/*  로그인 시도 제한 (brute-force 방지)                                 */
/*  - 메모리 기반: 프로세스 재시작 시 초기화 (경량 서버 운영 환경 전제)   */
/*  - 연속 5회 실패 시 5분 잠금                                         */
/* ------------------------------------------------------------------ */

const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000; // 5분

const attemptStore: Map<string, { count: number; lockedUntil: number; firstAt: number }> =
  new Map();

function clientKey(request: Request): string {
  const fwd =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  return fwd;
}

function cleanupExpired() {
  const now = Date.now();
  for (const [key, entry] of attemptStore) {
    if (
      entry.lockedUntil < now &&
      now - entry.firstAt > LOCK_MS &&
      entry.count < MAX_ATTEMPTS
    ) {
      attemptStore.delete(key);
    }
  }
}

export type LoginGateResult =
  | { allowed: true }
  | { allowed: false; retryAfterSec: number; remaining: number };

/** 로그인 시도가 허용되는지 확인 (잠금 상태면 차단) */
export function loginGate(request: Request): LoginGateResult {
  cleanupExpired();
  const key = clientKey(request);
  const entry = attemptStore.get(key);
  const now = Date.now();

  if (!entry) return { allowed: true };

  if (entry.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.lockedUntil - now) / 1000),
      remaining: 0,
    };
  }
  return { allowed: true };
}

/** 실패 기록 — MAX_ATTEMPTS 도달 시 잠금 */
export function recordLoginFailure(request: Request): {
  locked: boolean;
  remaining: number;
} {
  const key = clientKey(request);
  const now = Date.now();
  const entry = attemptStore.get(key);

  if (!entry || now - entry.firstAt > LOCK_MS) {
    attemptStore.set(key, { count: 1, lockedUntil: 0, firstAt: now });
    return { locked: false, remaining: MAX_ATTEMPTS - 1 };
  }

  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCK_MS;
    attemptStore.set(key, entry);
    return { locked: true, remaining: 0 };
  }
  return { locked: false, remaining: MAX_ATTEMPTS - entry.count };
}

/** 성공 시 기록 초기화 */
export function clearLoginFailures(request: Request): void {
  attemptStore.delete(clientKey(request));
}
