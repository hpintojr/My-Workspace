---
type: design-direction
project: Benny & Penny's Adventures
created: 2026-06-13
status: approved-reference
---

# Approved Admin Dashboard Visual Direction

## Purpose

Use the uploaded dashboard mockup as the approved visual direction for the Benny & Penny Admin Panel redesign.

The current Payload admin table/list view feels too plain, database-like, and unfinished. The improved admin should feel like a warm branded business dashboard for a children's publishing and medical-adventure brand.

## Approved Direction

Build the admin around a soft, friendly, professional dashboard style similar to the uploaded sample.

Key traits:

- Warm cream background.
- Soft teal / mint header and active navigation states.
- Soft blush / coral accent color used carefully for highlights.
- Rounded cards.
- Gentle shadows.
- Friendly iconography.
- Large readable KPI cards.
- Sidebar that feels branded, not generic.
- A small illustrated bear / mascot placeholder at the bottom of the sidebar.
- Clean operations dashboard feel for book sales, customers, subscribers, fulfillment, and support.

## Logo / Top Left Requirement

Use the same Benny & Penny name/logo treatment already used on the login screen.

Do not invent a new top-left logo unless requested later.

Sidebar header should read as a branded admin identity, for example:

```txt
Benny & Penny's
Admin Panel
```

But it should reuse the existing login-screen logo/name treatment where possible.

## Bear Sidebar Placeholder Requirement

Add a clear placeholder area at the bottom of the sidebar for a future bear PNG asset.

Suggested placeholder path:

```txt
/public/admin/bear-sidebar-placeholder.png
```

Implementation goal:

- Reserve the space now.
- Do not hardcode final artwork.
- Use an image component or CSS background that can be replaced later by dropping in the PNG.
- Keep the bear anchored near the bottom of the sidebar above the logout action.
- The placeholder should not block navigation or make the sidebar hard to use on shorter screens.

Example component behavior:

```txt
Sidebar bottom
→ bear image placeholder
→ logout button
```

## Layout Structure

### Left Sidebar

Width target:

```txt
240px to 280px desktop
```

Sidebar sections:

- Brand/logo at top.
- Primary navigation.
- Bear PNG placeholder near bottom.
- Logout action at bottom.

Primary navigation should feel simple at first:

- Dashboard.
- Orders.
- Product Catalog.
- Subscribers.
- Support.
- Settings.

Later expansion can add grouped areas:

- Store.
- Customers.
- Fulfillment.
- Marketing.
- Compliance.
- Integrations.

### Top Header

Header should include:

- Page title / breadcrumb:

```txt
Benny & Penny's Adventures | Admin Dashboard
```

- Help icon.
- Notifications icon.
- User/avatar control.

### Main Dashboard

Use a welcome strip:

```txt
Welcome, Nurse Ivy! 🧸 Benny and Penny are ready to manage your book sales and community!
```

Name can be dynamic later based on admin user.

Top KPI cards:

- Total Book Sales (USD).
- Books Sold.
- Active Book Titles.
- Subscriber Growth.

Main analytics cards:

- Book Sales Performance.
- Sales by Region.

Bottom data cards:

- Latest Community Newsletter Subscribers.
- Recent Book Sales Orders.

Right rail:

- Quick Links.
- System Status.

## Product Catalog Page Direction

The Product Catalog should keep the same branded design language but be cleaner than the current table.

Improve:

- Better page header.
- More padding and spacing.
- Cleaner filters/search.
- Friendlier table styling.
- Better badges for status such as Cover Ready / Coming Soon.
- Less harsh table controls.
- Use card-like container around the table.

Suggested Product Catalog sidebar state:

```txt
Dashboard
Orders
Product Catalog  ← active
Subscribers
Support
Settings
```

Product Catalog page header:

```txt
Product Catalog
Manage Benny & Penny books, formats, pricing, Stripe IDs, and private R2 file keys.
```

## Color Direction

Approximate colors inspired by the sample:

```txt
Cream background: #FFF8E8 or #FFF6E6
Sidebar cream: #FBECCB
Mint/teal active: #CFEAE0
Teal text: #004E55 or #0A5960
Soft coral accent: #E95D70
Soft green accent: #7DAE9D
Card background: #FFFFFF / #FFFEFA
Border: #E8D6B8
```

## Typography Direction

Use friendly but readable type.

- Dashboard headings can use a rounded or storybook-inspired font only if it remains readable.
- Admin tables/forms should stay clean and professional.
- Avoid making the whole admin feel childish; it should be warm but operational.

## Dashboard Data Strategy

Use mock/sandbox data first, then wire to real data.

Mock data should include:

- Sales totals.
- Book sales by month.
- Sales by region.
- Recent orders.
- Subscriber list.
- Support/contact activity.
- Stripe webhook health.
- R2 fulfillment status.

Stripe sandbox data should eventually replace static placeholder chart/table data.

## Stripe Sandbox Fit

This design is a good reason to set up Stripe sandbox data now.

The dashboard needs realistic:

- Products.
- Prices.
- Customers.
- Orders.
- Checkout sessions.
- Payment statuses.
- Refund examples.
- Webhook events.

Use sandbox/test mode only during development.

## Implementation Notes

Recommended build path:

1. Stabilize Payload Admin route/layout rendering.
2. Add custom admin dashboard route/view.
3. Apply admin theme CSS variables and layout styles.
4. Replace current raw collection-first experience with the branded dashboard landing page.
5. Rework sidebar navigation to match the approved simple structure.
6. Add bear PNG placeholder area.
7. Reuse login-screen logo/name treatment at top left.
8. Add dashboard cards using mock data.
9. Add Stripe sandbox seed/sync later.
10. Connect cards/tables to real Payload and Stripe data.

## Do Not Do

- Do not keep the admin feeling like a raw database UI.
- Do not overcrowd the sidebar with every collection at the top level.
- Do not use the bear artwork as a fixed final file yet; leave a replaceable placeholder.
- Do not replace the existing login-screen logo/name treatment unless requested.
- Do not commit real Stripe keys, customer data, or live payment data.

## Recommended Commit Message

```txt
Document approved Benny and Penny admin dashboard visual direction and sidebar mascot placeholder
```
