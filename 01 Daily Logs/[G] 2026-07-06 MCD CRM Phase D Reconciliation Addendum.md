---
author: chatgpt
type: daily
date: 2026-07-06
project: MCD CRM - Agent and Admin Portals
repository: hpintojr/crm.mcd
---

# [G] 2026-07-06 — MCD CRM Phase D Reconciliation Addendum

## Added after the initial PR #32 handback

- Found and corrected the signed status-route edge case: `GET /api/lead-imports/{batchId}` may now use a valid HMAC signature with an empty body and no `Content-Type`. POST/other body-carrying requests still require `application/json`.
- Added verifier coverage for valid signed empty-body GET, unsigned GET rejection, and empty POST rejection.
- Added `scripts/check-next-dynamic-route-collisions.ts` and wired it into `npm run build`. It fails the build if two sibling dynamic route directories, such as `[id]` and `[clientAccountId]`, appear under the same route parent.
- Updated PR #32 with the status-route validation note.

## Final PR #32 state at this checkpoint

```txt
PR: #32 — Phase D: reconcile lead-import API with current production fixes
Branch: chatgpt/phase-d-reconciled-20260706
Head: aff208f4eb50414ea3842f30ddd9e80108404529
Status: open, mergeable, not merged
Vercel status: success
```

## Remaining gates

1. Merge PR #32 with squash when GitHub merge permission is available.
2. Confirm the production deployment at the merge commit.
3. Verify lead-import environment variable presence without exposing values.
4. Complete one authorized MFA login path through `/admin`, `/portal`, and `/admin/servicing`.
5. Run one supervised approved `mcd-leads export --run <id>` and log batch, row outcomes, Lead evidence, and AuditLog evidence.

## Note

The server-side row hash is intentionally not re-canonicalized in this addendum because the exact payload serialization convention belongs to the separate local `mcd_lead_ops` client. Do not invent or change that convention without reviewing that client repository.