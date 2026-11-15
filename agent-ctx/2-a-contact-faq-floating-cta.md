# Task 2-a — Contact form upgrade, FAQ section, Floating CTA (work record)

## Status: COMPLETED

## Files changed
1. `src/components/sections/contact.tsx` (modified)
2. `src/components/sections/faq.tsx` (created)
3. `src/components/site/floating-cta.tsx` (created)

## What was added

### contact.tsx
- Added 문의 유형 shadcn Select (`식자재 공급` / `OEM·ODM 제조` / `MEALBOX25·밀키트` / `기타`, default `기타`), state string via `onValueChange`, SelectTrigger full-width with SelectValue.
- Added optional 이메일 Input (`type="email"`, placeholder `example@company.com`, Label "이메일 (답변용, 선택)").
- Honeypot anti-spam: hidden div `className="hidden" aria-hidden="true"`, input `name="website"` tabIndex -1 autoComplete off, tracked in `form.website`; sr-only Label.
- 개인정보 수집·이용 동의: shadcn Checkbox, mandatory client validation — unchecked → destructive toast "개인정보 수집·이용에 동의해주세요." and abort. Link `<a href="/privacy" target="_blank" rel="noopener">동의 안내 보기</a>` (text-brand, underline-offset-4). Required-fields toast description updated to also mention consent.
- Field order: 성명* / 회사명·상호 (2-col sm+), 연락처* / 이메일 (2-col sm+), 문의 유형 (full), 문의내용* (full), 동의 체크박스 (full). Consent row styled `rounded-2xl border-brand-line bg-brand-mist/60 p-4`.
- Form state extended: `{ name, company, phone, email, inquiryType: "기타", message, website }`; `update()` helper unchanged and reused. Submit body = full JSON.stringify(form). Success resets ALL fields + consent + honeypot. Pending state, toast UX, `aria-label="1:1 문의 폼"` preserved.

### faq.tsx (new, "use client", `export function Faq()`)
- Section `id="faq"`, `bg-white py-24 md:py-32`, `aria-label="자주 묻는 질문"`.
- SectionHeading kicker="FAQ" (left-aligned, matching site convention), column `max-w-3xl mx-auto`.
- 8 Korean Q&A items grounded in company facts (전국 콜드체인, 업계 최소 MOQ, HACCP 4품목, ODM 일정, 전문몰 실시간 시세, B2B 고객 유형, 견적 상담/대표전화 032-752-7227, 인천 만석동 본사공장 + 성남 제2공장).
- Radix Accordion `type="single" collapsible`, items `border-brand-line`, trigger `text-[16.5px] md:text-[17px] font-bold hover:no-underline`, content `text-[15.5px] leading-relaxed text-muted-foreground`, wrapped in FadeIn.
- FAQPage JSON-LD built from the same typed `FAQ_ITEMS` const and rendered via `<script type="application/ld+json" dangerouslySetInnerHTML>` at the end of the section.

### floating-cta.tsx (new, "use client", `export function FloatingCta()`)
- `fixed inset-x-0 bottom-0 z-50 lg:hidden` bar; visual container `border-t border-brand-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80`; inner `p-3`.
- Safe area: inline `paddingBottom: calc(env(safe-area-inset-bottom) + 12px)` on the outer wrapper.
- Wrapper `<div role="complementary" aria-label="빠른 상담">`.
- Two equal flex-1 buttons (min-h 52px, rounded-full, text-[15.5px] font-bold, gap-2):
  - 전화 상담 → `tel:` link, phone from `useSiteSettings()` with fallback `032-752-7227`; `bg-brand text-white hover:bg-brand-deep shadow-lg shadow-brand/25`, Phone icon.
  - 1:1 문의 → smooth anchor `#contact`; `border-brand-line bg-white text-brand hover:bg-brand-soft`, MessageSquareText icon.

## Integration notes (for page composition agent)
- Import: `import { Faq } from "@/components/sections/faq"` and `import { FloatingCta } from "@/components/site/floating-cta"`.
- Faq renders standalone white section — place before/around Contact section.
- FloatingCta is fixed bottom, mobile/tablet only (lg:hidden); page should keep bottom padding on mobile if needed to avoid overlap with footer.
- `/privacy` route link used in contact consent — ensure a privacy page/route exists or the anchor falls through gracefully.

## Lint
`bunx eslint src/components/sections/contact.tsx src/components/sections/faq.tsx src/components/site/floating-cta.tsx` → 0 errors, 0 warnings (only these 3 files touched; no other files modified).
