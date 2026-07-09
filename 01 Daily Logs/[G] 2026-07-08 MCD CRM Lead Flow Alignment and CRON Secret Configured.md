---
type: daily-log
date: 2026-07-08
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
author: ChatGPT
---

# [G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured

## What changed

### Production data correction — Neon

Hamilton approved the production lead data correction. ChatGPT rehearsed the correction first on a Neon safety branch, then applied it to production main.

Corrected batch:

```txt
cmrbj55go0000la04pxcuuaci
```

Local run:

```txt
RUN_2026_07_08_e8a9beed
```

Final verified production state:

```txt
50 total Leads
50 Leads = COLD / AVAILABLE
0 Leads = OPEN / AVAILABLE / claimable
1 LEAD_BATCH_POOL_CORRECTED AuditLog record
50 LEAD_POOL_CORRECTED AuditLog records
```

Compatibility note:

```txt
The current deployed LeadLifecycle enum does not include VALIDATED.
The compatible corrected state is pool=COLD and lifecycle=AVAILABLE.
```

### PR #34 — merged to main

Branch:

```txt
lead-flow-alignment-20260708
```

Pull request:

```txt
#34 — feat(leads): align cold lead workspace with two-way-contact claim rules
Status: merged to main after Hamilton approval
Head before merge: 43b99e0daacaace2767f93d6a95641fa8d1d8a9a
Merge commit: 487ff615170f2c9530da61e477935d969d814e69
```

New main deployment:

```txt
Deployment: dpl_Hwq4jTsjmpdjJ8AmMffe8hYDAL9o
Commit: 487ff615170f2c9530da61e477935d969d814e69
Target: production
State: READY
Runtime error/fatal logs: none found for the checked window
```

Custom-domain caveat:

```txt
crm.mercurycalldesk.com still resolved to older deployment dpl_8Qj5PcUQrBGfnYWHxvzPcGNGqG5C at the last check.
That older deployment is commit a80b8159df8331af0c84d3a098f54e880edecca5.
Owner or Vercel settings need to promote/alias the custom domain to merge commit 487ff615170f2c9530da61e477935d969d814e69.
```

### Lead Flow Alignment delivered

- `/portal/leads` lists unowned `COLD / AVAILABLE` records.
- Cold Lead work is activity-first.
- Strict click-to-call logs `CALL_INITIATED` before opening the device dialer.
- If call activity logging fails, the dialer is not opened.
- Call-start logging does not claim, soft-lock, reserve, or assign ownership.
- No-answer and voicemail keep the Lead unowned.
- Callback-requested, qualified, and follow-up/interested record two-way contact and unlock claim eligibility without auto-claiming.
- DNC can suppress unowned Cold Leads.
- Claim requires two-way contact and starts the 45-day responsibility timer.
- `/portal/workspace` is now a true agent dashboard instead of requiring `leadId` and 404ing without one.
- `/admin/leads/testing` now includes explicit acceptance steps for strict click-to-call, GHL relay hardening, aging sweep, and owner decision evidence.

### Production smoke checks completed on the new deployment URL

Checked against:

```txt
https://crm-rjsdbscn1-hamiltons-projects-f65eeb81.vercel.app
```

Results:

```txt
/portal/workspace -> sign-in boundary, not 404/500
/portal/leads -> sign-in boundary, not 404/500
/admin/leads/testing -> sign-in boundary, not 404/500
/api/cron/leads/aging -> 401 Unauthorized without Authorization
Vercel build logs -> no error/stderr/exit events
Vercel runtime error/fatal logs -> none found for checked window
```

### GHL / relay hardening delivered

- Warm Reply Triage requires recorded two-way contact before assignment and starts the 45-day responsibility timer.
- Appointment relay ignores suppressed/DNC Leads, records two-way contact from booked/confirmed/rescheduled events, dedupes/expedites recovery callbacks, and preserves Closed Won.
- Opportunity relay ignores suppressed/DNC Leads, cancels scheduled callbacks on Won/Lost terminal outcomes, and prevents late Lost from rolling back Closed Won.

### Aging sweep delivered

Secured cron endpoint:

```txt
/api/cron/leads/aging
```

Schedule:

```txt
0 12 * * *
```

Behavior:

```txt
Expired claimed/contacted/nurturing non-referral Leads return to OPEN / AVAILABLE after their 45-day claim timer.
Unowned OPEN / AVAILABLE Leads released for 21 days move to SHARK_TANK.
Both paths write audit/activity evidence.
```

Security:

```txt
Endpoint requires Authorization: Bearer $CRON_SECRET.
Hamilton confirmed CRON_SECRET was configured in Vercel. No secret value was inspected or recorded.
```

### My-Workspace scope repo updates

The My-Workspace repo was updated so it no longer says the live import never ran / Neon counts are zero / PR #34 is draft. It also now records the custom-domain promotion gap.

Files updated or added in `hpintojr/My-Workspace` during this continuation:

```txt
00 [C] Workspace Index.md
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[G] Current Execution Scope — 2026-07-08.md
02 Projects/MCD CRM - Agent and Admin Portals/[G] 2026-07-08 Lead Flow Alignment Scope Addendum.md
02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md
01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
```

## Evidence

- Neon production was verified after correction:
  - 50 total Leads.
  - 50 `COLD / AVAILABLE` Leads.
  - 0 `OPEN / AVAILABLE` claimable Leads.
  - 1 batch-level correction audit.
  - 50 lead-level correction audits.
- The correction was first rehearsed on Neon branch `test-lead-data-correction-20260708` before production mutation.
- PR #34 preview reached READY at `43b99e0daacaace2767f93d6a95641fa8d1d8a9a` with no runtime error/fatal logs found.
- PR #34 was merged by owner approval into `main` as `487ff615170f2c9530da61e477935d969d814e69`.
- Vercel new main deployment `dpl_Hwq4jTsjmpdjJ8AmMffe8hYDAL9o` reached READY for merge commit `487ff615170f2c9530da61e477935d969d814e69`.
- Runtime error/fatal log check for that new deployment found no errors in the checked window.
- Route/auth-boundary checks on the new deployment URL passed for `/portal/workspace`, `/portal/leads`, `/admin/leads/testing`, and `/api/cron/leads/aging`.
- `crm.mercurycalldesk.com` still resolved to older deployment `dpl_8Qj5PcUQrBGfnYWHxvzPcGNGqG5C` at the last check, so custom-domain promotion remains unresolved.
- Hamilton confirmed agent login worked in the PR preview before merge.

## Still open / gated

```txt
Custom domain promotion remains unresolved: crm.mercurycalldesk.com must be moved/verified to PR #34 merge commit 487ff615170f2c9530da61e477935d969d814e69.
Controlled production smoke checks should be recorded in /admin/leads/testing after custom-domain promotion.
GHL external workflow activation still requires controlled acceptance testing.
Automatic GHL Opportunity Won -> Client Account creation remains intentionally disabled.
Commissions and Finance remain gated and untouched.
No secrets, contact payloads, signed headers, customer data, tax IDs, or payment data were committed.
```

Remaining 13-layer hardening still open:

```txt
separate preview/production DB and secrets
RLS / least-privilege runtime DB role
structured error tracking
real login smoke test
Neon autoscaling headroom / backup retention review
```

## Start here next

Start with Vercel custom-domain promotion/verification.

Next action:

```txt
1. Confirm crm.mercurycalldesk.com resolves to merge commit 487ff615170f2c9530da61e477935d969d814e69.
2. Run controlled production acceptance on the custom domain:
   - Cold Lead appears in /portal/leads.
   - Click-to-call logs activity before opening the dialer.
   - Click-to-call does not claim, soft-lock, reserve, or assign ownership.
   - Click-to-call blocks the dialer if activity logging fails.
   - No-answer/voicemail leaves the Lead unowned.
   - Callback/qualified/follow-up records two-way contact and unlocks claim.
   - Claim sets owner, claimedAt, and 45-day openPoolReleaseAt.
   - DNC suppresses and cancels callbacks.
   - /portal/workspace shows assigned records and callbacks without requiring leadId.
   - Warm Reply Triage assignment starts the 45-day timer.
   - GHL appointment/opportunity/reply relays remain behind controlled acceptance testing.
   - Aging sweep returns expired owned Leads to Open Pool.
   - Aging sweep moves 21-day stale Open Pool records to Shark Tank.
```

Read first:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
```

## Handback

```txt
holder: chatgpt
scope: crm.mcd + My-Workspace scope documentation
next: custom-domain promotion verification, then controlled production smoke checks for PR #34, then separate owner decisions for GHL workflows, Servicing, Commissions, and Finance
read_first: 02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
```
