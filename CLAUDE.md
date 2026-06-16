# My Workspace — AI Assistant Context File

This file is the persistent workspace instruction file for **Gemini, ChatGPT, Claude, and any AI assistant helping inside this repo**.

It started as a Claude context file, but it should be treated as the main workspace operating guide for Gemini, ChatGPT, Claude, and future AI assistants.

---

## How This Workspace Works

This workspace exists to produce things, not just store things. Everything here is oriented around one loop:

**set a goal → break it into problems → solve those problems → ship the output.**

The assistant's job is to keep Hamilton moving through that loop. If there is no goal yet, help set one. If there is a goal but no clear problems, help break it down. If there are problems, help solve the next one. Always push toward the next concrete thing to make, update, ship, or verify.

---

## Who I Am

**Name:** Hamilton Pinto Jr.  
**Nickname:** Hamster  
**Role:** Consultant, technology advisor, project manager, and builder across multiple active business projects.  
**Main need:** Help staying organized while running several projects end-to-end as if each project were its own business.  
**Help wanted:** Project organization, writing, content creation, technical implementation, research, troubleshooting, documentation, and task prioritization.  
**Preferred vibe:** Professional, polished, direct, concrete, and action-oriented.  
**Timezone:** Pacific Time.

---

## Assistant Rules

These rules apply to Gemini, ChatGPT, Claude, and future AI assistants working from this repo.

- Treat each project folder like its own business with its own context, goals, decisions, blockers, and next actions.
- Read `README.md`, then `00 [C] Workspace Index.md`, then this file before continuing workspace work.
- Use `00 [C] Workspace Index.md` as the clean directory-tree listing and read-order source of truth.
- When Hamilton asks to read the workspace, follow the read order in `00 [C] Workspace Index.md`.
- When Hamilton asks to update the workspace, update the relevant notes and update `00 [C] Workspace Index.md` if any file list, read order, active focus, or project status changed.
- Read the relevant project overview before doing project-specific work.
- Read the latest daily logs when the user asks to continue previous work.
- Keep project notes cleanly separated by project.
- Do not mix XBeton tasks with Benny & Penny tasks unless the user specifically asks for a combined view.
- Be direct and concrete. Do not pad responses.
- Use detailed commit messages when updating this workspace.
- When creating AI-authored files, prefix the filename with `[C]` unless the user asks otherwise.
- Do not edit non-`[C]` user-authored notes without permission.
- It is okay to freely update `[C]` files, daily logs, workspace instructions, and project planning files when the user asks for workspace updates.
- Never commit real credentials, API keys, database URLs, passwords, or private tokens.

---

## Folder Structure

```txt
00 [C] Workspace Index.md
  Clean directory tree, read order, and workspace update rules.

01 Daily Logs/
  Session logs so Gemini, ChatGPT, Claude, or another AI assistant can remember what happened and pick up later.

02 Projects/
  One folder per project. Treat each project like its own small business.

02 Projects/XBeton/
  AAC block and panel manufacturing company project.
  Includes Odoo/CRM/ERP planning, product/content strategy, media prompts, plant assets, and operating notes.

02 Projects/Benny & Penny's Adventures/
  Children's medical book series and digital-product business.
  Includes website, Payload CMS backend, Neon Postgres, Vercel/GitHub deployment, Stripe/R2 future fulfillment, Sequenzy, Mailjet fallback, legal notes, member area planning, and product catalog planning.
```

---

## Active Projects

### XBeton

**Goal:** Project-manage and support a new AAC block-and-panel manufacturing company, including website/content work, Odoo CRM/ERP, product media, sales support, and operational planning.

**Why:** Large long-term opportunity connected to funding, salary, equity/stock-option upside, and future valuation growth.

**Key files:**

```txt
02 Projects/XBeton/XBeton Overview.md
02 Projects/XBeton/[C] Social Media Strategy — Status & Log.md
```

**Open areas:** Website updates, product content, CRM/ERP build-out, accounting/KPI/reporting structure, VOIP/telephony decisions, social media, plant/field media, AI video/image prompts, and sales-support material.

**Current XBeton next focus:** Decide posting tool (Publer or Buffer), connect all 7 social accounts, build audience-segmented Instagram Highlights, optionally write Week 3 Fire & Resilience queue, and continue website/CRM/ERP/VOIP/KPI/training-video work as needed.

### Benny & Penny's Adventures

**Goal:** Build a children's medical book publishing business around Michelle's book series, including website, Payload CMS backend, digital ebook/audiobook products, future print-on-demand, email/contact systems, private file delivery, Stripe, and a customer portal.

**Why:** Family project and potential extra-income digital product business.

**Key files:**

```txt
00 [C] Workspace Index.md
01 Daily Logs/[C] 2026-06-14.md
01 Daily Logs/[C] 2026-06-15.md
01 Daily Logs/[C] 2026-06-16.md
01 Daily Logs/[C] 2026-06-16 Admin Mobile Final Polish Update.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Website Build Plan & Architecture.md
02 Projects/Benny & Penny's Adventures/[C] Implementation Notes — Contact Forms, Legal Pages, R2 Ebook Delivery.md
02 Projects/Benny & Penny's Adventures/[C] Order and Customer Purchase Data Fix.md
02 Projects/Benny & Penny's Adventures/[C] Client Portal Build Notes.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
02 Projects/Benny & Penny's Adventures/[C] Site Assessment 2026-06-15.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Promotions, Gifting & Access Grants Plan.md
02 Projects/Benny & Penny's Adventures/[C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Final Polish Status 2026-06-16.md
```

**Current status:** Admin dashboard mobile polish is working on the user's iPhone Chrome test after the final sidebar heart fix. Dashboard search is below the greeting. Welcome renders as `Welcome,` then `Hamilton Pinto!` with punctuation attached to the name. System Status, Recent Orders, and Community Growth rows use the right side of the cards again. Collapsed mobile nav control shows the branded red circle with a white heart. Open sidebar close control now shows a dark/deep-teal heart instead of the X. Broad heart selectors were removed so Payload filter/search controls are not converted into hearts.

**Latest accepted website commit:**

```txt
69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

**Current active concern:** Admin mobile is close enough that future changes should be tiny final-layer fixes only. Do not start broad rewrites. The remaining active work is final deployment/device confirmation, remaining customer portal mobile validation, Chrome iPhone bottom white-gap review, Sequenzy footer badge/account settings, and keeping Mailjet as fallback for transactional email.

**Current desired admin navigation direction:**

```txt
Dashboard
Adventure Hub
Orders
Customers
Books
Media
Subscribers
Users
System Status Check
Privacy Requests
Log out
```

**Current next actions:** (1) Do one final Vercel deployment confirmation if needed. (2) Validate remaining customer portal mobile pages: Portal Home, Orders, Library, Gifts, and Addresses. (3) Confirm Chrome iPhone bottom white gap is acceptable after safe-area filler removal. (4) Confirm Sequenzy footer badge/account settings. (5) Keep Mailjet as fallback for transactional email. (6) If new files/status changes happen, update `00 [C] Workspace Index.md` before finishing the workspace update.

---

## How Gemini, ChatGPT, Claude, or Another AI Assistant Should Use This Workspace

When using Gemini, ChatGPT, Claude, or another AI assistant, ask it to use this repo as the source of truth.

Good starting prompt:

```txt
Use my GitHub repo hpintojr/My-Workspace as context. Read README.md first, then 00 [C] Workspace Index.md, then CLAUDE.md, then the latest daily log and the project overview for [project name]. Help me pick up where we left off.
```

For Benny & Penny:

```txt
Use hpintojr/My-Workspace. Read README.md, 00 [C] Workspace Index.md, CLAUDE.md, the latest daily log, and the Benny & Penny overview/build plan. Tell me the current blocker, the next 3 actions, and what should not be deployed yet.
```

For XBeton:

```txt
Use hpintojr/My-Workspace. Read README.md, 00 [C] Workspace Index.md, CLAUDE.md, the XBeton overview, and the XBeton social media status log. Recap the current open problems and recommend the next best action.
```

Important: The skills and commands below are not magic terminal commands. They are plain-language prompts. Gemini, ChatGPT, Claude, or any other AI assistant can follow them when it has access to the repo, the relevant files, or pasted context.

---

## Skills & Commands

Use these phrases with Gemini, ChatGPT, Claude, or any AI assistant that has this workspace context.

| Say this | What the assistant should do |
|---|---|
| `/setup` | First-time workspace setup or structure review. Read README, workspace index, CLAUDE, then verify/update folder structure. |
| `new project` | Interview the user about a new project and create a project folder, overview, and first task list. Update the workspace index. |
| `good morning` | Read recent daily logs, recap what matters, identify blockers, and recommend the best next actions. |
| `end of day` or `wrap up` | Create or update the daily log with what happened, decisions made, open issues, and where to start next. Update the workspace index if file/status/read order changed. |
| `update workspace` | Update daily logs, project overviews, build plans, implementation notes, README if active focus changed, CLAUDE if persistent context changed, and `00 [C] Workspace Index.md` if file list/read order/status changed. |
| `check todos` | Review project task lists and reorder them by what is actually next. |
| `start [project name]` | Read the workspace index, that project's overview, and latest daily logs, then provide the current status and next actions. |
| `where did we leave off?` | Use README, the workspace index, daily logs, and project notes to reconstruct the latest state. |
| `help` or `what can you do?` | Show the available workspace workflows and ask which project to focus on. |

---

## Daily Log Standard

Daily logs should capture:

- What was worked on.
- What changed.
- What was decided.
- What broke or remains blocked.
- Current known state.
- Next actions in priority order.
- Items that need later cleanup.
- Links/paths to important files changed.

Daily logs belong in:

```txt
01 Daily Logs/[C] YYYY-MM-DD.md
```

---

## Project Planning Standard

Each active project should have:

- Overview file.
- Current status.
- Completed items.
- Active blocker.
- Current priority order.
- Open business tasks.
- Open technical tasks.
- Future/later ideas.
- Launch blockers if relevant.

For AI-authored planning files, use `[C]` in the filename.

---

## Workspace Index Standard

`00 [C] Workspace Index.md` must stay current.

Update the index whenever:

- A Markdown file is added, renamed, deleted, or superseded.
- A non-Markdown deliverable is added to a project folder and should be discoverable later.
- The active read order changes.
- The current active focus changes.
- The current status of a project changes materially.
- A new project folder is created.

Before ending a workspace update, check:

```txt
[ ] README.md current active focus is accurate.
[ ] 00 [C] Workspace Index.md directory tree is accurate.
[ ] CLAUDE.md persistent instructions are still accurate.
[ ] Latest daily log captures the session state.
[ ] Relevant project files match the current known state.
[ ] No secrets or credentials were committed.
```
