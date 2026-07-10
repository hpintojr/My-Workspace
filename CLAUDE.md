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

## Execution ownership — updated 2026-07-10

```txt
Primary executor: Claude (Opus / 5.x). Claude holds the lock by default and does the building.
Other AIs (ChatGPT, Gemini): review and verification only, unless Claude explicitly hands them the lock
in writing via LOCK.md.

Historical note: the 2026-07-06 temporary exception granting ChatGPT limited Phase D reconciliation
authority expired when that recovery session ended. The 2026-07-08 Lead Flow Alignment shipped as PR
#34 by ChatGPT. The 2026-07-09 Lead Acceptance Runbook arc (PR #59-#65) was shipped by Claude. A
2026-07-10 owner-authorized 2h30m continuation window handed the lock to ChatGPT, which shipped PR
#66-#77 (runbook step anchors + acceptance cockpit + visibility pages + cross-links) and returned the
lock to Claude at 2026-07-10T07:28Z with a full handback log. Claude is the current holder as of
this update.
```

## MCD CRM — current state (2026-07-10 late afternoon)

```txt
STATUS: HEALTHY. Production is on crm.mercurycalldesk.com at commit
  860c0e94310546dc7603b49f3495e99e4e6365d9 (main, PR #79 merged, Vercel prod
  deploy succeeded at 2026-07-10T22:12:57Z after one transient prod-build
  failure that Hamilton resolved with Redeploy).

Lead Flow business rules shipped and locked (PR #34, PR #32 chain): activity-first
Cold Lead workspace, click-to-call activity guarantee, no-answer/voicemail stay
unowned, two-way-contact claim gate, 45-day openPoolReleaseAt timer, Warm Reply
Triage 45-day timer, DNC blackout, secured aging cron, Shark Tank promotion, My
Workspace dashboard, GHL appointment/opportunity relay hardening, build guards.

Read-only acceptance visibility and navigation shipped in PRs #59 through #77
(2026-07-09 through 2026-07-10). PR #59-#65 by Claude, PR #66-#77 by ChatGPT
under owner-authorized 2h30m lock window.

PR #78 (Claude, 2026-07-10) fixed the admin acceptance-operator path in
`src/lib/lead-workspace.ts::activeAgent()` so ADMIN_ROLES may record
click-to-call / disposition / DNC on Leads that pass `isControlledTestLead()`
only, and added `id="cold-lead-review"` + scroll-mt anchor on the Cold Lead
review section so Review/Disposition links jump to the detail instead of
leaving the operator scrolled at the top. Guard extended.

PR #79 (Claude, 2026-07-10) applied the same controlled-Lead-only exemption
inside `src/lib/claims.ts::claimAvailableLead()`, replacing the unconditional
ADMIN early-throw with a check that only fires when the target Lead is not
controlled test data. Real production Leads still require an AGENT-role user
with `canClaimLeads: true`; managers still get the reassignment error on real
Leads. Guard extended.

Runbook + step navigation:
  - /admin/leads/acceptance-runbook  — 11-step read-only runbook (PR #59)
  - /admin/leads/acceptance-runbook/checklist — printable checklist (PR #62)
  - Where-to-record matrix on the runbook (PR #65)
  - Stable step-anchor IDs on the runbook (PR #66)
  - Explicit 18-step-to-11-section acceptance mapping (PR #67)

Cockpit and visibility surfaces (all read-only, no mutations):
  - /admin/leads/acceptance-history + CSV export (PR #67)
  - /admin/leads/acceptance-findings + JSON endpoint (PR #68)
  - /admin/leads/acceptance-handoff + JSON endpoint (PR #69)
  - /admin/leads/acceptance-gaps + JSON endpoint (PR #70)
  - /admin/leads/acceptance-matrix + JSON endpoint (PR #71)
  - /admin/leads/acceptance-gates + JSON endpoint (PR #72)
  - /admin/leads/acceptance-overview + JSON endpoint — single cockpit (PR #73)
  - /admin/leads/acceptance — protected alias to the overview (PR #74)

Cross-linking:
  - Runbook link on every admin surface: command center, readiness, operating
    status, audit, Lead review, acceptance command center, acceptance report,
    acceptance board, controlled test data, controlled GHL harness, integration
    monitor (PR #60, #61, #63, #64).
  - Overview link from history, findings, command center, report, board, runbook,
    and Lead review (PR #74-#77).

Guard: scripts/check-lead-flow-alignment.ts is extended to protect every route,
label, and cross-link listed above.

Phase D lead import: 50 production Leads exist, all COLD / AVAILABLE (batch
cmrbj55go0000la04pxcuuaci, run RUN_2026_07_08_e8a9beed). No new imports since PR #34.

CRON_SECRET remains configured in Vercel; unauthenticated /api/cron/leads/aging
correctly returns 401 across preview and production.
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
1. [DONE 2026-07-06] Servicing slug collision fixed (PR #31 / f338cc4).
2. [DONE 2026-07-06] Phase D reconciliation PR #32 merged (route fix + approval/duplicate/inserted/replay).
3. [DONE 2026-07-08] Lead Flow Alignment shipped (PR #34, merge commit 487ff615).
   50 production Leads corrected to COLD / AVAILABLE; audit evidence recorded.
4. [DONE 2026-07-09] Read-only acceptance runbook tooling complete (PR #59-#65).
5. [DONE 2026-07-10] Acceptance cockpit + visibility pages complete (PR #66-#77 by ChatGPT
   under owner-authorized lock window; production commit a5c33b1c).
6. [DONE 2026-07-10 late afternoon] PR #78 + PR #79 — narrowly-scoped admin acceptance-operator
   permissions on controlled test Leads only, in both the workspace disposition path and the
   claim path. Fixed the Cold Lead review scroll anchor. Production commit 860c0e94.
7. [IN PROGRESS] AUTHENTICATED PRODUCTION ACCEPTANCE — Hamilton-only. Live progress recorded
   during 2026-07-10 afternoon walkthrough on crm.mercurycalldesk.com:
     PASS  (12): step 1 (custom domain), 2 (protected routes), 3 (cron 401 auth),
                 5 (Lead pool state), 6 (Cold workspace), 7 (click-to-call activity),
                 9 (no-answer disposition), 10 (callback-requested / two-way contact),
                 11 (45-day claim), 12 (DNC blackout), 13 (My Workspace), 17 (aging-preview).
     Deferred (5): 4 (Vercel runtime logs), 8 (Cold Lead second call attempt),
                   14 (Warm Reply Triage timer), 15/16 (GHL harness).
     Owner-only (1): 18 (owner production decision).
   Steps 7-12 were executed on a live controlled test Lead
   (`cmrepsdug0004ii040m00sjs1`) through the entire lifecycle: activity → two-way
   contact → claim → DNC + archive. Selected findings and audit trail are
   preserved in immutable LEAD_PRODUCTION_ACCEPTANCE_RECORDED events.
8. [NEXT] Record the deferred steps and the owner production decision when Hamilton is ready.
9. [NEXT] After acceptance passes: 13-layer hardening backlog — preview/prod DB and secret
   separation, RLS/runtime DB role, error tracking, Neon autoscaling/backup review, login
   smoke test. Scope with Hamilton before starting.
10. [NEXT] Backlog items #38-#41 remain unscoped.
```