"use client";

import { EnHeader } from "@/components/en/en-header";
import { EnHero } from "@/components/en/en-hero";
import { EnAbout } from "@/components/en/en-about";
import { EnBusiness } from "@/components/en/en-business";
import { EnProducts } from "@/components/en/en-products";
import { EnQuality } from "@/components/en/en-quality";
import { EnGrowth } from "@/components/en/en-growth";
import { EnHistory } from "@/components/en/en-history";
import { EnPartners } from "@/components/en/en-partners";
import { EnNews } from "@/components/en/en-news";
import { EnFaq } from "@/components/en/en-faq";
import { EnContact } from "@/components/en/en-contact";
import { EnFooter } from "@/components/en/en-footer";

export function EnLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <EnHeader />
      <main id="main" className="flex-1">
        <EnHero />
        <EnAbout />
        <EnBusiness />
        <EnProducts />
        <EnQuality />
        <EnGrowth />
        <EnHistory />
        <EnPartners />
        <EnNews />
        <EnFaq />
        <EnContact />
      </main>
      <EnFooter />
    </div>
  );
}
