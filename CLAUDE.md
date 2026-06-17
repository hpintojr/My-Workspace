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
Customer experience / portal revamp
```

Current status:

```txt
LuLu POD Phase 1 and Phase 2 are working.
LuLu Phase 3 backend foundation and admin submit page/link are deployed.
Further LuLu submit/testing work is paused.
Geoapify appears in Admin Dashboard System Status Check.
Geoapify Vercel values are configured.
Active build focus is now customer experience / portal revamp using the updated architectural blueprint.
```

Read first for Benny continuation:

```txt
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
Production deployment is being used as the controlled test environment.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode until further notice.
LuLu remains sandbox/testing until further notice.
Do not commit real LuLu or Geoapify keys or secrets.
```

Latest important website commits:

```txt
9268413354faac6f3a76b1aa44960a6711614fa7
Add Lulu submit link to admin sidebar

3d3d43ddbaab2d4cf0c791432784bc7d9fe9b554
Allow admin session for Lulu submit route

166768e5007ac21e29bd08b58423a73d81ecd1c7
Add manual Lulu submit route

bacd0891ac3ece58e5ce6eafc5f06ffdf5c4312a
Add Lulu API submit helper

c073738d8a74bd419ae265e12c161334740daa07
Add Geoapify to admin system status
```

LuLu status:

```txt
Print-job queue works.
Book print setup fields exist.
Submit backend and admin page exist.
Auto-submit remains disabled.
Further submit/testing is paused until the customer portal/customer experience priorities are aligned.
```

Geoapify status:

```txt
Admin dashboard row is deployed.
Vercel values are configured.
Portal/account setup autocomplete is queued as part of the customer experience revamp.
```

Next Benny focus:

```txt
1. Audit current portal routes and components.
2. Redesign portal information architecture.
3. Add Geoapify autocomplete to Portal > Addresses.
4. Add address confirmation to account setup.
5. Plan logged-in checkout address prefill.
6. Redesign cart UX for mobile-first checkout clarity.
7. Add customer support/helpdesk workflow tied to orders/items.
8. Resume LuLu sandbox testing later.
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
