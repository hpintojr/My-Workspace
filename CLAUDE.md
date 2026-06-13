# My Workspace — Claude Context File

Claude reads this file at the start of every session. It's your persistent memory.

---

## How This Workspace Works

This workspace exists to produce things, not just store things. Everything here is oriented around one loop: **set a goal → break it into problems → solve those problems → ship the output.**

Claude's job is to keep the user moving through that loop. If there's no goal yet, help them set one. If there's a goal but no clear problems, help them break it down. If there are problems, help them solve the next one. Always push toward the next concrete thing to make or do.

---

## Who I Am

**Name:** Hamilton Pinto Jr. (nickname: Hamster)
**What I do:** Consultant, technology advisor, and project manager — I run multiple projects at once, each treated like its own small business from start to finish.
**What I want help with:** Organizing my work and projects, writing and creating content, and research and problem-solving. The big one is staying organized while running several projects end-to-end as if each were an individual business.
**Vibe:** Professional and polished.
**Timezone:** Pacific (PT)

---

## Folder Structure

```
01 Daily Logs/        — session logs so Claude remembers what we worked on
02 Projects/          — one folder per project (treat each like its own business)
  └── XBeton/         — AAC block & panel manufacturing company (Odoo CRM/ERP)
        ├── XBeton Overview.md
        ├── [C] Social Media Strategy — Status & Log.md
        ├── Social media deliverables: playbook + 90-day roadmap (.docx), all-platform queue + 13-week calendar (.xlsx)
        ├── [C] Product Visual Reference & AI Prompt Kit.md
        ├── [C] Gemini Video Consistency Playbook.md
        ├── [C] Plant Photo & Video Shot List.md  (+ XBeton_Plant_Shot_List.pdf)
        └── Reference Assets/  — brochures (Portfolio Rev3, Technical) + scale references (panel, full blocks+panels)
  └── Benny & Penny's Adventures/  — children's book series → website + digital-product business
        ├── Benny & Penny's Adventures Overview.md
        ├── [C] Website Build Plan & Architecture.md  (Next.js + Payload + R2 + Stripe; POD later)
        └── site/  — Next.js homepage code (app/page.tsx, app/components/Header.tsx) + HTML wireframes
              (Homepage, Books, Product, Cart, Shop, Thank You, Contact, For Parents);
              working localStorage cart prototype; [C] Image Asset List.md; [C] Font Explorer.html
```

---

## Active Projects

### XBeton
**Goal:** Project-manage a new AAC block-and-panel manufacturing company — Odoo CRM/ERP set up, plant being built — and organize all to-dos to run it end-to-end.
**Why:** Big contract paying out via future salary plus stock options; currently in funding stages (much of it free work for now). Long-term aim: grow valuation to sell/borrow against shares, cover expenses, and save for retirement.
**Key file:** `02 Projects/XBeton/XBeton Overview.md`
**Open problems:** Website update, CRM/ERP build-out (accounting + KPIs/reporting), VOIP decision (RingCentral vs Grasshopper), login/lead/soft-quote walkthrough video, social media content.

### Benny & Penny's Adventures
**Goal:** Copyright, publish, and build the website for my wife's children's book series, and stand up the business around it (DBA, bank, Stripe, social, marketing) — foundation first: Cloudflare, domain, website, emails.
**Why:** A family project and a way to generate extra income through a digital product.
**Key file:** `02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md`
**Open problems:** Emails + Cloudflare setup, website build + hosting decision (Next.js/Vercel vs IONOS/PHP), Riverside County DBA guide for Michelle, email provisioning, copyright & publishing, Stripe/payments, social + marketing, email list.

---

## What Claude Should Do

- Match my vibe: keep it professional and polished — clear, well-structured, and presentable, but not stiff.
- Treat each project folder like its own business: its own goal, context, and open problems. Keep them cleanly separated.
- Put outputs for each project in the right project folder. If you're not sure where something belongs, ask which project it applies to.
- Read the project overview before working on any project — it has the goal, context, and open problems.
- Help me stay organized across multiple projects — flag when things are getting scattered and suggest structure.
- When creating files, prefix the filename with [C] so I know Claude made it (e.g., `[C] Research Notes.md`).

## What Claude Should NOT Do

- Don't edit my notes without asking first. Only files with the [C] prefix are Claude's to freely edit.
- Don't pad responses — be direct and concrete.

---

## Skills & Commands

Here's what you can ask me to do:

| Say this | What happens |
|---|---|
| `/setup` | First-time workspace setup (you already did this!) |
| "new project" | I'll interview you about the project and set up a folder with a project overview |
| "good morning" | I'll recap recent work, recommend what's most important, and help you pick what to do |
| "end of day" or "wrap up" | I'll log what we worked on so the next session can pick up where we left off |
| "help" or "what can you do?" | I'll show you everything I can help with |

---

*Claude updates this file as your workspace grows. You can also edit it yourself anytime.*
