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

- [ ] Contact page submits to Payload CMS.
- [ ] Notification email sent to `hello@bennyandpenny.com`.
- [ ] Inquiry stored in database.
- [ ] Spam protection enabled.
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

## Phase 3 — Cloudflare R2 Ebook Delivery

- [ ] Create private R2 bucket.
- [ ] Upload ebook files.
- [ ] Generate signed, time-limited URLs.
- [ ] Track downloads.
- [ ] Add download limits.
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
5. Cloudflare R2.
6. Stripe integration.
7. Signed ebook delivery.
8. Lulu Direct API.
9. Production launch.

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
- Ebook delivery workflow.
- POD integration.
