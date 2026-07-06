---
type: status
date: 2026-07-06
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# MCD CRM — Agent and Admin Portals Overview

## Read first

```txt
1. [C] AI Operating Protocol — Handoff, Changelog, Indexing.md
2. 01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation.md
3. [C] MCD CRM — Production Scope & 13-Layer Review.md
4. This overview
```

## Current status — authoritative 2026-07-06

```txt
Production is stable and the prior admin/portal hang is resolved.

PROVEN PRODUCTION FIX
- PR #31 / squash f338cc4 removed the competing Next.js dynamic route:
  admin/servicing/[id] versus admin/servicing/[clientAccountId].
- The page hang was routing-related, not an MFA/Auth.js defect.
- Vercel Authentication had also blocked *.vercel.app preview URLs; that setting was disabled.

PHASE D LEAD IMPORT
- Production Neon already contains LeadImportBatch / LeadImportRow, the Phase D enums, and expected indexes.
- No live import has run: batch count = 0, row count = 0, Lead count = 0 at the July 6 inspection.
- The internal Neon schema ledger now records this pre-existing Phase D state as:
  20260703_002_phase_d_lead_import_batch
- Replacement PR #32 is the active review target, not PR #30.
  Branch: chatgpt/phase-d-reconciled-20260706
  Head: c052a1d
  Preview: dpl_AGh5NcS8C1fjU58EfCz6nj1rvr2T (READY; clean build)
  Status: open and mergeable, but not merged because the GitHub connector safety gate blocked the merge action.

LOCK / HANDOFF
- LOCK.md still names Claude because the connector blocked the lock-file update.
- Hamilton explicitly authorized ChatGPT for the narrow July 6 recovery session because Claude reached its session limit before recording the planned handoff.
- The exact scope, evidence, code changes, and stop point are in the July 6 [G] daily log above.
```

## What PR #32 changes

```txt
- Ports the proven servicing dynamic-route fix to the Phase D branch.
- Removes the competing servicing [id] route; keeps the payment-clearance action in [clientAccountId].
- Keeps the signed HMAC batch-import API from PR #30.
- Corrects import workflow review findings:
  1. batch-level approval promotes VALID rows to APPROVED before import;
  2. submit-time duplicates do not inflate insertedCount;
  3. duplicateCount no longer includes suppression/validation rejects;
  4. conflicting row-number/idempotency-key retries fail before writes;
  5. existing-lead IDs are retained for duplicate reconciliation.
- Adds a workflow check for the batch-approved row transition.
```

## Exact next work

```txt
1. Merge PR #32 using squash once GitHub permissions permit it.
2. Confirm the new production deployment is READY and verify /login plus unauthenticated /admin, /portal,
   and /admin/servicing redirect behavior. A real authorized user must also complete login/MFA.
3. Confirm presence only—not values—of LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET in Vercel and
   mcd_lead_ops local configuration. Do not write secret values to GitHub or workspace logs.
4. Run one supervised, approved mcd-leads export run. Log batch ID, final counts, resulting Lead/AuditLog
   evidence, and any reconciliation outcome.
5. Close or mark PR #30 superseded only after PR #32 merges and the supervised import succeeds.
6. Then take the 13-layer hardening backlog: CI route-collision/typecheck check, preview/production
   environment separation, RLS/least-privilege runtime role, error tracking, login smoke test, Neon headroom.
```

## Goal

Build Mercury Call Desk's secure MiniCRM for its Independent Sales Partner program:
- agent portal;
- admin portal;
- GoHighLevel as private backend only;
- MiniCRM as system of record.

## Product rules that do not change

```txt
- MiniCRM is the system of record. GHL is backend-only. Agents never receive GHL credentials.
- Phase 1 partner onboarding is production-validated.
- Lead/Task modules remain feature-gated until the lead foundation is live.
- Local lead workflow: permitted inputs -> local SQLite staging -> operator review -> signed MiniCRM export.
- No local process writes directly to Neon/Postgres.
- Permitted lead inputs: user files, referrals, web forms, PPC, licensed provider data, owned-account
  exports, and permitted business-site research.
- Google Maps, LinkedIn, directory scraping, and browser-automation adapters are declined/stubbed.
- Never commit credentials, customer data, SSNs, tax IDs, or raw bank data.
```

## Related repo — mcd_lead_ops

`mcd_lead_ops` is a separate local Python CLI. It stages permitted sources into local SQLite for operator preview and approval. Its scheduled job can intake/preview/research but may never approve or export automatically. The first signed export against live CRM remains pending PR #32 merge, environment verification, and a supervised approved run.

## Incident memory

```txt
If admin/portal pages hang while /login and /api/auth/session respond, inspect for sibling dynamic route
segments under src/app before blaming auth. The July 6 production incident was a competing segment under
admin/servicing; it was fixed in PR #31 / f338cc4.

If only *.vercel.app URLs fail while the custom domain works, check Vercel Authentication/Deployment
Protection before investigating application code.
```

## Reference documents

```txt
[C] MCD CRM — Production Scope & 13-Layer Review.md
01 Daily Logs/[C] 2026-07-06 Servicing Slug Collision Fixed and Scope Rebuilt.md
01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation.md
```