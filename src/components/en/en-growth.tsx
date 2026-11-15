"use client";

import Image from "next/image";
import {
  ChevronRight,
  ClipboardCheck,
  Coins,
  Database,
  Factory,
  ShieldCheck,
  Truck,
  TrendingUp,
} from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import {
  EN_END_TO_END_FLOW,
  EN_STRATEGY_PILLARS,
  EN_VALUES,
} from "@/lib/company-en";

const PILLAR_ICONS = [Factory, ShieldCheck, Coins, TrendingUp, Database];

const FLOW_ICONS = [
  Factory, // raw sourcing
  ShieldCheck, // HACCP manufacturing
  ClipboardCheck, // quality inspection
  Truck, // cold-chain delivery
  Database, // data accumulation
];

export function EnGrowth() {
  return (
    <>
      {/* Strategy pillars + end-to-end flow */}
      <section
        id="growth-en"
        className="relative overflow-hidden bg-brand-mist py-24 md:py-32"
        aria-label="Sustainable growth strategy"
      >
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-brand-soft opacity-70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[#f6efe2] opacity-60 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            kicker="SUSTAINABILITY"
            title={"Sustainable growth,\ndesigned with data."}
            description="Five core competencies connected as one process — building a sustainably growing food distribution company."
          />

          {/* Five capability cards */}
          <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
            {EN_STRATEGY_PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Database;
              const featured = i < 2;
              return (
                <FadeIn
                  key={p.name}
                  delay={0.14 + i * 0.05}
                  className={featured ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <article className="hover-lift group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 md:p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                      </span>
                      <span className="font-num text-[28px] font-extrabold leading-none tracking-tight text-brand-line transition-colors duration-300 group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[20px] font-extrabold tracking-tight text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[13.5px] font-bold uppercase tracking-[0.18em] text-brand/60">
                      {p.en}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {p.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {/* End-to-end process flow */}
          <FadeIn delay={0.3} className="mt-8 md:mt-10">
            <div className="rounded-[28px] border border-brand-line bg-white p-6 md:p-8">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px] font-bold tracking-[0.22em] text-brand">
                  END-TO-END PROCESS
                </p>
                <p className="text-[15px] text-muted-foreground">
                  Every stage operated with our own capabilities — from sourcing to data
                </p>
              </div>
              <ol className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                {EN_END_TO_END_FLOW.map((step, i) => {
                  const Icon = FLOW_ICONS[i] ?? Database;
                  return (
                    <li
                      key={step.label}
                      className="group flex items-center gap-3 md:flex-1 md:gap-3"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-extrabold tracking-tight text-foreground">
                          {step.label}
                        </span>
                        <span className="mt-0.5 block text-[14.5px] text-muted-foreground">
                          {step.desc}
                        </span>
                      </span>
                      {i < EN_END_TO_END_FLOW.length - 1 && (
                        <ChevronRight
                          className="ml-auto h-4 w-4 shrink-0 rotate-90 text-brand-line md:ml-3 md:rotate-0"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core values */}
      <section
        id="values-en"
        className="bg-white py-24 md:py-32"
        aria-label="Our values"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            kicker="OUR VALUES"
            title={"Four promises to people\nand good food."}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EN_VALUES.map((v, i) => (
              <FadeIn as="li" key={v.title} delay={i * 0.06}>
                <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-brand-line bg-white">
                  <div className="img-zoom relative h-40 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.title.replace(/\n/g, " ")}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-extrabold leading-snug tracking-tight whitespace-pre-line text-foreground">
                      {v.title}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {v.points.slice(0, 3).map((pt) => (
                        <li
                          key={pt}
                          className={cn("flex gap-2 text-[14.5px] leading-relaxed text-muted-foreground")}
                        >
                          <span
                            className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
