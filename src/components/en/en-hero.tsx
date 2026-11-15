"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { EN_HERO_KEYWORDS } from "@/lib/company-en";

export function EnHero() {
  return (
    <section className="bg-brand-mist" aria-label="Introduction">
      <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <FadeIn>
              <p className="kicker">TOTAL FOOD SOLUTION</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="mt-5 text-[36px] font-extrabold leading-[1.14] tracking-tight text-foreground md:text-[54px]">
                From sourcing to your table,
                <br />
                one integrated food partner.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
                CHEDAWON delivers B2B food ingredient distribution and meal kit
                OEM/ODM manufacturing at the industry&apos;s lowest MOQ — built
                on major-airline catering expertise and HACCP-certified,
                self-operated plants in Incheon and Seongnam.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact-en"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[16px] font-bold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-deep"
                >
                  Start an inquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#business-en"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-7 py-3.5 text-[16px] font-bold text-brand transition-all hover:border-brand hover:bg-brand hover:text-white"
                >
                  Explore businesses
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Keywords">
                {EN_HERO_KEYWORDS.map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-brand-deep/80"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="relative">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_36px_80px_-44px_rgba(6,25,19,0.4)]">
              <Image
                src="/images/hero-mealkit.png"
                alt="Fresh ingredients and CHEDAWON meal kits"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 flex flex-wrap gap-2 md:left-8">
              <span className="rounded-full bg-white/95 px-4 py-2 text-[14px] font-bold text-brand-deep shadow-lg backdrop-blur-sm">
                HACCP-certified plants
              </span>
              <span className="rounded-full bg-brand/95 px-4 py-2 text-[14px] font-bold text-white shadow-lg backdrop-blur-sm">
                Multi-item small-batch production
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
