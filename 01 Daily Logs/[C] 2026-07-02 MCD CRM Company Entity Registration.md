# MCD CRM — Company / Legal Entity Registration Field
**Date:** 2026-07-02
**Project:** MCD CRM — Agent and Admin Portals

## Completed

The public partner signup now includes an optional field:

```txt
Company / Legal Entity Name
```

It is intended for an LLC, corporation, or DBA. The person’s individual legal name remains the agreement signer and is not replaced by the business/entity field.

The Mini CRM stores the submitted company/entity name as separate optional partner metadata. Existing applicants remain valid with no company/entity value.

## Boundaries

- This field is not taxpayer-ID, bank, or payout-account collection.
- It is not a replacement for the W-9 or secure payout workflow.
- It does not change the current four-document or countersignature gates.
- It does not change the individual signer requirement.

## Release note

The corresponding production deployment completed successfully after a type-safety correction for omitted optional values.

## Follow-up

1. Add the company/entity value to the primary Admin applicant card as a visible profile detail.
2. Decide whether counsel wants the entity value rendered as a non-signing business reference in any future agreement version.
3. Add a dedicated GHL custom field only after the field ID and intended usage are confirmed; do not rely on an unverified standard contact property.
