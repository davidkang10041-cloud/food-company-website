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
import { EnLogo } from "./en-logo";
import { useSiteSettings } from "@/components/settings-context";
import { EN_COMPANY } from "@/lib/company-en";

const MENU_GROUPS = [
  {
    title: "About Us",
    links: [
      { href: "#about", label: "Corporate Overview" },
      { href: "#about", label: "CEO Message" },
      { href: "#history", label: "Company History" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "#business", label: "Ingredient Distribution" },
      { href: "#business", label: "Food Manufacturing" },
      { href: "#business", label: "Specialty Meal Kits" },
      { href: "#business", label: "Ingredient Mall" },
    ],
  },
  {
    title: "Products & Quality",
    links: [
      { href: "#products", label: "Premium Salads" },
      { href: "#quality", label: "HACCP Certification" },
      { href: "#quality", label: "Facilities & Equipment" },
    ],
  },
  {
    title: "Sustainability",
    links: [
      { href: "#growth", label: "Growth Strategy" },
      { href: "#values", label: "Core Values" },
      { href: "#partners", label: "Partners" },
    ],
  },
];

const FAMILY_SITES = [
  { label: "MEALBOX25 — Ingredient Mall", href: "#business" },
  { label: "Cooksan — Specialty Meal Kits", href: "#products" },
  { label: "Become a mall seller", href: "#contact" },
];

const SNS_LINKS = [
  { icon: Instagram, label: "CHEDAWON Instagram", href: "#top" },
  { icon: Youtube, label: "CHEDAWON YouTube", href: "#top" },
  { icon: Facebook, label: "CHEDAWON Facebook", href: "#top" },
  { icon: Globe, label: "CHEDAWON Blog", href: "#top" },
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
            aria-label="Family sites"
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

export function EnFooter() {
  const settings = useSiteSettings();

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
              Ingredient supply · OEM/ODM — get a consultation today
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[16px] font-bold text-brand-deep transition-colors hover:bg-brand-soft"
            >
              1:1 Inquiry
            </a>
            <a
              href={`tel:${settings.phone.replace(/-/g, "")}`}
              className="font-num inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[16px] font-bold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {settings.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <EnLogo variant="light" />
            <p className="mt-5 text-[16px] leading-relaxed text-white/60">
              {EN_COMPANY.slogan}
              <br />
              Advancing healthy food culture through the right ingredient
              distribution and differentiated food solutions.
            </p>
            <ul className="mt-6 flex items-center gap-2" aria-label="SNS links">
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
              <nav key={group.title} aria-label={`${group.title} menu`}>
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
            "HACCP certified — 4 categories",
            "Fruit & Vegetable · Ready-to-Cook · Fresh Convenience · Ready-to-Eat",
            "Cold-chain delivery system",
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
            <a href="/privacy" className="font-bold text-white/75 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <span aria-hidden="true">|</span>
            <a href="/terms" className="transition-colors hover:text-white/70">
              Terms of Use
            </a>
            <span aria-hidden="true">|</span>
            <a href="/" className="transition-colors hover:text-white/70">
              한국어
            </a>
            <span aria-hidden="true">|</span>
            <a href="#contact" className="transition-colors hover:text-white/70">
              Contact Us
            </a>
          </div>
          <p className="leading-relaxed">
            {EN_COMPANY.name} · CEO {EN_COMPANY.ceo} · {EN_COMPANY.address} ·{" "}
            Tel <span className="font-num">{settings.phoneDisplay}</span>
          </p>
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} {EN_COMPANY.name}. All rights reserved.</p>
            <a
              href="/admin"
              className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[13.5px] font-semibold text-white/45 transition-colors hover:border-white/45 hover:text-white"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
