"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { VALUES } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function Values() {
  return (
    <section id="values" className="bg-brand-mist" aria-labelledby="values-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          kicker="Sustainability"
          title={"신유통 패러다임을 제시하며\n책임 있게 성장합니다"}
          description="고객사를 위한 차별화 서비스부터 사회적 책임까지 — 채다원이 지향하는 네 가지 가치입니다."
        />

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          {VALUES.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.08}>
              <article className="hover-lift group grid h-full overflow-hidden rounded-2xl bg-white shadow-sm sm:grid-cols-[0.9fr_1.1fr]">
                <div className="img-zoom relative min-h-44 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title.replace("\n", " ")}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 to-transparent" />
                  <span className="font-num absolute left-5 top-4 text-[14px] font-bold tracking-[0.18em] text-white/80">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-col p-6 md:p-7">
                  <h3 className="whitespace-pre-line text-[20px] font-extrabold leading-snug tracking-tight text-foreground md:text-[22px]">
                    {value.title}
                  </h3>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {value.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[15px] leading-relaxed text-muted-foreground"
                      >
                        <ArrowUpRight
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="mt-5 block h-[3px] w-10 rounded-full bg-tomato transition-all duration-500 group-hover:w-20"
                    aria-hidden="true"
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
