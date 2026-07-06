# My Workspace — AI Assistant Context

Read in order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/<active project>/… Overview.md
[C] AI Operating Protocol — Handoff, Changelog, Indexing.md   <-- READ THIS BEFORE TOUCHING ANY REPO
```

## Non-negotiable operating rules

```txt
1. This GitHub repo (hpintojr/My-Workspace) is the single source of truth. Edit it ONLY through the
   GitHub connector/MCP (API). Never through the local D:\GitHub\My Workspace folder.
2. Before doing ANY work on a project repo, read that project's Overview + the AI Operating Protocol.
3. ONE executor holds the lock at a time (see the Operating Protocol). Others may read/verify, not commit.
4. Never claim a root cause you have not proven with direct evidence (a build, a query, a diff, a live test).
5. Never commit secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
6. Use [C] in Claude-authored files. ChatGPT-authored logs use [G]. Provenance must be visible at a glance.
```

## Protected Workspace Command Registry — LOCKED

**Owner:** Hamilton Pinto Jr.  
**Status:** Locked on 2026-07-06  
**Purpose:** These are persistent workspace workflow commands. They are plain-language prompts, not terminal commands.

### Change-control rules

```txt
- Do not delete, rename, replace, narrow, or change the meaning of any command in this registry unless Hamilton explicitly requests that exact command change.
- Project status updates, daily-log updates, scope rebuilds, and assistant handoffs must never overwrite or remove this registry.
- Keep the slash form and the natural-language aliases working together.
- Match commands case-insensitively. Treat spaces and hyphens as equivalent where the meaning is clear.
- A command does not bypass an execution lock. If the assistant is not the lock holder, it may read, verify, report, and prepare a proposed log or change, but may not commit, deploy, merge, run migrations, or change settings.
- When changing CLAUDE.md for any other reason, preserve this entire section verbatim unless Hamilton explicitly directs otherwise.
```

| Canonical command | Accepted aliases | Required behavior |
|---|---|---|
| `/setup` | `setup` | Review or establish the workspace structure, source-of-truth files, project folders, overviews, and first task list. |
| `/new-project` | `new project` | Gather the project goal, context, desired outcome, known blockers, and next action; then create or propose a project overview and initial task list. |
| `/good-morning` | `good morning`, `/goodmorning`, `/goodmoring` | Read the required workspace context, relevant latest daily logs, and active project overviews. Return a concise morning brief: current status, blockers, top priorities, and the best next action. Do not change anything unless separately directed. |
| `/end-of-day` | `end of day`, `/wrap-up`, `wrap up` | Capture the session so the next assistant can continue cold. Follow the Daily Log and Handback requirements in the AI Operating Protocol. If not the lock holder, prepare the log content without committing it. |
| `/update-workspace` | `update workspace` | Reconcile the latest verified work into the relevant daily log, project overview, workspace index, and other authoritative planning files. Preserve this locked command registry. |
| `/check-todos` | `check todos` | Review active task lists and current blockers; identify stale items, reorder by real dependency and urgency, and recommend the next actions. |
| `/start <project>` | `start <project name>` | Read that project's overview, current log, and required operating docs. Return the project’s current state, active blocker, and next actions before doing work. |
| `/where-did-we-leave-off` | `where did we leave off?` | Reconstruct the latest verified state from the newest daily log, project overview, and relevant incident or handoff records. Clearly label what is done, open, and next. |
| `/help` | `help`, `what can you do?` | Show the available workspace workflows and ask which project or command should be used. |

### Command output standard

```txt
- Be direct, concrete, and action-oriented.
- Use the workspace and project documents as the source of truth.
- Separate proven facts from hypotheses.
- Respect project boundaries and execution locks.
- Never place credentials, customer data, or other sensitive information into logs or workspace files.
```

## Execution ownership — updated 2026-07-06

```txt
Primary executor: Claude (Opus / 5.x). Claude holds the lock by default and does the building.
Other AIs (ChatGPT, Gemini): review and verification only, unless Claude explicitly hands them the lock
in writing via the lock file. This replaces the 2026-07-03 "Claude paused / ChatGPT execution owner"
arrangement, which caused three days of back-and-forth and duplicated work.

Temporary exception: Hamilton explicitly authorized ChatGPT on 2026-07-06 to perform a limited Phase D
reconciliation because Claude reached its session limit before recording the planned handoff. The connector
blocked the LOCK.md update, so this exception is recorded in:
  01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation.md
It applies only to that recovery session and does not change the default executor rule.
```

## MCD CRM — current state (2026-07-06)

```txt
STATUS: UNBLOCKED. The admin/portal "login/MFA hang" is FIXED in production.
Real cause was NOT auth: it was a Next.js dynamic-route slug collision
(admin/servicing/[id] vs admin/servicing/[clientAccountId]) that hung every server-rendered page,
plus a Vercel Deployment-Protection (SSO) wall that was blocking all *.vercel.app preview URLs.
Both resolved. Full detail + the 13-layer review:
  02 Projects/MCD CRM - Agent and Admin Portals/[C] MCD CRM — Production Scope & 13-Layer Review.md

Phase D database state is verified: LeadImportBatch / LeadImportRow tables, enums, and indexes already
exist on production Neon; no import batch, import row, or Lead exists yet. Replacement PR #32 is the
current reviewed branch; its Vercel preview is READY and no longer reproduces the routing hang.
```

## MCD CRM — the rules that don't change

```txt
MiniCRM is the system of record. GHL is backend-only. Agents never get GHL logins.
Phase 1 partner onboarding is production-validated.
Lead/Task modules stay feature-gated until the lead foundation is live.
Local lead workflow: permitted inputs -> local SQLite staging -> operator review -> signed MiniCRM export.
No local process writes directly to Neon/Postgres.
Permitted lead inputs only: user files, referrals, web forms, PPC leads, licensed provider data,
owned-account exports, permitted business-site research. Scraping adapters are declined and stubbed.
```

## Current next work (authoritative)

```txt
1. [DONE 2026-07-06] Fix servicing slug collision. Merged to production as PR #31 (squash f338cc4).
2. [DONE 2026-07-06] Build and validate replacement Phase D PR #32:
   chatgpt/phase-d-reconciled-20260706 / head c052a1d / Vercel preview READY.
   It includes the route fix plus corrected approval, duplicate-count, inserted-count, and replay behavior.
3. [NEXT] Merge PR #32 using squash. It is mergeable; the ChatGPT GitHub connector safety gate blocked
   the merge attempt, so it remains open. Treat PR #30 as superseded only after #32 merges.
4. [NEXT] Confirm presence (not values) of LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET in the relevant
   Vercel/local environments, then complete a real-account preview login/MFA test for /admin, /portal,
   and /admin/servicing.
5. [NEXT] Run the first supervised, approved `mcd-leads export --run <id>` and log batch ID, final counts,
   Lead/AuditLog evidence, and any reconciliation result.
6. Then the 13-layer cleanup backlog (DB least-privilege/RLS, preview-vs-prod secret separation,
   add a CI check, compute headroom) and backlog items #38-41 — none scoped with Hamilton yet.
```