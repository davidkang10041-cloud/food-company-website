"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

type NewsItem = {
  category: string;
  date: string;
  title: string;
  desc: string;
  highlight?: boolean;
};

const NEWS: NewsItem[] = [
  {
    category: "공급",
    date: "2025.02",
    title: "GS25 편의점 채널 식자재 공급 계약 체결",
    desc: "전국 편의점 채널로 공급망을 확대하고, 신선 식자재 정기 납품 체계를 구축했습니다.",
    highlight: true,
  },
  {
    category: "인증",
    date: "2024.10",
    title: "간편조리세트 HACCP 인증 획득 — 4개 품목 인증 완성",
    desc: "과채가공품 · 신선편의식품 · 즉석섭취식품에 이어 네 번째 품목 인증으로 전 품목 HACCP 관리 체계를 완성했습니다.",
  },
  {
    category: "공급",
    date: "2024.02",
    title: "GS수퍼 식자재 공급 개시",
    desc: "대기업 유통 채널 공급을 확대하며 항공사 케이터링 노하우 기반의 품질 경쟁력을 입증했습니다.",
  },
  {
    category: "시설",
    date: "2023.05",
    title: "성남 제2공장 신설 및 HACCP 인증 획득",
    desc: "생산역량 확대를 위한 제2공장을 준공하고, 같은 해 8월 HACCP 인증을 획득했습니다.",
  },
];

const CATEGORY_STYLE: Record<string, string> = {
  공급: "bg-brand text-white",
  인증: "bg-gold/90 text-brand-ink",
  시설: "bg-tomato text-white",
};

export function News() {
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
            {NEWS.map((item) => (
              <li key={item.title}>
                <a href="#contact" className="news-row group">
                  <span className="font-num w-20 shrink-0 text-[14px] font-bold text-muted-foreground md:w-24">
                    {item.date}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 self-start rounded-full px-3 py-1 text-[12px] font-bold md:self-auto",
                      CATEGORY_STYLE[item.category] ?? "bg-brand text-white"
                    )}
                  >
                    {item.category}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-bold tracking-tight text-foreground transition-colors group-hover:text-brand md:text-[17px]">
                      {item.title}
                      {item.highlight && (
                        <span className="ml-2 inline-flex rounded-full bg-brand-soft px-2 py-0.5 align-middle text-[11px] font-bold text-brand">
                          NEW
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block line-clamp-1 text-[13.5px] text-muted-foreground md:mt-1.5">
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
