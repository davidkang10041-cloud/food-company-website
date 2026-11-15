"use client";

import { Hotel, Plane, Store, UtensilsCrossed } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { EN_CHANNELS, EN_PARTNERS } from "@/lib/company-en";

const CHANNEL_ICONS = {
  plane: Plane,
  store: Store,
  utensils: UtensilsCrossed,
  hotel: Hotel,
} as const;

export function EnPartners() {
  return (
    <section
      id="partners-en"
      className="bg-white py-24 md:py-32"
      aria-label="Partner network"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="PARTNERSHIP"
          title={"Trusted partnerships,\nfrom the sky to the convenience store."}
          description="Years of ingredient supply expertise with Korea's major airlines, now extended to major retail chains, salad franchises, and hotels & resorts."
        />

        {/* Partner wordmark cards */}
        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {EN_PARTNERS.map((p, i) => (
            <FadeIn as="li" key={p} delay={(i % 4) * 0.05}>
              <article className="hover-lift flex h-full items-center justify-center rounded-2xl border border-brand-line bg-cream p-6">
                <p className="text-center text-[17px] font-extrabold tracking-tight text-brand-deep">
                  {p}
                </p>
              </article>
            </FadeIn>
          ))}
        </ul>

        {/* Supply channels */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {EN_CHANNELS.map((channel, i) => {
            const Icon = CHANNEL_ICONS[channel.icon];
            return (
              <FadeIn key={channel.label} delay={i * 0.06}>
                <article className="hover-lift flex h-full flex-col rounded-2xl border border-brand-line bg-brand-mist p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-extrabold tracking-tight text-foreground">
                    {channel.label}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {channel.desc}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
