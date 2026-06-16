# My Workspace

A GitHub-based workspace for project notes, daily logs, and active project context.

## Start Here

When opening this workspace in a new chat, read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current active focus files listed below
```

The workspace index contains the clean directory tree, read-order rules, and update-maintenance checklist.

When Hamilton says **"update my workspace"**, update the relevant daily logs/project notes and also update:

```txt
00 [C] Workspace Index.md
```

if any file list, read order, active focus, or project status changed.

---

## Current Active Focus

### Benny & Penny's Adventures

The current priority is the Benny & Penny website/admin/customer portal launch cleanup.

Read first:

```txt
00 [C] Workspace Index.md
CLAUDE.md
01 Daily Logs/[C] 2026-06-16.md
01 Daily Logs/[C] 2026-06-16 Admin Mobile Final Polish Update.md
02 Projects/Benny & Penny's Adventures/[C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Final Polish Status 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
```

Current status:

```txt
Admin dashboard mobile polish is working on the user's iPhone Chrome test after the final sidebar heart fix.
```

Confirmed working:

- Dashboard search is below the greeting.
- Welcome renders as `Welcome,` then `Hamilton Pinto!` with punctuation attached to the name.
- System Status, Recent Orders, and Community Growth rows use the right side of the cards again.
- Collapsed mobile nav control shows the branded red circle with a white heart.
- Open sidebar close control now shows a dark/deep-teal heart instead of the X.
- Broad heart selectors were removed so Payload filter/search controls are not converted into hearts.

Latest accepted website commit:

```txt
69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

Next focus areas:

- Do one final Vercel deployment confirmation if needed.
- Validate remaining customer portal mobile pages.
- Confirm Chrome iPhone bottom white gap is acceptable after safe-area filler removal.
- Confirm Sequenzy footer badge/account settings.
- Keep Mailjet as fallback for transactional email.

Do not start broad rewrites. Admin mobile is now close enough that future changes should be tiny, final-layer fixes only.
