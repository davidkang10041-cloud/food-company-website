"use client";

import Image from "next/image";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { EN_PRODUCTS, EN_PRODUCT_LINES } from "@/lib/company-en";

export function EnProducts() {
  return (
    <section
      id="products-en"
      className="bg-white py-24 md:py-32"
      aria-label="Product lineup"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="COOKSAN · MEAL KITS"
            title={"Premium salads and meal kits,\nproduced fresh in our own plants."}
            description="Designed for single-person households and busy lifestyles — aligned with the airline meal replacement (AMR) trend and produced under HACCP-certified processes."
          />
          <FadeIn delay={0.15} className="shrink-0">
            <span className="rounded-full bg-brand-soft px-4 py-2 text-[15px] font-bold text-brand">
              MEALBOX25 · Cooksan
            </span>
          </FadeIn>
        </div>

        {/* Salad lineup */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {EN_PRODUCTS.map((product, i) => (
            <FadeIn
              as="li"
              key={product.name}
              delay={(i % 3) * 0.06}
            >
              <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition-colors duration-300 hover:border-brand/40">
                <div className="img-zoom relative h-52 overflow-hidden bg-brand-mist">
                  <Image
                    src={product.image}
                    alt={`${product.name} — CHEDAWON Cooksan salad kit`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-brand-line/60 p-5">
                  <h3 className="text-[18px] font-extrabold tracking-tight text-foreground">
                    {product.name}
                  </h3>
                  <p className="font-num mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[14px] font-semibold text-muted-foreground">
                    <span>{product.weight}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.kcal}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-brand">{product.dressing} dressing</span>
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Ingredients">
                    {product.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-brand-soft px-2.5 py-1 text-[12.5px] font-semibold text-brand"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}

          {/* Product lines card */}
          <FadeIn as="li" delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-brand p-6 text-white md:p-7">
              <div>
                <p className="text-[14px] font-bold tracking-[0.24em] text-white/60">
                  FULL LINEUP
                </p>
                <h3 className="mt-3 text-[20px] font-extrabold tracking-tight">
                  Three salad lines,
                  <br />
                  dressing always separate.
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {EN_PRODUCT_LINES.map((line) => (
                  <li key={line.name}>
                    <p className="text-[15.5px] font-extrabold">{line.name}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-white/70">
                      {line.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </ul>
      </div>
    </section>
  );
}

