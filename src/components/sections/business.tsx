"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { BUSINESSES } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

export function Business() {
  const [active, setActive] = useState(0);
  const current = BUSINESSES[active];

  return (
    <section id="business" className="py-24 md:py-32" aria-labelledby="business-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Business Area"
          title={"식품생산, 유통, 소비 전 과정에\n기술이 융복합된 신산업을 추구합니다"}
          description="식자재 구매대행(B2B), 식자재 전문몰(B2B/B2C), 신규사업부분으로 구분되는 유통사업을 수행하며, 식품생산·유통·소비 전 과정을 아우르는 통합 솔루션을 제공합니다."
        />

        {/* Tab bar */}
        <div className="mt-12 -mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="flex w-max gap-2 md:w-auto md:flex-wrap"
            role="tablist"
            aria-label="사업영역 선택"
          >
            {BUSINESSES.map((biz, i) => (
              <button
                key={biz.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition-all md:px-7 md:py-3.5 md:text-[15px]",
                  active === i
                    ? "bg-brand text-white shadow-lg shadow-brand/30"
                    : "bg-brand-soft/70 text-brand-deep/70 hover:bg-brand-soft hover:text-brand-deep"
                )}
              >
                <span className="mr-2 text-[11px] font-bold opacity-60">0{i + 1}</span>
                {biz.title}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-6 lg:grid-cols-12"
          >
            {/* Left: image + intro */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={current.image}
                  alt={`${current.title} 대표 이미지`}
                  width={1344}
                  height={768}
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block rounded-full bg-tomato px-3 py-1 text-xs font-bold text-white">
                    {current.category}
                  </span>
                  <h3 className="mt-3 whitespace-pre-line text-xl font-extrabold leading-snug text-white md:text-2xl">
                    {current.headline}
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-[15px] leading-[1.85] text-foreground/75">
                {current.intro}
              </p>

              {current.stats && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {current.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-brand-line/70 bg-brand-mist px-4 py-4"
                    >
                      <p className="font-num text-lg font-extrabold text-brand-deep md:text-xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs font-medium leading-relaxed text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: detail sections */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              {current.sections.map((section, si) => (
                <div
                  key={section.subtitle}
                  className="rounded-2xl border border-brand-line/70 bg-white p-6 md:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft font-num text-sm font-black text-brand">
                      {si + 1}
                    </span>
                    <h4 className="text-[17px] font-extrabold text-brand-deep">
                      {section.subtitle}
                    </h4>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        <span className="text-[14.5px] leading-relaxed text-foreground/80">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {current.chips && (
                <div className="flex flex-wrap gap-2.5 rounded-2xl border border-brand-line/70 bg-brand-mist p-6">
                  {current.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-brand-line bg-white px-4 py-2 text-[13px] font-semibold text-brand-deep"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
