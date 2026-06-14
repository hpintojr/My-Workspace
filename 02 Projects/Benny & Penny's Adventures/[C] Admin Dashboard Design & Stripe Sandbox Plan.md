---
type: implementation-plan
project: Benny & Penny's Adventures
created: 2026-06-13
status: reference
---

# Admin Dashboard Design & Stripe Sandbox Plan

## Goal

Create a more polished Benny & Penny Admin Panel experience with a branded dashboard, useful sidebar organization, and realistic commerce/customer mock data for development.

The dashboard should feel like a warm children's publishing operations center, not a generic database admin panel.

## Current Context

The project already uses:

- Next.js 15.4.11.
- Payload CMS 3.x.
- Neon Postgres.
- Vercel.
- Cloudflare DNS and future R2 storage.
- Stripe Checkout and webhooks planned.
- Mailjet planned after account unblock.
- Lulu Direct planned later.

Before major dashboard styling work, verify that Payload Admin collection center panels render correctly after the route-group/layout isolation fix.

Current expected layout split:

```txt
app/(frontend)/layout.tsx = public website layout
app/(payload)/layout.tsx = Payload Admin layout
```

## Dashboard Build Strategy

Use Payload Admin for authenticated backend operations, but add a custom branded dashboard view as the first screen after login.

Recommended approach:

1. Keep Payload collections for CRUD-heavy work.
2. Add a custom `/admin` dashboard home view or equivalent Payload custom admin view.
3. Theme the admin panel with Benny & Penny colors, typography, cards, and dashboard sections.
4. Organize the sidebar by business function, not raw database tables.
5. Seed realistic mock data through Stripe sandbox and Payload seed scripts.

## Admin Design Theme

### Brand Feeling

- Warm.
- Caring.
- Family-friendly.
- Medical-adventure focused.
- Professional enough for orders, customers, and compliance.

### Suggested Visual Direction

- Cream/off-white background.
- Soft teal and blue accents.
- Blush/pink highlight accents.
- Rounded cards.
- Gentle shadows.
- Clear large numbers for sales/order/admin KPIs.
- Simple icons for each sidebar group.

### Dashboard Cards

Top KPI cards:

- Total Orders.
- Revenue this month.
- Digital downloads issued.
- Pending support tickets.
- New subscribers.
- Contact inquiries.

Middle sections:

- Recent Orders.
- Recent Contact Submissions.
- Recent Subscribers.
- Download/access warnings.
- Stripe Webhook Health.
- R2 Fulfillment Status.

Bottom sections:

- Launch Checklist.
- Business Setup Checklist.
- System Alerts.

## Recommended Sidebar Organization

Instead of exposing only raw collection names, organize the sidebar around real admin workflows.

### Dashboard

- Overview.
- Launch Checklist.
- System Health.

### Store

- Books.
- Products & Formats.
- Stripe Prices.
- Orders.
- Order Items.
- Refunds / Adjustments.

### Customers

- Customers.
- Customer Addresses.
- Member Accounts.
- Manual Access Grants.

### Fulfillment

- Downloads.
- Access Attempts.
- R2 Files.
- Resend Download Link.
- Reset Download Count.

### Marketing

- Subscribers.
- Email Preferences.
- CSV Export.
- Mailjet Sync.

### Support

- Contact Submissions.
- Support Tickets.
- Support Messages.

### Content

- Website Pages.
- Book Metadata.
- Media Library.
- Resources / For Parents.

### Compliance

- Privacy Policy.
- Terms of Service.
- Audit Logs.
- Admin Users.
- Temporary Setup Route Cleanup.

### Integrations

- Stripe.
- Mailjet.
- Cloudflare R2.
- Lulu Direct.
- Neon / Database.

## Stripe Sandbox Recommendation

Using Stripe sandbox/test data is a good idea and should be part of dashboard development.

Why it helps:

- Creates realistic products, prices, customers, checkout sessions, payment intents, and webhook events.
- Lets the dashboard show real order/payment states instead of static placeholder cards.
- Helps test the exact flow from Stripe payment to Payload order/access records.
- Makes it easier to design the admin view around real operations.

## Stripe Sandbox Setup Plan

1. Create or use a Stripe sandbox.
2. Use sandbox/test API keys only.
3. Add test environment variables to Vercel/local `.env`.
4. Create Stripe products and prices for the 9 books and 4 formats.
5. Store Stripe price IDs or lookup keys in Payload Books.
6. Build checkout session creation.
7. Build webhook route.
8. Use Stripe CLI locally to forward webhook events.
9. Seed test customers and orders.
10. Confirm Payload creates Orders, OrderItems, Downloads, and AccessGrants after test checkout completion.

## Stripe Product Format Model

Each book should support:

- PDF / EPUB: $15.99.
- Audiobook: $21.99.
- Paperback: $17.99.
- Hardcover: $24.99.

Recommended Stripe structure:

- One Stripe Product per book.
- Multiple Stripe Prices per product, one for each format.
- Use lookup keys for predictable environment-independent mapping.

Example lookup keys:

```txt
book_1_digital
book_1_audiobook
book_1_paperback
book_1_hardcover
```

Payload Books should store:

```txt
stripeDigitalPriceId
stripeAudiobookPriceId
stripePaperbackPriceId
stripeHardcoverPriceId
stripeLookupKey
```

## Mock Data Needed for Dashboard Development

Create enough mock data to make the dashboard feel real:

### Customers

- 10–25 test customers.
- Mix of parent/caregiver names.
- Some with addresses.
- Some with email preferences.

### Orders

- 30–50 test orders.
- Mix of successful, refunded, pending, failed, and partially fulfilled.
- Mix of book formats.

### Downloads / Access

- Some customers with 0 downloads used.
- Some with 1–2 downloads used.
- Some at the 3-download limit.
- Some expired or blocked access examples.

### Subscribers

- 50–100 test subscribers.
- Different sources: homepage, footer, contact page, popup.

### Support / Contact

- 10–20 contact submissions.
- 10 support tickets.
- Mix of open, pending, resolved.

## Admin Dashboard Pages to Build First

### 1. Admin Home / Overview

Purpose: daily command center.

Must show:

- Sales/revenue summary.
- Recent orders.
- Contact inquiries.
- Subscriber growth.
- Download/access warnings.
- Integration health.

### 2. Orders Dashboard

Purpose: see paid activity and fulfillment state.

Must show:

- Order status.
- Customer.
- Book.
- Format.
- Stripe payment status.
- Fulfillment status.
- Quick link to order details.

### 3. Downloads Dashboard

Purpose: control digital/audio fulfillment.

Must show:

- Customer.
- Book/file.
- Remaining attempts.
- Expiration.
- Last download.
- Reset/resend actions later.

### 4. Subscriber Dashboard

Purpose: marketing list control.

Must show:

- Email.
- Source.
- Opt-in status.
- Created date.
- CSV export.
- Mailjet sync status later.

### 5. Support Dashboard

Purpose: respond to customer/admin messages.

Must show:

- Contact submissions.
- Support tickets.
- Status.
- Priority.
- Last message.

## Development Order

1. Verify Payload Admin renders properly after route-group fix.
2. Clean up temporary setup/debug routes once stable.
3. Add dashboard design system tokens and custom admin styles.
4. Add branded custom dashboard view.
5. Organize sidebar and collection labels/groups.
6. Create Stripe sandbox products/prices.
7. Add sandbox/mock seed script.
8. Build checkout flow.
9. Build webhook route.
10. Map webhook events into Payload Orders/OrderItems/AccessGrants.
11. Connect dashboard cards to real Payload queries.
12. Add R2 signed delivery status cards later.

## Security Rules

- Never commit Stripe secret keys.
- Never commit webhook signing secrets.
- Never commit real customer/payment data.
- Keep all sandbox/test data clearly labeled.
- Keep live and sandbox price IDs separate.
- Use environment variables for Stripe keys and webhook secrets.
- Remove temporary setup/debug routes before production.

## Recommended Next Commit

Use a grouped commit such as:

```txt
Plan branded admin dashboard and Stripe sandbox mock data workflow for Benny & Penny backend
```
