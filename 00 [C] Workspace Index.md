# Workspace Index

**Status:** Current as of 2026-06-17  
**Purpose:** Clean directory-tree index, read-order guide, and workspace update rule source for `hpintojr/My-Workspace`.

Future assistants should use this file to quickly understand what exists, what to read first, and what must be updated when the workspace changes.

---

## Start Here — Required Read Order

When Hamilton says **"read my workspace"**, read in this order:

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current active focus files listed in README.md
5. Relevant project overview/status files only as needed
```

For the current Benny & Penny active focus, read these first after README/index/CLAUDE:

```txt
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
```

Do not read older verbose admin-mobile progress logs first unless debugging an admin regression.

---

## Workspace Update Rule

When Hamilton says **"update my workspace"**, update all relevant active files and then update this index if anything changed.

Always check whether these need updates:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
01 Daily Logs/[C] YYYY-MM-DD.md
Relevant project overview/status/planning file
```

Update this index whenever:

- A file is added.
- A file is renamed.
- A file is deleted.
- A project folder is added.
- The active read order changes.
- The current active focus changes.
- A project status file becomes outdated or superseded.

Do not leave this index stale.

---

## Directory Tree

```txt
hpintojr/My-Workspace/
├── 00 [C] Workspace Index.md
├── README.md
├── CLAUDE.md
├── 01 Daily Logs/
│   ├── [C] 2026-06-14.md
│   ├── [C] 2026-06-15.md
│   ├── [C] 2026-06-16.md
│   ├── [C] 2026-06-16 Admin Desktop Toggle Update.md
│   ├── [C] 2026-06-16 Admin Mobile Final Polish Update.md
│   └── [C] 2026-06-17 Lulu POD Phase 1-2 Update.md
└── 02 Projects/
    ├── Benny & Penny's Adventures/
    │   ├── Benny & Penny's Adventures Overview.md
    │   ├── [C] Admin Mobile Accepted Working Update 2026-06-16.md
    │   ├── [C] Admin Mobile Final Polish Status 2026-06-16.md
    │   ├── [C] Admin Desktop Toggle Status 2026-06-16.md
    │   ├── [C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md
    │   ├── [C] Backlog & Launch Checklist.md
    │   ├── [C] Client Portal Build Notes.md
    │   ├── [C] Implementation Notes — Contact Forms, Legal Pages, R2 Ebook Delivery.md
    │   ├── [C] Lulu Print on Demand Plan.md
    │   ├── [C] Order and Customer Purchase Data Fix.md
    │   ├── [C] Portal and Digital Delivery Implementation Notes.md
    │   ├── [C] Promotions, Gifting & Access Grants Plan.md
    │   ├── [C] Site Assessment 2026-06-15.md
    │   └── [C] Website Build Plan & Architecture.md
    └── XBeton/
        ├── XBeton Overview.md
        └── [C] Social Media Strategy — Status & Log.md
```

---

## Known Non-Markdown Deliverables Referenced in Workspace

These files are referenced by the XBeton social media status log as living in the project folder. If they are moved, renamed, or deleted, update this section.

```txt
02 Projects/XBeton/XBeton_Social_Media_Playbook.docx
02 Projects/XBeton/XBeton_Social_Calendar_AllPlatforms.xlsx
02 Projects/XBeton/XBeton_90Day_Growth_Roadmap.docx
02 Projects/XBeton/XBeton_90Day_Planning_Calendar.xlsx
```

---

## File Purpose Guide

### Root files

```txt
README.md
```

Fast current-state handoff. This should always show the current active focus and most important files to read next.

```txt
00 [C] Workspace Index.md
```

Directory tree, read order, and workspace-update rules. Keep this current whenever the workspace changes.

```txt
CLAUDE.md
```

Main persistent assistant operating guide. Applies to ChatGPT, Claude, Gemini, and any future AI assistant.

---

### Daily logs

```txt
01 Daily Logs/
```

Session-level records. Use these only when a deeper reconstruction is needed.

Latest important log:

```txt
01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
```

Older admin logs are reference/debug-only unless an admin regression returns.

---

### Benny & Penny's Adventures

Project folder:

```txt
02 Projects/Benny & Penny's Adventures/
```

Primary website/business project. Includes public website, Payload CMS admin, customer portal, Stripe, R2/digital delivery, email, legal/compliance, promotions, gifting, LuLu print-on-demand, physical delivery tracking, and launch cleanup.

Fast read order for Benny & Penny continuation:

```txt
1. 02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
2. 01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
3. 02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
4. 02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
5. 02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
```

Reference/archive files for debugging only:

```txt
01 Daily Logs/[C] 2026-06-16.md
01 Daily Logs/[C] 2026-06-16 Admin Mobile Final Polish Update.md
01 Daily Logs/[C] 2026-06-16 Admin Desktop Toggle Update.md
02 Projects/Benny & Penny's Adventures/[C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Final Polish Status 2026-06-16.md
```

Current active status:

```txt
LuLu POD Phase 1 is complete and confirmed working.
LuLu POD Phase 2 is implemented and Neon patched.
Print Jobs appears under Catalog below Media.
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after Neon lock-table patch.
Books now have LuLu print setup fields.
Next active build is Phase 3: manual Submit to LuLu action/API.
Auto-submit remains disabled.
```

Important Benny & Penny website commits:

```txt
60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books

a9383a2e68023a42db5dd7520004797147c5fb56
Add print jobs under catalog sidebar

fcd736ce2c21361151a2136a6b51a6d3822bf024
Create dry-run print jobs after checkout

69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

Current Benny & Penny next focus:

```txt
1. Fill Book 1 LuLu print setup fields in Payload Admin.
2. Build LuLu API config/auth helper using env vars only.
3. Build manual Submit to LuLu route/action for a single ready print job.
4. Validate that a print job must be ready before submit.
5. Save LuLu request/response, IDs, and errors to print-jobs.
6. Keep LULU_AUTO_SUBMIT=false.
7. After LuLu tracking exists, update customer portal physical delivery status.
```

---

### XBeton

Project folder:

```txt
02 Projects/XBeton/
```

AAC block-and-panel manufacturing company project. Includes Odoo CRM/ERP, website/content work, sales operations, VOIP, training, product/content strategy, and social media.

Read order for XBeton continuation:

```txt
1. 02 Projects/XBeton/XBeton Overview.md
2. 02 Projects/XBeton/[C] Social Media Strategy — Status & Log.md
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

## Workspace Maintenance Checklist

When updating this workspace, use this checklist before committing:

```txt
[ ] Did I update the latest daily log or active handoff file?
[ ] Did I update the relevant project status/planning file?
[ ] Did I update README.md if the active focus changed?
[ ] Did I update CLAUDE.md if the persistent operating context changed?
[ ] Did I update 00 [C] Workspace Index.md if files/read order/status changed?
[ ] Did I avoid committing secrets, tokens, credentials, API keys, passwords, database URLs, or private setup values?
```

---

## Important Rule

This workspace is meant to help Hamilton keep moving. Do not only archive context. Use the context to identify the next concrete action, solve the next blocker, and ship the next useful output.
