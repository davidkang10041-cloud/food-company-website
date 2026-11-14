"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1800,
  raw = false,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  /** true일 경우 천 단위 구분자 없이 원래 숫자를 표기 (연도 등) */
  raw?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(value * eased);
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const formatted = raw
    ? String(Math.round(done ? value : display))
    : formatNumber(done ? value : display, decimals);

  return (
    <span ref={ref} className={cn("stat-num", className)}>
      {prefix}
      {formatted}
      {suffix && (
        <span className="ml-0.5 text-[0.55em] font-bold opacity-80">
          {suffix}
        </span>
      )}
    </span>
  );
}
