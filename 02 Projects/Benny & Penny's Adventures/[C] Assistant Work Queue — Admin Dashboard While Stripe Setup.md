---
type: work-queue
project: Benny & Penny's Adventures
created: 2026-06-13
status: active
---

# Assistant Work Queue — Admin Dashboard While Stripe Setup

## Purpose

Hamilton is setting up the Stripe account. While that happens, the assistant should focus on work that does not require live Stripe credentials.

The goal is to keep development moving without waiting on Stripe account completion.

## Current Known State

- Payload Admin is functional.
- Admin login works.
- Neon is connected.
- Books are seeded with 9 records.
- `/admin/collections/books` renders.
- Individual Book edit pages open.
- The public product pages read from Payload/Neon with local fallback.
- The current admin theme/dashboard is not approved yet.
- The approved dashboard direction is the warm branded mockup with a simplified sidebar, KPI cards, recent orders, recent subscribers, quick links, and a bear PNG placeholder.

## Hamilton's Current Task

Hamilton is setting up the Stripe account/sandbox.

Hamilton should avoid pasting live secret keys into chat or committing them to GitHub.

When ready, Hamilton can provide non-secret confirmation such as:

```txt
Stripe sandbox is created.
Products/prices are ready.
I added the test env vars in Vercel/local.
```

Do not ask Hamilton to paste secret keys into chat.

## Assistant Work Queue

### 1. Admin Dashboard Redesign Pass

Focus on making `/admin` feel like Benny & Penny's Admin Panel instead of generic Payload.

Tasks:

- Rework dashboard layout to follow the approved sample mockup.
- Add top header with:
  - `Benny & Penny's Adventures | Admin Dashboard`.
  - Help icon placeholder.
  - Notification icon placeholder.
  - User/avatar control placeholder.
- Add welcome strip:

```txt
Welcome, Nurse Ivy! 🧸 Benny and Penny are ready to manage your book sales and community!
```

- Add KPI cards:
  - Total Book Sales.
  - Books Sold.
  - Active Book Titles.
  - Subscriber Growth.
- Add dashboard sections:
  - Book Sales Performance.
  - Sales by Region.
  - Latest Community Newsletter Subscribers.
  - Recent Book Sales Orders.
  - Quick Links.
  - System Status.

### 2. Sidebar Cleanup

Simplify admin navigation toward the approved structure:

```txt
Dashboard
Orders
Product Catalog
Subscribers
Settings

Log out
```

Add a reserved bear PNG area near the bottom of the sidebar above Log out.

Suggested placeholder file:

```txt
/public/admin/bear-sidebar-placeholder.png
```

Do not hardcode final artwork. The placeholder must be replaceable by dropping in a PNG later.

### 3. Login Contrast Pass

Verify and improve:

- Email input contrast.
- Password input contrast.
- Field labels.
- Login button color and readability.
- Error/help text readability.

The login screen should keep the existing Benny & Penny logo/name treatment that Hamilton likes.

### 4. Product Catalog Visual Cleanup

Improve the existing Product Catalog page/table styling:

- Better page header spacing.
- Cleaner search/filter controls.
- Card-like table container.
- Better status badges for:
  - Cover Ready.
  - Coming Soon.
- Less harsh table controls.
- Keep Product Catalog active in sidebar.

### 5. Mock Data Layer for Dashboard

Prepare mock data without needing Stripe credentials.

Create local/static mock data for:

- Sales totals.
- Books sold.
- Subscriber growth.
- Monthly sales chart values.
- Region chart values.
- Recent orders.
- Recent subscribers.
- System status items.

This can later be replaced with real Payload/Stripe data.

### 6. Stripe Sandbox Integration Prep

Prepare the code/documentation shape for Stripe without needing live secrets.

Expected model:

- One Stripe Product per book.
- Four Stripe Prices per book:
  - PDF / EPUB: $15.99.
  - Audiobook: $21.99.
  - Paperback: $17.99.
  - Hardcover: $24.99.

Expected lookup keys:

```txt
book_1_digital
book_1_audiobook
book_1_paperback
book_1_hardcover
```

Expected Payload Books fields:

```txt
stripeDigitalPriceId
stripeAudiobookPriceId
stripePaperbackPriceId
stripeHardcoverPriceId
stripeLookupKey
```

### 7. Route Verification Checklist

After dashboard/theme work, verify:

```txt
/admin
/admin/login
/admin/collections/books
/admin/collections/subscribers
/admin/collections/contact-submissions
/admin/collections/orders
/
/books
/books/[slug]
/contact
/privacy
/terms
/for-parents
/thank-you
```

### 8. Cleanup After Admin Stabilizes

After the admin is stable:

- Remove temporary setup/debug routes.
- Rotate/delete `PAYLOAD_SETUP_SECRET`.
- Replace temporary setup SQL with proper migrations later.

Temporary routes to remove before production:

```txt
/api/setup-payload
/api/setup-payload-preferences
/api/setup-payload-catalog
/api/setup-payload-system
/api/debug-books
/api/debug-payload-books
```

## Do Not Do While Waiting for Stripe

- Do not require live Stripe credentials to design the dashboard.
- Do not commit Stripe secret keys.
- Do not commit webhook signing secrets.
- Do not commit real customer/payment data.
- Do not deploy many tiny dashboard fixes directly to main if avoidable.
- Do not remove setup/debug routes until admin stability is confirmed.

## Next Handoff Prompt

When picking this back up, use:

```txt
Read the Assistant Work Queue for Benny & Penny. Hamilton is setting up Stripe. Start with the admin dashboard redesign and sidebar cleanup using the approved mockup direction.
```
