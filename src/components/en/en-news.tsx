"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { DEFAULT_NEWS, type DefaultNewsItem } from "@/lib/company";
import { cn } from "@/lib/utils";

type NewsItem = DefaultNewsItem & { id?: string };

const CATEGORY_LABEL: Record<string, { en: string; className: string }> = {
  공급: { en: "Supply", className: "bg-brand text-white" },
  인증: { en: "Certification", className: "bg-gold/90 text-brand-ink" },
  시설: { en: "Facility", className: "bg-tomato text-white" },
};

export function EnNews() {
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.ok && Array.isArray(data.news) && data.news.length > 0) {
          setNews(data.news.slice(0, 4));
        }
      })
      .catch(() => {
        // fallback to default data
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="news-en"
      className="bg-cream py-24 md:py-32"
      aria-label="Newsroom"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="NEWSROOM"
            title="Latest from CHEDAWON"
            description="Supply expansion, certifications, and facility investment — the story of our growth. Releases are published in Korean."
          />
          <FadeIn delay={0.15}>
            <a href="/#news" className="btn-line-dark shrink-0">
              View all news (Korean)
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </FadeIn>
        </div>

        <FadeIn className="mt-12">
          <ul>
            {news.map((item) => {
              const category = CATEGORY_LABEL[item.category] ?? {
                en: item.category,
                className: "bg-brand text-white",
              };
              return (
                <li key={item.title}>
                  <a
                    href={item.id ? `/news/${item.id}` : "/#news"}
                    className="news-row group"
                    aria-label={`Read: ${item.title}`}
                  >
                    <span className="font-num w-20 shrink-0 text-[15px] font-bold text-muted-foreground md:w-24">
                      {item.date}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 self-start rounded-full px-3 py-1 text-[13.5px] font-bold md:self-auto",
                        category.className
                      )}
                    >
                      {category.en}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16.5px] font-bold tracking-tight text-foreground transition-colors group-hover:text-brand md:text-[18px]">
                        {item.title}
                        {item.highlight && (
                          <span className="ml-2 inline-flex rounded-full bg-brand-soft px-2 py-0.5 align-middle text-[12.5px] font-bold text-brand">
                            NEW
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block line-clamp-1 text-[14.5px] text-muted-foreground md:mt-1.5">
                        {item.desc}
                      </span>
                    </span>
                    <ArrowRight
                      className="hidden h-4 w-4 shrink-0 text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 md:block"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
