import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "주식회사 채다원 | CHEDAWON — 사람. 다양한 생활. 좋은 먹거리",
  description:
    "채다원은 식자재 유통과 밀키트 OEM/ODM, 푸드메이킹 프로세스 혁신을 선도하는 통합 식품 솔루션 기업입니다. 항공사 케이터링 노하우와 HACCP 인증 기반의 생산시설로 고객에게 맞춤형 식품 솔루션을 제공합니다.",
  keywords: [
    "채다원",
    "CHEDAWON",
    "식자재 유통",
    "밀키트",
    "OEM",
    "ODM",
    "HACCP",
    "푸드테크",
    "샐러드",
    "MEALBOX25",
  ],
  authors: [{ name: "주식회사 채다원" }],
  openGraph: {
    title: "주식회사 채다원 | CHEDAWON",
    description:
      "사람. 다양한 생활. 좋은 먹거리 — 올바른 식자재 유통과 차별화된 식품 솔루션, 채다원",
    siteName: "주식회사 채다원",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "주식회사 채다원 | CHEDAWON",
    description:
      "사람. 다양한 생활. 좋은 먹거리 — 통합 식품 솔루션 기업 채다원",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e5f4c",
};

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
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
