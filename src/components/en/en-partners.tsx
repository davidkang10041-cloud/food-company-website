"use client";

import { Plane, Store, Hotel, UtensilsCrossed } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { EN_PARTNERS, type EnPartnerItem } from "@/lib/company-en";

const CHANNELS = [
  { icon: Plane, label: "Airlines & Catering", desc: "Korean Air · Asiana Airlines · LSG" },
  { icon: Store, label: "Major Retail", desc: "GS Retail (supermarkets & convenience stores)" },
  { icon: UtensilsCrossed, label: "Franchise", desc: "Salad & meal-kit brands" },
  { icon: Hotel, label: "Hotels & Resorts", desc: "Catering ingredient supply" },
];

export function EnPartners() {
  return (
    <section
      id="partners"
      className="bg-white py-24 md:py-32"
      aria-label="Partner network"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="PARTNERSHIP"
          title={"From tables in the sky to convenience stores,\nproven partnerships"}
          description="Years of expertise supplying major Korean airlines — now expanding into supermarkets and convenience stores of large retailers, salad franchises, and hotels & resorts."
        />

        {/* Partner wordmark cards */}
        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {(EN_PARTNERS as EnPartnerItem[]).map((p, i) => (
            <FadeIn as="li" key={p.name} delay={(i % 4) * 0.05}>
              <article className="hover-lift flex h-full flex-col justify-between rounded-2xl border border-brand-line bg-cream p-6">
                <p className="text-[18px] font-extrabold tracking-tight text-brand-deep">
                  {p.name}
                </p>
                <p className="mt-2 text-[16px] font-semibold text-muted-foreground">
                  {p.ko}
                </p>
              </article>
            </FadeIn>
          ))}
          <FadeIn as="li" delay={0.2}>
            <article className="flex h-full flex-col justify-between rounded-2xl bg-brand p-6 text-white">
              <p className="text-[18px] font-extrabold tracking-tight">
                16,000+
              </p>
              <p className="mt-2 text-[16px] font-semibold text-white/75">
                Growing together with our business clients
              </p>
            </article>
          </FadeIn>
        </ul>

        {/* Supply channels */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <FadeIn as="li" key={c.label} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-brand-line bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[16px] font-extrabold text-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 text-[15.5px] text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
