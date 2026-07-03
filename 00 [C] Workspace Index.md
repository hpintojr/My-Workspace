# Workspace Index

Updated: 2026-07-02

## First read

```txt
1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. Current project files listed below
```

## Portfolio

```txt
Project: bennyandpenny.com
Repository: hpintojr/bennyandpenny
Read next:
- 02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
- 02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
```

## Adventures Store

```txt
Project: bennyandpennyadventures.com
Repository: hpintojr/bennyandpennyadventures
Read next:
- 02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
- 02 Projects/Benny & Penny's Adventures/[C] Accessibility WCAG 2.2 AA Handoff.md
```

## Book Series

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

## MCD - Mercury Call Desk

The agent program and brand/onboarding work. Do not disclose the underlying vendor, confidential pricing, or commission math.

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
```

## MCD CRM - Agent and Admin Portals

MiniCRM is the system of record for agent onboarding, lead ownership, compliance, source lineage, and later service/finance. GHL is backend-only; agents never receive GHL access.

### Current status

```txt
Phase 1 onboarding: production-validated.
Admin operations: deployed.
Partner portal and read-only GHL-backed schedule: deployed.
Appointment lifecycle relay: booked, confirmed, cancelled, no-show, completed, and rescheduled validated.
Lead and Task modules: staged/feature-gated until the lead-foundation migration and controlled tests are complete.
2026-07-03: two production incidents this window, both resolved and verified by Hamilton -- a route-collision
  504 outage, and a separate login-hang bug. Full detail in Overview.md and the 2026-07-03 daily log.
Correction (2026-07-03): an earlier note here wrongly claimed the lead-import commit route had no auth.
  It does -- commitLeadImport() enforces session-admin auth internally. The real gap: that auth model
  can't be used by a local CLI (mcd_lead_ops). HMAC primitives already exist in lead-import-auth.ts to
  add a machine-to-machine path -- pending Hamilton's go-ahead since it needs a new production secret.
Local lead operations: final Claude scope is established for local staging/research/preview and signed MiniCRM export. No direct Neon access.
Local lead operations Phase A: built at D:\GitHub\mcd_lead_ops (separate local repo, not crm.mcd). Daily 7:00 AM scheduled task; export always refuses until MiniCRM's import API exists.
```

### Read next

```txt
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Foundation Design Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Management Scope Review and Build Plan.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Lead Pool and Source Taxonomy.md
01 Daily Logs/[C] 2026-07-02 MCD Local Lead Operations Scope Finalized.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Portal Schedule and Lead Pool Progress.md
01 Daily Logs/[C] 2026-07-02 MCD CRM Admin Operations Status.md
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
01 Daily Logs/[C] 2026-07-02 mcd_lead_ops Phase A Build.md
Repo: hpintojr/crm.mcd
Repo: mcd_lead_ops (local only, D:\GitHub\mcd_lead_ops)
```

### Current next actions

```txt
0. Wire HMAC verification into src/app/api/admin/leads/import/route.ts using the existing
   src/lib/lead-import-auth.ts primitives, then point mcd_lead_ops's export step at it with a shared
   secret. Pending Hamilton's go-ahead on provisioning the new Vercel env var (persistent prod config).
1. Point mcd_lead_ops (Phase A done) at a real recurring source config so the daily job has data to process.
2. Apply lead-foundation migration only after the API contract is ready.
3. Add proposal/quote records, including MCD package, website-only, and MCD-with-included-website paths.
4. Add approved provider event/reply routing after campaign safeguards and suppression webhooks are tested.
5. Add GHL Demo Booked handoff after ownership and appointment context are safely mapped.
```
