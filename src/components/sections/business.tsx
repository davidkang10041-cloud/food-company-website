"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { BUSINESSES } from "@/lib/company";
import { cn } from "@/lib/utils";

export function Business() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<string | null>(
    BUSINESSES[0].id
  );

  return (
    <section id="business" className="bg-brand-mist">
      <div className="mx-auto max-w-[1280px] px-5 pt-20 md:px-8 md:pt-28">
        <SectionHeading
          kicker="Business Areas"
          title={"유통부터 제조, 온라인까지\n식품 가치사슬 전체를 설계합니다"}
          description={
            "식자재 유통 · 구매대행, 식품제조 연결사업, 특화 밀키트 Cooksan, 식자재 전문몰 — 4대 사업영역이 유기적으로 연결되어 하나의 푸드 솔루션을 완성합니다."
          }
        />
      </div>

      {/* Desktop expanding panels */}
      <div className="mx-auto hidden max-w-[1600px] gap-2 px-8 pb-20 pt-14 lg:flex lg:pb-28 lg:pt-16">
        {BUSINESSES.map((biz, i) => {
          const isActive = i === active;
          return (
            <div
              key={biz.id}
              className={cn("biz-panel relative overflow-hidden rounded-2xl")}
              style={{ flexGrow: isActive ? 4.2 : 1, flexBasis: 0, minWidth: 0 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              role="button"
              aria-label={biz.title}
              aria-expanded={isActive}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={biz.image}
                  alt={biz.title}
                  fill
                  sizes="(max-width: 1024px) 0vw, 60vw"
                  className="object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive
                      ? "bg-gradient-to-t from-brand-ink/95 via-brand-ink/55 to-brand-ink/25"
                      : "bg-brand-ink/72"
                  )}
                />
              </div>

              {/* Collapsed: vertical label */}
              <div
                className={cn(
                  "absolute inset-0 flex min-w-[64px] flex-col items-center justify-between py-8 transition-opacity duration-300",
                  isActive ? "pointer-events-none opacity-0" : "opacity-100"
                )}
              >
                <span className="font-num text-sm font-bold tracking-[0.2em] text-white/50">
                  0{i + 1}
                </span>
                <span
                  className="text-[22px] font-extrabold tracking-tight text-white"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {biz.title}
                </span>
                <Plus className="h-5 w-5 text-white/70" aria-hidden="true" />
              </div>

              {/* Expanded: content */}
              <div
                className={cn(
                  "relative z-10 flex h-[560px] flex-col justify-end p-8 transition-opacity duration-500 xl:p-10",
                  isActive
                    ? "opacity-100 delay-300"
                    : "pointer-events-none opacity-0"
                )}
              >
                <div className={cn(isActive ? "block" : "hidden")}>
                  <span className="inline-flex items-center rounded-full bg-tomato px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-white">
                    {biz.category}
                  </span>
                  <h3 className="mt-4 max-w-xl text-[26px] font-extrabold leading-[1.3] tracking-tight text-white xl:text-[30px]">
                    {biz.headline}
                  </h3>
                  <p className="mt-3.5 max-w-2xl text-[15px] leading-relaxed text-white/70">
                    {biz.intro}
                  </p>

                  {biz.stats && (
                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                      {biz.stats.map((s) => (
                        <div key={s.label}>
                          <p className="font-num text-lg font-extrabold text-[#7fc0a8]">
                            {s.value}
                          </p>
                          <p className="text-xs font-medium text-white/55">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-5 space-y-2">
                    {biz.sections.slice(0, 3).map((sec) => (
                      <li
                        key={sec.subtitle}
                        className="flex items-start gap-2.5 text-[14px] text-white/80"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#7fc0a8]"
                          aria-hidden="true"
                        />
                        {sec.subtitle}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-4 px-5 pb-20 pt-10 lg:hidden">
        {BUSINESSES.map((biz, i) => {
          const open = mobileOpen === biz.id;
          return (
            <FadeIn key={biz.id} delay={i * 0.05}>
              <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setMobileOpen(open ? null : biz.id)}
                  className="relative block w-full text-left"
                  aria-expanded={open}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={biz.image}
                      alt={biz.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                      <div>
                        <span className="inline-flex items-center rounded-full bg-tomato px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white">
                          {biz.category}
                        </span>
                        <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white">
                          {biz.title}
                        </h3>
                      </div>
                      <Plus
                        className={cn(
                          "h-6 w-6 shrink-0 text-white transition-transform duration-300",
                          open && "rotate-45"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
                {open && (
                  <div className="p-5">
                    <p className="text-[14px] font-extrabold text-brand">
                      {biz.headline}
                    </p>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                      {biz.intro}
                    </p>
                    {biz.stats && (
                      <dl className="mt-4 grid grid-cols-2 gap-2">
                        {biz.stats.map((s) => (
                          <div
                            key={s.label}
                            className="rounded-lg bg-brand-soft px-3.5 py-2.5"
                          >
                            <dt className="font-num text-[15px] font-extrabold text-brand">
                              {s.value}
                            </dt>
                            <dd className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                              {s.label}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <ul className="mt-4 space-y-2 border-t border-border pt-4">
                      {biz.sections.map((sec) => (
                        <li
                          key={sec.subtitle}
                          className="flex items-start gap-2 text-[13px] text-foreground/75"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                          {sec.subtitle}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
