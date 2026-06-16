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

Children's medical book and digital-product business around Michelle's book series.

Includes:

```txt
Website
Payload CMS admin
Customer portal
Stripe orders
R2/private file delivery
Digital ebook/audiobook products
Future print-on-demand
Sequenzy transactional email
Mailjet fallback email
Legal/compliance pages
Promotions/gifting/access grants
```

Current status:

```txt
Admin dashboard mobile polish is accepted/working on iPhone Chrome after the final sidebar dark-heart close fix.
```

Read first for Benny continuation:

```txt
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Accepted Working Update 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
```

Latest accepted website commit:

```txt
69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

Confirmed working:

```txt
Dashboard search sits below the greeting.
Greeting renders as:
Welcome,
Hamilton Pinto!
System Status, Recent Orders, and Community Growth rows use the right side of cards.
Collapsed mobile nav = red circle with white heart.
Open sidebar close = dark/deep-teal heart, not X.
Filter/search controls remain normal and do not become hearts.
```

Important caution:

```txt
Do not reintroduce broad Payload admin selectors like button[class*='toggle'], button[class*='menu'], or button[class*='close'].
Those caused filter/search controls to become hearts.
Future admin mobile changes should be tiny final-layer fixes only, preferably in:
app/(payload)/admin-dashboard-final-polish.scss
```

Next Benny focus:

```txt
1. Confirm latest Vercel deployment if needed.
2. Validate remaining customer portal mobile pages.
3. Confirm Chrome iPhone bottom white gap is acceptable.
4. Confirm Sequenzy footer badge/account settings.
5. Keep Mailjet as fallback transactional provider.
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
