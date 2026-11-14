import { HISTORY } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function History() {
  return (
    <section id="history" className="py-24 md:py-32" aria-labelledby="history-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Our History"
          title={"꾸준히 성장해 온\n채다원의 발자취"}
          description="2017년 법인 설립부터 HACCP 인증과 주요 고객사 공급까지, 채다원의 여정을 소개합니다."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <ol className="relative" aria-label="연혁 타임라인">
              <div
                className="absolute bottom-3 left-3 top-3 w-px bg-brand-line"
                aria-hidden="true"
              />
              {HISTORY.map((entry) => (
                <li key={entry.year} className="relative pb-10 pl-14 last:pb-0">
                  <span
                    className="absolute left-3 top-2 h-[18px] w-[18px] -translate-x-1/2 rounded-full border-[4px] border-brand bg-white"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <span className="font-num text-3xl font-black tracking-tight text-brand-deep md:text-4xl">
                      {entry.year}
                    </span>
                    <span className="h-px w-8 bg-brand-line" aria-hidden="true" />
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {entry.items.map((item) => (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 rounded-xl border border-brand-line/60 bg-brand-mist px-4 py-3"
                      >
                        <span className="font-num shrink-0 rounded-lg bg-brand px-2 py-1 text-xs font-bold text-white">
                          {item.month}월
                        </span>
                        <span className="text-[14.5px] font-semibold text-foreground/85">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </FadeIn>

          {/* Side card */}
          <FadeIn delay={0.15} className="lg:col-span-5">
            <div className="texture-dark sticky top-28 overflow-hidden rounded-2xl p-8 md:p-10">
              <p className="kicker-light">Organization</p>
              <h3 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-white">
                전문역량을 펼치며 미래에
                <br />
                한발 다가갑니다
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/65">
                사업운영 효율성 및 경쟁력 강화를 위한 조직 확대 및 전문화된
                조직으로 거듭나고 시너지 창출 극대화를 위해 노력합니다.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { name: "상품영업부", teams: "상품개발 · 영업 · 마케팅" },
                  { name: "경영지원부", teams: "회계 · 경영 · 고객지원" },
                  { name: "생산부", teams: "물류 · 입고 · 상품관리" },
                  { name: "기술연구소", teams: "플랫폼 · 디자인 · 콘텐츠" },
                ].map((dept) => (
                  <li
                    key={dept.name}
                    className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-4"
                  >
                    <p className="text-[15px] font-extrabold text-white">{dept.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                      {dept.teams}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/10 pt-6 text-[13px] leading-relaxed text-white/50">
                (주)채다원의 구성원 모두가 각자의 자리에서 전문역량을 펼치며
                미래에 한발 다가갑니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
