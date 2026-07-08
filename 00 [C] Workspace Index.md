# Workspace Index

Updated: 2026-07-08

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
Admin operations, partner portal, and read-only GHL-backed schedule: deployed.
The July dynamic-route servicing incident is fixed and protected by an automated route-collision guard.

Phase D lead import is no longer just readiness. One approved production import ran:
- Batch: cmrbj55go0000la04pxcuuaci
- Local run: RUN_2026_07_08_e8a9beed
- 50 production Leads exist.
- Data correction approved by Hamilton and applied after Neon safety-branch rehearsal.
- Final verified state: 50 COLD / AVAILABLE, 0 OPEN / AVAILABLE claimable.
- Audit evidence: 1 LEAD_BATCH_POOL_CORRECTED + 50 LEAD_POOL_CORRECTED records.

PR #34 is open as a draft on hpintojr/crm.mcd:
feat(leads): align cold lead workspace with two-way-contact claim rules
Branch: lead-flow-alignment-20260708
Latest observed Vercel preview build for commit aa84dcf reached READY.

PR #34 includes Cold Lead workspace, no-claim-before-two-way-contact guard, DNC on unowned Cold Leads, 45-day claim timer, secured aging cron, Shark Tank promotion, My Workspace dashboard, and docs/build guards.

Hamilton confirmed CRON_SECRET is configured in Vercel. Value was not inspected or recorded.

Current execution holder: ChatGPT, controlled PR #34 preview acceptance and project documentation reconciliation.
```

### Read next

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md
02 Projects/MCD CRM - Agent and Admin Portals/[G] Current Execution Scope — 2026-07-08.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
Repo: hpintojr/crm.mcd
Repo: mcd_lead_ops (local only, D:\GitHub\mcd_lead_ops)
```

### Current next actions

```txt
1. Run controlled preview acceptance for PR #34.
2. Verify /portal/leads Cold Lead behavior: call-start activity only, no claim/no reservation, no-answer remains unowned, callback/qualified/follow-up unlocks claim.
3. Verify claim creates owner, claimedAt, and 45-day openPoolReleaseAt only after two-way contact.
4. Verify DNC suppresses and cancels callbacks.
5. Verify /portal/workspace works without leadId and shows assigned records, callbacks, recent activity, and claim timer.
6. Verify secured aging sweep behavior: expired owned Leads return to Open Pool; 21-day stale Open Pool records move to Shark Tank.
7. Keep PR #34 draft until controlled preview acceptance is recorded.
8. Keep GHL opportunity/reply relays, Servicing, Commissions, and Finance gated unless separately approved.
9. Continue 13-layer hardening: preview/prod separation, RLS/runtime DB role, error tracking, login smoke test, Neon autoscaling/backup review.
```

## Workspace rules

```txt
Keep each business/codebase separate.
Use [C] for AI-authored files unless Hamilton says otherwise; ChatGPT-authored daily logs use [G].
Never commit secrets, credentials, customer data, SSNs, tax data, or raw bank data.
This repo (hpintojr/My-Workspace on GitHub) is the single source of truth -- not just the local
D:\GitHub\My Workspace folder. If local shows unresolved conflict markers, GitHub wins; reconcile
the local copy from it rather than committing markers.
```
