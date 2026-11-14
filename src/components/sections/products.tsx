"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS, PRODUCT_LINES, BUSINESSES } from "@/lib/company";

const KIT_FEATURES = [
  "1,000g 셀러드 키트 — 스위트콘 · 올리브슬라이스 · 계란 · 방울토마토 · 야채믹스",
  "가정 · 카페 · 소규모 외식업까지 손쉽게 활용하는 대용량 구성",
  "당일 생산 · 콜드체인 배송으로 신선함 그대로",
];

const OEM_FEATURES = [
  "신규/기존 브랜드 OEM · ODM — 다품목, 식품 유형별 제조 기반",
  "인허가 및 메뉴 분석, 개발·포장 등 브랜드/패키지 디자인, 영상 제작",
  "B2B 파트너사 제안부터 MCN · 크라우드펀딩 · 커머스까지 판매채널 연계",
];

export function Products() {
  const manufacturing = BUSINESSES.find((b) => b.id === "manufacturing");

  return (
    <section
      id="products"
      className="bg-white py-24 md:py-32"
      aria-label="제품소개"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker="PRODUCTS"
            title={"신선함을 가장 신선하게\n전하는 프리미엄 샐러드"}
            description="당일 생산된 신선한 재료를 HACCP 인증 시설에서 정성껏 담았습니다. 취향과 목적에 맞는 세 가지 방식으로 만나보세요."
          />
          <FadeIn delay={0.1}>
            <Tabs defaultValue="salad" className="w-full lg:w-auto">
              <TabsList className="h-12 w-full justify-start gap-1 rounded-full border border-brand-line bg-cream p-1.5 lg:w-auto">
                <TabsTrigger
                  value="salad"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  프리미엄 샐러드
                </TabsTrigger>
                <TabsTrigger
                  value="kit"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  셀러드 키트
                </TabsTrigger>
                <TabsTrigger
                  value="oem"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  OEM · ODM
                </TabsTrigger>
              </TabsList>

              {/* Salad products */}
              <TabsContent value="salad" className="mt-10">
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
                  {PRODUCTS.map((p, i) => (
                    <FadeIn as="li" key={p.name} delay={i * 0.05}>
                      <article className="hover-lift h-full overflow-hidden rounded-2xl border border-brand-line bg-white">
                        <div className="img-zoom relative aspect-square overflow-hidden bg-cream">
                          <Image
                            src={p.image}
                            alt={`${p.name} (${p.en})`}
                            fill
                            sizes="(max-width: 768px) 50vw, 240px"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-[16.5px] font-extrabold tracking-tight text-foreground">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-[13px] font-semibold tracking-wide text-muted-foreground">
                            {p.en}
                          </p>
                          <div className="font-num mt-3 flex items-center gap-1.5 text-[13.5px] font-bold text-brand">
                            <span>{p.weight}</span>
                            <span className="text-brand-line" aria-hidden="true">
                              |
                            </span>
                            <span>{p.kcal}</span>
                            <span className="text-brand-line" aria-hidden="true">
                              |
                            </span>
                            <span>{p.dressing}</span>
                          </div>
                          <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
                            {p.items.join(" · ")}
                          </p>
                        </div>
                      </article>
                    </FadeIn>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3 rounded-2xl border border-brand-line bg-cream p-6 sm:grid-cols-3">
                  {PRODUCT_LINES.map((line) => (
                    <div key={line.name}>
                      <p className="text-[15px] font-extrabold text-brand-deep">
                        {line.name}
                      </p>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
                        {line.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Salad kit */}
              <TabsContent value="kit" className="mt-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <FadeIn className="img-zoom overflow-hidden rounded-2xl">
                    <Image
                      src="/images/biz-kit-v4.png"
                      alt="채다원 셀러드 키트 구성 — 신선한 채소와 재료"
                      width={1344}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="h-72 w-full object-cover md:h-96"
                    />
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="text-[13px] font-bold tracking-[0.22em] text-brand">
                      SALAD KIT · 1,000g
                    </p>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-[28px]">
                      {PRODUCT_LINES[2].name}
                    </h3>
                    <ul className="mt-6 space-y-3.5">
                      {KIT_FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="text-[16px] leading-relaxed text-foreground/80">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-line-dark mt-8">
                      키트 공급 문의
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </FadeIn>
                </div>
              </TabsContent>

              {/* OEM / ODM */}
              <TabsContent value="oem" className="mt-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <FadeIn delay={0.1} className="order-2 lg:order-1">
                    <p className="text-[13px] font-bold tracking-[0.22em] text-brand">
                      OEM · ODM MANUFACTURING
                    </p>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight whitespace-pre-line text-foreground md:text-[28px]">
                      {manufacturing?.headline}
                    </h3>
                    <ul className="mt-6 space-y-3.5">
                      {OEM_FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="text-[16px] leading-relaxed text-foreground/80">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-line-dark mt-8">
                      OEM/ODM 제조 문의
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </FadeIn>
                  <FadeIn className="img-zoom order-1 overflow-hidden rounded-2xl lg:order-2">
                    <Image
                      src="/images/biz-mfg-v4.png"
                      alt="HACCP 인증 채다원 식품제조 시설의 생산 라인"
                      width={1344}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="h-72 w-full object-cover md:h-96"
                    />
                  </FadeIn>
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
