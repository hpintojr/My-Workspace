---
type: daily-log
date: 2026-06-30
project: MCD CRM - Agent and Admin Portals
---

# 2026-06-30 — MCD CRM: scope v1.2, automated onboarding, and repo scaffold

Big day on the Mercury Call Desk Mini CRM. Went from scoping the GHL backend to reconciling the approved business terms to writing the first real code.

## What got done

### 1. MCD CRM project created + scope v1.1
- Stood up the project `02 Projects/MCD CRM - Agent and Admin Portals/` with an Overview and registered it in CLAUDE.md, README, and the index.
- Took Hamilton's Master Product Scope and added **Part B (GHL backend)**: one-way backend model, event catalog + webhook contracts, the **Stripe → GHL → Mini CRM funding relay** (so Stripe stays untouched in v1), agent attribution **without GHL logins**, and recommendations.
- Companion: `[C] GHL Backend Integration Spec.md` (webhook payloads, custom-field map) + data-flow diagram.
- Booking mechanics confirmed: **free Gmail (mcd@gmail) is sufficient** for GHL Google Calendar + Google Meet — no Workspace needed. Agents book through the app; mcd@gmail hosts the Meet; agent + client are guests. Booking sequence diagram added.

### 2. Incorporated the agent-onboarding library
- Mapped the existing `MCD - Mercury Call Desk/01-agent-onboarding/` files to CRM registration gates + a knowledge base / training module (`[C] Agent Registration, Knowledge Base & Training Integration.md`). Single source of truth stays in the program folder; the CRM ingests/publishes versions.

### 3. Pulled ChatGPT's business-terms overhaul + reconciled to v1.2
- ChatGPT pushed 19 commits (agreements, Owner Setup, and a new **Partner Program Business Terms — Approved 2026-06-30**). Confirmed no conflict with my files; Hamilton pulled cleanly.
- Wrote `[C] v1.2 Business-Terms Reconciliation & GHL Flows.md`. Key changes to the scope:
  - **Commission = 50/50 of Net Commissionable Profit** (collected − wholesale − Stripe fee); replaces the old tiered 40/35/30 gross model. Wholesale schedule locked. Setup-fee logic + 30/15-day payout SLAs.
  - Lead protection made concrete: two-way-contact protection, referral-on-entry, **45-day OpenPool**, Shark Tank (top-tier only), credit on close + cleared payment.
  - Service is now **mandatory cadence per package** + 60-day health rule → overrides the old "healthy accounts need no activity."
  - Onboarding adds **countersignature** + **GHL Documents & Contracts e-sign** (signed → webhook flips the gate). 7-year retention.
  - Agent GHL presence: piloting **both** a dedicated backend GHL user (no login) and custom-field attribution.

### 4. Automated onboarding flow (GHL-first)
- `[C] Automated Agent Onboarding Flow (GHL-first).md` + sequence diagram. Hamilton's manual steps shrink to: create GHL user + IONOS mailbox + confirm call + one `agent-approved` tag. Public signup at `crm.mercurycalldesk.com/signup` ports to GHL; the tag fires the e-sign workflow; "completed" webhook provisions the MiniCRM user and emails an activation link to the agent's personal email.
- Compliance decisions locked: **SSN only inside the W-9 e-sign** (retrievable from the signed PDF, never a stored field), banking via a secure provider (token only), email accessed server-side via a token (agents never log into email).

### 5. Started coding — repo `hpintojr/crm.mcd`
- Scaffolded Next.js 15 (App Router, `src/`) + TypeScript + Tailwind (dark) + Prisma + Postgres (Neon) + Vercel.
- Prisma schema: User, Agent, OnboardingDocument, Certification, AuditLog (+ enums).
- Built the first slice: landing page + **public `/signup`** → `POST /api/signup` (zod validate → GHL Sales HQ upsert → create SUBMITTED agent + 4 doc gates → audit). Runs before GHL is connected (stub-safe client).
- Sanity-checked (JSON valid, config imports, schema balanced). Full `npm install`/build is a local step for Hamilton.

### 6. AI handoff + full scope review
- `[C] AI Handoff & Scope Review.md` — the READ-FIRST doc for any AI: doc map, build state, coding conventions, and a prioritized **gap analysis**.
- Top gaps flagged (P1): auth stack, public rate limiting, webhook shared-secret model (GHL Custom Webhooks don't HMAC-sign), background-worker host, **national DNC/TCPA scrub**, and payout + 1099 onboarding.

## Where we left off / next actions
```txt
1. Hamilton: run npm install + npm run build in D:\GitHub\crm.mcd; report any errors; commit/push (crm.mcd + workspace docs).
2. Decide P1 items: auth stack, rate limiting, worker/queue host, payout provider (Stripe Connect vs bill.com).
3. Next code slice (recommend A): admin applicant review + the "agent-approved" tag action → GHL e-sign workflow.
4. Then: inbound GHL webhook /api/ghl/documents to flip onboarding gates; then auth + activation + agent portal.
5. Legal: California attorney review of the agreements before signature; set the Advanced-Partner margin floor.
```

## Notes
- Any AI continuing the CRM reads `[C] AI Handoff & Scope Review.md` first, then the v1.2 reconciliation, then the repo.
- ChatGPT does most coding; Claude reviews/cleans and keeps the docs in sync.
- Guardrails in code (do not regress): no SSN/bank fields, email token server-side only, GHL one-way, agents never log into GHL, audit sensitive actions.


## Update — full build specs written
Locked the P1 decisions (Auth.js v5; Cloudflare WAF; GHL Location ID + token; local Python → Neon + Sequenzy; manual B2B calling; Stripe Connect payouts) and wrote the build specs:
- `[C] Build Specs — Index & Roadmap.md` — the whole project as ordered slices 01–15 (full specs 01–04, outlines 05–15).
- Full specs written: 01 Auth.js v5 · 02 Admin applicant review + GHL approve tag · 03 Inbound GHL webhooks + provisioning · 04 Agent portal + Stripe Connect.
- All specs mirrored into the repo at `crm.mcd/docs/BUILD-SPEC-*.md` so ChatGPT can build straight from the repo; Claude reviews each PR against the spec's acceptance + cleanup checklist.

Next: ChatGPT takes the first coding pass on Spec 01 (Auth.js v5); bring it back for Claude's cleanup pass.
