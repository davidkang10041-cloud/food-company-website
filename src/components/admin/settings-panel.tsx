"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SETTING_FIELDS, DEFAULT_SETTINGS, type SiteSettingsMap } from "@/lib/company";

type SettingsPanelProps = {
  settings: SiteSettingsMap;
  onSaved: () => Promise<void>;
};

const MULTILINE_KEYS = new Set(["address", "business", "slogan"]);

export function SettingsPanel({ settings, onSaved }: SettingsPanelProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<SiteSettingsMap>(() => settings ?? DEFAULT_SETTINGS);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!settings) return;
    // props 동기화 — 다음 틱으로 위임해 동기 setState 연쇄를 방지
    const t = setTimeout(() => setForm(settings), 0);
    return () => clearTimeout(t);
  }, [settings]);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async () => {
    setPending(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: form }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "저장 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "사이트 설정이 저장되었습니다.",
        description: "헤더 · 푸터 · 문의 섹션에 즉시 반영됩니다.",
      });
      await onSaved();
    } catch {
      toast({
        title: "저장 실패",
        description: "네트워크 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border-brand-line">
        <CardContent className="grid gap-5 p-6 md:grid-cols-2 md:p-7">
          {SETTING_FIELDS.map((field) => {
            const multiline = MULTILINE_KEYS.has(field.key);
            const commonProps = {
              id: `setting-${field.key}`,
              value: form[field.key] ?? "",
              onChange: (
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => update(field.key, e.target.value),
            };
            return (
              <div
                key={field.key}
                className={multiline ? "grid gap-2 md:col-span-2" : "grid gap-2"}
              >
                <Label htmlFor={field.key} className="text-[15px]">
                  {field.label}
                </Label>
                {multiline ? (
                  <Textarea {...commonProps} rows={2} />
                ) : (
                  <Input {...commonProps} />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-line bg-white p-5 md:flex-row md:items-center">
        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          저장하면 홈페이지 헤더(대표전화), 푸터(상호·대표이사·주소·전화),
          문의 섹션(전화·주소·사업분야)에 즉시 반영됩니다.
        </p>
        <Button
          onClick={submit}
          disabled={pending}
          className="h-12 w-full shrink-0 gap-2 rounded-full bg-brand px-7 text-[15.5px] font-bold hover:bg-brand-deep md:w-auto"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="h-4 w-4" aria-hidden="true" />
          )}
          {pending ? "저장 중..." : "설정 저장"}
        </Button>
      </div>
    </div>
  );
}
