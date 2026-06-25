---
author: claude
type: daily
date: 2026-06-25
project: MCD - Mercury Call Desk
---

# Session Log — MCD: Owner Setup locked, agreement blanks filled

## What We Worked On
- Captured Hamilton's Owner Setup answers and propagated them into the agreement, comp docs, and CRM SOP.
- Aligned the CRM SOP to the live GoHighLevel pipeline.
- Drafted an MCP config template and a sales-calendar setup plan.

## Decisions Locked
- **Entity:** sole proprietorship — Hamilton Pinto Jr. dba Mercury Call Desk.
- **Emails:** hello@ (apply/general), support@, sales@ mercurycalldesk.com; apply also via Instagram @hpintojr. Phone (909) 276-7631 (interim → AI assistant).
- **Sales manager / owner:** Hamilton.
- **Commission trigger:** cleared first payment · **residuals:** net-15 after collection · **annual:** after funds clear · **clawback:** 90 days · **lead reassignment:** 7 days · **post-separation residuals:** cease at termination · **splits:** manager case-by-case.
- **Legal:** governing law California · termination 14 days (immediate for cause) · binding arbitration, **no** 30-day opt-out · keep 3-month non-compete in draft (with CA-unenforceability warning).

## What Was Built or Changed
- `[C] Owner Setup & Open Decisions.md` — rewritten with confirmed brand/sales-ops/comp/legal values + open items; added a **California non-compete warning** (§16600 / AB 1076 / SB 699 — likely unenforceable in CA; rely on confidentiality + non-solicit).
- Sales Partner Agreement — filled parties (sole prop), CA governing law/venue, commission trigger/timing, clawback 90d, reassignment 7d, 14-day notice, post-termination residuals cease, Exhibit A trigger/timing block.
- `03_COMPENSATION` — payout rules finalized (no longer a checklist).
- `07_CRM_SOP` — pipeline stages aligned to the live GHL pipeline (New Lead → Initial Contact Made → Demo Scheduled → Demo Completed → 2nd Demo & Review → Estimate Sent (Enterprise) → Closed Won/Lost).
- `02-crm-gohighlevel/[C] MCP Config Template.md` — claude_desktop_config.json templates (remote + stdio) + the GHL location id (lEdLVFW0uqKMhmkgFrsX); needs server name/URL/auth to finalize.
- `02-crm-gohighlevel/[C] Sales Calendar Setup Note.md` — plan to move scheduling off hpintojr@gmail to a dedicated MCD/Workspace account and relink to GHL.
- AI Index updated.

## Still Open
- Attorney review (CA non-compete, arbitration, 1099). 
- Sales/demo calendar: create dedicated account → relink to GHL → add booking links to Owner Setup + templates.
- MCP: send server name + URL/command + auth so I can produce the exact config block.
- Per-agent enclosed GHL environment (Hamilton + AE). Branding (logo/colors), minimum-activity target, escalation channel.
- Confirm GHL location id lEdLVFW0uqKMhmkgFrsX = Mercury Call Desk sub-account.

## Start Here Tomorrow
Agreement is essentially fill-complete (pending county + effective date + attorney review). Next: stand up the dedicated calendar + booking links, or finalize MCP access so Claude can help configure GHL directly.
