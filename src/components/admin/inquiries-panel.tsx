"use client";

import { useMemo, useState } from "react";
import { Loader2, MailOpen, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  STATUS_LABEL,
  STATUS_ORDER,
  formatDate,
  type AdminCounts,
  type AdminMessage,
  type InquiryStatus,
} from "./types";

type InquiriesPanelProps = {
  messages: AdminMessage[];
  counts: AdminCounts | null;
  loading: boolean;
  onRefresh: () => Promise<void>;
};

const STATUS_STYLE: Record<InquiryStatus, string> = {
  NEW: "bg-tomato text-white",
  IN_PROGRESS: "bg-gold/90 text-brand-ink",
  DONE: "bg-brand text-white",
};

export function InquiriesPanel({
  messages,
  counts,
  loading,
  onRefresh,
}: InquiriesPanelProps) {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"ALL" | InquiryStatus>("ALL");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<AdminMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminMessage | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      if (filter !== "ALL" && m.status !== filter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        (m.company ?? "").toLowerCase().includes(q) ||
        m.phone.includes(q)
      );
    });
  }, [messages, filter, query]);

  const changeStatus = async (m: AdminMessage, status: InquiryStatus) => {
    setUpdatingId(m.id);
    try {
      const res = await fetch(`/api/messages/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "상태 변경 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({ title: `상태가 '${STATUS_LABEL[status]}'(으)로 변경되었습니다.` });
      await onRefresh();
      setDetail((d) => (d && d.id === m.id ? { ...d, status } : d));
    } catch {
      toast({
        title: "상태 변경 실패",
        description: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/messages/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "삭제 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "문의가 삭제되었습니다." });
      setDetail(null);
      await onRefresh();
    } catch {
      toast({
        title: "삭제 실패",
        description: "네트워크 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const FILTERS: { key: "ALL" | InquiryStatus; label: string; count: number }[] = [
    { key: "ALL", label: "전체", count: counts?.total ?? messages.length },
    { key: "NEW", label: STATUS_LABEL.NEW, count: counts?.new ?? 0 },
    { key: "IN_PROGRESS", label: STATUS_LABEL.IN_PROGRESS, count: counts?.inProgress ?? 0 },
    { key: "DONE", label: STATUS_LABEL.DONE, count: counts?.done ?? 0 },
  ];

  return (
    <div className="space-y-5">
      {/* Filter chips + search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14.5px] font-bold transition-colors",
                filter === f.key
                  ? "border-brand bg-brand text-white"
                  : "border-brand-line bg-white text-muted-foreground hover:border-brand/40 hover:text-brand"
              )}
            >
              {f.label}
              <span className="font-num text-[13px] opacity-80">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="성명 · 회사 · 연락처 검색"
            className="pl-10"
            aria-label="문의 검색"
          />
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-brand-line bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-[15px] text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <MailOpen className="h-8 w-8 text-brand-line" aria-hidden="true" />
            <p className="text-[15px] font-semibold text-muted-foreground">
              조건에 맞는 문의가 없습니다.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-brand-line/70">
            {filtered.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-brand-soft/40 md:flex-row md:items-center md:gap-4 md:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[15.5px] font-extrabold text-foreground">
                      {m.name}
                    </span>
                    {m.company && (
                      <span className="text-[14.5px] text-muted-foreground">
                        {m.company}
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[13px] font-bold",
                        STATUS_STYLE[m.status]
                      )}
                    >
                      {STATUS_LABEL[m.status]}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDetail(m)}
                    className="mt-1 block w-full truncate text-left text-[15px] text-muted-foreground hover:text-brand"
                  >
                    {m.message}
                  </button>
                </div>
                <div className="flex items-center gap-2 md:shrink-0">
                  <span className="font-num hidden text-[14px] text-muted-foreground xl:block">
                    {formatDate(m.createdAt)}
                  </span>
                  <Select
                    value={m.status}
                    onValueChange={(v) => changeStatus(m, v as InquiryStatus)}
                    disabled={updatingId === m.id}
                  >
                    <SelectTrigger className="h-9 w-[110px] text-[14px] font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_ORDER.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDetail(m)}
                    className="h-9 text-[14px] font-bold"
                  >
                    상세
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(m)}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    aria-label={`${m.name} 문의 삭제`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-[560px] rounded-3xl">
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[19px] font-extrabold">
                  {detail.name}
                  {detail.company && (
                    <span className="ml-2 text-[15px] font-semibold text-muted-foreground">
                      {detail.company}
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription className="font-num text-[14.5px]">
                  {formatDate(detail.createdAt)} 접수 · {detail.phone}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-1 max-h-72 overflow-y-auto thin-scroll rounded-2xl bg-brand-mist p-5 text-[15.5px] leading-relaxed whitespace-pre-wrap text-foreground">
                {detail.message}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[14.5px] font-bold text-muted-foreground">
                    처리 상태
                  </span>
                  <Select
                    value={detail.status}
                    onValueChange={(v) => changeStatus(detail, v as InquiryStatus)}
                    disabled={updatingId === detail.id}
                  >
                    <SelectTrigger className="h-10 w-[130px] text-[14.5px] font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_ORDER.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteTarget(detail)}
                  className="h-10 gap-1.5 text-[14.5px] font-bold"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  삭제
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[18px] font-extrabold">
              문의를 삭제하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              {deleteTarget?.name} 님의 문의를 영구 삭제합니다. 이 작업은 되돌릴 수
              없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full font-bold">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              className="rounded-full bg-destructive font-bold hover:bg-destructive/90"
              disabled={deleting}
            >
              {deleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
