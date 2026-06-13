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
- Neon Postgres database created for Payload CMS.

## Locked Stack

- Next.js with TypeScript.
- Payload CMS.
- Neon Postgres.
- Vercel hosting.
- GitHub deployment.
- Cloudflare DNS.
- Cloudflare R2 for private ebook and audiobook storage.
- Stripe Checkout and webhooks.
- Mailjet for email list and email communications once account is unblocked.
- Lulu Direct API for print-on-demand fulfillment later.

## Free-First Hosting Plan

Use the lowest-cost launch stack:

- Vercel Hobby for the website, account pages, API routes, and Payload integration.
- Neon free Postgres for Payload data.
- Cloudflare R2 for private PDF, EPUB, and audiobook files.
- Cloudflare DNS for domain/DNS.
- GitHub for source control and deployment.
- Stripe standard checkout with no monthly fee.
- Mailjet free tier once account is unblocked.

Avoid paying for Payload Cloud, VPS hosting, or separate backend infrastructure until usage requires it.

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

## Payload CMS Purpose

Payload CMS is the private admin/backend control center for the site. It should manage:

- Book/product content.
- Customers.
- Orders.
- Downloads and access records.
- Subscribers.
- Contact submissions.
- Support tickets.
- Admin users.
- Access grants.
- Audit logs.

Payload also powers the future member area by storing the data the customer sees in `/account` pages.

## Payload CMS Collections

### Core Collections

- Books.
- Customers.
- CustomerAddresses.
- Orders.
- OrderItems.
- Downloads.
- Subscribers.
- EmailPreferences.
- ContactSubmissions.
- SupportTickets.
- SupportMessages.
- AccessGrants.
- AuditLogs.
- AdminUsers / Users.

## Customer / Member Area Scope

Recommended customer pages:

- `/account`
- `/account/orders`
- `/account/downloads`
- `/account/email-preferences`
- `/account/support`
- `/account/profile`

Customer should be able to:

- Log in.
- View orders.
- Find PDF, EPUB, and audiobook download links.
- See remaining downloads/access attempts.
- See expiration status.
- Update email preferences and marketing opt-in/opt-out.
- Submit support tickets tied to orders.
- Update profile settings.

## Optional Phone Fields

Add optional phone fields in:

- Customer profile.
- Shipping address.

Phone number rules:

- Optional only.
- Used for order, shipping, and support issues.
- Not used for SMS marketing unless the customer separately opts in.
- Add disclosure before collecting phone numbers.

## Admin Tools Scope

Admin should be able to:

- View customers.
- View orders.
- View downloads/access records.
- Reset download counts.
- Extend expiration dates.
- Resend download links.
- View download/access history.
- View and manage contact submissions.
- View and manage newsletter subscribers.
- View and manage email preferences.
- View and manage support tickets.
- Add internal ticket notes.
- Add manual access grants.
- Track audit logs for admin changes.

## Phase 0 — Business Foundation

- [ ] Obtain PO Box.
- [ ] File DBA.
- [ ] Open business bank account.
- [ ] Create Stripe account.
- [ ] Resolve Mailjet temporary account block.
- [ ] Rotate Neon database password because the original database URL was exposed in chat.
- [ ] Add rotated pooled database URL to Vercel as `DATABASE_URI`.
- [ ] Add `PAYLOAD_SECRET` to Vercel.
- [ ] Add `PAYLOAD_PUBLIC_SERVER_URL` to Vercel.

## Phase 1 — Payload CMS Setup

- [ ] Install/configure Payload CMS.
- [ ] Connect Neon Postgres database.
- [ ] Configure admin user.
- [ ] Create Books collection.
- [ ] Create Customers collection.
- [ ] Create CustomerAddresses collection.
- [ ] Create Subscribers collection.
- [ ] Create EmailPreferences collection.
- [ ] Create ContactSubmissions collection.
- [ ] Create Orders and OrderItems collections.
- [ ] Create Downloads collection.
- [ ] Create SupportTickets and SupportMessages collections.
- [ ] Create AccessGrants collection.
- [ ] Create AuditLogs collection.

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
- [ ] Store marketing opt-in/opt-out preferences.
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
- [ ] Add optional phone-number disclosure before collecting phone numbers.
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
- [ ] Create customer order history.

## Phase 5 — Member Area

- [ ] Build `/account` dashboard.
- [ ] Build `/account/orders`.
- [ ] Build `/account/downloads`.
- [ ] Build `/account/email-preferences`.
- [ ] Build `/account/support`.
- [ ] Build `/account/profile`.
- [ ] Allow customer to find download links.
- [ ] Allow customer to see remaining downloads/access attempts.
- [ ] Allow customer to submit support tickets tied to orders.

## Phase 6 — Lulu Direct POD Integration

- [ ] Evaluate Lulu Direct API requirements.
- [ ] Configure Lulu API credentials.
- [ ] Map print SKUs.
- [ ] Connect paid print orders to Lulu order creation.
- [ ] Test sandbox fulfillment.
- [ ] Test live fulfillment before launch.

## Later / Version 2 Ideas

- Gift purchases.
- Family/caregiver profile.
- Topic preferences.
- Free printable library.
- Bundle and series tracking.
- Bulk/institutional order requests.
- Review/testimonial collection.
- Coupon/access grants.
- Organization accounts for schools, clinics, hospitals, and nonprofits.

## Remaining Build Order

1. Rotate Neon database password and update Vercel with the new pooled `DATABASE_URI`.
2. Resolve Mailjet account block.
3. Payload CMS setup.
4. Neon Postgres connection.
5. Contact form database storage.
6. Subscriber management system.
7. Customer/member data model.
8. Support ticket model.
9. Cloudflare R2 private bucket.
10. Upload PDF/EPUB/audiobook files.
11. Stripe integration.
12. Signed ebook/audio delivery.
13. Member account pages.
14. Lulu Direct API.
15. Production launch.

## Launch Blockers

### Business

- PO Box.
- DBA.
- Business bank account.
- Stripe account.
- Mailjet account unblocked.

### Technical

- Rotated Neon database credentials installed in Vercel.
- Payload CMS.
- R2 setup.
- Contact form storage and notification.
- Email subscriber storage, backend view, and CSV export.
- Attorney-reviewed Privacy Policy and Terms of Service.
- Optional phone-number disclosure.
- Ebook/audio delivery workflow.
- POD integration.
