"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#about-en", label: "About" },
  { href: "#business-en", label: "Business" },
  { href: "#products-en", label: "Products" },
  { href: "#quality-en", label: "Quality" },
  { href: "#partners-en", label: "Partners" },
  { href: "#news-en", label: "News" },
  { href: "#faq-en", label: "FAQ" },
];

export function EnHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-colors",
        scrolled ? "border-brand-line shadow-[0_8px_30px_-18px_rgba(6,25,19,0.25)]" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <a href="/en" aria-label="CHEDAWON home" onClick={close}>
          <Logo variant="dark" />
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="English site navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[15px] font-bold text-foreground/75 transition-colors hover:bg-brand-soft hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-brand-line px-4 py-2 text-[14px] font-bold text-brand-deep transition-colors hover:border-brand hover:text-brand sm:inline-flex"
          >
            한국어
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href="#contact-en"
            className="hidden rounded-full bg-brand px-5 py-2 text-[14px] font-bold text-white transition-colors hover:bg-brand-deep md:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="en-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-brand-soft lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="en-mobile-menu"
        className={cn(
          "overflow-hidden border-brand-line bg-white transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[480px] border-t" : "max-h-0"
        )}
      >
        <nav aria-label="English mobile navigation" className="px-5 py-4">
          <ul className="grid gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[16px] font-bold text-foreground transition-colors hover:bg-brand-soft hover:text-brand"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-brand/50" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-2 border-t border-brand-line pt-3">
              <a
                href="/"
                onClick={close}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-line px-4 py-2.5 text-[15px] font-bold text-brand-deep"
              >
                한국어
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="#contact-en"
                onClick={close}
                className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-[15px] font-bold text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
