export type InquiryStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type AdminMessage = {
  id: string;
  name: string;
  company: string | null;
  phone: string;
  email: string | null;
  inquiryType: string;
  message: string;
  memo: string;
  status: InquiryStatus;
  createdAt: string;
};

export type AdminCounts = {
  total: number;
  new: number;
  inProgress: number;
  done: number;
};

export type AdminNews = {
  id: string;
  category: string;
  date: string;
  title: string;
  desc: string;
  highlight: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export const STATUS_LABEL: Record<InquiryStatus, string> = {
  NEW: "새 문의",
  IN_PROGRESS: "진행중",
  DONE: "완료",
};

export const STATUS_ORDER: InquiryStatus[] = ["NEW", "IN_PROGRESS", "DONE"];

export const NEWS_CATEGORIES = ["공급", "인증", "시설", "공지", "기타"];

export const INQUIRY_TYPES = ["식자재 공급", "OEM·ODM 제조", "MEALBOX25·밀키트", "기타"] as const;

export type AdminGrowthMetric = { value: string; label: string };
export type AdminHistoryEntry = { year: number; month: string; text: string };
export type AdminPartner = { name: string; ko: string };
export type AdminContent = {
  growth: AdminGrowthMetric[];
  history: AdminHistoryEntry[];
  partners: AdminPartner[];
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
