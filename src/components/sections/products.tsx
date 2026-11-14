"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Package, Salad, Utensils, Weight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PRODUCTS, PRODUCT_LINES } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";
import { useCallback, useEffect, useState } from "react";

export function Products() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const count = PRODUCTS.length;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section id="products" className="py-24 md:py-32" aria-labelledby="products-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Product Line"
            title={"MEALBOX25\n프레시 샐러드 라인"}
            description="신선한 재료로 준비된 프리미엄 샐러드를 만나보세요. 매일의 식사를 더 건강하고 간편하게."
          />

          {/* Carousel controls */}
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-3">
              <span className="font-num mr-2 text-sm font-bold text-muted-foreground">
                <span className="text-brand-deep">{String(current + 1).padStart(2, "0")}</span>
                {" / "}
                {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-line bg-white text-brand-deep transition-all hover:bg-brand hover:text-white"
                aria-label="이전 제품 보기"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-line bg-white text-brand-deep transition-all hover:bg-brand hover:text-white"
                aria-label="다음 제품 보기"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="mt-12"
          >
            <CarouselContent className="-ml-5">
              {PRODUCTS.map((product) => (
                <CarouselItem
                  key={product.name}
                  className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-brand-line/70 bg-white">
                    <div className="relative">
                      <div className="relative aspect-square overflow-hidden bg-brand-mist">
                        <Image
                          src={product.image}
                          alt={`${product.name} 제품 이미지`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <span className="absolute left-4 top-4 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold tracking-wide text-white shadow-md">
                        FRESH SALAD
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-extrabold tracking-tight text-brand-deep">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-brand/60">
                        {product.en}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-brand-line/60 pt-4 text-[13px] font-semibold text-foreground/70">
                        <span className="inline-flex items-center gap-1.5">
                          <Weight className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                          {product.weight}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Salad className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                          {product.kcal}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Utensils className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                          {product.dressing}
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                        {product.items.join(" · ")}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </FadeIn>

        {/* Other lines */}
        <FadeIn delay={0.15}>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRODUCT_LINES.map((line) => (
              <div
                key={line.name}
                className="flex items-start gap-4 rounded-2xl border border-brand-line/70 bg-brand-mist p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <Package className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-[15px] font-extrabold text-brand-deep">{line.name}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {line.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
