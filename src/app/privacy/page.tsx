import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { SiteSettingsProvider } from "@/components/settings-context";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "주식회사 채다원 개인정보처리방침 — 개인정보 수집·이용 항목과 목적, 보유 및 이용 기간, 제3자 제공, 정보주체의 권리 등 처리 기준을 안내합니다.",
  alternates: { canonical: "/privacy" },
};

function PolicyArticle({
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

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand/50">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
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
              <span className="text-white/80">개인정보처리방침</span>
            </nav>
          </div>

          <div className="mx-auto max-w-3xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
            <SectionHeading kicker="PRIVACY" title="개인정보처리방침" />

            <div className="mt-10 rounded-2xl bg-brand-mist p-5 text-[15px] leading-relaxed text-foreground/75">
              <p>
                본 방침은 주식회사 채다원이 운영하는 홈페이지(웹 사이트)에
                적용됩니다. 홈페이지를 통해 제공되는 모든 서비스에 동일하게
                적용되며, 시행일은 <span className="font-num">2025. 12. 1.</span>입니다.
              </p>
            </div>

            <PolicyArticle title="제1조 (총칙)">
              <p>
                주식회사 채다원(이하 &ldquo;회사&rdquo;)은 정보주체의 개인정보를
                소중하게 다루며, 개인정보보호법 등 관련 법령을 준수하여
                정보주체의 개인정보를 안전하게 처리하고 있습니다.
              </p>
              <p>
                회사는 본 개인정보처리방침을 홈페이지에 상시 공개하여
                정보주체가 언제든 쉽게 확인할 수 있도록 하며, 관련 법령, 서비스
                정책 또는 운영 환경의 변화에 따라 방침을 개정할 수 있습니다.
                개정 시 홈페이지를 통해 공지합니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제2조 (수집·이용하는 개인정보 항목 및 목적)">
              <p>
                회사는 홈페이지 1:1 문의 접수 시 아래와 같이 개인정보를
                수집·이용합니다.
              </p>
              <PolicyList
                items={[
                  "수집 항목 — 필수: 성명, 연락처, 문의내용 / 선택: 회사명, 이메일, 문의 유형",
                  "수집·이용 목적: 문의 접수 및 회신, 견적 안내, 상담 대응",
                  "법적 근거: 정보주체의 동의, 계약의 체결·이행 등 당사자 간 의무 이행",
                ]}
              />
              <p>
                필수 항목이 입력되지 않으면 문의 접수가 제한될 수 있으며, 선택
                항목은 정보주체가 기재를 거부해도 서비스 이용에 영향을 주지
                않습니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제3조 (보유 및 이용 기간)">
              <p>
                수집한 개인정보는 문의 처리 완료 후 3년 이내에 파기합니다.
                파기는 전자 데이터베이스(DB)에 저장된 정보를 복구·재생이
                불가능한 기술적 방법으로 영구 삭제하는 절차를 거쳐 진행됩니다.
              </p>
              <p>
                다만 관련 법령에 따라 일정 기간 보존 의무가 있는 경우에는 해당
                법령에서 정한 기간 동안 안전하게 보관하며, 보존 기간이 경과하면
                지체 없이 파기합니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제4조 (개인정보의 제3자 제공)">
              <p>
                회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지
                않습니다. 다만 정보주체의 별도 동의가 있거나 관련 법령에
                특별한 규정이 있는 경우에는 예외적으로 제공할 수 있습니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제5조 (처리 위탁)">
              <p>
                회사는 개인정보 처리 업무를 외부 전문 기관에 위탁하고 있지
                않습니다. 위탁 처리가 필요하거나 운영에 변경이 있을 경우에는
                홈페이지를 통해 사전 고지합니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제6조 (정보주체의 권리·의무)">
              <p>
                정보주체는 자신의 개인정보에 대해 열람, 정정·삭제, 처리정지를
                요구할 수 있습니다.
              </p>
              <p>
                권리 행사는 대표전화{" "}
                <span className="font-num font-bold text-brand">032-752-7227</span>
                을 통해 요청할 수 있으며, 회사는 요청을 확인한 후 관련 법령이
                정한 바에 따라 지체 없이 조치합니다.
              </p>
              <p>
                정보주체는 자신의 개인정보를 최신 상태로 유지할 책임이 있으며,
                부정확한 정보 입력으로 발생한 문제에 대한 책임은 정보주체에게
                있습니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제7조 (쿠키 및 트래픽 분석 도구)">
              <p>
                회사는 홈페이지 품질 개선과 이용 통계 분석을 위해 웹 트래픽
                분석 도구(Google Analytics, 네이버 애널리틱스)를 사용할 수
                있습니다.
              </p>
              <p>
                이러한 도구는 쿠키를 활용해 익명화된 형태의 이용 정보를
                수집하며, 특정 개인을 식별하지 않습니다.
              </p>
              <p>
                정보주체는 브라우저 설정에서 쿠키 저장을 차단하거나 삭제할 수
                있습니다. 다만 쿠키 차단 시 홈페이지의 일부 기능 이용에 제한이
                있을 수 있습니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="제8조 (개인정보 보호책임자)">
              <PolicyList
                items={[
                  "책임자: 주식회사 채다원 운영팀",
                  "연락처: 032-752-7227",
                  "주소: 인천광역시 동구 만석동 1-39",
                ]}
              />
              <p>
                개인정보 처리와 관련된 문의, 불만 처리, 피해 구제 등은
                보호책임자에게 연락하시면 신속하게 대응합니다.
              </p>
            </PolicyArticle>

            <PolicyArticle title="부칙">
              <p>
                본 개인정보처리방침은{" "}
                <span className="font-num font-bold text-foreground/90">2025. 12. 1.</span>
                부터 시행합니다.
              </p>
            </PolicyArticle>
          </div>
        </main>
        <SiteFooter />
      </div>
    </SiteSettingsProvider>
  );
}
