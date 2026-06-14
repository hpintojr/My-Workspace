---
type: problems
project: Benny & Penny's Adventures
updated: 2026-06-14
---

# Benny & Penny's Adventures Overview

## Goal

Build a children's publishing business around the Benny & Penny medical adventure book series, including:

- Public website.
- Digital ebook sales.
- Audiobook/audio sales.
- Print-on-demand book sales.
- Customer/member area.
- Payload CMS admin backend.
- Email list and contact management.
- Private digital/audio fulfillment.
- Social media and brand presence.
- Business infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

## Current Status

The project is now in **admin/compliance verification and client-portal preparation**.

Payload Admin is functional. The previous blank-center-panel blocker is resolved. The public book catalog reads from Payload/Neon with fallback. Stripe sandbox checkout is working enough to create order-related Payload records. The admin dashboard is now connected to live data. Contact/newsletter opt-in disclosures, legal/privacy pages, Privacy Requests, and Consent Logs have been added in code.

The immediate blocker is not design. The immediate blocker is verifying deployment and database schema after the newest changes.

## Completed / Confirmed

### Platform and CMS

- Cloudflare configured.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub deployment pipeline operational.
- Vercel deployments are back to normal working conditions after the prior Hobby deployment limit reset.
- Next.js route groups separated frontend and Payload Admin layouts.
- Payload CMS added to the Next.js project.
- Neon Postgres database created and connected.
- Payload Admin `/admin` loads and admin login works.
- First admin user was created.
- Payload Admin collection center panels render.
- Books catalog seeded into Neon/Payload with 9 records.
- Payload API confirmed it can read 9 Books records.
- Public `/books` and `/books/[slug]` pages read from Payload/Neon with a local fallback.

### Admin Dashboard

- Admin branding/theme work is active.
- Admin dashboard is connected to live Payload data.
- Dashboard data sources include:
  - Orders.
  - Order Items.
  - Customer Addresses.
  - Subscribers.
  - Support Tickets.
  - Books.
  - Users.
- Dashboard cards show live revenue/orders/items/subscribers.
- Sales Performance graph is interactive by dropdown range.
- Database Health card is approved for now.
- Recent Orders table was cleaned up.
- Recent Order Details table was removed from dashboard because it felt redundant.
- System Status checks were restored.

Sales graph behavior:

```txt
Today → hourly
Last 3 days → daily
Last 7 days → daily
Last 14 days → weekly
Last 30 days → weekly
Last 45 days → weekly
Last 60 days → weekly
Last 90 days → monthly
Last 120 days → monthly
This Past Year → monthly
```

Current requested sidebar:

```txt
Dashboard
Adventure Hub
Orders
Order Details
Customer Addresses
Subscribers
Support
Privacy Requests
Consent Logs
Settings
```

### Stripe / Orders

- Stripe checkout works in sandbox enough to generate Payload order data.
- Cart clears after checkout success.
- Orders are created.
- Order Details are stored separately in `order-items`.
- Customer Addresses are structured with billing/shipping type.
- New order ID sequence was changed to yearly sequence style:

```txt
26-0001
26-0002
26-0003
```

Existing sandbox records may still show older `BP-...` IDs unless backfilled.

### Contact, Newsletter, Legal, and Compliance

- Contact page converted from `mailto:` behavior to an on-site form.
- `/api/contact` exists and is connected to Mailjet client.
- Contact form includes required contact consent.
- Contact form includes optional email opt-in.
- Contact form includes optional SMS opt-in with TCPA-style language.
- Contact form stores consent proof fields when schema is available.
- Newsletter form now requires email opt-in.
- Newsletter signup logs consent events.
- Newsletter thank-you page now shows signup-specific copy instead of order copy.
- Privacy Request form added.
- Consent Logs collection added.
- Privacy Requests collection added.
- Footer legal links expanded.

Legal/compliance pages now include:

```txt
/privacy
/terms
/sms-terms
/privacy/california
/privacy/state-rights
/privacy/requests
```

Important legal/business gap:

- Marketing emails still need a valid physical mailing address or PO Box.
- Do not invent the address.
- Legal language still needs attorney review before launch.

## Active Problem

The active problem is **verification after schema and compliance changes**.

The following SQL patches need to be run in Neon before relying on the newest admin records:

```txt
docs/CONTACT_OPT_IN_SCHEMA_PATCH.md
docs/PRIVACY_COMPLIANCE_SCHEMA_PATCH.md
```

After those patches:

```txt
Redeploy main
Test contact form
Test newsletter signup
Test privacy request form
Test admin Consent Logs and Privacy Requests
Fix any schema/build/runtime issues
```

## Vercel Deployment Workflow

Vercel is back to normal working conditions, but the workflow decision remains:

- Stop committing/deploying every tiny fix directly to `main` when debugging.
- Group related fixes into larger commits.
- Prefer feature branches where practical.
- Redeploy only when the batch is ready to test.

Recommended future commit grouping:

```txt
1 commit = schema/compliance verification fixes
1 commit = setup/debug route removal
1 commit = client portal foundation
1 commit = R2/signed delivery integration
1 commit = workspace/docs update
```

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

## Payload Books Data Requirements

The Books collection supports the current public product pages.

Required fields:

```txt
number
slug
title
topic
ages
pages
badge
status
shortDescription
longDescription
coverImage
coverImagePath
pagePreviewOne
pagePreviewTwo
pdfPath
epubPath
audioPath
priceDigital
priceAudiobook
pricePaperback
priceHardcover
digitalDescription
audiobookDescription
paperbackDescription
hardcoverDescription
pdfObjectKey
epubObjectKey
audiobookObjectKey
stripeLookupKey
stripeDigitalPriceId
stripeAudiobookPriceId
stripePaperbackPriceId
stripeHardcoverPriceId
```

Seeded books:

1. Benny & Penny's Home Infusion Day.
2. Benny and Penny's Port Adventure.
3. Benny & Penny's PICC Line Adventure.
4. Benny & Penny's Special Line Adventure.
5. Benny & Penny's MRI Adventure.
6. Benny & Penny's Hospital Sleepover.
7. Benny & Penny's Ambulance Adventure.
8. Benny & Penny's Surgery Day.
9. Benny & Penny's Lab Draw Adventure.

## Current Payload Collections

- Books.
- Users / Customers & Admins.
- CustomerAddresses.
- ContactSubmissions.
- Subscribers.
- Orders.
- OrderItems.
- Downloads.
- SupportTickets.
- SupportMessages.
- AccessGrants.
- AuditLogs.
- PrivacyRequests.
- ConsentLogs.
- Payload system tables: preferences, locked documents, migrations.

## Temporary Setup / Debug Routes

Temporary setup/debug routes were created to bootstrap and inspect the Payload/Neon setup:

```txt
/api/setup-payload
/api/setup-payload-preferences
/api/setup-payload-catalog
/api/setup-payload-system
/api/debug-books
/api/debug-payload-books
```

These must be removed before production launch. After removal, rotate/delete `PAYLOAD_SETUP_SECRET`.

## Next Best Actions

1. Run Neon SQL patches.
2. Redeploy `main` for `hpintojr/bennyandpennyadventures`.
3. Test `/contact`.
4. Test newsletter signup and `/thank-you?email=...`.
5. Test `/privacy/requests`.
6. Test admin collections:
   - `privacy-requests`
   - `consent-logs`
   - `orders`
   - `order-items`
   - `customer-addresses`
7. Fix any deploy/schema/build errors.
8. Remove setup/debug routes and rotate/delete setup secret.
9. Start the Client Portal foundation.
