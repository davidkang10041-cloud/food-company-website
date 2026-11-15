"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/logo";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "로그인에 실패했습니다.");
        return;
      }
      onSuccess();
    } catch {
      setError("로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-ink px-5">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo variant="light" />
          <p className="text-[14px] font-bold tracking-[0.24em] text-white/50">
            ADMIN CONSOLE
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-7 shadow-2xl md:p-8"
          aria-label="관리자 로그인"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-foreground">
                관리자 로그인
              </h1>
              <p className="mt-0.5 text-[14.5px] text-muted-foreground">
                관리자 비밀번호를 입력해주세요.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            <Label htmlFor="admin-password" className="text-[15px]">
              비밀번호 <span className="text-tomato">*</span>
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-[14.5px] font-semibold text-destructive"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="mt-5 h-12 w-full rounded-full bg-brand text-[16px] font-bold hover:bg-brand-deep"
          >
            {pending ? "확인 중..." : "로그인"}
          </Button>

          <p className="mt-4 text-center text-[14px] text-muted-foreground">
            비밀번호는 서버 환경변수 <code className="font-num">ADMIN_PASSWORD</code>에서
            관리됩니다.
          </p>
        </form>

        <p className="mt-6 text-center">
          <a
            href="/"
            className="text-[14.5px] font-semibold text-white/60 transition-colors hover:text-white"
          >
            ← 홈페이지로 돌아가기
          </a>
        </p>
      </div>
    </div>
  );
}
