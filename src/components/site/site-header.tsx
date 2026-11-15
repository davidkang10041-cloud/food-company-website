"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/components/settings-context";

type MegaItem = {
  href: string;
  label: string;
  en: string;
  desc: string;
  links: { href: string; label: string; desc: string }[];
};

const MEGA: MegaItem[] = [
  {
    href: "#about",
    label: "회사소개",
    en: "About",
    desc: "항공사 케이터링에서 검증된\n통합 식품 솔루션 기업",
    links: [
      { href: "#about", label: "기업 개요", desc: "설립 배경과 사업분야 한눈에" },
      { href: "#about", label: "대표 인사말", desc: "박영호 대표이사의 경영 철학" },
      { href: "#history", label: "회사 연혁", desc: "2017년 설립부터 지금까지" },
    ],
  },
  {
    href: "#business",
    label: "사업영역",
    en: "Business",
    desc: "유통 · 제조 · 밀키트 · 온라인까지\n전과정을 아우르는 푸드 솔루션",
    links: [
      { href: "#business", label: "식자재 유통 · 구매대행", desc: "B2B 통합 구매 솔루션" },
      { href: "#business", label: "식품제조 연결사업", desc: "업계 최소 MOQ OEM/ODM" },
      { href: "#business", label: "특화 밀키트 Cooksan", desc: "단체급식 맞춤 밀키트" },
      { href: "#business", label: "식자재 전문몰", desc: "온라인 식자재 스토어" },
    ],
  },
  {
    href: "#products",
    label: "제품소개",
    en: "Products",
    desc: "신선함을 가장 신선하게 전하는\n프리미엄 샐러드와 밀키트",
    links: [
      { href: "#products", label: "프리미엄 샐러드", desc: "식전 · 메인을 한 팩에" },
      { href: "#products", label: "셀러드 키트", desc: "1,000g 홈케어 패키지" },
      { href: "#products", label: "OEM · ODM 제조", desc: "브랜드 맞춤 생산" },
    ],
  },
  {
    href: "#quality",
    label: "품질·인증",
    en: "Quality",
    desc: "HACCP 4종 인증과\n전문 생산시설의 품질 경쟁력",
    links: [
      { href: "#quality", label: "HACCP 인증 현황", desc: "4종 전 분야 인증 보유" },
      { href: "#quality", label: "생산시설 · 설비", desc: "자체 생산 인프라와 설비" },
      { href: "#quality", label: "핵심 역량", desc: "경쟁력의 5대 축" },
    ],
  },
  {
    href: "#news",
    label: "뉴스룸",
    en: "Newsroom",
    desc: "새로운 공급 확대와\n인증 · 시설 소식을 전합니다",
    links: [
      { href: "#news", label: "공지사항", desc: "공식 발표와 인증 소식" },
      { href: "#news", label: "사업 · 공급 소식", desc: "신규 공급계약 · 확대 소식" },
    ],
  },
  {
    href: "#growth",
    label: "지속가능성",
    en: "Sustainability",
    desc: "데이터 기반 성장 전략과\n상생 파트너십의 미래",
    links: [
      { href: "#growth", label: "성장 전략", desc: "데이터 기반 성장 지표" },
      { href: "#growth", label: "핵심가치", desc: "우리가 지키는 네 가지 원칙" },
      { href: "#partners", label: "파트너 네트워크", desc: "함께 성장하는 기업들" },
    ],
  },
  {
    href: "#contact",
    label: "문의",
    en: "Contact",
    desc: "식자재 공급 · OEM/ODM\n1:1 상담으로 신속하게",
    links: [
      { href: "#contact", label: "1:1 문의하기", desc: "공급 · 제조 상담 접수" },
      { href: "#contact", label: "오시는 길", desc: "인천 동구 본사 오시는 안내" },
    ],
  },
];

const QUICK_LINKS = MEGA.flatMap((m) => m.links);

export function SiteHeader() {
  const settings = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setOpenMenu(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const overflow = mobileOpen || searchOpen ? "hidden" : "";
    document.body.style.overflow = overflow;
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return QUICK_LINKS;
    return QUICK_LINKS.filter((l) => l.label.toLowerCase().includes(q.toLowerCase()));
  }, [query]);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-header shadow-[0_8px_30px_-18px_rgba(6,25,19,0.3)]"
            : "bg-transparent"
        )}
        onMouseLeave={scheduleClose}
      >
        {/* Utility bar */}
        <div
          className={cn(
            "hidden overflow-hidden transition-all duration-500 lg:block",
            scrolled ? "max-h-0" : "max-h-10"
          )}
        >
          <div className="utility-bar">
            <div className="mx-auto flex h-10 max-w-[1280px] items-center justify-between px-8 text-[14px] font-medium tracking-wide text-white/75">
              <p>
                식자재 유통 · 밀키트 OEM/ODM — HACCP 인증 4종 보유 전문 기업
              </p>
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2" aria-label="언어 선택">
                  <a href="/" className="font-bold text-white" aria-current="true">
                    KR
                  </a>
                  <span className="text-white/30" aria-hidden="true">
                    |
                  </span>
                  <a
                    href="/en"
                    className="text-white/55 transition-colors hover:text-white"
                    title="English site"
                  >
                    EN
                  </a>
                </span>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-1.5 transition-colors hover:text-white"
                  aria-label="통합 검색 열기"
                >
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                  검색
                </button>
                <span className="font-num font-bold text-white/90">
                  SINCE 2017
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main GNB */}
        <div
          className={cn(
            "mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 transition-all duration-500 md:h-[76px] md:px-8",
            scrolled && "md:h-[68px]"
          )}
        >
          <a href="#top" aria-label="채다원 홈으로 이동" className="shrink-0">
            <Logo variant={scrolled ? "dark" : "light"} />
          </a>

          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ul className="flex items-stretch">
              {MEGA.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.href);
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    onFocus={() => {
                      cancelClose();
                      setOpenMenu(item.href);
                    }}
                    aria-expanded={openMenu === item.href}
                    className={cn(
                      "relative flex h-16 items-center px-4 text-[16px] font-bold transition-colors xl:px-5 md:h-[76px]",
                      scrolled && "md:h-[68px]",
                      scrolled
                        ? openMenu === item.href
                          ? "text-brand"
                          : "text-foreground/85 hover:text-brand"
                        : openMenu === item.href
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-3.5 w-3.5 transition-transform duration-300",
                        openMenu === item.href && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-brand transition-transform duration-300 xl:inset-x-5",
                        openMenu === item.href ? "scale-x-100" : "scale-x-0"
                      )}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                scrolled
                  ? "text-foreground/70 hover:bg-brand-soft hover:text-brand"
                  : "text-white/85 hover:bg-white/15 hover:text-white"
              )}
              aria-label="통합 검색"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <a
              href="#contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold transition-all",
                scrolled
                  ? "bg-brand text-white hover:bg-brand-deep"
                  : "bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-sm hover:bg-white hover:text-brand-deep"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {settings.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                scrolled ? "text-brand-deep" : "text-white"
              )}
              aria-label="검색 열기"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                scrolled ? "text-brand-deep" : "text-white"
              )}
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mega dropdown */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mega-panel hidden bg-white lg:block"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mx-auto grid min-h-[280px] max-w-[1280px] grid-cols-[1fr_2fr] gap-12 px-8 pb-8 pt-9">
                  <div>
                    {MEGA.filter((m) => m.href === openMenu).map((item) => (
                      <div key={item.href}>
                        <p className="kicker">{item.en.toUpperCase()}</p>
                        <p className="mt-4 text-[26px] font-extrabold tracking-tight text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-3 whitespace-pre-line text-[16px] leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                        <a
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-brand-deep"
                        >
                          섹션 바로가기
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    ))}
                  </div>
                  <ul className="grid grid-cols-2 content-start gap-x-5 gap-y-2.5 self-start">
                    {MEGA.filter((m) => m.href === openMenu).map((item) =>
                      item.links.map((link, i) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-center gap-4 rounded-xl border border-brand-line/60 bg-white px-4 py-3.5 transition-all hover:border-brand/40 hover:bg-brand-soft hover:shadow-[0_12px_28px_-18px_rgba(14,95,76,0.45)]"
                          >
                            <span
                              className="font-num text-[13px] font-bold tabular-nums text-brand/45 transition-colors group-hover:text-brand"
                              aria-hidden="true"
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[16px] font-bold text-foreground/85 transition-colors group-hover:text-brand-deep">
                                {link.label}
                              </span>
                              <span className="mt-0.5 block text-[15px] text-muted-foreground">
                                {link.desc}
                              </span>
                            </span>
                            <ArrowUpRight
                              className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="border-t border-brand-line bg-brand-mist/60">
                  <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-8 py-3.5">
                    <p className="text-[15px] text-muted-foreground">
                      <span className="font-bold text-foreground/75">
                        식자재 공급 · OEM/ODM 상담
                      </span>
                      이 필요하신가요? 담당자가 신속하게 연결해드립니다.
                    </p>
                    <a
                      href="#contact"
                      onClick={() => setOpenMenu(null)}
                      className="group inline-flex items-center gap-1.5 text-[15px] font-bold text-brand transition-colors hover:text-brand-deep"
                    >
                      1:1 문의하기
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-brand-ink/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="통합 검색"
          >
            <div className="mx-auto flex h-16 w-full max-w-[880px] items-center justify-between px-5 pt-8 md:h-20">
              <p className="text-[14px] font-bold tracking-[0.28em] text-white/70">
                SEARCH CHEDAWON
              </p>
              <button
                type="button"
                onClick={closeSearch}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                aria-label="검색 닫기"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mx-auto w-full max-w-[880px] flex-1 px-5 pb-10 pt-6 md:px-8">
              <div className="flex items-center gap-4 border-b-2 border-white/25 pb-4 transition-colors focus-within:border-white">
                <Search
                  className="h-7 w-7 shrink-0 text-white/70"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="찾으시는 메뉴를 입력하세요 (예: 밀키트, HACCP)"
                  className="h-11 w-full bg-transparent text-2xl font-bold text-white placeholder:text-white/35 focus:outline-none md:text-3xl"
                  aria-label="검색어 입력"
                />
              </div>
              <p className="mt-4 text-[15px] font-semibold text-white/50">
                {query.trim()
                  ? `${results.length}개의 결과를 찾았습니다`
                  : "주요 메뉴 바로가기"}
              </p>
              <ul className="thin-scroll mt-6 grid max-h-[46vh] grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2">
                {results.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={closeSearch}
                      className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                      <ChevronRight
                        className="h-4 w-4 text-brand-soft opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="col-span-full py-10 text-center text-[16px] text-white/50">
                    &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-brand-ink lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo variant="light" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
                aria-label="메뉴 닫기"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav
              className="thin-scroll flex-1 overflow-y-auto px-6 pb-10 pt-4"
              aria-label="모바일 메뉴"
            >
              <ul className="divide-y divide-white/10">
                {MEGA.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.href ? null : item.href
                        )
                      }
                      className="flex w-full items-center justify-between py-5 text-left"
                      aria-expanded={mobileExpanded === item.href}
                    >
                      <span className="text-2xl font-extrabold text-white">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-white/50 transition-transform duration-300",
                          mobileExpanded === item.href && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-3 text-[15px] leading-relaxed text-white/60">
                            {item.desc.replace(/\n/g, " ")}
                          </p>
                          <ul className="pb-5">
                            {item.links.map((link) => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2.5 text-[16px] font-medium text-white/80 transition-colors hover:text-white"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-6 pb-10 pt-4">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-brand py-4 text-[16px] font-bold text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                1:1 문의하기 · {settings.phoneDisplay}
              </a>
              <p className="mt-4 text-center text-[14px] font-semibold tracking-[0.2em] text-white/60">
                CHEDAWON CO., LTD. · SINCE 2017
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
