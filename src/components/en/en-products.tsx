"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EN_PRODUCTS,
  EN_PRODUCT_LINES,
  EN_BUSINESSES,
} from "@/lib/company-en";

const KIT_FEATURES = [
  "1,000g salad kit — sweet corn · olive slices · egg · cherry tomatoes · vegetable mix",
  "A bulk format used easily in homes, cafés, and small food-service businesses",
  "Produced daily and delivered cold-chain, fresh as it gets",
];

const OEM_FEATURES = [
  "New and existing brand OEM · ODM — multi-item production across food types",
  "Licensing and menu analysis, product & package design, and video production",
  "Sales channels connected — from B2B partner proposals to MCN, crowdfunding, and commerce",
];

export function EnProducts() {
  const manufacturing = EN_BUSINESSES.find((b) => b.id === "manufacturing");

  return (
    <section
      id="products"
      className="bg-white py-24 md:py-32"
      aria-label="Products"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker="PRODUCTS"
            title={"Premium salads, delivered\nat their freshest"}
            description="Fresh ingredients produced the same day, carefully packed in our HACCP-certified facility. Meet them in three ways to suit your taste and purpose."
          />
          <FadeIn delay={0.1}>
            <Tabs defaultValue="salad" className="w-full lg:w-auto">
              <TabsList className="h-12 w-full justify-start gap-1 rounded-full border border-brand-line bg-cream p-1.5 lg:w-auto">
                <TabsTrigger
                  value="salad"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  Premium Salad
                </TabsTrigger>
                <TabsTrigger
                  value="kit"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  Salad Kit
                </TabsTrigger>
                <TabsTrigger
                  value="oem"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  OEM · ODM
                </TabsTrigger>
              </TabsList>

              {/* Salad products */}
              <TabsContent value="salad" className="mt-10">
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
                  {EN_PRODUCTS.map((p, i) => (
                    <FadeIn as="li" key={p.name} delay={i * 0.05}>
                      <article className="hover-lift h-full overflow-hidden rounded-2xl border border-brand-line bg-white">
                        <div className="img-zoom relative aspect-square overflow-hidden bg-cream">
                          <Image
                            src={p.image}
                            alt={`${p.name} (${p.kr})`}
                            fill
                            sizes="(max-width: 768px) 50vw, 240px"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-[16.5px] font-extrabold tracking-tight text-foreground">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-[14.5px] font-semibold tracking-wide text-muted-foreground">
                            {p.kr}
                          </p>
                          <div className="font-num mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[14.5px] font-bold text-brand">
                            <span className="whitespace-nowrap">{p.weight}</span>
                            <span className="whitespace-nowrap">{p.kcal}</span>
                          </div>
                          <p className="mt-1.5 text-[14px] font-semibold text-muted-foreground">
                            {p.dressing} dressing
                          </p>
                          <p className="mt-3 line-clamp-2 text-[14.5px] leading-relaxed text-muted-foreground">
                            {p.items.join(" · ")}
                          </p>
                        </div>
                      </article>
                    </FadeIn>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3 rounded-2xl border border-brand-line bg-cream p-6 sm:grid-cols-3">
                  {EN_PRODUCT_LINES.map((line) => (
                    <div key={line.name}>
                      <p className="text-[15px] font-extrabold text-brand-deep">
                        {line.name}
                      </p>
                      <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted-foreground">
                        {line.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Salad kit */}
              <TabsContent value="kit" className="mt-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <FadeIn className="img-zoom overflow-hidden rounded-2xl">
                    <Image
                      src="/images/biz-kit-v4.png"
                      alt="CHEDAWON salad kit composition — fresh vegetables and ingredients"
                      width={1344}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="h-72 w-full object-cover md:h-96"
                    />
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="text-[14.5px] font-bold tracking-[0.22em] text-brand">
                      SALAD KIT · 1,000g
                    </p>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-[28px]">
                      {EN_PRODUCT_LINES[2].name}
                    </h3>
                    <ul className="mt-6 space-y-3.5">
                      {KIT_FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="text-[16px] leading-relaxed text-foreground/80">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-line-dark mt-8">
                      Inquire about kit supply
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </FadeIn>
                </div>
              </TabsContent>

              {/* OEM / ODM */}
              <TabsContent value="oem" className="mt-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <FadeIn delay={0.1} className="order-2 lg:order-1">
                    <p className="text-[14.5px] font-bold tracking-[0.22em] text-brand">
                      OEM · ODM MANUFACTURING
                    </p>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight whitespace-pre-line text-foreground md:text-[28px]">
                      {manufacturing?.headline}
                    </h3>
                    <ul className="mt-6 space-y-3.5">
                      {OEM_FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="text-[16px] leading-relaxed text-foreground/80">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-line-dark mt-8">
                      Inquire about OEM/ODM manufacturing
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </FadeIn>
                  <FadeIn className="img-zoom order-1 overflow-hidden rounded-2xl lg:order-2">
                    <Image
                      src="/images/biz-mfg-v5.png"
                      alt="Production line at CHEDAWON's HACCP-certified food manufacturing facility"
                      width={1344}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="h-72 w-full object-cover md:h-96"
                    />
                  </FadeIn>
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
