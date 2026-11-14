import Image from "next/image";
import { Check } from "lucide-react";
import { VALUES } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function Values() {
  return (
    <section id="values" className="texture-dark py-24 md:py-32" aria-labelledby="values-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          kicker="Our Values"
          title="채다원의 핵심가치"
          description="트렌디한 상품 기획. 상품의 고급화. 독자상품(Identity 상품) 소싱을 기본으로 상품의 경쟁력을 높일 수 있도록 노력합니다."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {VALUES.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.08} className="h-full">
              <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm">
                <div className="relative h-52 overflow-hidden md:h-56">
                  <Image
                    src={value.image}
                    alt={value.title.replace("\n", " ")}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/20 to-transparent" />
                  <h3 className="absolute bottom-5 left-7 whitespace-pre-line text-xl font-extrabold leading-snug tracking-tight text-white md:text-[22px]">
                    {value.title}
                  </h3>
                </div>
                <ul className="flex-1 space-y-3 p-7 pt-5">
                  {value.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6fc7a4]/15">
                        <Check className="h-3 w-3 text-[#6fc7a4]" aria-hidden="true" />
                      </span>
                      <span className="text-[14px] leading-relaxed text-white/70">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
