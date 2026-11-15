/**
 * SEO 공통 상수 — 전체 사이트에서 단일 출처(single source of truth)로 사용.
 * 실제 도메인 확정 후 NEXT_PUBLIC_SITE_URL 환경변수만 교체하면 됩니다.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.chedawon.com";

export const SITE_NAME = "주식회사 채다원";

/** 검색 콘솔 / 서치어드바이저 소유 확인 토큰 (환경변수로 주입) */
export function siteVerifications(): {
  google?: string;
  other?: Record<string, string>;
} {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const naver = process.env.NAVER_SITE_VERIFICATION;
  const other: Record<string, string> = {};
  if (naver) other["naver-site-verification"] = naver;
  return {
    ...(google ? { google } : {}),
    ...(Object.keys(other).length > 0 ? { other } : {}),
  };
}

/** 지역(GEO) 메타 태그 — 인천광역시 동구 만석동 (로컬 SEO) */
export const GEO_META = {
  "geo.region": "KR-28",
  "geo.placename": "인천광역시 동구",
  "geo.position": "37.4775;126.6435",
  ICBM: "37.4775, 126.6435",
} as const;
