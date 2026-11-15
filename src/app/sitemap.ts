import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { db } from "@/lib/db";

/**
 * sitemap.xml — 메인 페이지 + 영문/법적 페이지 + 게시 중인 뉴스 상세 페이지.
 * 네이버 서치어드바이저/구글 서치 콘솔 제출용.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const news = await db.newsPost.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    });

    const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
      url: `${SITE_URL}/news/${n.id}`,
      lastModified: n.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticEntries, ...newsEntries];
  } catch {
    return staticEntries;
  }
}
