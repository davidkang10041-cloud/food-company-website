"use client";

import { FadeIn } from "@/components/site/fade-in";
import { PARTNERS } from "@/lib/company";

export function Partners() {
  return (
    <section id="partners" className="border-y border-border bg-white">
      <div className="mx-auto max-w-[1280px] px-5 pt-16 md:px-8 md:pt-20">
        <FadeIn className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="kicker">Trusted Partners</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-[32px]">
              대형항공사에서 대기업 유통까지,
              <span className="block text-[0.72em] font-bold text-muted-foreground">
                검증된 파트너와 함께 만든 신뢰
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-muted-foreground">
            엄격한 품질 기준으로 평가받은 공급 파트너들 — 그 신뢰가 채다원의
            경쟁력입니다.
          </p>
        </FadeIn>
      </div>

      <div className="marquee-mask mt-10 overflow-hidden py-2 md:mt-12">
        <div className="animate-marquee-slow flex w-max items-center">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="mx-6 flex items-center gap-6"
              aria-hidden={i >= PARTNERS.length}
            >
              <div className="flex flex-col items-center gap-1.5 px-4">
                <span className="font-num whitespace-nowrap text-xl font-black tracking-[0.08em] text-foreground/80 transition-colors hover:text-brand md:text-[26px]">
                  {partner.name}
                </span>
                <span className="whitespace-nowrap text-[12px] font-semibold text-muted-foreground">
                  {partner.ko}
                </span>
              </div>
              <span
                className="h-10 w-px bg-border"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 pb-16 md:px-8 md:pb-20">
        <FadeIn
          delay={0.2}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl bg-brand-mist px-8 py-6 text-center"
        >
          <p className="text-[14px] font-bold text-foreground/80">
            대한항공 · 아시아나항공 케이터링 공급
          </p>
          <span className="hidden h-4 w-px bg-border md:block" aria-hidden="true" />
          <p className="text-[14px] font-bold text-foreground/80">
            GS리테일 수퍼·편의점 식자재 공급
          </p>
          <span className="hidden h-4 w-px bg-border md:block" aria-hidden="true" />
          <p className="text-[14px] font-bold text-foreground/80">
            호텔 & 리조트 · 프렌차이즈 공급 확대
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
