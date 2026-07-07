---
type: operator-checklist
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
repository: local mcd_lead_ops | hpintojr/crm.mcd
---

# First Supervised Production Export Checklist

Use this only for the first small, permitted, operator-approved `mcd_lead_ops` run after Phase D production merge `d25ac9f`.

## Boundaries

```txt
- Local mcd_lead_ops stages and exports through the signed MiniCRM API only.
- Do not write directly to Neon/Postgres.
- Do not use Google Maps, LinkedIn, directory scraping, browser automation, or unapproved source data.
- Do not paste secrets, raw payloads, contact data, signed headers, or full local reports into chat or workspace docs.
- Imported leads enter pending review only. This does not start a campaign, assign an agent, or contact anyone.
```

## Local preflight

On `D:\GitHub\mcd_lead_ops`, confirm presence only—never display values—of:

```txt
MCD_LEAD_IMPORT_KEY_ID
MCD_LEAD_IMPORT_HMAC_SECRET
MINICRM_API_BASE_URL=https://crm.mercurycalldesk.com
```

Confirm the local key ID and secret are the same pair configured on the MiniCRM server. The server variables are already evidenced as present in both Vercel Production and Preview.

Choose a small permitted run that has:

```txt
- allowed source and source-use basis;
- completed preview;
- no unresolved source-policy block;
- explicit operator approval; and
- a recorded approval reference.
```

## Required local commands

Use the real local run ID in place of `<approved-run-id>`.

```powershell
mcd-leads preview --run <approved-run-id>
mcd-leads approve --run <approved-run-id> --operator "Hamilton Pinto Jr."
mcd-leads export --run <approved-run-id>
```

The export command must refuse if preview or approval is absent. Do not work around that refusal by creating a new run or editing the local staging database.

## Stop conditions

```txt
401 / unauthorized
- Stop. Compare local variable presence and key identity with the configured server pair.
- Do not display or send secret values.

409 / replay or state conflict
- Stop. Preserve the local run ID and MiniCRM batch ID.
- Do not create a replacement run to bypass the conflict.

5xx / unavailable
- Stop. Preserve endpoint, approximate time, local run ID, and batch ID if one exists.
- Check production runtime logs and the batch detail screen before retrying.

RECONCILIATION_REQUIRED
- Stop. Do not import another batch or start any outreach.

PARTIALLY_ACCEPTED
- Record the aggregate duplicate/review outcomes. This is not automatically a failure.
```

## What to record after export

Record only:

```txt
Local run ID:
MiniCRM batch ID:
Approval reference:
Final batch status:
Counts: total / imported / duplicate / suppressed / rejected / review-required / import-error
Approximate export time:
Next permitted action:
```

Do not record lead names, email addresses, phone numbers, raw rows, secret values, or HMAC material.

## Post-export verification

ChatGPT will verify read-only production evidence:

```txt
- LeadImportBatch and LeadImportRow final state;
- resulting Lead count and pending-review lifecycle;
- LeadActivity and AuditLog evidence;
- duplicate/suppression/reconciliation outcomes; and
- no automatic owner assignment or campaign enrollment.
```

## Test-database harness

`npm run test:lead-import-db` is separate from this live supervised export. It may run only with an explicitly authorized database that differs from the normal `DATABASE_URL`; it is not required to send the first small supervised production batch.