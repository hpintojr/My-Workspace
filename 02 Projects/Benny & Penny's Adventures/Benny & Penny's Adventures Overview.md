---
type: problems
project: Benny & Penny's Adventures
updated: 2026-06-12
---

# Benny & Penny's Adventures Overview

## Goal

Build a children's publishing business around the Benny & Penny book series, including:

- Website.
- Digital ebook sales.
- Print-on-demand book sales.
- Email marketing.
- Social media presence.
- Business infrastructure.

## Why

This is a family project and a way to generate extra income through digital products and future print products.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

## Current Status

The project has moved from planning into build and business infrastructure.

### Completed

- Cloudflare configured.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub deployment pipeline operational.
- First deployment completed.
- Homepage substantially completed.
- Majority of site UI completed.

## Current Priority Order

1. PO Box.
2. DBA filing.
3. Business bank account.
4. Stripe account.
5. Payload CMS setup.
6. Contact form system.
7. Email list database.
8. Cloudflare R2 setup.
9. Signed ebook delivery.
10. Lulu POD integration.

## Open Problems

### Business Formation

- [ ] Obtain PO Box.
- [ ] File Riverside County DBA.
- [ ] Open business bank account.
- [ ] Create Stripe account.

### Website Infrastructure

- [ ] Setup Payload CMS.
- [ ] Setup Postgres database.
- [ ] Configure Payload collections.
- [ ] Connect Payload to Next.js.

### Contact & Communications

- [ ] Configure `hello@bennyandpenny.com`.
- [ ] Connect Contact page form.
- [ ] Route website contact form submissions to `hello@bennyandpenny.com`.
- [ ] Send email notifications for new contact inquiries.
- [ ] Store inquiries in Payload CMS database.
- [ ] Add spam protection.
- [ ] Create inquiry categories.

### Email Marketing & Lead Collection

- [ ] Store newsletter signups in Payload CMS database.
- [ ] Send notification email when a new subscriber joins.
- [ ] Create subscriber admin dashboard.
- [ ] Enable CSV export.
- [ ] Integrate Mailjet.
- [ ] Capture source information for subscribers.

### Digital Fulfillment

- [ ] Setup Cloudflare R2 private bucket.
- [ ] Configure signed URL ebook delivery.
- [ ] Build Stripe webhooks.
- [ ] Build download tracking.
- [ ] Add download limits.
- [ ] Consider optional PDF watermarking.

### Print-On-Demand

- [ ] Evaluate Lulu Direct API.
- [ ] Prepare POD API setup.
- [ ] Build order automation workflow.
- [ ] Test fulfillment end-to-end.

## Recommended Payload Collections

- Books.
- Orders.
- Downloads.
- Subscribers.
- ContactSubmissions.
- Users.

## Next Session Focus

The site is no longer the main bottleneck. The current launch blockers are business setup, payment infrastructure, backend CMS setup, lead capture, and digital fulfillment.
