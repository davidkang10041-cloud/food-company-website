import type { Metadata } from "next";
import { EnLanding } from "@/components/en/en-landing";

export const metadata: Metadata = {
  title: {
    absolute:
      "CHEDAWON | Integrated Food Solutions — Food Distribution & Meal Kit OEM/ODM",
  },
  description:
    "CHEDAWON (Korean food company, est. 2017) delivers B2B food ingredients, meal kit OEM/ODM manufacturing and HACCP-certified production. Airline catering expertise, 16,000+ business clients, nationwide cold-chain delivery.",
  alternates: { canonical: "/en" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title:
      "CHEDAWON | Integrated Food Solutions — Food Distribution & Meal Kit OEM/ODM",
    description:
      "CHEDAWON (Korean food company, est. 2017) delivers B2B food ingredients, meal kit OEM/ODM manufacturing and HACCP-certified production. Airline catering expertise, 16,000+ business clients, nationwide cold-chain delivery.",
    images: ["/images/og-image.png"],
  },
};

export default function EnPage() {
  return <EnLanding />;
}
