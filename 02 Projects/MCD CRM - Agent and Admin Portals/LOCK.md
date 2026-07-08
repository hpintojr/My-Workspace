# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: chatgpt
scope: crm.mcd (+ mcd_lead_ops)
since: 2026-07-07T06:04Z
previous_holder: claude (inspected + merged PR #32 to production)
intent: controlled leads launch following the released lead-research and opaque owner-acquisition work.
next: 1) document production role/screen smoke checks;
      2) confirm a permitted local source configuration and private signed transport settings;
      3) run a supervised staging-to-CRM preview only;
      4) do not submit a batch or enable LEADS_ENABLED without a run-specific owner approval reference.
```

Current plan: `[G] Current Execution Scope — 2026-07-08.md`.

To take the lock, write your name in `holder:` above and note your intent, then log per the Operating Protocol.
Claude is available for inspection/verification passes on request.
