# MCD CRM — Scope Reconciliation and Rebuild Control

**Date:** 2026-07-03  
**Project:** MCD CRM — Agent and Admin Portals  
**Control repository:** `hpintojr/My-Workspace`  
**Implementation repository:** `hpintojr/crm.mcd`

## Decision

`hpintojr/My-Workspace` is the MiniCRM project-control and full-scope source of truth. `hpintojr/crm.mcd` is the separate live implementation and deployment repository.

```txt
My-Workspace = scope, operating policy, build order, handoffs, dated history.
crm.mcd = Next.js application code.
Vercel crm-mcd = hosting and Preview validation.
Neon mcd-crm-production = system-of-record database service.
mcd_lead_ops = local staging/research/approval/signed-export preparation only.
```

## Scope confirmed

The MiniCRM is the permanent source of truth for onboarding, lead identity, ownership, source lineage, pools, lifecycle, suppression, activities, callbacks, proposals, later client servicing, and finance visibility.

GHL remains backend-only. Agents do not receive GHL access. Local lead operations never connect directly to Neon/Postgres.

## Reconciled technical facts

```txt
- Phase 1 onboarding and appointment lifecycle relays have been validated.
- crm.mcd/main contains competing dynamic lead routes: [id] and [leadId].
- The known recovery candidate is recovery/e59-route-fix.
- Neon already contains core Lead, LeadActivity, LeadCallback, LeadClaimEvent,
  LeadNote, and LeadSuppression tables.
- Neon also contains original-source, intake, attribution, website-status, and dedupe fields.
- Missing full-scope foundation includes LeadContact, import batches/rows, proposals,
  channel-level contactability/suppression, campaign-event history, and secure import APIs.
```

## Next sequence

1. Validate `recovery/e59-route-fix` in Vercel Preview.
2. Accept the route recovery through a focused pull request before new feature work.
3. Create a no-migration scope-to-schema design branch for the remaining lead foundation.
4. Build the signed import-batch API and synthetic acceptance tests.
5. Connect `mcd_lead_ops` only after MiniCRM import acceptance.
6. Build agent workflow, reply triage, proposals, GHL handoff, servicing, commissions, and finance in isolated gated tracks.

## Guardrails retained

- No direct local Neon/Postgres access.
- No prohibited scraping, browser automation, bot evasion, or mailbox probing.
- No automatic campaign send, agent assignment, or production feature enablement.
- No migration or deployment bundled with unrelated recovery work.
- No secrets, customer data, SSNs, tax IDs, raw bank data, or GHL internals in workspace or Git.
