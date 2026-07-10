# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: chatgpt
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-10T22:20Z (owner-authorized continuation while Claude usage refreshes)
previous_holder: claude (2026-07-10 afternoon session shipped PR #78 and PR #79 and drove
                 the live authenticated production acceptance walkthrough on
                 crm.mercurycalldesk.com. PR #78 fixed src/lib/lead-workspace.ts::activeAgent()
                 so ADMIN_ROLES may record click-to-call, disposition, and DNC on Leads that
                 pass isControlledTestLead() only, auto-provisioning an
                 "Acceptance Operator (<ROLE>)" Agent with canClaimLeads:true. Same PR added
                 id="cold-lead-review" + scroll-mt-6 on the Cold Lead detail section and updated
                 the open/review/disposition anchors. PR #79 applied the same controlled-Lead-only
                 exemption to src/lib/claims.ts::claimAvailableLead(). Real production Leads still
                 throw the original manager-reassignment error. Guard extended in both PRs.
                 Live acceptance walkthrough on production recorded PASS for steps 1, 2, 3, 5,
                 6, 7, 9, 10, 11, 12, 13, 17 through immutable
                 LEAD_PRODUCTION_ACCEPTANCE_RECORDED events. Deferred with operator notes:
                 steps 4, 8, 14, 15, 16. Owner-only remaining: step 18 (owner production
                 decision). Controlled test Lead cmrepsdug0004ii040m00sjs1 exercised end-to-end
                 Cold -> activity -> two-way contact -> claim -> DNC + archive. All required CI
                 green on both PRs; PR #79 production deploy required one Vercel Redeploy after
                 an initial transient prod-build failure. Latest production commit:
                 860c0e94310546dc7603b49f3495e99e4e6365d9.)
intent: ChatGPT resumes the lock for the next coding window under the same "Authorized without
        further owner approval" scope below. Authenticated production acceptance and the owner
        production decision remain Hamilton-only. Return the lock to Claude at end of window
        with a full handback log per the Lock return protocol.
```

## Authorized without further owner approval

- Add read-only Next.js pages under `src/app/admin/leads/…` or `src/app/admin/…` (server
  component + `requireRole(ADMIN_ROLES)` + `features.leads` gate + `dynamic = "force-dynamic"`).
- Add read-only API GET endpoints that only read `db.auditLog` / `db.lead` and never mutate.
- Add navigation links between existing admin surfaces.
- Extend `scripts/check-lead-flow-alignment.ts` with `assertContains` guard assertions.
- Add anchor `id` attributes for hash-linked deep navigation on existing pages.
- Add or improve read-only summaries, tables, timelines, or matrices sourced from existing data.
- Squash-merge each PR only when all four CI checks are `success` (Vercel Preview Comments,
  policy-check, Typecheck and contract guards, build). Never merge on a red or in-progress check.
- Write a `[G] 2026-07-09 MCD CRM PR#… …` handoff log to `hpintojr/My-Workspace`
  `01 Daily Logs/` after every merged PR. Include PR head, merge commit, production commit
  from `/api/status`, the smoke-test results, and the safety-boundary reaffirmation.

## Not authorized — still requires Hamilton before any action

- Prisma schema changes.
- Neon migrations or Neon branch mutations that touch production data.
- Feature flag changes.
- Live GHL workflow activation or live GHL API calls.
- Live import or export submission.
- Lead claim, DNC, ownership, approval, suppression, or two-way-contact business-rule changes.
- Servicing, Commissions, Finance, payout, or client-onboarding activation.
- Changes to CLAUDE.md's Protected Workspace Command Registry.
- Committing secrets, credentials, customer data, SSNs, tax IDs, or raw bank data.
- Claiming a root cause without direct evidence (build, query, diff, live test).

## Lock return protocol

At end of the owner-authorized continuation, ChatGPT must:

1. Update this file: set `holder: claude`, set `since:` to the return timestamp, move ChatGPT's
   details into `previous_holder`, and record the intent.
2. Update the ChatGPT session handback log with every PR merged, latest production commit,
   remaining backlog, and observations for Claude.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily log: `01 Daily Logs/[C] 2026-07-10 MCD CRM PR78 PR79 Controlled Lead Admin Acceptance and Live Walkthrough.md`.
Latest production commit: `860c0e94310546dc7603b49f3495e99e4e6365d9` on `crm.mercurycalldesk.com`.