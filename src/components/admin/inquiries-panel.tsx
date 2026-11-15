"use client";

import { useMemo, useState } from "react";
import { Download, Loader2, MailOpen, NotebookPen, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function exportCsv(messages: AdminMessage[]) {
  const header = [
    "접수일시",
    "성명",
    "회사",
    "연락처",
    "이메일",
    "문의유형",
    "처리상태",
    "문의내용",
    "관리자메모",
  ];
  const rows = messages.map((m) =>
    [
      formatDate(m.createdAt),
      m.name,
      m.company ?? "",
      m.phone,
      m.email ?? "",
      m.inquiryType,
      STATUS_LABEL[m.status] ?? m.status,
      m.message.replace(/\r?\n/g, " "),
      (m.memo ?? "").replace(/\r?\n/g, " "),
    ]
      .map(csvCell)
      .join(",")
  );
  // BOM: Excel에서 한글 깨짐 방지
  const csv = "\uFEFF" + [header.map(csvCell).join(","), ...rows].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  a.href = url;
  a.download = `채다원_문의내역_${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
  // 일괄 선택 / 일괄 상태 변경
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);
  // 상세 Dialog의 메모 편집 로컬 상태
  const [memoDraft, setMemoDraft] = useState("");
  const [memoSaving, setMemoSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      if (filter !== "ALL" && m.status !== filter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        (m.company ?? "").toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        (m.email ?? "").toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });
  }, [messages, filter, query]);

  const allSelected = filtered.length > 0 && filtered.every((m) => selected.has(m.id));

  const toggleSelect = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelected(new Set(filtered.map((m) => m.id)));
    else setSelected(new Set());
  };

  const clearSelection = () => setSelected(new Set());

  const bulkChangeStatus = async (status: InquiryStatus) => {
    if (selected.size === 0) return;
    setBulkUpdating(true);
    try {
      const res = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected), status }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "상태 일괄 변경 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      const updated = typeof data.updated === "number" ? data.updated : selected.size;
      toast({
        title: `${updated}건이 '${STATUS_LABEL[status]}'(으)로 변경되었습니다.`,
      });
      clearSelection();
      await onRefresh();
    } catch {
      toast({
        title: "상태 일괄 변경 실패",
        description: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setBulkUpdating(false);
    }
  };

  const openDetail = (m: AdminMessage) => {
    setDetail(m);
    setMemoDraft(m.memo ?? "");
  };

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

  const saveMemo = async () => {
    if (!detail) return;
    setMemoSaving(true);
    try {
      const res = await fetch(`/api/messages/${detail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memo: memoDraft }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "메모 저장 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "메모가 저장되었습니다." });
      await onRefresh();
      setDetail((d) => (d ? { ...d, memo: memoDraft } : d));
    } catch {
      toast({
        title: "메모 저장 실패",
        description: "네트워크 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setMemoSaving(false);
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
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });
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

  const handleExport = () => {
    if (filtered.length === 0) {
      toast({
        title: "내보낼 문의가 없습니다.",
        variant: "destructive",
      });
      return;
    }
    exportCsv(filtered);
    toast({
      title: "CSV 파일이 다운로드되었습니다.",
      description: `현재 필터 조건의 ${filtered.length}건을 내보냈습니다.`,
    });
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
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="성명 · 회사 · 연락처 · 이메일 · 내용 검색"
              className="pl-10"
              aria-label="문의 검색"
            />
          </div>
          <Button
            variant="outline"
            onClick={handleExport}
            className="h-11 shrink-0 gap-1.5 rounded-full border-brand-line text-[14.5px] font-bold text-brand hover:bg-brand-soft hover:text-brand-deep"
            aria-label="문의 내역 CSV 내보내기"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            CSV
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-brand-line bg-white">
        {/* Select-all header row */}
        {!loading && filtered.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-brand-line/70 bg-brand-mist/50 px-4 py-2.5 md:px-5">
            <label className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={allSelected ? true : selected.size > 0 ? "indeterminate" : false}
                onCheckedChange={(v) => toggleSelectAll(v === true)}
                aria-label="전체 문의 선택"
                className="border-brand-line data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <span className="text-[14px] font-bold text-muted-foreground">전체 선택</span>
            </label>
            <span className="font-num text-[13.5px] text-muted-foreground">
              {selected.size > 0 ? `${selected.size}건 선택` : `${filtered.length}건`}
            </span>
          </div>
        )}

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-brand-line bg-white px-4 py-3 md:px-5">
            <span className="mr-1 text-[14.5px] font-extrabold text-foreground">
              <span className="font-num">{selected.size}</span>건 선택됨
            </span>
            {STATUS_ORDER.map((s) => (
              <Button
                key={s}
                size="sm"
                onClick={() => bulkChangeStatus(s)}
                disabled={bulkUpdating}
                className={cn(
                  "h-9 rounded-full px-4 text-[14px] font-bold",
                  STATUS_STYLE[s]
                )}
              >
                {bulkUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : null}
                {STATUS_LABEL[s]} 처리
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              disabled={bulkUpdating}
              className="h-9 rounded-full border-brand-line px-4 text-[14px] font-bold text-muted-foreground hover:text-foreground"
            >
              선택 해제
            </Button>
          </div>
        )}

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
          <ul className="thin-scroll max-h-[560px] divide-y divide-brand-line/70 overflow-y-auto">
            {filtered.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-brand-soft/40 md:flex-row md:items-center md:gap-4 md:p-5"
              >
                <Checkbox
                  checked={selected.has(m.id)}
                  onCheckedChange={(v) => toggleSelect(m.id, v === true)}
                  aria-label={`${m.name} 문의 선택`}
                  className="shrink-0 border-brand-line data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                />
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
                    {m.inquiryType && (
                      <span className="rounded-full border border-brand-line bg-white px-2.5 py-0.5 text-[13px] font-bold text-muted-foreground">
                        {m.inquiryType}
                      </span>
                    )}
                    {m.memo && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[13px] font-bold text-brand"
                        aria-label="메모 있음"
                      >
                        <NotebookPen className="h-3 w-3" aria-hidden="true" />
                        메모
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => openDetail(m)}
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
                    onClick={() => openDetail(m)}
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
        <DialogContent className="max-w-[600px] rounded-3xl">
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
                  {detail.inquiryType ? ` · ${detail.inquiryType}` : ""}
                </DialogDescription>
                {detail.email && (
                  <p className="mt-1 text-[14.5px] text-muted-foreground">
                    이메일:{" "}
                    <a
                      href={`mailto:${detail.email}`}
                      className="text-brand underline underline-offset-2"
                    >
                      {detail.email}
                    </a>
                  </p>
                )}
              </DialogHeader>
              <div className="mt-1 max-h-56 overflow-y-auto thin-scroll rounded-2xl bg-brand-mist p-5 text-[15.5px] leading-relaxed whitespace-pre-wrap text-foreground">
                {detail.message}
              </div>
              <div className="mt-4 grid gap-2">
                <Label
                  htmlFor="inquiry-memo"
                  className="flex items-center gap-1.5 text-[14.5px]"
                >
                  <NotebookPen className="h-4 w-4 text-brand" aria-hidden="true" />
                  처리 메모
                </Label>
                <Textarea
                  id="inquiry-memo"
                  value={memoDraft}
                  onChange={(e) => setMemoDraft(e.target.value)}
                  placeholder="통화 내용, 요청 사항 등 내부 처리 기록을 남겨주세요."
                  rows={3}
                  className="text-[15px]"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={saveMemo}
                    disabled={memoSaving || memoDraft === (detail.memo ?? "")}
                    className="h-9 gap-1.5 rounded-full bg-brand px-5 text-[14px] font-bold hover:bg-brand-deep"
                  >
                    {memoSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : null}
                    {memoSaving ? "저장 중..." : "메모 저장"}
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
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
