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
import { EN_COMPANY, EN_INQUIRY_TYPES } from "@/lib/company-en";

export function EnContact() {
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
        title: "Please check your details",
        description:
          "Name, phone number, and message are required, and consent to the collection and use of personal information is needed before submitting.",
        variant: "destructive",
      });
      return;
    }
    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please agree to the collection and use of your personal information.",
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
      if (!res.ok) throw new Error("send failed");
      toast({
        title: "Your inquiry has been received",
        description: "Our team will get back to you shortly. Thank you.",
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
        title: "Failed to send",
        description: `Please try again shortly, or call ${settings.phoneDisplay} for prompt assistance.`,
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
      aria-label="Contact us"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <div>
            <SectionHeading
              dark
              kicker="CONTACT"
              title={"Looking for the right food solutions?\nOne call to CHEDAWON does it all"}
              description="Ingredient distribution, OEM/ODM manufacturing, specialty meal kits — leave your questions and our team will respond promptly."
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
                    Main line
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
                    Address
                  </span>
                  <span className="mt-1 block text-[16px] font-bold text-white">
                    {EN_COMPANY.address}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-white/60">
                    Business areas
                  </span>
                  <span className="mt-1 block text-[16px] font-bold text-white">
                    {EN_COMPANY.business}
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
              aria-label="1:1 inquiry form"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                1:1 Inquiry
              </h3>
              <p className="mt-2 text-[15px] text-muted-foreground">
                Leave your details below and we will get back to you promptly.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name" className="text-[15px]">
                    Name <span className="text-tomato">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-company" className="text-[15px]">Company / Business</Label>
                  <Input
                    id="contact-company"
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Company name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone" className="text-[15px]">
                    Phone <span className="text-tomato">*</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+82-10-0000-0000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email" className="text-[15px]">
                    Email (for reply, optional)
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
                    Inquiry type
                  </Label>
                  <Select
                    value={form.inquiryType}
                    onValueChange={(value: string) =>
                      setForm((f) => ({ ...f, inquiryType: value }))
                    }
                  >
                    <SelectTrigger id="contact-type" className="w-full">
                      <SelectValue placeholder="Select an inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EN_INQUIRY_TYPES.map((type) => (
                        <SelectItem key={type.api} value={type.api}>
                          {type.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-message" className="text-[15px]">
                    Message <span className="text-tomato">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us more about your inquiry — ingredient supply, OEM/ODM manufacturing, meal kits, and more."
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
                      I agree to the collection and use of my personal information{" "}
                      <span className="text-tomato">(required)</span>
                    </Label>
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener"
                      className="w-fit text-[13.5px] font-semibold text-brand underline underline-offset-4 transition-colors hover:text-brand-deep"
                    >
                      View consent details
                    </a>
                  </div>
                </div>

                {/* Honeypot — bot-only field, hidden from humans */}
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="contact-website" className="sr-only">
                    Website
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
                {pending ? "Sending..." : "Submit Inquiry"}
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-center text-[14.5px] leading-relaxed text-muted-foreground">
                Your personal information is used only to handle this inquiry and is securely destroyed after a retention period.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
