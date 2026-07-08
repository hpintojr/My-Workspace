# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: chatgpt
scope: crm.mcd + My-Workspace scope documentation
since: 2026-07-07T06:04Z
previous_holder: claude (inspected + merged PR #32 to production)
intent: controlled Lead Flow Alignment after first production import and approved data correction.
next: 1) run controlled preview acceptance for PR #34;
      2) verify Cold Lead activity-first flow, claim gate, DNC, My Workspace, and aging sweep;
      3) keep PR #34 draft until acceptance is recorded;
      4) do not merge PR #34, enable broader live rollout, or change production data without owner approval.
```

Current plan: `[G] Current Execution Scope — 2026-07-08.md`.
Latest daily log: `01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md`.
Scope addendum: `[G] 2026-07-08 Lead Flow Alignment Scope Addendum.md`.

To take the lock, write your name in `holder:` above and note your intent, then log per the Operating Protocol.
Claude is available for inspection/verification passes on request.
