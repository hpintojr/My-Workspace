# [C] 2026-08-31 MCD CRM Frozen and Sales Knowledge Base Refresh

## What I changed

- Read the DIAL CLUB Discord (#faq) thread "Has anyone built their own dialer setup?" (Hamilton's own browser, logged in as hpintojr) as a reference point for the MCD sales knowledge base, per Hamilton's request.
- Reviewed crm.sulus.ai (location 6R986ILIQydGAU4T1l74) — a near-empty GoHighLevel white-label instance (4/14 setup steps done, 0 contacts) that Hamilton intends as the destination CRM, replacing the custom hpintojr/crm.mcd build.
- Asked Hamilton to scope this session via a clarifying question; he chose "docs + scripts only, for now" and "freeze new work on the old CRM now."
- Updated via GitHub MCP (hpintojr/My-Workspace, branch main):
  - `02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/07_CRM_SOP.md` — added Section 9 (call disposition log, `NEW OBJECTION` feedback tag).
  - `02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/06_OUTBOUND_CALL_SCRIPT.md` — added a Voicemail Script and a Quick-Reference Objection table.
  - `02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/16_KNOWLEDGE_BASE_AND_CALL_REVIEW.md` — new file recording the Discord source material and what it changed / did not change.
  - `02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/DocumentSystemIndex.md` — added a pointer to the new doc.
  - `02 Projects/MCD - Mercury Call Desk/MCD - Mercury Call Desk Overview.md` — added a "Recent updates" note covering both changes above.
  - `02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md` — added a "FROZEN — 2026-08-31" note.
  - `02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md` — updated the lock block to reflect the freeze; added a freeze note ahead of the authorized-work list.
  - `CLAUDE.md` — added an UPDATE 2026-08-31 pointer inside the existing "MCD CRM — current state" section only. The Protected Workspace Command Registry section was not touched.

## Evidence

- Discord thread content captured live via get_page_text on the authenticated thread URL.
- crm.sulus.ai dashboard state captured via get_page_text (0 contacts, 4/14 getting-started steps, 0 opportunities).
- Each file write went through GITHUB_CREATE_OR_UPDATE_FILE_CONTENTS against hpintojr/My-Workspace with the current blob SHA (fetched immediately before writing) so no concurrent edit was overwritten.

## Still open

- The CRM migration itself (scoping GHL pipelines/custom fields/dispositions against MCD's lead-flow rules, deciding what happens to the 50 live production leads, a cutover date) has not started — Hamilton chose docs-only for this session.
- Draft PR #139 (Stripe Connect readiness) on crm.mcd remains open, unmerged, undeployed. Not touched; no decision made on whether it's still relevant post-migration.
- Whether MCD's DNC/data-handling rules (CRM SOP Sections 5 and 7) need explicit re-review against the new disposition/`NEW OBJECTION` note habit — it's a documentation practice, not a new data flow, so none was done, but flagging it.

## Start here next

- If Hamilton wants the CRM migration scoped: start by reading `02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md`, `LOCK.md`, and this log, then have Hamilton define migration scope/sequencing before any GHL configuration work begins.
- If Hamilton wants more knowledge-base content pulled from Discord (other channels/threads), start from `16_KNOWLEDGE_BASE_AND_CALL_REVIEW.md`.

## Handback

- Lock holder: claude (unchanged); scope is now FROZEN per LOCK.md. No PR opened, no application code touched, no production system touched.
