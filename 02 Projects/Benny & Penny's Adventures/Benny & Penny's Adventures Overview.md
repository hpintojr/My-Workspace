---
type: problems
project: Benny & Penny's Adventures
updated: 2026-06-13
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

The project is now in backend/CMS integration and commerce infrastructure buildout.

### Completed / Confirmed

- Cloudflare configured.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub deployment pipeline operational.
- First deployment completed.
- Homepage and most public website UI substantially completed.
- Contact page converted from `mailto:` behavior to an on-site form.
- `/api/contact` created and connected to Mailjet client.
- Mailjet issue diagnosed as account-level temporary block, not a code issue.
- Privacy Policy and Terms of Service updated for digital, audio, POD, payment, and privacy topics.
- Audiobook product option added at `$21.99`.
- Neon Postgres database created.
- Vercel Node.js version confirmed as `20.x`.
- Payload CMS added to the Next.js project.
- Payload Admin `/admin` loads and admin login works.
- First admin user was created.
- Payload collections were defined for books, users, orders, downloads, subscribers, support, access grants, and audit logs.
- Books catalog was seeded into Neon/Payload with 9 records.
- Payload API confirmed it can read 9 Books records.
- Public `/books` and `/books/[slug]` pages were updated to read from Payload/Neon with a local fallback.

### Active Problem

Payload Admin sidebar renders, but collection center panels are blank for all collections.

Confirmed facts:

- Raw database debug endpoint can read 9 books.
- Payload API debug endpoint can read 9 books.
- The issue is not the Books data layer.
- Browser console showed React minified error `#418`, indicating a hydration mismatch.
- Likely cause: public website root layout was wrapping Payload Admin. Payload's admin `RootLayout` renders its own `<html>` and `<body>`, so it must be isolated from the public website layout.

Fix direction already committed in the website repo:

```txt
app/(frontend)/layout.tsx  → public website layout and CartProvider
app/(payload)/layout.tsx   → Payload Admin layout only
```

Next deployment must verify this fixes the admin center panel rendering.

## Vercel Deployment Limit

Vercel Hobby hit the daily deployment cap during troubleshooting:

```txt
Resource is limited - try again in 24 hours
more than 100 deployments free per day
```

Workflow change:

- Stop committing/deploying every tiny fix directly to `main`.
- Group related fixes into larger commits.
- Prefer feature branches and merge once a batch is ready.
- Redeploy only when the batch is ready to test.

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

## Payload Books Data Requirements

The Books collection must support the current public product pages.

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

## Recommended Payload Collections

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

## Current Priority Order

1. Wait for Vercel deployment limit to reset or upgrade Vercel if immediate deploys are required.
2. Redeploy the latest route-group/admin-layout fix once.
3. Verify `/admin/collections/books` and other admin collection pages render center panels.
4. Verify public site routes after `(frontend)` route-group move.
5. Restore full Privacy/Terms/For Parents/Thank You content if any route-group placeholders remain.
6. Remove temporary setup/debug routes after Payload Admin stabilizes.
7. Rotate/delete `PAYLOAD_SETUP_SECRET`.
8. Rotate Neon and Mailjet credentials if not already done.
9. Resolve Mailjet account block.
10. Store contact submissions and subscribers in Payload.
11. Set up Cloudflare R2 private bucket.
12. Add Stripe products/checkout/webhooks.
13. Build signed ebook/audio delivery.
14. Build member area.
15. Prepare Lulu Direct POD integration.

## Business Tasks Still Open

- PO Box.
- DBA filing.
- Business bank account.
- Stripe account.
- Mailjet account unblock.
- Attorney review before taking payments.

## Legal / Compliance Notes

- Privacy Policy and Terms were drafted, but must be rechecked after the route-group refactor.
- If simplified placeholder content remains in `(frontend)/privacy` or `(frontend)/terms`, restore the full text from Git history before launch.
- Add phone-number disclosure before collecting optional phone numbers.
- SMS marketing must remain separate and opt-in only.

## Digital / Audio Fulfillment Direction

Paid files must be private, not permanent public downloads.

Recommended R2 keys:

```txt
ebooks/book-1/home-infusion-day.pdf
ebooks/book-1/home-infusion-day.epub
audiobooks/book-1/home-infusion-day.mp3
```

Fulfillment flow:

```txt
Stripe payment complete
→ Payload creates order/access/download records
→ customer requests file
→ app checks access limits
→ app creates short-lived signed R2 URL
→ app logs download/access attempt
```

Initial rule: max 3 downloads/access attempts per purchased file/link.
