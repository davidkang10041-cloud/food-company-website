"use client";

import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { HISTORY } from "@/lib/company";

export function History() {
  const sorted = [...HISTORY].sort((a, b) => b.year - a.year);

  return (
    <section id="history" className="bg-brand-mist" aria-labelledby="history-heading">
      <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              kicker="Our Journey"
              title={"법인 설립부터\n대기업 공급까지"}
              description="2017년 항공사 케이터링 식자재 공급으로 시작해, HACCP 인증과 자체 공장 신설, 대기업 유통 공급으로 성장을 이어갑니다."
            />
            <FadeIn delay={0.2} className="mt-8">
              <div className="rounded-2xl border border-border bg-white px-6 py-6">
                <p className="text-[13px] font-bold tracking-[0.2em] text-brand">
                  MILESTONES
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-num text-3xl font-black text-brand-deep">
                      8<span className="text-lg">년+</span>
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">
                      지속 성장 기간
                    </p>
                  </div>
                  <div>
                    <p className="font-num text-3xl font-black text-brand-deep">
                      4<span className="text-lg">종</span>
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">
                      HACCP 인증
                    </p>
                  </div>
                  <div>
                    <p className="font-num text-3xl font-black text-brand-deep">
                      2<span className="text-lg">개</span>
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">
                      생산 공장 운영
                    </p>
                  </div>
                  <div>
                    <p className="font-num text-3xl font-black text-brand-deep">
                      7<span className="text-lg">+</span>
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">
                      대형 공급 파트너
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Timeline */}
          <ol className="relative space-y-10 border-l-2 border-brand-line pl-8 md:pl-10">
            {sorted.map((group, gi) => (
              <FadeIn key={group.year} as="li" delay={gi * 0.05} className="relative">
                <span
                  className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center md:-left-[50px]"
                  aria-hidden="true"
                >
                  <span className="absolute h-5 w-5 rounded-full bg-brand/15" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-white" />
                </span>
                <p className="font-num text-[26px] font-black tracking-tight text-foreground md:text-[32px]">
                  {group.year}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={`${item.month}-${item.text}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3"
                    >
                      <span className="font-num shrink-0 rounded-md bg-brand px-2 py-0.5 text-[12px] font-bold text-white">
                        {item.month}월
                      </span>
                      <span className="text-[14.5px] font-semibold text-foreground/85">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
