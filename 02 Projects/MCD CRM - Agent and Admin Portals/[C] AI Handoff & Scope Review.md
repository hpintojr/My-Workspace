# MCD CRM — AI Handoff & Scope Review (READ FIRST)
**Date:** 2026-06-30
**Purpose:** The single entry point for any AI (ChatGPT for coding, Claude for review/cleanup, Gemini for accuracy) working on the Mercury Call Desk Mini CRM. It maps the authoritative docs, records the current build state, sets the coding conventions so generated code stays consistent, and lists the scope gaps + recommendations found in a full review.

---

## 1. How the AIs hand off (protocol)
```txt
ChatGPT  → writes/generates code fast against the specs below.
Claude   → reviews, refactors, hardens, keeps docs + scope in sync, runs cleanup.
Gemini   → medical/accuracy or policy sanity where relevant (not usually needed here).
Human (Hamilton) → owns decisions, GHL/IONOS setup, legal review, commits/pushes.
```
Rule for every AI: **read this file first, then the authoritative docs in §2, then the repo.** Do not invent business rules — they live in the approved program file. When you change a rule, update the doc AND note it here.

---

## 2. Authoritative document map (source of truth order)
```txt
Business truth (owner-approved; do not contradict):
  02 Projects/MCD - Mercury Call Desk/[C] Partner Program Business Terms — Approved 2026-06-30.md
  02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
  02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/  (the agent library: agreements, scripts, training)

Product scope (this project):
  [C] Master Product Scope v1.1.md            ← base scope (Parts A + B)
  [C] v1.2 Business-Terms Reconciliation & GHL Flows.md   ← APPLY OVER v1.1 (commission 50/50 net, leads, service, onboarding)
  [C] GHL Backend Integration Spec.md         ← webhook payloads, custom fields, funding relay, booking + e-sign mechanics
  [C] Agent Registration, Knowledge Base & Training Integration.md   ← onboarding gates + KB/training
  [C] Automated Agent Onboarding Flow (GHL-first).md   ← signup → GHL e-sign → MiniCRM provisioning
  Diagrams: [C] GHL Mini-CRM Data Flow.svg · [C] GHL Booking Sequence.svg · [C] Automated Onboarding Sequence.svg

Code:
  Repo: hpintojr/crm.mcd  (local: D:\GitHub\crm.mcd)
```
If two docs conflict: **v1.2 reconciliation > v1.1 scope**, and **the approved Business Terms > everything** for business rules.

---

## 3. Current build state (crm.mcd)
```txt
Stack:   Next.js 15 (App Router, src/) · TypeScript strict · Tailwind (dark) · Prisma · PostgreSQL (Neon) · Vercel
Present: config (package.json, tsconfig, next/tailwind/postcss), .env.example, README,
         prisma/schema.prisma (User, Agent, OnboardingDocument, Certification, AuditLog + enums),
         src/lib (db, env [server-only], ghl [stub-safe], validation),
         src/app (layout, globals.css, landing page),
         src/app/signup (public partner sign-up form),
         src/app/api/signup (POST → validate → GHL upsert → create SUBMITTED agent + 4 doc gates → audit).
Runs before GHL is connected: the GHL client returns a stub id until GHL_PRIVATE_TOKEN + GHL_SALES_HQ_LOCATION_ID are set.
Not yet built: auth/activation, admin review + agent-approved tag, inbound GHL webhooks, leads engine, funding/commission engine.
```

---

## 4. Coding conventions & guardrails (so generated code stays consistent)
```txt
- Framework: Next.js 15 App Router, files under src/, path alias @/* → src/*.
- TypeScript strict; validate ALL external input with zod (see src/lib/validation.ts).
- DB: Prisma via the singleton in src/lib/db.ts. Migrations via prisma migrate. No raw SQL unless necessary.
- Secrets: server-only via src/lib/env.ts. NEVER import @/lib/env into a "use client" file. NEXT_PUBLIC_* only for non-secrets.
- Styling: Tailwind, dark theme (ink/brand tokens in tailwind.config.ts). No inline color hex in components.
- Every sensitive action writes an AuditLog row (who/what/entity/ip).
- GHL client is stub-safe: features must work locally before the GHL token exists.
- Authorization is server-side on every route/action (agents see only their own data). Never trust the client.
COMPLIANCE (do not regress):
- NO SSN/tax-ID field anywhere. SSN is captured only inside the W-9 e-sign (GHL) and read from that signed PDF.
- NO raw bank/routing numbers. Payout provider (Stripe/bill.com) stores a token/reference only.
- Email: agents never log in; the CRM reads/sends via EMAIL_ACCESS_TOKEN server-side only.
- GHL is a one-way backend for lead/client/funding data; agents never get a GHL login.
- Confidential (true/wholesale pricing, commission mechanics, scripts, ICP) is NDA-gated; agents see set/retail pricing only.
```

---

## 5. Scope review — gaps & recommendations (prioritized)

### P1 — RESOLVED (2026-06-30)
1. Auth = **Auth.js (NextAuth v5)** — credentials + HTTP-only session, argon2id hashing, TOTP MFA; the one-time activation link sets the password.
2. Rate limiting = **Cloudflare WAF (Free)** + a Cloudflare rate-limit rule on `/api/signup`, plus the honeypot + zod. NOTE: crm.mercurycalldesk.com must be Cloudflare-proxied (orange-cloud) in front of Vercel for WAF to apply.
3. GHL connection = Hamilton provides the **Sales HQ Location ID + API token** → wire `GHL_PRIVATE_TOKEN` + `GHL_SALES_HQ_LOCATION_ID`. Inbound webhooks use a **shared-secret header + location-id allowlist + idempotency** (GHL Custom Webhooks do NOT HMAC-sign — do not design around a signature).
4. Workers = **local Python script → Neon DB** (no cloud worker host in v1). Nurture email via **Sequenzy** (Mailjet as fallback) through the provider abstraction — requires a defined Sequenzy campaign + workflow + suppression sync. (Claude can help design the Sequenzy campaign/workflow.)
5. Calling = **manual B2B business-line dialing only** — no auto-dialer, never personal/cell numbers. This sharply lowers TCPA exposure and the national-DNC-scrub need (the DNC registry targets residential/consumer lines). Still required: internal DNC/opt-out suppression (log within 24h), a business-phone field (flag/deter cell numbers), and recording disclosure only if a call is recorded.
6. Payout = **Stripe Connect (Express)** — onboarding includes a "Set up payouts" step: the CRM creates a Connect Express account + a Stripe-hosted onboarding link; the agent completes bank/KYC on Stripe; the CRM stores only the connected-account id + `payouts_enabled` status (no raw bank data). Stripe Connect also handles platform 1099 reporting. The agent portal surfaces the setup info/steps.

#### Original P1 rationale (for reference)
1. **Auth mechanism.** Scope names MFA + one-time activation but not the implementation. Recommend: Auth.js (NextAuth v5) credentials or a lightweight custom session (HTTP-only cookie + JWT), password hashing with argon2id, TOTP MFA. Pick one and stick to it before the agent portal.
2. **Public-endpoint rate limiting.** `/signup` and future public routes need real rate limiting (e.g. Upstash Redis ratelimit or Vercel middleware). The honeypot alone isn't enough.
3. **Webhook auth model.** GHL Custom Webhooks do **not** HMAC-sign by default. Use a shared-secret header (or secret in the path) + a location-id allowlist + idempotency keys. Document that GHL won't sign, so don't design around a signature you won't get.
4. **Background worker hosting.** Vercel functions are short-lived; the scraper/enrichment/Python workers and durable queue need a host (Railway/Fly/Render) + a queue (QStash/Inngest/BullMQ). Decide now — it affects Phase 3.
5. **National DNC / TCPA scrub.** Internal suppression is spec'd, but cold outbound also needs a **national DNC registry scrub** and calling-hours enforcement per state. Real legal exposure; add to the compliance module.
6. **Payout onboarding = part of agent onboarding.** Stripe Connect (Express) or bill.com vendor onboarding, plus **1099-NEC year-end reporting**, should be an explicit onboarding step + a finance job. Banking is captured via the provider widget (token only).

### P2 — strengthen the design
7. **Field-level encryption for PII.** Encrypt personal/contact PII columns at rest (pgcrypto or app-layer envelope encryption), not just "no SSN."
8. **Transactional vs campaign email split.** Activation links / notifications must go via a reliable transactional sender (Mailjet transactional or similar), separate from IONOS mailbox access and from bulk campaigns.
9. **GHL API rate limits + retry/backoff.** GHL v2 enforces burst + daily caps. All MiniCRM→GHL writes go through a queued client with exponential backoff; surface failures to the admin error queue.
10. **Close → client sub-account provisioning.** The moment of "closed + funded" should provision the per-client GHL sub-account and migrate the contact out of Sales HQ. Spec this transition (it's implied but not written).
11. **Launch-checklist definition.** The new 30-day first-payout gate references a "documented launch phase" — define the checklist items so the payout gate is testable.
12. **Commission plan seed.** Seed the v1 commission plan + wholesale schedule as versioned reference data so the engine has inputs on day one.

### P3 — polish / later
13. **Testing strategy.** Vitest (unit) + Playwright (e2e) mapped to the scope's acceptance tests (§28) and the GHL-specific tests.
14. **Observability.** Sentry (or similar) for app errors, in addition to the in-app integration error queue.
15. **Accessibility.** Adopt the workspace's shared WCAG 2.2 AA program for the agent/admin UI (already used on the other sites).
16. **Reporting layer.** Decide materialized views / a reporting schema for the §23 metrics rather than ad-hoc queries.
17. **Data-subject requests + retention automation.** CCPA/CPRA access/delete handling and an automated 7-year retention/purge job with legal-hold support.

---

## 6. Build roadmap (next slices, in order)
> Each slice has a build spec: `[C] Build Specs — Index & Roadmap.md` (full specs 01–04 written; 05–15 outlined). ChatGPT builds one slice per branch; Claude reviews against that spec's acceptance criteria.
```txt
DONE:  public signup → GHL (stub-safe) + agent record + doc gates + audit.
NEXT (Phase 1 remainder):
  A. Admin applicant review screen + the "agent-approved" tag action (writes GHL tag → starts e-sign workflow).
  B. Inbound GHL webhook /api/ghl/documents → flip onboarding gates on "completed"; store doc refs + audit.
  C. Auth + one-time activation link → password + MFA; agent portal shell.
  D. Agent self-service: profile + banking (secure provider token) + SSN-on-file flag.
THEN (Phase 1 leads / Phase 2 revenue):
  E. Leads engine: pools + atomic claim + protection rules (two-way contact, referral, 45-day OpenPool, Shark Tank).
  F. Demo booking handoff to GHL (custom fields, calendar) + /api/ghl/appointments inbound.
  G. Funding relay /api/ghl/funding → commission ledger (50/50 Net Commissionable Profit, setup-fee logic, payout SLAs).
  H. Client accounts + mandatory service cadence + 60-day health rule + House escalation.
```

---

## 7. Open decisions still pending (owner/legal)
```txt
[ ] California attorney review of the agreements before signature.
[ ] Advanced-Partner minimum-margin floor (per package or a floor schedule).
[ ] Agent-GHL model: Flow A (backend user, no login) vs Flow B (custom fields) vs hybrid — piloting to compare.
[ ] E-sign system of record: GHL Documents & Contracts (recommended) vs DocuSign.
[ ] Payout provider: Stripe Connect vs bill.com.
[ ] SSN pattern confirmed (only inside the W-9 e-sign; retrievable from the signed PDF).
[x] Auth = Auth.js v5; rate limiting = Cloudflare WAF; workers = local Python → Neon + Sequenzy; calling = manual B2B; payout = Stripe Connect (all resolved 2026-06-30 — see §5 P1).
```
