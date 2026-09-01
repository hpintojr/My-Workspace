---
type: status
date: 2026-07-13
updated: 2026-08-31
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# MCD CRM — Agent and Admin Portals Overview

## FROZEN — 2026-08-31

```txt
Hamilton has decided to migrate off this custom Next.js/Vercel/Neon build to a GoHighLevel
CRM at crm.sulus.ai (location 6R986ILIQydGAU4T1l74). New development on hpintojr/crm.mcd is
FROZEN as of 2026-08-31: no new PRs, no further feature work, no scope beyond what is already
merged. Production stays live at crm.mercurycalldesk.com on PR #138 (commit c7aadba2) exactly
as documented below — nothing is being decommissioned or mutated today. This freeze covers new
development only.

Migration scope, sequencing, lead-data handling, and a cutover date have not yet been defined —
that is separate, future-scoped work. See LOCK.md for the current lock state.
```

## Authoritative current checkpoint — 2026-07-13

```txt
Production is HEALTHY on main commit c7aadba2433c869fbfd1dd7175d0fd721b149085 (PR #138).
Vercel deployment dpl_E8fA5JUTMzrA7WKhq4NnXX1CrjjS is READY and aliased to crm.mercurycalldesk.com.
/api/status returned HTTP 200 for production/main/the exact PR #138 merge SHA with no-store, noindex, CSP, HSTS, anti-framing, MIME, permissions, opener, and referrer headers.

PR #138 completed the localhost-only authenticated E2E account-state scope:
- five-failure active lockout and correct-password denial;
- verified expiry followed by successful Owner login and reset lock state;
- correct-password denial for synthetic SUSPENDED and DISABLED Users;
- read-only persisted User/AuditLog evidence.

All required PR checks passed: Verify CRM, Commission Policy, Application Build, Authenticated E2E, and persisted security assertions. Vercel preview and production were READY; post-deployment Vercel error/fatal query and Chrome console check were clean.

Read next:
1. LOCK.md
2. [G] Master Completion Ledger — 2026-07-13.md
3. 01 Daily Logs/[G] 2026-07-13 MCD CRM PR138 Account State Recovery and Inactive Login Denial.md
4. [C] AI Operating Protocol — Handoff, Changelog, Indexing.md

Do not treat the 2026-07-10 historical record below as the current production baseline or execution queue. Production migrations, feature-flag/configuration changes, real-record mutations, live GHL activation, payments, payouts, and money movement remain prohibited without specific owner approval.
```


## External CRM and Stripe Sandbox checkpoint — 2026-07-13

- Mercury Call Desk GHL now has the browser-created lead, sync, Stripe payment, gross-revenue, commission rate/amount/status fields; lifecycle tags; test/USD custom values; and a ten-stage revenue-and-commission pipeline.
- `MCD - Stripe Test Intake (Draft)` is draft-only and contains no trigger, action, enrollment, or publication.
- Stripe was inspected in the Mercury Call Desk **Sandbox/Test** account; its Test Workbench has no webhook destinations. No live Stripe or payout/bank configuration was touched.
- End-to-end commission validation is **not complete**. GHL's Inbound Webhook is premium/chargeable per execution and must be explicitly approved before controlled testing. The owner must also define commission base, rates/splits, timing, refund/dispute/chargeback rules, approval authority, and rounding.
- Evidence: `01 Daily Logs/[G] 2026-07-13 MCD CRM GHL and Stripe Sandbox Foundation.md`.

## Read first

```txt
1. [C] AI Operating Protocol — Handoff, Changelog, Indexing.md
2. 01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
3. [G] Current Execution Scope — 2026-07-08.md
4. [G] 2026-07-08 Lead Flow Alignment Scope Addendum.md
5. This overview
```

## Historical status snapshot — superseded 2026-07-10

```txt
Production is HEALTHY. Lead Flow business rules are merged and deployed.
Custom domain crm.mercurycalldesk.com is on latest commit 860c0e94 (main, PR #79).

LEAD FLOW BUSINESS RULES — PR #34 (merged 2026-07-08 as 487ff615)
- Cold Lead workspace in /portal/leads, activity-first, no soft lock.
- Call-start activity logging with no soft lock, no claim, no ownership. Dialer
  blocks if activity logging fails.
- No-answer / voicemail stays unowned.
- Callback / qualified / follow-up records two-way contact and unlocks claim.
- Claim requires twoWayContactAt and starts 45-day openPoolReleaseAt timer.
- DNC suppression works from unowned Cold Lead flow and owned Lead flow.
- Secured daily aging sweep at /api/cron/leads/aging (401 without CRON_SECRET).
- 45-day expired owned Leads return to Open Pool; 21-day stale Open Pool Leads
  move to Shark Tank.
- /portal/workspace works without leadId and shows assigned records, callbacks,
  recent activity, and claim timer.
- Warm Reply Triage 45-day timer aligned.
- GHL appointment/opportunity relay hardened; controlled-only harness for tests.
- Acceptance board at /admin/leads/testing writes immutable
  LEAD_PRODUCTION_ACCEPTANCE_RECORDED audit events.
- Build guard scripts/check-lead-flow-alignment.ts protects all lead-flow rules.

PHASE D LEAD IMPORT (state as of 2026-07-08)
- Batch cmrbj55go0000la04pxcuuaci / local run RUN_2026_07_08_e8a9beed.
- 50 Leads exist in production, all COLD / AVAILABLE, 0 claimable.
- Audit evidence: 1 LEAD_BATCH_POOL_CORRECTED + 50 LEAD_POOL_CORRECTED.
- No new imports have run since PR #34.

READ-ONLY ACCEPTANCE VISIBILITY / NAVIGATION — PR #59 through PR #77 (2026-07-09 to 2026-07-10)

Runbook + step navigation (PR #59-#67):
- PR #59 (9181aa00): /admin/leads/acceptance-runbook — 11-step read-only runbook.
- PR #60 (2c837e8c): runbook links on /admin/command-center and /admin/readiness.
- PR #61 (da570d7c): runbook link on /admin/leads/testing.
- PR #62 (124d1248): /admin/leads/acceptance-runbook/checklist.
- PR #63 (05d08d7c): runbook links on operating-status, audit, Lead review.
- PR #64 (c383f25e): runbook links on acceptance-report, controlled-test-data,
  GHL harness, integrations.
- PR #65 (4cba96ac): where-to-record matrix on the runbook.
- PR #66 (53ecd2cf): stable runbook step-anchor IDs.
- PR #67 (6c24a25b): explicit 18-step to 11-section acceptance mapping,
  /admin/leads/acceptance-history + CSV, acceptance-board anchors.

Cockpit and visibility pages (PR #68-#74, each read-only page + protected JSON endpoint):
- PR #68 (bde3c4fa): /admin/leads/acceptance-findings.
- PR #69 (d90137ba): /admin/leads/acceptance-handoff.
- PR #70 (c630a95d): /admin/leads/acceptance-gaps.
- PR #71 (de899828): /admin/leads/acceptance-matrix.
- PR #72 (82330d86): /admin/leads/acceptance-gates.
- PR #73 (4ece2e01): /admin/leads/acceptance-overview.
- PR #74 (d757f5b2): /admin/leads/acceptance protected alias + Lead review overview link.

Cross-linking (PR #75-#77):
- PR #75 (e2a429bc): overview links from history and findings.
- PR #76 (438b24fd): overview links from command center and report.
- PR #77 (a5c33b1c): overview links from board and runbook.

Admin acceptance-operator narrow permission on controlled test Leads only (PR #78-#79, 2026-07-10 afternoon):
- PR #78 (Claude, prod 3bccb51d): src/lib/lead-workspace.ts::activeAgent()
  now allows ADMIN_ROLES on Leads that pass isControlledTestLead() only. Auto-
  provisions an "Acceptance Operator (<ROLE>)" Agent with canClaimLeads:true for
  the admin user so click-to-call, disposition, and DNC actions succeed on the
  controlled test Lead without redirecting to /login. src/app/portal/leads/page.tsx
  gained id="cold-lead-review" + scroll-mt-6 on the Cold Lead detail section, and
  the open/review/disposition anchors point at #cold-lead-review. Guard extended.
- PR #79 (Claude, prod 860c0e94): src/lib/claims.ts::claimAvailableLead() applies
  the same controlled-Lead-only exemption. Real production Leads still throw the
  original "Use reassignment controls for manager lead assignment." error for
  ADMIN roles. Controlled test Leads fall through to the existing agent +
  canClaimLeads + capacity + claim path. Guard extended.

Guard: scripts/check-lead-flow-alignment.ts extended to protect every route,
label, endpoint, and cross-link.

Executor split: PR #59-#65 by Claude. PR #66-#77 by ChatGPT under owner-authorized
2h30m lock window that returned the lock to Claude at 2026-07-10T07:28Z. Full
ChatGPT session summary: 01 Daily Logs/[G] 2026-07-09 MCD CRM ChatGPT Session Handback.md.

No schema changes, no Neon migrations, no feature-flag changes, no GHL workflow
activation, no live GHL API calls, no live import/export submission, no Lead
business-rule changes, no Servicing/Commissions/Finance/payout/client-onboarding
activation across any of these 19 PRs.

CONFIGURATION
- Hamilton confirmed CRON_SECRET is configured in Vercel. Value not inspected.
- Existing lead-import secrets remain configured; do not disclose values.

LOGIN / ADMIN / SERVICING
- July servicing outage fix remains in place: no competing [id] vs [clientAccountId] route.
- Route-collision guard continues to run in Vercel build.

LIVE ACCEPTANCE PROGRESS — 2026-07-10 afternoon
- PASS (12): step 1 (custom domain), 2 (protected routes), 3 (cron 401),
             5 (Lead pool state), 6 (Cold workspace), 7 (click-to-call activity),
             9 (no-answer disposition), 10 (callback-requested / two-way contact),
             11 (45-day claim), 12 (DNC blackout), 13 (My Workspace),
             17 (aging-preview).
- Deferred (5): 4 (Vercel runtime logs), 8 (second Cold Lead call attempt),
                14 (Warm Reply Triage timer), 15/16 (GHL harness).
- Owner-only (1): 18 (owner production decision).
- Controlled test Lead exercised: cmrepsdug0004ii040m00sjs1 ("MCD Controlled
  Lead Test", 555-010-0934). Full lifecycle: Cold -> activity-first click-to-call
  -> no-answer disposition (stayed unowned) -> callback-requested disposition
  (twoWayContactAt set, moved to NURTURE / NURTURING) -> claim (lifecycle
  CLAIMED, ownerAgentId set to auto-provisioned Acceptance Operator (OWNER),
  claimedAt + 45-day openPoolReleaseAt set) -> DNC + suppress (lifecycle
  Suppressed, archived). Immutable LEAD_PRODUCTION_ACCEPTANCE_RECORDED audits
  written per step. GHL export remained blocked by MCD_CONTROLLED_TEST_NO_GHL_EXPORT
  the entire time.

LOCK / HANDOFF
- Claude held the execution lock 2026-07-10T07:28Z through 2026-07-10 evening.
  At end of the afternoon session Claude handed the lock to ChatGPT for a
  continuation coding window. See LOCK.md for the current holder.
- ChatGPT completed a 2h30m owner-authorized continuation shipping PR #66-#77
  and returned the lock cleanly. See ChatGPT Session Handback log.
- No open PR blocked at review as of 2026-07-10.
- Next work is authenticated production acceptance driven by Hamilton on the
  custom domain; Claude will observe/navigate but not drive the Lead actions.
```

## Historical next work — superseded

```txt
1. AUTHENTICATED PRODUCTION ACCEPTANCE (0 / 18 recorded, gate to broader rollout).
   Start at /admin/leads/acceptance (protected alias) or /admin/leads/acceptance-overview
   on crm.mercurycalldesk.com. The overview cockpit surfaces history, findings,
   handoff packet, gaps, matrix, and closed gates; jump to the runbook from there.
   The where-to-record matrix maps each step to the surface it runs on. Every
   outcome lands on the acceptance board /admin/leads/testing as an immutable
   LEAD_PRODUCTION_ACCEPTANCE_RECORDED audit event.
   - Verify Cold Lead workspace visibility on /portal/leads.
   - Verify click-to-call activity is logged BEFORE the dialer opens; dialer
     is blocked if logging fails.
   - Verify no-answer / voicemail stay unowned.
   - Verify two-way-contact claim gate: claim blocked before two-way contact,
     succeeds after, and sets ownerAgentId, claimedAt, and 45-day
     openPoolReleaseAt.
   - Verify Warm Reply Triage 45-day timer.
   - Verify DNC blackout on unowned and owned Cold Leads, and cancellation of
     scheduled callbacks.
   - Verify GHL appointment / opportunity events via the controlled harness
     only (no live GHL workflow activation).
   - Verify aging sweep dry-run mutationPerformed:false, expected
     wouldReturnToOpenPool and wouldPromoteToSharkTank counts.
   - Verify /portal/workspace works without leadId and shows assigned records,
     callback queue, recent activity, and claim-timer responsibility.
   - Verify the secured aging cron contract without exposing CRON_SECRET.
   - Record OWNER PRODUCTION DECISION as the final step.
2. Keep GHL workflow activation, additional live imports, Servicing, Commissions,
   Finance, payout, and client-onboarding gated until explicit owner approval.
3. After acceptance passes: 13-layer hardening backlog — preview/prod DB + secret
   separation, RLS/runtime DB role, error tracking, login smoke test, Neon
   autoscaling and backup review.
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
[G] 2026-07-08 Lead Flow Alignment Scope Addendum.md
[C] MCD CRM — Production Scope & 13-Layer Review.md
[C] Local Lead Operations and MiniCRM Export Scope.md
01 Daily Logs/[C] 2026-07-07 Reviewed and Merged PR 32 to Production Lock Released.md
01 Daily Logs/[G] 2026-07-07 MCD CRM Post-Merge Export Readiness.md
```
