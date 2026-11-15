"use client";

import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "식자재 공급은 어디까지 가능한가요?",
    a: "수도권을 중심으로 전국 콜드체인 배송이 가능합니다. 고객사의 사업장 규모와 취급 품목에 따라 정기 납품 체계를 맞춤으로 구축해 드립니다.",
  },
  {
    q: "OEM/ODM 최소 주문 수량(MOQ)은 얼마나 되나요?",
    a: "채다원은 업계 최소 MOQ를 지향합니다. 품목과 규격에 따라 최소 생산 수량이 상이하므로, 1:1 문의 상담을 통해 정확한 수량과 조건을 확정해 드립니다.",
  },
  {
    q: "HACCP 인증 품목이 궁금합니다.",
    a: "과채가공품, 간편조리세트, 신선편의식품, 즉석섭취식품 등 4개 품목에 대해 HACCP 인증을 보유하고 있습니다. 인증번호 등 세부 내역은 홈페이지 품질 섹션에서 확인하실 수 있습니다.",
  },
  {
    q: "제품 개발(ODM)부터 출시까지 얼마나 걸리나요?",
    a: "기획, 인허가, 디자인, 제조까지 전 단계를 함께 지원합니다. 소요 기간은 품목과 스펙에 따라 상이하므로, 상담을 통해 품목별 개발 일정을 확정해 드립니다.",
  },
  {
    q: "식자재 시세 정보도 제공되나요?",
    a: "채다원 식자재 전문몰에서 주요 품목의 실시간 평균 시세를 제공합니다. 시세 정보를 통해 투명한 구매 의사결정을 지원받으실 수 있습니다.",
  },
  {
    q: "어떤 고객 유형에 납품하나요?",
    a: "항공사·케이터링, 대기업 유통(수퍼·편의점), 샐러드·밀키트 프랜차이즈, 호텔&리조트 등 B2B 고객사에 식자재를 납품하고 있습니다.",
  },
  {
    q: "견적 상담은 어떻게 진행되나요?",
    a: "1:1 문의 접수 또는 대표전화(032-752-7227)로 상담을 요청하시면 담당자가 신속하게 연결해 드립니다. 사업장 정보를 기반으로 맞춤 견적을 안내합니다.",
  },
  {
    q: "생산 시설은 어디에 있나요?",
    a: "인천 본사 자체공장(동구 만석동)과 성남 제2공장에서 전 공정 자체 설비를 운영하고 있습니다. 두 공장 모두 HACCP 기준으로 설계·운영됩니다.",
  },
];

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

export function Faq() {
  return (
    <section
      id="faq"
      className="bg-white py-24 md:py-32"
      aria-label="자주 묻는 질문"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            kicker="FAQ"
            title={"자주 묻는 질문"}
            description="채다원과 협업하기 전 가장 많이 받는 질문을 모았습니다. 더 궁금한 점은 1:1 문의로 남겨주세요."
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
