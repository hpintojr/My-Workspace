# MCD CRM — Current Execution Scope

**Updated:** 2026-07-08  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd`, `hpintojr/My-Workspace`, and local `mcd_lead_ops`

## Current release state

The lead-research and opaque owner-acquisition release is live in production. The first supervised production import has also occurred and then required an approved data correction.

- Lead records support business address, Google rating, rating-observed timestamp, and an outbound Google Maps link.
- The batch acquisition record stores only opaque `sourceCode` and `acquisitionReference` values.
- Provider identity, commercial terms, purchase records, vendor documents, secrets, and raw source files remain outside MiniCRM.
- No secret values were inspected or recorded.
- No local process wrote directly to Neon/Postgres.

## First production batch and correction

```txt
Batch ID: cmrbj55go0000la04pxcuuaci
Local run: RUN_2026_07_08_e8a9beed
Inserted Leads: 50
Initial imported state: OPEN / AVAILABLE
Final corrected state: COLD / AVAILABLE
Remaining OPEN / AVAILABLE claimable Leads: 0
Correction audit: 1 LEAD_BATCH_POOL_CORRECTED + 50 LEAD_POOL_CORRECTED records
```

The correction was owner-approved, rehearsed first on a Neon safety branch, then applied to production.

Compatibility note:

```txt
The current deployed LeadLifecycle enum does not include VALIDATED.
Use COLD / AVAILABLE for corrected imported Cold Leads until a future schema change introduces a different validated state.
```

## Immediate scope — PR #34 Lead Flow Alignment

Branch:

```txt
lead-flow-alignment-20260708
```

Draft PR:

```txt
#34 — feat(leads): align cold lead workspace with two-way-contact claim rules
```

Latest observed Vercel preview:

```txt
commit: aa84dcfd4b5770e54f3733af9fb60766d7d31b6e
state: READY
```

### 1. Cold Lead activity-first workspace

PR #34 must preserve these rules:

- Cold Leads display in `/portal/leads` as unowned `COLD / AVAILABLE` records.
- Call-start logging creates activity only.
- Call-start logging must not claim, soft-lock, reserve, or assign ownership.
- No-answer and voicemail keep the Lead unowned.
- Callback-requested, qualified, and follow-up/interested record two-way contact and unlock claim eligibility.
- Claim is not automatic.
- DNC can suppress unowned Cold Leads and cancel scheduled callbacks.

### 2. Claim gate

Claiming requires:

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

### 3. My Workspace dashboard

`/portal/workspace` must work without a selected `leadId` and show:

```txt
assigned records
scheduled callbacks
claim access status
DNC rule reminder
recent activity
claim-timer responsibility
selected owned-lead detail view when leadId is present
```

### 4. Aging sweep

Secured endpoint:

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

Security/configuration:

```txt
Endpoint requires Authorization: Bearer $CRON_SECRET.
Hamilton confirmed CRON_SECRET is configured in Vercel.
Do not inspect or record the secret value.
```

## Current controlled test plan

Run preview acceptance for PR #34 before merge:

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

## Next product slices after Lead Flow Alignment stabilizes

1. **GHL appointment/opportunity/reply acceptance** — validate live appointment, opportunity result, and inbound reply contracts while preserving originating-agent attribution and DNC/suppression protections.
2. **Lead ingestion and nurture** — finish the local importer operating runbook, define Sequenzy nurture/suppression sync, and add operator reports.
3. **Client servicing and commissions** — test the staged client/service/ledger migration on a safety branch before enabling service or finance flags.
4. **Finance payouts** — only after Stripe Connect live credentials, funding reconciliation, approval UI, and non-production payout tests are complete.

## Explicitly out of scope for this phase

- Storing provider identity or commercial records in MiniCRM.
- Scraping, fetching, embedding, or ingesting Google Maps/review content.
- Auto-enabling lead, servicing, commission, or finance feature flags.
- Additional live import/submit/export without a run-specific owner approval reference.
- Merging PR #34 before preview acceptance is recorded.
- Recording secrets, contact payloads, signed headers, raw source files, customer PII, tax IDs, or payment data in GitHub/My-Workspace.

## Acceptance gates

PR #34 can move out of draft only when:

- Preview acceptance proves Cold Lead activity-first behavior.
- Claim-before-two-way-contact is blocked.
- Claim-after-two-way-contact works and starts the 45-day timer.
- DNC suppresses and cancels callbacks.
- My Workspace dashboard works without `leadId`.
- Aging sweep contract is verified without exposing `CRON_SECRET`.
- Remaining GHL/Servicing/Commissions/Finance gates are explicitly preserved.
