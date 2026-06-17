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
Continue LuLu POD Phase 3: the backend manual-submit foundation is deployed; next build is the admin-facing Submit to LuLu button/tool page.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
01 Daily Logs/[C] 2026-06-17 Geoapify and Lulu Phase 3 Update.md
01 Daily Logs/[C] 2026-06-17 Lulu POD Phase 1-2 Update.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
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
- Geoapify API now appears in Admin Dashboard System Status Check.
- Geoapify Vercel environment values are now configured for browser autocomplete, server checks, and the autocomplete endpoint.
- LuLu Phase 3 backend foundation is deployed: API helper plus protected manual-submit route.

Latest important Benny & Penny commits:

```txt
166768e5007ac21e29bd08b58423a73d81ecd1c7
Add manual Lulu submit route

bacd0891ac3ece58e5ce6eafc5f06ffdf5c4312a
Add Lulu API submit helper

c073738d8a74bd419ae265e12c161334740daa07
Add Geoapify to admin system status

60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books
```

LuLu POD plan file:

```txt
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

Next focus areas:

- Build the admin-facing Submit to LuLu button or tool page for ready print jobs.
- Keep manual-only LuLu submission; do not enable auto-submit.
- Validate that the backend route blocks non-ready jobs.
- Test sandbox submission only after Book 1 print setup data is filled.
- Save/display LuLu response, IDs, and errors in Print Jobs.
- Add a real Geoapify dashboard ping later if desired now that the endpoint value is configured.
- After LuLu tracking exists, update the customer portal, thank-you page, receipt copy, and shipment/tracking email.

Do not start broad rewrites. Future admin changes should be tiny final-layer fixes only.
