"use client";

import Image from "next/image";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { CERTIFICATIONS, EQUIPMENT_STAGES } from "@/lib/company";

const STEP_INDEX = new Map(
  EQUIPMENT_STAGES.flatMap((s) => s.items).map((eq, i) => [eq.name, i] as const)
);

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
                <p className="mt-1.5 text-[15px] font-semibold text-brand">
                  HACCP {cert.no}
                </p>
                <p className="font-num mt-2 text-[15.5px] text-muted-foreground">
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
              소량생산을 지원합니다. 원물 세척부터 진공 포장, 금속 검출까지 —
              전 공정을 자체 설비로 직접 운영합니다.
            </p>
            <p className="mt-6 flex items-center gap-2 text-[15px] font-bold text-brand">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              원물 세척부터 출고 검사까지, 전 공정 10종 설비를 직접 운영합니다
            </p>
          </FadeIn>
        </div>

        {/* Production line — 실제 보유 설비 10종, 공정 단계별 */}
        <div className="mt-12 space-y-12 md:mt-16 md:space-y-14">
          {EQUIPMENT_STAGES.map((stage, si) => (
            <FadeIn key={stage.label} delay={si * 0.05}>
              <div className="grid gap-5 lg:grid-cols-[230px_1fr] lg:gap-10">
                {/* Stage label */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="font-num text-[15px] font-extrabold tracking-[0.24em] text-brand">
                    STAGE 0{si + 1}
                  </p>
                  <h4 className="mt-2 text-[20px] font-extrabold tracking-tight text-foreground md:text-[22px]">
                    {stage.label}
                  </h4>
                  <p className="mt-1.5 text-[15px] text-muted-foreground">
                    {stage.desc}
                  </p>
                  <p className="font-num mt-3 hidden text-[14px] font-bold text-brand/70 lg:block">
                    설비 {stage.items.length}종
                  </p>
                  <span
                    className="mt-4 hidden h-px w-14 bg-brand/30 lg:block"
                    aria-hidden="true"
                  />
                </div>

                {/* Equipment cards */}
                <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                  {stage.items.map((eq) => {
                    const step = (STEP_INDEX.get(eq.name) ?? 0) + 1;
                    return (
                      <li key={eq.name}>
                        <figure className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition-colors duration-300 hover:border-brand/40">
                          <div className="img-zoom relative h-36 overflow-hidden md:h-44">
                            <Image
                              src={eq.image}
                              alt={eq.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                              className="object-contain"
                            />
                            <span className="font-num absolute left-3 top-3 rounded-full border border-brand-line/70 bg-white/85 px-2.5 py-1 text-[13px] font-extrabold tracking-wide text-brand backdrop-blur-sm">
                              {String(step).padStart(2, "0")}
                            </span>
                          </div>
                          <figcaption className="flex flex-1 flex-col justify-center border-t border-brand-line/60 px-4 py-3.5">
                            <p className="text-[15.5px] font-extrabold leading-snug tracking-tight text-foreground">
                              {eq.name}
                            </p>
                            <p className="mt-1 text-[14px] font-semibold text-brand">
                              {eq.role}
                            </p>
                          </figcaption>
                        </figure>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-8 flex items-center gap-2 text-[15px] font-bold text-brand">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            과채가공품 · 간편조리세트 · 신선편의식품 · 즉석섭취식품 4개 품목 인증
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
