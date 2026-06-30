# Mercury Call Desk — GHL Backend Integration Spec
**Companion to:** `[C] Master Product Scope v1.1.md` (Part B, §31–37)
**Version:** 1.0 · **Date:** 2026-06-29
**Audience:** Developer / integrator. This is the implementation-level detail behind the Part B operating model.

**Confirmed environment**
```text
GHL plan:        Agency (Unlimited/Pro) — API v2 + Private Integration Tokens
Structure:       One GHL sub-account (location) per client
Stripe:          Already connected inside GHL (native)
Agents:          NO GHL logins — Mini CRM only
Funding flow:    Stripe → GHL → Mini CRM (relay), no direct Stripe integration in v1
```

---

## 1. Connection layer

### 1.1 Private Integration Token (Mini CRM → GHL)
- Create in each client sub-account: **Settings → Private Integrations** (or Agency-level for cross-location, scoped down).
- Scope to the minimum needed: contacts (read/write), opportunities (read/write), calendars/appointments (read/write), custom fields (read).
- Store in the secret manager. Never ship to client-side code. Rotatable per location.
- Use for: creating the contact/opportunity/appointment at demo handoff, and on-demand reads to reconcile state.

### 1.2 Outbound webhooks (GHL → Mini CRM)
Two ways to emit; use workflows for control:
- **Workflow → Custom Webhook (Outbound) action**: per-event, fully shaped payloads (recommended).
- **Settings → Integrations → Webhooks** (sub-account): coarser, account-level events.
- Methods supported: GET/POST/PUT/DELETE. Use **POST** with JSON.
- Monitor with GHL's **Webhook Logs dashboard** + your own integration error queue.

### 1.3 Endpoints to expose on the Mini CRM
```text
POST /api/ghl/appointments      (booked / confirmed / rescheduled / cancelled / no-show / completed)
POST /api/ghl/opportunities     (stage changes, package selection)
POST /api/ghl/invoices          (created / sent / voided / paid)
POST /api/ghl/funding           (FUNDED / FUNDING_FAILED / REFUND / DISPUTE — see §4)
```
All endpoints: verify signature/secret → check idempotency key → enqueue → 200 fast.

---

## 2. Security on inbound webhooks
```text
1. Shared secret header (e.g. X-MCD-Signature) per location; reject on mismatch.
2. Allow-list known location_ids; unknown → error queue, HTTP 202 (accept-but-quarantine) or 401.
3. Idempotency: persist (location_id + ghl_event_id) UNIQUE; duplicate = no-op, return 200.
4. Never trust amounts blindly for payout — Finance still approves (scope §17.9).
5. Log every inbound event to webhook_events (raw, sanitized) for replay.
```

---

## 3. Custom field map (set by Mini CRM at handoff, echoed back on every event)
| GHL custom field key | Source | Purpose |
|---|---|---|
| `mini_crm_lead_id` | Mini CRM | join key for the lead |
| `mini_crm_agent_id` | Mini CRM | current owner attribution (no GHL seat) |
| `originating_agent_id` | Mini CRM | permanent source credit (§7.2) |
| `mini_crm_client_account_id` | Mini CRM (post-conversion) | join key for the client account |
| `lead_source` / `lead_pool` / `lead_score` | Mini CRM | reporting + routing context |
| `set_pricing_tier` | Mini CRM | the partner price the agent may quote (never the true price) |

GHL echoes these back inside every webhook payload, so the Mini CRM re-attaches events to the right agent/account with zero GHL logins.

---

## 4. Funding relay payload contracts (Stripe → GHL → Mini CRM)

### 4.1 Trigger config in GHL
Build a workflow per client (or a master workflow) triggered on:
- **Payment Received / Invoice Paid** → emit `FUNDED`
- **Payment Failed** → emit `FUNDING_FAILED`
- **Refund** → emit `REFUND`
- **Dispute/Chargeback** (if surfaced) → emit `DISPUTE`
For recurring clients, ensure the trigger fires on **every** successful charge, not just the first.

### 4.2 Example POST /api/ghl/funding body
```json
{
  "event_type": "FUNDED",
  "ghl_event_id": "evt_abc123",
  "location_id": "loc_clientA",
  "ghl_contact_id": "cont_789",
  "ghl_opportunity_id": "opp_456",
  "payment_ref": "ghl_invoice_or_stripe_ref",
  "amount_collected": 999.00,
  "currency": "USD",
  "contract_type_hint": "MONTHLY_RECURRING",
  "occurred_at": "2026-06-29T17:04:00Z",
  "mini_crm_agent_id": "agt_22",
  "originating_agent_id": "agt_22",
  "mini_crm_client_account_id": "ca_1001"
}
```

### 4.3 Mini CRM processing
```text
verify signature + idempotency
  → resolve client_account by location_id / mini_crm_client_account_id
  → FUNDED:
       create commission_ledger entry from amount_collected (actual, not invoiced)
       apply commission_plan_version, set status PENDING → hold per plan
       update client_health.last_successful_payment, status HEALTHY
  → FUNDING_FAILED:
       account health = PAYMENT_FAILED; create servicing task + alert
  → REFUND / DISPUTE:
       affected commission → ON_HOLD (never auto-clawback); resolve on outcome (scope §17.7)
```

### 4.4 Optional read-only Stripe reconciliation (Phase 2+)
Keep Stripe as event origin via GHL. If audit-grade accuracy is later required, add a read-only Stripe check that confirms each relayed FUNDED event against the Stripe charge ID. Not required for v1.

---

## 5. Appointment & opportunity payloads (abridged)
```json
// POST /api/ghl/appointments
{
  "event_type": "APPOINTMENT_NO_SHOW",
  "ghl_event_id": "evt_...",
  "location_id": "loc_clientA",
  "ghl_contact_id": "cont_789",
  "ghl_appointment_id": "appt_321",
  "starts_at": "2026-07-01T19:00:00Z",
  "mini_crm_lead_id": "lead_555",
  "mini_crm_agent_id": "agt_22"
}
```
Handling: map to lead/booking, update status, fire recovery-queue logic for cancel/no-show, preserve original booking-agent credit on reschedule.

---

## 6. Sync model summary
```text
Mini CRM  --(API v2, on demand / on handoff)-->  GHL     [create + stamp custom fields]
GHL       --(workflow Custom Webhook, real-time)-->  Mini CRM   [events: appt / opp / invoice / funding]
Stripe    --(native, inside GHL)-->  GHL  --(relay)-->  Mini CRM  [funding truth]
Agents    --(never)-->  GHL          (Mini CRM is the only agent surface)
```

---

## 7. Build order (maps to scope Phases)
```text
Phase 1: Private Integration Token + handoff write (create contact/opp/appt + custom fields)
         Inbound appointment webhooks + idempotency + error queue
Phase 2: Funding relay (FUNDED / FAILED / REFUND / DISPUTE) → commission ledger
         Client health + servicing tasks driven by relayed events
Phase 3: GHL integration health tile, funding reconciliation widget, webhook replay tooling
Phase 4: (optional) read-only Stripe verification, relationship intelligence
```

---

## 8. Open setup checklist
```text
[ ] Confirm Private Integration available on the agency plan; generate token (scoped).
[ ] Decide: per-location webhooks vs one master workflow.
[ ] Create the custom fields in GHL (table in §3) across client locations (or via template).
[ ] Define per-location signing secret + store in secret manager.
[ ] Stand up the 4 inbound endpoints with signature + idempotency.
[ ] Build the GHL recurring-payment workflow so every charge emits FUNDED.
[ ] Configure error queue + Webhook Logs monitoring.
[ ] Test against a GHL sandbox sub-account + Stripe test mode before live client locations.
```


---

## 9. Booking & Calendar Mechanics (Google Meet via free Gmail — no Workspace needed)

### 9.1 Decision (confirmed 2026-06-30)
GHL's Google Calendar + Google Meet integration works with a **free Gmail** (`mcd@gmail.com`). Google Workspace is **not** required to host the demo calendar or generate Meet links. Workspace stays an optional later upgrade for company email identity/deliverability — it is **not** a launch blocker for booking demos. This supersedes the Workspace recommendation in master scope §35 *for the calendar/Meet host specifically*; the dedicated-identity rationale in §35 still applies to outbound/company email whenever you choose to do it.

### 9.2 One-time GHL setup
```text
1. Connect mcd@gmail to GHL (Settings → Integrations → Google, or My Profile → Calendar Settings).
2. Create a GHL Calendar "MCD Demo" (Event / Service / Round-robin as needed).
3. Set the user-availability meeting location = Google Meet (this is what auto-generates Meet links).
4. Assigned user = you (mcd) OR a single "MCD Booking" service user — NOT per-agent GHL users.
5. Calendar → Forms & Payment tab → enable Add Guests (collect guest name + email) so the
   booking agent can be attached as a guest.
6. Notifications: enable Contact, Guests, Users, and Additional Emails so host/agent/client all get invited.
```

### 9.3 The booking call (Mini CRM → GHL API, agent never logs into Google or GHL)
The Mini CRM holds the GHL connection server-side. When an agent clicks "Book demo":
```text
Mini CRM → GHL API v2: create appointment on the mcd-connected calendar
  contact        = client (primary invitee)
  guest          = agent email (via Add Guests)
  custom fields  = mini_crm_agent_id, originating_agent_id, set_pricing_tier
  → GHL generates a unique Google Meet link on mcd@gmail's calendar
  → calendar invite + Meet link emailed to: host (mcd), agent (guest), client (contact)
```
The app is the only thing that "acts as you." Agents hold no Gmail or GHL credentials.

### 9.4 What fires after booking
```text
Appointment booked
  → GHL workflow (trigger: Customer Booked Appointment)
  → Create/Update Opportunity (e.g. stage = Demo Booked), assigned per your rule
  → run post-booking automation (reminders, prep emails, internal notifications)
  → emit APPOINTMENT_BOOKED webhook → Mini CRM (confirm DEMO_BOOKED, store ghl_* IDs)
```

### 9.5 Guardrails
```text
- Do NOT share the mcd@gmail password with agents. Sharing exposes your full inbox/calendar,
  removes the audit trail of who booked what, and triggers Google multi-location login flags.
- mcd@gmail (or the service user) HOSTS the Meet; the agent and client are guests/attendees.
- Keep the appointment's GHL "assigned user" as you or the service user; carry the real agent
  identity in custom fields + the guest email — never as a per-agent GHL login.
- Round-robin later = a small pool of service users, still no per-agent GHL logins.
- Free Gmail is sufficient for calendar + Meet volume here; revisit Workspace only for
  company email deliverability, not for booking.
```
