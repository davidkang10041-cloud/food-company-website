"use client";

import Image from "next/image";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { CERTIFICATIONS, EQUIPMENTS } from "@/lib/company";

export function Quality() {
  return (
    <section
      id="quality"
      className="bg-brand-mist py-24 md:py-32"
      aria-label="품질 및 인증"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="QUALITY · CERTIFICATION"
          title={"HACCP 4종 인증,\n전 과정 품질 경쟁력"}
          description="품목 선정부터 발주, 생산, 배송까지 — Function별 체크와 선진 위생관리 체계로 안전한 먹거리를 지킵니다."
        />

        {/* HACCP certifications */}
        <ul className="mt-14 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, i) => (
            <FadeIn as="li" key={cert.no} delay={i * 0.06}>
              <article className="hover-lift h-full rounded-2xl border border-brand-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <BadgeCheck className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-1.5 text-[14px] font-semibold text-brand">
                  HACCP {cert.no}
                </p>
                <p className="font-num mt-2 text-[14px] text-muted-foreground">
                  {cert.period}
                </p>
              </article>
            </FadeIn>
          ))}
        </ul>

        {/* Facilities & equipment */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <FadeIn className="img-zoom overflow-hidden rounded-2xl">
              <Image
                src="/images/quality-1-v3.png"
                alt="신선 채소 품질 검수를 진행하는 채다원 품질관리 전문가"
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 50vw, 480px"
                className="h-56 w-full object-cover md:h-72"
              />
            </FadeIn>
            <FadeIn
              delay={0.1}
              className="img-zoom overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/quality-2.png"
                alt="자동 열성형 진공포장기가 작동 중인 채다원 생산시설"
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 50vw, 480px"
                className="h-56 w-full object-cover md:h-72"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="flex flex-col justify-center">
            <p className="kicker">FACILITY · EQUIPMENT</p>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-[28px]">
              전문 생산시설과 설비로
              <br />
              다품종 소량생산까지
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              HACCP 기준으로 설계된 자체공장에서 제품유형에 맞는 다품종
              소량생산을 지원합니다. GP460 자동 열성형 진공포장기부터 금속
              검출기까지, 전 공정 전문 설비를 운영합니다.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {EQUIPMENTS.map((eq) => (
                <li
                  key={eq}
                  className="rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-[14px] font-semibold text-brand-deep"
                >
                  {eq}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-[15px] font-bold text-brand">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              과채가공품 · 간편조리세트 · 신선편의식품 · 즉석섭취식품 4개 품목
              인증
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
