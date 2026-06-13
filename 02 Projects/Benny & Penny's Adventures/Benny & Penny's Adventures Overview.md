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
- Audiobook/audio sales.
- Print-on-demand book sales.
- Email marketing.
- Social media presence.
- Business infrastructure.

## Why

This is a family project and a way to generate extra income through digital, audio, and future print products.

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
- Contact form converted from email-client behavior to a real web form submission flow.
- Contact API route connected to Mailjet API.
- Mailjet issue diagnosed as an account-level temporary block, not a code issue.
- Privacy Policy updated with digital, audio, payment, contact, newsletter, and children's privacy language.
- Terms of Service updated with PDF/EPUB, audiobook/audio, POD, refund, IP, and acceptable-use language.
- Audiobook product option added at `$21.99`.

## Current Priority Order

1. Resolve Mailjet account block / sender approval.
2. PO Box.
3. DBA filing.
4. Business bank account.
5. Stripe account.
6. Payload CMS setup.
7. Contact submission storage.
8. Email list database.
9. Cloudflare R2 setup.
10. Signed ebook/audio delivery.
11. Lulu POD integration.

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

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

- [x] Replace Contact page `mailto:` / email-client behavior with a real web form.
- [x] Add `/api/contact` route.
- [x] Connect Contact page form to server-side API route.
- [x] Connect Contact API route to Mailjet API.
- [ ] Resolve Mailjet account temporary block.
- [ ] Route website contact form notifications to `hello@bennyandpenny.com` after Mailjet is unblocked.
- [ ] Store inquiries in Payload CMS database.
- [ ] Add spam protection.
- [ ] Create inquiry categories.

### Email Marketing & Lead Collection

- [ ] Store newsletter signups in Payload CMS database.
- [ ] Send notification email when a new subscriber joins.
- [ ] Create subscriber admin dashboard.
- [ ] Enable CSV export.
- [ ] Integrate Mailjet after account is unblocked.
- [ ] Capture source information for subscribers.

### Legal / Compliance

- [x] Privacy Policy updated.
- [x] Terms of Service updated.
- [x] Add audiobook/audio disclosures.
- [ ] Attorney review before accepting payments.

### Digital and Audio Fulfillment

- [ ] Setup Cloudflare R2 private bucket.
- [ ] Upload PDF files to private R2 paths.
- [ ] Upload EPUB files to private R2 paths.
- [ ] Upload audiobook/audio files to private R2 paths.
- [ ] Configure signed URL ebook delivery.
- [ ] Configure signed URL audiobook/audio delivery.
- [ ] Build Stripe webhooks.
- [ ] Build download/access tracking.
- [ ] Add download limits, initially max 3 downloads/access attempts.
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

## R2 Private Object Path Direction

Recommended private R2 object keys:

```txt
ebooks/book-1/home-infusion-day.pdf
ebooks/book-1/home-infusion-day.epub
audiobooks/book-1/home-infusion-day.mp3
```

Each book should eventually store PDF, EPUB, and audiobook object keys in Payload CMS rather than public URLs.

## Next Session Focus

The site is no longer the main bottleneck. The current launch blockers are Mailjet account approval, business setup, payment infrastructure, backend CMS setup, lead capture, and private digital/audio fulfillment.
