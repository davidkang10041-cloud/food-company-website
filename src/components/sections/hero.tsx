"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 7000;

const SLIDES = [
  {
    image: "/images/hero.png",
    alt: "신선한 샐러드와 식재료가 가득한 채다원의 프리미엄 푸드 스프레드",
    badge: "FOOD SOLUTION PROVIDER · SINCE 2017",
    title: [
      { text: "사람. 다양한 생활.", highlight: false },
      { text: "좋은 먹거리,", highlight: false },
      { text: "알맞은 먹거리를 찾는다면", highlight: true },
    ],
    body: "올바른 식자재 유통과 푸드메이킹 프로세스 혁신으로\n건강한 식문화를 발전시키는 통합 식품 솔루션 기업, 채다원.",
  },
  {
    image: "/images/biz-b2b.png",
    alt: "항공기 내에서 제공되는 채다원의 기내식",
    badge: "AIRLINE CATERING EXPERTISE",
    title: [
      { text: "하늘 위 식탁에서", highlight: false },
      { text: "검증된 식자재 품질,", highlight: false },
      { text: "전 과정을 아우르는 유통", highlight: true },
    ],
    body: "대형항공사 케이터링에서 쌓은 노하우로 수퍼마켓·편의점·호텔까지,\n신뢰받는 식자재 솔루션 공급자로 나아갑니다.",
  },
  {
    image: "/images/biz-kit.png",
    alt: "채다원 쿡산 밀키트와 신선한 재료",
    badge: "MEALKIT OEM / ODM",
    title: [
      { text: "업계 최소 MOQ로 시작하는", highlight: false },
      { text: "푸드메이킹 프로세스", highlight: true },
      { text: "혁신", highlight: false },
    ],
    body: "R&D 기획부터 제조·포장·판매채널 연계까지 원스톱,\n자체 HACCP 시설이 여러분의 브랜드를 완성합니다.",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <section
      id="top"
      className="relative flex h-[100svh] flex-col overflow-hidden bg-brand-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="채다원 메인 슬라이드"
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms]",
            i === index ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={i === index ? s.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover",
              i === index && "hero-crossfade-enter"
            )}
            key={`${i}-${index === i}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/75 via-brand-ink/40 to-brand-ink/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/60 via-transparent to-brand-ink/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-28 pt-32 md:px-8">
        <div
          key={`badge-${index}`}
          className="hero-text-rise inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm"
          style={{ animationDelay: "0.05s" }}
        >
          <span
            className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-tomato"
            aria-hidden="true"
          />
          <span className="text-[12px] font-bold tracking-[0.2em] text-white/90 md:text-[13px]">
            {slide.badge}
          </span>
        </div>

        <h1
          key={`title-${index}`}
          className="mt-7 text-[42px] leading-[1.12] font-extrabold tracking-tight text-shadow-hero sm:text-6xl md:text-[72px] md:leading-[1.08]"
        >
          {slide.title.map((line, li) => (
            <span
              key={li}
              className="hero-text-rise block"
              style={{ animationDelay: `${0.12 + li * 0.12}s` }}
            >
              <span className={line.highlight ? "text-[#6fc7a4]" : undefined}>
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <p
          key={`body-${index}`}
          className="hero-text-rise mt-7 max-w-2xl text-base leading-relaxed whitespace-pre-line text-white/75 md:text-lg"
          style={{ animationDelay: "0.45s" }}
        >
          {slide.body}
        </p>

        <div
          key={`cta-${index}`}
          className="hero-text-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-brand/40 transition-all hover:bg-brand-deep"
          >
            회사소개 보기
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          <a
            href="#business"
            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-brand-deep"
          >
            사업영역 살펴보기
          </a>
        </div>
      </div>

      {/* Controls & indicators */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-[1280px] items-end justify-between px-5 pb-8 md:px-8">
          <div className="flex items-center gap-3" role="group" aria-label="슬라이드 조작">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-deep md:inline-flex"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-deep md:inline-flex"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4 md:ml-4">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  className="group flex flex-col gap-2"
                  aria-label={`${i + 1}번째 슬라이드로 이동`}
                  aria-current={i === index}
                >
                  <span
                    className={cn(
                      "text-[12px] font-bold tracking-wider transition-colors",
                      i === index ? "text-white" : "text-white/45"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "slide-progress block w-14 transition-opacity",
                      i === index && "active"
                    )}
                    style={{ ["--slide-duration" as string]: `${SLIDE_DURATION}ms` }}
                    key={`progress-${i}-${paused}`}
                    data-paused={paused}
                  />
                </button>
              ))}
            </div>
          </div>

          <a
            href="#stats"
            className="hidden items-center gap-3 text-[12px] font-bold tracking-[0.22em] text-white/60 transition-colors hover:text-white md:flex"
            aria-label="아래로 스크롤"
          >
            SCROLL DOWN
            <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
              <span className="animate-scroll-hint h-2 w-1 rounded-full bg-white/80" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
