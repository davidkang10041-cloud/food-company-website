"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Business } from "@/components/sections/business";
import { Products } from "@/components/sections/products";
import { Quality } from "@/components/sections/infra";
import { Partners } from "@/components/sections/partners";
import { News } from "@/components/sections/news";
import { Growth } from "@/components/sections/growth";
import { History } from "@/components/sections/history";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { FloatingCta } from "@/components/site/floating-cta";
import { SiteSettingsProvider } from "@/components/settings-context";
import { HERO_KEYWORDS } from "@/lib/company";

function KeywordTicker() {
  const keywords = [...HERO_KEYWORDS, ...HERO_KEYWORDS];
  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-brand-deep py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee-slow marquee-mask flex w-max items-center gap-0">
        {keywords.map((kw, i) => (
          <span
            key={`${kw}-${i}`}
            className="flex items-center gap-6 pr-6 text-[15px] font-bold tracking-[0.14em] text-white/70"
          >
            {kw}
            <span className="h-1.5 w-1.5 rounded-full bg-[#7fc0a8]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-xl shadow-brand/30 transition-all duration-300 hover:bg-brand-deep md:bottom-6 md:right-5 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function Home() {
  return (
    <SiteSettingsProvider>
      <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-[15px] focus:font-bold focus:text-white"
      >
        본문 바로가기
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <KeywordTicker />
        <About />
        <Business />
        <Products />
        <Quality />
        <Partners />
        <News />
        <Growth />
        <History />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
      <FloatingCta />
      </div>
    </SiteSettingsProvider>
  );
}
