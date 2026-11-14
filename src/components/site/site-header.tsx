"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/company";

const NAV = [
  { href: "#about", label: "회사소개" },
  { href: "#business", label: "사업영역" },
  { href: "#values", label: "핵심가치" },
  { href: "#products", label: "제품소개" },
  { href: "#infra", label: "인프라" },
  { href: "#history", label: "연혁" },
  { href: "#contact", label: "문의" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-header border-b border-brand-line/60 shadow-[0_4px_24px_-12px_rgba(10,61,49,0.18)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label="채다원 홈으로 이동">
            <Logo variant={scrolled ? "dark" : "light"} />
          </a>

          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
                      scrolled
                        ? "text-foreground/80 hover:bg-brand-soft hover:text-brand"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                scrolled
                  ? "bg-brand text-white hover:bg-brand-deep"
                  : "bg-white/15 text-white ring-1 ring-white/40 hover:bg-white hover:text-brand-deep"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {COMPANY.phoneDisplay}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label="메뉴 열기"
            aria-expanded={open}
          >
            <Menu
              className={cn(
                "h-6 w-6",
                scrolled ? "text-brand-deep" : "text-white"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
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
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
                aria-label="메뉴 닫기"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-8" aria-label="모바일 메뉴">
              <ul className="space-y-2">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-3xl font-extrabold text-white/90 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="px-8 pb-10">
              <p className="text-sm font-semibold tracking-[0.2em] text-white/40">
                CHEDAWON CO., LTD.
              </p>
              <p className="mt-2 text-lg font-bold text-white">{COMPANY.phoneDisplay}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
