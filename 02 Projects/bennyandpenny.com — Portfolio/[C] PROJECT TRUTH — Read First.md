---
author: claude
type: project-truth
project: bennyandpenny.com — Portfolio
date: 2026-06-19
updated: 2026-06-20
status: AUTHORITATIVE — every AI (Claude, ChatGPT, Gemini) reads this FIRST
---

# bennyandpenny.com — Portfolio · PROJECT TRUTH (Read First)

This is the single orientation file for this project. Read it before proposing or writing any code, copy, or structure. If anything elsewhere conflicts with this file, **this file wins** until Hamilton says otherwise.

## What this project is

```txt
Name:    bennyandpenny.com — Portfolio
Role:    Hamilton Pinto Jr.'s personal / tech portfolio under the
         "Benny & Penny's — A Tech Company" banner.
Domain:  bennyandpenny.com
Repo:    hpintojr/bennyandpenny  (deployed via Vercel → bennyandpenny.vercel.app)
```

It is a portfolio + tech-company brand site for Hamilton. It is NOT a family-resource brand, NOT a store, NOT the book-production system.

## Decided direction (locked 2026-06-19)

Hamilton reviewed two versions and chose: **keep the deployed Next.js 15 / TypeScript codebase in `hpintojr/bennyandpenny`, and reposition it to the portfolio concept.** Done:

```txt
- Concept: Hamilton's personal/tech portfolio under the B&P tech-company banner.
- Ventures shown as work tiles: XBeton, Advantage First Financial,
  Benny & Penny's Adventures, Mercury Call Desk, 60+ Establishments.
- Backlinks (dofollow) in footer + Person JSON-LD sameAs:
    ACC                        https://acc.capital/
    Advantage First Financial  https://www.advantagefirst.com/
    Benny & Penny's Adventures https://www.bennyandpennyadventures.com/
    XBeton                     https://www.xbeton.com/
    Mercury Call Desk          https://mercurycalldesk.com/
- Visual system: teal/mint core system retained.
- 2026-06-20: approved hero, portrait, venture, book-mockup, and social-sharing visuals
  were integrated into the live main branch.
```

The earlier single-page editorial JS version (built from Hamilton's JSX) is retired as the live direction. The "family-built creative brand" framing that ChatGPT first shipped is rejected.

## Source of truth & how to deploy

```txt
Working copy in this workspace:
  02 Projects/bennyandpenny.com — Portfolio/_github-version (ChatGPT)/
  ^ Reference copy only; GitHub main is the live deploy source.

Canonical deploy source:
  GitHub repo hpintojr/bennyandpenny (branch main) → Vercel auto-deploys.

Current code status:
  - Portfolio image integration merged to main:
    0523e09819cf682f3808b24b71145c2ad44ba8ea
  - Assets are in public/images/.
  - Future routine changes must be made directly on main only.
  - Do not create a branch or pull request unless Hamilton explicitly changes that instruction.
```

Note: the old top-level `app/` at this project root (page.js/layout.js — Next 14 JS) is the retired single-page version, kept for reference only. The live code is in `hpintojr/bennyandpenny` on `main`.

## The three separate Benny & Penny projects — do NOT merge

```txt
A. Benny & Penny's Adventures            → STORE (ecommerce, portal, orders, gifting,
                                            cart recovery). Repo: hpintojr/bennyandpennyadventures
B. Benny & Penny's Adventures Book Series → BOOK PRODUCTION (manuscripts, locks, Canva,
                                            print/ebook/audio/locales)
C. bennyandpenny.com — Portfolio (THIS)  → Hamilton's portfolio / tech-company brand site.
                                            Repo: hpintojr/bennyandpenny
```

Never place store/checkout/customer/cart-recovery or book-production code in this portfolio repo.

## What went wrong (so it isn't repeated)

```txt
- ChatGPT treated the new repo hpintojr/bennyandpenny as blank and shipped a generic
  "family-built creative brand" site (off-brief), before any project brief was available
  in the repo (there was no CLAUDE.md in the repo).
- It also created stray workspace folders/docs, including a portfolio doc placed INSIDE the
  store project, and edited the Workspace Index to point there. Those have been cleaned up.
- There was never a separate portfolio CLAUDE.md to "restore from"; the real brief was
  Hamilton's request + the uploaded JSX (personal/tech portfolio). This file now records it.
```

## Guardrails for all future AI work

```txt
1. Read this PROJECT TRUTH file first; do not assume a repo is blank because it's new.
2. Keep store, book-production, and portfolio projects separate.
3. Don't change concept, audience, nav, or branding without quoting this file and getting approval.
4. Don't create duplicate project folders/repos.
5. State which folder + repo you're editing and which files change before major writes.
6. Make all routine portfolio changes directly on hpintojr/bennyandpenny main.
7. Vercel deploys from main. Confirm with Hamilton before a consequential deployment or domain change.
```

## Current Visual Asset Map

```txt
public/images/home-hero-brandmark.webp        → Home hero
public/images/about-portrait-context.webp     → About portrait feature
public/images/work-xbeton-architecture.webp   → XBeton cards
public/images/work-aff-dashboard.webp          → Advantage First Financial cards
public/images/work-adventures-mockup.webp      → Adventures cards + Adventures page
public/images/work-mercury-telephony.webp      → Mercury Call Desk cards
public/images/work-establishments-collage.webp → 60+ Establishments cards
public/images/og-social-background.webp        → Open Graph / X sharing image
public/images/logo-horizontal-transparent.png  → Header logo (transparent)
public/images/logo-compact-transparent.png     → Compact logo (transparent)
public/images/logo-mark-transparent.png        → Monogram mark (footer / dark bg)
app/icon.png · app/favicon.ico · app/apple-icon.png → Favicon set (from favicon-source.png)
```

## Open / next

```txt
- Commit + push the 2026-06-19 changes to main (logo, favicon, Adventures, contact form, footer,
  /privacy, /terms) and confirm the Vercel deploy renders them.
- Contact form is built (components/ContactForm.tsx + app/api/contact/route.ts → Neon + Mailjet to
  hello@bennyandpenny.com). ChatGPT to wire creds: run db/contact_submissions.sql, set DATABASE_URL +
  MAILJET_* env in Vercel (see docs/CONTACT-FORM-SETUP.md). Form succeeds if either channel is configured.
- Privacy (/privacy) + Terms (/terms) DONE; have an attorney review (arbitration/class-waiver vary by state).
- Optional: add a "By submitting you agree to Privacy/Terms" line under the contact button.
- Confirm each venture description and outbound destination is current and accurate.
- Continue work directly on main only.
```
