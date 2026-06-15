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

The project is now in **admin polish verification and launch-readiness cleanup**.

Payload Admin is functional. The public book catalog reads from Payload/Neon with fallback. Stripe sandbox checkout is working enough to create order-related Payload records. The admin dashboard is connected to live data. Contact/newsletter opt-in disclosures, legal/privacy pages, Privacy Requests, and Consent Logs have been added in code.

The late-session admin QA pass fixed or improved sidebar active states, Users vs Customers routing, Media access, Orders detail access, Subscribers Yes/No boolean display, Payload row checkbox styling, and notification/toast styling. The immediate blocker is now final verification after deploy and cleanup of the layered admin CSS.

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

### Admin Dashboard and Admin Panel

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
- Dashboard expands when sidebar collapses.
- Dashboard search icon and top spacing were visually adjusted.
- Breadcrumb/profile/avatar clutter was removed from the dashboard.

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

Current admin sidebar direction:

```txt
Dashboard
Adventure Hub
Orders
Customers
Books
Media
Subscribers
Users
System Status Check
Privacy Requests
Log out
```

Admin polish completed or in verification:

- Sidebar active state now follows the current route instead of always highlighting Dashboard.
- Native Payload sidebar/current-page labels are hidden.
- Sidebar branding is centered with the rest of the nav elements.
- Customers and Users are separated by route behavior:
  - Customers = Users collection filtered to `role = customer`.
  - Users = full Users collection.
- Users collection labels were changed from Settings to Users.
- Media link works by exposing the Downloads collection as Media.
- Subscribers `Marketing Opt In` displays `Yes`/`No` instead of raw `true`/`false`.
- Yes/No styling was softened to match regular collection table typography.
- Row checkbox styling was debugged and narrowed away from broad select/button styling.
- Logout notification/toast styling has a global dark-teal override and needs final deploy verification.

### Stripe / Orders

- Stripe checkout works in sandbox enough to generate Payload order data.
- Cart clears after checkout success.
- Orders are created.
- Order Details are stored separately in `order-items`.
- Customer Addresses are structured with billing/shipping type.
- Order detail pages are now working after fixing the Payload locked-document schema issue.
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

The active problem is **verification after admin polish, schema patches, and deployment**.

The following SQL patches need to be run or confirmed in Neon before relying on the newest admin/compliance records:

```txt
docs/CONTACT_OPT_IN_SCHEMA_PATCH.md
docs/PRIVACY_COMPLIANCE_SCHEMA_PATCH.md
docs/PAYLOAD_LOCKED_DOCUMENTS_SCHEMA_PATCH.md
```

After those patches and latest deploy:

```txt
Redeploy main
Hard-refresh admin and login pages
Test admin collection styling and native Payload controls
Test contact form
Test newsletter signup
Test privacy request form
Test admin Consent Logs and Privacy Requests
Fix any schema/build/runtime/admin CSS issues
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
1 commit = admin CSS consolidation
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
- Downloads / Media.
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

1. Pull/deploy latest `hpintojr/bennyandpennyadventures` commits.
2. Hard-refresh admin and login pages.
3. Verify admin polish:
   - Row checkboxes match Select All.
   - Logout notification is dark teal.
   - Subscribers opt-in shows Yes/No with normal font.
   - Sidebar active states are correct.
   - Orders, Media, Users, and Customers all open correctly.
4. Run or confirm Neon SQL patches:
   - `docs/CONTACT_OPT_IN_SCHEMA_PATCH.md`.
   - `docs/PRIVACY_COMPLIANCE_SCHEMA_PATCH.md`.
   - `docs/PAYLOAD_LOCKED_DOCUMENTS_SCHEMA_PATCH.md`.
5. Consolidate admin CSS files after final QA.
6. Remove setup/debug routes and rotate/delete setup secret.
7. Start the Client Portal foundation.
