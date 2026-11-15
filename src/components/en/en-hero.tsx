"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 7000;

const SLIDES = [
  {
    image: "/images/hero.png",
    alt: "A premium food spread of fresh salads and ingredients by CHEDAWON",
    badge: "TOTAL FOOD SOLUTION · SINCE 2017",
    title: [
      { text: "People. Diverse lives.", highlight: false },
      { text: "Good food —", highlight: true },
      { text: "CHEDAWON is with you", highlight: false },
    ],
    body: "An integrated food solutions company advancing healthy food culture\nthrough the right ingredient distribution and food-making process innovation.",
  },
  {
    image: "/images/hero-airline.png",
    alt: "CHEDAWON premium in-flight meals served onboard an aircraft",
    badge: "AIRLINE CATERING EXPERTISE",
    title: [
      { text: "From tables in the sky", highlight: false },
      { text: "to proven quality,", highlight: false },
      { text: "we built lasting trust", highlight: true },
    ],
    body: "Know-how from major airline catering now reaches supermarkets, convenience stores, and hotels —\nas a trusted ingredient solution provider.",
  },
  {
    image: "/images/hero-mealkit.png",
    alt: "CHEDAWON premium meal kits and fresh ingredients",
    badge: "MEALKIT OEM / ODM",
    title: [
      { text: "Starting at the industry's lowest MOQ,", highlight: false },
      { text: "food-making", highlight: true },
      { text: "process innovation", highlight: false },
    ],
    body: "One stop from R&D planning to manufacturing, packaging, and sales channels —\nour own HACCP-certified facilities complete your brand.",
  },
];

export function EnHero() {
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
      aria-label="CHEDAWON main slider"
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
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-brand-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/75 via-brand-ink/25 to-brand-ink/10" />
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
          <span className="text-[14px] font-bold tracking-[0.2em] text-white/90 md:text-[15px]">
            {slide.badge}
          </span>
        </div>

        <h1
          key={`title-${index}`}
          className="text-shadow-hero mt-7 text-[42px] leading-[1.12] font-extrabold tracking-tight sm:text-6xl md:text-[72px] md:leading-[1.08]"
        >
          {slide.title.map((line, li) => (
            <span
              key={li}
              className="hero-text-rise block"
              style={{ animationDelay: `${0.12 + li * 0.12}s` }}
            >
              <span className={line.highlight ? "text-[#8ecfb4]" : undefined}>
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <p
          key={`body-${index}`}
          className="hero-text-rise mt-7 max-w-2xl text-base leading-relaxed whitespace-pre-line text-white/80 md:text-lg"
          style={{ animationDelay: "0.45s" }}
        >
          {slide.body}
        </p>

        <div
          key={`cta-${index}`}
          className="hero-text-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.55s" }}
        >
          <a href="#about" className="btn-solid group">
            About CHEDAWON
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          <a href="#business" className="btn-line-light">
            Explore Our Business
          </a>
        </div>
      </div>

      {/* Controls & indicators */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-[1280px] items-end justify-between px-5 pb-8 md:px-8">
          <div className="flex items-center gap-3" role="group" aria-label="Slide controls">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-deep md:inline-flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-deep md:inline-flex"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-deep"
              aria-label={paused ? "Play slides" : "Pause slides"}
              aria-pressed={paused}
            >
              {paused ? (
                <Play className="h-4.5 w-4.5" aria-hidden="true" />
              ) : (
                <Pause className="h-4.5 w-4.5" aria-hidden="true" />
              )}
            </button>

            <div className="flex items-center gap-4 md:ml-4">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  className="group flex flex-col gap-2"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                >
                  <span
                    className={cn(
                      "text-[14px] font-bold tracking-wider transition-colors",
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
                    style={{
                      ["--slide-duration" as string]: `${SLIDE_DURATION}ms`,
                    }}
                    key={`progress-${i}-${paused}`}
                    data-paused={paused}
                  />
                </button>
              ))}
            </div>
          </div>

          <a
            href="#about"
            className="hidden items-center gap-3 text-[14px] font-bold tracking-[0.22em] text-white/60 transition-colors hover:text-white md:flex"
            aria-label="Scroll down"
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
