# Workspace Index

**Status:** Current as of 2026-06-16  
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
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Accepted Working Update 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Desktop Toggle Status 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
```

Do not read the older verbose admin-mobile progress logs first unless debugging a regression.

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
│   └── [C] 2026-06-16 Admin Mobile Final Polish Update.md
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

Latest important logs:

```txt
01 Daily Logs/[C] 2026-06-16.md
01 Daily Logs/[C] 2026-06-16 Admin Mobile Final Polish Update.md
01 Daily Logs/[C] 2026-06-16 Admin Desktop Toggle Update.md
```

These are no longer part of the default Benny & Penny read-first path because the accepted-working handoff is faster.

---

### Benny & Penny's Adventures

Project folder:

```txt
02 Projects/Benny & Penny's Adventures/
```

Primary website/business project. Includes public website, Payload CMS admin, customer portal, Stripe, R2/digital delivery, email, legal/compliance, promotions, gifting, and launch cleanup.

Fast read order for Benny & Penny continuation:

```txt
1. 02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Accepted Working Update 2026-06-16.md
2. 02 Projects/Benny & Penny's Adventures/[C] Admin Desktop Toggle Status 2026-06-16.md
3. 02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
4. 02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
5. 02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md only if broader project context is needed
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
Admin dashboard mobile polish is accepted/working on iPhone Chrome.
Admin desktop sidebar toggle polish is accepted/working.
Welcome now renders as: Welcome, Hamilton Pinto!
Future admin changes should be tiny final-layer fixes only. Do not start broad rewrites.
```

Latest accepted Benny & Penny mobile website commit:

```txt
69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

Latest accepted Benny & Penny desktop/admin greeting commits:

```txt
e678610a677948f7046eef8dadc6df1bc5df99ec
Retarget desktop nav toggles outside admin shell

f0de9ab63cbe54407b262ffed100c74b18595447
Add space after welcome comma
```

Current Benny & Penny next focus:

```txt
1. Validate remaining customer portal mobile pages.
2. Confirm Chrome iPhone bottom white gap is acceptable.
3. Confirm Sequenzy footer badge/account settings.
4. Keep Mailjet as fallback transactional provider.
5. Continue final launch cleanup.
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
