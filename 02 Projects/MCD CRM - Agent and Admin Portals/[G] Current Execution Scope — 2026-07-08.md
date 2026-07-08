# MCD CRM — Current Execution Scope

**Updated:** 2026-07-08  
**Owner:** ChatGPT  
**Applies to:** `hpintojr/crm.mcd` and local `mcd_lead_ops`

## Current release state

The lead-research and opaque owner-acquisition release is live in production.

- Lead records support business address, Google rating, rating-observed timestamp, and an outbound Google Maps link.
- The batch acquisition record stores only opaque `sourceCode` and `acquisitionReference` values.
- Provider identity, commercial terms, purchase records, vendor documents, secrets, and raw source files remain outside MiniCRM.
- The production database change was additive and a pre-release Neon branch is retained for rollback reference.
- No live lead intake, approval, CRM submit, or `Raw_Leads.csv` import has been run.

## Immediate scope — Controlled Leads Launch

### 1. Production role and screen smoke check

Confirm the deployed application behaves correctly with real role boundaries:

- OWNER can access the dedicated opaque acquisition page for a batch.
- Agents and non-owner admins cannot access or receive acquisition data.
- Agent and admin lead screens show only allowed sales-research fields.
- Google Maps is still an outbound manual-research link only.
- DNC and suppression controls remain effective.

### 2. Local importer operational readiness

Prepare the local `mcd_lead_ops` environment without storing private values in source control or My-Workspace:

- Confirm the approved local source configuration exists and uses a neutral source reference.
- Confirm the source has an owner-confirmed written permitted-use basis before any real intake.
- Confirm opaque acquisition identifiers exist only in the ignored local environment file.
- Confirm signed MiniCRM transport settings are present privately.
- Run a no-write validation/dry-run after configuration is confirmed.

### 3. First supervised import — preview only

After the owner approves the source and local run:

1. Intake into local staging.
2. Review normalization, duplicates, suppression outcomes, and rejected rows.
3. Create the signed CRM batch and record opaque owner acquisition metadata.
4. Upload rows and generate the CRM preview.
5. Review the preview with the owner.

**Stop point:** Do not submit the batch or make leads claimable until the owner gives an explicit approval reference for that specific run.

### 4. Controlled production activation

Only after the first batch has been accepted and the production smoke check passes:

- Submit the approved batch.
- Verify imported lead values, non-disclosure of opaque metadata, DNC behavior, and claim controls.
- Enable `LEADS_ENABLED` only after this controlled test is documented and approved.
- Start with a limited, owner-approved operational batch rather than a broad rollout.

## Next product slices after leads stabilize

1. **Demo booking handoff to GHL** — validate the live appointment contract, preserve originating-agent attribution, and test cancellation/no-show recovery.
2. **Lead ingestion and nurture** — finish the local importer operating runbook, define Sequenzy nurture/suppression sync, and add operator reports.
3. **Client servicing and commissions** — test the staged client/service/ledger migration on a safety branch before enabling service or finance flags.
4. **Finance payouts** — only after Stripe Connect live credentials, funding reconciliation, approval UI, and non-production payout tests are complete.

## Explicitly out of scope for this phase

- Storing provider identity or commercial records in MiniCRM.
- Scraping, fetching, embedding, or ingesting Google Maps/review content.
- Auto-enabling lead, servicing, commission, or finance feature flags.
- Live import, submit, or export without a run-specific owner approval reference.

## Acceptance gates

The Controlled Leads Launch is complete only when:

- Role-based production smoke checks are documented.
- The owner has confirmed permitted use for the selected source.
- A supervised batch preview has been reviewed.
- A run-specific approval reference exists before submit.
- Post-submit checks confirm imported data, DNC behavior, and privacy boundaries.
- `LEADS_ENABLED` is deliberately enabled after the controlled production test, not before.
