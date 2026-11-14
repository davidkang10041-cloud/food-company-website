import Image from "next/image";
import { Quote } from "lucide-react";
import { COMPANY_INFO, CEO_MESSAGE } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function About() {
  return (
    <section id="about" className="bg-brand-mist py-24 md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="About CHEDAWON"
            title={"사람. 다양한 생활.\n좋은 먹거리"}
            description="채다원은 식자재 유통의 모든 과정을 책임지는 통합 식품 솔루션 기업입니다."
          />
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-brand-line/70 bg-white px-6 py-4">
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand">
                {CEO_MESSAGE.title.split("\n")[0]}
              </p>
              <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.2em] text-brand/70">
                {CEO_MESSAGE.title.split("\n")[1]}
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Company info card */}
          <FadeIn className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-brand-line/70 bg-white p-7 md:p-9">
              <h3 className="text-lg font-extrabold text-brand-deep">회사 개요</h3>
              <dl className="mt-6 divide-y divide-brand-line/60">
                {COMPANY_INFO.map((info) => (
                  <div
                    key={info.label}
                    className="flex flex-col gap-1 py-3.5 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <dt className="text-sm font-semibold text-muted-foreground sm:w-28 shrink-0">
                      {info.label}
                    </dt>
                    <dd className="text-[15px] font-semibold text-foreground">
                      {info.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>

          {/* Image card */}
          <FadeIn delay={0.1} className="lg:col-span-7">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl">
              <Image
                src="/images/about.png"
                alt="신선한 채소와 과일이 가득한 채다원의 식재료"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-7 md:p-9">
                <p className="text-lg font-extrabold leading-snug text-white md:text-xl">
                  생산지, 공급사와의 파트너십으로
                  <br />
                  상생하며 성장하는 식자재 전문 기업
                </p>
                <span className="hidden shrink-0 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm ring-1 ring-white/30 sm:inline-block">
                  SINCE 2017
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* CEO greeting */}
        <FadeIn delay={0.1}>
          <article className="mt-6 overflow-hidden rounded-2xl border border-brand-line/70 bg-white">
            <div className="relative p-7 md:p-12">
              <Quote
                className="absolute right-8 top-8 h-16 w-16 text-brand-soft md:h-24 md:w-24"
                aria-hidden="true"
                strokeWidth={1}
              />
              <h3 className="max-w-2xl text-2xl font-extrabold leading-snug tracking-tight text-brand-deep md:text-[28px]">
                &ldquo;고객의 요구를 충족시킬 수 있는
                <br />
                신뢰받는 식자재 솔루션 공급자&rdquo;
              </h3>
              <div className="mt-7 max-w-4xl space-y-5">
                {CEO_MESSAGE.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.9] text-foreground/80 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-9 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-black text-white">
                  박
                </span>
                <div>
                  <p className="text-base font-extrabold text-brand-deep">박 영 호</p>
                  <p className="text-sm text-muted-foreground">
                    주식회사 채다원 대표이사
                  </p>
                </div>
              </div>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
