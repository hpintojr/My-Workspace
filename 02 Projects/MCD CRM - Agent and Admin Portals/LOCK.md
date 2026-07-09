# Execution Lock — MCD CRM

Only the holder may commit, merge, deploy, run migrations, or change settings on `hpintojr/crm.mcd`.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: chatgpt
scope: crm.mcd + My-Workspace scope documentation
since: 2026-07-07T06:04Z
previous_holder: claude (inspected + merged PR #32 to production)
intent: post-merge verification and documentation reconciliation after PR #34 was merged to main with owner approval.
next: 1) resolve/verify custom domain promotion for crm.mercurycalldesk.com;
      2) run controlled production smoke checks for PR #34 after custom-domain promotion;
      3) verify Cold Lead strict click-to-call, claim gate, DNC, My Workspace, GHL relays, and aging sweep;
      4) PR #34 is merged and new main deployment is READY, but custom domain still resolved to older deployment at last check;
      5) do not enable broader GHL workflows, Servicing, Commissions, Finance, or mutate production data without separate owner approval.
```

Current plan: `[G] Current Execution Scope — 2026-07-08.md`.
Latest daily log: `01 Daily Logs/[G] 2026-07-08 MCD CRM Lead Flow Alignment and CRON Secret Configured.md`.
Scope addendum: `[G] 2026-07-08 Lead Flow Alignment Scope Addendum.md`.

To take the lock, write your name in `holder:` above and note your intent, then log per the Operating Protocol.
Claude is available for inspection/verification passes on request.
