"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_SETTINGS, type SiteSettingsMap } from "@/lib/company";

type SiteSettingsContextValue = {
  settings: SiteSettingsMap;
  refresh: () => Promise<void>;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  refresh: async () => {},
});

/**
 * 사이트 설정 제공자 — /api/settings 값을 전역으로 뿌린다.
 * 초기 렌더는 기본값(COMPANY)으로 즉시 그리고, 응답 도착 후 덮어쓴다.
 */
export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsMap>(DEFAULT_SETTINGS);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.ok && data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch {
      // 실패 시 기본값 유지
    }
  }, []);

  useEffect(() => {
    // 초기 설정 로드 — 다음 틱으로 위임해 동기 setState 연쇄를 방지
    const t = setTimeout(refresh, 0);
    return () => clearTimeout(t);
  }, [refresh]);

  const value = useMemo(() => ({ settings, refresh }), [settings, refresh]);

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext).settings;
}

/** 설정 저장 후 최신 값을 다시 불러오는 함수 */
export function useSiteSettingsRefresh() {
  return useContext(SiteSettingsContext).refresh;
}
