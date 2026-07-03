# MCD CRM — Schema Ledger Reconciliation

**Date:** 2026-07-03  
**Project:** MCD CRM — Agent and Admin Portals  
**Environment reviewed:** Neon project `mcd-crm-production`, isolated branch `lead-foundation-contract-v1`

## Finding

Neon does **not** use Prisma's `_prisma_migrations` table as its applied-schema ledger.

The active ledger is:

```txt
public._mcd_schema_migrations
```

Recorded entries:

```txt
20260702_000_production_baseline
- Core application schema predates this migration ledger.

20260702_001_lead_mvp
- Lead engine, integrity, attribution taxonomy, and indexes applied through validated Neon safety branches.
- LEADS_ENABLED remains false.
```

## Delivery implication

Do not run `prisma migrate deploy` as a first step for the lead-foundation work. It would introduce a second migration authority and risks drift.

The next schema change must instead:

1. Use the existing `_mcd_schema_migrations` operational ledger.
2. Be drafted as an additive, reviewed SQL plan against the isolated Neon branch.
3. Be compared to Prisma schema before any execution.
4. Include a validation query set and explicit rollback/restore plan.
5. Remain unapplied to production until recovery acceptance, Preview validation, and owner approval.

## Current status

```txt
- No schema SQL has been executed on lead-foundation-contract-v1.
- No production schema has changed.
- Import API remains contract-only; no route or database-backed batch exists.
```
