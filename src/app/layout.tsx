import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { COMPANY } from "@/lib/company";
import { GEO_META, SITE_URL, siteVerifications } from "@/lib/seo";

const TITLE = `${COMPANY.name} | ${COMPANY.nameEn.replace(" Co., Ltd.", "")} — 사람. 다양한 생활. 좋은 먹거리`;

const DESCRIPTION =
  "채다원(CHEDAWON)은 식자재 유통과 밀키트 OEM/ODM, 푸드메이킹 프로세스 혁신을 선도하는 통합 식품 솔루션 기업입니다. 항공사 케이터링 노하우와 HACCP 인증 기반 생산시설(인천)로 B2B 식자재 공급·MEALBOX25 간편조리 밀키트를 제공합니다.";

const KEYWORDS = [
  "채다원",
  "CHEDAWON",
  "MEALBOX25",
  "밀박스25",
  "식자재 유통",
  "식자재 납품 업체",
  "밀키트 OEM",
  "밀키트 ODM",
  "간편조리세트",
  "HACCP 인증",
  "HACCP 밀키트",
  "푸드메이킹",
  "푸드테크",
  "샐러드 공장",
  "항공 케이터링",
  "B2B 식자재",
  "인천 식자재 회사",
  "단체급식 식자재",
  "올리브푸드",
  "식품 솔루션",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${COMPANY.name}` },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  applicationName: COMPANY.name,
  category: "food",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: siteVerifications(),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: COMPANY.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-image.png",
        width: 1344,
        height: 768,
        alt: "채다원 CHEDAWON — 사람. 다양한 생활. 좋은 먹거리",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.svg" }],
  },
  other: { ...GEO_META },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e5f4c",
};

/** JSON-LD 구조화 데이터 — Google·네이버·AI 검색엔진(GEO)용 기계 판독 정보 */
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY.name,
        alternateName: ["CHEDAWON", "CHEDAWON Co., Ltd."],
        url: SITE_URL,
        logo: `${SITE_URL}/images/og-image.png`,
        image: `${SITE_URL}/images/og-image.png`,
        description: DESCRIPTION,
        slogan: COMPANY.slogan,
        foundingDate: "2017-06-01",
        foundingLocation: {
          "@type": "Place",
          address: "인천광역시",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "만석동 1-39",
          addressLocality: "동구",
          addressRegion: "인천광역시",
          addressCountry: "KR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 37.4775,
          longitude: 126.6435,
        },
        telephone: "+82-32-752-7227",
        areaServed: {
          "@type": "Country",
          name: "대한민국",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+82-32-752-7227",
            contactType: "customer service",
            availableLanguage: ["Korean"],
          },
        ],
        knowsAbout: [
          "식자재 유통",
          "밀키트 OEM/ODM",
          "HACCP 인증 생산",
          "항공 케이터링",
          "MEALBOX25 간편조리세트",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        alternateName: "CHEDAWON",
        description: DESCRIPTION,
        inLanguage: "ko-KR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <StructuredData />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
