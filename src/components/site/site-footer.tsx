"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Facebook,
  Globe,
  Instagram,
  Phone,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { COMPANY } from "@/lib/company";

const MENU_GROUPS = [
  {
    title: "회사소개",
    links: [
      { href: "#about", label: "기업 개요" },
      { href: "#about", label: "대표 인사말" },
      { href: "#history", label: "회사 연혁" },
    ],
  },
  {
    title: "사업영역",
    links: [
      { href: "#business", label: "식자재 유통" },
      { href: "#business", label: "식품제조 연결" },
      { href: "#business", label: "특화 밀키트" },
      { href: "#business", label: "식자재 전문몰" },
    ],
  },
  {
    title: "제품 · 품질",
    links: [
      { href: "#products", label: "프리미엄 샐러드" },
      { href: "#quality", label: "HACCP 인증" },
      { href: "#quality", label: "생산시설 · 설비" },
    ],
  },
  {
    title: "지속가능성",
    links: [
      { href: "#growth", label: "성장 전략" },
      { href: "#values", label: "핵심가치" },
      { href: "#partners", label: "파트너" },
    ],
  },
];

const FAMILY_SITES = [
  { label: "MEALBOX25 — 식자재 전문몰", href: "#business" },
  { label: "Cooksan — 특화 밀키트", href: "#products" },
  { label: "식자재 전문몰 입점 문의", href: "#contact" },
];

const SNS_LINKS = [
  { icon: Instagram, label: "채다원 인스타그램", href: "#top" },
  { icon: Youtube, label: "채다원 유튜브", href: "#top" },
  { icon: Facebook, label: "채다원 페이스북", href: "#top" },
  { icon: Globe, label: "채다원 블로그", href: "#top" },
];

function FamilySiteDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-[240px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-white/[0.06] px-4 py-3 text-[15px] font-bold text-white/70 transition-colors hover:border-white/45 hover:text-white"
      >
        Family Site
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 z-20 mb-2 w-full overflow-hidden rounded-xl border border-white/15 bg-brand-deep shadow-2xl"
            role="listbox"
            aria-label="패밀리 사이트"
          >
            {FAMILY_SITES.map((site) => (
              <li key={site.label} role="option" aria-selected="false">
                <a
                  href={site.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[15px] font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {site.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-ink text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8 md:py-12">
          <div>
            <p className="text-[15px] font-bold tracking-[0.24em] text-[#7fc0a8]">
              START YOUR PROJECT
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight md:text-[28px]">
              식자재 공급 · OEM/ODM, 지금 바로 상담받으세요
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[16px] font-bold text-brand-deep transition-colors hover:bg-brand-soft"
            >
              1:1 문의하기
            </a>
            <a
              href={`tel:${COMPANY.phone.replace(/-/g, "")}`}
              className="font-num inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[16px] font-bold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-[16px] leading-relaxed text-white/60">
              {COMPANY.slogan}
              <br />
              올바른 식자재 유통과 차별화된 식품 솔루션으로
              건강한 식문화를 발전시킵니다.
            </p>
            <ul className="mt-6 flex items-center gap-2" aria-label="SNS 링크">
              {SNS_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/45 hover:text-white"
                  >
                    <s.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <FamilySiteDropdown />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {MENU_GROUPS.map((group) => (
              <nav key={group.title} aria-label={`${group.title} 메뉴`}>
                <p className="text-[15px] font-extrabold tracking-[0.14em] text-white">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[15px] text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Certification badges */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          {[
            "HACCP 인증 4종 보유",
            "과채가공품 · 간편조리세트 · 신선편의식품 · 즉석섭취식품",
            "콜드체인 배송 시스템",
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[15px] font-semibold text-white/70"
            >
              <ShieldCheck className="h-4 w-4 text-[#7fc0a8]" aria-hidden="true" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-6 text-[15px] text-white/60 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <a href="#top" className="font-bold text-white/75 transition-colors hover:text-white">
              개인정보처리방침
            </a>
            <span aria-hidden="true">|</span>
            <a href="#top" className="transition-colors hover:text-white/70">
              이용약관
            </a>
            <span aria-hidden="true">|</span>
            <a href="#contact" className="transition-colors hover:text-white/70">
              고객의 소리
            </a>
          </div>
          <p className="leading-relaxed">
            {COMPANY.name} · 대표자 {COMPANY.ceo} · {COMPANY.address} ·{" "}
            대표전화 <span className="font-num">{COMPANY.phoneDisplay}</span>
          </p>
          <p>© {new Date().getFullYear()} CHEDAWON Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
