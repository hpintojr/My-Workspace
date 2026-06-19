---
author: claude
type: comparison
project: bennyandpenny.com — Portfolio
date: 2026-06-19
---

# bennyandpenny.com — Two Versions, Side by Side

There are two complete, different versions of this site. Neither was destroyed. Use this doc to decide which becomes the source of truth.

## Where each one lives

```txt
Version A — Workspace (Claude, from your JSX)
  Location: app/ at this project root (page.js, layout.js, globals.css)
  Status:   not deployed, not pushed to the GitHub repo

Version B — GitHub (ChatGPT)
  Location: _github-version (ChatGPT)/   (mirror of repo hpintojr/bennyandpenny)
  Live:     https://bennyandpenny.vercel.app  ·  repo public, 26 commits
```

## Head-to-head

| | Version A — Workspace (yours) | Version B — GitHub (ChatGPT) |
|---|---|---|
| Stack | Next 14 · React 18 · JavaScript | Next 15 · React 19 · TypeScript |
| Pages | 1 (single-page scroll) | 5 (Home, Our Work, For Families, Our Story, Work With Us) |
| Components | All inline in page.js | SiteHeader / SiteFooter, per-page files |
| Design | Editorial: ink/espresso/cream + brass accent, serif display, SVG book-stack glyph, dark tile grid | Soft/warm: teal + mint + blush + sun, Playfair + DM Sans, rounded "storybook" shapes, CSS placeholders |
| Concept | Hamilton's **personal/tech portfolio** under a B&P tech-company banner | **Family-built parent brand**; Adventures is one branch |
| Backlinks | ACC, AFF, BAPA, XBeton, Mercury all wired (your brief) | None (no outbound venture links) |
| Ventures shown | XBeton, AFF, BAPA, Mercury, 60+ establishments as work tiles | Storytelling / creative direction / family resources (no named companies) |
| SEO | Basic metadata + OG only | Full: sitemap.ts, robots.ts, opengraph-image, icon, JSON-LD, canonical, not-found |
| Primary CTA | "View services" / "Get in touch" | "Work With Us" |
| Deployed | No | Yes (Vercel) |
| AI index | (not yet finished) | docs/[C] Portfolio Project Index & Commands.md |

## The real difference is concept, not just code

These aren't two drafts of the same site — they're two different businesses' sites:

- **Version A** sells *you* — Hamilton, the software architect / creative technologist / publisher — and links out to your ventures (the backlink goal from your original brief).
- **Version B** sells *Benny & Penny as a family creative brand* — warm, mission-led, "Work With Us," with the books as the featured story world. It deliberately keeps your other companies out.

Both are legitimate; they serve different goals. Version B is further along (live, multi-page, full SEO) but is off-brief on positioning and has no backlinks or your tech-portfolio framing. Version A matches your brief and design but is one page, not deployed, and lighter on SEO.

## Options

```txt
A. Keep Version A (yours). Add SEO scaffolding + push to a repo. Replace/retire the GitHub site.
B. Adopt Version B (GitHub). Keep the live multi-page brand site; refine from there. Retire Version A.
C. Merge (recommended if you like the editorial look): take B's multi-page shell + SEO + live deploy,
   reskin with A's editorial design, wire your ACC/AFF/BAPA/XBeton/Mercury backlinks, and add a
   "Work / Ventures" section so it doubles as your tech portfolio.
D. Run both: B stays as the family brand at bennyandpenny.com; A becomes a separate personal
   portfolio at a different domain/subdomain. (Most work, two sites to maintain.)
```

## Note on what ChatGPT changed in the workspace (not yet cleaned up)

```txt
- Created 02 Projects/Benny & Penny's Adventures/00 Brand & Portfolio/ (a portfolio doc placed
  inside the STOREFRONT project) — misplaced.
- Left two near-duplicate launch docs (one here, one in that misplaced folder).
- Edited 00 [C] Workspace Index.md to point the portfolio at that misplaced folder.
- Stale .git/index.lock present (may block commits until removed).
Cleanup is on hold until the direction above is chosen.
```
