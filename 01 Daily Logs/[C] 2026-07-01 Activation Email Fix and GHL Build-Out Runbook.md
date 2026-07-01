---
type: daily-log
date: 2026-07-01
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# MCD CRM — Activation email fix + GHL build-out runbook

## Code review: Slice 03 (GHL document webhook)

Reviewed `/api/ghl/documents/route.ts`, `ghl-webhook.ts`, `activation.ts`, `invite-delivery.ts`. Webhook mechanics (timing-safe secret check, location allowlist, idempotency, four-gate + countersignature check, audit logging) are solid. Found two real issues:

1. **Activation links were never delivered.** `createActivation()` generated the token/URL correctly, but it only appeared in the raw JSON response returned to the GHL webhook caller and an audit-log entry tagged `delivery: "webhook-response-stub"`. No email send existed anywhere in the codebase (`EMAIL_ACCESS_TOKEN` was defined but unused), and there was no admin UI to view/copy an agent's activation link either. Net effect: an agent could complete all onboarding docs, get fully provisioned in the database, and have no way to actually receive their activation link.
2. **`triggerPortalInvite()` in `invite-delivery.ts` was dead code** — defined but never called anywhere.
3. Lower-priority: a concurrency race where two document-completion webhooks landing close together for the same agent could both reach the "create user" step and throw on the email unique constraint.

## GHL investigation

Connected the GHL MCP (`prod-ghl-mcp`) and checked the live "Mercury Call Desk" location (`lEdLVFW0uqKMhmkgFrsX`) directly:
- No custom-field-creation or workflow-creation API available through this MCP (only read/tag/update on existing fields/contacts) — building the GHL-tag delivery route would require Hamilton manually creating a custom field + a tag-triggered workflow in the GHL UI.
- No MCD-specific custom fields, tags, or email templates exist in the location yet.
- `.env.example` already had `EMAIL_SMTP_HOST`/`EMAIL_IMAP_HOST` stubbed for the IONOS mailbox — confirming the originally intended design was direct SMTP send, not a GHL detour.

## Fix shipped (`D:\GitHub\crm.mcd`)

- `src/lib/mail.ts` — SMTP sender via `nodemailer`, fails safe (no-ops instead of throwing) if credentials aren't configured.
- `src/lib/emails/activation-email.ts` — activation email subject/text/HTML.
- `src/app/api/ghl/documents/route.ts` — sends the activation email after provisioning, records real delivery status (`smtp-sent` / `smtp-not-configured` / `smtp-failed`) in the audit log, no longer echoes the raw activation URL in the webhook response (was leaking a bearer credential into GHL's webhook logs), and handles the two-webhooks-race case gracefully instead of 500ing.
- `.env.example` / `src/lib/env.ts` — added `EMAIL_SMTP_PORT`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`.
- `package.json` — added `nodemailer` + `@types/nodemailer`.
- Sandbox has no npm registry access, so `npm install`/`npm run typecheck` couldn't be run here — checked the diff by hand (balanced braces, valid JSON) but a real compiler pass is still needed locally before the next deploy.

Hamilton created the `no-reply@mercurycalldesk.com` IONOS mailbox and set `EMAIL_SMTP_USER`/`EMAIL_SMTP_PASSWORD`/etc. in Vercel (reusing the same token as `EMAIL_ACCESS_TOKEN` for the password).

## GHL Production Build-Out Runbook

Wrote `02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Production Build-Out Runbook.md` — everything needed to build out the GHL side, derived from the actual deployed webhook contracts (not just the spec docs):

- **Phase 1 (required now):** the onboarding e-sign workflow — trigger = tag `agent-approved` (already applied automatically when Hamilton clicks Approve in the Mini CRM admin), sends 4 documents via GHL Documents & Contracts, fires a Custom Webhook per document completion to `/api/ghl/documents`. Includes the exact JSON body, the `x-mcd-webhook-secret` header, a full AI-workflow-builder prompt, and a flagged footgun: `countersigned: true` must only be sent on the Sales Partner Agreement's completion call.
- **Phase 1.5 (before enabling lead/demo booking):** `mcd@gmail.com` calendar/Meet setup + an appointment-relay workflow to `/api/ghl/appointments`.
- **Phase 2 (before enabling commissions/servicing/finance):** 4 new custom fields (`mini_crm_lead_id`, `mini_crm_agent_id`, `originating_agent_id`, `mini_crm_client_account_id`) plus funding/opportunity/invoice relay workflows — all three endpoints exist today but only record-and-no-op since their feature flags are off.
- A full tag registry (`agent-signup`, `agent-approved`, and confirmation that `mcd-portal-invite` is now dead code — don't build a workflow for it).
- A phased master checklist and a list of open items (E-sign system of record is effectively locked to GHL Documents & Contracts by the current code; attribution custom fields don't exist yet).

## Workspace updated

- `02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md` — open problems updated (Private Integration Token confirmed done, IONOS mailbox done, webhook endpoints done; GHL workflow build-out is now the open item, pointing to the runbook).
- `README.md` and `00 [C] Workspace Index.md` — MCD CRM sections updated with the new runbook, corrected next actions (the stale "remove bootstrap config" item was already done as of this morning).
- `CLAUDE.md` — MCD CRM open-problems paragraph updated; added an "Activation email (fixed 2026-07-01)" note so future sessions don't rediscover the same gap.

## Next actions

```txt
1. Hamilton: run npm install + npm run typecheck locally on crm.mcd before the next deploy (sandbox had no registry access to verify the SMTP change).
2. Build the Phase 1 GHL workflow ("MCD - Agent Onboarding Documents") per the runbook.
3. Run the runbook's end-to-end test plan with a throwaway signup.
4. mcd@gmail.com calendar/Meet setup (Phase 1.5) whenever ready to enable lead/demo booking.
5. Delete invite-delivery.ts / triggerPortalInvite() on the next cleanup pass.
```
