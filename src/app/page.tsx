"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Business } from "@/components/sections/business";
import { Products } from "@/components/sections/products";
import { Quality } from "@/components/sections/infra";
import { Growth } from "@/components/sections/growth";
import { Values } from "@/components/sections/values";
import { Partners } from "@/components/sections/partners";
import { History } from "@/components/sections/history";
import { Contact } from "@/components/sections/contact";

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
      className={`fixed bottom-6 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-xl shadow-brand/30 transition-all duration-300 hover:bg-brand-deep ${
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
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Business />
        <Products />
        <Quality />
        <Growth />
        <Values />
        <Partners />
        <History />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
