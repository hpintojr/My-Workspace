---
type: problems
date: 2026-06-29
project: MCD CRM - Agent and Admin Portals
---

## Goal
Build Mercury Call Desk's secure Mini CRM — an Agent portal and an Admin portal — that runs pre-demo prospecting, agent workflow, compliance, client servicing, and commission accounting, with GoHighLevel wired in as a one-way backend that feeds booking, payment/funding, and servicing data into the CRM without ever exposing GHL (and Hamilton's other clients and true pricing) to agents.

## Why
Agents must never have direct GHL access — if they did, they would see all of Hamilton's other clients, his real wholesale pricing instead of the set partner pricing, and the full pipeline. The Mini CRM is the compliance and access-control layer that keeps GHL private while still giving agents everything they need to source, book, and service deals. It is also the system of record for source/ownership/commission lineage so residuals and payouts are always defensible.

## Tangible Outcomes
- Updated master product scope (v1.1) with a full GHL-as-backend section, Stripe-via-GHL funding relay, and added UX/architecture recommendations.
- A standalone GHL backend integration spec: event catalog, webhook contracts, custom-field mapping, and the agent-attribution model that needs no GHL logins.
- A data-flow diagram showing GHL ⇄ Mini CRM ⇄ Stripe.
- A decision + steps for a dedicated mercurycalldesk@ email/Workspace account separate from hpintojr@gmail.com.
- A clear answer on whether to set up each agent as a GHL staff user (recommendation: no — represent them as data, not logins).

## Open Problems
1. Confirm GHL plan API access and generate a Private Integration Token scoped to the right sub-accounts.
2. Decide the funding-status contract: GHL relays Stripe "payment received / failed / refund" events to the Mini CRM via workflow Custom Webhook, so the CRM commission engine fires on verified collected payments without a direct Stripe integration in v1.
3. Lock the agent-attribution model in GHL (custom fields + assigned owner strategy) so bookings credit the right Mini CRM agent without giving agents GHL logins.
4. Stand up the dedicated mercurycalldesk@ account and re-point the GHL calendar/email integration off Hamilton's personal Gmail without losing existing bookings.
5. Define the inbound webhook endpoints, signature/secret verification, and idempotency keys on the Mini CRM side.
6. Sequence the build against the scope's Phase 1–4 plan; GHL backend lands in Phase 1 (booking handoff) and Phase 2 (funding/servicing relay).

## Related project
This is the build project for **MCD - Mercury Call Desk** (the sales-partner program). See `02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md` for the program/onboarding context. Keep confidential pricing, commission math, and scripts out of anything agent-facing.


## Onboarding & Knowledge Base (added 2026-06-30)
The CRM reuses the existing Mercury Call Desk agent-onboarding library (`02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/`) as the single source of truth. Those files do double duty: the agreements, NDA/IP, W-9/payout, and New Hire Acknowledgment become registration gates; the Certification Scorecard becomes a manager-signed gate that flips a `can_claim_leads` flag (an agent can be ACTIVE but still blocked from live leads until certified); the Manager New Hire Checklist becomes the admin activation screen; and Welcome/Product/ICP/Scripts/CRM SOP/Compliance/Demo plus the collateral become the NDA-gated knowledge base and training modules. Full mapping, data model, and confidentiality gating: `[C] Agent Registration, Knowledge Base & Training Integration.md`. Do not fork the source files — the CRM ingests/publishes versions.
