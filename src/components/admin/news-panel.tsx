"use client";

import { useMemo, useState } from "react";
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { NEWS_CATEGORIES, type AdminNews } from "./types";

type NewsPanelProps = {
  news: AdminNews[];
  loading: boolean;
  onRefresh: () => Promise<void>;
};

const CATEGORY_STYLE: Record<string, string> = {
  공급: "bg-brand text-white",
  인증: "bg-gold/90 text-brand-ink",
  시설: "bg-tomato text-white",
  공지: "bg-brand-soft text-brand border border-brand-line",
  기타: "bg-muted text-foreground border border-brand-line",
};

type FormState = {
  category: string;
  date: string;
  title: string;
  desc: string;
  highlight: boolean;
  published: boolean;
};

const EMPTY_FORM: FormState = {
  category: "공지",
  date: "",
  title: "",
  desc: "",
  highlight: false,
  published: true,
};

export function NewsPanel({ news, loading, onRefresh }: NewsPanelProps) {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminNews | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [pending, setPending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminNews | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...news].sort((a, b) =>
      a.date === b.date
        ? b.createdAt.localeCompare(a.createdAt)
        : b.date.localeCompare(a.date)
    );
    return [...news]
      .sort((a, b) =>
        a.date === b.date
          ? b.createdAt.localeCompare(a.createdAt)
          : b.date.localeCompare(a.date)
      )
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.desc.toLowerCase().includes(q) ||
          n.category.includes(q) ||
          n.date.includes(q)
      );
  }, [news, query]);

  const openCreate = () => {
    setEditing(null);
    const today = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setForm({
      ...EMPTY_FORM,
      date: `${today.getFullYear()}.${pad(today.getMonth() + 1)}`,
    });
    setDialogOpen(true);
  };

  const openEdit = (item: AdminNews) => {
    setEditing(item);
    setForm({
      category: item.category,
      date: item.date,
      title: item.title,
      desc: item.desc,
      highlight: item.highlight,
      published: item.published,
    });
    setDialogOpen(true);
  };

  const submit = async () => {
    if (!form.date.trim() || !form.title.trim() || !form.desc.trim()) {
      toast({
        title: "입력을 확인해 주세요",
        description: "날짜(YYYY.MM), 제목, 내용은 필수 항목입니다.",
        variant: "destructive",
      });
      return;
    }
    setPending(true);
    try {
      const res = await fetch(editing ? `/api/news/${editing.id}` : "/api/news", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: editing ? "수정 실패" : "등록 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: editing ? "공지사항이 수정되었습니다." : "공지사항이 등록되었습니다.",
        description: "홈페이지 뉴스룸에 바로 반영됩니다.",
      });
      setDialogOpen(false);
      await onRefresh();
    } catch {
      toast({
        title: "요청 실패",
        description: "네트워크 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  const togglePublished = async (item: AdminNews, published: boolean) => {
    try {
      const res = await fetch(`/api/news/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "변경 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      await onRefresh();
    } catch {
      toast({
        title: "변경 실패",
        description: "네트워크 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/news/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast({
          title: "삭제 실패",
          description: data?.error ?? "잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "공지사항이 삭제되었습니다." });
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

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p className="text-[15px] text-muted-foreground">
          총 <span className="font-num font-bold text-foreground">{filtered.length}</span>
          건 · 게시중{" "}
          <span className="font-num font-bold text-foreground">
            {filtered.filter((n) => n.published).length}
          </span>
          건
        </p>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제목 · 내용 · 카테고리 검색"
              className="pl-10"
              aria-label="공지사항 검색"
            />
          </div>
          <Button
            onClick={openCreate}
            className="h-11 shrink-0 gap-1.5 rounded-full bg-brand px-5 text-[15px] font-bold hover:bg-brand-deep"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            새 공지사항 등록
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-line bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-[15px] text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-[15px] font-semibold text-muted-foreground">
              등록된 공지사항이 없습니다.
            </p>
            <p className="text-[14.5px] text-muted-foreground">
              검색 조건에 맞는 공지사항이 없습니다.
            </p>
          </div>
        ) : (
          <ul className="max-h-[560px] overflow-y-auto thin-scroll divide-y divide-brand-line/70">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-4 md:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-num text-[14px] font-bold text-muted-foreground">
                      {item.date}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[13px] font-bold",
                        CATEGORY_STYLE[item.category] ?? CATEGORY_STYLE.기타
                      )}
                    >
                      {item.category}
                    </span>
                    {item.highlight && (
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[13px] font-bold text-brand">
                        NEW
                      </span>
                    )}
                    {!item.published && (
                      <span className="rounded-full border border-brand-line px-2 py-0.5 text-[13px] font-bold text-muted-foreground">
                        비공개
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 truncate text-[15.5px] font-bold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-[14.5px] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:shrink-0">
                  <div className="flex items-center gap-2 rounded-full border border-brand-line px-3 py-1.5">
                    <span className="text-[13.5px] font-bold text-muted-foreground">
                      게시
                    </span>
                    <Switch
                      checked={item.published}
                      onCheckedChange={(v) => togglePublished(item, v)}
                      aria-label={`${item.title} 게시 여부`}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEdit(item)}
                    className="h-9 w-9"
                    aria-label={`${item.title} 수정`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(item)}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    aria-label={`${item.title} 삭제`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[600px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[19px] font-extrabold">
              {editing ? "공지사항 수정" : "새 공지사항 등록"}
            </DialogTitle>
            <DialogDescription className="text-[15px]">
              저장하면 홈페이지 뉴스룸에 바로 반영됩니다.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-1 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-[15px]">카테고리</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="news-date" className="text-[15px]">
                  날짜 (YYYY.MM) <span className="text-tomato">*</span>
                </Label>
                <Input
                  id="news-date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  placeholder="2025.02"
                  className="font-num"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="news-title" className="text-[15px]">
                제목 <span className="text-tomato">*</span>
              </Label>
              <Input
                id="news-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="공지 제목을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="news-desc" className="text-[15px]">
                내용 요약 <span className="text-tomato">*</span>
              </Label>
              <Textarea
                id="news-desc"
                value={form.desc}
                onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                placeholder="뉴스룸 목록에 노출될 요약 내용을 입력하세요."
                rows={4}
              />
            </div>
            <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-brand-line bg-brand-mist/50 px-4 py-3">
              <label className="flex items-center gap-2.5">
                <Switch
                  checked={form.highlight}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, highlight: v }))}
                  aria-label="NEW 배지 표시"
                />
                <span className="text-[15px] font-bold text-foreground">
                  NEW 배지 표시
                </span>
              </label>
              <label className="flex items-center gap-2.5">
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))}
                  aria-label="홈페이지 게시"
                />
                <span className="text-[15px] font-bold text-foreground">
                  홈페이지 게시
                </span>
              </label>
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="rounded-full font-bold"
              disabled={pending}
            >
              취소
            </Button>
            <Button
              onClick={submit}
              disabled={pending}
              className="rounded-full bg-brand font-bold hover:bg-brand-deep"
            >
              {pending ? "저장 중..." : editing ? "수정하기" : "등록하기"}
            </Button>
          </DialogFooter>
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
              공지사항을 삭제하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              &ldquo;{deleteTarget?.title}&rdquo;을(를) 영구 삭제합니다. 이 작업은
              되돌릴 수 없습니다.
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
