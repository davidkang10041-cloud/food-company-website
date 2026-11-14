import { PARTNERS } from "@/lib/company";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";

export function Partners() {
  return (
    <section className="bg-brand-mist py-20 md:py-24" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          kicker="Partners"
          title="함께 성장하는 파트너사"
          description="대형항공사와 대기업 유통, 프렌차이즈까지 — 신뢰로 함께해 온 파트너들입니다."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {PARTNERS.map((partner, i) => (
            <FadeIn key={partner.name} delay={i * 0.05} className="h-full">
              <div className="hover-lift flex h-full min-h-[110px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-brand-line/70 bg-white px-4 py-5 text-center">
                <span className="text-[15px] font-black tracking-tight text-foreground/75 transition-colors group-hover:text-brand">
                  {partner.name}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {partner.ko}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
