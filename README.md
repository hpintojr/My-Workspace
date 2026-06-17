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
Pause further LuLu submission/testing work and shift the active build to the customer experience / portal revamp using the updated architectural blueprint.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
01 Daily Logs/[C] 2026-06-17 Geoapify and Lulu Phase 3 Update.md
```

Confirmed working:

- Admin dashboard mobile polish is working on iPhone Chrome.
- Admin dashboard desktop sidebar toggle polish is working.
- Dashboard search is below the greeting.
- Welcome renders as `Welcome, Hamilton Pinto!`.
- Print Jobs appears under Catalog below Media.
- Internal LuLu/POD `print-jobs` queue works for physical orders.
- Order `26-0024` created a Hardcover print job.
- Print record `1` opened successfully after the Neon lock-table patch.
- Books now include LuLu print setup fields.
- Geoapify API appears in Admin Dashboard System Status Check.
- Geoapify Vercel values are configured for browser autocomplete, server checks, and endpoint use.
- LuLu Phase 3 backend foundation and admin submit page/link are deployed.

Latest important Benny & Penny commits:

```txt
9268413354faac6f3a76b1aa44960a6711614fa7
Add Lulu submit link to admin sidebar

3d3d43ddbaab2d4cf0c791432784bc7d9fe9b554
Allow admin session for Lulu submit route

166768e5007ac21e29bd08b58423a73d81ecd1c7
Add manual Lulu submit route

bacd0891ac3ece58e5ce6eafc5f06ffdf5c4312a
Add Lulu API submit helper

c073738d8a74bd419ae265e12c161334740daa07
Add Geoapify to admin system status
```

Next focus areas:

- Audit current portal routes and components.
- Redesign portal information architecture for Orders, Library, Addresses, Helpdesk, and Account.
- Add Geoapify autocomplete to Portal > Addresses.
- Add address confirmation to account setup.
- Plan logged-in checkout address prefill.
- Redesign cart UX for mobile-first checkout clarity.
- Later resume LuLu sandbox testing only after Book 1 setup and portal priorities are aligned.

Do not start broad admin rewrites. Customer-facing portal/storefront work is the new active focus.
