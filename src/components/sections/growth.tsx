"use client";

import Image from "next/image";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { STRATEGY_PILLARS, VALUES } from "@/lib/company";

export function Growth() {
  return (
    <>
      {/* Growth strategy — dark */}
      <section
        id="growth"
        className="texture-dark py-24 text-white md:py-32"
        aria-label="지속가능한 성장 전략"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            dark
            kicker="SUSTAINABILITY"
            title={"지속가능한 성장,\n데이터로 설계합니다"}
            description="다섯 가지 핵심 역량으로 식품유통의 지속성장기업으로 나아갑니다."
          />

          <FadeIn delay={0.08}>
            <ol className="mt-14 border-t border-white/10 md:mt-16">
              {STRATEGY_PILLARS.map((p, i) => (
                <li
                  key={p.name}
                  className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-b border-white/10 px-2 py-8 transition-colors duration-300 hover:bg-white/[0.05] md:grid-cols-[104px_232px_1fr] md:items-start md:gap-x-10 md:px-6 md:py-10"
                >
                  <span
                    className="font-num text-[30px] font-extrabold leading-none tracking-tight text-white/20 transition-colors duration-300 group-hover:text-[#7fc0a8] md:text-[38px]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[20px] font-extrabold tracking-tight text-white md:pt-1 md:text-[22px]">
                    {p.name}
                  </h3>
                  <ul className="col-span-2 space-y-2.5 md:col-span-1">
                    {p.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[15.5px] leading-relaxed text-white/75 md:text-[16.5px]"
                      >
                        <span
                          className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-[#7fc0a8]"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* Core values — light */}
      <section
        id="values"
        className="bg-white py-24 md:py-32"
        aria-label="핵심가치"
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            kicker="OUR VALUES"
            title={"사람과 먹거리를 향한\n네 가지 약속"}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <FadeIn as="li" key={v.title} delay={i * 0.06}>
                <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-brand-line bg-white">
                  <div className="img-zoom relative h-40 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.title.replace(/\n/g, " ")}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-extrabold tracking-tight whitespace-pre-line text-foreground">
                      {v.title}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {v.points.slice(0, 3).map((pt) => (
                        <li
                          key={pt}
                          className="flex gap-2 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
