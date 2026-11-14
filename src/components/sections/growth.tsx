"use client";

import { motion } from "framer-motion";
import { GROWTH, STRATEGY_PILLARS } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

const MAX = 31; // 억원 기준 최대값

const PILLAR_LABELS: Record<string, string> = {
  맞춤제조: "Manufacturing",
  품질관리: "Quality",
  Price: "Price",
  Trend: "Trend",
  "Data Base": "Data",
};

export function Growth() {
  return (
    <section id="growth" className="bg-white" aria-labelledby="growth-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        {/* Core competency pillars */}
        <SectionHeading
          kicker="Core Competency"
          title={"경쟁력의 원천,\n다섯 가지 핵심 역량"}
          description="산지 소싱부터 품질·가격·트렌드·데이터까지 — 채다원의 경쟁력은 전 과정의 체계적인 관리에서 나옵니다."
        />

        <ol className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-5">
          {STRATEGY_PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.name} delay={i * 0.07} as="li">
              <div className="hover-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white px-6 py-7">
                <span
                  className="pointer-events-none absolute -right-3 -top-5 text-[72px] font-black leading-none text-brand-soft transition-colors duration-500 group-hover:text-brand-line/60"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="relative text-[11px] font-bold tracking-[0.2em] text-tomato">
                  {PILLAR_LABELS[pillar.name] ?? pillar.name.toUpperCase()}
                </p>
                <h3 className="relative mt-2 text-[20px] font-extrabold tracking-tight text-foreground">
                  {pillar.name}
                </h3>
                <ul className="relative mt-4 space-y-2.5">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-[13.5px] leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <span
                  className="relative mt-auto block pt-5"
                  aria-hidden="true"
                >
                  <span className="block h-[3px] w-8 rounded-full bg-brand transition-all duration-500 group-hover:w-16" />
                </span>
              </div>
            </FadeIn>
          ))}
        </ol>

        {/* Growth plan */}
        <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <FadeIn>
              <p className="kicker">Growth Plan</p>
              <h2 className="h-section mt-4 text-foreground">
                5개년 성장 계획
                <span className="mt-1 block text-[0.55em] font-bold tracking-tight text-muted-foreground">
                  2025년 14.8억 → 2029년 31억, 연평균 성장률 +20.3%
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-[0_20px_50px_-30px_rgba(6,25,19,0.2)] md:p-8">
                <div className="flex items-center gap-5 pb-4">
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground/75">
                    <span
                      className="h-2.5 w-2.5 rounded-sm bg-brand"
                      aria-hidden="true"
                    />
                    외형매출 (억원)
                  </span>
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground/75">
                    <span
                      className="h-2.5 w-2.5 rounded-sm bg-tomato"
                      aria-hidden="true"
                    />
                    영업이익 (억원)
                  </span>
                </div>

                <div className="flex h-56 items-end gap-3 border-b-2 border-border pb-0 md:h-72 md:gap-6">
                  {GROWTH.years.map((year, i) => (
                    <div
                      key={year}
                      className="flex h-full flex-1 flex-col justify-end"
                    >
                      <div className="flex h-full items-end justify-center gap-1.5">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{
                            height: `${(GROWTH.revenue[i] / MAX) * 100}%`,
                          }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 1.1,
                            delay: 0.2 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative w-6 rounded-t-md bg-gradient-to-t from-brand to-[#2f8a6d] md:w-9"
                          aria-hidden="true"
                        >
                          <span className="font-num absolute -top-7 left-1/2 -translate-x-1/2 text-[13px] font-extrabold text-brand-deep md:text-sm">
                            {GROWTH.revenue[i]}
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{
                            height: `${(GROWTH.profit[i] / MAX) * 100}%`,
                          }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 1.1,
                            delay: 0.35 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative w-6 rounded-t-md bg-tomato/90 md:w-9"
                          aria-hidden="true"
                        >
                          <span className="font-num absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-bold text-tomato md:text-xs">
                            {GROWTH.profit[i]}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-3 md:gap-6">
                  {GROWTH.years.map((year, i) => (
                    <div key={year} className="flex-1 text-center">
                      <p className="font-num text-sm font-extrabold text-foreground/85 md:text-base">
                        {year}
                      </p>
                      <p className="font-num mt-0.5 text-[11px] font-semibold text-muted-foreground">
                        이익률 {GROWTH.margins[i]}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  * 단위: 억원 · 상기 수치는 PR자료(2025.08) 기준 5개년
                  매출계획 및 추정 손익 전망입니다.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Summary cards */}
          <div className="flex flex-col justify-center gap-4 lg:col-span-4 lg:pt-24">
            {[
              {
                label: "2029 목표 매출",
                value: "31억",
                sub: "외형매출 (2025년 14.8억 → 2.1배)",
              },
              {
                label: "2029 목표 영업이익",
                value: "2,557백만",
                sub: "영업이익률 8.2% 달성",
              },
              {
                label: "연평균 성장률",
                value: "CAGR +20.3%",
                sub: "2025~2029 외형매출 기준",
              },
            ].map((card, i) => (
              <FadeIn key={card.label} delay={0.2 + i * 0.1}>
                <div className="rounded-2xl border border-border bg-brand-mist p-6 transition-colors md:p-7">
                  <p className="text-sm font-bold text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="font-num mt-2 text-3xl font-black tracking-tight text-brand-deep md:text-4xl">
                    {card.value}
                  </p>
                  <p className="mt-2 text-[13px] font-medium text-muted-foreground">
                    {card.sub}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
