import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { SiteSettingsProvider } from "@/components/settings-context";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<string, string> = {
  공급: "bg-brand text-white",
  인증: "bg-gold/90 text-brand-ink",
  시설: "bg-tomato text-white",
};

async function getPost(id: string) {
  try {
    return await db.newsPost.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post || !post.published) {
    return { title: "게시물을 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.desc.slice(0, 150),
    alternates: { canonical: `/news/${id}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.desc,
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    description: post.desc,
    publisher: {
      "@type": "Organization",
      name: "주식회사 채다원",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/og-image.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/news/${post.id}`,
  };

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
              <a href="/#news" className="shrink-0 transition-colors hover:text-white">
                뉴스룸
              </a>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true" />
              <span className="truncate text-white/80">{post.title}</span>
            </nav>
          </div>

          <article className="mx-auto max-w-3xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[14px] font-bold",
                  CATEGORY_STYLE[post.category] ?? "bg-brand text-white"
                )}
              >
                {post.category}
              </span>
              <span className="font-num text-[15px] font-semibold text-muted-foreground">
                {post.date}
              </span>
            </div>

            <h1 className="mt-5 text-[26px] font-extrabold leading-[1.3] tracking-tight text-foreground md:text-[34px]">
              {post.title}
            </h1>

            <div className="mt-8 h-px w-full bg-brand-line" aria-hidden="true" />

            <p className="mt-8 whitespace-pre-wrap text-[16.5px] leading-relaxed text-foreground/85">
              {post.desc}
            </p>

            <div className="mt-12 rounded-2xl bg-brand-mist p-6 md:p-8">
              <p className="text-[19px] font-extrabold tracking-tight text-foreground md:text-[21px]">
                채다원의 식자재 공급 · OEM/ODM이 궁금하신가요?
              </p>
              <p className="mt-2.5 text-[16px] leading-relaxed text-muted-foreground">
                항공사 케이터링 노하우와 HACCP 인증 생산시설을 갖춘 채다원이
                신속하고 정확하게 안내해 드립니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[16px] font-bold text-white transition-colors hover:bg-brand-deep"
                >
                  1:1 문의하기
                </a>
                <a
                  href="/#news"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-6 py-3 text-[16px] font-bold text-brand transition-colors hover:border-brand hover:bg-brand-soft"
                >
                  뉴스룸으로 돌아가기
                </a>
              </div>
            </div>
          </article>
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </SiteSettingsProvider>
  );
}
