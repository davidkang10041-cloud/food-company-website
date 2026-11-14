"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HERO_KEYWORDS } from "@/lib/company";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-brand-ink text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="신선한 샐러드와 식재료가 가득한 채다원의 프리미엄 푸드 스프레드"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/80 via-brand-ink/55 to-brand-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/70 via-transparent to-brand-ink/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-tomato" aria-hidden="true" />
          <span className="text-[13px] font-semibold tracking-[0.18em] text-white/90">
            FOOD SOLUTION PROVIDER · SINCE 2017
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[42px] leading-[1.14] font-extrabold tracking-tight text-shadow-hero sm:text-6xl md:text-[76px] md:leading-[1.1]"
        >
          사람. 다양한 생활.
          <br />
          좋은 먹거리,
          <br />
          <span className="text-[#6fc7a4]">알맞은 먹거리를 찾는다면 채다원</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          올바른 식자재 유통과 푸드메이킹 프로세스 혁신으로 건강한 식문화를
          발전시키는 통합 식품 솔루션 기업.
          <br className="hidden md:block" />
          항공사 케이터링에서 검증된 노하우로 식품의 가치를 극대화합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-brand/40 transition-all hover:bg-brand-deep hover:shadow-brand-deep/40"
          >
            회사소개 보기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-brand-deep"
          >
            1:1 문의하기
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 hidden justify-center pb-10 md:flex"
        aria-hidden="true"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/30 p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/80 animate-scroll-hint" />
        </div>
        <ArrowDown className="sr-only" />
      </motion.div>

      {/* Keyword marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="relative z-10 border-t border-white/12 bg-brand-ink/70 py-4 backdrop-blur-sm"
      >
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-8 pr-8">
            {[...HERO_KEYWORDS, ...HERO_KEYWORDS].map((keyword, i) => (
              <span
                key={i}
                className="flex items-center gap-8 text-sm font-medium tracking-wide text-white/55"
              >
                {keyword}
                <span className="h-1 w-1 rounded-full bg-tomato/80" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
