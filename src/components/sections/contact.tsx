"use client";

import { useState, type FormEvent } from "react";
import { Building2, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { COMPANY } from "@/lib/company";
import { FadeIn } from "@/components/site/fade-in";

type FormState = {
  name: string;
  company: string;
  phone: string;
  message: string;
};

const initialForm: FormState = { name: "", company: "", phone: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const update = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast({
          title: "문의 접수 실패",
          description: data.error ?? "입력값을 확인해주세요.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "문의가 접수되었습니다",
        description: "담당자가 빠르게 연락드리겠습니다. 감사합니다.",
      });
      setForm(initialForm);
    } catch {
      toast({
        title: "오류가 발생했습니다",
        description: "네트워크 상태를 확인 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="texture-dark py-24 md:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: CTA + info */}
          <div>
            <FadeIn>
              <p className="kicker-light">Contact</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.25] tracking-tight text-white md:text-[44px] md:leading-[1.24]">
                알맞은 먹거리를 찾는다면,
                <br />
                채다원으로 한번에 해결하세요
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65">
                식자재 유통, OEM/ODM 제조, 특화 밀키트까지 —
                궁금하신 점을 남겨주시면 담당자가 빠르게 안내해 드립니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <ul className="mt-10 space-y-4">
                <li className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6fc7a4]/15">
                    <Phone className="h-5 w-5 text-[#6fc7a4]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-white/50">대표전화</p>
                    <p className="font-num text-xl font-extrabold text-white">
                      {COMPANY.phoneDisplay}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6fc7a4]/15">
                    <MapPin className="h-5 w-5 text-[#6fc7a4]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-white/50">주소</p>
                    <p className="text-lg font-bold text-white">{COMPANY.address}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6fc7a4]/15">
                    <Building2 className="h-5 w-5 text-[#6fc7a4]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-white/50">사업분야</p>
                    <p className="text-lg font-bold text-white">{COMPANY.business}</p>
                  </div>
                </li>
              </ul>
            </FadeIn>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-7 shadow-2xl md:p-9"
              aria-label="1:1 문의 폼"
            >
              <h3 className="text-xl font-extrabold text-brand-deep">1:1 문의하기</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                아래 정보를 남겨주시면 빠르게 연락드리겠습니다.
              </p>

              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">
                      성함 <span className="text-tomato">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => update("name")(e.target.value)}
                      placeholder="홍길동"
                      required
                      maxLength={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-company">회사명 / 상호</Label>
                    <Input
                      id="contact-company"
                      value={form.company}
                      onChange={(e) => update("company")(e.target.value)}
                      placeholder="(주) 회사명"
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">
                    연락처 <span className="text-tomato">*</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone")(e.target.value)}
                    placeholder="010-0000-0000"
                    required
                    maxLength={30}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">
                    문의내용 <span className="text-tomato">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    placeholder="식자재 공급, OEM/ODM 제조, 밀키트 등 문의하실 내용을 자세히 적어주세요."
                    rows={5}
                    required
                    minLength={5}
                    maxLength={2000}
                    className="min-h-28 resize-y"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-7 h-12 w-full rounded-xl bg-brand text-[15px] font-bold hover:bg-brand-deep"
              >
                {submitting ? (
                  "접수 중..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                    문의 접수하기
                  </>
                )}
              </Button>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                접수된 문의는 담당자 확인 후 순차적으로 회신드립니다.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
