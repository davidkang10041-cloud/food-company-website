"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Send } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { COMPANY } from "@/lib/company";

export function Contact() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast({
        title: "입력을 확인해 주세요",
        description: "성명, 연락처, 문의내용은 필수 항목입니다.",
        variant: "destructive",
      });
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("전송 실패");
      toast({
        title: "문의가 접수되었습니다",
        description: "담당자가 빠르게 연락드리겠습니다. 감사합니다.",
      });
      setForm({ name: "", company: "", phone: "", message: "" });
    } catch {
      toast({
        title: "전송에 실패했습니다",
        description: `잠시 후 다시 시도하거나 ${COMPANY.phoneDisplay} 로 전화 주시면 신속히 안내해 드립니다.`,
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <section
      id="contact"
      className="texture-dark py-24 text-white md:py-32"
      aria-label="문의하기"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <div>
            <SectionHeading
              dark
              kicker="CONTACT"
              title={"알맞은 먹거리를 찾는다면,\n채다원으로 한번에 해결하세요"}
              description="식자제 유통, OEM/ODM 제조, 특화 밀키트까지 — 궁금하신 점을 남겨주시면 담당자가 빠르게 안내해 드립니다."
            />

            <FadeIn className="mt-10 space-y-4">
              <a
                href={`tel:${COMPANY.phone.replace(/-/g, "")}`}
                className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-colors hover:bg-white/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-white/60">
                    대표전화
                  </span>
                  <span className="font-num mt-1 block text-xl font-extrabold tracking-tight text-white">
                    {COMPANY.phoneDisplay}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-white/60">
                    주소
                  </span>
                  <span className="mt-1 block text-[16px] font-bold text-white">
                    {COMPANY.address}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-white/60">
                    사업분야
                  </span>
                  <span className="mt-1 block text-[16px] font-bold text-white">
                    {COMPANY.business}
                  </span>
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Inquiry form */}
          <FadeIn delay={0.15}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-white p-6 text-foreground shadow-2xl md:p-8"
              aria-label="1:1 문의 폼"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                1:1 문의하기
              </h3>
              <p className="mt-2 text-[15px] text-muted-foreground">
                아래 정보를 남겨주시면 빠르게 연락드리겠습니다.
              </p>

              <div className="mt-6 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name" className="text-[15px]">
                    성명 <span className="text-tomato">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="홍길동"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-company" className="text-[15px]">회사명 / 상호</Label>
                  <Input
                    id="contact-company"
                    value={form.company}
                    onChange={update("company")}
                    placeholder="(주) 회사명"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone" className="text-[15px]">
                    연락처 <span className="text-tomato">*</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-message" className="text-[15px]">
                    문의내용 <span className="text-tomato">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="식자재 공급, OEM/ODM 제조, 밀키트 등 문의하시는 내용을 자세히 적어주세요."
                    rows={5}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="mt-6 h-13 w-full rounded-full bg-brand py-4 text-[16px] font-bold hover:bg-brand-deep"
              >
                {pending ? "전송 중..." : "문의 접수하기"}
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-center text-[14.5px] leading-relaxed text-muted-foreground">
                입력하신 개인정보는 문의 처리 목적으로만 활용되며, 일정 기간
                후 안전하게 파기됩니다.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
