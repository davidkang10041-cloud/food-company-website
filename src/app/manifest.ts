import type { MetadataRoute } from "next";

/** PWA/Web App Manifest — 아이콘·테마색 등 브라우저·검색엔진 표시 정보 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "주식회사 채다원 | CHEDAWON",
    short_name: "채다원",
    description:
      "식자재 유통과 밀키트 OEM/ODM을 선도하는 통합 식품 솔루션 기업, 채다원",
    start_url: "/",
    display: "standalone",
    lang: "ko",
    dir: "ltr",
    background_color: "#faf8f4",
    theme_color: "#0e5f4c",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
