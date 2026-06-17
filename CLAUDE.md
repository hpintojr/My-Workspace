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

Never commit private service values or credentials.

---

## Active Projects

### Benny & Penny's Adventures

Children's medical book and digital/print product business around Michelle's book series.

Current status:

```txt
Product catalog data, book covers, page previews, and cart thumbnails are placeholders right now.
Active focus is correct product assets, R2 automated digital delivery, and customer portal/workflow revamp.
LuLu POD Phase 1 and Phase 2 are working.
LuLu Phase 3 backend foundation and admin submit page/link are deployed.
Further LuLu submit/testing work is paused.
Geoapify appears in Admin Dashboard System Status Check.
Geoapify Vercel values are configured.
```

Read first for Benny continuation:

```txt
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
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
Manual admin/media file linkage was only a support reference concept, not the final customer delivery flow.
Automated digital delivery through R2 is now a priority.
BPG gift codes should connect to cart/coupon tracking and grant one digital download/device allowance.
Full paid digital licenses may allow three downloads/devices.
Terms must be updated to match gifted vs full-license access.
Use Geoapify for admin/customer address entry inside the system; guest Stripe checkout can keep Stripe's own address capture for now.
Before LuLu testing, research official LuLu project/template/bleed requirements and whether 9 or 18 projects are needed.
Abandoned cart, tagging, retargeting, and subscriber marketing panel are roadmap items, but back burner.
```

Repo review corrections to preserve:

```txt
Cart already has basic thumbnails, plus/minus quantity controls, remove item, and saved-address selectors.
Checkout already has partial saved-address prefill for signed-in customers.
Portal routes and portal APIs exist, but the portal needs an IA/visual/workflow revamp.
Geoapify autocomplete is not built into Portal > Addresses yet.
Customer address records need Geoapify metadata fields.
Support collections exist, but customer Helpdesk route/API and affected-item workflow are not built.
LuLu file URL handling must be confirmed before any real print submission testing.
```

Next Benny focus:

```txt
1. Organize correct product images and placeholder replacement strategy.
2. Upload temporary digital product files to R2.
3. Automate download-record creation after paid checkout.
4. Verify or build the customer account setup page.
5. Redesign portal UX/workflow around automated delivery.
6. Add Geoapify fields/autocomplete to customer and admin address entry points.
7. Simplify BPG gifting and connect it to cart/coupon tracking.
8. Research official LuLu setup/template requirements.
9. Keep abandoned cart and subscriber marketing panel planning on the roadmap but back burner.
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
