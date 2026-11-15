"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { EnHeader } from "@/components/en/en-header";
import { EnFooter } from "@/components/en/en-footer";
import { EnHero } from "@/components/en/en-hero";
import { EnAbout } from "@/components/en/en-about";
import { EnBusiness } from "@/components/en/en-business";
import { EnProducts } from "@/components/en/en-products";
import { EnQuality } from "@/components/en/en-quality";
import { EnPartners } from "@/components/en/en-partners";
import { EnNews } from "@/components/en/en-news";
import { EnGrowth } from "@/components/en/en-growth";
import { EnHistory } from "@/components/en/en-history";
import { EnFaq } from "@/components/en/en-faq";
import { EnContact } from "@/components/en/en-contact";
import { EnFloatingCta } from "@/components/en/en-floating-cta";
import { SiteSettingsProvider } from "@/components/settings-context";
import { EN_HERO_KEYWORDS } from "@/lib/company-en";

function KeywordTicker() {
  const keywords = [...EN_HERO_KEYWORDS, ...EN_HERO_KEYWORDS];
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
      aria-label="Move to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/**
 * English site — a full 1:1 mirror of the Korean main page
 * (same structure, same sections, same design system; copy translated).
 */
export function EnLanding() {
  return (
    <SiteSettingsProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-[15px] focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <EnHeader />
        <main id="main" className="flex-1">
          <EnHero />
          <KeywordTicker />
          <EnAbout />
          <EnBusiness />
          <EnProducts />
          <EnQuality />
          <EnPartners />
          <EnNews />
          <EnGrowth />
          <EnHistory />
          <EnFaq />
          <EnContact />
        </main>
        <EnFooter />
        <BackToTop />
        <EnFloatingCta />
      </div>
    </SiteSettingsProvider>
  );
}
