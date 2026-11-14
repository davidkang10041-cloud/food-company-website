"use client";

import Image from "next/image";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { STRATEGY_PILLARS, VALUES, GROWTH } from "@/lib/company";

const CHART_DATA = GROWTH.years.map((year, i) => ({
  year,
  revenue: GROWTH.revenue[i],
  profit: GROWTH.profit[i],
  margin: GROWTH.margins[i],
}));

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-brand-line bg-white px-4 py-3 shadow-lg">
      <p className="font-num text-[14px] font-extrabold text-foreground">
        {label}년
      </p>
      {payload.map((p) => (
        <p
          key={p.name}
          className="font-num mt-1 text-[14px] font-semibold text-muted-foreground"
        >
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ background: p.color }}
            aria-hidden="true"
          />
          {p.name === "revenue" ? "매출" : "영업이익"} {p.value}억원
        </p>
      ))}
    </div>
  );
}

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
            description="다섯 가지 핵심 역량과 체계적인 재무계획으로 식품유통의 지속성장기업으로 나아갑니다."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[6fr_5fr] lg:gap-14">
            {/* Strategy pillars */}
            <FadeIn>
              <ol className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
                {STRATEGY_PILLARS.map((p, i) => (
                  <li key={p.name} className="flex gap-5 p-6 md:gap-7">
                    <span className="ghost-num !text-white !opacity-25 text-[34px] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[18px] font-extrabold tracking-tight text-white">
                        {p.name}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {p.points.map((point) => (
                          <li
                            key={point}
                            className="text-[15px] leading-relaxed text-white/70"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </FadeIn>

            {/* Revenue chart */}
            <FadeIn delay={0.12}>
              <div className="rounded-2xl bg-white p-6 shadow-2xl md:p-8">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[13px] font-bold tracking-[0.2em] text-brand">
                      FINANCIAL PLAN
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight text-foreground">
                      매출 및 영업이익 계획
                    </h3>
                  </div>
                  <p className="font-num text-[13.5px] font-semibold text-muted-foreground">
                    단위: 억원
                  </p>
                </div>
                <div className="mt-6 h-[280px] w-full" role="img" aria-label="2025년부터 2029년까지 매출과 영업이익 증가 차트">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={CHART_DATA} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#e2ebe7" />
                      <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={{ stroke: "#cfe0d8" }}
                        tick={{ fill: "#5b6f68", fontSize: 14, fontWeight: 600 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#5b6f68", fontSize: 13 }}
                      />
                      <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(14,95,76,0.06)" }} />
                      <Bar
                        dataKey="revenue"
                        name="revenue"
                        fill="#0e5f4c"
                        radius={[6, 6, 0, 0]}
                        barSize={26}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        name="profit"
                        stroke="#c9a96a"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#c9a96a", strokeWidth: 0 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-[14px] font-semibold text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-brand" aria-hidden="true" />
                    매출 (억원)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-0.5 w-4 rounded-full bg-gold" aria-hidden="true" />
                    영업이익 (억원)
                  </span>
                </div>
                <p className="mt-4 rounded-xl bg-brand-mist px-4 py-3 text-center text-[14.5px] font-bold text-brand-deep">
                  2025 → 2029 매출 성장{" "}
                  <span className="font-num text-brand">
                    14.8억 → 31.0억 (2배)
                  </span>{" "}
                  · 영업이익률 {GROWTH.margins[0]} → {GROWTH.margins[4]}
                </p>
              </div>
            </FadeIn>
          </div>
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
                          className="flex gap-2 text-[14.5px] leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand"
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
