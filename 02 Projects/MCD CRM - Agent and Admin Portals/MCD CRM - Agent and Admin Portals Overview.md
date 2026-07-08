---
type: status
date: 2026-07-08
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# MCD CRM — Agent and Admin Portals Overview

## Read first

```txt
1. [C] AI Operating Protocol — Handoff, Changelog, Indexing.md
2. 01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
3. [G] Current Execution Scope — 2026-07-08.md
4. [C] MCD CRM — Production Scope & 13-Layer Review.md
5. This overview
```

## Current status — authoritative 2026-07-08

```txt
Production is healthy, but Lead Flow Alignment is still in PR review/test, not merged to main.

PHASE D LEAD IMPORT / FIRST PRODUCTION BATCH
- PR #32 was reviewed and accepted by Claude, then merged to production as squash d25ac9f.
- The signed lead-import API and read-only Admin reconciliation screens are live:
  /admin/lead-imports
  /admin/lead-imports/[batchId]
- One approved production import ran from local run RUN_2026_07_08_e8a9beed.
- MiniCRM batch ID: cmrbj55go0000la04pxcuuaci.
- 50 Leads were inserted into production.
- Initial imported state was OPEN / AVAILABLE, which conflicted with the finalized activity-first Cold Lead workflow.
- Hamilton approved the production data correction.
- ChatGPT rehearsed the correction on Neon branch test-lead-data-correction-20260708, then applied it to production main.
- Final verified state: 50 Leads = COLD / AVAILABLE; 0 OPEN / AVAILABLE claimable.
- Audit evidence: 1 LEAD_BATCH_POOL_CORRECTED record and 50 LEAD_POOL_CORRECTED records.
- Current LeadLifecycle enum does not include VALIDATED; compatible corrected state is COLD / AVAILABLE.

LEAD FLOW ALIGNMENT — PR #34
- Branch: lead-flow-alignment-20260708.
- Draft PR #34: feat(leads): align cold lead workspace with two-way-contact claim rules.
- Latest observed preview deployment for commit aa84dcfd4b5770e54f3733af9fb60766d7d31b6e reached READY.
- PR #34 includes:
  - Cold Lead workspace in /portal/leads.
  - Call-start activity logging with no soft lock, no claim, and no ownership.
  - No-answer / voicemail stays unowned.
  - Callback / qualified / follow-up records two-way contact and unlocks claim eligibility.
  - Claim requires twoWayContactAt and starts a 45-day openPoolReleaseAt responsibility timer.
  - DNC suppression works from unowned Cold Lead flow and owned Lead flow.
  - Secured daily aging sweep at /api/cron/leads/aging.
  - 45-day expired owned Leads return to Open Pool.
  - 21-day stale unclaimed Open Pool Leads move to Shark Tank.
  - /portal/workspace now works without leadId and shows assigned records, callbacks, recent activity, and claim timer.
  - Build guard checks protect the lead-flow rules.

CONFIGURATION
- Hamilton confirmed CRON_SECRET is configured in Vercel.
- No secret value was inspected or recorded.
- Existing lead import secrets remain configured; do not disclose values.

LOGIN / ADMIN / SERVICING
- The July servicing outage fix remains in place: no competing [id] versus [clientAccountId] route.
- The route-collision guard continues to run in Vercel build.

LOCK / HANDOFF
- ChatGPT holds the current execution lock for controlled Lead Flow Alignment, PR #34 preview acceptance, and scope documentation reconciliation.
- PR #34 remains draft and is not merged.
```

## Exact next work

```txt
1. Run controlled preview acceptance for PR #34.
2. Verify /portal/leads Cold Lead behavior:
   - Cold Leads visible.
   - Log call started creates activity only.
   - No-answer/voicemail does not claim or reserve.
   - Callback/qualified/follow-up records two-way contact and unlocks claim.
3. Verify claim behavior:
   - claim is blocked before two-way contact.
   - claim succeeds only after two-way contact.
   - claim sets ownerAgentId, claimedAt, and 45-day openPoolReleaseAt.
4. Verify DNC suppresses and cancels scheduled callbacks.
5. Verify /portal/workspace works without leadId and shows assigned records, callback queue, recent activity, and claim-timer responsibility.
6. Verify the secured aging sweep contract without exposing CRON_SECRET.
7. Keep PR #34 draft until preview acceptance is recorded.
8. Keep GHL opportunity/reply, Servicing, Commissions, and Finance gated unless separately approved.
9. Continue remaining 13-layer hardening: preview/prod DB + secret separation, RLS/runtime role, error tracking, login smoke test, Neon autoscaling and backup review.
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
- Local lead workflow: permitted inputs -> local SQLite staging -> operator review -> signed MiniCRM export.
- No local process writes directly to Neon/Postgres.
- Permitted lead inputs: user files, referrals, web forms, PPC, licensed provider data, owned-account exports, and permitted business-site research.
- Google Maps, LinkedIn, directory scraping, and browser-automation adapters are declined/stubbed.
- New/imported Leads must not become claimable before activity-first review and two-way-contact claim eligibility.
- Never commit credentials, customer data, SSNs, tax IDs, raw bank data, signed headers, raw source payloads, or contact payloads.
```

## Related repo — mcd_lead_ops

`mcd_lead_ops` is a separate local Python CLI at `D:\GitHub\mcd_lead_ops`. It stages permitted sources into local SQLite for operator preview and approval. Its scheduled task may intake, preview, and research but may never approve or export automatically. Signed production export must remain supervised and operator-approved per run.

## Incident memory

```txt
If admin/portal pages hang while /login and /api/auth/session respond, inspect for sibling dynamic route segments under src/app before blaming auth. The July 6 production incident was a competing segment under admin/servicing; it was fixed in PR #31 / f338cc4 and protected by an automated route-collision guard.

If only *.vercel.app URLs fail while the custom domain works, check Vercel Authentication/Deployment Protection before investigating application code.

If imported Leads appear immediately claimable as OPEN / AVAILABLE, check whether the Cold Lead activity-first flow and Section 17 decisions are being bypassed. The July 8 correction moved the first 50 imported records to COLD / AVAILABLE and PR #34 updates the app flow.
```

## Reference documents

```txt
01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
[G] Current Execution Scope — 2026-07-08.md
[C] MCD CRM — Production Scope & 13-Layer Review.md
[C] Local Lead Operations and MiniCRM Export Scope.md
01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
```
