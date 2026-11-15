"use client";

import { ArrowRight, MailCheck, Newspaper, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STATUS_LABEL, formatDate, type AdminCounts, type AdminMessage, type AdminNews, type AdminTab } from "./types";

type OverviewPanelProps = {
  counts: AdminCounts | null;
  newsCount: number;
  messages: AdminMessage[];
  onGoTab: (tab: AdminTab) => void;
};

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon: typeof Inbox;
}) {
  return (
    <Card className="rounded-2xl border-brand-line">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[15px] font-bold text-muted-foreground">
          {label}
        </CardTitle>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </CardHeader>
      <CardContent>
        <p className="font-num text-3xl font-extrabold tracking-tight text-foreground">
          {value}
        </p>
        {hint && (
          <p className="mt-1 text-[14px] text-muted-foreground">{hint}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function OverviewPanel({
  counts,
  newsCount,
  messages,
  onGoTab,
}: OverviewPanelProps) {
  const recent = messages.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="새 문의"
          value={counts?.new ?? 0}
          hint="답변 대기 중인 문의"
          icon={Inbox}
        />
        <StatCard
          label="진행중"
          value={counts?.inProgress ?? 0}
          hint="처리 중인 문의"
          icon={MailCheck}
        />
        <StatCard
          label="완료"
          value={counts?.done ?? 0}
          hint="처리 완료된 문의"
          icon={MailCheck}
        />
        <StatCard
          label="게시중 공지사항"
          value={newsCount}
          hint="홈페이지 뉴스룸 노출 건수"
          icon={Newspaper}
        />
      </div>

      <Card className="rounded-2xl border-brand-line">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-[17px] font-extrabold text-foreground">
            최근 문의
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGoTab("inquiries")}
            className="gap-1 text-[14.5px] font-bold text-brand hover:text-brand-deep"
          >
            전체 보기
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          {recent.length === 0 ? (
            <p className="px-6 pb-6 text-[15px] text-muted-foreground">
              아직 접수된 문의가 없습니다. 홈페이지 문의 폼으로 접수되면 이곳에
              표시됩니다.
            </p>
          ) : (
            <ul className="divide-y divide-brand-line/70">
              {recent.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => onGoTab("inquiries")}
                    className="flex w-full flex-col gap-1 px-6 py-3.5 text-left transition-colors hover:bg-brand-soft/50 md:flex-row md:items-center md:gap-4"
                  >
                    <span className="font-num w-28 shrink-0 text-[14px] font-semibold text-muted-foreground">
                      {formatDate(m.createdAt)}
                    </span>
                    <span className="w-24 shrink-0 truncate text-[15px] font-bold text-foreground">
                      {m.name}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[15px] text-muted-foreground">
                      {m.message}
                    </span>
                    <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[13px] font-bold text-brand">
                      {STATUS_LABEL[m.status]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
