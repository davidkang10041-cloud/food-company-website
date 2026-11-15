"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { DEFAULT_NEWS, type DefaultNewsItem } from "@/lib/company";
import { cn } from "@/lib/utils";

type NewsItem = DefaultNewsItem & { id?: string };

const CATEGORY_STYLE: Record<string, string> = {
  공급: "bg-brand text-white",
  인증: "bg-gold/90 text-brand-ink",
  시설: "bg-tomato text-white",
};

export function News() {
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.ok && Array.isArray(data.news) && data.news.length > 0) {
          setNews(data.news);
        }
      })
      .catch(() => {
        // 실패 시 기본 데이터 유지
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="news"
      className="bg-cream py-24 md:py-32"
      aria-label="뉴스룸"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="NEWSROOM"
            title={"채다원의 새로운 소식"}
            description="공급 확대, 인증 획득, 시설 투자 — 채다원의 성장 발자취를 전합니다."
          />
          <FadeIn delay={0.15}>
            <a
              href="#contact"
              className="btn-line-dark shrink-0"
            >
              언론 문의하기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </FadeIn>
        </div>

        <FadeIn className="mt-12">
          <ul>
            {news.map((item) => (
              <li key={item.title}>
                <a
                  href={item.id ? `/news/${item.id}` : "#contact"}
                  className="news-row group"
                  aria-label={`${item.title} 자세히 보기`}
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
