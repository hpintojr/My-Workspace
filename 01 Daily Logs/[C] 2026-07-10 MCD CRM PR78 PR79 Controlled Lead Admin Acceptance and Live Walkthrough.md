---
type: daily-log
date: 2026-07-10
project: MCD CRM - Agent and Admin Portals
author: Claude
---

# 2026-07-10 — MCD CRM PR #78 + PR #79 + Live Authenticated Production Acceptance Walkthrough

## Summary

Claude held the execution lock from 2026-07-10T07:28Z through this session. Two
narrowly-scoped PRs shipped and the live authenticated production acceptance
walkthrough on crm.mercurycalldesk.com progressed to 12 PASS + 5 deferred + 1
owner-only. Handed the lock to ChatGPT at end of the session so coding can
continue while Claude usage refreshes.

## PR #78 — Admin acceptance-operator on controlled test Leads (disposition path)

- Head commit merged.
- Diff:
  - `src/lib/lead-workspace.ts::activeAgent()` now accepts either an AGENT
    user (unchanged path) or an ADMIN_ROLES user on a Lead that passes
    `isControlledTestLead(targetLead)`. For the ADMIN path it looks up or
    auto-provisions an "Acceptance Operator (<ROLE>)" Agent with
    `canClaimLeads: true` so the admin can act on the Lead without a manual
    Agent seed. `logColdLeadCallInitiated`, `logColdLeadDisposition`, and
    `suppressLeadForDnc` all pass `{ leadId: parsed.leadId }` down.
  - `src/app/portal/leads/page.tsx` added `id="cold-lead-review"` +
    `scroll-mt-6` on the selected Cold Lead detail section. The three
    open/review/disposition anchors point at `#cold-lead-review` so the
    operator lands on the detail instead of scrolled at the top of the page.
  - `scripts/check-lead-flow-alignment.ts` gained six `assertContains` lines
    protecting the controlled-Lead admin path and the anchor.
- Safety boundary: no Prisma schema changes, no Neon migrations, no feature-flag
  changes, no GHL workflow activation, no live GHL API calls, no live
  import/export submission, no real-Lead business-rule changes, no
  Servicing/Commissions/Finance/payout/client-onboarding activation.
- CI: all four required checks green (Vercel Preview Comments, policy-check,
  Typecheck and contract guards, build).

## PR #79 — Admin acceptance-operator on controlled test Leads (claim path)

- Head commit `fbbaf5bbb6c40bc17122b63a32d4ca952fa6df33`; squash merge
  `860c0e94310546dc7603b49f3495e99e4e6365d9`.
- Diff:
  - `src/lib/claims.ts::claimAvailableLead()` replaced the unconditional
    `if (ADMIN.includes(actor.role)) throw new Error(...)` with a branch that
    only fires when the target Lead is not controlled test data. Real
    production Leads still throw "Use reassignment controls for manager lead
    assignment." for ADMIN roles. Controlled test Leads fall through to the
    existing agent + `canClaimLeads` + capacity + claim path using the
    acceptance-operator Agent auto-provisioned in the disposition step.
    Imports isControlledTestLead from `@/lib/controlled-test-leads`.
  - `scripts/check-lead-flow-alignment.ts` gained three `assertContains`
    lines protecting the new claims.ts changes.
- Safety boundary: same as PR #78. The only Lead business-rule change is a
  narrowly-scoped admin permission on controlled test Leads only.
- CI: all four required checks green.
- Vercel: initial production build for `860c0e94` failed with generic
  "Deployment has failed" (transient — preview passed on the identical
  source). Hamilton clicked Redeploy in the Vercel dashboard and the retry
  succeeded at 2026-07-10T22:12:57Z. Production commit
  `860c0e94310546dc7603b49f3495e99e4e6365d9` is now live.

## Live authenticated production acceptance — Hamilton on crm.mercurycalldesk.com

- Controlled test Lead exercised: `cmrepsdug0004ii040m00sjs1` ("MCD Controlled
  Lead Test", 555-010-0934). Auto-provisioned Agent "Acceptance Operator (OWNER)".
- Recorded outcomes:
  - **PASS (12)**: step 1 (custom domain HTTPS), step 2 (protected routes
    redirect to /login), step 3 (unauthenticated /api/cron/leads/aging returns
    401), step 5 (Lead pool state visible via acceptance-overview /
    acceptance-history), step 6 (Cold Lead workspace at /portal/leads),
    step 7 (click-to-call logs activity BEFORE dialer opens, button flips to
    "Activity logged — dialer opened", no ownership created), step 9
    (no-answer disposition — Lead stayed Cold / Available / unowned), step 10
    (callback-requested disposition — twoWayContactAt set, Lead moved to
    NURTURE / NURTURING, Claim panel unlocked), step 11 (45-day claim —
    ownerAgentId set, claimedAt + openPoolReleaseAt set, Lead moved to
    "My active records" with Claimed badge and Next action Jul 11 12:00 PM),
    step 12 (DNC blackout — Lead immediately removed from My active records
    and Cold workspace, admin controlled-Lead panel shows Nurture / Suppressed
    and Archived, active-count went 1 -> 0, archived-count went 0 -> 1, GHL
    export stayed blocked by MCD_CONTROLLED_TEST_NO_GHL_EXPORT), step 13
    (My Workspace shows assigned records, callback queue, recent activity),
    step 17 (aging-preview dry-run mutationPerformed:false with expected
    counts).
  - **Deferred (5)**: step 4 (Vercel runtime logs — Hamilton to inspect on
    Vercel dashboard), step 8 (Cold Lead second call attempt — same Lead can
    be re-called; skipped in favor of the two-way-contact path), step 14
    (Warm Reply Triage 45-day timer — no live warm reply on hand), step 15
    (GHL appointment via controlled harness), step 16 (GHL opportunity via
    controlled harness).
  - **Owner-only (1)**: step 18 (owner production decision).
- Immutable audit trail: each PASS step wrote a
  `LEAD_PRODUCTION_ACCEPTANCE_RECORDED` event on the acceptance board.

## Handoff at end of session

Claude handed the execution lock to ChatGPT at 2026-07-10T22:20Z. Scope
unchanged from the previous ChatGPT window: read-only pages under
`/admin/leads/…`, read-only API GET endpoints, navigation links between
existing admin surfaces, guard extensions, anchor IDs, printable / matrix /
summary views. Full "Not authorized" list still applies (no Prisma schema,
Neon migrations, feature flags, GHL activation, live imports, Lead
business-rule changes, Servicing/Commissions/Finance activation, no
credentials in commits, no root-cause claims without direct evidence).
Authenticated production acceptance remains Hamilton-only.

## References

- crm.mcd PR #78 diff and squash merge.
- crm.mcd PR #79 https://github.com/hpintojr/crm.mcd/pull/79 — commit fbbaf5b -> squash 860c0e94.
- Production commit: 860c0e94310546dc7603b49f3495e99e4e6365d9 on crm.mercurycalldesk.com.
- Vercel prod deploy retry succeeded 2026-07-10T22:12:57Z.
- Controlled test Lead: cmrepsdug0004ii040m00sjs1.
