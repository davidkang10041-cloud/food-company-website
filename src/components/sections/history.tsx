"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { HISTORY } from "@/lib/company";

const YEAR_SUMMARIES = [
  "GS25 편의점 식자재 공급으로 대기업 유통 채널을 한 단계 넓힌 해입니다.",
  "HACCP 인증 확대와 GS수퍼 공급으로 유통·제조 역량을 함께 키웠습니다.",
  "성남 제2공장 신설과 HACCP 인증 3건 획득으로 생산 인프라를 크게 확장했습니다.",
  "본사 이전과 자본금 증자, 밀키트 공급까지 — 사업 기반을 탄탄히 다진 해입니다.",
  "대한항공 케이터링 공급으로 항공 식자재 전문성을 입증했습니다.",
  "법인 설립과 함께 양대 항공사 케이터링 공급으로 첫발을 내디뎠습니다.",
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function History() {
  const [active, setActive] = useState(0);
  const current = HISTORY[active];

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

        {/* Year selector */}
        <FadeIn delay={0.08} className="mt-12 md:mt-14">
          <div className="flex flex-wrap gap-2" role="group" aria-label="연도 선택">
            {HISTORY.map((h, i) => {
              const isActive = i === active;
              return (
                <button
                  key={h.year}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "rounded-full border border-brand bg-brand px-6 py-3 text-[16px] font-bold text-white shadow-lg shadow-brand/25 transition-all duration-300 md:px-7 md:text-[17px]"
                      : "rounded-full border border-brand-line bg-white px-6 py-3 text-[16px] font-bold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand md:px-7 md:text-[17px]"
                  }
                >
                  <span className="font-num tracking-tight">{h.year}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Year detail panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-6 grid gap-4 md:mt-8 md:gap-5 lg:grid-cols-[360px_1fr]"
        >
          {/* Year summary card */}
          <div className="relative overflow-hidden rounded-[28px] border border-brand-line bg-white p-7 md:p-9">
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
              {YEAR_SUMMARIES[active]}
            </p>
            <div className="relative mt-7 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-soft px-4 py-2 text-[15px] font-bold text-brand">
                주요 성과 {current.items.length}건
              </span>
              {active === 0 && (
                <span className="rounded-full bg-brand px-4 py-2 text-[15px] font-bold text-white">
                  NOW
                </span>
              )}
            </div>
          </div>

          {/* Milestone list */}
          <div className="flex flex-col justify-center rounded-[28px] border border-brand-line bg-white p-3 md:p-5">
            <ol>
              {current.items.map((item, i) => (
                <motion.li
                  key={`${current.year}-${item.month}-${item.text}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                  className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors duration-300 hover:bg-brand-mist md:px-4 md:py-4"
                >
                  <span className="font-num flex min-w-[72px] shrink-0 items-center justify-center rounded-xl bg-brand-soft px-3 py-2 text-[15px] font-extrabold text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    {item.month}월
                  </span>
                  <span className="flex-1 text-[16px] font-semibold leading-relaxed text-foreground/85 md:text-[16.5px]">
                    {item.text}
                  </span>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
