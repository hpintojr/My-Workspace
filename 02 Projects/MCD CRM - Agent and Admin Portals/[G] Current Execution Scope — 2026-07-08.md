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

Pull request:

```txt
#34 — feat(leads): align cold lead workspace with two-way-contact claim rules
Status: ready for review, not merged
Latest head: 59571ae343cd15e4c296fa260dace3cc8ce38d42
```

Latest observed Vercel preview:

```txt
latest known READY functional preview: 4e7031d62a2f88ee823b2266e48f40048f80c1d8
latest docs/guard head 59571ae343cd15e4c296fa260dace3cc8ce38d42 was building at last check with no error/stderr/exit events emitted
```

Owner-reported browser acceptance:

```txt
Hamilton logged in as an agent and confirmed it worked on 2026-07-08.
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

### 5. GHL relay hardening added after agent login confirmation

Warm Reply Triage:

```txt
Unowned inbound replies now require recorded two-way contact before assignment.
Assignment creates immediate owner callback.
Assignment starts the same 45-day openPoolReleaseAt responsibility timer as normal claim.
Suppressed, DNC, closed, already-owned, and no-contact Leads remain excluded.
```

GHL appointment relay:

```txt
Suppressed/DNC Leads are ignored and audited.
Booked/confirmed/rescheduled appointments record two-way contact if missing.
Cancelled/no-show events create one immediate owner callback or expedite an existing callback.
Closed Won Leads are not rolled back by later recovery events.
Webhook responses and audit metadata now expose leadIgnored/callbackCreated/callbackExpedited/preservedClosedWon outcomes.
```

GHL opportunity relay:

```txt
Suppressed/DNC Leads are ignored and audited.
Opportunity Won moves the Lead to CLOSED_WON and cancels scheduled callbacks.
Opportunity Lost moves an open Lead to CLOSED_LOST and cancels scheduled callbacks.
Late Opportunity Lost cannot roll back an already CLOSED_WON Lead.
Webhook responses and audit metadata now expose leadIgnored/preservedClosedWon/callbacksCancelled outcomes.
```

## Current controlled test plan

PR #34 passed build/route/DB confirmation and owner-reported agent login. Merge still requires owner decision.

```txt
Confirmed:
1. Vercel preview READY at multiple PR #34 heads through the GHL appointment hardening pass.
2. Preview runtime error/fatal log check returned no errors for the latest READY preview checked.
3. /api/cron/leads/aging returns 401 without Authorization.
4. Production Neon remains 50 COLD / AVAILABLE, 0 OPEN / AVAILABLE claimable.
5. Hamilton confirmed agent login worked.

Still recommended before/at merge:
1. Record PR #34 acceptance in /admin/leads/testing.
2. Confirm Cold Lead call-start writes activity only.
3. Confirm no-answer/voicemail leaves the Lead unowned.
4. Confirm callback/qualified/follow-up records two-way contact and unlocks claim.
5. Confirm claim sets ownerAgentId, claimedAt, and 45-day openPoolReleaseAt.
6. Confirm Warm Reply Triage assignment starts the 45-day timer.
7. Confirm GHL appointment events do not mutate suppressed/DNC Leads.
8. Confirm GHL appointment cancellation/no-show creates or expedites one owner callback.
9. Confirm GHL Opportunity Won/Lost cancels scheduled callbacks on terminal outcomes.
10. Confirm GHL Opportunity Lost does not roll back Closed Won.
11. Confirm DNC suppresses and cancels callbacks.
12. Confirm aging sweep behavior using controlled test data only.
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
- Merging PR #34 without owner merge decision.
- Recording secrets, contact payloads, signed headers, raw source files, customer PII, tax IDs, or payment data in GitHub/My-Workspace.

## Acceptance gates

PR #34 is now ready for review. Merge/production activation still requires an explicit owner merge decision and preservation of remaining GHL/Servicing/Commissions/Finance gates.
