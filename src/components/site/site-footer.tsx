import { Logo } from "./logo";
import { COMPANY } from "@/lib/company";
import { MapPin, Phone } from "lucide-react";

const FOOTER_LINKS = [
  { href: "#about", label: "회사소개" },
  { href: "#business", label: "사업영역" },
  { href: "#values", label: "핵심가치" },
  { href: "#products", label: "제품소개" },
  { href: "#infra", label: "인프라" },
  { href: "#history", label: "연혁" },
  { href: "#contact", label: "문의하기" },
];

export function SiteFooter() {
  return (
    <footer className="texture-dark mt-auto text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-[15px] leading-relaxed text-white/60">
              {COMPANY.slogan}
              <br />
              올바른 식자재 유통과 차별화된 식품 솔루션으로
              건강한 식문화를 발전시킵니다.
            </p>
          </div>

          <nav aria-label="푸터 메뉴">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
              Menu
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:flex sm:flex-col sm:gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-[15px] text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft/80" aria-hidden="true" />
                <span>
                  <span className="text-white/45">대표전화&nbsp;&nbsp;</span>
                  {COMPANY.phoneDisplay}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft/80" aria-hidden="true" />
                <span>
                  <span className="text-white/45">주소&nbsp;&nbsp;</span>
                  {COMPANY.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            {COMPANY.name} · 대표자 {COMPANY.ceo} · {COMPANY.address} ·{" "}
            {COMPANY.phoneDisplay}
          </p>
          <p>© {new Date().getFullYear()} CHEDAWON Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
