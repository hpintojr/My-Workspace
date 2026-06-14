---
type: work-queue
project: Benny & Penny's Adventures
created: 2026-06-13
updated: 2026-06-13 late-session admin polish
status: active-admin-polish
---

# Assistant Work Queue — Admin Dashboard While Stripe Setup

## Purpose

Hamilton is setting up Stripe sandbox/test mode while the assistant continues work that does not require live Stripe secrets.

The current goal is to stabilize the Benny & Penny Payload Admin experience so it feels like a branded business dashboard instead of a generic Payload database UI.

## Critical Security Rules

Do not ask Hamilton to paste secret values into chat.

Do not commit these to GitHub:

```txt
Stripe restricted key
Stripe secret key
Stripe webhook signing secret
Neon connection string
Mailjet API keys
PAYLOAD_SECRET
PAYLOAD_SETUP_SECRET
```

Use only environment variable names in code/docs.

## Current Known State

Working:

- Payload Admin is functional.
- Admin login works.
- Neon is connected.
- Books are seeded with 9 records.
- `/admin/collections/books` renders.
- Individual Book edit pages open.
- The public product pages read from Payload/Neon with local fallback.
- Production deployments from `main` are working.
- The admin dashboard is now visually much closer to the approved mockup.
- Hamilton prefers the softer teal/mint direction over the heavy cream/coral direction.

Still active:

- Final Payload UI polish for Product Catalog table controls.
- Verify the Sales by Region card after changing it from `<aside>` to `<article>`.
- Verify Payload checkbox styling after fixing the double-layer input/icon issue.
- Verify breadcrumb heart/icon clipping.
- Verify sidebar hamburger/collapse button background.
- Verify Per Page dropdown vertical centering.

## Current Admin Sidebar Target

Approved simplified structure:

```txt
Dashboard
Adventure Hub
Product Catalog
Orders
Subscribers
Support
Settings

Bear PNG placeholder
Log out
```

Notes:

- `Adventure Hub` should be a static heading, not a collapsible Payload `Collections` control.
- Log out should stay fixed at the far bottom-left.
- The bear PNG placeholder should sit above Log out.
- Top-left branding should read like:

```txt
Benny & Penny
Admin Panel
```

- Branding needs enough left padding so the collapse button does not cover it.

## Dashboard Work Completed

Files involved in the website repo:

```txt
app/(payload)/components/BeforeDashboard.tsx
app/(payload)/components/BeforeDashboard.scss
app/(payload)/components/RegionCompact.scss
app/(payload)/components/AdminWelcomeName.tsx
app/(payload)/components/AdminBeforeNavLinks.tsx
app/(payload)/components/AdminAfterNavLinks.tsx
app/(payload)/admin/importMap.ts
app/(payload)/custom.scss
app/(payload)/admin-polish-overrides.scss
app/(payload)/admin-final-fixes.scss
app/(payload)/graphics/Icon.tsx
payload.config.ts
```

Implemented:

- Dynamic welcome name from `/api/users/me?depth=0`.
- KPI cards.
- Book Sales Performance mock bar chart.
- Hover/focus chart totals for revenue and order count.
- Dropdown options:

```txt
Today
Last 3 days
Last 7 days
Last 14 days
Last 30 days
Last 45 days
Last 60 days
Last 90 days
Last 120 days
Last Year
```

- Sales by Region compact card direction.
- Latest subscribers table.
- Recent orders table.
- Quick Links.
- System Status.
- Mailjet API status line.
- Mailjet email metric placeholders: Sent, Opened, Bounced, Spam.

## Important UI Bug: Sales by Region Height

Root cause discovered:

The Sales by Region card was originally rendered as an HTML `<aside>`.

The global admin sidebar theme also targeted every `aside`:

```css
.template-default .nav,
.template-default aside {
  ...
}
```

This accidentally made the Sales by Region card inherit sidebar behavior such as large min-height and padding.

Fix direction committed:

```txt
Change Sales by Region from <aside> to <article>
```

Next assistant should verify this after redeploy before adding more CSS.

## Important UI Bug: Payload Checkbox Double Layer

Payload checkbox structure:

```html
<div class="checkbox-input checkbox-input--checked">
  <div class="checkbox-input__input">
    <input type="checkbox" />
    <span class="checkbox-input__icon checkbox-input__icon--check"></span>
  </div>
</div>
```

Correct approach:

- Keep the real input clickable but visually hidden.
- Style the icon span as the visible checkbox.
- Use `.checkbox-input--checked` and/or `:has(input[type='checkbox']:checked)` for selected state.

Do not make the real input visible, or two boxes appear stacked.

## Important UI Bug: Breadcrumb Heart Clipping

Hamilton inspected DevTools and found the likely cause:

```css
.step-nav span {
  overflow: hidden;
}
```

Next pass should target Payload's step nav/breadcrumb span so the heart badge is not clipped, or reduce/align the icon so it stays inside the clipping area.

## Product Catalog Polish Items Still Open

Open items on `/admin/collections/books`:

- Confirm checkbox selected state is now one visible box.
- Confirm the sort buttons are not too tall.
- Confirm selected action buttons have clear teal borders.
- Confirm `Per Page: 10` text is vertically centered.
- Confirm breadcrumb icon is not clipped.
- Confirm sidebar collapse/hamburger does not show a white square.

Use DevTools and target the exact Payload classnames instead of broad selectors where possible.

## Stripe Sandbox Work Completed

Added to the website repo:

```txt
stripe dependency
.env.example Stripe placeholders
lib/stripe.ts
lib/stripeCheckout.ts
app/(frontend)/api/checkout/route.ts
app/(frontend)/api/stripe/webhook/route.ts
docs/STRIPE_SANDBOX_SETUP.md
```

Cart checkout route exists and redirects to Stripe Checkout.

Webhook route exists and verifies Stripe signatures.

Webhook fulfillment is not complete yet.

## Stripe Sandbox Next Backend Pass

After admin UI stabilizes, wire:

```txt
checkout.session.completed
```

into Payload records:

```txt
Orders
OrderItems
Downloads
AccessGrants
```

Later connect dashboard cards/charts to live Stripe/Payload data.

## Route Verification Checklist

After each major admin/theme deploy, verify:

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

## Cleanup After Admin Stabilizes

Remove or disable temporary setup/debug routes before production launch:

```txt
/api/setup-payload
/api/setup-payload-preferences
/api/setup-payload-catalog
/api/setup-payload-system
/api/debug-books
/api/debug-payload-books
```

Rotate/delete `PAYLOAD_SETUP_SECRET` after setup routes are removed/disabled.

Build real Payload/database migrations later instead of relying on temporary setup routes.

## Start Here Next Session

1. Redeploy latest website `main`.
2. Verify `/admin` region chart after the `<aside>` → `<article>` fix.
3. Verify Product Catalog table controls on `/admin/collections/books`.
4. If still broken, use DevTools classnames and patch narrowly.
5. Once UI is stable, implement Stripe webhook fulfillment into Payload Orders/OrderItems/Downloads/AccessGrants.
6. Keep secrets out of chat and GitHub.
