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
- Contact form converted from `mailto:` to a normal web form submission flow.
- Privacy Policy and Terms of Service pages drafted and updated for launch-readiness.
- Audiobook product option added at `$21.99`.

## Locked Stack

- Next.js with TypeScript.
- Payload CMS.
- Vercel hosting.
- GitHub deployment.
- Cloudflare DNS.
- Cloudflare R2 for private ebook and audiobook storage.
- Stripe Checkout and webhooks.
- Mailjet for email list and email communications once account is unblocked.
- Lulu Direct API for print-on-demand fulfillment later.

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

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
- [ ] Resolve Mailjet temporary account block.

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

- [x] Replace `mailto:` / email-client behavior with a real web form.
- [x] Contact page submits to a Next.js API route.
- [x] API route validates form input.
- [x] Visitor sees on-page success/error message without leaving the site.
- [x] Connect API route to Mailjet API client.
- [ ] Resolve Mailjet account block before email notifications can send successfully.
- [ ] Contact submission is saved to Payload CMS `ContactSubmissions` collection.
- [ ] Notification email is sent to `hello@bennyandpenny.com` after Mailjet account is unblocked.
- [ ] Spam protection enabled, preferably Cloudflare Turnstile.
- [ ] Inquiry categories supported.

### Newsletter System

- [ ] Homepage signup form.
- [ ] Footer signup form.
- [ ] Store subscribers in Payload CMS.
- [ ] Admin dashboard to search/view subscribers.
- [ ] CSV export capability.
- [ ] Mailjet synchronization after account unblock.
- [ ] New subscriber email notification.
- [ ] Source tracking.

## Phase 2.5 — Legal Pages

- [x] Draft Privacy Policy.
- [x] Draft Terms of Service.
- [x] Include contact email: `hello@bennyandpenny.com`.
- [x] Explain collected data: contact form submissions, email signups, purchases, downloads, analytics/cookies if used.
- [x] Explain children's privacy positioning: site and purchases are intended for adults/parents/guardians, not for children to submit personal information.
- [x] Add refund/digital download language.
- [x] Add intellectual property/copyright language.
- [x] Add audiobook/audio access disclosures.
- [ ] Attorney review before accepting payments.

## Phase 3 — Cloudflare R2 Ebook and Audiobook Delivery

- [ ] Create private R2 bucket.
- [ ] Upload ebook files under stable private paths such as `ebooks/book-1/home-infusion-day.pdf` and `ebooks/book-1/home-infusion-day.epub`.
- [ ] Upload audiobook files under stable private paths such as `audiobooks/book-1/home-infusion-day.mp3`.
- [ ] Keep R2 bucket private; do not make ebooks or audiobooks publicly accessible.
- [ ] Store PDF, EPUB, and audiobook object keys in Payload CMS Books collection.
- [ ] Generate signed, time-limited URLs from the app after payment.
- [ ] Track downloads/access in Payload CMS `Downloads` collection.
- [ ] Enforce download/access limits in the app before generating each signed URL.
- [ ] Initial rule: max 3 downloads/access attempts per purchased file/link.
- [ ] Initial rule: link expiration should be short-lived, such as 15 minutes to 24 hours, while the purchase access window can remain longer.
- [ ] Optional: watermark PDFs with buyer email.

## Phase 4 — Stripe Checkout & Fulfillment

- [ ] Create Stripe account.
- [ ] Configure products/prices for PDF/EPUB, audiobook, paperback, and hardcover.
- [ ] Build checkout flow.
- [ ] Build webhook route.
- [ ] Grant ebook/audio access after payment.
- [ ] Trigger signed R2 download/access link.
- [ ] Send confirmation/fulfillment email.

## Phase 5 — Lulu Direct POD Integration

- [ ] Evaluate Lulu Direct API requirements.
- [ ] Configure Lulu API credentials.
- [ ] Map print SKUs.
- [ ] Connect paid print orders to Lulu order creation.
- [ ] Test sandbox fulfillment.
- [ ] Test live fulfillment before launch.

## Remaining Build Order

1. Resolve Mailjet account block.
2. Payload CMS setup.
3. Postgres database.
4. Contact form database storage.
5. Subscriber management system.
6. Cloudflare R2 private bucket.
7. Upload PDF/EPUB/audiobook files.
8. Stripe integration.
9. Signed ebook/audio delivery.
10. Lulu Direct API.
11. Production launch.

## Launch Blockers

### Business

- PO Box.
- DBA.
- Business bank account.
- Stripe account.
- Mailjet account unblocked.

### Technical

- Payload CMS.
- R2 setup.
- Contact form storage and notification.
- Email subscriber storage, backend view, and CSV export.
- Attorney-reviewed Privacy Policy and Terms of Service.
- Ebook/audio delivery workflow.
- POD integration.
