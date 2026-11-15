import type { Metadata } from "next";

/**
 * 관리자 라우트 전용 레이아웃 — 검색엔진 인덱싱 완전 차단.
 * (루트 레이아웃의 SEO 메타데이터를 덮어쓴다)
 */
export const metadata: Metadata = {
  title: "채다원 관리자",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
