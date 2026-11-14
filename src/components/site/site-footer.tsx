import Link from "next/link";
import { Logo } from "./logo";
import { COMPANY } from "@/lib/company";
import { Building2, MapPin, Phone } from "lucide-react";

const MENU_GROUPS = [
  {
    title: "회사소개",
    links: [
      { href: "#about", label: "대표 인사말" },
      { href: "#about", label: "기업 개요" },
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
      { href: "#products", label: "쿡산 제품" },
      { href: "#quality", label: "HACCP 인증" },
      { href: "#quality", label: "생산시설" },
    ],
  },
  {
    title: "지속가능성",
    links: [
      { href: "#growth", label: "핵심 역량" },
      { href: "#growth", label: "성장 전략" },
      { href: "#values", label: "핵심가치" },
      { href: "#partners", label: "파트너" },
    ],
  },
];

const UTILITY_LINKS = [
  { href: "#contact", label: "1:1 문의" },
  { href: "#contact", label: "오시는 길" },
  { href: "#history", label: "회사 연혁" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-ink text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8 md:py-12">
          <div>
            <p className="text-[13px] font-bold tracking-[0.24em] text-[#7fc0a8]">
              START YOUR PROJECT
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight md:text-[28px]">
              식자재 공급 · OEM/ODM, 지금 바로 상담받으세요
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-bold text-brand-deep transition-colors hover:bg-brand-soft"
            >
              1:1 문의하기
            </a>
            <a
              href={`tel:${COMPANY.phone.replace(/-/g, "")}`}
              className="font-num inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
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
            <p className="mt-5 text-[15px] leading-relaxed text-white/55">
              {COMPANY.slogan}
              <br />
              올바른 식자재 유통과 차별화된 식품 솔루션으로
              건강한 식문화를 발전시킵니다.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {UTILITY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-white/65 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {MENU_GROUPS.map((group) => (
              <nav key={group.title} aria-label={`${group.title} 메뉴`}>
                <p className="text-[13px] font-extrabold tracking-[0.14em] text-white">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-white/55 transition-colors hover:text-white"
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

        <div className="mt-12 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6 text-[14px] text-white/60 md:grid-cols-3">
          <p className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7fc0a8]" aria-hidden="true" />
            <span>
              <span className="font-semibold text-white/85">주소</span>
              <br />
              {COMPANY.address}
            </span>
          </p>
          <p className="flex items-start gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#7fc0a8]" aria-hidden="true" />
            <span>
              <span className="font-semibold text-white/85">대표전화</span>
              <br />
              <span className="font-num">{COMPANY.phoneDisplay}</span>
            </span>
          </p>
          <p className="flex items-start gap-2.5">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7fc0a8]" aria-hidden="true" />
            <span>
              <span className="font-semibold text-white/85">사업분야</span>
              <br />
              {COMPANY.business}
            </span>
          </p>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 text-[12.5px] text-white/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            {COMPANY.name} · 대표자 {COMPANY.ceo} · {COMPANY.address} ·{" "}
            {COMPANY.phoneDisplay}
          </p>
          <p className="flex items-center gap-4">
            <Link href="#top" className="transition-colors hover:text-white/70">
              개인정보처리방침
            </Link>
            <span aria-hidden="true">|</span>
            <span>
              © {new Date().getFullYear()} CHEDAWON Co., Ltd. All rights
              reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
