# My Workspace — AI Assistant Context

Read in order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current project-control and handoff files
```

## MCD CRM — Authority and boundaries

```txt
My-Workspace = project-control and full-scope source of truth.
crm.mcd = separate implementation repository and live application source.
Vercel crm-mcd = application hosting.
Neon mcd-crm-production = system-of-record database service.
mcd_lead_ops = separate local staging/research/export preparation workspace.
```

MiniCRM is the permanent system of record. GHL is backend-only. Agents never receive GHL logins. The local lead process must never write directly to Neon/Postgres.

Read these before changing MiniCRM implementation:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Project Control, Scope Reconciliation & Rebuild Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Foundation Design Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Management Scope Review and Build Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Pool and Source Taxonomy.md
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
```

## MCD CRM current control state

```txt
1. Preserve the validated Phase 1 onboarding and appointment relay.
2. Treat recovery/e59-route-fix as the current route-recovery candidate.
3. Do not reintroduce competing Next.js dynamic segment names at the same route level.
4. Core Lead tables and taxonomy fields exist in Neon, but full scope still requires
   LeadContact, import batches/rows, proposals, channel contactability/suppression,
   campaign-event history, and the signed local-import API.
5. Do not enable a feature just because tables or code exist.
```

## Local lead rules

```txt
Allowed: user files, referrals, web forms, PPC leads, licensed provider data,
owned-account exports, permitted business-site research.

Blocked: directory/social scraping, browser automation, bot evasion, CAPTCHA/rate-limit
bypass, SMTP mailbox probing, direct Neon access, contact-limit circumvention.
```

## Required delivery gates

```txt
- One focused branch and one acceptance target at a time.
- Preview acceptance before any production merge/deploy.
- No production migration without an explicit reviewed migration plan and owner approval.
- No local export without HMAC, idempotency, preview, operator approval, and MiniCRM-side review.
- No campaign sending without sender-domain, suppression, provider-webhook, inbox-testing,
  content, and owner-approval gates.
- Do not merge unrelated recovery, auth, migration, feature, or dependency work together.
```

## Current next work

```txt
1. Verify and accept recovery/e59-route-fix in Preview.
2. Reconcile full-scope data-model gaps against the live Lead baseline without applying a migration.
3. Implement the secure import-batch API contract and synthetic acceptance tests.
4. Connect mcd_lead_ops only after the API is accepted.
```

Use `[C]` in AI-authored file names unless Hamilton directs otherwise. Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
