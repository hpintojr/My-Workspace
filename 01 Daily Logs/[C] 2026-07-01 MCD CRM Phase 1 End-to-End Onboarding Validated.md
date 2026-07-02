# MCD CRM — Phase 1 End-to-End Onboarding Validated
**Date:** 2026-07-01  
**Project:** MCD CRM — Agent and Admin Portals  
**Status:** Phase 1 onboarding is live and validated with a controlled synthetic applicant.

---

## Outcome

The complete Phase 1 path was tested in production and worked:

```txt
Public signup
→ Mini CRM creates/updates the GHL contact and adds agent-signup
→ owner confirms call and approves in Mini CRM
→ Mini CRM adds agent-approved in GHL
→ GHL sends four e-sign documents
→ each completed document triggers its dedicated relay webhook
→ Mini CRM records each completion
→ all gates complete + Sales Agreement countersigned
→ Mini CRM provisions the invited user and activation token
→ IONOS SMTP delivers activation email
→ partner activates account, sets credentials, and signs into /portal
```

The activated partner portal shows all four onboarding gates complete. Lead access remains locked until manager certification, as designed.

---

## GHL configuration now live

The following five workflows are published in the live Mercury Call Desk location (`lEdLVFW0uqKMhmkgFrsX`):

1. `Agent Onboarding Documents`
2. `MCD - Relay - Sales Agreement Completed`
3. `MCD - Relay - NDA IP Completed`
4. `MCD - Relay - W9 Completed`
5. `MCD - Relay - Acknowledgment Completed`

### Dispatch workflow

- Trigger: contact receives `agent-approved`.
- Sends directly by email, with Hamilton Pinto as sender:
  - `MCD - Sales Partner Agreement`
  - `MCD - NDA / Confidentiality and IP Agreement`
  - `MCD - W-9 / Payout Intake`
  - `MCD - New Hire Acknowledgment`
- The Sales Partner Agreement requires the applicant signature and Hamilton’s countersignature.
- The four documents are delivered immediately; no wait step is used.

### Relay workflows

Each relay uses a Documents & Contracts / Proposal-Estimate completion event filtered by:

```txt
Status = COMPLETED
AND
Template = the matching MCD document template
```

Each posts to:

```txt
POST https://crm.mercurycalldesk.com/api/ghl/documents
Content-Type: application/json
x-mcd-webhook-secret: configured privately in GHL
```

The production payload uses the GHL Contact ID from the merge-field picker. Because this GHL trigger did not expose usable document-event merge values, relay IDs are deterministic per contact and document type:

```json
{
  "ghl_event_id": "{{contact.id}}-<DOCUMENT_TYPE>-COMPLETED",
  "location_id": "lEdLVFW0uqKMhmkgFrsX",
  "ghl_contact_id": "{{contact.id}}",
  "document_type": "<DOCUMENT_TYPE>",
  "status": "COMPLETED",
  "countersigned": false
}
```

Sales Agreement uses `document_type: "SALES_AGREEMENT"` and `countersigned: true`. NDA uses `NDA_IP`, W-9 uses `W9`, and acknowledgment uses `ACKNOWLEDGMENT`. The Mini CRM stores the W-9 internally as `W9_PAYOUT`.

Do not paste the shared webhook secret into workspace files, code, screenshots, or chat.

---

## Validation evidence

The controlled test established all of the following:

- The Mini CRM approval action successfully applied `agent-approved` to the GHL contact.
- GHL dispatched all four document emails.
- Sales Agreement completion relayed only after the applicant and company signatures were complete.
- All four dedicated GHL relay workflows executed successfully.
- Neon recorded four onboarding-document records as `COMPLETED`.
- The Sales Agreement record has `countersigned = true`.
- The Mini CRM provisioned the linked user and generated a one-time activation token.
- The activation email reached the test inbox from `no-reply@mercurycalldesk.com`.
- The test partner activated the account, set credentials, and successfully signed into `/portal`.
- The portal correctly shows document completion and keeps lead access locked pending certification.

No unresolved Mini CRM integration errors remained after the successful activation-email send.

---

## SMTP incident and resolution

Initial activation-email sends failed with SMTP `535 Authentication credentials invalid` errors. The mailbox credentials in Vercel were corrected and production was redeployed. A new activation-email resend succeeded.

A dependency conflict also surfaced during deployment: the installed Nodemailer major version did not match the active NextAuth peer requirement. `nodemailer` was updated to the compatible version and production deployments returned to `READY`.

### Standing mail rule

- SMTP credentials remain only in Vercel production environment variables.
- Use the actual IONOS mailbox username and mailbox password.
- Never place passwords, access tokens, or the GHL webhook secret in GitHub or daily logs.

---

## Admin experience improvement shipped

A protected **Resend activation email** action was added to `/admin`.

The follow-up usability improvement now provides:

- a pending button state while the send is in progress;
- a success confirmation naming the recipient after delivery succeeds;
- a readable failure notice instead of a generic server error;
- audit logging for successful and failed resend attempts; and
- automatic resolution of prior activation-email integration errors once a later send succeeds.

Resending creates a new activation link and invalidates prior unused links. Do not resend merely to clear historical records.

---

## Current confirmed state

```txt
Public signup:                     Live
Mini CRM → GHL contact/tag bridge: Live
GHL e-sign document dispatch:      Live
GHL completion relay webhooks:     Live
Neon onboarding gate ledger:       Live
Sales countersign gate:             Live
Mini CRM account provisioning:     Live
IONOS activation email delivery:    Live
Partner activation and portal:      Live
Lead access after activation:       Intentionally locked pending certification
```

---

## Next work

1. Improve the Admin applicant card with visible account status, activation-email status, activation time, last-login time, onboarding summary, and certification/lead-access state.
2. Replace the post-approval `Approve and trigger e-sign` action with a non-actionable approved/document-sent state so a completed applicant cannot accidentally receive duplicate documents.
3. Add optional `Company / Legal Entity Name` to signup as separate entity metadata; keep the individual legal name as the contract signer.
4. Complete California counsel review before using agreement drafts for actual partner contracting.
5. Set up the dedicated GHL demo calendar / Google Meet workflow before Phase 1.5 booking work.
6. Create the four GHL attribution custom fields before Phase 2 funding, opportunity, and invoice relays.
7. Keep `LEADS_ENABLED=false` until the lead-engine migrations and controlled operational tests are complete.
