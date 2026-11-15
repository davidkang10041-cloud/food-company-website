"use client";

import { MessageSquareText, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/settings-context";

const FALLBACK_PHONE = "032-752-7227";

export function FloatingCta() {
  const settings = useSiteSettings();
  const phone = settings?.phone || FALLBACK_PHONE;

  return (
    <div
      role="complementary"
      aria-label="빠른 상담"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
    >
      <div className="flex gap-2 p-3">
        <a
          href={`tel:${phone.replace(/-/g, "")}`}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 text-[15.5px] font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-deep"
        >
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          전화 상담
        </a>
        <a
          href="#contact"
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-brand-line bg-white px-4 text-[15.5px] font-bold text-brand transition-colors hover:bg-brand-soft"
        >
          <MessageSquareText className="h-[18px] w-[18px]" aria-hidden="true" />
          1:1 문의
        </a>
      </div>
    </div>
  );
}
