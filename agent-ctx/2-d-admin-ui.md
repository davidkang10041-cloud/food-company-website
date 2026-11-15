# Task 2-d — Admin UI (bulk inquiries + content management tab)

## Scope
Files touched (only these):
1. `src/components/admin/types.ts` (modify)
2. `src/components/admin/admin-shell.tsx` (modify)
3. `src/components/admin/inquiries-panel.tsx` (modify)
4. `src/components/admin/content-panel.tsx` (create)
5. `src/app/admin/page.tsx` (modify)

## Changes

### types.ts
- `AdminMessage`: added `email: string | null` and `inquiryType: string`.
- Added `AdminGrowthMetric`, `AdminHistoryEntry`, `AdminPartner`, `AdminContent` types and `INQUIRY_TYPES` const (식자재 공급 / OEM·ODM 제조 / MEALBOX25·밀키트 / 기타).

### admin-shell.tsx
- `AdminTab` now includes `"content"`.
- TABS: inserted `{ key: "content", label: "콘텐츠 관리", icon: Database }` between news and settings.
- TAB_TITLES: added content entry ("성과지표 · 연혁 · 파트너사를 수정하면 공개 홈페이지에 즉시 반영됩니다.").

### inquiries-panel.tsx
- Bulk operations: per-row `Checkbox` (aria-label `${m.name} 문의 선택`), select-all header row (전체 선택, indeterminate state supported), selection tracked in `Set<string>`.
- Bulk action bar above list when selection > 0: "{n}건 선택됨" + 3 status buttons (새 문의/진행중/완료 처리) + 선택 해제. PATCH `/api/messages` with `{ ids, status }`; toast "{updated}건이 '{label}'(으)로 변경되었습니다."; Loader2 spinner + disabled buttons while bulk updating.
- Inquiry type neutral chip after status chip in each row; detail dialog description appends " · {inquiryType}"; mailto link (이메일: ...) shown when `detail.email` exists.
- Search now matches `m.email` too (placeholder updated).
- CSV export columns: 접수일시, 성명, 회사, 연락처, 이메일, 문의유형, 처리상태, 문의내용, 관리자메모.
- All prior behaviors kept (filter chips, search, detail dialog, memo save, single status change, delete flow). Deleted rows are also pruned from selection.

### content-panel.tsx (new)
- Self-fetching editor for `/api/content` (GET with `cache: "no-store"`; retry button on failure; loading spinner).
- Three white cards: 성과 지표 (max 8), 연혁 (max 60, sort hint), 파트너사 (max 20). Header per card: icon + title + count badge + "+ 항목 추가" (disabled at max with hint). Per-row remove button (aria-label "행 삭제").
- Empty-state hint: "항목을 추가하세요. 저장 전까지 홈페이지에는 기본 데이터가 표시됩니다."
- Global save button top-right of panel header and at bottom. Client validation (trim all; non-empty value/label/text; year 4-digit; month empty or 2-digit) → history sorted year desc then month desc → PUT `/api/content` `{ growth, history, partners }`.
- Toasts: success "콘텐츠가 저장되었습니다. 홈페이지에 즉시 반영됩니다." / 401 "로그인이 필요합니다." (destructive) / other errors `data?.error`.

### admin/page.tsx
- Imported `ContentPanel`; renders `{tab === "content" && <ContentPanel />}` between news and settings panels. No other logic changed.

## Validation
- `bunx eslint src/components/admin src/app/admin/page.tsx` → exit 0 (clean).
- `bunx tsc --noEmit` filtered to my 5 files → no errors.
- Pre-existing error NOT in my scope: `src/components/admin/overview-panel.tsx(27)` imports `type AdminTab` from `./types`, but `AdminTab` is exported from `./admin-shell`. File unmodified since HEAD (committed state); left untouched per task boundary (owned by another agent).

## Fetch contracts used
- `PATCH /api/messages` body `{ ids: string[], status: InquiryStatus }` → `{ ok, updated }` (bulk)
- `GET /api/content` → `{ ok, content: AdminContent }`
- `PUT /api/content` body `{ growth, history, partners }` → `{ ok }` / 401 / `{ error }`
