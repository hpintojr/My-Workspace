# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: chatgpt
scope: crm.mcd (+ mcd_lead_ops)
since: 2026-07-07T06:04Z
previous_holder: claude (inspected + merged PR #32 to production)
intent: post-merge production verification and first supervised lead-import readiness.
next: record production lead-import secret presence from Hamilton's Vercel evidence,
      identify the approved local mcd_lead_ops run and validate export readiness.
      Do not send a live export without an explicitly approved local run and operator approval reference.
```

To take the lock, write your name in `holder:` above and note your intent, then log per the Operating Protocol.
Claude is available for inspection/verification passes on request.