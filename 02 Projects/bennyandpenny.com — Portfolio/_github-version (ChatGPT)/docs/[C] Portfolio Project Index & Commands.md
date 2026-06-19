---
author: claude
type: project-control
project: BennyAndPenny.com — Portfolio
date: 2026-06-19
updated: 2026-06-19
---

# BennyAndPenny.com — Portfolio Project Index & Commands

## Source of Truth

```txt
Local working copy:
D:\GitHub\My Workspace\02 Projects\bennyandpenny.com — Portfolio\_github-version (ChatGPT)

GitHub repository (deployed via Vercel):
hpintojr/bennyandpenny  →  https://bennyandpenny.vercel.app

Public purpose:
Hamilton Pinto Jr.'s personal/tech portfolio under the Benny & Penny's — A Tech Company banner.
```

The GitHub repo is what deploys. Edits made in the local working copy must be pushed to `hpintojr/bennyandpenny` (`main`) for Vercel to redeploy.

Do not place store checkout, customer portal, product-order, gifting, cart-recovery, or digital-delivery code here. Those belong in `hpintojr/bennyandpennyadventures`.

## Concept (locked 2026-06-19)

> Benny & Penny's is the technology and creative studio of Hamilton Pinto Jr. — software architect, creative technologist, and publisher. The site is his personal/tech portfolio under the Benny & Penny's tech-company banner. The Adventures children's book imprint is one featured venture, not the whole identity.

## Ventures & Backlinks (wired)

```txt
Work tiles (Home + /our-work):
- XBeton                     https://www.xbeton.com/
- Advantage First Financial  https://www.advantagefirst.com/
- Benny & Penny's Adventures https://www.bennyandpennyadventures.com/
- Mercury Call Desk          https://mercurycalldesk.com/
- 60+ Establishments         (no single URL)

Footer "Ventures" backlinks + Person JSON-LD sameAs:
- ACC                        https://acc.capital/
- Advantage First Financial  https://www.advantagefirst.com/
- Benny & Penny's Adventures https://www.bennyandpennyadventures.com/
- XBeton                     https://www.xbeton.com/
- Mercury Call Desk          https://mercurycalldesk.com/

All outbound links are dofollow (rel="noopener", target="_blank").
```

## Navigation & Pages

```txt
Home            /                portfolio hero, capabilities, selected ventures
Work            /our-work        ventures detail + outbound links
Adventures      /families        Benny & Penny's Adventures imprint spotlight
About           /about           Hamilton bio + stats
Contact         /work-with-us    engagement types + direct email (header button)
```

Note: route folders keep their original names (`/our-work`, `/families`, `/work-with-us`) to avoid breaking the deployed structure/sitemap; nav labels are Work / Adventures / Contact.

## Current Code Foundation

```txt
Next.js 15 · React 19 · App Router · TypeScript
Teal/mint design system (globals.css) — kept from the deployed v1
SEO: metadata, sitemap, robots, Person schema, social sharing image, favicon, not-found
```

## Build Order (next)

1. Push these portfolio changes to `hpintojr/bennyandpenny` and confirm the Vercel redeploy.
2. Replace CSS placeholders with a Hamilton portrait, brand mark, and venture/book imagery (see image-prompt brief).
3. Tighten copy and confirm each venture blurb is accurate.
4. Add Privacy + Terms before any form data collection.
5. Optional: contact-form + CRM routing later.

## Commands for AI Assistants

```txt
"Read the portfolio project index"
→ Read this file before proposing site architecture, copy, assets, or code.

"Continue the BennyAndPenny.com portfolio"
→ Review this file, the current app structure, and the latest commit before editing.

"Prepare the next launch task"
→ Pick the next incomplete Build Order item and deliver one practical, reviewable change.

"Update the portfolio workspace"
→ Update this file only when concept, scope, ventures/backlinks, or source-of-truth locations change.
```
