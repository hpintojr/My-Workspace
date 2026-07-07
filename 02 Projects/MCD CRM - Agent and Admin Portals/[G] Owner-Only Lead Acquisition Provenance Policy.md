---
type: access-policy
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
---

# Owner-Only Lead Acquisition Provenance Policy

## Product decision

The actual vendor, acquisition cost, order or invoice reference, license or permitted-use record, and other commercially sensitive acquisition details are **Owner-only**.

They must not be shown to:

```txt
- Agents
- Sales managers
- Super admins
- Compliance managers
- Finance managers
- Future administrators
```

## Separate the two concepts

```txt
Acquisition provenance (Owner-only)
- vendor or provider identity
- contract/license/terms record
- order/invoice reference
- cost and purchase terms
- original delivery file and acquisition date

Sales research reference (may be shared when useful)
- business website
- public Google Maps link
- public review/reputation observations used to prepare a call
- call-safe research notes that do not disclose the acquisition vendor
```

## Current import rule

Do not place actual vendor identity or commercial acquisition details in the shared Lead fields:

```txt
sourceDetail
sourceReference
campaignName
campaignExternalId
AuditLog metadata
LeadImportBatch fields
LeadImportRow payload
```

Until a server-enforced owner-only provenance store exists:

```txt
1. Keep actual vendor/license/invoice details in an owner-controlled local ledger or approved private vault.
2. Use only a non-identifying internal acquisition reference in the local import configuration when a reference is needed.
3. Keep public Maps URLs as sales-research links only when helpful to the call.
4. Do not copy vendor names or purchase terms into agent notes, admin review screens, CSV reports, or shared GitHub workspace records.
```

## Required future implementation

Before exposing detailed lead source fields in Admin screens, add a server-enforced owner-only provenance record and deny it from every non-owner role by query policy, API authorization, and UI selection rules. Hiding a field in the UI alone is not enough.
