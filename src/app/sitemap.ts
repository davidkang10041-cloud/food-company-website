import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * sitemap.xml — 단일 페이지 사이트. 섹션 앵커도 포함해
 * 네이버 서치어드바이저/구글 서치 콘솔 제출용으로 사용.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
