"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Building2,
  History,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  TrendingUp,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type AdminContent,
  type AdminGrowthMetric,
  type AdminHistoryEntry,
  type AdminPartner,
} from "./types";

const MAX_GROWTH = 8;
const MAX_HISTORY = 60;
const MAX_PARTNERS = 20;

const EMPTY_HINT = "항목을 추가하세요. 저장 전까지 홈페이지에는 기본 데이터가 표시됩니다.";

const HISTORY_HINT =
  "연도 기준 내림차순, 월은 2자리 숫자(MM)로 입력하세요. 정렬은 저장 시 자동 처리됩니다.";

function normalizeContent(raw: unknown): AdminContent {
  const obj = (raw ?? {}) as Record<string, unknown>;
  const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
  return {
    growth: arr(obj.growth).map((g) => {
      const item = (g ?? {}) as Record<string, unknown>;
      return { value: String(item.value ?? ""), label: String(item.label ?? "") };
    }),
    history: arr(obj.history).map((h) => {
      const item = (h ?? {}) as Record<string, unknown>;
      const year = Number(item.year);
      return {
        year: Number.isFinite(year) ? year : Number.NaN,
        month: String(item.month ?? ""),
        text: String(item.text ?? ""),
      };
    }),
    partners: arr(obj.partners).map((p) => {
      const item = (p ?? {}) as Record<string, unknown>;
      return { name: String(item.name ?? ""), ko: String(item.ko ?? "") };
    }),
  };
}

function SectionCard({
  icon: Icon,
  title,
  count,
  max,
  hint,
  maxHint,
  onAdd,
  children,
}: {
  icon: typeof TrendingUp;
  title: string;
  count: number;
  max: number;
  hint?: string;
  maxHint: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  const atMax = count >= max;
  return (
    <section className="rounded-2xl border border-brand-line bg-white">
      <div className="flex flex-wrap items-center gap-3 border-b border-brand-line/70 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <h3 className="text-[16px] font-extrabold text-foreground">{title}</h3>
        <span className="font-num rounded-full bg-brand-soft px-2.5 py-0.5 text-[13px] font-bold text-brand">
          {count}
        </span>
        <div className="ml-auto flex items-center gap-2.5">
          {atMax && (
            <span className="text-[13px] text-muted-foreground">{maxHint}</span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            disabled={atMax}
            className="h-9 shrink-0 gap-1 rounded-full border-brand-line px-4 text-[14px] font-bold text-brand hover:bg-brand-soft hover:text-brand-deep"
            aria-label={`${title} 항목 추가`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            항목 추가
          </Button>
        </div>
      </div>
      <div className="px-5 py-4">
        {hint && <p className="mb-3 text-[13.5px] text-muted-foreground">{hint}</p>}
        <div className="thin-scroll max-h-96 overflow-y-auto pr-1">{children}</div>
      </div>
    </section>
  );
}

function RemoveRowButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
      aria-label="행 삭제"
    >
      <X className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}

export function ContentPanel() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [content, setContent] = useState<AdminContent | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setContent(normalizeContent(data?.content ?? data));
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateGrowth = (index: number, patch: Partial<AdminGrowthMetric>) => {
    setContent((c) =>
      c
        ? {
            ...c,
            growth: c.growth.map((row, i) => (i === index ? { ...row, ...patch } : row)),
          }
        : c
    );
  };

  const addGrowth = () => {
    setContent((c) =>
      c && c.growth.length < MAX_GROWTH
        ? { ...c, growth: [...c.growth, { value: "", label: "" }] }
        : c
    );
  };

  const removeGrowth = (index: number) => {
    setContent((c) =>
      c ? { ...c, growth: c.growth.filter((_, i) => i !== index) } : c
    );
  };

  const updateHistory = (index: number, patch: Partial<AdminHistoryEntry>) => {
    setContent((c) =>
      c
        ? {
            ...c,
            history: c.history.map((row, i) => (i === index ? { ...row, ...patch } : row)),
          }
        : c
    );
  };

  const addHistory = () => {
    setContent((c) =>
      c && c.history.length < MAX_HISTORY
        ? { ...c, history: [...c.history, { year: Number.NaN, month: "", text: "" }] }
        : c
    );
  };

  const removeHistory = (index: number) => {
    setContent((c) =>
      c ? { ...c, history: c.history.filter((_, i) => i !== index) } : c
    );
  };

  const updatePartner = (index: number, patch: Partial<AdminPartner>) => {
    setContent((c) =>
      c
        ? {
            ...c,
            partners: c.partners.map((row, i) => (i === index ? { ...row, ...patch } : row)),
          }
        : c
    );
  };

  const addPartner = () => {
    setContent((c) =>
      c && c.partners.length < MAX_PARTNERS
        ? { ...c, partners: [...c.partners, { name: "", ko: "" }] }
        : c
    );
  };

  const removePartner = (index: number) => {
    setContent((c) =>
      c ? { ...c, partners: c.partners.filter((_, i) => i !== index) } : c
    );
  };

  /** 저장 전 클라이언트 검증 + 정렬. 실패 시 null 반환. */
  const buildPayload = (): AdminContent | null => {
    if (!content) return null;
    const growth = content.growth.map((g) => ({
      value: g.value.trim(),
      label: g.label.trim(),
    }));
    const partners = content.partners.map((p) => ({
      name: p.name.trim(),
      ko: p.ko.trim(),
    }));
    const history = content.history.map((h) => ({
      year: h.year,
      month: h.month.trim(),
      text: h.text.trim(),
    }));

    const invalid =
      growth.some((g) => !g.value || !g.label) ||
      partners.some((p) => !p.name || !p.ko) ||
      history.some(
        (h) =>
          !h.text ||
          !/^\d{4}$/.test(String(h.year)) ||
          (h.month !== "" && !/^\d{2}$/.test(h.month))
      );
    if (invalid) return null;

    const sortedHistory = [...history].sort(
      (a, b) => b.year - a.year || b.month.localeCompare(a.month)
    );
    return { growth, history: sortedHistory, partners };
  };

  const save = async () => {
    const payload = buildPayload();
    if (!payload) {
      toast({
        title: "입력값을 확인해 주세요",
        description:
          "비어 있는 항목이 없는지, 연도는 4자리 숫자 · 월은 2자리 숫자(MM)로 입력했는지 확인해주세요.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        toast({ title: "로그인이 필요합니다.", variant: "destructive" });
        return;
      }
      if (!res.ok || !data?.ok) {
        toast({
          title: "저장 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      setContent(payload);
      toast({
        title: "콘텐츠가 저장되었습니다. 홈페이지에 즉시 반영됩니다.",
      });
    } catch {
      toast({
        title: "저장 실패",
        description: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const saveButton = (
    <Button
      onClick={save}
      disabled={saving || loading || error || !content}
      className="h-11 shrink-0 gap-1.5 rounded-full bg-brand px-6 text-[15px] font-bold hover:bg-brand-deep"
    >
      {saving ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Save className="h-4 w-4" aria-hidden="true" />
      )}
      {saving ? "저장 중..." : "변경 사항 저장"}
    </Button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-brand-line bg-white py-24 text-[15px] text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        콘텐츠를 불러오는 중...
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-line bg-white py-24 text-center">
        <AlertCircle className="h-8 w-8 text-tomato" aria-hidden="true" />
        <p className="text-[15px] font-semibold text-muted-foreground">
          콘텐츠를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <Button
          variant="outline"
          onClick={() => load()}
          className="h-11 gap-1.5 rounded-full border-brand-line px-6 text-[15px] font-bold text-brand hover:bg-brand-soft hover:text-brand-deep"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Panel header + top save button */}
      <div className="flex flex-col gap-3 rounded-2xl border border-brand-line bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h2 className="text-[17px] font-extrabold text-foreground">
            홈페이지 콘텐츠 편집
          </h2>
          <p className="mt-0.5 text-[14px] text-muted-foreground">
            성과지표 <span className="font-num font-bold text-foreground">{content.growth.length}</span>
            개 · 연혁 <span className="font-num font-bold text-foreground">{content.history.length}</span>
            개 · 파트너사 <span className="font-num font-bold text-foreground">{content.partners.length}</span>
            개 — 저장 전까지 홈페이지에는 변경 사항이 반영되지 않습니다.
          </p>
        </div>
        {saveButton}
      </div>

      {/* 성과 지표 */}
      <SectionCard
        icon={TrendingUp}
        title="성과 지표"
        count={content.growth.length}
        max={MAX_GROWTH}
        maxHint={`최대 ${MAX_GROWTH}개까지 추가할 수 있습니다.`}
        onAdd={addGrowth}
      >
        {content.growth.length === 0 ? (
          <p className="py-8 text-center text-[14.5px] text-muted-foreground">{EMPTY_HINT}</p>
        ) : (
          <ul className="space-y-2.5">
            {content.growth.map((row, i) => (
              <li key={`growth-${i}`} className="flex items-center gap-2">
                <Input
                  value={row.value}
                  onChange={(e) => updateGrowth(i, { value: e.target.value })}
                  placeholder="16,000+"
                  className="font-num h-10 w-32 shrink-0 text-[15px]"
                  aria-label={`성과 지표 ${i + 1} 수치`}
                />
                <Input
                  value={row.label}
                  onChange={(e) => updateGrowth(i, { label: e.target.value })}
                  placeholder="이용 고객사"
                  className="h-10 min-w-0 flex-1 text-[15px]"
                  aria-label={`성과 지표 ${i + 1} 설명`}
                />
                <RemoveRowButton onClick={() => removeGrowth(i)} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* 연혁 */}
      <SectionCard
        icon={History}
        title="연혁"
        count={content.history.length}
        max={MAX_HISTORY}
        hint={HISTORY_HINT}
        maxHint={`최대 ${MAX_HISTORY}개까지 추가할 수 있습니다.`}
        onAdd={addHistory}
      >
        {content.history.length === 0 ? (
          <p className="py-8 text-center text-[14.5px] text-muted-foreground">{EMPTY_HINT}</p>
        ) : (
          <ul className="space-y-2.5">
            {content.history.map((row, i) => (
              <li key={`history-${i}`} className="flex items-center gap-2">
                <Input
                  type="number"
                  value={Number.isNaN(row.year) ? "" : String(row.year)}
                  onChange={(e) =>
                    updateHistory(i, {
                      year: e.target.value === "" ? Number.NaN : Number(e.target.value),
                    })
                  }
                  placeholder="2025"
                  className="font-num h-10 w-24 shrink-0 text-[15px]"
                  aria-label={`연혁 ${i + 1} 연도`}
                />
                <Input
                  value={row.month}
                  onChange={(e) => updateHistory(i, { month: e.target.value })}
                  placeholder="02"
                  className="font-num h-10 w-16 shrink-0 text-[15px]"
                  aria-label={`연혁 ${i + 1} 월`}
                />
                <Input
                  value={row.text}
                  onChange={(e) => updateHistory(i, { text: e.target.value })}
                  placeholder="GS25편의점 식자재공급"
                  className="h-10 min-w-0 flex-1 text-[15px]"
                  aria-label={`연혁 ${i + 1} 내용`}
                />
                <RemoveRowButton onClick={() => removeHistory(i)} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* 파트너사 */}
      <SectionCard
        icon={Building2}
        title="파트너사"
        count={content.partners.length}
        max={MAX_PARTNERS}
        maxHint={`최대 ${MAX_PARTNERS}개까지 추가할 수 있습니다.`}
        onAdd={addPartner}
      >
        {content.partners.length === 0 ? (
          <p className="py-8 text-center text-[14.5px] text-muted-foreground">{EMPTY_HINT}</p>
        ) : (
          <ul className="space-y-2.5">
            {content.partners.map((row, i) => (
              <li key={`partner-${i}`} className="flex items-center gap-2">
                <Input
                  value={row.name}
                  onChange={(e) => updatePartner(i, { name: e.target.value })}
                  placeholder="KOREAN AIR"
                  className="h-10 min-w-0 flex-1 text-[15px]"
                  aria-label={`파트너사 ${i + 1} 영문명`}
                />
                <Input
                  value={row.ko}
                  onChange={(e) => updatePartner(i, { ko: e.target.value })}
                  placeholder="대한항공"
                  className="h-10 min-w-0 flex-1 text-[15px]"
                  aria-label={`파트너사 ${i + 1} 국문명`}
                />
                <RemoveRowButton onClick={() => removePartner(i)} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* Bottom save button */}
      <div className="flex justify-end">
        {saveButton}
      </div>
    </div>
  );
}
