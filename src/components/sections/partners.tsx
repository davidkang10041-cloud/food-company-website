"use client";

import { Plane, Store, Hotel, UtensilsCrossed } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { PARTNERS } from "@/lib/company";

const CHANNELS = [
  { icon: Plane, label: "항공사 · 케이터링", desc: "대한항공 · 아시아나항공 · LSG" },
  { icon: Store, label: "대기업 유통", desc: "GS리테일 (수퍼 · 편의점)" },
  { icon: UtensilsCrossed, label: "프랜차이즈", desc: "샐러드 · 밀키트 브랜드" },
  { icon: Hotel, label: "호텔 & 리조트", desc: "케이터링 식자재 공급" },
];

export function Partners() {
  return (
    <section
      id="partners"
      className="bg-white py-24 md:py-32"
      aria-label="파트너 네트워크"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="PARTNERSHIP"
          title={"하늘 위부터 편의점까지,\n검증된 파트너십"}
          description="다년간 국내 대형항공사 식자재 공급의 노하우와 대기업 수퍼·편의점, 샐러드 프렌차이즈, 호텔&리조트 신규 공급으로 사업영역을 확대하고 있습니다."
        />

        {/* Partner wordmark cards */}
        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <FadeIn as="li" key={p.name} delay={(i % 4) * 0.05}>
              <article className="hover-lift flex h-full flex-col justify-between rounded-2xl border border-brand-line bg-cream p-6">
                <p className="text-[18px] font-extrabold tracking-tight text-brand-deep">
                  {p.name}
                </p>
                <p className="mt-2 text-[16px] font-semibold text-muted-foreground">
                  {p.ko}
                </p>
              </article>
            </FadeIn>
          ))}
          <FadeIn as="li" delay={0.2}>
            <article className="flex h-full flex-col justify-between rounded-2xl bg-brand p-6 text-white">
              <p className="text-[18px] font-extrabold tracking-tight">
                16,000+
              </p>
              <p className="mt-2 text-[16px] font-semibold text-white/75">
                이용 고객사와 함께 성장합니다
              </p>
            </article>
          </FadeIn>
        </ul>

        {/* Supply channels */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <FadeIn as="li" key={c.label} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-brand-line bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[16px] font-extrabold text-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 text-[15.5px] text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
