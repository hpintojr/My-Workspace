# Workspace Index

Updated: 2026-07-10 (late afternoon)

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
PRODUCTION IS HEALTHY.
Custom domain crm.mercurycalldesk.com is on latest commit 860c0e94310546dc7603b49f3495e99e4e6365d9 (main, PR #79).

Phase 1 onboarding: production-validated.
Admin operations, partner portal, and read-only GHL-backed schedule: deployed.
July dynamic-route servicing incident: fixed and protected by an automated route-collision guard.

Lead Flow business rules (PR #34, merge 487ff615, deployed 2026-07-08):
- Cold Lead workspace, activity-first, no soft lock.
- Click-to-call logs activity before dialer opens; dialer blocks if logging fails.
- No-answer / voicemail stay unowned.
- Two-way-contact claim gate; claim sets owner, claimedAt, 45-day openPoolReleaseAt.
- Warm Reply Triage 45-day timer.
- DNC blackout on unowned Cold Leads and owned Leads.
- Secured aging cron with CRON_SECRET (401 without auth).
- 45-day expired owned Leads return to Open Pool; 21-day stale Open Pool moves to Shark Tank.
- My Workspace dashboard.
- GHL appointment/opportunity relay hardening (controlled-only harness for testing).
- Build guards protect lead-flow rules.

Phase D lead import batch (2026-07-08):
- Batch cmrbj55go0000la04pxcuuaci / local run RUN_2026_07_08_e8a9beed.
- 50 production Leads exist, all COLD / AVAILABLE, 0 claimable.
- Audit evidence: 1 LEAD_BATCH_POOL_CORRECTED + 50 LEAD_POOL_CORRECTED.

Read-only acceptance visibility and navigation (PR #59-#77, 2026-07-09 through
2026-07-10; PR #59-#65 by Claude, PR #66-#77 by ChatGPT under owner-authorized lock).
Runbook + step navigation:
- /admin/leads/acceptance-runbook (11 steps, PR #59).
- /admin/leads/acceptance-runbook/checklist (printable, PR #62).
- Where-to-record matrix (PR #65).
- Stable step-anchor IDs (PR #66).
- Explicit 18-step to 11-section mapping (PR #67).

Cockpit and visibility pages (each read-only + protected JSON endpoint):
- /admin/leads/acceptance-history + CSV export (PR #67).
- /admin/leads/acceptance-findings (PR #68).
- /admin/leads/acceptance-handoff (PR #69).
- /admin/leads/acceptance-gaps (PR #70).
- /admin/leads/acceptance-matrix (PR #71).
- /admin/leads/acceptance-gates (PR #72).
- /admin/leads/acceptance-overview (PR #73).
- /admin/leads/acceptance — protected alias to overview (PR #74).

Cross-linking:
- Runbook link on every admin surface (command center, readiness, operating status,
  audit, Lead review, acceptance command center, acceptance report, acceptance
  board, controlled test data, controlled GHL harness, integration monitor).
- Overview link from history, findings, command center, report, board, runbook,
  and Lead review (PR #74-#77).

Guard script scripts/check-lead-flow-alignment.ts extended to protect all of it.

CRON_SECRET confirmed configured in Vercel. Value not inspected.

Current execution holder: Claude (default per CLAUDE.md, resumed at 2026-07-10T07:28Z
after ChatGPT's owner-authorized continuation window). Handoff planned at end of
this session to unblock a ChatGPT continuation window while Claude usage refreshes.
Current gate: authenticated production acceptance — 12 / 18 recorded PASS, 5 deferred
with operator notes, 1 owner-only (owner production decision).

New during 2026-07-10 afternoon:
- PR #78 (Claude): admin acceptance-operator disposition/DNC on controlled test
  Leads only; Cold Lead review scroll-mt anchor. Production commit 4cba96ac ->
  3bccb51d.
- PR #79 (Claude): admin acceptance-operator claim on controlled test Leads only,
  extending the PR #78 pattern into claims.ts. Production commit 3bccb51d ->
  860c0e94 after one transient Vercel prod-build failure resolved by Redeploy.
```

### Read next

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md
01 Daily Logs/[G] 2026-07-09 MCD CRM ChatGPT Session Handback.md
01 Daily Logs/[G] 2026-07-09 MCD CRM PR77 Acceptance Overview Board Runbook Links.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR65 Where To Record Matrix.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR64 Runbook Links Batch 2.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR63 Runbook Links Batch 1.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR62 Printable Runbook Checklist.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR61 Runbook Link on Acceptance Board.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR60 Runbook Cross-Links.md
01 Daily Logs/[C] 2026-07-09 MCD CRM PR59 Lead Acceptance Runbook.md
01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
Repo: hpintojr/crm.mcd
Repo: mcd_lead_ops (local only, D:\GitHub\mcd_lead_ops)
```

### Current next actions

```txt
1. AUTHENTICATED PRODUCTION ACCEPTANCE (12 / 18 PASS + 5 deferred + 1 owner-only,
   gate to broader rollout):
   Start at /admin/leads/acceptance or /admin/leads/acceptance-overview (single cockpit
   surfacing history, findings, handoff packet, gaps, matrix, and closed gates).
   From the overview, jump to the runbook and use the where-to-record matrix. Each
   step lands on the acceptance board /admin/leads/testing as an immutable
   LEAD_PRODUCTION_ACCEPTANCE_RECORDED audit event.
   - Verify Cold Lead workspace visibility.
   - Verify click-to-call logs activity first (dialer blocks if logging fails).
   - Verify no-answer / voicemail stay unowned.
   - Verify two-way-contact claim gate + 45-day openPoolReleaseAt.
   - Verify Warm Reply Triage 45-day timer.
   - Verify DNC blackout (unowned and owned Cold Leads, cancels callbacks).
   - Verify GHL appointment / opportunity events via controlled harness only.
   - Verify aging sweep dry-run mutationPerformed:false and expected candidates.
   - Record owner production decision.
2. Keep GHL workflow activation, additional live imports, Servicing, Commissions,
   Finance, payout, and client-onboarding gated until explicit owner approval.
3. After acceptance passes: 13-layer hardening backlog — preview/prod DB + secret
   separation, RLS/runtime DB role, error tracking, login smoke test, Neon
   autoscaling and backup review.
4. Backlog items #38-#41 remain unscoped.
```

## Workspace rules

```txt
Keep each business/codebase separate.
Use [C] for AI-authored files unless Hamilton says otherwise; ChatGPT-authored daily logs use [G].
Never commit secrets, credentials, customer data, SSNs, tax data, or raw bank data.
This repo (hpintojr/My-Workspace on GitHub) is the single source of truth -- not just the local workspace.
```
