# Execution Lock — LSP / Free & Clear Advantage

Only the holder may commit, merge, deploy, run migrations, or change settings on this scope.
Others read/verify only. See `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`.

```txt
holder: claude
scope: lsp.fca — Free & Clear Advantage appointment booking and agent assignment inside the
       Loan Streamline Pro GHL sub-account (oY7nDZUrZG0KegzadZgI).
since: 2026-08-13T18:30:00-07:00
previous_holder: none (new scope — first LOCK.md for LSP)
intent: Read-only diagnosis of the appointment/agent assignment divergence. No GHL mutations
        performed. The open decision (replace the personal booking calendar) is owner-only
        because it changes GHL_CALENDAR_ID in Vercel and strands existing appointments.
```

## Authorized without further owner approval

- Read-only GHL queries (contacts, calendars, opportunities, pipelines, locations).
- Read-only inspection of the GHL web UI.
- Writing `[C]` daily logs, overviews, and findings docs in this workspace.
- Proposing configuration changes in writing for Hamilton to apply.

## Not authorized without a more specific Hamilton instruction

- Creating, converting, deleting, or reassigning any GHL calendar.
- Changing `GHL_CALENDAR_ID` or any Vercel environment variable.
- Cancelling, rescheduling, or mutating any appointment — including the test records.
- Mutating contacts, opportunities, pipeline stages, or user assignments.
- Activating, editing, or disabling GHL workflows or automations.
- Touching the Salesforce Web Leads assignment rule. It is intentional. Do not "fix" it.
- Changing CLAUDE.md's Protected Workspace Command Registry.

## Standing warnings for this scope

- The **Aug 26 test records are live on purpose.** They are the reproduction of the assignment
  bug. Verify any fix against them *before* cancelling them.
- The **Web Leads queue is intentional.** Leaving leads in that queue is the designed behavior.
