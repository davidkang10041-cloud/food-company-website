"use client";

import Image from "next/image";
import { useState } from "react";
import { Flame, Package, UtensilsCrossed } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { PRODUCTS, PRODUCT_LINES } from "@/lib/company";
import { cn } from "@/lib/utils";

const DRESSING_TABS = ["전체", "발사므", "랜치", "오리엔탈"] as const;

export function Products() {
  const [tab, setTab] = useState(0);
  const filtered =
    tab === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.dressing === DRESSING_TABS[tab]);

  return (
    <section id="products" className="relative overflow-hidden bg-cream">
      {/* Decorative brand circle */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full border-[44px] border-brand-soft"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-56 -left-32 h-[420px] w-[420px] rounded-full border-[36px] border-brand-soft/70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn>
            <p className="kicker-tomato">Signature Brand</p>
            <h2 className="h-section mt-4 text-foreground">
              쿡산 <span className="text-brand">Cooksan</span> 브랜드
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              자체 HACCP 생산시설에서 만든 프리미엄 샐러드와 밀키트. 신선한
              식재료를 가장 신선하게, 여러분의 식탁까지 전합니다.
            </p>
          </FadeIn>

          {/* Tabs */}
          <FadeIn delay={0.15} className="shrink-0">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="드레싱별 제품 필터"
            >
              {DRESSING_TABS.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={cn(
                    "rounded-full px-4.5 py-2.5 text-[14px] font-bold transition-all",
                    tab === i
                      ? "bg-brand text-white shadow-md shadow-brand/25"
                      : "bg-white text-foreground/65 ring-1 ring-border hover:text-brand"
                  )}
                >
                  {t === "전체" ? "전체" : `${t} 드레싱`}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Product grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:mt-14 md:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {filtered.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.07}>
              <article className="hover-lift group h-full overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="img-zoom relative aspect-square overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-brand-ink/70 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur-sm">
                    {p.weight}
                  </span>
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-tomato">
                    {p.dressing}
                  </p>
                  <h3 className="mt-1.5 text-[16px] font-extrabold tracking-tight text-foreground md:text-[17px]">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-medium text-muted-foreground">
                    {p.en}
                  </p>
                  <div className="mt-3.5 flex items-center gap-3 border-t border-border pt-3.5 text-[12px] font-semibold text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Flame
                        className="h-3.5 w-3.5 text-tomato"
                        aria-hidden="true"
                      />
                      <span className="font-num">{p.kcal}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <UtensilsCrossed
                        className="h-3.5 w-3.5 text-brand"
                        aria-hidden="true"
                      />
                      {p.items.length}종
                    </span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Product lines */}
        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {PRODUCT_LINES.map((line, i) => (
            <FadeIn key={line.name} delay={i * 0.08}>
              <div className="group flex h-full flex-col gap-3 rounded-2xl border border-brand-line bg-white/70 px-6 py-6 transition-colors hover:border-brand">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                    <Package className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-[17px] font-extrabold tracking-tight text-foreground">
                    {line.name}
                  </h3>
                </div>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                  {line.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
