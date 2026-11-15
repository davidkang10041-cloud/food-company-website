"use client";

import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { EN_FAQS } from "@/lib/company-en";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = EN_FAQS;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function EnFaq() {
  return (
    <section
      id="faq"
      className="bg-white py-24 md:py-32"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            kicker="FAQ"
            title="Frequently asked questions"
            description="The questions we hear most often before working with CHEDAWON. Anything else — leave us a 1:1 inquiry."
          />

          <FadeIn delay={0.1} className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${i + 1}`}
                  className="border-brand-line"
                >
                  <AccordionTrigger className="text-[16.5px] font-bold leading-relaxed hover:no-underline md:text-[17px]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15.5px] leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
