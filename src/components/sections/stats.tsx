"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/company";
import { FadeIn } from "@/components/site/fade-in";

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function Counter({
  value,
  suffix,
  decimals,
  duration = 1600,
}: {
  value: number;
  suffix: string;
  decimals: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatNumber(value * eased, decimals));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className="font-num">
      {display}
      <span className="text-[0.55em] font-bold text-brand/70">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative z-20 -mt-14 px-5 md:px-8" aria-label="주요 성과 지표">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-brand-line/70 bg-white shadow-[0_24px_60px_-24px_rgba(10,61,49,0.28)] md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col gap-1.5 px-6 py-7 md:px-8 md:py-9 " +
                  (i > 0 ? "border-l border-brand-line/60 " : "") +
                  (i >= 2 ? "border-t border-brand-line/60 md:border-t-0 " : "") +
                  (i === 2 ? "border-l-0 md:border-l " : "")
                }
              >
                <span className="text-3xl font-extrabold tracking-tight text-brand-deep md:text-[40px]">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
