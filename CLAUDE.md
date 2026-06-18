# My Workspace — AI Assistant Context

This is the persistent operating guide for ChatGPT, Claude, Gemini, or any AI assistant helping inside this repo.

## Core Rule

This workspace exists to help Hamilton move projects forward, not just archive notes.

Use this loop:

```txt
set the goal → identify the blocker → solve the next problem → ship or verify the result
```

Be direct, concrete, and action-oriented.

---

## User Context

```txt
Name: Hamilton Pinto Jr.
Nickname: Hamster
Timezone: Pacific Time
Role: consultant, technology advisor, project manager, and builder across multiple active business projects
Preferred style: professional, polished, direct, concrete, and practical
```

---

## Required Read Order

When Hamilton asks to read or continue the workspace:

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current active focus files listed in README.md and the index
```

Do not automatically read every historical daily log. Read old logs only when debugging or reconstructing a past decision.

---

## Workspace Update Rules

When Hamilton says **update my workspace** or **end of day**:

```txt
1. Update the relevant active project handoff/status file.
2. Update README.md if the active focus or next actions changed.
3. Update 00 [C] Workspace Index.md if files, read order, or project status changed.
4. Add or update a daily/end-of-day log when closing a work session.
5. Update CLAUDE.md only if persistent instructions or project handoff rules changed.
```

Use `[C]` in filenames for AI-authored files unless Hamilton asks otherwise.

Never commit private service values or credentials.

---

## Active Projects

### Benny & Penny's Adventures

Children's medical book and digital/print product business around Michelle's book series.

Current status:

```txt
Customer Portal v2 is BUILT and approved by Hamilton: persistent sidebar shell (Dashboard, Library, Orders, Gifting, Addresses, Account, Help), dashboard with reading-slots meter, order shipment tracking (print-jobs), account + help pages, and a branded printable invoice.
Payload admin sidebar now mirrors the portal (identity card + icon-tile rows). Admin keeps its teal/mint palette — cream was rejected.
Gifting tested and fixed: gifted books show in My Library ("Gifted Book"), the gift email names the sender (subject + From line), and redeem is session-aware (signed-in members claim in one step; existing members are never forced to set a password). Gift download allowance is currently 1.
R2 automated digital delivery is confirmed working in testing.
Digital orders auto-create Media/Downloads records.
Portal Library shows separate PDF, EPUB, and Audiobook buttons, with self-heal that backfills a missing format record by mirroring the R2 key.
R2 signed download links work.
Shared readable slot tracking is active (3 slots/title across PDF/EPUB/gifts).
Product catalog data, book covers, page previews, and cart thumbnails are still placeholders.
Active focus is Google Places live verification, order 26-0029 cleanup, product asset replacement, real R2 files, deeper BPG gift/coupon tracking, Terms updates, email deliverability, and LuLu research.
LuLu testing is paused until official project/template requirements are researched.
Address autocomplete uses Google Places API (New) — Geoapify is fully removed. It runs CLIENT-SIDE because the existing key is HTTP-referrer restricted. Vercel var must be NEXT_PUBLIC_GOOGLE_PLACES_API_KEY (same key value); the old server-proxy routes (/api/geo/*) are retired no-op stubs. Customer: AddressAutocomplete in the portal address book. Admin: AdminAddressField custom Payload field on CustomerAddresses.street1 (fills city/state/zip/country via useForm dispatch); registered in app/(payload)/admin/importMap.ts. Google Cloud: enable Places API (New) + billing; referrer allowlist must include BOTH https://bennyandpennyadventures.com/* and https://www.bennyandpennyadventures.com/* plus http://localhost:3000/*. Admin System Status tile is "Google Places API". Rollback for admin field: remove the admin.components block on street1 + its importMap line.
Stripe Checkout's name field cannot be validated by Stripe. lib/stripeFulfillment.ts guards new orders: a name containing digits is flagged with a "⚠ REVIEW" order note and the linked account's name is used for customer/billing name when available. This is non-destructive — original Stripe values are preserved. Existing order 26-0029 has this issue and needs a manual name fix.
```

Read first for Benny continuation:

```txt
01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md
02 Projects/Benny & Penny's Adventures/[C] Customer Portal v2 and Admin Theme Handoff 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

Important website repo:

```txt
hpintojr/bennyandpennyadventures
```

Branch/environment rule:

```txt
Stay on main branch unless Hamilton explicitly says otherwise.
Production deployment is the controlled test environment.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode until further notice.
LuLu remains sandbox/testing until further notice.
```

Product and fulfillment rules to preserve:

```txt
Do not treat current product catalog images as final.
Current Library UI is a testing/proof UI, not the final customer experience.
Manual admin/media linkage was only a support reference concept, not the final customer delivery flow.
Automated digital delivery through R2 is working in testing.
Current R2 folder standard is ebooks/, audio/, and print/.
BPG gift codes should connect to cart/coupon tracking and consume from the shared readable slot pool.
One paid readable license grants 3 total readable slots across PDF downloads, EPUB downloads, and BPG gifts.
Gifted access grants one download/device allowance.
Terms must be updated to match gifted vs full-license access.
Use Google Places API (New) for admin/customer address entry inside the system; guest Stripe checkout can keep Stripe's own address capture for now.
Do not restore Geoapify unless Hamilton explicitly reverses the Google Places decision.
Before LuLu testing, research official LuLu project/template/bleed requirements and whether 9 or 18 projects are needed.
Abandoned cart, tagging, retargeting, and subscriber marketing panel are roadmap items, but back burner.
```

Website build/codebase guardrails (Portal v2 — do not regress):

```txt
tsconfig target is es5: never for-of/spread a Map/Set/iterator — wrap in Array.from().
next build errors on raw apostrophes in JSX text: use &apos; (attribute strings are fine).
Portal pages must NOT import SiteShell or PortalSessionBar; the portal layout (app/(frontend)/portal/layout.tsx) provides the shell. New portal pages = PortalPageHeader + a client component.
Login and any post-auth redirect into the portal must full-reload (window.location), not router.push, or the shell loops on a stale session.
The business address (231 E Alessandro Blvd, Ste A-208, Riverside, CA 92508) belongs ONLY on the printable invoice for now.
Admin palette = teal/mint. Do NOT reintroduce cream. app/(payload)/admin-portal-theme.scss is sidebar STRUCTURE only.
Gifting = redemption-code model (free digital access). Do NOT route $0 gifts through Stripe checkout. Stripe discount coupons would be a separate future feature.
Gifts deliver via a downloads record (no order); the Library must surface books from download records, not just order-items — do not regress this.
Gift redeem must honor the logged-in session (claim to current account) and must NEVER reset an existing member's password (password is only for creating a new account).
Gift download allowance is currently 1 (gift.downloadsGranted); raising it is an open decision.
Reusable portal data logic lives in lib/portalData.ts.
Google Places is client-side: use NEXT_PUBLIC_GOOGLE_PLACES_API_KEY and test in browser. No Network request usually means the env var was missing at build time; 403 usually means referrer/API restriction.
Stripe Checkout name guard is non-destructive. Never overwrite original Stripe values without preserving them; flag suspect names with review notes.
Always run npm run build locally before deploy when touching routes/types.
```

Next Benny focus (Portal v2 UX, account setup, Help, Orders, Addresses, Library, Gifting flow, and admin sidebar are DONE):

```txt
0. Confirm Google Places autocomplete works live in portal and admin after Vercel/Google Cloud configuration + redeploy.
0b. Manually fix order 26-0029 (address typed into name field); then decide whether to prefill Stripe Checkout name/address for logged-in customers.
1. Email deliverability: set SPF/DKIM/DMARC DNS for bennyandpennyadventures.com (Sequenzy) so gift/order emails reach the inbox instead of junk.
2. Decide whether to raise the gift download allowance above 1 (re-download on device).
3. Replace placeholder product assets (covers, page previews, cart thumbnails).
4. Replace dummy R2 files with real PDF/EPUB/audio files as Books 1-4 are finalized.
5. Deepen BPG gift-code -> cart/coupon tracking (owned-copy gifting via redemption codes already works end-to-end).
6. Update Terms for full readable license vs gifted access.
7. Later address workflow polish: account setup address confirmation, logged-in checkout prefill, and optional dashboard "complete your profile for faster checkout" nudge.
8. Research official LuLu setup/template requirements before resuming print testing.
```

Reference-only admin mobile files for debugging regressions:

```txt
01 Daily Logs/[C] 2026-06-16.md
01 Daily Logs/[C] 2026-06-16 Admin Mobile Final Polish Update.md
02 Projects/Benny & Penny's Adventures/[C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Final Polish Status 2026-06-16.md
```

Do not read those by default in a new chat.

---

### XBeton

AAC block-and-panel manufacturing company project.

Read first for XBeton continuation:

```txt
02 Projects/XBeton/XBeton Overview.md
02 Projects/XBeton/[C] Social Media Strategy — Status & Log.md
```

---

## Workspace Commands

```txt
read my workspace = follow README → index → CLAUDE → current active focus files
update my workspace = update active notes, README, and index as needed
good morning = recap recent state and propose next action
where did we leave off = reconstruct latest state from active handoff files
check todos = reorder current project tasks by priority
start [project] = read that project's overview/status and give next actions
end of day / wrap up = update daily log and active handoff
```

---

## Final Rule

Do not slow future chats with stale context. Prefer concise current handoff files. Keep older logs as reference only unless they are needed to solve a specific regression.
