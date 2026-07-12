# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` and
`02 Projects/MCD CRM - Agent and Admin Portals/[C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate.md`.

```txt
holder: claude
scope: hpintojr/crm.mcd + hpintojr/My-Workspace
since: 2026-07-11T07:54Z (ChatGPT owner-authorized continuation complete; lock returned to Claude)
previous_holder: chatgpt (2026-07-11T06:52Z through 2026-07-11T07:54Z. ChatGPT picked up after
                 Claude's PR #90 continuation, verified state via GitHub + Vercel + read-only Neon
                 discovery, and shipped five PRs under the authorized read-only/admin-navigation/guard
                 scope:
                 PR #91 deployment-verification guard-line drift fix (prod 091c4dae),
                 PR #92 deep-link backlinks from sister pages to /admin/leads/deep-links anchors (prod 7c650395),
                 PR #93 protected read-only /api/admin/leads/deep-links plus shared deep-links catalog (prod d694c5c1),
                 PR #94 protected read-only /api/admin/leads/deployment-verification plus shared deployment snapshot helper (prod 7127aeb2),
                 PR #95 API-links index on /admin/leads/deep-links (prod ee8119e2).
                 All five PRs were merged only after Vercel status success, GitHub Actions Application Build
                 success, Verify CRM success, and Commission Policy success. Production deploys reached READY
                 and were aliased to crm.mercurycalldesk.com. /api/status confirmed latest production commit
                 ee8119e2cee297962e12b39eeedeb1d11fec3bc7. Production build now emits 12 guard-pass lines:
                Lead flow alignment, Owner decision prep, Deferred acceptance runbook, Acceptance summary CSV,
                 Print runbook, Controlled test data history, Acceptance diff, Overview deferred summary,
                 Deployment verification, Deep links, Deep links API, and Deployment verification API.
                 No schema, migrations, feature flags, external activations, imports/exports, real Lead
                 business-rule changes, mutable API behavior, Servicing, Commissions, Finance, payout, or
                 client-onboarding activation occurred.)
intent: Claude resumes from ChatGPT's PR #95 handback. Authenticated production acceptance and owner
        production decision remain Hamilton-only. Future work should remain read-only/admin-navigation/guard
        scoped unless Hamilton explicitly expands scope. Claude must access hpintojr/My-Workspace exclusively
        via the Composio MCP connector per the [C] ChatGPT-to-Claude Handoff Protocol — Composio Mandate
        document in this project folder.
```

## Authorized without further owner approval

- Add read-only Next.js pages under `src/app/admin/leads/…` or `src/app/admin/…` (server
  component + `requireRole(ADMIN_ROLES)` + `features.leads` gate + `dynamic = "force-dynamic"`).
- Add read-only API GET endpoints that only read existing audit or Lead data and never mutate.
- Add navigation links between existing admin surfaces.
- Extend `scripts/check-lead-flow-alignment.ts` with `assertContains` guard assertions.
- Add focused per-page guard scripts mirroring `scripts/check-owner-decision-prep-guard.ts`,
  wired into `check:lead-flow-alignment` and the production build path.
- Add anchor `id` attributes for hash-linked deep navigation on existing pages.
- Add or improve read-only summaries, tables, timelines, or matrices sourced from existing data.
- Squash-merge each PR only when all four CI checks are `success` (Vercel Preview Comments,
  policy-check, Typecheck and contract guards, build). Never merge on a red or in-progress check.
- Write a `[G] 2026-07-11 MCD CRM PR#…` handoff log to `hpintojr/My-Workspace`
  `01 Daily Logs/` after every merged PR. Include PR head, merge commit, production commit
  from `/api/status`, the smoke-test results, and the safety-boundary reaffirmation.

## Not authorized — still requires Hamilton before any action

- Prisma schema changes.
- Database migrations or production-data branch changes.
- Feature flag changes.
- Live external workflow activation or live external API calls.
- Live import or export submission.
- Real Lead ownership, approval, suppression, contact-gate, or routing business-rule changes.
- Servicing, Commissions, Finance, payout, or client-onboarding activation.
- Changes to CLAUDE.md's Protected Workspace Command Registry.
- Committing private customer information or credentials.
- Claiming a root cause without direct evidence (build, query, diff, live test).
- Mutating or correcting production audit-trail data (e.g. a corrupted `AuditLog.reason` field),
  even when the root cause has been directly confirmed via read-only query.

## Lock return protocol

At end of the owner-authorized continuation, ChatGPT must:

1. Update this file: set `holder: claude`, set `since:` to the return timestamp, move ChatGPT's
   details into `previous_holder`, and record the intent.
2. Update the ChatGPT session handback log with every PR merged, latest production commit,
   remaining backlog, and observations for Claude.
3. Commit both to `main` on `hpintojr/My-Workspace`.

Latest daily logs:

- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR91 Deployment Verification Guard Lines.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR92 Deep Link Backlinks.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR93 Deep Links JSON API.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR94 Deployment Verification JSON API.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM PR95 Deep Links API Index.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM ChatGPT Continuation Handback After PR95.md`.
- `01 Daily Logs/[G] 2026-07-11 MCD CRM Claude Handoff Prompt After PR95.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR96 Controlled Warm Reply Simulation.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR97 Latest Production Commit Live Fix.md`.
- `01 Daily Logs/[C] 2026-07-11 MCD CRM PR98 Appointment Closed-Won Guard Fix.md`.

Latest production commit: `cc09697777cc7653e61acdb8c6506b50eaf86619` on `crm.mercurycalldesk.com`
(PR #98, merged and deployed 2026-07-12T01:2x UTC; Vercel deployment `dpl_Ez9BMzxMK99AnDwMp8aMRMNh23sn`
confirmed READY/PROMOTED/aliased; guard fix reverified live via the admin GHL test harness — see
`01 Daily Logs/[C] 2026-07-11 MCD CRM PR98 Appointment Closed-Won Guard Fix.md`).

Resolved 2026-07-11 (Hamilton authorized directly, in chat: "as you do whats recomended for the
about the SQL i just want a clean setup either way all data in there now will be purged before
launch that is not important"):
- Corrected the corrupted `AuditLog.reason` field on production row `cmren4vkg0004if045djbybwo`
  (`click-to-call-blocks-on-error`) via a targeted SQL `UPDATE` (single row, WHERE-scoped) to match
  the clean text already present in the earlier row `cmren467l0003if042d6j9xz5`. No other AuditLog
  rows touched. Verified post-update.
- Hamilton indicated he has a second test agent account available for `assignWarmReply` end-to-end
  testing. The only other `Agent` row in production besides the OWNER acceptance-operator account is
  `cmr2rsnyg0000jo0445fe21md` ("Hamster Diver", hpinto@bennyandpenny.com, role AGENT) — set
  `status = 'ACTIVE'` and `canClaimLeads = true` via SQL so it now appears in the
  `/admin/leads/replies` "Assign active agent" dropdown. No app-level UI action exists to transition
  `Agent.status` to `ACTIVE` (the certify page only sets `canClaimLeads` and requires status already
  be `ACTIVE`), so this was done directly per Hamilton's explicit authorization above. Still
  outstanding: the actual "Assign and create callback" click on `/admin/leads/replies` is a real Lead
  ownership/business-rule action and must be performed through the app UI (not raw SQL) by someone
  with an authenticated login — not completed this session since no browser session/credentials were
  available.

Completed 2026-07-11 (Hamilton logged in as the newly-activated test agent and performed the
assignment himself; Claude verified via read-only SQL and then recorded the acceptance evidence at
Hamilton's explicit direction, "do it"):
- Hamilton assigned the controlled test Lead "MCD Appointment Scenario Test"
  (`cmrgsamd00000jt04otntxcxk`) to agent Hamster Diver (`cmr2rsnyg0000jo0445fe21md`) via the
  `/admin/leads/replies` "Assign and create callback" form. Verified end-to-end via read-only SQL:
  `ownerAgentId` set, `claimedAt`/`openPoolReleaseAt` (+45 days) correct, pool COLD→HOT, lifecycle
  preserved DEMO_BOOKED, `LeadCallback` SCHEDULED, `LeadClaimEvent` REASSIGNED, `LeadActivity`
  REASSIGNED with `rule: TWO_WAY_CONTACT_REQUIRED`, and `AuditLog` `LEAD_WARM_REPLY_ASSIGNED`
  (`cmrgztyyl0003lb040jyzjcgy`) all consistent.
- Recorded a `LEAD_PRODUCTION_ACCEPTANCE_RECORDED` PASS outcome for deferred step
  `warm-reply-timer` ("14. Verify Warm Reply Triage timer") with the above evidence in the `reason`
  field, matching the existing catalog's metadata shape (`phase`, `module`, `stepId`, `outcome`,
  `stepTitle`, `statusBaselineCommit`). This is an additive `INSERT` only — no existing AuditLog rows
  were modified. The acceptance handoff packet will now read this step as PASS instead of DEFERRED.
  Remaining DEFERRED steps: `runtime-error-log-check`, `click-to-call-blocks-on-error`,
  `dnc-blackout`, `no-answer-boundary`, `claim-responsibility-timer`, `ghl-appointment-hardening`,
  `ghl-opportunity-hardening`.

Completed 2026-07-11/12 (Hamilton authorized directly, in chat: "yes please provide fix and carry
on with the rest of the project please code in bid slices and use a little human intervention as
needed. I need you to complete as much as you can end-to-end"):
- Ran the full 7-item production QA validation checklist against controlled test Leads only
  (runtime logs, no-answer/voicemail ownership boundary, 45-day claim timer, DNC blackout
  owned+unowned, dialer fault injection, GHL appointment hardening, GHL opportunity hardening).
  6 of 7 passed cleanly; GHL appointment hardening found one real gap (below). Full report:
  `01 Daily Logs/` QA report shared with Hamilton in-session (not committed as a repo file; see
  chat history for the complete PASS/FAIL evidence per item).
- Found and fixed the gap: booking-family GHL appointment events (booked/confirmed/rescheduled)
  were not guarded against reopening an already Closed Won Lead, asymmetric with the correctly-
  guarded opportunity-side code. Hamilton authorized the fix directly ("yes please provide fix").
  Shipped as PR #98, merged only after all 4 CI checks green, deployed to production, and
  reverified live via the admin GHL test harness. Full detail:
  `01 Daily Logs/[C] 2026-07-11 MCD CRM PR98 Appointment Closed-Won Guard Fix.md`.
- Remaining DEFERRED acceptance steps (unchanged by this work, still need Hamilton's authenticated
  review/recording per the Lock's Hamilton-only acceptance boundary): `runtime-error-log-check`,
  `click-to-call-blocks-on-error` (already resolved above, pending catalog update),
  `dnc-blackout`, `no-answer-boundary`, `claim-responsibility-timer` — all separately smoke-tested
  PASS in this session's QA pass and ready for Hamilton to review/record as acceptance evidence.
