import { ArrowRight, Layers, TrendingDown, UtensilsCrossed } from "lucide-react";
import { STRATEGY_PILLARS } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function Strategy() {
  return (
    <section
      id="strategy"
      className="bg-brand-mist py-24 md:py-32"
      aria-labelledby="strategy-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Differentiation Strategy"
          title={"구매 업무의 경쟁력 강화, 효율성과\n편리 제공을 위한 통합 식품 솔루션"}
          description="다년간의 제조경험과 운영노하우의 전문성을 바탕으로 고객과 함께 답을 찾고 통합물류 setup, 맞춤솔루션을 제공합니다."
        />

        {/* 5 pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STRATEGY_PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.name} delay={i * 0.08} className="h-full">
              <article className="hover-lift flex h-full flex-col rounded-2xl border border-brand-line/70 bg-white p-6">
                <span className="font-num text-[13px] font-black tracking-widest text-brand/50">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-extrabold tracking-tight text-brand-deep">
                  {pillar.name}
                </h3>
                <ul className="mt-4 space-y-3 border-t border-brand-line/60 pt-4">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="text-[13.5px] leading-relaxed text-foreground/75"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* TCO -> TFS flow */}
        <FadeIn delay={0.2}>
          <div className="mt-10 overflow-hidden rounded-2xl bg-brand-ink p-7 md:p-10">
            <div className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:gap-0">
              <div className="flex items-center gap-4 lg:w-72 lg:shrink-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Layers className="h-6 w-6 text-[#6fc7a4]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-white/50">
                    5가지 역량의 결합
                  </p>
                  <p className="text-lg font-extrabold text-white">통합 식품 솔루션</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 sm:flex-row lg:gap-0">
                <div className="flex-1 rounded-xl border border-white/12 bg-white/[0.06] p-5">
                  <div className="flex items-center gap-2.5">
                    <TrendingDown className="h-5 w-5 text-[#e88a5f]" aria-hidden="true" />
                    <p className="text-base font-extrabold text-white">
                      TCO Management
                    </p>
                  </div>
                  <p className="mt-1.5 text-[13px] text-white/55">
                    Total Cost of Ownership — 총 소유 비용 최적화
                  </p>
                </div>

                <div className="flex items-center justify-center sm:px-2">
                  <ArrowRight
                    className="h-6 w-6 rotate-90 text-white/40 sm:rotate-0"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex-1 rounded-xl border border-[#6fc7a4]/40 bg-[#6fc7a4]/10 p-5">
                  <div className="flex items-center gap-2.5">
                    <UtensilsCrossed className="h-5 w-5 text-[#6fc7a4]" aria-hidden="true" />
                    <p className="text-base font-extrabold text-white">
                      TFS Management
                    </p>
                  </div>
                  <p className="mt-1.5 text-[13px] text-white/55">
                    Total Food Solution — 토탈 푸드 솔루션 제공
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
