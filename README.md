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

Current priority:

```txt
Begin LuLu print-on-demand Phase 1: create the internal print-job queue for paperback/hardcover purchases before any live LuLu API submission.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Accepted Working Update 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Desktop Toggle Status 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
```

Confirmed working:

- Admin dashboard mobile polish is working on iPhone Chrome.
- Admin dashboard desktop sidebar toggle polish is working.
- Dashboard search is below the greeting.
- Welcome renders as `Welcome, Hamilton Pinto!`.
- System Status, Recent Orders, and Community Growth rows use the right side of the cards again.
- Mobile and desktop sidebar toggle controls show the branded heart treatment.
- Filter/search controls remain normal.
- Mobile grey hover square/artifact is gone from desktop view.

Latest accepted mobile website commit:

```txt
69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

Latest accepted desktop/admin greeting commits:

```txt
e678610a677948f7046eef8dadc6df1bc5df99ec
Retarget desktop nav toggles outside admin shell

f0de9ab63cbe54407b262ffed100c74b18595447
Add space after welcome comma
```

LuLu POD plan file:

```txt
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

Next focus areas:

- Implement LuLu POD Phase 1: internal `print-jobs` queue only.
- Add `collections/PrintJobs.ts` and register it in `payload.config.ts`.
- Add dry-run print job generator in `lib/luluPrintJobs.ts`.
- Hook generator into Stripe fulfillment after `order-items` are created.
- Do not submit live LuLu orders yet.
- After POD queue foundation, continue customer portal mobile validation and final launch cleanup.

Do not start broad rewrites. Future admin changes should be tiny final-layer fixes only.
