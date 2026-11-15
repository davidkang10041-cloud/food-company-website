import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminPassword,
  clearLoginFailures,
  createSessionToken,
  loginGate,
  recordLoginFailure,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    // 시도 제한 확인 — 잠금 상태면 429 반환
    const gate = loginGate(request);
    if (!gate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `로그인 시도가 제한되었습니다. ${Math.ceil(gate.retryAfterSec / 60)}분 후 다시 시도해주세요.`,
        },
        { status: 429 }
      );
    }

    if (!password || password !== adminPassword()) {
      const result = recordLoginFailure(request);
      if (result.locked) {
        return NextResponse.json(
          {
            ok: false,
            error: `비밀번호를 연속으로 잘못 입력했습니다. 5분간 로그인이 잠깁니다.`,
          },
          { status: 429 }
        );
      }
      return NextResponse.json(
        {
          ok: false,
          error:
            result.remaining <= 2
              ? `비밀번호가 올바르지 않습니다. (남은 시도 ${result.remaining}회)`
              : "비밀번호가 올바르지 않습니다.",
        },
        { status: 401 }
      );
    }

    clearLoginFailures(request);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(
      ADMIN_COOKIE,
      createSessionToken(),
      sessionCookieOptions(60 * 60 * 24 * 7)
    );
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
