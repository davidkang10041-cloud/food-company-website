"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import { EN_BUSINESSES } from "@/lib/company-en";

export function EnBusiness() {
  const [active, setActive] = useState(0);
  const biz = EN_BUSINESSES[active];

  return (
    <section
      id="business-en"
      className="bg-cream py-24 md:py-32"
      aria-label="What we do"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="WHAT WE DO"
            title={"Integrated food solutions,\nfrom sourcing to shelf."}
            description="Four business lines covering the full value chain — procurement, manufacturing, branded meal kits, and online retail — connected as one flow."
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

        {/* Tabs */}
        <FadeIn className="mt-12">
          <div
            role="tablist"
            aria-label="Business areas"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
          >
            {EN_BUSINESSES.map((b, i) => (
              <button
                key={b.id}
                role="tab"
                id={`biz-tab-${b.id}`}
                aria-selected={active === i}
                aria-controls={`biz-panel-${b.id}`}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2.5 text-[15px] font-bold transition-all",
                  active === i
                    ? "bg-brand text-white shadow-md shadow-brand/25"
                    : "border border-brand-line bg-white text-brand-deep hover:border-brand/50"
                )}
              >
                <span className="font-num mr-2 opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {b.title}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Panel */}
        <FadeIn className="mt-8">
          <div
            role="tabpanel"
            id={`biz-panel-${biz.id}`}
            aria-labelledby={`biz-tab-${biz.id}`}
            className="overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-[0_32px_70px_-42px_rgba(6,25,19,0.28)]"
          >
            <div className="grid lg:grid-cols-[1fr_1.15fr]">
              <div className="img-zoom relative min-h-[240px] overflow-hidden lg:min-h-[480px]">
                <Image
                  src={biz.image}
                  alt={biz.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
                {biz.stats && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 md:bottom-5 md:left-5">
                    {biz.stats.slice(0, 2).map((s) => (
                      <span
                        key={s.label}
                        className="rounded-full bg-white/92 px-3.5 py-1.5 text-[13.5px] font-bold text-brand-deep backdrop-blur-sm"
                      >
                        <span className="font-num mr-1.5 text-brand">{s.value}</span>
                        {s.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col p-7 md:p-10">
                <p className="text-[14px] font-bold tracking-[0.24em] text-brand">
                  {biz.category.toUpperCase()}
                </p>
                <h3 className="mt-3 text-[24px] font-extrabold leading-[1.3] tracking-tight text-foreground md:text-[28px]">
                  {biz.headline}
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground md:text-[16.5px]">
                  {biz.intro}
                </p>

                {biz.stats && biz.stats.length > 2 && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {biz.stats.slice(2).map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-brand-line/60 bg-brand-mist px-5 py-4"
                      >
                        <p className="font-num text-[22px] font-extrabold leading-none tracking-tight text-brand">
                          {s.value}
                        </p>
                        <p className="mt-2 text-[14px] font-bold text-muted-foreground">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {biz.sections.map((section) => (
                    <div
                      key={section.subtitle}
                      className="rounded-2xl border border-brand-line/60 bg-brand-mist/50 p-5"
                    >
                      <p className="text-[15.5px] font-extrabold tracking-tight text-brand-deep">
                        {section.subtitle}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted-foreground"
                          >
                            <span
                              className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
