"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import {
  DEFAULT_HISTORY,
  type HistoryEntryItem,
} from "@/lib/company";

type HistoryYear = { year: number; items: { month: string; text: string }[] };

/** 평면 연혁 데이터를 연도별 그룹으로 변환 (연도 내림차순, 월 내림차순) */
function groupHistory(entries: HistoryEntryItem[]): HistoryYear[] {
  const map = new Map<number, { month: string; text: string }[]>();
  for (const entry of entries) {
    if (!map.has(entry.year)) map.set(entry.year, []);
    map.get(entry.year)?.push({ month: entry.month, text: entry.text });
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => b.month.localeCompare(a.month)),
    }));
}

const YEAR_SUMMARIES = [
  "GS25 편의점 식자재 공급으로 대기업 유통 채널을 한 단계 넓힌 해입니다.",
  "HACCP 인증 확대와 GS수퍼 공급으로 유통·제조 역량을 함께 키웠습니다.",
  "성남 제2공장 신설과 HACCP 인증 3건 획득으로 생산 인프라를 크게 확장했습니다.",
  "본사 이전과 자본금 증자, 밀키트 공급까지 — 사업 기반을 탄탄히 다진 해입니다.",
  "대한항공 케이터링 공급으로 항공 식자재 전문성을 입증했습니다.",
  "법인 설립과 함께 양대 항공사 케이터링 공급으로 첫발을 내디뎠습니다.",
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function milestoneTag(text: string): { label: string; className: string } {
  if (text.includes("법인설립"))
    return { label: "출범", className: "bg-tomato/10 text-tomato" };
  if (text.includes("HACCP"))
    return { label: "HACCP 인증", className: "bg-[#c9a96a]/15 text-[#8a6f3c]" };
  if (text.includes("공급"))
    return { label: "신규 공급", className: "bg-brand text-white" };
  if (/(신설|이전|증자|설립)/.test(text))
    return {
      label: "인프라 확장",
      className: "border border-brand-line bg-white text-brand-deep",
    };
  return {
    label: "성장",
    className: "border border-brand-line bg-white text-muted-foreground",
  };
}

export function History() {
  // 관리자 콘텐츠 관리(/admin → 콘텐츠 관리)에서 저장한 연혁을 반영.
  const [history, setHistory] = useState<HistoryYear[]>(() => groupHistory(DEFAULT_HISTORY));
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.ok && Array.isArray(data.history) && data.history.length > 0) {
          setHistory(groupHistory(data.history));
        }
      })
      .catch(() => {
        // 실패 시 기본 데이터 유지
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const current = history[active] ?? history[0];
  const yearSummary = YEAR_SUMMARIES[active] ?? "해당 연도의 주요 성과를 확인하실 수 있습니다.";

  return (
    <section
      id="history"
      className="relative overflow-hidden bg-brand-mist py-24 md:py-32"
      aria-label="회사 연혁"
    >
      {/* Soft organic accents */}
      <div
        className="pointer-events-none absolute -right-28 top-8 h-[400px] w-[400px] rounded-full bg-[#f6efe2] opacity-60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-36 bottom-10 h-[360px] w-[360px] rounded-full bg-brand-soft opacity-70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="HISTORY"
          title={"항공 케이터링에서 시작해\n대기업 유통 채널로"}
          description="2017년 법인 설립 이후, 검증된 품질로 공급처를 넓혀왔습니다. 연도를 선택하면 해당 해의 주요 성과를 확인할 수 있습니다."
        />

        {/* Year selector — pills (tablet & mobile) */}
        <FadeIn delay={0.08} className="mt-12 lg:hidden">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="연도 선택"
          >
            {history.map((h, i) => {
              const isActive = i === active;
              return (
                <button
                  key={h.year}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-6 py-3 text-[16px] font-bold transition-all duration-300 md:px-7 md:text-[17px]",
                    isActive
                      ? "border-brand bg-brand text-white shadow-lg shadow-brand/25"
                      : "border-brand-line bg-white text-muted-foreground hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                  )}
                >
                  <span className="font-num tracking-tight">{h.year}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-[300px_1fr] lg:gap-14">
          {/* Vertical year rail (desktop) */}
          <FadeIn delay={0.12} className="hidden lg:block">
            <nav className="relative" aria-label="연도 내비게이션">
              <span
                className="absolute bottom-6 left-[7px] top-6 w-px bg-brand-line"
                aria-hidden="true"
              />
              {history.map((h, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={h.year}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex w-full items-center gap-3.5 py-3 pl-10 text-left transition-transform duration-300 hover:translate-x-1 xl:gap-4"
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-[15px] w-[15px] -translate-y-1/2 rounded-full border-2 bg-white transition-all duration-300",
                        isActive
                          ? "border-brand bg-brand shadow-[0_0_0_5px_rgba(14,95,76,0.14)]"
                          : "border-brand-line group-hover:border-brand/60"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "font-num text-[24px] font-extrabold tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-brand-deep"
                          : "text-foreground/25 group-hover:text-brand/70"
                      )}
                    >
                      {h.year}
                    </span>
                    {i === 0 && (
                      <span className="rounded-full bg-tomato px-2.5 py-1 text-[13px] font-bold tracking-wide text-white">
                        NOW
                      </span>
                    )}
                    {isActive && (
                      <span className="ml-auto rounded-full bg-brand-soft px-3.5 py-1.5 text-[14px] font-bold text-brand">
                        성과 {h.items.length}건
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </FadeIn>

          {/* Year detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="min-w-0"
          >
            <div className="overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-[0_32px_70px_-42px_rgba(6,25,19,0.25)]">
              {/* Header: year + summary */}
              <div className="relative overflow-hidden p-7 md:p-9">
                <span
                  className="ghost-num pointer-events-none absolute -bottom-5 -right-1 font-num text-[120px] md:text-[150px]"
                  aria-hidden="true"
                >
                  {current.year}
                </span>
                <p className="relative text-[15px] font-bold tracking-[0.22em] text-brand">
                  MILESTONES
                </p>
                <p className="font-num relative mt-4 text-[56px] font-extrabold leading-none tracking-tight text-brand-deep md:text-[68px]">
                  {current.year}
                </p>
                <p className="relative mt-5 text-[16px] leading-relaxed text-muted-foreground">
                  {yearSummary}
                </p>
                <div className="relative mt-7 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-soft px-4 py-2 text-[15px] font-bold text-brand">
                    주요 성과 {current.items.length}건
                  </span>
                  {active === 0 && (
                    <span className="rounded-full bg-tomato px-4 py-2 text-[15px] font-bold text-white">
                      NOW
                    </span>
                  )}
                </div>
              </div>

              {/* Milestone mini-timeline */}
              <div className="border-t border-brand-line/70 bg-brand-mist/50 p-3 md:p-5">
                <ol className="relative">
                  <span
                    className="absolute bottom-7 left-[47px] top-7 w-px bg-brand-line"
                    aria-hidden="true"
                  />
                  {current.items.map((item, i) => {
                    const tag = milestoneTag(item.text);
                    return (
                      <motion.li
                        key={`${current.year}-${item.month}-${item.text}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + i * 0.07,
                          ease: EASE,
                        }}
                        className="group flex items-center gap-3.5 rounded-2xl px-3 py-3.5 transition-colors duration-300 hover:bg-white md:gap-4 md:px-4"
                      >
                        <span className="font-num relative z-10 flex min-w-[68px] shrink-0 items-center justify-center rounded-xl bg-brand-soft px-3 py-2 text-[15px] font-extrabold text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white md:min-w-[72px]">
                          {item.month}월
                        </span>
                        <span className="min-w-0 flex-1 text-[16px] font-semibold leading-relaxed text-foreground/85 md:text-[16.5px]">
                          {item.text}
                        </span>
                        <span
                          className={cn(
                            "hidden shrink-0 rounded-full px-3 py-1.5 text-[14px] font-bold sm:inline-flex",
                            tag.className
                          )}
                        >
                          {tag.label}
                        </span>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
