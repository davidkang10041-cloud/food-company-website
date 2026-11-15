"use client";

import { useMemo } from "react";
import {
  ArrowRight,
  Inbox,
  MailCheck,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
  news: AdminNews[];
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

/** 최근 6개월 문의 접수 추이 데이터 */
function buildMonthlyData(messages: AdminMessage[]) {
  const buckets: { key: string; label: string; count: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets.push({
      key,
      label: `${String(d.getMonth() + 1)}월`,
      count: 0,
    });
  }
  for (const m of messages) {
    const d = new Date(m.createdAt);
    if (Number.isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) bucket.count += 1;
  }
  return buckets;
}

export function OverviewPanel({
  counts,
  news,
  messages,
  onGoTab,
}: OverviewPanelProps) {
  const recent = messages.slice(0, 5);
  const monthlyData = useMemo(() => buildMonthlyData(messages), [messages]);

  const recentNews = useMemo(
    () =>
      [...news]
        .sort((a, b) =>
          a.date === b.date
            ? b.createdAt.localeCompare(a.createdAt)
            : b.date.localeCompare(a.date)
        )
        .slice(0, 3),
    [news]
  );

  const trendTotal = monthlyData.reduce((sum, b) => sum + b.count, 0);

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
          value={news.filter((n) => n.published).length}
          hint="홈페이지 뉴스룸 노출 건수"
          icon={Newspaper}
        />
      </div>

      {/* 최근 6개월 문의 추이 */}
      <Card className="rounded-2xl border-brand-line">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-[17px] font-extrabold text-foreground">
              <TrendingUp className="h-5 w-5 text-brand" aria-hidden="true" />
              최근 6개월 문의 추이
            </CardTitle>
            <p className="mt-1 text-[14px] text-muted-foreground">
              월별 접수 현황 · 총{" "}
              <span className="font-num font-bold text-foreground">
                {trendTotal}
              </span>
              건
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[220px] w-full" role="img" aria-label="최근 6개월 월별 문의 접수 추이 차트">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#cfe0d8"
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: "#cfe0d8" }}
                  tick={{ fontSize: 13, fill: "#6b7c74", fontWeight: 600 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7c74" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(14,95,76,0.06)" }}
                  formatter={(value) => [`${value}건`, "문의"]}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid #cfe0d8",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#0e5f4c"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={44}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-5">
        {/* 최근 문의 */}
        <Card className="rounded-2xl border-brand-line xl:col-span-3">
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

        {/* 최근 공지사항 */}
        <Card className="rounded-2xl border-brand-line xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[17px] font-extrabold text-foreground">
              최근 공지사항
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onGoTab("news")}
              className="gap-1 text-[14.5px] font-bold text-brand hover:text-brand-deep"
            >
              관리하기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            {recentNews.length === 0 ? (
              <p className="px-6 pb-6 text-[15px] text-muted-foreground">
                등록된 공지사항이 없습니다.
              </p>
            ) : (
              <ul className="divide-y divide-brand-line/70">
                {recentNews.map((n) => (
                  <li key={n.id} className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-num text-[13.5px] font-bold text-muted-foreground">
                        {n.date}
                      </span>
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[12.5px] font-bold text-brand">
                        {n.category}
                      </span>
                      {!n.published && (
                        <span className="rounded-full border border-brand-line px-2 py-0.5 text-[12.5px] font-bold text-muted-foreground">
                          비공개
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-[15px] font-bold text-foreground">
                      {n.title}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
