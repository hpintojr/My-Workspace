# Execution Lock Review — MCD CRM

> **Purpose:** This is a review companion to `LOCK.md`. It preserves the official lock snapshot, records temporary owner-authorized exceptions, and gives Claude one place to accept, reject, or formalize handoffs.
>
> **Authority:** `LOCK.md` remains the only execution lock. This file cannot grant, revoke, or override that lock, and it does not bypass GitHub, Vercel, Neon, or other platform safeguards.

## Official lock snapshot

**Source:** `LOCK.md` at Git blob `113b197a46c5b646133678648616170fb0767146`  
**Snapshot captured:** 2026-07-07

```md
# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: crm.mcd (+ mcd_lead_ops)
since: 2026-07-06T22:45Z
intent: production is fixed and stable; next is PR #30 rebase + merge + first live lead import
```

To take the lock you must be handed it in writing by the current holder. Default holder is Claude.
```

## Review overlay — pending Claude confirmation

```txt
official holder / primary architect: Claude
official lock state: unchanged
review state: pending Claude review
owner-authorized temporary exception: Hamilton authorized ChatGPT on 2026-07-06 after Claude reached a session limit before recording the intended handoff.
exception scope: Phase D reconciliation and branch-only PR preparation for crm.mcd.
exception expiry: when Claude records acceptance, rejection, or a formal next handoff in LOCK.md and the daily log.
```

### What ChatGPT completed under the temporary exception

- Read-only reconciliation of current production, PR #30, Vercel, and production Neon.
- Verified the prior admin/portal hang was the sibling dynamic-route collision already fixed in production by PR #31 / `f338cc4`.
- Verified production Neon already contains the Phase D batch-import schema. No import batch, import row, or Lead existed at inspection.
- Added the missing internal Neon schema-ledger record for the pre-existing Phase D schema. No Phase D table, index, enum, or application data was changed.
- Opened replacement **PR #32** from branch `chatgpt/phase-d-reconciled-20260706`.
- Prepared PR #32 with the Phase D changes plus reviewed corrections:
  - batch approval promotes `VALID` rows to `APPROVED` before import;
  - submit-time duplicates do not inflate `insertedCount`;
  - duplicate reporting excludes suppressions and validation rejects;
  - conflicting replay identities are rejected before upload writes;
  - signed empty-body batch-status GET is supported;
  - build now rejects sibling Next.js dynamic-route collisions.
- Latest reviewed PR #32 head: `aff208f4eb50414ea3842f30ddd9e80108404529`.
- Latest Vercel status for that PR head: success.

### Boundaries while this review is pending

ChatGPT may continue only when Hamilton directly requests it, and only through an isolated branch or pull request for Claude to review.

```txt
Allowed: code review, test additions, documentation, branch-only implementation, preview validation,
read-only Neon/Vercel verification, and PR comments.

Not allowed: merge to main, production deployment, production setting changes, secret provisioning or exposure,
live lead imports, destructive data actions, or a permanent transfer of the execution lock.
```

These boundaries preserve Claude as the primary architect and final production decision-maker.

## Claude review checklist

Claude should update this section and `LOCK.md` after reviewing:

```txt
[ ] Review PR #32 diff and Vercel preview.
[ ] Confirm whether PR #32 supersedes PR #30.
[ ] Accept, revise, or reject the Phase D workflow corrections.
[ ] Verify that the temporary ChatGPT exception is complete.
[ ] Update LOCK.md intent to the next real production action.
[ ] Merge PR #32 using the approved merge method.
[ ] Confirm the resulting production deployment.
[ ] Verify presence—not values—of LEAD_IMPORT_KEY_ID and LEAD_IMPORT_HMAC_SECRET.
[ ] Complete an authorized MFA test through /admin, /portal, and /admin/servicing.
[ ] Run and log the first supervised approved mcd-leads export.
```

## Current handback record

```txt
Primary architect: Claude
Current code review target: PR #32
Original PR: #30 remains open until PR #32 is formally accepted and merged
Production code status: PR #32 is not merged
Production data status: no live Phase D import has run

Read next:
- 01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation.md
- 01 Daily Logs/[G] 2026-07-06 MCD CRM Phase D Reconciliation Addendum.md
- [C] MCD CRM — Production Scope & 13-Layer Review.md
```

## Synchronization rule

- Update `LOCK.md` only for an actual execution-holder change or a new official lock intent.
- Update this file for review findings, temporary owner-authorized exceptions, PR checkpoints, and Claude’s acceptance/rejection record.
- Every accepted review outcome must be reflected in both this file and the relevant daily log.
- When the review is complete, retain this file as the audit trail; do not delete or overwrite the official lock history.
