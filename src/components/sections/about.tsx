"use client";

import Image from "next/image";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { CountUp } from "@/components/site/count-up";
import { COMPANY, CEO_MESSAGE, COMPANY_INFO } from "@/lib/company";

const METRICS = [
  { value: 2017, suffix: "년", label: "법인 설립", raw: true },
  { value: 4, suffix: "종", label: "HACCP 인증 보유" },
  { value: 16000, suffix: "+", label: "이용 고객사" },
  { value: 620330, suffix: "+", label: "누적 배송 건수" },
  { value: 81.5, suffix: "%", label: "고객 재이용률", decimals: 1 },
];

export function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32" aria-label="회사소개">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-16">
          {/* CEO message */}
          <div>
            <SectionHeading
              kicker="ABOUT CHEDAWON"
              title={"고객의 요구를 충족시킬 수 있는\n신뢰받는 식자재 솔루션 공급자"}
              description={CEO_MESSAGE.body.join("\n\n")}
              className="max-w-none"
            />
            <FadeIn delay={0.2} className="mt-10 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-foreground">
                  {COMPANY.ceo}
                </span>
                <span className="mt-1 block text-sm font-semibold text-muted-foreground">
                  (주)채다원 대표이사
                </span>
              </span>
            </FadeIn>
          </div>

          {/* Company overview card */}
          <FadeIn delay={0.15} className="lg:pt-4">
            <div className="img-zoom relative overflow-hidden rounded-2xl">
              <Image
                src="/images/about.png"
                alt="채다원이 취급하는 신선한 유기농 채소와 식재료"
                width={1152}
                height={864}
                className="h-56 w-full object-cover md:h-64"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-brand-line bg-cream">
              <div className="border-b border-brand-line bg-brand px-6 py-3.5">
                <p className="text-[13px] font-bold tracking-[0.18em] text-white">
                  기업 개요 <span className="text-white/60">CORPORATE PROFILE</span>
                </p>
              </div>
              <dl className="divide-y divide-brand-line/70">
                {COMPANY_INFO.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start gap-4 px-6 py-3.5"
                  >
                    <dt className="w-20 shrink-0 text-[14px] font-bold text-brand-deep">
                      {row.label}
                    </dt>
                    <dd className="text-[14px] leading-relaxed text-foreground/80">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>

        {/* Metrics strip */}
        <FadeIn delay={0.1}>
          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-brand-line pt-12 sm:grid-cols-3 lg:grid-cols-5">
            {METRICS.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <dd className="text-[34px] text-brand md:text-[40px]">
                  <CountUp
                    value={m.value}
                    suffix={m.suffix}
                    decimals={"decimals" in m ? (m.decimals as number) : 0}
                  />
                </dd>
                <dt className="text-[14px] font-semibold text-muted-foreground">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
