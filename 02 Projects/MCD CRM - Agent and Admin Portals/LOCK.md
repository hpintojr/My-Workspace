# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: none            # RELEASED — open for Hamilton / ChatGPT to take
scope: crm.mcd (+ mcd_lead_ops)
released: 2026-07-07T06:00Z by claude
last_holder: claude (inspected + merged ChatGPT's PR #32 to production)
intent: PR #32 merged to production (squash d25ac9f). Site healthy.
next: Hamilton sets production LEAD_IMPORT_KEY_ID / LEAD_IMPORT_HMAC_SECRET,
      then run the first supervised live `mcd-leads export --run <id>` and log it.
```

To take the lock, write your name in `holder:` above and note your intent, then log per the Operating Protocol.
Claude is available for inspection/verification passes on request.
