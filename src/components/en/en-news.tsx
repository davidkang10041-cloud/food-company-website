"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { EN_NEWS, type EnNewsItem } from "@/lib/company-en";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<string, string> = {
  Supply: "bg-brand text-white",
  Certification: "bg-gold/90 text-brand-ink",
  Facility: "bg-tomato text-white",
};

export function EnNews() {
  const news: EnNewsItem[] = EN_NEWS;

  return (
    <section
      id="news"
      className="bg-cream py-24 md:py-32"
      aria-label="Newsroom"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="NEWSROOM"
            title="The latest from CHEDAWON"
            description="Supply expansion, certifications, and facility investment — the growth story of CHEDAWON."
          />
          <FadeIn delay={0.15}>
            <a
              href="#contact"
              className="btn-line-dark shrink-0"
            >
              Media Inquiries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </FadeIn>
        </div>

        <FadeIn className="mt-12">
          <ul>
            {news.map((item) => (
              <li key={item.title}>
                <a
                  href="#contact"
                  className="news-row group"
                  aria-label={`Read more: ${item.title}`}
                >
                  <span className="font-num w-20 shrink-0 text-[15px] font-bold text-muted-foreground md:w-24">
                    {item.date}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 self-start rounded-full px-3 py-1 text-[14px] font-bold md:self-auto",
                      CATEGORY_STYLE[item.category] ?? "bg-brand text-white"
                    )}
                  >
                    {item.category}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-bold tracking-tight text-foreground transition-colors group-hover:text-brand md:text-[19px]">
                      {item.title}
                      {item.highlight && (
                        <span className="ml-2 inline-flex rounded-full bg-brand-soft px-2 py-0.5 align-middle text-[13px] font-bold text-brand">
                          NEW
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block line-clamp-1 text-[15px] text-muted-foreground md:mt-1.5">
                      {item.desc}
                    </span>
                  </span>
                  <ArrowRight
                    className="hidden h-4 w-4 shrink-0 text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 md:block"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
