"use client";

import Image from "next/image";
import {
  ChevronRight,
  ClipboardCheck,
  Coins,
  Database,
  Factory,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Truck,
} from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { STRATEGY_PILLARS, VALUES } from "@/lib/company";

const PILLAR_ICONS = [Factory, ShieldCheck, Coins, TrendingUp, Database];

const FLOW = [
  { icon: Sprout, label: "원물 소싱", desc: "우수 산지 네트워크" },
  { icon: Factory, label: "HACCP 제조", desc: "자체 생산 시설" },
  { icon: ClipboardCheck, label: "품질 검수", desc: "Function별 체크" },
  { icon: Truck, label: "콜드체인 배송", desc: "당일 생산 · 신선" },
  { icon: Database, label: "데이터 축적", desc: "맞춤 서비스 설계" },
];

export function Growth() {
  return (
    <>
      {/* Growth strategy — dark */}
      <section
        id="growth"
        className="texture-dark relative overflow-hidden py-24 text-white md:py-32"
        aria-label="지속가능한 성장 전략"
      >
        {/* Decorative layers */}
        <div
          className="texture-grid-dark pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-4 top-6 select-none text-[140px] font-extrabold leading-none tracking-tighter text-white/[0.04] md:-right-2 md:text-[200px]"
          aria-hidden="true"
        >
          05
        </span>

        <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            dark
            kicker="SUSTAINABILITY"
            title={"지속가능한 성장,\n데이터로 설계합니다"}
            description="다섯 가지 핵심 역량이 하나의 프로세스로 이어져, 식품유통의 지속성장기업을 만듭니다."
          />

          {/* Capability bento grid */}
          <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
            {STRATEGY_PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Database;
              const featured = i < 2;
              return (
                <FadeIn
                  key={p.name}
                  delay={i * 0.06}
                  className={featured ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.08] md:p-7">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fc0a8]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[#7fc0a8] transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                      </span>
                      <span className="font-num text-[30px] font-extrabold leading-none tracking-tight text-white/10 transition-colors duration-500 group-hover:text-[#7fc0a8]/50 md:text-[34px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[20px] font-extrabold tracking-tight text-white md:text-[22px]">
                      {p.name}
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {p.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-white/70 md:text-[15.5px]"
                        >
                          <span
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#7fc0a8]"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {/* End-to-end process flow */}
          <FadeIn delay={0.24} className="mt-8 md:mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[14.5px] font-bold tracking-[0.22em] text-[#7fc0a8]">
                  END-TO-END PROCESS
                </p>
                <p className="text-[14px] text-white/50">
                  소싱부터 데이터까지, 전 과정을 자체 역량으로 운영합니다
                </p>
              </div>
              <ol className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                {FLOW.map((step, i) => (
                  <li
                    key={step.label}
                    className="flex items-center gap-3 md:flex-1 md:gap-3"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#7fc0a8] transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white">
                      <step.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15.5px] font-extrabold tracking-tight text-white">
                        {step.label}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] text-white/55">
                        {step.desc}
                      </span>
                    </span>
                    {i < FLOW.length - 1 && (
                      <ChevronRight
                        className="ml-auto h-4 w-4 shrink-0 rotate-90 text-white/25 md:ml-3 md:rotate-0"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core values — light */}
      <section
        id="values"
        className="bg-white py-24 md:py-32"
        aria-label="핵심가치"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            kicker="OUR VALUES"
            title={"사람과 먹거리를 향한\n네 가지 약속"}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <FadeIn as="li" key={v.title} delay={i * 0.06}>
                <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-brand-line bg-white">
                  <div className="img-zoom relative h-40 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.title.replace(/\n/g, " ")}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-extrabold tracking-tight whitespace-pre-line text-foreground">
                      {v.title}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {v.points.slice(0, 3).map((pt) => (
                        <li
                          key={pt}
                          className="flex gap-2 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
