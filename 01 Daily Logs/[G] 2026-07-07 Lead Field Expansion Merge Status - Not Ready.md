---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
status: not-ready-to-merge
branch: chatgpt/lead-fields-owner-provenance-20260707
---

# [G] 2026-07-07 — Lead field expansion merge status: not ready

## Current branch work recorded

The focused branch contains early implementation work for:

```txt
- Business Address
- Google Rating with observed timestamp
- Google Maps outbound link
- private owner acquisition provenance route and Owner-only view
- migration draft
- contract guard script
- agent and admin sales-research display components
```

## Merge decision

```txt
DO NOT MERGE THIS BRANCH YET.
```

The branch is incomplete and has not passed the required verification gates. In particular:

```txt
- Prisma schema is not yet reconciled with the new SQL migration and private provenance model.
- No isolated test database migration has been executed.
- No typecheck, build, CI, or route verification has passed for the branch.
- The normal import workflow has not yet been verified to persist new research fields correctly.
- Local mcd_lead_ops has not yet been updated and tested for the new row fields or separate owner-acquisition call.
- No preview deployment has been reviewed.
- Claude has not yet performed the final leakage audit on the completed PR.
- No production migration, deployment, intake, approval, export, or Raw_Leads.csv import has occurred.
```

## Claude request now

Claude may perform a read-only audit of the current branch and identify exact defects or missing integration paths. Claude must not merge it yet.

## Merge gate

Merge is authorized only after all of the following are evidenced:

```txt
1. Prisma schema and migration reconcile cleanly.
2. Isolated database migration test passes with the production-db safety guard.
3. Typecheck, build, import contract guards, replay guards, and route checks pass.
4. The import lifecycle test proves address, one-decimal rating, observed timestamp, and Maps URL reach the imported Lead record.
5. Private provenance is absent from shared serializers, review pages, agents, admins, audit logs, and route responses.
6. OWNER-only retrieval is tested; all non-OWNER roles are denied/no-data.
7. Local mcd_lead_ops mapping and signed private provenance call are implemented and tested.
8. Preview deployment is reviewed successfully.
9. Claude completes a final leakage audit and marks the focused PR safe to merge.
```
