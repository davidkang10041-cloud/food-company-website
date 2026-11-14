import Image from "next/image";
import {
  ChevronRight,
  ClipboardCheck,
  Coins,
  Database,
  Factory,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Truck,
} from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { STRATEGY_PILLARS, VALUES } from "@/lib/company";

const PILLAR_ICONS = [Factory, ShieldCheck, Coins, TrendingUp, Database];

const FLOW = [
  { icon: Sprout, label: "원물 소싱", desc: "우수 산지 네트워크" },
  { icon: Factory, label: "HACCP 제조", desc: "자체 생산 시설" },
  { icon: ClipboardCheck, label: "품질 검수", desc: "Function별 체크" },
  { icon: Truck, label: "콜드체인 배송", desc: "당일 생산 · 신선" },
  { icon: Database, label: "데이터 축적", desc: "맞춤 서비스 설계" },
];

const GROWTH_METRICS = [
  { value: "16,000+", label: "이용 고객사" },
  { value: "81.5%", label: "고객 재이용률" },
  { value: "620,330+", label: "누적 배송 건수" },
  { value: "4종", label: "HACCP 인증 보유" },
];

export function Growth() {
  return (
    <>
      {/* Growth strategy — light, warm food-editorial */}
      <section
        id="growth"
        className="relative overflow-hidden bg-brand-mist py-24 md:py-32"
        aria-label="지속가능한 성장 전략"
      >
        {/* Soft organic accents */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-brand-soft opacity-70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[#f6efe2] opacity-60 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHeading
            kicker="SUSTAINABILITY"
            title={"지속가능한 성장,\n데이터로 설계합니다"}
            description="다섯 가지 핵심 역량이 하나의 프로세스로 이어져, 식품유통의 지속성장기업을 만듭니다."
          />

          {/* Feature panel: fresh imagery + verified metrics */}
          <FadeIn delay={0.08} className="mt-12 md:mt-14">
            <div className="overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-[0_32px_70px_-42px_rgba(6,25,19,0.28)]">
              <div className="grid lg:grid-cols-[1.05fr_1fr]">
                <div className="img-zoom relative min-h-[260px] overflow-hidden lg:min-h-[440px]">
                  <Image
                    src="/images/hero-mealkit.png"
                    alt="신선한 식재료와 채다원 밀키트"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-[14.5px] font-bold text-brand-deep backdrop-blur-sm">
                      HACCP 인증 자체공장
                    </span>
                    <span className="rounded-full bg-brand/90 px-4 py-2 text-[14.5px] font-bold text-white backdrop-blur-sm">
                      다품종 소량생산
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                  <p className="text-[15px] font-bold tracking-[0.22em] text-brand">
                    FIVE CORE COMPETENCIES
                  </p>
                  <h3 className="mt-3.5 text-[24px] font-extrabold leading-[1.35] tracking-tight whitespace-pre-line text-foreground md:text-[28px]">
                    {"원물에서 데이터까지,\n다섯 가지 역량으로 설계합니다"}
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground md:text-[16.5px]">
                    산지 소싱부터 HACCP 제조, 가격 경쟁력, 트렌드 대응, 데이터 기반
                    서비스까지 — 검증된 운영 노하우가 채다원의 성장을 견인합니다.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {GROWTH_METRICS.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-brand-line/60 bg-brand-mist px-5 py-4 transition-colors duration-300 hover:border-brand/40 hover:bg-brand-soft"
                      >
                        <p className="font-num text-[24px] font-extrabold leading-none tracking-tight text-brand">
                          {m.value}
                        </p>
                        <p className="mt-2 text-[15px] font-bold text-muted-foreground">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Five capability cards */}
          <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
            {STRATEGY_PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Database;
              const featured = i < 2;
              return (
                <FadeIn
                  key={p.name}
                  delay={0.14 + i * 0.05}
                  className={featured ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <article className="hover-lift group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 md:p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                      </span>
                      <span className="font-num text-[28px] font-extrabold leading-none tracking-tight text-brand-line transition-colors duration-300 group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[20px] font-extrabold tracking-tight text-foreground md:text-[21px]">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[14px] font-bold uppercase tracking-[0.18em] text-brand/60">
                      {p.en}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {p.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[15.5px] leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {/* End-to-end process flow */}
          <FadeIn delay={0.3} className="mt-8 md:mt-10">
            <div className="rounded-[28px] border border-brand-line bg-white p-6 md:p-8">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px] font-bold tracking-[0.22em] text-brand">
                  END-TO-END PROCESS
                </p>
                <p className="text-[15px] text-muted-foreground">
                  소싱부터 데이터까지, 전 과정을 자체 역량으로 운영합니다
                </p>
              </div>
              <ol className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                {FLOW.map((step, i) => (
                  <li
                    key={step.label}
                    className="group flex items-center gap-3 md:flex-1 md:gap-3"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <step.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15.5px] font-extrabold tracking-tight text-foreground">
                        {step.label}
                      </span>
                      <span className="mt-0.5 block text-[15px] text-muted-foreground">
                        {step.desc}
                      </span>
                    </span>
                    {i < FLOW.length - 1 && (
                      <ChevronRight
                        className="ml-auto h-4 w-4 shrink-0 rotate-90 text-brand-line md:ml-3 md:rotate-0"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
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
