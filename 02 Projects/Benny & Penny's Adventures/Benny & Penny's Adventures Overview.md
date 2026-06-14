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

The project is now in **backend/CMS stabilization and admin experience cleanup**.

The major Payload/Vercel blocker from earlier in the day has been cleared: Vercel deployments are back to normal working conditions, Payload Admin loads, Books show in the backend, and the Books catalog is seeded in Neon/Payload with 9 records.

The current concern is no longer whether Payload works. The current concern is that the admin experience still needs to feel like a polished **Benny & Penny's Admin Panel**, not a lightly themed generic Payload backend.

### Completed / Confirmed

- Cloudflare configured.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub deployment pipeline operational.
- Vercel deployments are back to normal working conditions after the prior Hobby deployment limit reset.
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
- Payload Admin `/admin/collections/books` now renders the Books list and individual Book edit pages.
- Public `/books` and `/books/[slug]` pages were updated to read from Payload/Neon with a local fallback.
- Payload admin branding work started:
  - Benny & Penny login logo component added.
  - Benny & Penny heart icon component added.
  - Admin font/CSP support updated for Google Fonts.
  - Admin CSS/theme pass added for cream, teal, coral, gold, Nunito, and Playfair Display.
  - Modern dashboard mockup direction started in code with a `BeforeDashboard` component and dashboard styles.
- Build issue from internal admin dashboard links was fixed by replacing internal `<a>` links with Next `<Link />`.

### Resolved Problems

#### Payload Admin blank center panel

Previously, Payload Admin sidebar rendered but the collection center panels were blank.

Confirmed during troubleshooting:

- Raw database debug endpoint could read 9 books.
- Payload API debug endpoint could read 9 books.
- The issue was not the Books data layer.
- Browser console showed React minified error `#418`, indicating a hydration mismatch.
- Additional issues appeared from missing Payload preference columns and CSP restrictions.

Fixes applied:

- Public site and Payload Admin were separated into route groups:

```txt
app/(frontend)/layout.tsx  → public website layout and CartProvider
app/(payload)/layout.tsx   → Payload Admin layout only
```

- Payload preference table was repaired so `payload_preferences_rels.order` exists.
- Admin CSP was updated so Payload Admin scripts can run and admin fonts can load.
- Books table was aligned and seeded.

Current result:

```txt
/admin/collections/books works
Books table shows 9 records
Book edit pages open
```

#### Vercel deployment limit

Vercel Hobby previously hit the daily deployment cap during rapid troubleshooting:

```txt
Resource is limited - try again in 24 hours
more than 100 deployments free per day
```

Current update:

- Vercel limits are back to normal working conditions.
- Production deployments from `main` are working again.
- Continue grouping changes and avoid tiny repeated production commits when possible.

## Active Problem

The **functional admin is working**, but Hamilton is not happy with the current admin dashboard/theme.

Specific concerns:

- Login screen still needs stronger field contrast.
- Email/password text and input styling must be easier to see.
- Login button color/text must be clearer.
- Dashboard needs a more modern product/business dashboard look.
- Admin navigation should be simplified around the real business workflow:

```txt
Dashboard
Orders
Product Catalog
Subscribers
Settings

Log out at bottom
```

- The current Payload nav still exposes too many backend collections as top-level items.
- The mockup direction should guide the next admin redesign:
  - Sales status cards.
  - Books sold.
  - Active titles.
  - Subscriber growth.
  - Latest orders.
  - Latest subscribers.
  - Quick links.
  - Better sidebar hierarchy.
  - Benny & Penny heart branding instead of Payload mini-logo where possible.

## Vercel Deployment Workflow

Vercel is back to normal working conditions, but the workflow decision remains:

- Stop committing/deploying every tiny fix directly to `main` when debugging.
- Group related fixes into larger commits.
- Prefer feature branches and merge once a batch is ready.
- Redeploy only when the batch is ready to test.

Recommended future commit grouping:

```txt
1 commit = full admin theme/dashboard pass
1 commit = navigation/collection grouping cleanup
1 commit = setup/debug route removal
1 commit = Stripe/R2 fulfillment integration
1 commit = workspace/docs update
```

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

Important security note:

- `PAYLOAD_SETUP_SECRET` was visible in screenshots during troubleshooting.
- Treat it as exposed.
- Rotate it after setup/debug routes are removed or disabled.

## Current Priority Order

1. Confirm the latest Vercel build passes after the admin dashboard Link fix.
2. Rework the Payload Admin UI so it feels like **Benny & Penny's Admin Panel**, not generic Payload.
3. Improve login field/button contrast and readability.
4. Simplify admin navigation toward:
   ```txt
   Dashboard
   Orders
   Product Catalog
   Subscribers
   Settings
   Log out
   ```
5. Activate or rebuild the custom dashboard experience based on the mockup.
6. Verify `/admin/collections/books`, `/admin/collections/subscribers`, `/admin/collections/contact-submissions`, and `/admin/collections/orders`.
7. Verify public routes:
   ```txt
   /
   /books
   /books/[slug]
   /contact
   /privacy
   /terms
   /for-parents
   /thank-you
   ```
8. Remove temporary setup/debug routes after Payload Admin stabilizes.
9. Rotate/delete `PAYLOAD_SETUP_SECRET`.
10. Rotate Neon and Mailjet credentials if not already done.
11. Resolve Mailjet account block.
12. Set up Cloudflare R2 private bucket.
13. Add Stripe products/checkout/webhooks.
14. Build signed ebook/audio delivery.
15. Build member area.
16. Prepare Lulu Direct POD integration.

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
