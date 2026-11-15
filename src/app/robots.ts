import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — Google·네이버(Yeti) 등 주요 크롤러를 명시적으로 허용하고
 * 관리자/내부 API는 크롤링 대상에서 제외한다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-News"],
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        // 네이버 크롤러
        userAgent: ["Yeti", "NaverBot"],
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        // AI 검색/생성 엔진 크롤러 (GEO: Generative Engine Optimization)
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: ["Twitterbot", "facebookexternalhit", "Slurp", "Bingbot"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
