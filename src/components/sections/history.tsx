"use client";

import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { HISTORY } from "@/lib/company";

export function History() {
  return (
    <section
      id="history"
      className="bg-brand-mist py-24 md:py-32"
      aria-label="회사 연혁"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="HISTORY"
          title={"항공 케이터링에서 시작해\n대기업 유통 채널로"}
          description="2017년 법인 설립 이후, 검증된 품질로 공급처를 넓혀왔습니다."
        />

        <div className="relative mt-16">
          {/* Spine */}
          <span
            className="absolute bottom-0 left-[11px] top-2 w-px bg-brand-line md:left-[15px]"
            aria-hidden="true"
          />
          <ol className="space-y-12">
            {HISTORY.map((h, yi) => (
              <FadeIn as="li" key={h.year} delay={yi * 0.04}>
                <div className="relative flex flex-col gap-4 pl-12 md:flex-row md:gap-10 md:pl-16">
                  {/* Node */}
                  <span
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center md:top-2 md:h-8 md:w-8"
                    aria-hidden="true"
                  >
                    <span
                      className={
                        yi === 0
                          ? "flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white md:h-8 md:w-8 md:text-[11px]"
                          : "h-3 w-3 rounded-full border-2 border-brand bg-white md:h-4 md:w-4"
                      }
                    >
                      {yi === 0 ? "NOW" : ""}
                    </span>
                  </span>

                  <p className="font-num w-24 shrink-0 text-[30px] font-extrabold tracking-tight text-brand-deep md:text-[36px]">
                    {h.year}
                  </p>
                  <ul className="grid flex-1 gap-2.5 sm:grid-cols-2">
                    {h.items.map((item) => (
                      <li
                        key={`${h.year}-${item.month}-${item.text}`}
                        className="flex items-center gap-3 rounded-xl border border-brand-line bg-white px-4 py-3"
                      >
                        <span className="font-num shrink-0 rounded-md bg-brand-soft px-2 py-1 text-[12px] font-extrabold text-brand">
                          {item.month}월
                        </span>
                        <span className="text-[14px] font-semibold text-foreground/85">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
