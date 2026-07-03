# MCD CRM — Paid Provider Data Scope

**Effective:** 2026-07-03

Mercury Call Desk will use operator-provided licensed exports and approved paid-provider/API data. Data-acquisition automation is out of scope.

The MiniCRM import design retains data-integrity controls:

```txt
- source/provider provenance
- normalization and deduplication
- suppression/DNC checks
- operator approval
- HMAC request integrity, replay protection, and idempotency
- Admin review before assignment or outreach
- no local direct connection to Neon/Postgres
```

Use `API_IMPORT`, `MANUAL_ENTRY`, `WEB_FORM_SUBMISSION`, or `REFERRAL_ENTRY` as applicable. Do not add specialized acquisition methods, source-specific restrictions, or related workflow behavior.
