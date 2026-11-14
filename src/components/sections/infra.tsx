"use client";

import Image from "next/image";
import { Award, BadgeCheck, Factory, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { CERTIFICATIONS, EQUIPMENTS } from "@/lib/company";

const QUALITY_POINTS = [
  {
    icon: ShieldCheck,
    title: "선제적 품질관리",
    desc: "품목 선정 및 발주 전 Function별 Check를 통한 위험요소 분석, 품질저하 예상품목 사전 점검",
  },
  {
    icon: BadgeCheck,
    title: "HACCP 4종 인증",
    desc: "과채가공품 · 간편조리세트 · 신선 편의식품 · 즉석 섭취식품까지 전 영역 인증 완료",
  },
  {
    icon: Factory,
    title: "자체 생산시설",
    desc: "HACCP 기준으로 설계된 자체공장에서 제품유형별 다품종 소량생산 지원",
  },
];

export function Quality() {
  return (
    <section id="quality" className="texture-dark relative overflow-hidden">
      <div className="texture-grid-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: heading + facility images */}
          <div>
            <SectionHeading
              dark
              kicker="Quality & Facility"
              title={"HACCP 인증 기반의\n품질과 안전을 책임집니다"}
              description="식품 안전은 선택이 아닌 기본값. 자체 생산시설과 전문 설비, 체계적인 위생관리로 고객사와 소비자의 신뢰를 지켜냅니다."
            />

            <div className="mt-10 grid grid-cols-2 gap-4">
              <FadeIn delay={0.1} className="img-zoom group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/facility-1.png"
                  alt="채다원 생산시설 내부 — 위생 관리 하에 샐러드 생산 라인 작업"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 to-transparent" />
                <p className="absolute bottom-3 left-3 text-[13px] font-bold text-white">
                  샐러드 생산 라인
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="img-zoom group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/facility-2.png"
                  alt="채다원 물류센터 — 식자재 출고 준비"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 to-transparent" />
                <p className="absolute bottom-3 left-3 text-[13px] font-bold text-white">
                  물류 · 출고 시설
                </p>
              </FadeIn>
            </div>

            {/* Quality points */}
            <div className="mt-10 space-y-4">
              {QUALITY_POINTS.map((q, i) => (
                <FadeIn key={q.title} delay={i * 0.08}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#7fc0a8]">
                      <q.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-extrabold text-white">
                        {q.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-white/60">
                        {q.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: certifications + equipment */}
          <div className="lg:pt-24">
            <FadeIn>
              <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm md:p-8">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[#c9a96a]" aria-hidden="true" />
                  <h3 className="text-lg font-extrabold text-white">
                    HACCP 인증 현황
                    <span className="font-num ml-2 rounded-full bg-[#c9a96a]/20 px-2.5 py-0.5 text-[12px] font-bold text-[#c9a96a]">
                      4종 보유
                    </span>
                  </h3>
                </div>
                <ul className="mt-5 divide-y divide-white/8">
                  {CERTIFICATIONS.map((cert) => (
                    <li
                      key={cert.no}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <div>
                        <p className="text-[15px] font-bold text-white">
                          {cert.name}
                        </p>
                        <p className="font-num mt-0.5 text-[12px] text-white/45">
                          {cert.no}
                        </p>
                      </div>
                      <p className="font-num shrink-0 text-[12px] font-medium text-white/55">
                        {cert.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="mt-6">
              <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm md:p-8">
                <h3 className="text-lg font-extrabold text-white">
                  전문 생산 설비
                  <span className="font-num ml-2 rounded-full bg-white/10 px-2.5 py-0.5 text-[12px] font-bold text-white/70">
                    {EQUIPMENTS.length}종
                  </span>
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {EQUIPMENTS.map((eq) => (
                    <li
                      key={eq}
                      className="flex items-start gap-2 text-[14px] text-white/70"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7fc0a8]"
                        aria-hidden="true"
                      />
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
