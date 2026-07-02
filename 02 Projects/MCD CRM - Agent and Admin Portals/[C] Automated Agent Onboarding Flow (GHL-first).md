# MCD CRM — Automated Agent Onboarding Flow (GHL-first)
**Updated:** 2026-07-01

## Status

The Phase 1 flow is implemented and validated in production.

```txt
1. Applicant submits the Mini CRM signup form.
2. Mini CRM creates or updates the GHL contact and applies agent-signup.
3. Owner completes the confirm-call step and approves in Mini CRM.
4. Mini CRM applies agent-approved in GHL.
5. GHL sends the agreement, NDA/IP, W-9, and acknowledgment documents.
6. Each completed document fires its own relay to the Mini CRM.
7. Mini CRM waits for all four gates and the Sales Agreement countersignature.
8. Mini CRM provisions the partner account and sends the activation email.
9. Partner sets credentials and signs into the portal.
10. Lead access remains locked until manager certification.
```

## Manual owner actions

```txt
Confirm the applicant by call.
Approve in the Mini CRM.
Countersign the Sales Partner Agreement.
Complete manager certification before lead access is enabled.
```

The owner does not manually apply the GHL approval tag during normal operations.

## Data boundaries

- GHL is the document-delivery and signature system.
- The Mini CRM stores onboarding completion state and access control.
- The Mini CRM does not store sensitive tax or banking data.
- Partners do not receive GHL access.

## Current improvements queued

- Add visible Admin status for account activation, document status, last login, certification, and lead access.
- Prevent duplicate document dispatch after approval.
- Add optional company/entity registration metadata.

## Detailed validation record

```txt
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
```
