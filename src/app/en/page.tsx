import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { EnLanding } from "@/components/en/en-landing";

export const metadata: Metadata = {
  title: {
    absolute:
      "CHEDAWON | Integrated Food Solutions — Food Distribution & Meal Kit OEM/ODM",
  },
  description:
    "CHEDAWON (Korean food company, est. 2017) delivers B2B food ingredients, meal kit OEM/ODM manufacturing and HACCP-certified production. Airline catering expertise, 16,000+ business clients, nationwide cold-chain delivery.",
  alternates: {
    canonical: "/en",
    languages: {
      "ko-KR": SITE_URL,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/en`,
    title:
      "CHEDAWON | Integrated Food Solutions — Food Distribution & Meal Kit OEM/ODM",
    description:
      "CHEDAWON (Korean food company, est. 2017) delivers B2B food ingredients, meal kit OEM/ODM manufacturing and HACCP-certified production. Airline catering expertise, 16,000+ business clients, nationwide cold-chain delivery.",
    images: ["/images/og-image.png"],
  },
};

/** English-page structured data — complements the Organization JSON-LD in the root layout */
const enJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  url: `${SITE_URL}/en`,
  name: "CHEDAWON | Integrated Food Solutions",
  description:
    "B2B food ingredient distribution, meal kit OEM/ODM manufacturing, and HACCP-certified production by CHEDAWON Co., Ltd. (Incheon, South Korea).",
  about: {
    "@type": "Organization",
    name: "CHEDAWON Co., Ltd.",
    alternateName: "주식회사 채다원",
    foundingDate: "2017-06-01",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1-39 Manseok-dong",
      addressLocality: "Dong-gu, Incheon",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-32-752-7227",
      contactType: "sales",
      availableLanguage: ["en", "ko"],
    },
  },
};

export default function EnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enJsonLd) }}
      />
      <EnLanding />
    </>
  );
}
