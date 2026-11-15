"use client";

import Image from "next/image";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { EN_CERTIFICATIONS, EN_EQUIPMENT_STAGES } from "@/lib/company-en";

const STEP_INDEX = new Map(
  EN_EQUIPMENT_STAGES.flatMap((s) => s.items).map((eq, i) => [eq.name, i] as const)
);

export function EnQuality() {
  return (
    <section
      id="quality-en"
      className="bg-brand-mist py-24 md:py-32"
      aria-label="Quality and certification"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="QUALITY · CERTIFICATION"
          title={"4 HACCP certifications,\nquality competitiveness end to end."}
          description="From item selection and ordering to production and delivery — function-by-function checks and an advanced hygiene management system keep every meal safe."
        />

        {/* HACCP certifications */}
        <ul className="mt-14 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {EN_CERTIFICATIONS.map((cert, i) => (
            <FadeIn as="li" key={cert.no} delay={i * 0.06}>
              <article className="hover-lift h-full rounded-2xl border border-brand-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <BadgeCheck className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[17px] font-extrabold leading-snug tracking-tight text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-1.5 text-[14.5px] font-semibold text-brand">
                  HACCP {cert.no}
                </p>
                <p className="font-num mt-2 text-[14.5px] text-muted-foreground">
                  {cert.period}
                </p>
              </article>
            </FadeIn>
          ))}
        </ul>

        {/* Facilities & equipment intro */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <FadeIn className="img-zoom overflow-hidden rounded-2xl">
              <Image
                src="/images/quality-1-v3.png"
                alt="A CHEDAWON quality specialist inspecting fresh vegetables"
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 50vw, 480px"
                className="h-56 w-full object-cover md:h-72"
              />
            </FadeIn>
            <FadeIn delay={0.1} className="img-zoom overflow-hidden rounded-2xl">
              <Image
                src="/images/quality-2.png"
                alt="An automatic thermoforming vacuum packer operating in the CHEDAWON plant"
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 50vw, 480px"
                className="h-56 w-full object-cover md:h-72"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="flex flex-col justify-center">
            <p className="kicker">FACILITY · EQUIPMENT</p>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-[28px]">
              Professional facilities for
              <br />
              multi-item, small-batch production
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              In HACCP-standard plants, we support small-batch production across
              many product types. From raw-material washing to vacuum packing
              and metal detection — every process runs on our own equipment.
            </p>
            <p className="mt-6 flex items-center gap-2 text-[15px] font-bold text-brand">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              10 types of in-house equipment across all production stages
            </p>
          </FadeIn>
        </div>

        {/* Production line — 10 equipment, by stage */}
        <div className="mt-12 space-y-12 md:mt-16 md:space-y-14">
          {EN_EQUIPMENT_STAGES.map((stage, si) => (
            <FadeIn key={stage.label} delay={si * 0.05}>
              <div className="grid gap-5 lg:grid-cols-[230px_1fr] lg:gap-10">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="font-num text-[15px] font-extrabold tracking-[0.24em] text-brand">
                    STAGE 0{si + 1}
                  </p>
                  <h4 className="mt-2 text-[20px] font-extrabold tracking-tight text-foreground md:text-[22px]">
                    {stage.label}
                  </h4>
                  <p className="mt-1.5 text-[15px] text-muted-foreground">
                    {stage.desc}
                  </p>
                  <p className="font-num mt-3 hidden text-[14px] font-bold text-brand/70 lg:block">
                    {stage.items.length} machines
                  </p>
                  <span
                    className="mt-4 hidden h-px w-14 bg-brand/30 lg:block"
                    aria-hidden="true"
                  />
                </div>

                <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                  {stage.items.map((eq) => {
                    const step = (STEP_INDEX.get(eq.name) ?? 0) + 1;
                    return (
                      <li key={eq.name}>
                        <figure className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition-colors duration-300 hover:border-brand/40">
                          <div className="img-zoom relative h-36 overflow-hidden md:h-44">
                            <Image
                              src={eq.image}
                              alt={`${eq.name} — ${eq.role} equipment`}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                              className="object-contain"
                            />
                            <span className="font-num absolute left-3 top-3 rounded-full border border-brand-line/70 bg-white/85 px-2.5 py-1 text-[13px] font-extrabold tracking-wide text-brand backdrop-blur-sm">
                              {String(step).padStart(2, "0")}
                            </span>
                          </div>
                          <figcaption className="flex flex-1 flex-col justify-center border-t border-brand-line/60 px-4 py-3.5">
                            <p className="text-[14.5px] font-extrabold leading-snug tracking-tight text-foreground">
                              {eq.name}
                            </p>
                            <p className="mt-1 text-[13.5px] font-semibold text-brand">
                              {eq.role}
                            </p>
                          </figcaption>
                        </figure>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-8 flex items-center gap-2 text-[15px] font-bold text-brand">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Certified: fruit & vegetable products · ready-to-cook sets · fresh
            convenience foods · ready-to-eat foods
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
