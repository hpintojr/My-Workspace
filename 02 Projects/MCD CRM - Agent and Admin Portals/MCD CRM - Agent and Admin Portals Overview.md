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
1. ~~Confirm GHL plan API access and generate a Private Integration Token~~ — DONE 2026-07-01: GHL MCP connected and confirmed working against the live "Mercury Call Desk" location (`lEdLVFW0uqKMhmkgFrsX`).
2. Build the actual GHL workflows (documents, appointments, funding, opportunities, invoices) — full spec, exact payloads, and AI-builder prompts for each are now in `[C] GHL Production Build-Out Runbook.md`. Phase 1 (onboarding e-sign workflow) is the only one blocking the end-to-end applicant test.
3. Lock the agent-attribution model in GHL (custom fields + assigned owner strategy) — the 4 attribution custom fields (`mini_crm_lead_id`, `mini_crm_agent_id`, `originating_agent_id`, `mini_crm_client_account_id`) don't exist in GHL yet; needed for Phase 1.5/2 workflows (runbook §3.1).
4. ~~Stand up a dedicated mailbox off Hamilton's personal Gmail~~ — DONE: `no-reply@mercurycalldesk.com` (IONOS) created; activation emails now send directly via SMTP from the Mini CRM (no GHL involvement). mcd@gmail.com for the demo calendar/Meet is still separate and still pending (runbook §2.1).
5. ~~Define the inbound webhook endpoints, signature/secret verification, and idempotency~~ — DONE: all 5 endpoints (`/api/ghl/documents`, `/appointments`, `/opportunities`, `/invoices`, `/funding`) are live in the repo with shared-secret header verification (`x-mcd-webhook-secret`) and idempotency via `webhook_events`. Only the `documents` endpoint does real processing today; the other four record-and-no-op until their feature flags flip.
6. Sequence the build against the scope's Phase 1–4 plan — see the runbook's Phase 1 / 1.5 / 2 breakdown for what's blocking vs. what can wait.

## Related project
This is the build project for **MCD - Mercury Call Desk** (the sales-partner program). See `02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md` for the program/onboarding context. Keep confidential pricing, commission math, and scripts out of anything agent-facing.


## GHL Build-Out & Activation Email (added 2026-07-01)
Code review of Slice 03 found activation links were generated but never delivered (only echoed into the webhook response body, which nothing consumed) — fixed by adding real SMTP send (`src/lib/mail.ts`, `nodemailer`) through the new `no-reply@mercurycalldesk.com` IONOS mailbox; `.env.example`/`env.ts` gained the real `EMAIL_SMTP_*` vars. Also fixed a concurrency race where two simultaneous document-completion webhooks could both try to create the same agent's user row. Connected the GHL MCP and confirmed the live "Mercury Call Desk" location (`lEdLVFW0uqKMhmkgFrsX`) has no MCD-specific custom fields, tags, or templates yet — full build-out plan (exact workflows, tag registry, AI-workflow-builder prompts, and a phased checklist) is in `[C] GHL Production Build-Out Runbook.md`. The old GHL-tag-based activation approach (`invite-delivery.ts` / `triggerPortalInvite()`) is now confirmed dead code, safe to delete on the next cleanup pass.

## Onboarding & Knowledge Base (added 2026-06-30)
The CRM reuses the existing Mercury Call Desk agent-onboarding library (`02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/`) as the single source of truth. Those files do double duty: the agreements, NDA/IP, W-9/payout, and New Hire Acknowledgment become registration gates; the Certification Scorecard becomes a manager-signed gate that flips a `can_claim_leads` flag (an agent can be ACTIVE but still blocked from live leads until certified); the Manager New Hire Checklist becomes the admin activation screen; and Welcome/Product/ICP/Scripts/CRM SOP/Compliance/Demo plus the collateral become the NDA-gated knowledge base and training modules. Full mapping, data model, and confidentiality gating: `[C] Agent Registration, Knowledge Base & Training Integration.md`. Do not fork the source files — the CRM ingests/publishes versions.
