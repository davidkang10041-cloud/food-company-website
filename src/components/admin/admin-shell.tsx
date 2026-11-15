"use client";

import { Database, Home, LayoutDashboard, LogOut, Mail, Newspaper, Settings } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

export type AdminTab = "overview" | "inquiries" | "news" | "content" | "settings";

const TABS: { key: AdminTab; label: string; icon: typeof Home }[] = [
  { key: "overview", label: "대시보드", icon: LayoutDashboard },
  { key: "inquiries", label: "문의 관리", icon: Mail },
  { key: "news", label: "공지사항 관리", icon: Newspaper },
  { key: "content", label: "콘텐츠 관리", icon: Database },
  { key: "settings", label: "사이트 설정", icon: Settings },
];

export const TAB_TITLES: Record<AdminTab, { title: string; desc: string }> = {
  overview: { title: "대시보드", desc: "문의와 공지사항 현황을 한눈에 확인합니다." },
  inquiries: { title: "문의 관리", desc: "홈페이지 1:1 문의를 확인하고 처리 상태를 관리합니다." },
  news: { title: "공지사항 관리", desc: "뉴스룸에 노출되는 공지사항을 등록·수정·삭제합니다." },
  content: {
    title: "콘텐츠 관리",
    desc: "성과지표 · 연혁 · 파트너사를 수정하면 공개 홈페이지에 즉시 반영됩니다.",
  },
  settings: { title: "사이트 설정", desc: "회사 기본 정보를 수정하면 홈페이지에 즉시 반영됩니다." },
};

type AdminShellProps = {
  tab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  newInquiryCount: number;
  onLogout: () => void;
  children: React.ReactNode;
};

export function AdminShell({
  tab,
  onTabChange,
  newInquiryCount,
  onLogout,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-brand-mist">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col bg-brand-ink lg:flex">
        <div className="px-6 py-6">
          <Logo variant="light" />
          <p className="mt-1.5 text-[13px] font-bold tracking-[0.22em] text-white/40">
            ADMIN CONSOLE
          </p>
        </div>
        <nav className="mt-2 flex-1 px-3" aria-label="관리자 메뉴">
          <ul className="space-y-1.5">
            {TABS.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onTabChange(key)}
                  aria-current={tab === key ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15.5px] font-bold transition-colors",
                    tab === key
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  {label}
                  {key === "inquiries" && newInquiryCount > 0 && (
                    <span className="ml-auto inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-tomato px-2 text-[13px] font-extrabold text-white">
                      {newInquiryCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/10 p-3">
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Home className="h-[18px] w-[18px]" aria-hidden="true" />
            홈페이지 보기
          </a>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 bg-brand-ink lg:hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <Logo variant="light" />
          <div className="flex items-center gap-1">
            <a
              href="/"
              className="inline-flex h-10 items-center rounded-full px-3 text-[14px] font-bold text-white/70 hover:text-white"
            >
              홈페이지
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[14px] font-bold text-white/70 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              로그아웃
            </button>
          </div>
        </div>
        <nav
          className="thin-scroll flex items-center gap-2 overflow-x-auto px-4 pb-3"
          aria-label="관리자 메뉴"
        >
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              aria-current={tab === key ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[14.5px] font-bold transition-colors",
                tab === key
                  ? "bg-white text-brand-ink"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
              {key === "inquiries" && newInquiryCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-tomato px-1.5 text-[12px] font-extrabold text-white">
                  {newInquiryCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="lg:pl-[248px]">
        <header className="hidden items-center justify-between border-b border-brand-line bg-white px-8 py-5 lg:flex">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground">
              {TAB_TITLES[tab].title}
            </h1>
            <p className="mt-1 text-[15px] text-muted-foreground">
              {TAB_TITLES[tab].desc}
            </p>
          </div>
        </header>
        <main className="mx-auto max-w-[1120px] px-5 py-8 md:px-8">
          <div className="mb-6 lg:hidden">
            <h1 className="text-xl font-extrabold tracking-tight text-foreground">
              {TAB_TITLES[tab].title}
            </h1>
            <p className="mt-1 text-[15px] text-muted-foreground">
              {TAB_TITLES[tab].desc}
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
