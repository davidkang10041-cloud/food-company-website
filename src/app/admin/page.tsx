"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminShell, type AdminTab } from "@/components/admin/admin-shell";
import { InquiriesPanel } from "@/components/admin/inquiries-panel";
import { NewsPanel } from "@/components/admin/news-panel";
import { OverviewPanel } from "@/components/admin/overview-panel";
import { SettingsPanel } from "@/components/admin/settings-panel";
import { type AdminCounts, type AdminMessage, type AdminNews } from "@/components/admin/types";
import { SiteSettingsProvider, useSiteSettings, useSiteSettingsRefresh } from "@/components/settings-context";

function AdminApp() {
  const settings = useSiteSettings();
  const refreshSettings = useSiteSettingsRefresh();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<AdminTab>("overview");

  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [counts, setCounts] = useState<AdminCounts | null>(null);
  const [news, setNews] = useState<AdminNews[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [msgRes, newsRes] = await Promise.all([
        fetch("/api/messages", { cache: "no-store" }),
        fetch("/api/news?admin=1", { cache: "no-store" }),
      ]);
      if (msgRes.ok) {
        const data = await msgRes.json();
        if (data?.ok) {
          setMessages(data.messages);
          setCounts(data.counts);
        }
      }
      if (newsRes.ok) {
        const data = await newsRes.json();
        if (data?.ok) setNews(data.news);
      }
    } catch {
      // 네트워크 오류 시 빈 상태 유지
    } finally {
      setLoadingData(false);
    }
  }, []);

  // 세션 확인
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await res.json();
        setAuthenticated(Boolean(data?.authenticated));
      } catch {
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  // 로그인 후 데이터 로드
  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // 무시
    }
    setAuthenticated(false);
    setMessages([]);
    setNews([]);
    setCounts(null);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-ink">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <p className="text-[15px] font-semibold text-white/60">확인하는 중...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <AdminShell
      tab={tab}
      onTabChange={setTab}
      newInquiryCount={counts?.new ?? 0}
      onLogout={handleLogout}
    >
      {tab === "overview" && (
        <OverviewPanel
          counts={counts}
          newsCount={news.filter((n) => n.published).length}
          messages={messages}
          onGoTab={setTab}
        />
      )}
      {tab === "inquiries" && (
        <InquiriesPanel
          messages={messages}
          counts={counts}
          loading={loadingData && messages.length === 0}
          onRefresh={loadData}
        />
      )}
      {tab === "news" && (
        <NewsPanel news={news} loading={loadingData && news.length === 0} onRefresh={loadData} />
      )}
      {tab === "settings" && (
        <SettingsPanel settings={settings} onSaved={refreshSettings} />
      )}
    </AdminShell>
  );
}

export default function AdminPage() {
  return (
    <SiteSettingsProvider>
      <AdminApp />
    </SiteSettingsProvider>
  );
}
