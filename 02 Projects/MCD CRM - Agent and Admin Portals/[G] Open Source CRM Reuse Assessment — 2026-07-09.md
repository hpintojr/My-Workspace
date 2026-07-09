# MCD CRM — Open Source CRM Reuse Assessment

**Updated:** 2026-07-09  
**Owner approval:** Hamilton Pinto Jr.  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, `pdovhomilja/nextcrm-app`, `clawnify/open-crm`, and `twentyhq/twenty`

## Approved decision

Hamilton approved the following direction on 2026-07-09:

```txt
Approve Mercury CRM as the base.
Approve NextCRM as primary code-reference/source-mining repo.
Approve OpenCRM as lightweight UI/agent-mode reference.
Approve Twenty as architecture reference only, no code copy without license review.
Pause new feature expansion until we add controlled test data + GHL test harness.
Continue handoff updates in hpintojr/My-Workspace after each repo-mining PR.
```

## Decision summary

```txt
Do not replace hpintojr/crm.mcd.
Do not restart from Twenty, NextCRM, or OpenCRM.
Keep Mercury CRM as the production base because the Mercury-specific rules are already implemented and deployed.
Use NextCRM and OpenCRM selectively to accelerate UI, reporting, activity, audit, and test-harness work.
Use Twenty for architecture inspiration only unless an explicit license/compliance decision approves direct use.
```

## Source repo roles

### Mercury CRM — production base

```txt
Repository: hpintojr/crm.mcd
Role: production base and source of truth
Status: active production app
Current production state: PR #34 through PR #44 merged and deployed
Latest production commit at approval: 5965cc58cd009cb0c518e3e855355e15099d29a1
```

Mercury CRM remains the base because it already includes:

```txt
- Mercury-specific Agent/Admin portal structure
- lead import and approval controls
- COLD/OPEN/HOT/NURTURE/SHARK_TANK/HOUSE/REFERRAL pool logic
- two-way-contact claim gate
- no soft lock on call attempts
- strict click-to-call activity logging
- 45-day claim responsibility timer
- DNC/suppression blackout handling
- Warm Reply timer alignment
- GHL appointment/opportunity relay hardening
- secured aging cron
- aging dry-run preview
- production acceptance board/report/export
- audit evidence model
- Vercel production status endpoint
```

### NextCRM — primary code-reference/source-mining repo

```txt
Repository: pdovhomilja/nextcrm-app
Role: primary code-reference/source-mining repo
Use type: selective source mining and adaptation
License posture: MIT; preserve attribution/license notices for copied/adapted code
```

Approved reuse targets:

```txt
- activity timeline patterns
- global audit/history UI patterns
- entity detail page structure
- admin audit filtering patterns
- document/storage patterns
- report/export UX ideas
- MCP/data-access patterns for future AI assistant control
- selected shadcn/ui patterns if compatible with current stack
- campaign/email/invoice architecture as later-stage reference only
```

Rules:

```txt
Do not wholesale merge NextCRM into Mercury CRM.
Do not replace Mercury CRM schema with NextCRM schema.
Port only small, reviewed patterns/files.
Keep Mercury lead ownership, DNC, timer, and GHL rules as source of truth.
Record attribution in My-Workspace when material code/patterns are copied or adapted.
```

### OpenCRM — lightweight UI and agent-mode reference

```txt
Repository: clawnify/open-crm
Role: lightweight UI and AI/agent-mode reference
Use type: selective UI/UX pattern reuse
License posture: MIT; preserve attribution/license notices for copied/adapted code
```

Approved reuse targets:

```txt
- agent-friendly UI mode
- larger click targets
- always-visible row actions
- semantic labels for automation
- lightweight table/search/pagination patterns
- simple contacts/companies/deals relationship concepts for future display UX
- pipeline-stage visual patterns
```

Rules:

```txt
Do not migrate Mercury CRM to SQLite, Preact, Hono, Vite, Wrangler, or Cloudflare D1.
Do not replace Mercury's Postgres/Prisma/Next.js architecture.
Use OpenCRM as a UX accelerator only.
```

### Twenty — architecture reference only

```txt
Repository: twentyhq/twenty
Role: architecture reference only
Use type: study/reference
License posture: AGPL/commercial-license risk; no code copy without explicit license review and owner approval
```

Approved reference targets:

```txt
- object/view customization concepts
- record layout concepts
- workflow abstraction ideas
- app/plugin architecture ideas
- CRM-as-code direction
```

Rules:

```txt
Do not copy Twenty code into hpintojr/crm.mcd.
Do not vendor Twenty packages or files.
Do not port Twenty components, server modules, schema, or generated code without license review.
Any Twenty-derived implementation must be clean-room/inspired-only unless separately approved.
```

## New execution boundary

Feature expansion is paused until these two accelerators are built:

```txt
1. Controlled production test-data workflow.
2. GHL controlled event test harness.
```

This means the next coding PRs should focus on:

```txt
- test-only Lead creation and isolation
- marking controlled test records clearly
- preventing controlled test records from accidental GHL export unless explicitly allowed
- cleanup/archive of controlled test records
- simulated appointment booked/confirmed/rescheduled/cancelled/no-show events
- simulated opportunity won/lost events
- preview expected effects before submit
- audit logging for every test-harness action
- acceptance-board/report integration for test harness evidence
```

## Proposed PR sequence

### PR #45 — Controlled Test Data Foundation

```txt
Goal: Allow admins to create and manage test-only Leads for acceptance without touching live customer/prospect records.
Expected scope:
- Add controlled/test Lead marker if current schema can support without migration, or propose safe schema addition if required.
- Admin-only controlled data page or API.
- Create COLD / AVAILABLE test Lead.
- Add clear source/campaign marker.
- Block/flag export to GHL by default.
- Add audit evidence.
- Add guard coverage.
```

### PR #46 — Controlled GHL Event Harness

```txt
Goal: Let admins safely simulate GHL appointment/opportunity events against controlled test Leads.
Expected scope:
- /admin/integrations/test-events or equivalent.
- Appointment booked/confirmed/rescheduled/cancelled/no-show simulation.
- Opportunity won/lost simulation.
- Preview expected mutation before submit.
- Require controlled/test Lead only.
- Audit every simulation.
```

### PR #47 — Acceptance Evidence Integration

```txt
Goal: Wire controlled-data and GHL harness results into the existing acceptance report/export flow.
Expected scope:
- Acceptance board links to controlled-data and GHL test harness.
- Acceptance report shows test-harness evidence where available.
- CSV export includes test-harness evidence metadata where safe.
```

### PR #48 — Agent-Friendly UI Mode

```txt
Goal: Use OpenCRM-inspired UX to reduce operator/AI friction in agent screens.
Expected scope:
- Agent-friendly mode on Lead workspace.
- Larger click targets.
- Always-visible primary row actions.
- Semantic labels for automation.
- No lead ownership/business rule changes.
```

### PR #49+ — NextCRM-Inspired Activity/Audit UX

```txt
Goal: Improve review speed and handoff clarity using NextCRM-inspired activity/audit/reporting patterns.
Expected scope:
- Better Lead activity timeline.
- Better admin audit filtering.
- Entity history/detail tabs.
- Export/report refinements.
```

## Safety rules for all repo-mining PRs

```txt
No production data mutation without explicit owner approval.
No feature flag changes without explicit owner approval.
No GHL workflow activation without explicit owner approval.
No Servicing, Commissions, or Finance activation until separately approved.
No storage of secrets, signed payloads, raw webhook headers, customer PII, tax IDs, payment data, or raw source files in My-Workspace.
No AGPL/Twenty code copying without license review.
Preserve MIT attribution when material code from NextCRM/OpenCRM is copied or adapted.
```

## Current acceptance status after approval

```txt
PR #34 through PR #44 are merged and deployed.
Custom domain is on latest production commit 5965cc58cd009cb0c518e3e855355e15099d29a1.
Unauthenticated smoke checks are passing.
Authenticated production acceptance still remains.
Controlled test data + GHL test harness are now the approved next blockers before broader feature expansion.
```
