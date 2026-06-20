---
author: ChatGPT
type: project-truth
project: bennyandpenny.com — Portfolio
date: 2026-06-19
updated: 2026-06-20
status: AUTHORITATIVE — every AI reads this FIRST
---

# bennyandpenny.com — Portfolio · PROJECT TRUTH (Read First)

This is the single orientation file for this project. Read it before proposing or writing code, copy, design, SEO, or content. If another workspace note conflicts with this file, this file wins until Hamilton says otherwise.

## What this project is

```txt
Name:    bennyandpenny.com — Portfolio
Role:    Hamilton Pinto Jr.'s personal / technology portfolio under the
         "Benny & Penny's — A Tech Company" banner.
Domain:  bennyandpenny.com
Repo:    hpintojr/bennyandpenny
Deploy:  GitHub main → Vercel production
```

It is a portfolio and technology-company brand site for Hamilton. It is **not** the Benny & Penny's Adventures ecommerce store and **not** the book-production system.

## Decided direction

Hamilton chose the deployed Next.js 15 / TypeScript codebase in `hpintojr/bennyandpenny` and repositioned it as his personal / technology portfolio. The earlier single-page editorial JS version and the prior generic family-brand positioning are retired as live directions.

```txt
Concept: Hamilton's personal and technology portfolio under the B&P tech-company banner.
Visual system: teal / mint / cream / blush retained.
Audience: businesses, founders, operators, and partners seeking technical, consulting, design, or publishing support.
```

## Portfolio content and ventures

```txt
Core services:
- Software architecture and custom platform builds
- API, CRM, telephony, and business-intelligence integrations
- Business consulting and development
- Brand, web, and launch systems
- Publishing and production workflows

Current work / venture set:
- XBeton
- Advantage First Financial
- Benny & Penny's Adventures
- American Colonial Capital
- Mercury Call Desk
- 60+ Establishments
```

Outbound venture links are intentional portfolio backlinks. Footer and Person JSON-LD reference ACC, Advantage First Financial, Benny & Penny's Adventures, XBeton, and Mercury Call Desk.

## Source of truth and deploy rule

```txt
Canonical live source:
  GitHub repo hpintojr/bennyandpenny, branch main

Deployment:
  Vercel auto-deploys from main

Working copy in this workspace:
  02 Projects/bennyandpenny.com — Portfolio/_github-version (ChatGPT)/
  Reference only. It is not the live deploy source.

Routine rule:
  Make normal portfolio changes directly on main.
  Do not create a branch or pull request unless Hamilton explicitly asks or a technical recovery requires it.
```

A one-off short-lived branch/PR was used on 2026-06-20 to resolve a static social-image sync conflict. That was an exception, not a workflow change.

## Current live state — end of day 2026-06-20

```txt
Latest production merge:
  7503abe6ab5e0afcde8b2147eee3180ad47fe459

Latest production purpose:
  Replace the social preview with the approved gold B / glass teal P WebP image
  and point Open Graph / Twitter metadata at that static image.

Footer:
  BP monogram at left, custom wordmark to its right.
  Footer mission describes Hamilton's development, design, API, consulting,
  and publishing work, and names Benny and Penny as the motivation.

Contact stack:
  Vercel hosting + Sequenzy transactional delivery + Neon submission storage.
  Do not reintroduce Mailjet without Hamilton's explicit instruction.

SEO and discovery:
  Per-page metadata/canonicals, sitemap.xml, robots.txt, JSON-LD,
  llms.txt, llm.txt, llms-full.txt, and Markdown mirrors are present.
```

## Visual asset map

```txt
public/images/home-hero-brandmark.webp        → Home hero
public/images/about-portrait-context.webp     → About portrait feature
public/images/work-xbeton-architecture.webp   → XBeton cards
public/images/work-aff-dashboard.webp          → Advantage First Financial cards
public/images/work-adventures-mockup.webp      → Adventures cards + Adventures page
public/images/work-acc-capital.svg             → American Colonial Capital card background
public/images/acc-logo.svg                     → American Colonial Capital card logo overlay
public/images/work-mercury-telephony.webp      → Mercury Call Desk cards
public/images/work-establishments-collage.webp → 60+ Establishments cards
public/images/og-social-background.webp        → Open Graph / X / text-share image, 1200 × 630
public/images/logo-horizontal-transparent.png  → Header logo
public/images/logo-compact-transparent.png     → Compact logo
public/images/logo-mark-transparent.png        → Footer / dark-background monogram
app/icon.png · app/favicon.ico · app/apple-icon.png → Favicon set
```

## The three separate Benny & Penny projects — do not merge

```txt
A. Benny & Penny's Adventures
   Store / ecommerce / portal / orders / gifting / cart recovery
   Repo: hpintojr/bennyandpennyadventures

B. Benny & Penny's Adventures Book Series
   Manuscripts / locks / Canva / print / ebook / audio / locales

C. bennyandpenny.com — Portfolio (this project)
   Hamilton's portfolio / technology-company brand site
   Repo: hpintojr/bennyandpenny
```

Never place store, checkout, customer, cart-recovery, or book-production code in the portfolio repo.

## Guardrails for future AI work

```txt
1. Read this PROJECT TRUTH file first.
2. Keep the three projects separate.
3. Do not change concept, audience, navigation, or branding without Hamilton's approval.
4. Do not treat hpintojr/bennyandpenny as blank because it is a newer repo.
5. State which repo and files will change before major writes.
6. Keep routine portfolio changes on main.
7. Never commit secrets, environment values, tokens, or database URLs.
8. Preserve the approved static social image at public/images/og-social-background.webp unless Hamilton replaces it.
```

## Open / next actions

```txt
1. Confirm new Messages/SMS and social shares use the approved WebP card after platform preview caches refresh.
2. Test the contact form end to end after verifying Vercel production variables and the Neon contact_submissions table.
3. Confirm a single preferred-domain redirect: www.bennyandpenny.com → bennyandpenny.com.
4. Submit sitemap.xml in Google Search Console and Bing Webmaster Tools.
5. Consider X-Robots-Tag noindex,follow headers for Markdown and llm*.txt mirrors while keeping them public for AI discovery.
6. Build service and case-study pages when approved.
7. Have Privacy and Terms reviewed by counsel before relying on them as final legal text.
```

## Read next

```txt
01 Daily Logs/[C] 2026-06-20 Portfolio Honeypot and Legal Hardening.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio EOD SEO Social Footer and Content Updates.md
01 Daily Logs/[C] 2026-06-20 BennyAndPenny.com Portfolio Image Integration.md
```

Recent (2026-06-20, pending push to main): contact-form honeypot hardened (two traps + sub-2s time check);
Terms + Privacy expanded beyond templates (Terms keeps the 3 core sections, adds IP/acceptable-use/warranties/
liability/indemnification/governing-law/etc.; Privacy adds cookies/legal-bases/intl-transfers/CCPA — counsel
review still pending, per Open/next #7); mobile nav is now an animated, auto-closing client component.
