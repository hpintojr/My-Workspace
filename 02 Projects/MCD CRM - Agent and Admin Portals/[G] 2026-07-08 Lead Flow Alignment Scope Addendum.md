# [G] 2026-07-08 Lead Flow Alignment Scope Addendum

## Purpose

This addendum updates the active scope for `hpintojr/crm.mcd` after the first approved production import, the production data correction, and PR #34 Lead Flow Alignment work.

Read this with:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/[G] Current Execution Scope — 2026-07-08.md
01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md
```

## First production import and correction

```txt
Batch ID: cmrbj55go0000la04pxcuuaci
Local run: RUN_2026_07_08_e8a9beed
Inserted Leads: 50
Initial imported state: OPEN / AVAILABLE
Approved corrected state: COLD / AVAILABLE
Remaining OPEN / AVAILABLE claimable Leads: 0
Correction audit: 1 LEAD_BATCH_POOL_CORRECTED + 50 LEAD_POOL_CORRECTED records
```

The correction was approved by Hamilton, rehearsed on a Neon safety branch, then applied to production main.

Compatibility note:

```txt
The current deployed LeadLifecycle enum does not include VALIDATED.
Use COLD / AVAILABLE for corrected imported Cold Leads unless a future schema change introduces a separate validated state.
```

## Active PR

```txt
Branch: lead-flow-alignment-20260708
PR: #34 — feat(leads): align cold lead workspace with two-way-contact claim rules
Latest observed preview commit: aa84dcfd4b5770e54f3733af9fb60766d7d31b6e
Latest observed preview state: READY
Status: draft, not merged
```

## Scope represented by PR #34

```txt
Cold Lead activity-first workspace at /portal/leads
No claim, soft lock, or reservation on call start
No-answer / voicemail leaves the Lead unowned
Callback / qualified / follow-up records two-way contact and unlocks claim eligibility
Claim requires twoWayContactAt and starts a 45-day openPoolReleaseAt timer
DNC can suppress from unowned Cold Lead flow and owned Lead flow
Secured daily aging cron at /api/cron/leads/aging
Expired owned Leads return to Open Pool after the 45-day timer
21-day stale Open Pool Leads move to Shark Tank
/portal/workspace works without leadId and shows assigned work dashboard
```

Hamilton confirmed the cron auth environment value is configured in Vercel. The value was not inspected or recorded.

## Updated layer notes

```txt
Layer 1 — Version control: PR #34 is correctly isolated and remains draft.
Layer 3 — Configuration: cron auth value is configured; preview/prod separation remains open.
Layer 4 — Database: production now has 50 corrected Cold Leads and correction audit evidence.
Layer 7 — Data validation: July 8 exposed the Open Pool state mismatch; PR #34 closes that workflow gap.
Layer 9 — CI/CD: Vercel build guards pass; GitHub Actions still recommended.
Layer 12 — Testing: PR #34 needs controlled preview acceptance before merge.
Layer 13 — Documentation: overview, current scope, index, and daily log now point to this July 8 state.
```

## Next acceptance pass

```txt
1. Cold Lead appears in /portal/leads.
2. Log call started does not claim or reserve the Lead.
3. No-answer/voicemail leaves the Lead unowned.
4. Callback/qualified/follow-up records two-way contact and unlocks claim.
5. Claim sets ownerAgentId, claimedAt, and 45-day openPoolReleaseAt.
6. DNC suppresses and cancels callbacks.
7. /portal/workspace works without leadId.
8. /portal/workspace shows assigned records, callbacks, recent activity, and claim timer.
9. Aging sweep returns expired owned Leads to Open Pool.
10. Aging sweep moves 21-day stale Open Pool records to Shark Tank.
```

## Open decisions

```txt
- Whether PR #34 should receive Claude inspection before merge.
- Whether preview should get its own Neon branch and separate environment values before broader testing.
- RLS / least-privilege runtime DB role timing.
- Pilot size after PR #34 acceptance.
```
