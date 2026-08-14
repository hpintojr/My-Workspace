# [C] 2026-07-11 MCD CRM PR96 — Controlled Warm Reply Simulation

## What I changed

Shipped `hpintojr/crm.mcd` PR #96, a guarded admin feature unblocking deferred acceptance item 14 (Warm Reply Triage), per Hamilton's explicit direction: "i want true admin features in the future so make the small guarded code change."

Six files, one commit, one PR:

- New `src/lib/controlled-warm-replies.ts`: `simulateControlledWarmReply()` loads the Lead, asserts `isControlledTestLead`, non-suppressed, non-DNC, and unowned, then in a `$transaction` writes a `NOTE_ADDED` `LeadActivity` sourced `GHL_INBOUND_REPLY`, a `LeadNote` (`Inbound (controlled test simulation): ...`), and an `AuditLog` entry (`LEAD_CONTROLLED_TEST_WARM_REPLY_SIMULATED`).
- `src/app/admin/leads/controlled-test-data/page.tsx`: new `simulateWarmReplySchema` (zod), new `simulateWarmReply` server action (admin-role gated), and a new per-lead "Simulate inbound reply (warm-reply triage test)" form, rendered only when `!lead.suppressed && !lead.ownerAgentId`.
- New `scripts/check-controlled-warm-reply-guard.ts` guard script (7 `assertContains` assertions across the new lib file, the page, and the deployment-verification guard-line list).
- `src/lib/lead-deployment-verification.ts`: version bumped to `2026-07-11-pr96`; appended 13th guard line `"Controlled warm reply guard passed."` to `EXPECTED_LEAD_FLOW_GUARD_LINES`.
- `scripts/check-deployment-verification-guard.ts`: mirrored the same new line in its own local `expectedGuardLines` array (this file has its own duplicated copy by design).
- `package.json`: appended `&& tsx scripts/check-controlled-warm-reply-guard.ts` to `check:lead-flow-alignment`, and added a standalone `check:controlled-warm-reply-guard` script.

## Evidence

- Branch `agent/controlled-warm-reply-simulation` committed via `GITHUB_COMMIT_MULTIPLE_FILES` off `main` at `ee8119e2`, commit `8fe8792d2731fe04218b47b85686dc1fa14a5c43`.
- PR #96 opened, all 4 required checks green: Vercel Preview Comments (success), policy-check / Commission Policy (success), build / Application Build (success), Typecheck and contract guards / Verify CRM (success). `mergeable_state: "clean"`.
- Squash-merged to `main`. GPG-verified merge commit `b6984858be64da1ea1798a3fa5e991b052658024`.
- Vercel production deployment `dpl_CMKKTtz99gU1GMRsfvNPCeGgdZNf` reached `READY`, aliased to `crm.mercurycalldesk.com` (plus `crm-mcd.vercel.app` and team aliases). `meta.githubCommitSha` matches.
- `GET /api/status` on `crm.mercurycalldesk.com` confirmed `commitSha: b6984858be64da1ea1798a3fa5e991b052658024`.
- **Live smoke test**: on `/admin/leads/controlled-test-data`, submitted "Simulate inbound reply" on the existing controlled test Lead "MCD Appointment Scenario Test" (id `cmrgsamd00000jt04otntxcxk`) with note "Sounds good, can we do Thursday at 2pm? (PR96 acceptance smoke test)". Verified on `/admin/leads/replies`: the Lead now appears in the Warm Reply Triage queue with lifecycle "Demo booked", the exact note text rendered ("Inbound (controlled test simulation): Sounds good, can we do Thursday at 2pm? ..."), and a working "Assign active agent" / "Assign and create callback" form — confirming the new NOTE_ADDED activity is correctly picked up by the existing, unmodified eligibility query in `assignWarmReply`.

## Still open

- The 45-day timer / full `assignWarmReply` claim flow was not exercised end-to-end (that would create a real agent assignment on a controlled test Lead — low risk, but I stopped short of clicking "Assign and create callback" since Hamilton didn't ask for that step specifically). Recommend a quick follow-up smoke test if he wants full closure on item 14.
- Item 14 (Warm Reply Triage) can now be marked functionally verified with real evidence, alongside items 4, 8, 15, 16 from the deferred list. All 5 deferred acceptance items now have real evidence on their respective pages; Hamilton's own attestation is still the only thing outstanding for formal acceptance sign-off.
- Two pre-existing data-integrity bugs (stale "Latest production commit" on `/admin/leads/acceptance-overview` and `/admin/leads/acceptance-runbook/deferred`, plus a text-concatenation rendering bug on that page's "Deferred 2" card) are still unaddressed — flagged to Hamilton earlier, no direction received yet on whether to fix.

## Start here next

- If Hamilton wants full closure on item 14: use the now-populated Warm Reply Triage queue to run `assignWarmReply` once against an active agent and confirm the 45-day `openPoolReleaseAt` timer and `LeadClaimEvent`/`AuditLog` writes.
- Otherwise: await Hamilton's direction on the two stale-commit / rendering bugs, or on any new priority.

## Handback

Holder remains `claude`. No ChatGPT handback occurred this session — this was a same-session Claude PR authorized directly by Hamilton.

## Safety boundary

Only operates on Leads matching `controlledTestLeadWhere` (synthetic 555 phone numbers, `source: MCD_CONTROLLED_TEST_DATA`, campaign markers that block GHL export by default). Never calls GHL. Never touches real customer/prospect records. No schema changes, no migrations, no feature-flag changes, no Servicing/Commissions/Finance/payout/client-onboarding activation.
