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

When Hamilton says **update my workspace**:

```txt
1. Update the relevant active project handoff/status file.
2. Update README.md if the active focus or next actions changed.
3. Update 00 [C] Workspace Index.md if files, read order, or project status changed.
4. Update CLAUDE.md only if persistent instructions or project handoff rules changed.
```

Use `[C]` in filenames for AI-authored files unless Hamilton asks otherwise.

Never commit secrets, API keys, database URLs, tokens, passwords, private env values, or credentials.

---

## Active Projects

### Benny & Penny's Adventures

Children's medical book and digital/print product business around Michelle's book series.

Includes:

```txt
Website
Payload CMS admin
Customer portal
Stripe sandbox orders
R2/private file delivery
Digital ebook/audiobook products
LuLu print-on-demand workflow
Geoapify address autocomplete planning
Sequenzy transactional email
Mailjet fallback email
Legal/compliance pages
Promotions/gifting/access grants
```

Current status:

```txt
LuLu POD Phase 1 and Phase 2 are working.
Geoapify appears in Admin Dashboard System Status Check.
Geoapify Vercel environment values are configured for browser autocomplete, server checks, and the autocomplete endpoint.
LuLu POD Phase 3 backend foundation is deployed: submit helper plus protected manual-submit route.
Next active build is the admin-facing Submit to LuLu button/tool page.
Auto-submit remains disabled.
```

Read first for Benny continuation:

```txt
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
01 Daily Logs/[C] 2026-06-17 Geoapify and Lulu Phase 3 Update.md
01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
```

Important website repo:

```txt
hpintojr/bennyandpennyadventures
```

Branch/environment rule:

```txt
Stay on main branch unless Hamilton explicitly says otherwise.
Production deployment is being used as the controlled test environment.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode until further notice.
LuLu remains sandbox/testing until further notice.
Do not commit real LuLu or Geoapify keys or secrets.
```

Latest important website commits:

```txt
166768e5007ac21e29bd08b58423a73d81ecd1c7
Add manual Lulu submit route

bacd0891ac3ece58e5ce6eafc5f06ffdf5c4312a
Add Lulu API submit helper

c073738d8a74bd419ae265e12c161334740daa07
Add Geoapify to admin system status

60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books
```

Confirmed LuLu/POD working:

```txt
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after Neon lock-table patch.
Shipping copied into the print job.
LuLu API was not called during Phase 1/2.
Phase 3 route will submit only when a print job is ready and setup is complete.
```

LuLu Phase 3 backend foundation:

```txt
lib/luluApi.ts
POST /api/admin/print-jobs/[id]/submit-lulu
```

Current route behavior:

```txt
Protected backend route.
Requires a ready print job.
Validates shipping and linked book print setup.
Builds LuLu request from frozen print-job data.
Stores raw request/response, IDs, status, and errors back to print-jobs.
```

Geoapify status:

```txt
Admin dashboard row is deployed.
Vercel values are configured.
Real API ping can be added later using the configured autocomplete endpoint.
Portal/account setup autocomplete is queued after the LuLu submit UI.
```

Neon schema notes:

```txt
Neon project: Benny & Penny's Adventures
Database: neondb

Patches applied:
- Created print_jobs table.
- Added payload_locked_documents_rels.print_jobs_id.
- Added book print setup columns.

Do not assume Payload auto-push creates every schema object. Verify Neon after adding new collections/fields.
```

Admin caution:

```txt
Do not reintroduce broad Payload admin selectors like button[class*='toggle'], button[class*='menu'], or button[class*='close'].
Those caused filter/search controls to become hearts.
Future admin mobile changes should be tiny final-layer fixes only, preferably in:
app/(payload)/admin-dashboard-final-polish.scss
```

Next Benny focus:

```txt
1. Build admin-facing Submit to LuLu button/tool page for ready print jobs.
2. Fill Book 1 print setup fields before sandbox submission testing.
3. Test that non-ready jobs are blocked safely.
4. Test sandbox submission only; do not enable auto-submit.
5. Optionally upgrade Geoapify dashboard row from config check to real API ping.
6. After tracking/status exists, update customer portal/order experience for physical delivery.
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

Includes:

```txt
Website/content
Odoo CRM/ERP planning
Sales operations
VOIP/telephony
Training videos
Product content
Social media strategy
Plant/field media
AI image/video prompts
KPI/reporting structure
```

Read first for XBeton continuation:

```txt
02 Projects/XBeton/XBeton Overview.md
02 Projects/XBeton/[C] Social Media Strategy — Status & Log.md
```

Current XBeton next focus:

```txt
1. Decide posting tool: Publer or Buffer.
2. Connect all 7 social accounts.
3. Build audience-segmented Instagram Highlights.
4. Optionally write Week 3 queue: Fire & Resilience.
5. Continue website, CRM/ERP, VOIP, KPI/reporting, and training-video work as needed.
```

---

## Workspace Commands

These are plain-language prompts Hamilton may use:

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
