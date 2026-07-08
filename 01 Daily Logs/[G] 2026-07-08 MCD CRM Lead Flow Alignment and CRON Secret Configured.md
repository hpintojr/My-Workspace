---
type: daily-log
date: 2026-07-08
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
author: ChatGPT
---

# [G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured

## What I changed

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

### crm.mcd code/documentation branch

Branch:

```txt
lead-flow-alignment-20260708
```

Draft PR:

```txt
#34 — feat(leads): align cold lead workspace with two-way-contact claim rules
```

Files touched in `hpintojr/crm.mcd` during this session included:

```txt
src/lib/claims.ts
src/lib/lead-workspace.ts
src/lib/lead-aging-jobs.ts
src/app/portal/leads/page.tsx
src/app/portal/workspace/page.tsx
src/app/api/cron/leads/aging/route.ts
scripts/check-lead-flow-alignment.ts
package.json
vercel.json
docs/LEAD_FLOW_ALIGNMENT_20260708.md
docs/WORKSPACE.md
docs/DAILY_LOG.md
docs/daily-logs/2026-07-08.md
```

### Cold Lead workflow built in PR #34

- `/portal/leads` now lists unowned `COLD / AVAILABLE` records.
- Cold Lead work is activity-first.
- Call-start logging writes activity only; it does not claim, soft-lock, reserve, or assign ownership.
- No-answer and voicemail keep the Lead unowned.
- Callback-requested, qualified, and follow-up/interested record two-way contact and unlock claim eligibility without auto-claiming.
- DNC can suppress unowned Cold Leads.

### Claim rule built in PR #34

`claimAvailableLead` now requires:

```txt
ownerAgentId = null
pool in HOT, NURTURE
lifecycle in CONTACTED, NURTURING, DEMO_BOOKED
twoWayContactAt is present
dnc = false
suppressed = false
```

Successful claim:

```txt
sets ownerAgentId
sets lifecycle = CLAIMED
sets claimedAt
sets openPoolReleaseAt = claim time + 45 days
writes LeadClaimEvent, LeadActivity, and AuditLog
```

### Aging sweep built in PR #34

Added secured cron endpoint:

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

### My Workspace built in PR #34

`/portal/workspace` is now a true agent dashboard instead of requiring `leadId` and 404ing without one.

It now shows:

```txt
assigned records
scheduled callbacks
claim access status
DNC rule reminder
recent activity
claim-timer responsibility
selected owned-lead detail view
```

### My-Workspace scope repo updates

The My-Workspace repo was updated so it no longer says the live import never ran / Neon counts are zero.

Files updated or added in `hpintojr/My-Workspace`:

```txt
00 [C] Workspace Index.md
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[G] Current Execution Scope — 2026-07-08.md
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
- Vercel preview build for PR #34 initially passed after the first Cold Lead workspace pass.
- Later PR #34 preview briefly failed because the build guard expected a brittle exact string in `vercel.json`.
- That guard was fixed; the latest observed Vercel preview deployment for commit `aa84dcfd4b5770e54f3733af9fb60766d7d31b6e` reached `READY`.
- The latest Vercel build output showed:
  - route-collision guard passed;
  - login completion guard passed;
  - lead import guards passed;
  - lead flow alignment guard passed;
  - Prisma generated;
  - Next.js compiled successfully;
  - `/api/cron/leads/aging` included in the built route list.
- My-Workspace core files were read before reconciliation:
  - `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`
  - `00 [C] Workspace Index.md`
  - `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`
  - `02 Projects/MCD CRM - Agent and Admin Portals/[G] Current Execution Scope — 2026-07-08.md`
  - `02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md`
  - `02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md`
  - `02 Projects/MCD CRM - Agent and Admin Portals/[C] Local Lead Operations and MiniCRM Export Scope.md`

## Still open

```txt
PR #34 remains draft and is not merged to main.
Full client-side tel interception is not complete; current branch uses dial link plus explicit call-start logging.
GHL Opportunity and Inbound Reply workflows still require controlled external configuration and acceptance testing.
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

Start with PR #34 in `hpintojr/crm.mcd`.

Next action:

```txt
Run controlled preview acceptance for PR #34:
1. Cold Lead appears in /portal/leads.
2. Log call started does not claim or reserve the Lead.
3. No-answer/voicemail leaves the Lead unowned.
4. Callback/qualified/follow-up records two-way contact and unlocks claim.
5. Claim sets owner, claimedAt, and 45-day openPoolReleaseAt.
6. DNC suppresses and cancels callbacks.
7. /portal/workspace shows assigned records and callbacks without requiring leadId.
8. Aging sweep returns expired owned Leads to Open Pool.
9. Aging sweep moves 21-day stale Open Pool records to Shark Tank.
10. GHL appointment/opportunity/reply relays remain behind controlled acceptance testing.
```

Read first:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
```

## Handback

```txt
holder: chatgpt
scope: crm.mcd + My-Workspace scope documentation
next: controlled preview acceptance for PR #34, then owner decision on whether/when to mark PR ready and merge
read_first: 02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
```
