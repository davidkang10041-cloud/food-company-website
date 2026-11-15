# Task 2-c — Backend API (mailer, contact hardening, content route, bulk PATCH, .env.example)

Agent: backend-api
Date: 2025-11-15
Status: COMPLETED (code + lint clean; one environment note below)

## Files changed

1. **src/lib/mailer.ts** (new)
   - `notifyNewInquiry(msg)` via nodemailer; exports `MailResult`.
   - Skips with `console.info("[mailer] SMTP not configured — inquiry notification skipped")` when `SMTP_HOST|SMTP_USER|SMTP_PASS|ADMIN_NOTIFY_EMAIL` missing → `{ sent:false, reason:"not_configured" }`.
   - Transporter: `secure: port === 465`, subject `[채다원 홈페이지] 새 문의 접수 — {inquiryType} / {name}님`, plain-text Korean summary (접수일시 ko-KR Asia/Seoul, 문의유형, 성명, 회사, 연락처, 이메일, 문의내용 전문).
   - try/catch: `console.error("[mailer] send failed:", error)` → `{ sent:false, reason:String(error) }`. Never throws.

2. **src/app/api/contact/route.ts** (modified)
   - Schema adds `email` (trim/email/max120/optional-or-empty), `inquiryType` enum(식자재 공급 | OEM·ODM 제조 | MEALBOX25·밀키트 | 기타).default("기타"), `website` honeypot (max200, optional).
   - Honeypot first: non-empty `website` → `{ ok:true }` with zero DB writes (no rate-limit slot consumed).
   - Rate limit: in-memory `Map<ip, timestamps[]>`, `WINDOW_MS=10min`, `MAX_PER_WINDOW=5`; `clientIp()` = x-forwarded-for[0] || x-real-ip || "unknown"; prunes expired then 429 with Korean message (전화 032-752-7227 안내) or records hit.
   - Create with `email: email || null`, `inquiryType`.
   - Fire-and-forget `void notifyNewInquiry({...}).catch(() => {})` — never awaited, never fails request.
   - 400 (first zod issue) / 500 Korean messages preserved.

3. **src/app/api/content/route.ts** (new)
   - GET public: parallel findMany on GrowthMetric/HistoryEntry/PartnerEntry; response `{ ok, growth[], history[], partners[] }` with DB-first, DEFAULT_GROWTH_METRICS / DEFAULT_HISTORY / DEFAULT_PARTNERS fallback when a table is empty.
   - PUT admin (requireAdmin → 401): zod (growth ≤20 items value≤40/label≤60; history ≤60 items year int 1990–2100, month `^\d{2}$` or "", text≤120; partners ≤20 items name/ko≤60). Per provided collection: `deleteMany({})` then `createMany({ ..., sort: i })`. Returns `{ ok:true, updated:{growth,history,partners} }` (0 for untouched).
   - 400/500 Korean messages, `console.error("[content][GET|PUT]", error)`.

4. **src/app/api/messages/route.ts** (modified)
   - Existing GET untouched.
   - Added PATCH bulk: `requireAdmin` → zod `{ ids: string[1..500], status: NEW|IN_PROGRESS|DONE }` → `contactMessage.updateMany({ where:{ id:{ in: ids } }, data:{ status } })` → `{ ok:true, updated: result.count }`. 400/500 Korean errors, log scope `[messages][bulk][PATCH]`.

5. **.env.example** (new) — template only, no real secrets (DATABASE_URL, ADMIN_PASSWORD/ADMIN_SECRET, NEXT_PUBLIC_SITE_URL, search verification, SMTP + ADMIN_NOTIFY_EMAIL, GA/NAVER analytics).

## API contract (for admin UI / frontend agents)

- `POST /api/contact` body `{ name, company?, phone, email?, inquiryType?, message, website(honeypot) }` → `{ ok:true }` | 400 `{ ok:false, error }` | 429 `{ ok:false, error }`. Honeypot field must stay hidden/empty for humans.
- `GET /api/content` → `{ ok:true, growth:{value,label}[], history:{year,month,text}[], partners:{name,ko}[] }` (always non-empty; defaults when DB empty).
- `PUT /api/content` admin, body `{ growth?, history?, partners? }` (full-replace per provided collection) → `{ ok:true, updated:{growth,history,partners} }`; 401 when not admin.
- `PATCH /api/messages` admin, body `{ ids:[...], status }` → `{ ok:true, updated: n }`; 401 when not admin.
- Inquiry types (exact strings): `식자재 공급`, `OEM·ODM 제조`, `MEALBOX25·밀키트`, `기타`.

## Verification

- `bunx eslint` on all four TS files: clean (no errors/warnings).
- Direct DB roundtrip with fresh Prisma client (throwaway `bun -e`, no test files committed): contact create with email/inquiryType OK; growth/history/partners createMany+findMany OK (incl. empty month); updateMany count OK (nonexistent ids ignored). Content tables restored to empty state afterwards.

## Environment note (IMPORTANT for orchestrator / 3-x agents)

Dev server process started 07:20:29; Prisma client was regenerated 07:40:43 after the schema push. The running process still holds the OLD generated client in memory (globalThis singleton in src/lib/db.ts), so until the dev server process is restarted ONCE:
- `GET /api/content` and `PUT /api/content` (post-auth) will 500 with `Cannot read properties of undefined (reading 'findMany')`.
- `POST /api/contact` with email/inquiryType will hit the 500 catch.
- Auth guards (401), honeypot swallow, zod 400s, and rate limit all already work live.
All code is correct against the current schema + generated client; the runtime failure disappears after the next dev server restart. I did not restart it per task constraints.
