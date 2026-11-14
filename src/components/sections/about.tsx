"use client";

import Image from "next/image";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { CEO_MESSAGE, COMPANY, COMPANY_INFO } from "@/lib/company";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        {/* CEO Message */}
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <FadeIn>
              <div className="relative">
                <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about.png"
                    alt="채다원이 취급하는 신선한 농산물과 식자재"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 rounded-2xl bg-brand px-7 py-6 text-white shadow-2xl shadow-brand/40 md:-right-8">
                  <p className="text-[11px] font-bold tracking-[0.26em] text-white/70">
                    MESSAGE FROM CEO
                  </p>
                  <p className="font-num mt-1.5 text-xl font-extrabold">
                    대표이사 박영호
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Company info */}
            <FadeIn delay={0.15} className="mt-16">
              <h3 className="text-lg font-extrabold tracking-tight text-foreground">
                기업 개요
              </h3>
              <dl className="mt-5 divide-y divide-border rounded-xl border border-border bg-brand-mist/60">
                {COMPANY_INFO.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center justify-between gap-4 px-5 py-3.5"
                  >
                    <dt className="shrink-0 text-[14px] font-bold text-brand">
                      {info.label}
                    </dt>
                    <dd className="text-right text-[14px] font-medium text-foreground/80">
                      {info.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>

          <div className="lg:pt-6">
            <FadeIn>
              <p className="kicker">CEO Message</p>
              <h2 className="mt-4 whitespace-pre-line text-[32px] leading-[1.24] font-extrabold tracking-[-0.02em] text-foreground md:text-[42px]">
                {CEO_MESSAGE.title}
              </h2>
            </FadeIn>

            <div className="mt-8 space-y-6">
              {CEO_MESSAGE.body.map((paragraph, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.1}>
                  <p className="text-[16px] leading-[1.85] text-muted-foreground md:text-[17px]">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4} className="mt-10">
              <div className="flex items-center gap-4 rounded-2xl border border-brand-line bg-brand-soft/50 px-7 py-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-white">
                  채
                </div>
                <div>
                  <p className="text-[15px] font-extrabold text-foreground">
                    주식회사 채다원 대표이사
                  </p>
                  <p className="mt-0.5 text-[14px] text-muted-foreground">
                    식자재 유통 · 밀키트 OEM/ODM 전문 기업
                  </p>
                </div>
                <span className="font-num ml-auto hidden text-[13px] font-bold tracking-[0.2em] text-brand sm:block">
                  SINCE 2017
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Slogan band */}
      <div className="texture-dark relative overflow-hidden">
        <div className="texture-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-20">
          <FadeIn className="flex flex-col items-center text-center">
            <p className="kicker-light">Our Slogan</p>
            <p className="mt-6 text-[34px] font-extrabold tracking-[-0.04em] text-white md:text-[52px]">
              사람<span className="text-[#7fc0a8]">.</span> 다양한 생활
              <span className="text-[#7fc0a8]">.</span> 좋은 먹거리
            </p>
            <p className="mt-4 text-[15px] font-medium tracking-[0.14em] text-white/60 md:text-base">
              The Company Responsible for Healthy Life
            </p>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-white/65">
              채다원은 식자재 유통 · 제조 · 밀키트 · 온라인 전문몰을 아우르는
              통합 푸드 솔루션으로 식품문화 발전에 기여합니다. 생산지 ·
              공급사와의 공고한 파트너십과 {COMPANY.business} 경쟁력으로 고객과
              함께 성장합니다.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
