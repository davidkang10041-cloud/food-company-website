"use client";

import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import { EN_HISTORY, EN_YEAR_SUMMARIES } from "@/lib/company-en";

function milestoneTag(text: string): { label: string; className: string } {
  if (/incorporated/i.test(text))
    return { label: "Launch", className: "bg-tomato/10 text-tomato" };
  if (/HACCP/i.test(text))
    return { label: "HACCP", className: "bg-[#c9a96a]/15 text-[#8a6f3c]" };
  if (/supply/i.test(text))
    return { label: "New supply", className: "bg-brand text-white" };
  if (/(established|relocated|capital increase)/i.test(text))
    return {
      label: "Infrastructure",
      className: "border border-brand-line bg-white text-brand-deep",
    };
  return {
    label: "Growth",
    className: "border border-brand-line bg-white text-muted-foreground",
  };
}

export function EnHistory() {
  return (
    <section
      id="history-en"
      className="bg-cream py-24 md:py-32"
      aria-label="Company history"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <SectionHeading
          kicker="HISTORY"
          title={"From airline catering tables\nto every corner of retail."}
          description="Eight years of steady growth — from incorporation and major-airline catering supply to HACCP-certified manufacturing and big-retail distribution."
        />

        <div className="mt-14 space-y-6">
          {EN_HISTORY.map((group, gi) => (
            <FadeIn key={group.year} delay={gi * 0.04}>
              <article className="overflow-hidden rounded-[28px] border border-brand-line bg-white">
                <div className="flex flex-col gap-4 border-b border-brand-line/70 bg-brand-mist/60 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                  <div className="flex items-baseline gap-3">
                    <span className="font-num text-[30px] font-extrabold leading-none tracking-tight text-brand md:text-[36px]">
                      {group.year}
                    </span>
                    <span className="text-[15px] font-semibold text-muted-foreground">
                      {group.items.length} milestone{group.items.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="max-w-xl text-[15px] font-medium leading-relaxed text-muted-foreground">
                    {EN_YEAR_SUMMARIES[gi]}
                  </p>
                </div>
                <ul className="divide-y divide-brand-line/50">
                  {group.items.map((item) => {
                    const tag = milestoneTag(item.text);
                    return (
                      <li
                        key={`${item.month}-${item.text}`}
                        className={cn(
                          "flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-brand-mist/40 md:flex-row md:items-center md:gap-5 md:px-8"
                        )}
                      >
                        <span className="font-num w-14 shrink-0 text-[15px] font-bold text-brand">
                          {item.month}
                        </span>
                        <span className="min-w-0 flex-1 text-[15.5px] font-semibold leading-relaxed text-foreground/85">
                          {item.text}
                        </span>
                        <span
                          className={cn(
                            "w-fit shrink-0 rounded-full px-3 py-1 text-[13px] font-bold",
                            tag.className
                          )}
                        >
                          {tag.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
