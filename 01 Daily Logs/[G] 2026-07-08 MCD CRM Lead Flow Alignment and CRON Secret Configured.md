---
type: daily-log
date: 2026-07-08
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
author: ChatGPT
---

# [G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured

## Summary

CRM.MCD moved from Phase D import readiness into first live lead-data correction and Lead Flow Alignment implementation.

The first 50 imported production leads were corrected out of Open Pool and into Cold Leads. PR #34 was opened in `hpintojr/crm.mcd` to align the app with the finalized lead workflow: Cold Lead activity-first work, no claim before two-way contact, 45-day claim timer, DNC blackout, aging sweep, and My Workspace dashboard.

## Production data correction

Production Neon correction was approved by Hamilton and applied after first rehearsing on a Neon safety branch.

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

Important compatibility note:

```txt
The current deployed LeadLifecycle enum does not include VALIDATED.
The compatible corrected state is pool=COLD and lifecycle=AVAILABLE.
```

## crm.mcd branch and PR

Branch:

```txt
lead-flow-alignment-20260708
```

Draft PR:

```txt
#34 — feat(leads): align cold lead workspace with two-way-contact claim rules
```

Build status observed during work:

```txt
Latest Vercel preview build recovered to READY after fixing a brittle build guard.
```

## Built in PR #34

### Cold Lead workspace

- `/portal/leads` now lists unowned `COLD / AVAILABLE` records.
- Cold Lead activity is activity-first.
- Call-start logging writes activity only; it does not claim, soft-lock, reserve, or assign ownership.
- No-answer and voicemail keep the Lead unowned.
- Callback-requested, qualified, and follow-up/interested record two-way contact and unlock claim eligibility without auto-claiming.
- DNC can suppress unowned Cold Leads.

### Claim rule

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

### Aging sweep

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

### My Workspace

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

## Still gated / not complete

```txt
Full client-side tel interception is not complete; current branch uses dial link plus explicit call-start logging.
GHL Opportunity and Inbound Reply workflows still require controlled external configuration and acceptance testing.
Automatic GHL Opportunity Won -> Client Account creation remains intentionally disabled.
Commissions and Finance remain gated and untouched.
No secrets, contact payloads, signed headers, customer data, tax IDs, or payment data were committed.
```

## Next controlled test

Use an eligible internal test agent and verify:

```txt
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
