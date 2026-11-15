"use client";

import Image from "next/image";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { CountUp } from "@/components/site/count-up";
import {
  EN_CEO_MESSAGE,
  EN_COMPANY_INFO,
  EN_METRICS,
  EN_STATS,
} from "@/lib/company-en";

export function EnAbout() {
  return (
    <>
      {/* Trust metrics strip */}
      <section className="bg-cream" aria-label="Company performance">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {EN_STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="hover-lift h-full rounded-2xl border border-brand-line bg-white p-6">
                  <p className="stat-num text-[30px] text-brand md:text-[36px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About — CEO message + corporate profile */}
      <section id="about-en" className="bg-white py-24 md:py-32" aria-label="About CHEDAWON">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <div className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <div>
              <SectionHeading
                kicker="ABOUT CHEDAWON"
                title={"A trusted ingredient solution provider\nthat meets customer needs"}
                description={EN_CEO_MESSAGE.join("\n\n")}
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
                    {EN_COMPANY_INFO[1].value}
                  </span>
                  <span className="mt-1 block text-[15px] font-semibold text-muted-foreground">
                    CEO, CHEDAWON Co., Ltd.
                  </span>
                </span>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="lg:pt-4">
              <div className="img-zoom relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/about.png"
                  alt="Fresh organic vegetables and ingredients handled by CHEDAWON"
                  width={1152}
                  height={864}
                  className="h-56 w-full object-cover md:h-64"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-brand-line bg-cream">
                <div className="border-b border-brand-line bg-brand px-6 py-3.5">
                  <p className="text-[15px] font-bold tracking-[0.18em] text-white">
                    CORPORATE PROFILE
                  </p>
                </div>
                <dl className="divide-y divide-brand-line/70">
                  {EN_COMPANY_INFO.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start gap-4 px-6 py-3.5"
                    >
                      <dt className="w-24 shrink-0 text-[15px] font-bold text-brand-deep">
                        {row.label}
                      </dt>
                      <dd className="text-[15px] leading-relaxed text-foreground/80">
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
              {EN_METRICS.map((m) => (
                <div key={m.label} className="flex flex-col gap-2">
                  <dd className="text-[34px] text-brand md:text-[40px]">
                    <CountUp
                      value={m.value}
                      suffix={m.suffix}
                      decimals={"decimals" in m ? (m.decimals as number) : 0}
                      raw={"raw" in m ? Boolean(m.raw) : false}
                    />
                  </dd>
                  <dt className="text-[15px] font-semibold text-muted-foreground">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
