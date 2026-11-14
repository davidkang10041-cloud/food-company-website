"use client";

import { motion } from "framer-motion";
import { GROWTH } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

const MAX = 31; // 억원 기준 최대값

export function Growth() {
  return (
    <section id="growth" className="py-24 md:py-32" aria-labelledby="growth-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              kicker="Growth Plan"
              title="5개년 매출계획"
              description="2025년 14.8억 원에서 2029년 31억 원까지, 식자재 유통·제조·신규사업의 균형 성장을 계획하고 있습니다."
            />

            <FadeIn delay={0.15}>
              <div className="mt-12 rounded-2xl border border-brand-line/70 bg-white p-6 md:p-8">
                <div className="flex items-center gap-5 pb-4">
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground/75">
                    <span className="h-2.5 w-2.5 rounded-sm bg-brand" aria-hidden="true" />
                    외형매출 (억원)
                  </span>
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground/75">
                    <span className="h-2.5 w-2.5 rounded-sm bg-tomato" aria-hidden="true" />
                    영업이익 (억원)
                  </span>
                </div>

                <div className="flex h-64 items-end gap-3 border-b-2 border-brand-line/70 pb-0 md:h-72 md:gap-6">
                  {GROWTH.years.map((year, i) => (
                    <div
                      key={year}
                      className="flex h-full flex-1 flex-col justify-end gap-0"
                    >
                      <div className="flex h-full items-end justify-center gap-1.5">
                        {/* Revenue bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(GROWTH.revenue[i] / MAX) * 100}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="relative w-6 rounded-t-md bg-gradient-to-t from-brand to-[#2f8a6d] md:w-8"
                          aria-hidden="true"
                        >
                          <span className="font-num absolute -top-7 left-1/2 -translate-x-1/2 text-[13px] font-extrabold text-brand-deep md:text-sm">
                            {GROWTH.revenue[i]}
                          </span>
                        </motion.div>
                        {/* Profit bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(GROWTH.profit[i] / MAX) * 100}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1.1, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="relative w-6 rounded-t-md bg-tomato/90 md:w-8"
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

                <p className="mt-6 border-t border-brand-line/60 pt-4 text-xs leading-relaxed text-muted-foreground">
                  * 단위: 억원 · 상기 수치는 PR자료(2025.08) 기준 5개년 매출계획 및 추정
                  손익 전망입니다. (2029년 목표: 매출 31억, 영업이익 2,557백만)
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Summary cards */}
          <div className="flex flex-col gap-4 lg:col-span-4 lg:pt-16">
            {[
              { label: "2029 목표 매출", value: "31억", sub: "외형매출 (2025년 14.8억 → 2.1배)" },
              { label: "2029 목표 영업이익", value: "2,557백만", sub: "영업이익률 8.2% 달성" },
              { label: "연평균 성장률", value: "CAGR +20.3%", sub: "2025~2029 외형매출 기준" },
            ].map((card, i) => (
              <FadeIn key={card.label} delay={0.2 + i * 0.1}>
                <div className="rounded-2xl border border-brand-line/70 bg-brand-mist p-6 md:p-7">
                  <p className="text-sm font-bold text-muted-foreground">{card.label}</p>
                  <p className="font-num mt-2 text-3xl font-black tracking-tight text-brand-deep md:text-4xl">
                    {card.value}
                  </p>
                  <p className="mt-2 text-[13px] font-medium text-muted-foreground">{card.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
