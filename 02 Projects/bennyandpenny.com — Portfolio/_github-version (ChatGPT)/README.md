# Benny & Penny's — A Tech Company

The technology and creative studio of **Hamilton Pinto Jr.** — software architect, creative technologist, and publisher. This is the personal/tech portfolio site under the Benny & Penny's banner.

## Purpose

This repository is for **BennyAndPenny.com**, Hamilton's portfolio and tech-company brand site.

It is intentionally separate from the Benny & Penny Adventures commerce application:

- **This site:** Hamilton's portfolio, the ventures/work, the studio brand, and aligned business inquiries, with backlinks to ACC, Advantage First Financial, Benny & Penny's Adventures, XBeton, and Mercury Call Desk.
- **Adventures/store app (`hpintojr/bennyandpennyadventures`):** product catalog, checkout, customer portal, digital delivery, gifting, and cart recovery.

## Pages

- Home — portfolio hero, capabilities, and selected ventures
- Work (`/our-work`) — ventures detail with outbound links (XBeton, AFF, Benny & Penny's Adventures, Mercury, 60+ establishments)
- Adventures (`/families`) — the Benny & Penny's Adventures publishing imprint spotlight
- About (`/about`) — Hamilton's background and stats
- Contact (`/work-with-us`) — engagement types and direct email

## Launch v1 included

- Responsive multi-page portfolio with a clear personal/tech-company position.
- Backlinks to the five ventures (footer + work tiles), plus Person JSON-LD `sameAs`.
- Search foundations: page metadata, canonical URL, Person schema, sitemap, robots, and a social-sharing image.
- CSS-first visual direction (teal/mint) that works before final photography and book art are ready.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production deployment

1. This repo is connected to Vercel; pushing `main` triggers a production deploy.
2. Attach `bennyandpenny.com` and `www.bennyandpenny.com` to the Vercel project and point DNS.
3. Verify `https://bennyandpenny.com/sitemap.xml` and `/robots.txt` after deployment.
4. Submit the live domain to Google Search Console and Bing Webmaster Tools.

## Before public launch

- [ ] Confirm `hello@bennyandpenny.com` is an active mailbox and configure SPF, DKIM, and DMARC.
- [ ] Replace the CSS-only placeholders with approved photography, a Hamilton portrait, and book-preview art.
- [ ] Add a privacy policy and terms page before collecting any form data.
- [ ] Choose lead routing if/when a contact form replaces direct email.

## Content guardrail

This site positions **Benny & Penny's as Hamilton's tech-company banner and personal portfolio**, with the Adventures books as one featured venture. Do not blend customer accounts, orders, checkout, or store-specific policies into this repository.
