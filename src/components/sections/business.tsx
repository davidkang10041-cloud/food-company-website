"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import { BUSINESSES } from "@/lib/company";

export function Business() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="business"
      className="bg-cream py-24 md:py-32"
      aria-label="사업영역"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="BUSINESS"
            title={"전과정을 아우르는\n통합 푸드 솔루션"}
            description="식자재 유통부터 제조, 밀키트, 온라인몰까지 — 채다원의 네 가지 사업영역이 하나의 흐름으로 연결됩니다."
          />
          <FadeIn delay={0.15} className="flex shrink-0 flex-wrap gap-2">
            <span className="rounded-full border border-brand-line bg-white px-4 py-2 text-[15px] font-bold tracking-wide text-brand">
              TFS · Total Food Solution
            </span>
            <span className="rounded-full border border-brand-line bg-white px-4 py-2 text-[15px] font-bold tracking-wide text-brand">
              TCO · Total Cost of Ownership
            </span>
          </FadeIn>
        </div>

        {/* Expanding accordion (desktop) */}
        <FadeIn className="mt-12 hidden md:block">
          <div className="flex h-[560px] gap-2.5" role="list">
            {BUSINESSES.map((biz, i) => {
              const isActive = active === i;
              return (
                <article
                  key={biz.id}
                  role="listitem"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="biz-panel relative min-w-0 cursor-pointer overflow-hidden rounded-2xl bg-brand-ink"
                  style={{ flexGrow: isActive ? 4.2 : 1, flexBasis: 0 }}
                  aria-label={biz.title}
                >
                  <Image
                    src={biz.image}
                    alt={biz.headline}
                    fill
                    sizes="(max-width: 1280px) 100vw, 60vw"
                    className={cn(
                      "object-cover transition-all duration-700",
                      isActive ? "opacity-90" : "opacity-55"
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      isActive
                        ? "bg-gradient-to-t from-brand-ink/95 via-brand-ink/35 to-brand-ink/15"
                        : "bg-brand-ink/65"
                    )}
                  />

                  {/* Collapsed: vertical label */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                      isActive ? "pointer-events-none opacity-0" : "opacity-100"
                    )}
                  >
                    <span className="flex flex-col items-center gap-4">
                      <span className="font-num text-[15px] font-bold tracking-widest text-white/60">
                        0{i + 1}
                      </span>
                      <span
                        className="text-[17px] font-extrabold tracking-tight text-white [writing-mode:vertical-rl]"
                        aria-hidden="true"
                      >
                        {biz.title}
                      </span>
                    </span>
                  </div>

                  {/* Expanded content */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-8 transition-all duration-500",
                      isActive
                        ? "translate-y-0 opacity-100 delay-150"
                        : "pointer-events-none translate-y-6 opacity-0"
                    )}
                  >
                    <p className="text-[15px] font-bold tracking-[0.22em] text-[#8ecfb4]">
                      {biz.category.toUpperCase()}
                    </p>
                    <h3 className="mt-3 text-[26px] font-extrabold leading-snug tracking-tight whitespace-pre-line text-white">
                      {biz.headline}
                    </h3>
                    <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/80 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
                      {biz.intro}
                    </p>
                    {biz.stats && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {biz.stats.slice(0, 2).map((s) => (
                          <span
                            key={s.label}
                            className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[15.5px] font-bold text-white backdrop-blur-sm"
                          >
                            <span className="font-num text-[#a5d8c2]">
                              {s.value}
                            </span>{" "}
                            {s.label}
                          </span>
                        ))}
                      </div>
                    )}
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 text-[15.5px] font-bold text-white transition-all hover:gap-3"
                    >
                      해당 사업 문의하기
                      <ArrowUpRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* Stacked cards (mobile) */}
        <div className="mt-12 flex flex-col gap-5 md:hidden">
          {BUSINESSES.map((biz, i) => (
            <FadeIn key={biz.id} delay={i * 0.06}>
              <article className="overflow-hidden rounded-2xl border border-brand-line bg-white">
                <div className="img-zoom relative h-44 overflow-hidden">
                  <Image
                    src={biz.image}
                    alt={biz.headline}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-ink/70 px-3 py-1 text-[13px] font-bold tracking-[0.18em] text-white backdrop-blur-sm">
                    0{i + 1} · {biz.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold tracking-tight text-foreground">
                    {biz.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-bold text-brand">
                    {biz.headline}
                  </p>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                    {biz.intro}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand transition-all hover:gap-2.5"
                  >
                    문의하기
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
