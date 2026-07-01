# Mercury Call Desk — GHL Production Build-Out Runbook
**Date:** 2026-07-01
**Purpose:** Everything needed in the GHL "Mercury Call Desk" location (`lEdLVFW0uqKMhmkgFrsX`) to make the live MCD CRM (`crm.mercurycalldesk.com`) work end to end. Built by reading the actual deployed code (not just the spec docs), so trigger names, field names, and the webhook secret header below are exactly what the app expects.

Confirmed via the GHL API today: the location is named "Mercury Call Desk," ID `lEdLVFW0uqKMhmkgFrsX`, and currently has no MCD-specific custom fields, tags, or email templates set up — this is a build from zero.

---

## 0. What's already automated (no action needed in GHL)

```txt
- Agent signup (crm.mercurycalldesk.com/signup) auto-creates/upserts the GHL contact and
  applies the tag "agent-signup". No workflow needed for this — it's a plain contact write.
- When you click "Approve" in the Mini CRM admin (after the confirm-call gate), the app
  automatically applies the tag "agent-approved" to that agent's GHL contact via the API.
  You never manually tag anyone in the GHL UI — the ONE thing you do is click Approve in
  the Mini CRM.
- Activation emails are now sent directly by the Mini CRM via the no-reply@mercurycalldesk.com
  IONOS mailbox (SMTP) — this does not touch GHL at all anymore. No workflow needed.
```

So the only thing GHL needs to *do* on its own is react to the `agent-approved` tag by running the e-sign documents, then tell the Mini CRM when each document is complete. That's Phase 1 below.

---

## 1. PHASE 1 — Required now: Agent Onboarding E-Sign Workflow

This is the only workflow blocking your end-to-end applicant test (signup → GHL → e-sign → webhook → activation).

### 1.1 What it needs to do
```txt
Trigger:  Tag Added = agent-approved
Actions:  Send 4 documents via GHL Documents & Contracts (e-sign), each with the agent as
          signer and YOU (Hamilton) as countersigner on the Sales Partner Agreement:
            1. Sales Partner Agreement  (multi-recipient — agent signs, then you countersign)
            2. NDA / Confidentiality & IP
            3. W-9 / Payout intake
            4. New Hire Acknowledgment
          On EACH document's individual "Completed" status (not just the last one):
            → Custom Webhook (POST) to the Mini CRM — see 1.2 for the exact call.
```

Important: the Mini CRM processes documents **one at a time**, tracking all four independently and only provisioning the agent once all four show COMPLETED. So the webhook step should fire once per document, right after that specific document reaches Completed — not one combined call at the end.

### 1.2 The webhook call (build this exactly)

**URL:** `https://crm.mercurycalldesk.com/api/ghl/documents`
**Method:** POST
**Headers:**
```txt
Content-Type: application/json
x-mcd-webhook-secret: <the value you set as GHL_WEBHOOK_SECRET in Vercel>
```
(Paste the real secret value directly into the GHL workflow header field — never share it in chat, docs, or screenshots.)

**Body** (send once per document, changing `document_type` and `countersigned` per document):
```json
{
  "ghl_event_id": "{{event.id}}",
  "location_id": "lEdLVFW0uqKMhmkgFrsX",
  "ghl_contact_id": "{{contact.id}}",
  "document_type": "SALES_AGREEMENT",
  "status": "COMPLETED",
  "document_id": "{{document.id}}",
  "signer_ip": "{{document.signer_ip}}",
  "countersigned": true,
  "completed_at": "{{document.completed_at}}"
}
```

`document_type` must be exactly one of: `SALES_AGREEMENT`, `NDA_IP`, `W9` (or `W9_PAYOUT`), `ACKNOWLEDGMENT` — one webhook action per document, each with its matching value.

**Critical footgun:** `"countersigned": true` must be sent **only on the Sales Partner Agreement's** completion call, and it must genuinely reflect that you've countersigned (not just that the agent signed). The Mini CRM will not provision the agent's account until it sees `SALES_AGREEMENT` complete *and* `countersigned: true`. If your Sales Partner Agreement document isn't set up as multi-recipient (agent + you), or the workflow sends `countersigned: true` before you've actually signed, you'll either never provision agents or provision them before you've actually approved the contract. Get this one field right before testing anything else.

The merge fields above (`{{document.id}}`, `{{document.signer_ip}}`, `{{document.completed_at}}`) are placeholders — GHL's workflow builder will show you the actual merge-variable names available on the "Document Completed" trigger when you build it; map whichever ones correspond to document ID, signer IP, and completion timestamp. If signer IP isn't exposed by that trigger, you can omit `signer_ip` — it's optional.

### 1.3 AI workflow-builder prompt (paste into GHL's workflow AI builder)

```
Build a workflow named "MCD - Agent Onboarding Documents".

Trigger: Tag Added, tag = "agent-approved"

Action 1: Send Document (GHL Documents & Contracts) — "Sales Partner Agreement" template,
recipient = the contact, add a second recipient/countersigner = Hamilton Pinto Jr.
(info@mercurycalldesk.com), require both signatures before status is Completed.

Action 2: Send Document — "NDA / Confidentiality and IP Agreement" template, recipient = the contact only.

Action 3: Send Document — "W-9 / Payout Intake" template, recipient = the contact only.

Action 4: Send Document — "New Hire Acknowledgment" template, recipient = the contact only.

For EACH of the four documents, add a separate "Document Completed" trigger step (or a
parallel branch per document) that fires a Custom Webhook action when that specific
document reaches Completed status:
  Method: POST
  URL: https://crm.mercurycalldesk.com/api/ghl/documents
  Headers: Content-Type: application/json, x-mcd-webhook-secret: <paste the secret>
  Body (JSON):
    ghl_event_id = the workflow/event's unique ID
    location_id = "lEdLVFW0uqKMhmkgFrsX"
    ghl_contact_id = the contact's ID
    document_type = one of SALES_AGREEMENT / NDA_IP / W9 / ACKNOWLEDGMENT matching which
      document just completed
    status = "COMPLETED"
    document_id = the completed document's ID
    completed_at = the completion timestamp
    countersigned = true ONLY on the Sales Partner Agreement webhook call (all others:
      omit or false)

Do not add any delay/wait steps between tag-added and sending the documents — start
immediately. Do not remove the tag after firing (leave "agent-approved" on the contact
as a historical marker).
```

You'll likely need to build the four document templates (Sales Partner Agreement, NDA/IP, W-9, Acknowledgment) in GHL Documents & Contracts first if they don't exist yet — the source text for all four already lives in `02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/`.

### 1.4 Test plan
```txt
1. Create a throwaway test contact in the GHL location, or run a real signup through
   crm.mercurycalldesk.com/signup with a test email you control.
2. In Mini CRM admin, confirm-call then approve the test applicant — verify the
   "agent-approved" tag lands on the GHL contact.
3. Confirm the workflow fires and all 4 documents send.
4. Sign + countersign the Sales Partner Agreement (as both agent and Hamilton).
5. Sign the other 3 documents as the agent.
6. Watch /admin/integrations/errors in the Mini CRM — if any webhook call fails
   (wrong secret, malformed body), it'll show up there.
7. Confirm the test agent receives the activation email at their personal address
   from no-reply@mercurycalldesk.com, and that the link logs them into /activate.
```

---

## 2. PHASE 1.5 — Needed before you flip `LEADS_ENABLED=true`: Booking/Calendar

The appointments webhook endpoint (`/api/ghl/appointments`) already exists and processes real data, but it's gated behind the `LEADS_ENABLED` flag (currently `false`), so this isn't blocking anything today. Build it when you're ready to turn on lead/demo booking.

### 2.1 One-time calendar setup (not a workflow — do this in GHL settings)
```txt
1. Connect mcd@gmail.com to GHL (Settings → Integrations → Google, or your Calendar Settings).
2. Create a GHL Calendar "MCD Demo".
3. Meeting location = Google Meet.
4. Assigned user = you, or a single "MCD Booking" service user (not per-agent GHL users).
5. Forms & Payment tab → enable "Add Guests" so the booking agent can be attached as a guest.
6. Notifications: enable Contact, Guests, Users, Additional Emails.
```

### 2.2 AI workflow-builder prompt
```
Build a workflow named "MCD - Appointment Relay".

Trigger: Customer Booked Appointment (calendar = "MCD Demo"). Also add branches for
Appointment Confirmed, Rescheduled, Cancelled, No-Show, and Completed on the same calendar
(or 5 separate workflows with the same webhook action, whichever your builder makes easier).

Action: Custom Webhook, POST to https://crm.mercurycalldesk.com/api/ghl/appointments
  Headers: Content-Type: application/json, x-mcd-webhook-secret: <paste the secret>
  Body (JSON):
    ghl_event_id = unique event ID
    location_id = "lEdLVFW0uqKMhmkgFrsX"
    event_type = one of APPOINTMENT_BOOKED / APPOINTMENT_CONFIRMED /
      APPOINTMENT_RESCHEDULED / APPOINTMENT_CANCELLED / APPOINTMENT_NO_SHOW /
      APPOINTMENT_COMPLETED, matching which trigger fired
    ghl_contact_id = the contact's ID
    ghl_appointment_id = the appointment's ID
    starts_at = the appointment start time (ISO 8601)
    mini_crm_lead_id = the contact's custom field "mini_crm_lead_id" if set (leave blank
      if not yet wired up — the Mini CRM will log an "unmatched" error and no-op safely)
```

Note: `mini_crm_lead_id` requires a custom field on the contact that the Mini CRM stamps when it creates the lead in GHL — that doesn't exist yet either (see Phase 2 custom fields below). Until that's wired up, this workflow will fire but every event will land as "unmatched" in the Mini CRM's integration-error log, which is expected and harmless.

---

## 3. PHASE 2 — Needed before you flip `COMMISSIONS_ENABLED` / `FINANCE_ENABLED` / `SERVICING_ENABLED`

These three endpoints exist and will accept/record events today, but nothing acts on them yet (commission ledger, servicing, and payout logic are all still behind feature flags). Build these when you're actually ready to turn commissions live — no rush.

### 3.1 Custom fields to create first (contact model)
| Field name | Suggested key | Type | Purpose |
|---|---|---|---|
| Mini CRM Lead ID | `mini_crm_lead_id` | Text | Join key so relayed events match the right lead |
| Mini CRM Agent ID | `mini_crm_agent_id` | Text | Current owner attribution |
| Originating Agent ID | `originating_agent_id` | Text | Permanent source credit, even if reassigned |
| Mini CRM Client Account ID | `mini_crm_client_account_id` | Text | Join key once a lead converts to a client |

(None of these exist in the location yet — I checked via the API. The Mini CRM's `upsertSalesHqContact()` function is already coded to stamp these once you create them and share the field IDs back with the dev.)

### 3.2 AI workflow-builder prompt — Funding relay
```
Build a workflow named "MCD - Funding Relay".

Trigger: Payment Received / Invoice Paid (on the client's Stripe-in-GHL integration).
Also build matching branches for Payment Failed, Refund, and Dispute/Chargeback if GHL
surfaces those as separate triggers.

Action: Custom Webhook, POST to https://crm.mercurycalldesk.com/api/ghl/funding
  Headers: Content-Type: application/json, x-mcd-webhook-secret: <paste the secret>
  Body (JSON):
    event_type = FUNDED / FUNDING_FAILED / REFUND / DISPUTE (matching the trigger)
    ghl_event_id = unique event ID
    location_id = "lEdLVFW0uqKMhmkgFrsX"
    ghl_contact_id = the contact's ID
    ghl_opportunity_id = the opportunity's ID (if applicable)
    payment_ref = the GHL invoice or Stripe reference
    amount_collected = the actual amount collected (not invoiced)
    currency = "USD"
    occurred_at = event timestamp
    mini_crm_agent_id = contact custom field "mini_crm_agent_id"
    originating_agent_id = contact custom field "originating_agent_id"
    mini_crm_client_account_id = contact custom field "mini_crm_client_account_id"

Ensure this fires on EVERY successful recurring charge, not just the first payment.
```

### 3.3 AI workflow-builder prompt — Opportunities relay
```
Build a workflow named "MCD - Opportunity Relay".

Trigger: Opportunity Stage Changed (any pipeline stage transition).

Action: Custom Webhook, POST to https://crm.mercurycalldesk.com/api/ghl/opportunities
  Headers: Content-Type: application/json, x-mcd-webhook-secret: <paste the secret>
  Body (JSON):
    ghl_event_id = unique event ID
    location_id = "lEdLVFW0uqKMhmkgFrsX"
    ghl_contact_id = the contact's ID
    ghl_opportunity_id = the opportunity's ID
    stage = the new stage name
    package_code = contact/opportunity custom field for the selected package, if set
```

### 3.4 AI workflow-builder prompt — Invoices relay
```
Build a workflow named "MCD - Invoice Relay".

Trigger: Invoice Created, also branch for Invoice Sent, Invoice Voided, Invoice Paid.

Action: Custom Webhook, POST to https://crm.mercurycalldesk.com/api/ghl/invoices
  Headers: Content-Type: application/json, x-mcd-webhook-secret: <paste the secret>
  Body (JSON):
    ghl_event_id = unique event ID
    location_id = "lEdLVFW0uqKMhmkgFrsX"
    ghl_contact_id = the contact's ID
    invoice_id = the invoice's ID
    invoice_status = created / sent / voided / paid (matching the trigger)
    amount = the invoice amount
```

---

## 4. Tag registry (full list)

| Tag | Set by | When | Workflow that should react |
|---|---|---|---|
| `agent-signup` | Mini CRM (automatic) | On public signup | None — informational only |
| `agent-approved` | Mini CRM (automatic, on your "Approve" click) | After confirm-call + admin approval | Phase 1: Agent Onboarding Documents |
| `mcd-portal-invite` | — | Not used | **Do not build a workflow for this.** It's leftover dead code from before the SMTP activation-email fix; safe to ignore. I'll remove the unused code on the next cleanup pass. |

No other tags are referenced anywhere in the current codebase. Don't build workflows for tags the app doesn't set — they'll never fire.

---

## 5. Master setup checklist (do in this order)

```txt
PHASE 1 — do now, blocks the end-to-end applicant test:
[ ] Build/confirm the 4 e-sign document templates in GHL Documents & Contracts
    (Sales Partner Agreement, NDA/IP, W-9/Payout, New Hire Acknowledgment).
[ ] Set the Sales Partner Agreement as multi-recipient (agent + Hamilton countersign).
[ ] Build workflow "MCD - Agent Onboarding Documents" per §1.3.
[ ] Confirm GHL_WEBHOOK_SECRET in Vercel matches the header value in the workflow.
[ ] Run the test plan in §1.4 end to end with a throwaway/test signup.

PHASE 1.5 — do before enabling lead/demo booking:
[ ] Connect mcd@gmail.com to GHL; create "MCD Demo" calendar per §2.1.
[ ] Build workflow "MCD - Appointment Relay" per §2.2.

PHASE 2 — do before enabling commissions/servicing/finance:
[ ] Create the 4 custom fields in §3.1; share the field IDs with the dev so
    upsertSalesHqContact() can stamp them.
[ ] Build "MCD - Funding Relay", "MCD - Opportunity Relay", "MCD - Invoice Relay"
    workflows per §3.2–3.4.
[ ] Confirm Stripe-in-GHL fires on every recurring charge, not just the first.

ONGOING:
[ ] Monitor GHL's Webhook Logs dashboard + the Mini CRM's /admin/integrations/errors
    page after any workflow change.
[ ] Never share the GHL_WEBHOOK_SECRET or GHL_PRIVATE_TOKEN values outside Vercel's
    env var UI.
```

---

## 6. Open items this runbook surfaces (not yet decided)

```txt
- E-sign system of record: the code already assumes GHL Documents & Contracts (the
  webhook contract is built around it). If you were still weighing DocuSign, that
  decision is effectively made by the current build — flag if you want to revisit.
- mini_crm_lead_id / mini_crm_agent_id / originating_agent_id / mini_crm_client_account_id
  custom fields (§3.1) don't exist yet — needed before Phase 1.5/2 workflows can do
  anything beyond log "unmatched" events.
- invite-delivery.ts / triggerPortalInvite() (the old GHL-tag activation approach) is
  confirmed dead code now that SMTP handles activation email directly — recommend
  deleting it in the next cleanup pass so future readers don't think it's live.
```
