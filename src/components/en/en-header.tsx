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
import { EnLogo } from "./en-logo";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/components/settings-context";

type MegaItem = {
  href: string;
  label: string;
  kicker: string;
  desc: string;
  links: { href: string; label: string; desc: string }[];
};

const MEGA: MegaItem[] = [
  {
    href: "#about",
    label: "About Us",
    kicker: "ABOUT",
    desc: "A trusted integrated food solutions company\nbuilt on airline catering expertise",
    links: [
      { href: "#about", label: "Corporate Overview", desc: "Our background and business areas at a glance" },
      { href: "#about", label: "CEO Message", desc: "The management philosophy of CEO Park Young-ho" },
      { href: "#history", label: "Company History", desc: "From incorporation in 2017 to today" },
    ],
  },
  {
    href: "#business",
    label: "Business",
    kicker: "BUSINESS",
    desc: "Distribution · Manufacturing · Meal kits · Online —\nfood solutions across the entire chain",
    links: [
      { href: "#business", label: "Ingredient Distribution & Purchasing", desc: "One-stop B2B purchasing solutions" },
      { href: "#business", label: "Food Manufacturing OEM/ODM", desc: "The industry's lowest MOQ OEM/ODM" },
      { href: "#business", label: "Cooksan Specialty Meal Kits", desc: "Meal kits tailored for group catering" },
      { href: "#business", label: "Online Ingredient Mall", desc: "Our online ingredient store" },
    ],
  },
  {
    href: "#products",
    label: "Products",
    kicker: "PRODUCTS",
    desc: "Premium salads and meal kits,\ndelivered at peak freshness",
    links: [
      { href: "#products", label: "Premium Salads", desc: "Appetizer and main in one pack" },
      { href: "#products", label: "Salad Kit", desc: "1,000g home-care package" },
      { href: "#products", label: "OEM · ODM Manufacturing", desc: "Production tailored to your brand" },
    ],
  },
  {
    href: "#quality",
    label: "Quality",
    kicker: "QUALITY",
    desc: "HACCP certifications across 4 categories\nand dedicated production facilities",
    links: [
      { href: "#quality", label: "HACCP Certifications", desc: "Certified across all 4 food categories" },
      { href: "#quality", label: "Production Facilities & Equipment", desc: "In-house infrastructure and equipment" },
      { href: "#quality", label: "Core Competencies", desc: "The five pillars of our strength" },
    ],
  },
  {
    href: "#news",
    label: "Newsroom",
    kicker: "NEWSROOM",
    desc: "Updates on supply expansion,\ncertifications and facilities",
    links: [
      { href: "#news", label: "Announcements", desc: "Official releases and certification news" },
      { href: "#news", label: "Business & Supply News", desc: "New contracts and supply expansion" },
    ],
  },
  {
    href: "#growth",
    label: "Sustainability",
    kicker: "SUSTAINABILITY",
    desc: "A data-driven growth strategy\nand partnerships for shared value",
    links: [
      { href: "#growth", label: "Growth Strategy", desc: "Data-driven growth metrics" },
      { href: "#values", label: "Core Values", desc: "The four principles we keep" },
      { href: "#partners", label: "Partner Network", desc: "The companies growing with us" },
    ],
  },
  {
    href: "#contact",
    label: "Contact",
    kicker: "CONTACT",
    desc: "Ingredient supply · OEM/ODM —\nfast 1:1 consultation",
    links: [
      { href: "#contact", label: "1:1 Inquiry", desc: "Supply & manufacturing consultations" },
      { href: "#contact", label: "Directions", desc: "How to find our Incheon headquarters" },
    ],
  },
];

const QUICK_LINKS = MEGA.flatMap((m) => m.links);

export function EnHeader() {
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
                Ingredient distribution · Meal kit OEM/ODM — HACCP-certified across 4 food categories
              </p>
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2" aria-label="Language selection">
                  <a
                    href="/"
                    className="text-white/55 transition-colors hover:text-white"
                    title="한국어 사이트"
                  >
                    KR
                  </a>
                  <span className="text-white/30" aria-hidden="true">
                    |
                  </span>
                  <a href="/en" className="font-bold text-white" aria-current="true">
                    EN
                  </a>
                </span>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-1.5 transition-colors hover:text-white"
                  aria-label="Open site search"
                >
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                  Search
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
          <a href="#top" aria-label="Go to CHEDAWON home" className="shrink-0">
            <EnLogo variant={scrolled ? "dark" : "light"} />
          </a>

          <nav className="hidden lg:block" aria-label="Main menu">
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
                      "relative flex h-16 items-center whitespace-nowrap px-4 text-[16px] font-bold transition-colors xl:px-5 md:h-[76px]",
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
              aria-label="Site search"
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
              aria-label="Open search"
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
              aria-label="Open menu"
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
                        <p className="kicker">{item.kicker}</p>
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
                          Go to section
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
                        Ingredient supply · OEM/ODM consultation
                      </span>{" "}
                      needed? Our team will connect you promptly.
                    </p>
                    <a
                      href="#contact"
                      onClick={() => setOpenMenu(null)}
                      className="group inline-flex items-center gap-1.5 text-[15px] font-bold text-brand transition-colors hover:text-brand-deep"
                    >
                      1:1 Inquiry
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
            aria-label="Site search"
          >
            <div className="mx-auto flex h-16 w-full max-w-[880px] items-center justify-between px-5 pt-8 md:h-20">
              <p className="text-[14px] font-bold tracking-[0.28em] text-white/70">
                SEARCH CHEDAWON
              </p>
              <button
                type="button"
                onClick={closeSearch}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                aria-label="Close search"
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
                  placeholder="Search the site (e.g. meal kit, HACCP)"
                  className="h-11 w-full bg-transparent text-2xl font-bold text-white placeholder:text-white/35 focus:outline-none md:text-3xl"
                  aria-label="Search query"
                />
              </div>
              <p className="mt-4 text-[15px] font-semibold text-white/50">
                {query.trim()
                  ? `${results.length} result${results.length === 1 ? "" : "s"} found`
                  : "Quick menu links"}
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
                    No results for &ldquo;{query}&rdquo;.
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
              <EnLogo variant="light" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav
              className="thin-scroll flex-1 overflow-y-auto px-6 pb-10 pt-4"
              aria-label="Mobile menu"
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
                1:1 Inquiry · {settings.phoneDisplay}
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
