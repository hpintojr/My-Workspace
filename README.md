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
Continue LuLu POD after Phase 1/2 success: build the manual Submit to LuLu layer while keeping auto-submit disabled.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
```

Confirmed working:

- Admin dashboard mobile polish is working on iPhone Chrome.
- Admin dashboard desktop sidebar toggle polish is working.
- Dashboard search is below the greeting.
- Welcome renders as `Welcome, Hamilton Pinto!`.
- Mobile and desktop sidebar toggle controls show the branded heart treatment.
- Print Jobs appears under Catalog below Media.
- Internal LuLu/POD `print-jobs` queue works for physical orders.
- Order `26-0024` created a Hardcover print job.
- Print record `1` opened successfully after the Neon lock-table patch.
- Books now include LuLu print setup fields.
- Neon has been patched with the required `print_jobs`, lock-rel, and book print setup fields.

Latest important Benny & Penny commits:

```txt
60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books

a9383a2e68023a42db5dd7520004797147c5fb56
Add print jobs under catalog sidebar

fcd736ce2c21361151a2136a6b51a6d3822bf024
Create dry-run print jobs after checkout
```

LuLu POD plan file:

```txt
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

Next focus areas:

- Build Phase 3: LuLu API client and manual Submit to LuLu action.
- Validate print job is `ready` before manual submit.
- Submit to LuLu sandbox/test environment only.
- Store LuLu response, IDs, and errors back to `print-jobs`.
- Keep `LULU_AUTO_SUBMIT=false`.
- After LuLu tracking exists, update the customer portal, thank-you page, receipt copy, and shipment/tracking email.

Do not start broad rewrites. Future admin changes should be tiny final-layer fixes only.
