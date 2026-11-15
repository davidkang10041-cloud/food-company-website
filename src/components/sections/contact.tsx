"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Send } from "lucide-react";
import { FadeIn } from "@/components/site/fade-in";
import { SectionHeading } from "@/components/site/section-heading";
import { useSiteSettings } from "@/components/settings-context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/hooks/use-toast";

const INQUIRY_TYPES = [
  "식자재 공급",
  "OEM·ODM 제조",
  "MEALBOX25·밀키트",
  "기타",
] as const;

export function Contact() {
  const { toast } = useToast();
  const settings = useSiteSettings();
  const [pending, setPending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    inquiryType: "기타",
    message: "",
    website: "",
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
        description:
          "성명, 연락처, 문의내용은 필수 항목이며, 제출 전 개인정보 수집·이용 동의가 필요합니다.",
        variant: "destructive",
      });
      return;
    }
    if (!consent) {
      toast({
        title: "동의가 필요합니다",
        description: "개인정보 수집·이용에 동의해주세요.",
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
      setForm({
        name: "",
        company: "",
        phone: "",
        email: "",
        inquiryType: "기타",
        message: "",
        website: "",
      });
      setConsent(false);
    } catch {
      toast({
        title: "전송에 실패했습니다",
        description: `잠시 후 다시 시도하거나 ${settings.phoneDisplay} 로 전화 주시면 신속히 안내해 드립니다.`,
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
              description="식자재 유통, OEM/ODM 제조, 특화 밀키트까지 — 궁금하신 점을 남겨주시면 담당자가 빠르게 안내해 드립니다."
            />

            <FadeIn className="mt-10 space-y-4">
              <a
                href={`tel:${settings.phone.replace(/-/g, "")}`}
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
                    {settings.phoneDisplay}
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
                    {settings.address}
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
                    {settings.business}
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

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
                  <Label htmlFor="contact-email" className="text-[15px]">
                    이메일 (답변용, 선택)
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="example@company.com"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-type" className="text-[15px]">
                    문의 유형
                  </Label>
                  <Select
                    value={form.inquiryType}
                    onValueChange={(value: string) =>
                      setForm((f) => ({ ...f, inquiryType: value }))
                    }
                  >
                    <SelectTrigger id="contact-type" className="w-full">
                      <SelectValue placeholder="문의 유형을 선택해 주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {INQUIRY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
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
                <div className="flex items-start gap-3 rounded-2xl border border-brand-line bg-brand-mist/60 p-4 sm:col-span-2">
                  <Checkbox
                    id="contact-consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked === true)}
                    className="mt-0.5"
                    aria-required="true"
                  />
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="contact-consent"
                      className="text-[14.5px] font-bold leading-relaxed"
                    >
                      개인정보 수집·이용에 동의합니다{" "}
                      <span className="text-tomato">(필수)</span>
                    </Label>
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener"
                      className="w-fit text-[13.5px] font-semibold text-brand underline underline-offset-4 transition-colors hover:text-brand-deep"
                    >
                      동의 안내 보기
                    </a>
                  </div>
                </div>

                {/* Honeypot — 봇 전용 필드, 사람에게는 노출되지 않음 */}
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="contact-website" className="sr-only">
                    웹사이트
                  </Label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update("website")}
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
