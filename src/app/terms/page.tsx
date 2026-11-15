import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { SiteSettingsProvider } from "@/components/settings-context";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "주식회사 채다원 홈페이지 이용약관 — 서비스 내용, 저작권, 게시 정보의 정확성, 면책 조항 등 홈페이지 이용에 관한 기본 사항을 안내합니다.",
  alternates: { canonical: "/terms" },
};

function TermsArticle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-[20px] font-extrabold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand/50">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <SiteSettingsProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {/* 고정 헤더(스크롤 전 투명·화이트 텍스트) 아래 대비용 다크 밴드 + 브레드크럼 */}
          <div className="texture-dark">
            <nav
              aria-label="브레드크럼"
              className="mx-auto flex max-w-3xl items-center gap-1.5 px-5 pb-7 pt-28 text-[14px] font-semibold text-white/55 md:px-8 md:pb-9 md:pt-40"
            >
              <a href="/" className="transition-colors hover:text-white">
                홈
              </a>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true" />
              <span className="text-white/80">이용약관</span>
            </nav>
          </div>

          <div className="mx-auto max-w-3xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
            <SectionHeading kicker="TERMS" title="이용약관" />

            <div className="mt-10 rounded-2xl bg-brand-mist p-5 text-[15px] leading-relaxed text-foreground/75">
              <p>
                본 약관은 주식회사 채다원 홈페이지(웹 사이트)의 이용에 관한
                기본 사항을 규정하며, 시행일은{" "}
                <span className="font-num">2025. 12. 1.</span>입니다.
              </p>
            </div>

            <TermsArticle title="제1조 (목적)">
              <p>
                본 약관은 주식회사 채다원(이하 &ldquo;회사&rdquo;)이 운영하는
                홈페이지에서 제공하는 서비스의 이용 조건과 절차, 회사와
                이용자 간의 권리·의무 및 책임 등 필요한 사항을 규정함을
                목적으로 합니다.
              </p>
            </TermsArticle>

            <TermsArticle title="제2조 (서비스 내용)">
              <TermsList
                items={[
                  "회사 소개 및 사업 안내 — 식자재 유통·구매대행, 식품제조 OEM/ODM, 특화 밀키트, 식자재 전문몰 등",
                  "1:1 문의 접수 — 공급·제조 상담 요청 접수 및 회신",
                  "홈페이지의 서비스 내용은 회사 정책에 따라 변경될 수 있으며, 변경 시 홈페이지에 공지합니다.",
                ]}
              />
            </TermsArticle>

            <TermsArticle title="제3조 (저작권)">
              <p>
                홈페이지에 게시된 콘텐츠, 이미지, 디자인 등에 대한 권리는
                회사에 귀속됩니다.
              </p>
              <p>
                사전 서면 동의 없이 무단 복제, 전재, 편집, 영리 목적의 이용
                등을 금지합니다. 다만 관련 법령이 허용하는 범위 내의 인용은
                가능합니다.
              </p>
            </TermsArticle>

            <TermsArticle title="제4조 (게시 정보의 정확성)">
              <p>
                홈페이지에 게시된 정보(제품, 시설, 인증, 시세 등)는 이용자의
                이해를 돕기 위한 참고용으로 제공됩니다.
              </p>
              <TermsList
                items={[
                  "실제 거래 및 계약 조건은 당사자 간 별도 협의에 따라 확정됩니다.",
                  "온라인몰 등에서 제공하는 식자재 시세 정보는 참고 자료로서 실제 거래 가격과 다를 수 있습니다.",
                ]}
              />
            </TermsArticle>

            <TermsArticle title="제5조 (면책)">
              <p>
                회사는 천재지변, 시스템 장애, 통신망 중단 등 불가항력적
                사유로 인한 서비스 중단이나 오류에 대해 책임을 지지 않습니다.
                다만 관련 법령에 위반되는 경우는 제외합니다.
              </p>
              <p>
                이용자가 홈페이지의 정보를 활용하여 수행하는 거래 및
                의사결정에 대한 책임은 이용자에게 있습니다.
              </p>
            </TermsArticle>

            <TermsArticle title="제6조 (문의)">
              <p>
                서비스 이용과 관련한 문의는 대표전화{" "}
                <span className="font-num font-bold text-brand">032-752-7227</span>
                로 연락 주시면 신속하게 안내해 드립니다.
              </p>
            </TermsArticle>

            <TermsArticle title="부칙">
              <p>
                본 약관은{" "}
                <span className="font-num font-bold text-foreground/90">2025. 12. 1.</span>
                부터 시행합니다.
              </p>
            </TermsArticle>
          </div>
        </main>
        <SiteFooter />
      </div>
    </SiteSettingsProvider>
  );
}
