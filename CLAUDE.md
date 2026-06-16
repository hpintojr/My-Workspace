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
- For Benny & Penny, Hamilton deferred credential cleanup until after the Client Portal is completed. Do not keep pushing that during current build work. Remind him after the Client Portal has been completed.

---

## Folder Structure

```txt
01 Daily Logs/
  Session logs so Gemini, ChatGPT, Claude, or another AI assistant can remember what happened and pick up later.

02 Projects/
  One folder per project. Treat each project like its own small business.

02 Projects/XBeton/
  AAC block and panel manufacturing company project.
  Includes Odoo/CRM/ERP planning, product/content strategy, media prompts, plant assets, and operating notes.

02 Projects/Benny & Penny's Adventures/
  Children's medical book series and digital-product business.
  Includes website, Payload CMS backend, Neon Postgres, Vercel/GitHub deployment, Stripe/R2 future fulfillment, Mailjet, legal notes, member area planning, and product catalog planning.
```

---

## Active Projects

### XBeton

**Goal:** Project-manage and support a new AAC block-and-panel manufacturing company, including website/content work, Odoo CRM/ERP, product media, sales support, and operational planning.

**Why:** Large long-term opportunity connected to funding, salary, equity/stock-option upside, and future valuation growth.

**Key file:**

```txt
02 Projects/XBeton/XBeton Overview.md
```

**Open areas:** Website updates, product content, CRM/ERP build-out, accounting/KPI/reporting structure, VOIP/telephony decisions, social media, plant/field media, AI video/image prompts, and sales-support material.

### Benny & Penny's Adventures

**Goal:** Build a children's medical book publishing business around Michelle's book series, including website, Payload CMS backend, digital ebook/audiobook products, future print-on-demand, email/contact systems, private file delivery, Stripe, and a customer portal.

**Why:** Family project and potential extra-income digital product business.

**Key files:**

```txt
01 Daily Logs/[C] 2026-06-14.md
01 Daily Logs/[C] 2026-06-15.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Website Build Plan & Architecture.md
02 Projects/Benny & Penny's Adventures/[C] Implementation Notes — Contact Forms, Legal Pages, R2 Ebook Delivery.md
02 Projects/Benny & Penny's Adventures/[C] Order and Customer Purchase Data Fix.md
02 Projects/Benny & Penny's Adventures/[C] Client Portal Build Notes.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
02 Projects/Benny & Penny's Adventures/[C] Site Assessment 2026-06-15.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Promotions, Gifting & Access Grants Plan.md
```

**Current status:** Live and tested. Access control is locked down across all Payload collections (customers can no longer reach other users' data via the API; role self-escalation closed; /admin gated to admins). Checkout supports saved-address selection (Stripe Customer prefill) and stamps lastUsedAt. True Address Book management (add/edit/default/archive, frozen order snapshots) is done. Customers can set their own portal password on the thank-you page right after purchase (session-id gated). R2 digital delivery is live: signed-URL downloads with per-item limits, and a license-scaled allowance (downloads = R2_DOWNLOADS_PER_LICENSE x quantity purchased, auto-raised on repeat buys). SEO + AI layer shipped: sitemap, robots (AI crawlers allowed), JSON-LD, llms.txt, OG/favicon assets. Site-wide security headers added; setup/debug routes 404 in production.

**Current active concern:** Build is feature-complete through Promotions, Gifting, Sequenzy email, and a full email-link auth overhaul (register / forgot-password / order-activation via tokenized links; no more on-page password form). Hamilton applied all pending Neon SQL patches (promotions_id, gifts + gifts_id, password_tokens + password_tokens_id). Remaining to go live: redeploy + `npm run build`; set Vercel env for Sequenzy (API key + **verified sender/domain**) and R2 (`R2_*`), decide `R2_AUTO_CREATE_DOWNLOADS`; rotate `PAYLOAD_SETUP_SECRET`; add bot/spam protection to public forms (not started).

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

**Current next actions:** (1) Redeploy with SQL patches (done) + Sequenzy/R2 env vars; run `npm run build`; commit/push. (2) End-to-end test the email-link auth (register → setup link → sign in; forgot-password; new-order activation email; returning-customer thank-you), the gifting email, and R2 license scaling. (3) Bot/spam protection on contact/newsletter/privacy forms. (4) Rotate `PAYLOAD_SETUP_SECRET`. See `[C] Backlog & Launch Checklist.md` for the full prioritized list.

---

## How Gemini, ChatGPT, Claude, or Another AI Assistant Should Use This Workspace

When using Gemini, ChatGPT, Claude, or another AI assistant, ask it to use this repo as the source of truth.

Good starting prompt:

```txt
Use my GitHub repo hpintojr/My-Workspace as context. Read CLAUDE.md first, then read the latest daily log and the project overview for [project name]. Help me pick up where we left off.
```

For Benny & Penny:

```txt
Use hpintojr/My-Workspace. Read CLAUDE.md, the latest daily log, and the Benny & Penny overview/build plan. Tell me the current blocker, the next 3 actions, and what should not be deployed yet.
```

For XBeton:

```txt
Use hpintojr/My-Workspace. Read CLAUDE.md and the XBeton overview. Recap the current open problems and recommend the next best action.
```

Important: The skills and commands below are not magic terminal commands. They are plain-language prompts. Gemini, ChatGPT, Claude, or any other AI assistant can follow them when it has access to the repo, the relevant files, or pasted context.

---

## Skills & Commands

Use these phrases with Gemini, ChatGPT, Claude, or any AI assistant that has this workspace context.

| Say this | What the assistant should do |
|---|---|
| `/setup` | First-time workspace setup or structure review. |
| `new project` | Interview the user about a new project and create a project folder, overview, and first task list. |
| `good morning` | Read recent daily logs, recap what matters, identify blockers, and recommend the best next actions. |
| `end of day` or `wrap up` | Create or update the daily log with what happened, decisions made, open issues, and where to start next. |
| `update workspace` | Update daily logs, project overviews, build plans, and implementation notes with the latest progress. |
| `check todos` | Review project task lists and reorder them by what is actually next. |
| `start [project name]` | Read that project's overview and latest daily logs, then provide the current status and next actions. |
| `where did we leave off?` | Use daily logs and project notes to reconstruct the latest state. |
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
- Any exposed credentials that need later cleanup.
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
