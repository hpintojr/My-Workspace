# MCD CRM — Isolated Neon Rehearsal Attempt

**Date:** 2026-07-03  
**Scope:** Non-production schema rehearsal only

## Target

```txt
Original isolated branch: lead-foundation-contract-v1
Original branch ID: br-green-cloud-aja7aoz0
Parent: production branch br-flat-cloud-aj9r0d6b
```

## Result

The first atomic rehearsal group executed on the isolated branch:

```txt
- Proposed lead-import/contact enum setup
- Lead.businessPhone changed to allow a missing value for email-only records
```

The connector then blocked table-creation and follow-up schema operations before execution. The full core migration did not complete.

The partial isolated branch was deleted to prevent an incomplete migration state from being reused.

## Confirmed non-events

```txt
- No production branch schema changed.
- No import/contact table was created.
- No index, foreign key, or migration-ledger row was created.
- No application route, feature flag, campaign, GHL, servicing, commission, or finance behavior changed.
```

## Next requirement

Recreate a clean isolated Neon branch and use an approved migration execution channel that permits the reviewed core schema DDL. Rehearse, validate with the existing verification query set, and only then consider a separate production approval.
