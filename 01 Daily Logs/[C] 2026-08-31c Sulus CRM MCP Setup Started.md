# [C] 2026-08-31c Sulus CRM MCP Setup Started

## What I changed

- Continued the same day's session (see `[C] 2026-08-31 MCD CRM Frozen and Sales Knowledge Base Refresh.md` and `[C] 2026-08-31b MCD Call Recording Downloads and Transcript Synthesis.md`). This leg covers the start of connecting Claude to the new crm.sulus.ai CRM.
- Investigated crm.sulus.ai (location `6R986ILIQydGAU4T1l74`) via Hamilton's logged-in Chrome session. Corrected an earlier assumption: **this is not GoHighLevel.** It is a separate, custom-built platform called "Sulus CRM," white-labeled with the Mercury Call Desk brand. The existing `MCD-ghl-mcp` / `LSP-ghl-mcp` MCP connectors in this session are for a different, actual GoHighLevel backend and are unrelated to crm.sulus.ai.
- Found Sulus CRM has no built-in MCP server. It exposes a scoped REST API under Settings → Integrations → API Keys, with independent Read/Write toggles for Contacts, Conversations, Calendars, Tasks, Opportunities, Invoices, Estimates, Campaigns, and a Webhooks-manage scope, plus a "Test mode" toggle.
- Agreed the path forward is to build a custom MCP connector against that REST API using Cowork's plugin builder (`create-cowork-plugin` skill), rather than expecting a ready-made connector.
- Hamilton generated an API key himself directly in Sulus CRM (I did not create it or see its value).
- Sent Hamilton an elicitation form asking: whether Sulus has written API docs (or whether I should reverse-engineer the endpoints), which permission scopes he actually granted the key, what he wants to be able to do through the MCP once built, and a plugin name preference. Also asked him, separately, to paste the API key value directly in chat when ready — I do not enter API keys into web forms myself.
- Hamilton then invoked `/end-of-day` before answering the form, asking to pause here until he has the API docs/link in hand.

## Evidence

- `get_page_text` and screenshots captured from crm.sulus.ai's Integrations page and the "Create API Key" modal, showing the platform name ("Sulus CRM"), the full permission-scope list, and confirming no MCP/API-docs link exists on that page.
- No GitHub commits this leg beyond this log — no plugin files were created yet, since the design questions (API doc source, granted scopes, use cases) are still unanswered.

## Still open

- The Sulus CRM MCP plugin is not built. Blocked on Hamilton providing: (1) API documentation, if it exists, or confirmation there is none so the endpoints get reverse-engineered instead; (2) which scopes he actually granted the API key he already created; (3) the API key value itself; (4) what he wants the MCP to do (which of contacts/conversations/calendars/opportunities/tasks/etc. matter most); (5) a plugin name, or confirmation to default to `sulus-crm`.
- The elicitation form asking the above was sent but not yet answered when the session paused.
- CRM migration scoping itself (mapping MCD's lead-flow rules onto Sulus, deciding what happens to the 50 live production leads in the old system, a cutover date) has still not started — this leg only got as far as tooling access, not migration planning.

## Start here next

- When Hamilton returns with the API key and whatever documentation Sulus provides (or confirms there is none), resume the `create-cowork-plugin` flow at Phase 3 (Design & Clarifying Questions) using his elicitation-form answers, then build and package the `sulus-crm` (or renamed) MCP plugin.
- Read this log plus `[C] 2026-08-31 MCD CRM Frozen and Sales Knowledge Base Refresh.md` for the full same-day context before touching CRM migration scope.

## Handback

- Lock holder: claude (unchanged). No production system, CRM data, or repo files beyond this log were touched this leg. The in-progress plugin work lives in the Cowork plugin-builder scratch space, not in `hpintojr/My-Workspace` — nothing there to commit yet.
