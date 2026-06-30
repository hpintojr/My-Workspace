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

### Benny & Penny's Adventures Book Series

Full print + digital + audio + multilingual production of Michelle's 10-book children's medical series "Benny & Penny's Adventures" ("Medical Books for Brave Little Hearts"). Separate from the "Benny & Penny's Adventures" website project — this one produces the books; the website project sells/delivers them. Uses Claude, ChatGPT, Gemini, and Canva, coordinated through a shared MD index so all AIs follow the same files and commands.

Mission: help Michelle (the author, Hamilton's wife) finish and publish her FIRST book series. Hamilton coordinates — completing manuscripts from drafts/fragments, laying out the books, and making the publishing process make sense. The website is updated later as key phases finish.

Real status: the series is in CONCEPTION / DRAFTING. Books 1–4 are started; books 5–10 are not started. Nothing is print/digital/audio-final. The kit's "cover-ready / coming-soon" labels are directional notes from the website, NOT finished-product status — do not treat them as done. Real per-stage progress is tracked only in the master dashboard, which is intentionally unseeded until each stage is verified.

On 2026-06-18 Hamilton's complete production kit (zip) was migrated in as the canonical structure. The numbered kit folders (`00-series-control` … `99-inbox`) are the source of truth; `[C] AI Index & Commands.md` is the cross-AI control layer that maps shared commands onto the kit. The master dashboard is the tracker. My earlier `[C] Series Style Guide.md` and `[C] Book Production Tracker.md` are now redirect stubs pointing to kit files — do not maintain status in them.

**Goal:** Produce 10 books across paperback, hardcover, PDF, EPUB, audiobook, and 8 locales, with a cross-AI indexing system so every tool works from the same source of truth.
**Key file:** `[C] AI Index & Commands.md` (read it first).

Locked series facts:

```txt
Series:  Benny & Penny's Adventures — "Medical Books for Brave Little Hearts"
Trim:    8.5 × 8.5 in · 32 pages · ages 3–8 · English source
Locales: de, es, fr, it, ja, ru, zh-Hans, zh-Hant (8)
Books:   01 home-infusion-day, 02 port-access-adventure, 03 picc-line-adventure,
         04 subcutaneous-infusion-adventure (01–04 cover-ready),
         05 special-line-adventure, 06 lab-draw-adventure, 07 mri-adventure,
         08 hospital-sleepover, 09 ambulance-adventure, 10 surgery-day (05–10 coming-soon)
```

Read first for Book Series continuation:

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/01-characters/[C] CHARACTER-BIBLE-MASTER.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
02 Projects/Benny & Penny's Adventures Book Series/Benny & Penny's Adventures Book Series Overview.md
01 Daily Logs/[C] 2026-06-25 Book Series Character Locks.md
01 Daily Logs/[C] 2026-06-18 Book Series Production Kit Migration.md
```

Rules to preserve:

```txt
Any AI (Claude/ChatGPT/Gemini/Canva) reads [C] AI Index & Commands.md FIRST, then the kit's own files.
The numbered kit folders are the source of truth; the AI Index maps shared commands onto them.
Pipeline: English text → locks → page briefs → Canva → PDF/EPUB → audio → locales → Lulu PB/HC → QA → release → website upload.
Track status only in 00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md.
Before any final print cover/interior, capture the live Lulu spec in 06-print/LULU/01-LULU-LIVE-SPEC-CAPTURE.md.
Defer to character/environment/prop LOCK files + TYPOGRAPHY-AND-TEXT-STANDARDS.md on visual/text conflicts.
Medical accuracy required (children's medical series); Gemini leads accuracy review, human signs off.
Security: commit only Markdown/manifests/approved text/low-res review art. Keep master art, family photos, paid files, printer PDFs, and master audio in PRIVATE storage — not the repo.
Final assets hand off to the website project (pdf_path/epub_path/audio_path); do NOT edit website/portal code from this project.
AI-authored workspace files use the [C] prefix; never overwrite an approved asset version (increment the version).
```

---

### bennyandpenny.com — Portfolio

Hamilton's personal / tech portfolio under the "Benny & Penny's — A Tech Company" banner. Public brand site at bennyandpenny.com. Separate from the store and the book-production projects. Read `[C] PROJECT TRUTH — Read First.md` first.

```txt
Role:   Hamilton Pinto Jr.'s portfolio + tech-company brand site (NOT a store, NOT book production).
Domain: bennyandpenny.com
Repo:   hpintojr/bennyandpenny  → Vercel (bennyandpenny.vercel.app)
```

Decided direction (2026-06-19): keep the deployed Next.js 15 / TypeScript codebase and reposition it to the portfolio concept (done). The earlier single-page editorial JS version and ChatGPT's "family-built creative brand" framing are both retired.

```txt
- Concept: Hamilton's personal/tech portfolio under the B&P tech-company banner.
- Ventures as work tiles: XBeton, Advantage First Financial, Benny & Penny's Adventures,
  Mercury Call Desk, 60+ Establishments.
- Backlinks (dofollow, footer + Person JSON-LD sameAs):
  ACC acc.capital · AFF advantagefirst.com · BAPA bennyandpennyadventures.com ·
  XBeton xbeton.com · Mercury mercurycalldesk.com
- Visual system: kept the deployed teal/mint design this round.
```

Source of truth + deploy:

```txt
Working copy: 02 Projects/bennyandpenny.com — Portfolio/_github-version (ChatGPT)/  (mirrors the repo, holds repositioned code)
Deploy: copy that folder's contents over a local clone of hpintojr/bennyandpenny, commit, push main → Vercel.
Claude cannot push here (no GitHub connector; sandbox network blocked).
The old app/ at the portfolio project root (Next 14 JS) is the RETIRED single-page version — reference only.
```

Built so far (live code in the repo; commit/push main to deploy):

```txt
- Header uses the real horizontal logo; transparent favicon set (app/icon.png, favicon.ico, apple-icon.png).
- Adventures page (/families) = full ten-part series showcase with all 10 official titles (no status labels).
- Contact form (/work-with-us): components/ContactForm.tsx + app/api/contact/route.ts → Neon insert + Mailjet
  email to hello@bennyandpenny.com. Env-driven; ChatGPT wires creds (docs/CONTACT-FORM-SETUP.md, db/contact_submissions.sql, .env.example).
- Footer facelift: ventures alphabetized with full names (incl. American Colonial Capital), hover underline-wipe, Privacy/Terms links.
- Mobile nav (SiteHeader = client component): animated icon (Oreo → hot-dog hover → cascade into X) and auto-closes on link select (the old <details> never closed).
- Contact form honeypot hardened: two hidden traps (company_url, nickname) + sub-2s time check (route silently drops bots).
- Privacy (/privacy) + Terms (/terms) expanded beyond templates. Terms keeps the 3 core sections (Contract Execution, Payment, Arbitration) and adds Acceptance/IP/Acceptable Use/Confidentiality/Warranties/Liability/Indemnification/Governing Law (CA)/Changes/Miscellaneous. Privacy adds cookies, legal bases, intl transfers, CCPA. Still need attorney review.
- Known issue: local repo git index corrupts on background-sync overlap; fix = rm .git/index .git/index.lock && git read-tree HEAD && git reset --mixed (non-destructive).
```

Read first for portfolio continuation:

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
02 Projects/bennyandpenny.com — Portfolio/[C] Version Comparison — Workspace vs GitHub.md
02 Projects/bennyandpenny.com — Portfolio/_github-version (ChatGPT)/docs/[C] Portfolio Project Index & Commands.md
01 Daily Logs/[C] 2026-06-19 Portfolio Contact Form Footer and Legal Pages.md
01 Daily Logs/[C] 2026-06-19 Portfolio Mixup Recovery and Reposition.md
```

Guardrails:

```txt
Keep store, book-production, and portfolio projects separate; never merge codebases.
Never treat hpintojr/bennyandpenny as blank because it is a new repo.
Don't change concept/audience/nav/branding without quoting PROJECT TRUTH and getting approval.
Don't create duplicate portfolio folders/repos. Deploy only by pushing main, with Hamilton's confirmation.
```

---

### MCD - Mercury Call Desk

AI receptionist / call-desk platform (built on a third-party platform base — vendor name CONFIDENTIAL, do not disclose) sold by commission-only 1099 sales partners, managed in GoHighLevel, with a reseller-partner pathway. Separate project from the portfolio, store, and book work. Read `[C] AI Index & Commands.md` first.

```txt
Phases (in order): 1) Agent onboarding (NOW) · 2) GoHighLevel CRM (NEXT, incl. planned GHL MCP) · 3) Reseller channel (LATER).
Divisions/commission on GROSS PROFIT: Small 40% ($350–$1,000/mo) · Medium/Call Desk 35% ($999–$1,995/mo) · Enterprise 30% ($5,000–$10,000/mo). Annual ≈ 25% off, paid upfront.
Model: "no-cost demo" outbound; leads are company records worked only in the CRM.
Confidential: pricing, commission math, scripts, ICP. The signed Sales Partner Agreement controls (kit is ops guidance, not a contract).
```

On 2026-06-24 Hamilton's Sales Partner Launch Kit (14 files) was migrated in as the canonical onboarding under `01-agent-onboarding/`; the Gemini master ops manual + conversation record are in `99-reference/`.

Read first for MCD continuation:

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/MCD - Mercury Call Desk Overview.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
01 Daily Logs/[C] 2026-06-24 MCD Project Setup.md
```

Guardrails:

```txt
Keep MCD separate from the other projects. Don't publish confidential pricing/commission/scripts.
Use approved claims language only (no guarantees like "never miss a lead"/"fully compliant"/"replaces staff").
Finalize Owner Setup + signed Sales Partner Agreement + NDA before any agent sells live (attorney review recommended).
Outbound calling is subject to TCPA/related rules; confirm before scaling. AI-authored files use the [C] prefix.
```

---

### MCD CRM - Agent and Admin Portals

Build project for the Mercury Call Desk Mini CRM — an Agent portal and an Admin portal — with GoHighLevel wired in as a one-way backend. This is the software build; the parent **MCD - Mercury Call Desk** project (above) covers the sales-partner program/onboarding. Keep them separate; never expose confidential pricing/commission math/scripts to agents.

**Goal:** Secure Mini CRM (Agent + Admin portals) for prospecting, agent workflow, compliance, client servicing, and commission accounting, with GHL feeding booking/payment/servicing data in without exposing GHL to agents.
**Why:** If agents had GHL access they would see Hamilton's other clients, his true (wholesale) pricing instead of the set partner pricing, and the full pipeline. The Mini CRM is the access-control + compliance layer and the system of record for source/ownership/commission lineage.

Confirmed environment:

```txt
GHL plan: Agency (Unlimited/Pro) — API v2 + Private Integration Tokens
Structure: one GHL sub-account (location) per client
Stripe: already connected inside GHL (native)
Agents: NO GHL logins — Mini CRM only
Funding: Stripe -> GHL -> Mini CRM relay (no direct Stripe integration in v1)
```

Decided design (scope v1.1, 2026-06-29):

```txt
GHL is a one-way backend: data flows GHL -> Mini CRM by default; agents never touch GHL.
Connection: Private Integration Token (Mini CRM -> GHL writes at demo handoff) + workflow Custom Webhooks (GHL -> Mini CRM events).
Funding relay: GHL fires FUNDED/FAILED/REFUND/DISPUTE webhooks (sourced from Stripe-in-GHL); Mini CRM commission engine fires on ACTUAL collected payments; every recurring charge fires its own event; idempotent; Finance approves payout.
Agent attribution WITHOUT GHL logins: stamp GHL contact/opportunity custom fields (mini_crm_agent_id, originating_agent_id, etc.); do NOT create per-agent GHL staff users. If GHL needs an assigned user (round-robin calendars), use a small pool of service users.
Calendar/Meet host: a FREE Gmail (mcd@gmail.com) is sufficient for GHL Google Calendar + Google Meet — Google Workspace is NOT required to book demos (confirmed 2026-06-30). Connect mcd@gmail to GHL, set meeting location = Google Meet, assigned user = you or a small 'MCD Booking' service user, enable Add Guests. Agents book through the Mini CRM (app holds the GHL token server-side) and are added as guests; NEVER share the mcd@gmail password with agents. Workspace stays optional later for company email deliverability only, not a launch blocker.
```

**Key files:**

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Master Product Scope v1.1.md  (Part B = GHL backend, sections 31-37)
02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Backend Integration Spec.md  (webhook payloads, field maps, booking/calendar mechanics sec 9)
02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Mini-CRM Data Flow.svg
02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Booking Sequence.svg
02 Projects/MCD CRM - Agent and Admin Portals/[C] Master Product Scope v1.1.docx
02 Projects/MCD CRM - Agent and Admin Portals/[C] Agent Registration, Knowledge Base & Training Integration.md  (maps the MCD onboarding library to CRM gates + KB/training)
```

**Open problems:** confirm/generate a scoped Private Integration Token; finalize the funding-webhook contract + idempotency; lock the GHL custom-field attribution model; stand up mercurycalldesk@ Workspace + re-point the GHL calendar; define inbound webhook endpoints + signature verification; sequence GHL work into scope Phase 1 (booking handoff) and Phase 2 (funding/servicing relay). Onboarding/training: the CRM consumes the existing agent-onboarding library in 02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/ as the single source of truth — Sales Partner Agreement/NDA-IP/W-9/Acknowledgment are registration gates (R2 e-sign; store W-9 completion state only), the Certification Scorecard flips a can_claim_leads flag (ACTIVE != allowed to claim), the Manager New Hire Checklist becomes the admin activation screen, and Welcome/Product/ICP/Scripts/CRM SOP/Compliance/Demo + collateral become the NDA-gated knowledge base + training modules. Do NOT fork those files; CRM ingests/publishes versions. Map lives in [C] Agent Registration, Knowledge Base & Training Integration.md.

Guardrails:

```txt
Stack (decided in scope): Next.js + TypeScript on Vercel, PostgreSQL system of record, Cloudflare R2 for sensitive docs, Python workers, Mailjet/Sequenzy provider abstraction.
GHL is backend-only and one-direction by default; never render GHL links/pricing/other-client data to agents.
No per-agent GHL logins. Stripe stays untouched in v1 (relayed through GHL); optional read-only Stripe reconciliation later.
Commissions: calculate automatically, but never auto-pay without Finance approval (scope section 17.9). Refund/dispute = ON_HOLD, never auto-clawback.
AI-authored files use the [C] prefix.
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
