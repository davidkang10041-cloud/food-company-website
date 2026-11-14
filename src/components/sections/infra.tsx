import Image from "next/image";
import { Award, CalendarRange, Cog, ShieldCheck, FileBadge } from "lucide-react";
import { CERTIFICATIONS, EQUIPMENTS } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function Infra() {
  return (
    <section id="infra" className="bg-brand-mist py-24 md:py-32" aria-labelledby="infra-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Infrastructure"
          title={"HACCP 인증과 첨단 설비로 만드는\n안전한 식품"}
          description="최첨단 시설을 갖춘 생산공장, 엄격한 기준에 의거한 위생과 안전에 만전을 기하고 있습니다."
        />

        {/* Certifications */}
        <FadeIn>
          <div className="mt-14">
            <h3 className="flex items-center gap-2.5 text-xl font-extrabold text-brand-deep">
              <ShieldCheck className="h-6 w-6 text-brand" aria-hidden="true" />
              인증현황
              <span className="font-num rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                HACCP 4종
              </span>
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {CERTIFICATIONS.map((cert, i) => (
                <FadeIn key={cert.no} delay={i * 0.06} className="h-full">
                  <article className="hover-lift flex h-full flex-col rounded-2xl border border-brand-line/70 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
                        <Award className="h-5.5 w-5.5 text-brand" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
                        인증
                      </span>
                    </div>
                    <h4 className="mt-4 text-[16px] font-extrabold text-brand-deep">
                      {cert.name}
                      <span className="text-brand"> HACCP</span>
                    </h4>
                    <p className="text-[12px] font-semibold text-muted-foreground">
                      식품안전관리인증기준(HACCP) 적용업소 인증서
                    </p>
                    <dl className="mt-4 space-y-2 border-t border-brand-line/60 pt-4 text-[12.5px]">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <FileBadge className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                        <dd className="font-num">{cert.no}</dd>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <CalendarRange className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                        <dd className="font-num">{cert.period}</dd>
                      </div>
                    </dl>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Equipment */}
        <FadeIn delay={0.1}>
          <div className="mt-16">
            <h3 className="flex items-center gap-2.5 text-xl font-extrabold text-brand-deep">
              <Cog className="h-6 w-6 text-brand" aria-hidden="true" />
              설비현황
              <span className="font-num rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                주요 설비 10종
              </span>
            </h3>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              {/* Images */}
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-brand-line/70 bg-white">
                  <Image
                    src="/images/facility-1.png"
                    alt="자동 열성형 진공포장기 설비"
                    width={1152}
                    height={864}
                    className="h-56 w-full object-cover sm:h-64"
                  />
                  <p className="p-4 text-center text-[13px] font-semibold text-muted-foreground">
                    자동 열성형 진공포장기 · 트레이 실러 포장기
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-brand-line/70 bg-white">
                  <Image
                    src="/images/facility-2.png"
                    alt="대형 3단 버블세척기 설비"
                    width={1152}
                    height={864}
                    className="h-56 w-full object-cover sm:h-64"
                  />
                  <p className="p-4 text-center text-[13px] font-semibold text-muted-foreground">
                    대형 3단 버블세척기 · 채소 슬라이서
                  </p>
                </div>
              </div>

              {/* Equipment list */}
              <div className="lg:col-span-6">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {EQUIPMENTS.map((equipment, i) => (
                    <li
                      key={equipment}
                      className="flex items-center gap-3 rounded-xl border border-brand-line/70 bg-white px-4 py-3.5"
                    >
                      <span className="font-num flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-[12px] font-black text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] font-semibold text-foreground/80">
                        {equipment}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
