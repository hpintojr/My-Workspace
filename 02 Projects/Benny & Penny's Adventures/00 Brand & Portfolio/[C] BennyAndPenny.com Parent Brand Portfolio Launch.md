---
author: ChatGPT
type: project-launch
project: Benny & Penny's Adventures
date: 2026-06-19
---

# BennyAndPenny.com — Parent Brand Portfolio Launch

## Status

**Codebase established on 2026-06-19.**

Repository: `hpintojr/bennyandpenny`

This is the standalone **Next.js 15 parent-brand portfolio site** for the broader Benny & Penny creative business. It is intentionally separate from the `bennyandpennyadventures` ecommerce application, but it belongs inside this existing **Benny & Penny's Adventures** workspace project because it supports the same brand and business.

## Brand Position

> Benny & Penny is a family-built creative and care-centered brand creating meaningful children’s stories, visual experiences, family resources, and mission-driven projects.

## Purpose

BennyAndPenny.com is the public parent brand and portfolio platform for gaining aligned business, creative, publishing, family-resource, and mission-driven opportunities. The Adventures books are a featured creative branch, not the entire website identity.

## Scope Boundary

```txt
BennyAndPenny.com — parent-brand portfolio repo
- Brand story
- Creative portfolio
- Featured Benny & Penny's Adventures project
- Family-resource vision
- Family/about story
- Collaboration inquiry
- SEO and brand discovery

Benny & Penny Adventures ecommerce repo
- Storefront / catalog
- Checkout
- Customer portal
- Digital delivery
- Gifting
- Cart recovery
- Customer orders and account data

Benny & Penny's Adventures Book Series workspace project
- Manuscripts, character locks, page briefs, Canva, print/e-book/audio/locales production
```

Keep the two code repositories separate. They serve different public roles and should not be merged.

## Launch v1 — Committed

```txt
- Next.js 15 + TypeScript structure
- Responsive home page
- Our Work page
- For Families page
- Our Family page
- Work With Us inquiry page
- Direct inquiry route: hello@bennyandpenny.com
- Canonical metadata, page metadata, Organization JSON-LD
- sitemap.xml and robots.txt routes
- Dynamic social-sharing image
- README with Vercel deployment and launch checklist
```

## Immediate Launch Actions

1. Import `hpintojr/bennyandpenny` into Vercel with `main` as Production Branch.
2. Attach `bennyandpenny.com` and `www.bennyandpenny.com` to the Vercel project and set DNS records.
3. Confirm `hello@bennyandpenny.com` is an active mailbox, then configure SPF, DKIM, and DMARC.
4. Make the first Vercel production build the code validation step; local build could not run in ChatGPT because the runtime had no DNS access to GitHub/npm.
5. Replace CSS-only visual placeholders with approved brand photography, illustrated family portraits, and book-preview artwork.
6. Decide on inquiry routing before enabling a form: direct email, Resend, GoHighLevel, HubSpot, or another CRM.
7. Add Privacy and Terms pages before collecting inquiry-form or newsletter data.
8. Add final social URLs, analytics, and Search Console/Bing Webmaster Tools after production deployment.

## Content Rules

```txt
- Position Benny & Penny as the umbrella family-built creative brand.
- Keep language warm, care-centered, thoughtful, and professionally credible.
- Do not claim specific outcomes, partnerships, or services not yet approved.
- Show Benny & Penny's Adventures as the featured first story world.
- Use the portfolio to invite aligned collaboration rather than pushing ecommerce sales.
```
