# 2026-07-11 — MCD CRM PR#97 — Live "Latest Production Commit" Fix

## What I changed

Shipped and merged PR #97 on `hpintojr/crm.mcd`: `getLeadAcceptanceHandoffPacket()` in
`src/lib/lead-acceptance-handoff.ts` now sources `latestProductionCommit` from
`getLeadDeploymentVerificationSnapshot().commitSha` (the existing live, runtime-derived
`VERCEL_GIT_COMMIT_SHA` snapshot) instead of the hardcoded
`LEAD_ACCEPTANCE_FINDINGS_LATEST_PRODUCTION_COMMIT` constant in `src/lib/lead-acceptance-findings.ts`.

This fixes the bug I flagged after PR96 shipped: `/admin/leads/acceptance-overview` and
`/admin/leads/acceptance-runbook/deferred` were both still showing the pre-PR96 commit
(`6c24a25b...`, pinned in PR #68) even after PR96 had deployed to production, because that
constant only updates when someone manually bumps it. It goes stale on every merge unless someone
remembers to edit it.

This also fixes a second, related bug I found while investigating: `/admin/leads/acceptance-diff`'s
"Findings catalog production marker" row compared `packet.latestProductionCommit` against that
exact same hardcoded constant — a tautology that could only ever report `MATCH`. Now that the two
sides are sourced independently (one live, one pinned), that row will actually detect drift for the
first time.

`LEAD_ACCEPTANCE_FINDINGS_LATEST_PRODUCTION_COMMIT` itself is untouched — it remains a valid,
intentionally-pinned baseline for that diff check. `LEAD_STATUS_BASELINE_COMMIT` is also untouched
(intentional fixed baseline, not a live value).

Changes:
- `src/lib/lead-acceptance-handoff.ts`: live-sourced `latestProductionCommit`, packet version bumped
  to `2026-07-11-pr97`.
- New `scripts/check-latest-production-commit-guard.ts`: asserts the live-sourcing wiring is present
  and asserts the old hardcoded assignment is gone.
- `src/lib/lead-deployment-verification.ts`: version bump to `2026-07-11-pr97`, appended 14th
  expected guard line "Latest production commit guard passed."
- `scripts/check-deployment-verification-guard.ts`: mirrors the new guard line.
- `package.json`: wired the new guard script into `check:lead-flow-alignment` and added a standalone
  `check:latest-production-commit-guard` script.

## Evidence

- PR head: `fix/pr97-live-latest-production-commit` (5 commits).
- Merge commit (squash): `ea0f6e1125b9a5b2811eff15076ddc3e88225652` on `main`.
- CI: Vercel (success), and all 3 GitHub Actions checks (build, Verify CRM/typecheck, Commission
  Policy) reported `success` before merge — confirmed via `GITHUB_GET_THE_COMBINED_STATUS_FOR_A_SPECIFIC_REFERENCE`
  and `GITHUB_LIST_CHECK_SUITES_FOR_A_GIT_REFERENCE` on the PR head SHA. Merged only after all were green.
- Production deploy of the squash commit confirmed `success` via the same combined-status check
  against `main` at `ea0f6e1125b9a5b2811eff15076ddc3e88225652`.
- The new guard script's `assertNotContains` check ran as part of the production build's
  `check:lead-flow-alignment` step (which gates `next build`); the build succeeding is direct
  evidence the stale hardcoded line is gone from the shipped source.
- Did not perform an interactive browser login to click-through `/admin/leads/acceptance-overview`
  this session — no active authenticated session/credentials were available in this browser context,
  and entering a password into a login field is outside what I'll do on Hamilton's behalf regardless.
  Recommend Hamilton (or a future session with an active login) load
  `/admin/leads/acceptance-overview` and `/admin/leads/acceptance-diff` to visually confirm the
  displayed commit now matches `ea0f6e1125b9a5b2811eff15076ddc3e88225652` and that the "Findings
  catalog production marker" row now reads `CATALOG_CHANGED` (expected/correct, since the pinned
  catalog constant is older than the live commit).

## Still open (not touched this session, escalating for a decision)

Separately from PR97: the garbled text on the "Deferred 2" card (`click-to-call-blocks-on-error`)
on `/admin/leads/acceptance-runbook/deferred` is **not a code bug**. Direct read-only SQL against
the production `AuditLog` table (Neon, project `jolly-lab-80341970`) confirms the stored `reason`
string on row `cmren4vkg0004if045djbybwo` is itself corrupted: two separate step-notes were spliced
together mid-word at write time by an earlier recording action (likely ChatGPT's PR #66/#67 work).
A clean, correct version of that same note exists in an earlier row (`cmren467l0003if042d6j9xz5`,
2026-07-10T07:54:45Z).

This is a production audit-data correction, not a code change, and touches the immutable audit
trail — outside what I'll do unilaterally per the lock's "committing... claiming a root cause
without direct evidence" caution (I now have direct evidence, but the more relevant boundary here is
not mutating production audit data without Hamilton's decision). Options for Hamilton: (a) leave the
corrupted row as historical record and rely on the clean row that already exists, (b) write a new
corrective/superseding `LEAD_PRODUCTION_ACCEPTANCE_RECORDED` audit entry with the clean note, or (c)
directly correct the malformed `reason` field via SQL. I have not touched this row.

Also separately: the `assignWarmReply` flow (PR96's feature) is fully shipped and smoke-tested for
the parts that don't require an ACTIVE agent, but cannot be exercised end-to-end in production right
now because zero Agents are currently at `ACTIVE` status (confirmed via read-only SQL: 2 Agents
exist, both at `APPROVED`, which is an earlier lifecycle stage). This is a real onboarding/business
action outside my scope — flagging for Hamilton rather than fabricating an agent-activation path.

## Start here next

1. Hamilton's decision on the corrupted AuditLog `reason` field remediation (see above).
2. If desired, activate at least one Agent to `ACTIVE` status to allow full end-to-end
   `assignWarmReply` smoke testing.
3. Otherwise, no further action required — PR97 is merged and live.

## Handback

Lock remains with `claude`. No handback needed this session.

## Safety boundary

Read-only computed-value sourcing change only. Does not mutate Leads, audit records, feature flags,
GHL workflows, imports, exports, commissions, payouts, finance, client onboarding, or business rules.
No production data was written or altered this session; the corrupted AuditLog row was read-only
queried, not modified.
