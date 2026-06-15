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
- Never commit real secrets, API keys, database URLs, passwords, setup secrets, or credentials.
- If a secret was pasted in chat or visible in a screenshot, treat it as exposed and recommend rotation unless the user explicitly defers it.
- For Benny & Penny, Hamilton explicitly deferred rotating `PAYLOAD_SETUP_SECRET` until after the Client Portal is completed. Do not keep pushing this during current build work. Remind him after the Client Portal has been completed.

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
```

**Current status:** Payload Admin is functional and Stripe sandbox checkout is working. Fresh checkout confirmed the thank-you page shows the real order number. Billing and shipping are saving correctly. The Client Portal foundation is now built and visible at `/portal`. Customer login works through Payload auth after a password is manually set. `/portal/orders` displays the signed-in customer's order history. `/portal/addresses` displays billing and shipping addresses. `/portal/library` displays purchased books grouped by book and format, with access/status buttons for PDF/EPUB, audiobook, paperback, and hardcover.

**Current active concern:** The portal is usable as an account shell and ownership view, but digital delivery is not fully wired yet. PDF/EPUB and audiobook access buttons currently show access/status placeholders. The protected `/api/portal/downloads` endpoint exists and is designed to validate customer ownership without exposing raw R2 keys, but signed R2 links/private delivery still need to be connected after files are uploaded. Mailjet is still under review, so password reset/account activation and customer email flows remain pending. `PAYLOAD_SETUP_SECRET` rotation remains intentionally deferred until after the Client Portal is completed.

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

**Current next actions:** Verify the latest portal deploy, test `/portal/orders`, `/portal/addresses`, and `/portal/library` after customer login, upload/prepare book files for PDF/EPUB/audiobook delivery, wire signed private file delivery, add customer-facing support workflow, then complete remaining launch cleanup. After the Client Portal is completed, remind Hamilton to rotate the exposed `PAYLOAD_SETUP_SECRET`.

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
- Any secrets or credentials that were exposed and need rotation.
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
