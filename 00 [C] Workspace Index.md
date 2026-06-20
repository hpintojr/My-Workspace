# Workspace Index

**Status:** Current as of 2026-06-20. The portfolio accessibility scope now follows the shared WCAG 2.2 AA program. The store and book-production projects remain separate.

## Read order

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
Current daily log for the active project
```

## Active projects

### 1. bennyandpenny.com — Portfolio

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Deploy: Vercel production
Preferred hostname: https://www.bennyandpenny.com
Latest known production deployment: dpl_Fxd5Wp5dbEGTt5x7TEXYsYPwpxcz
Status: READY
```

**Active scope:** WCAG 2.2 AA engineering program for the full portfolio: public routes, navigation, footer, cards, forms, dialogs, media, visual effects, and complete Contact process.

**Current implementation:**
- Native skip link, landmarks, visible focus, reduced motion, forced colors, and target-size support
- Keyboard mobile navigation with focus containment and Escape behavior
- Accessible Contact validation, errors, and status messages
- Native footer accessibility preferences: text size, high contrast, pause animations, readable font, and local persistence
- Accessibility statement, Markdown/LLM mirrors, preferred canonical hostname, sitemap, robots, and noindex headers for mirror files
- Server-rendered smoke checks and Playwright plus axe browser-audit framework
- Content authoring guide, route inventory, manual QA checklist, and WCAG program document

**Read next:**

```txt
02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com WCAG Update.md
```

**Immediate next actions:**

```txt
1. Run production smoke and browser accessibility audits.
2. Complete contrast, zoom, reflow, text-spacing, and forced-colors evidence.
3. Complete NVDA and VoiceOver testing.
4. Complete route-by-route image alternative review.
5. Verify actual production Contact delivery success and failure handling.
```

### 2. Benny & Penny's Adventures — Store

```txt
Repository: hpintojr/bennyandpennyadventures
Scope: storefront, portal, orders, gifting, cart recovery, digital delivery, and admin
```

Current work is end-to-end cart recovery validation, delivery checks, real book assets, policy copy, and print preparation. The shared WCAG 2.2 AA program will be applied to this store after the portfolio baseline is stabilized.

**Read next:**

```txt
01 Daily Logs/[C] 2026-06-18 Cart Recovery Email Delivery and CTA Visual Validation.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Operations Controls and Attribution Reporting.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
```

### 3. Benny & Penny's Adventures Book Series

```txt
Scope: 10-book print, digital, audio, and multilingual production
Status: books 01–04 cover-ready; books 05–10 coming soon
```

**Read next:**

```txt
02 Projects/Benny & Penny's Adventures Book Series/[C] AI Index & Commands.md
02 Projects/Benny & Penny's Adventures Book Series/README.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/00-OFFICIAL-CATALOG.md
02 Projects/Benny & Penny's Adventures Book Series/00-series-control/02-MASTER-PRODUCTION-DASHBOARD.md
```

## Workspace rules

```txt
- Keep portfolio, store, and book-production work separate.
- Use the project truth file before changing a project.
- Update the active project truth, README, index, and a daily log after material scope changes.
- Never add environment values, tokens, database URLs, or customer data to this workspace.
- Do not claim legal accessibility certification without independent audit and review.
```
