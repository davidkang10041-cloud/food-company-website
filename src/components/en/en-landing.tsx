"use client";

import {
  ArrowRight,
  ArrowUpRight,
  ChefHat,
  Factory,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

/* ------------------------------ Data ------------------------------ */

const STATS: { value: string; label: string }[] = [
  { value: "16,000+", label: "Business clients" },
  { value: "81.5%", label: "Repeat order rate" },
  { value: "620,330+", label: "Cumulative deliveries" },
  { value: "4", label: "HACCP-certified product categories" },
];

const SERVICES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
}[] = [
  {
    icon: Truck,
    title: "B2B Food Distribution & Purchasing",
    desc: "Nationwide sourcing and purchasing agency services with strong price competitiveness and a cold-chain delivery network for business clients.",
    tags: ["Nationwide sourcing", "Cold-chain delivery"],
  },
  {
    icon: Factory,
    title: "OEM / ODM Manufacturing",
    desc: "Meal kit and convenience food production at the industry's lowest MOQ, with recipe development, licensing, and packaging support.",
    tags: ["Industry-lowest MOQ", "HACCP plants"],
  },
  {
    icon: ChefHat,
    title: "Cooksan Meal Kits",
    desc: "Premium meal kits for single-person and busy households — aligned with the airline meal replacement (AMR) trend.",
    tags: ["Premium kits", "AMR trend"],
  },
  {
    icon: Store,
    title: "Online Food Mall",
    desc: "A verified ingredient marketplace for food-service business owners, offering live market price information and a proven service record.",
    tags: ["Live price info", "Verified service"],
  },
];

const HACCP_CATEGORIES = [
  "Fruit & vegetable processed products",
  "Ready-to-cook sets",
  "Fresh convenience foods",
  "Ready-to-eat foods",
];

const FLOW_STEPS = [
  "Washing",
  "Slicing",
  "Vacuum packing (GP460)",
  "Tray sealing",
  "Metal detection",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "We support the industry's lowest MOQ for OEM/ODM production, so new brands and small businesses can launch products without heavy inventory risk.",
  },
  {
    q: "Which product categories are HACCP-certified?",
    a: "Four categories — fruit & vegetable processed products, ready-to-cook sets, fresh convenience foods, and ready-to-eat foods — are produced in self-operated HACCP-certified plants.",
  },
  {
    q: "Do you deliver nationwide?",
    a: "Yes. Our cold-chain logistics network delivers fresh ingredients to business clients across Korea, backed by an 81.5% repeat order rate.",
  },
];

/* --------------------------- Component ----------------------------- */

export function EnLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-brand-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:h-[72px] md:px-8">
          <a href="/en" aria-label="CHEDAWON home">
            <Logo variant="dark" />
          </a>
          <nav aria-label="English site navigation" className="flex items-center gap-2.5">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-line px-4 py-2 text-[14px] font-bold text-brand-deep transition-colors hover:border-brand hover:text-brand"
            >
              한국어
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="#contact-en"
              className="rounded-full bg-brand px-5 py-2 text-[14px] font-bold text-white transition-colors hover:bg-brand-deep"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="bg-brand-mist" aria-label="Introduction">
          <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
            <FadeIn>
              <p className="kicker">TOTAL FOOD SOLUTION</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-[36px] font-extrabold leading-[1.12] tracking-tight text-foreground md:text-[56px]">
                From sourcing to your table,
                <br />
                one integrated food partner.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
                CHEDAWON delivers B2B food ingredient distribution and meal kit
                OEM/ODM manufacturing at the industry&apos;s lowest MOQ — built
                on major-airline catering expertise and HACCP-certified,
                self-operated plants in Incheon and Seongnam.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact-en"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[16px] font-bold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-deep"
                >
                  Start an inquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#businesses-en"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-7 py-3.5 text-[16px] font-bold text-brand transition-all hover:border-brand hover:bg-brand hover:text-white"
                >
                  Explore businesses
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Trust metrics */}
        <section className="bg-cream" aria-label="Company performance">
          <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-20">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {STATS.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.08}>
                  <div className="hover-lift h-full rounded-2xl border border-brand-line bg-white p-6">
                    <p className="stat-num text-[30px] text-brand md:text-[36px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[15px] font-semibold text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* What we do */}
        <section id="businesses-en" className="bg-white py-24 md:py-32" aria-label="What we do">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <SectionHeading
              kicker="WHAT WE DO"
              title={"Integrated food solutions,\nfrom sourcing to shelf."}
              description="Four business lines covering the full value chain — procurement, manufacturing, branded meal kits, and online retail."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {SERVICES.map((service, i) => (
                <FadeIn key={service.title} delay={i * 0.08}>
                  <div className="group hover-lift flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <service.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-[19px] font-extrabold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-muted-foreground">
                      {service.desc}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key points">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-brand-soft px-3 py-1 text-[13px] font-bold text-brand"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & certification */}
        <section className="bg-brand-mist py-24 md:py-32" aria-label="Quality and certification">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <SectionHeading
              kicker="QUALITY & CERTIFICATION"
              title={"HACCP-certified production,\nend to end."}
              description="Four product categories are produced in self-operated, HACCP-certified plants in Incheon and Seongnam, supported by dedicated production equipment."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {HACCP_CATEGORIES.map((category, i) => (
                <FadeIn key={category} delay={i * 0.08}>
                  <div className="hover-lift flex h-full items-center gap-3 rounded-2xl border border-brand-line bg-white p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-[15.5px] font-bold leading-snug text-foreground">
                      {category}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn className="mt-10" delay={0.1}>
              <div className="rounded-2xl border border-brand-line bg-white p-6 md:p-8">
                <p className="text-[14px] font-bold tracking-[0.24em] text-brand">
                  PRODUCTION FLOW
                </p>
                <ul
                  className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3"
                  aria-label="Production flow"
                >
                  {FLOW_STEPS.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-[15px] font-semibold text-brand-deep">
                        <span className="font-num mr-1.5 text-brand/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </span>
                      {i < FLOW_STEPS.length - 1 && (
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-brand/50"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream py-24 md:py-32" aria-label="Frequently asked questions">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <SectionHeading kicker="FAQ" title="Frequently asked questions" />
            <dl className="mt-12 space-y-4">
              {FAQS.map((faq, i) => (
                <FadeIn key={faq.q} delay={i * 0.08}>
                  <div className="rounded-2xl border border-brand-line bg-white p-6 md:p-8">
                    <dt className="flex items-start gap-3 text-[18px] font-extrabold tracking-tight text-foreground">
                      <span className="font-num shrink-0 text-brand/40" aria-hidden="true">
                        Q{String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </dt>
                    <dd className="mt-3 pl-8 text-[16px] leading-relaxed text-muted-foreground">
                      {faq.a}
                    </dd>
                  </div>
                </FadeIn>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact */}
        <section id="contact-en" className="bg-white py-24 md:py-32" aria-label="Contact">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <SectionHeading
              kicker="CONTACT"
              title="Start the conversation."
              description="Tell us about your sourcing needs or your product idea — our team will respond promptly."
            />
            <FadeIn className="mt-12">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
                <div className="rounded-2xl border border-brand-line bg-brand-mist p-6 md:p-8">
                  <dl className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-[14px] font-bold tracking-[0.16em] text-brand">
                          ADDRESS
                        </dt>
                        <dd className="mt-1.5 text-[16px] font-semibold text-foreground">
                          1-39, Manseok-dong, Dong-gu, Incheon, South Korea
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-[14px] font-bold tracking-[0.16em] text-brand">
                          PHONE
                        </dt>
                        <dd className="font-num mt-1.5 text-[16px] font-semibold text-foreground">
                          +82-32-752-7227
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-[14px] font-bold tracking-[0.16em] text-brand">
                          COMPANY
                        </dt>
                        <dd className="mt-1.5 text-[16px] font-semibold text-foreground">
                          CHEDAWON Co., Ltd. — est. 2017
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-col rounded-2xl bg-brand p-6 text-white md:p-8">
                  <p className="text-[15px] font-bold tracking-[0.24em] text-white/60">
                    INQUIRY
                  </p>
                  <p className="mt-3 text-[22px] font-extrabold leading-snug tracking-tight md:text-[24px]">
                    For English inquiries, please call or email us.
                  </p>
                  <p className="mt-3 flex-1 text-[16px] leading-relaxed text-white/70">
                    Korean inquiries: use the 1:1 form on the Korean site. Our
                    team typically responds within one business day.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <a
                      href="tel:+82-32-752-7227"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[16px] font-bold text-brand-deep transition-colors hover:bg-brand-soft"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call +82-32-752-7227
                    </a>
                    <a
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-3 text-[16px] font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-brand-deep"
                    >
                      Korean 1:1 inquiry form
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="mt-auto border-t border-brand-line bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-8 text-[14.5px] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} CHEDAWON Co., Ltd. All rights reserved.</p>
          <nav aria-label="Footer legal links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/privacy" className="transition-colors hover:text-brand">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-brand">
              Terms
            </a>
            <a href="/" className="font-bold transition-colors hover:text-brand">
              한국어 사이트
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
