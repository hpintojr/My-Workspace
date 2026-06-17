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
Sequenzy transactional email
Mailjet fallback email
Legal/compliance pages
Promotions/gifting/access grants
```

Current status:

```txt
LuLu POD Phase 1 and Phase 2 are working.
Internal print-jobs queue creates records for physical orders.
Books now have LuLu print setup fields.
Next active build is Phase 3: manual Submit to LuLu action/API, with auto-submit still disabled.
```

Read first for Benny continuation:

```txt
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
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
Do not commit real LuLu keys or secrets.
```

Latest important website commits:

```txt
60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books

a9383a2e68023a42db5dd7520004797147c5fb56
Add print jobs under catalog sidebar

fcd736ce2c21361151a2136a6b51a6d3822bf024
Create dry-run print jobs after checkout
```

Confirmed LuLu/POD working:

```txt
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after Neon lock-table patch.
Shipping copied into the print job.
Status remained Draft until book print-ready fields are completed.
LuLu API was not called.
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
1. Build LuLu API config/auth helper using env vars only.
2. Build manual Submit to LuLu route/action for a single ready print job.
3. Validate status is Ready before submit.
4. Save LuLu response, IDs, and errors to print-jobs.
5. Keep LULU_AUTO_SUBMIT=false.
6. After tracking exists, update customer portal/order experience for physical delivery.
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
