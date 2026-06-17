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
Validate the latest desktop admin sidebar toggle patch, then continue final launch cleanup. Customer portal mobile validation remains next after admin toggle/admin polish validation.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/Benny & Penny's Adventures/[C] Admin Mobile Accepted Working Update 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Admin Desktop Toggle Status 2026-06-16.md
02 Projects/Benny & Penny's Adventures/[C] Portal and Digital Delivery Implementation Notes.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
```

Do **not** read the older verbose admin-mobile progress logs first unless debugging a regression. They are now reference/archive context only.

Confirmed working:

- Admin dashboard mobile polish is working on iPhone Chrome.
- Dashboard search is below the greeting.
- Welcome renders as `Welcome,` then `Hamilton Pinto!` with punctuation attached to the name.
- System Status, Recent Orders, and Community Growth rows use the right side of the cards again.
- Collapsed mobile nav control shows the branded red circle with a white heart.
- Open sidebar close control shows a dark/deep-teal heart instead of the X.
- Filter/search controls remain normal and are not converted into hearts.
- Latest desktop work removed the mobile grey hover square/artifact from desktop view.

Latest accepted mobile website commit:

```txt
69d549e3160c38e87be80eafb00bdb700d0a66c6
Hard override sidebar close icon to dark heart
```

Latest desktop sidebar toggle patch needing validation:

```txt
e678610a677948f7046eef8dadc6df1bc5df99ec
Retarget desktop nav toggles outside admin shell
```

Next focus areas:

- Confirm Vercel deployed `e678610a677948f7046eef8dadc6df1bc5df99ec`.
- Hard-refresh `/admin` on desktop and validate the desktop `<`/chevron and hamburger are replaced by heart controls.
- Re-check mobile/iPhone admin sidebar to confirm no regression.
- Validate remaining customer portal mobile pages.
- Confirm Chrome iPhone bottom white gap is acceptable after safe-area filler removal.
- Confirm Sequenzy footer badge/account settings.
- Keep Mailjet as fallback for transactional email.

Do not start broad rewrites. Future admin changes should be tiny final-layer fixes only.
