---
type: build-plan
project: Benny & Penny's Adventures
updated: 2026-06-12
status: build and commerce infrastructure phase
---

# Website Build Plan & Architecture

## Current Status

### Infrastructure Complete

- Cloudflare connected.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub connected.
- First deployment completed.
- Homepage largely complete.
- Majority of UI complete.

## Locked Stack

- Next.js with TypeScript.
- Payload CMS.
- Vercel hosting.
- GitHub deployment.
- Cloudflare DNS.
- Cloudflare R2 for private ebook storage.
- Stripe Checkout and webhooks.
- Mailjet for email list and email communications.
- Lulu Direct API for print-on-demand fulfillment later.

## Payload CMS Collections

### Core Collections

- Books.
- Orders.
- Downloads.
- Subscribers.
- ContactSubmissions.
- Users.

## Phase 0 — Business Foundation

- [ ] Obtain PO Box.
- [ ] File DBA.
- [ ] Open business bank account.
- [ ] Create Stripe account.

## Phase 1 — Payload CMS Setup

- [ ] Install/configure Payload CMS.
- [ ] Connect Postgres database.
- [ ] Configure admin user.
- [ ] Create Books collection.
- [ ] Create Subscribers collection.
- [ ] Create ContactSubmissions collection.
- [ ] Create Orders and Downloads collections.

## Phase 2 — Customer Communication & Lead Management

### Contact Forms

Current issue: the site contact action currently opens the visitor's email client. This must be replaced with a normal website form submission.

- [ ] Replace `mailto:` / email-client behavior with a real web form.
- [ ] Contact page submits to a Next.js API route or server action.
- [ ] API route/server action validates form input.
- [ ] Contact submission is saved to Payload CMS `ContactSubmissions` collection.
- [ ] Notification email is sent to `hello@bennyandpenny.com`.
- [ ] Visitor sees on-page success/error message without leaving the site.
- [ ] Spam protection enabled, preferably Cloudflare Turnstile.
- [ ] Inquiry categories supported.

### Newsletter System

- [ ] Homepage signup form.
- [ ] Footer signup form.
- [ ] Store subscribers in Payload CMS.
- [ ] Admin dashboard to search/view subscribers.
- [ ] CSV export capability.
- [ ] Mailjet synchronization.
- [ ] New subscriber email notification.
- [ ] Source tracking.

## Phase 2.5 — Legal Pages

- [ ] Draft Privacy Policy.
- [ ] Draft Terms of Service.
- [ ] Include contact email: `hello@bennyandpenny.com`.
- [ ] Explain collected data: contact form submissions, email signups, purchases, downloads, analytics/cookies if used.
- [ ] Explain children's privacy positioning: site and purchases are intended for adults/parents/guardians, not for children to submit personal information.
- [ ] Add refund/digital download language.
- [ ] Add intellectual property/copyright language.

## Phase 3 — Cloudflare R2 Ebook Delivery

- [ ] Create private R2 bucket.
- [ ] Upload ebook files, preferably under stable private paths such as `ebooks/book-1/home-infusion-day.pdf` and `ebooks/book-1/home-infusion-day.epub`.
- [ ] Keep R2 bucket private; do not make ebooks publicly accessible.
- [ ] Generate signed, time-limited URLs from the app after payment.
- [ ] Track downloads in Payload CMS `Downloads` collection.
- [ ] Enforce download limits in the app before generating each signed URL.
- [ ] Initial rule: max 3 downloads per purchased file/link.
- [ ] Initial rule: link expiration should be short-lived, such as 15 minutes to 24 hours, while the purchase access window can remain longer.
- [ ] Optional: watermark PDFs with buyer email.

## Phase 4 — Stripe Checkout & Fulfillment

- [ ] Create Stripe account.
- [ ] Configure products/prices.
- [ ] Build checkout flow.
- [ ] Build webhook route.
- [ ] Grant ebook access after payment.
- [ ] Trigger signed R2 download link.
- [ ] Send confirmation/fulfillment email.

## Phase 5 — Lulu Direct POD Integration

- [ ] Evaluate Lulu Direct API requirements.
- [ ] Configure Lulu API credentials.
- [ ] Map print SKUs.
- [ ] Connect paid print orders to Lulu order creation.
- [ ] Test sandbox fulfillment.
- [ ] Test live fulfillment before launch.

## Remaining Build Order

1. Payload CMS setup.
2. Postgres database.
3. Contact form system.
4. Subscriber management system.
5. Privacy Policy and Terms of Service pages.
6. Cloudflare R2.
7. Stripe integration.
8. Signed ebook delivery.
9. Lulu Direct API.
10. Production launch.

## Launch Blockers

### Business

- PO Box.
- DBA.
- Business bank account.
- Stripe account.

### Technical

- Payload CMS.
- R2 setup.
- Contact form storage and notification.
- Email subscriber storage, backend view, and CSV export.
- Privacy Policy and Terms of Service.
- Ebook delivery workflow.
- POD integration.
