# [C] 2026-07-11 MCD CRM ChatGPT Handoff Prompt After PR #90

## Purpose

This file preserves the exact handoff prompt Hamilton can give ChatGPT after Claude completed the 2026-07-11 owner-authorized continuation (four PRs merged and deployed).

## Current state

- Latest shipped PR: `hpintojr/crm.mcd` PR #90 — Deep-links hub for read-only acceptance surfaces.
- Latest production commit: `7020d5bdfda99553a5a1c0fcfd542938e3cff21c`.
- Production deployment: `dpl_BvgEeV4Yjeeqhb9wC9YHgL7V6Wbk`.
- Production domain verified: `crm.mercurycalldesk.com`.
- `/api/status` should report production/main at `7020d5bd…`.
- `/admin/leads/deep-links` resolves to the sign-in boundary unauthenticated, not 404/500.
- Session close daily log commit: `bf274b50e571a3997cb0ab0fe083ce88fd496336`.
- Handoff protocol doc commit: `1a70979008c8cfc2c7bdcc6f3cda0bdeb076e1cb`.

## Handoff prompt for ChatGPT

```text
ChatGPT, pick up the MCD CRM workspace from the latest Claude handback.

Start by reading:
- `hpintojr/My-Workspace :: 02 Projects/MCD CRM - Agent and Admin Portals/LOCK.md`
- `hpintojr/My-Workspace :: 02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`
- `hpintojr/My-Workspace :: 01 Daily Logs/[C] 2026-07-11 MCD CRM Claude Session Handback for ChatGPT.md`
- `hpintojr/My-Workspace :: 01 Daily Logs/[C] 2026-07-11 MCD CRM PR90 Deep Links Hub and Session Close.md`

Current lock state:
- Holder should be `chatgpt`.
- Latest production commit should be `7020d5bdfda99553a5a1c0fcfd542938e3cff21c` on `crm.mercurycalldesk.com`.

What Claude shipped most recently (2026-07-11 session, all merged and deployed):
- PR #87 added 5 focused guard scripts (deferred acceptance runbook, acceptance summary CSV, print runbook, controlled test data history, acceptance diff) mirroring the PR #86 owner-decision-prep pattern. Prod commit 7799e5cc.
- PR #88 added a read-only "Deferred blockers" summary section on `/admin/leads/acceptance-overview` sourced from getLeadAcceptanceDeferredRunbook(). Prod commit f4b0d0a0.
- PR #89 added a new read-only page `/admin/leads/deployment-verification` surfacing Vercel runtime env vars + expected build-time guard-pass lines. Prod commit 34e4d664.
- PR #90 added a new read-only hub page `/admin/leads/deep-links` with 9 stable hash anchors (#owner-decision-prep, #acceptance-diff, #deferred-runbook, #print-runbook, #controlled-test-data-history, #acceptance-overview, #acceptance-handoff, #deployment-verification, #acceptance-board). Prod commit 7020d5bd.

Evidence for PR #90 (most recent):
- Vercel Preview Comments: green.
- policy-check: green.
- Typecheck and contract guards: green.
- build: green.
- Production deployment `dpl_BvgEeV4Yjeeqhb9wC9YHgL7V6Wbk` reached READY and aliased to `crm.mercurycalldesk.com`.
- `/api/status` reports production/main at `7020d5bdfda99553a5a1c0fcfd542938e3cff21c`.
- Production build logs emit 10 `… guard passed.` lines (Lead flow alignment / Owner decision prep / Deferred acceptance runbook / Acceptance summary CSV / Print runbook / Controlled test data history / Acceptance diff / Overview deferred summary / Deployment verification / Deep links).

Safety boundary that remained in force across all four PRs:
- Read-only / admin-navigation / guard scope only.
- No runtime page or API behavior changes on existing surfaces beyond additive read-only sections.
- No schema, no Neon migrations, no production-data branch changes.
- No feature-flag changes.
- No live external workflow activation, no live external API calls.
- No live import/export submission.
- No real Lead claim / DNC / ownership / approval / suppression / two-way-contact business-rule changes.
- No Servicing / Commissions / Finance / payout / client-onboarding activation.
- No secrets or credentials committed.

Still outstanding:
- Authenticated production acceptance: 12/18 PASS, 5 deferred, 1 owner-only. All Hamilton-only.
- The five deferred steps (runtime error log check, click-to-call blocks on error, warm reply timer, GHL appointment hardening, GHL opportunity hardening) still need Hamilton/operator recording using the new read-only surfaces.
- Owner production decision (step 18) is Hamilton-only.
- 13-layer hardening backlog: preview/prod DB + secret separation, RLS + runtime DB role, error tracking, Neon compute autoscaling, GitHub Actions CI enforcement, login smoke test.
- Repo visibility: currently public. Hamilton flipped it during Claude's session to unblock the private-repo Actions minute cap. If Hamilton wants private again without paying, options are: wait for monthly Actions cycle reset, remove any failed payment method, or trim workflow minutes-per-PR (e.g., move `build` to `main`-only).
- Continue only within the authorized read-only / admin-navigation / guard scope unless Hamilton explicitly expands scope.

Recommended next safe work, if Hamilton says to keep coding without expanding scope:
- Add hash-anchor deep links on the sister pages (owner-decision-prep, acceptance-diff, deployment-verification) that link into `/admin/leads/deep-links#<slug>` sections, mirroring the pattern established in PR #90.
- Add read-only JSON API endpoints for the two pages that currently only render HTML (`/api/admin/leads/deep-links`, `/api/admin/leads/deployment-verification`), so external tools can consume the same data.
- Add a workflow-trim PR under `.github/workflows` that moves the heavy `build` job to `main`-only and keeps `policy-check` + `Typecheck and contract guards` on PR events; roughly halves Actions minute burn without changing pre-merge safety.
- Do not merge anything unless Vercel Preview Comments, policy-check, Typecheck and contract guards, and build are all green.
- After any merge, verify production with `/api/status`, smoke-test protected routes for the sign-in boundary, write a `[G]` daily log for the PR AND a `[G]` continuation handback log at the end of the window, update LOCK.md holder back to `claude` at the end of the window with the previous_holder paragraph completed, and post the Claude paste-in prompt in a new `[G] YYYY-MM-DD MCD CRM Claude Handoff Prompt After PR<N>.md`.
```

## Notes

This file is informational only and does not change the CRM app or production state. When ChatGPT completes its continuation and returns the lock to Claude, it should follow the mirror rules in `[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md` — including verifying that the `[G] YYYY-MM-DD MCD CRM ChatGPT Continuation Handback <N>.md` filename it references in LOCK.md actually exists on `main` before committing.
