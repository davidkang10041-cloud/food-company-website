"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/site/fade-in";
import { STATS } from "@/lib/company";

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatItem({
  value,
  suffix,
  label,
  start,
  raw,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  raw?: boolean;
}) {
  const n = useCountUp(value, start);
  const display = raw ? String(n) : n.toLocaleString("ko-KR");
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="font-num text-4xl font-extrabold tracking-tight text-white md:text-[56px]">
        {display}
        <span className="ml-0.5 text-[0.6em] font-bold text-[#7fc0a8]">
          {suffix}
        </span>
      </p>
      <p className="text-sm font-medium text-white/60 md:text-[15px]">{label}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stats" className="texture-dark relative overflow-hidden">
      <div className="texture-grid-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
        <FadeIn className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="kicker-light">By the Numbers</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-[32px]">
              숫자로 보는 채다원
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-white/55">
            항공사 케이터링의 엄격한 품질 기준과 16,000개 고객사의 신뢰가
            만든 성과입니다.
          </p>
        </FadeIn>
        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0"
        >
          {STATS.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.08}
              className="flex justify-center"
            >
              <StatItem
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                start={started}
                raw={"raw" in s ? Boolean(s.raw) : false}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
