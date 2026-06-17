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
R2 automated digital delivery is confirmed working in testing.
Digital orders auto-create Media/Downloads records.
Portal Library shows separate PDF, EPUB, and Audiobook download buttons.
R2 signed download links work.
Shared readable slot tracking is active.
Product catalog data, book covers, page previews, and cart thumbnails are placeholders.
Active focus is product asset replacement, BPG gifting/license rules, and portal/workflow revamp.
LuLu testing is paused until official project/template requirements are researched.
Geoapify appears in Admin Dashboard System Status Check and Vercel values are configured.
```

Read first for Benny continuation:

```txt
01 Daily Logs/[C] 2026-06-17 End of Day Wrap Up.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
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
Use Geoapify for admin/customer address entry inside the system; guest Stripe checkout can keep Stripe's own address capture for now.
Before LuLu testing, research official LuLu project/template/bleed requirements and whether 9 or 18 projects are needed.
Abandoned cart, tagging, retargeting, and subscriber marketing panel are roadmap items, but back burner.
```

Next Benny focus:

```txt
1. Replace placeholder product assets.
2. Replace dummy R2 files with real files as Books 1-4 are finalized.
3. Build BPG gifting logic against the shared readable slot pool.
4. Update Terms for full readable license vs gifted access.
5. Verify or build the customer account setup page.
6. Redesign portal UX/workflow around confirmed delivery behavior.
7. Add Geoapify fields/autocomplete to customer and admin address entry points.
8. Research official LuLu setup/template requirements.
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
