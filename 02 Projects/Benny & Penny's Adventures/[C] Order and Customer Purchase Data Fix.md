---
type: implementation-note
project: Benny & Penny's Adventures
created: 2026-06-14
status: active
---

# Order and Customer Purchase Data Fix

## Current Status

PR #5 has been merged into `main`.

```txt
PR: #5 — Tie Stripe purchase data to orders and customers
Merged commit: 3f86dd82415718a64db9fbf8fa2689d07963bf09
```

Customer address history was added directly to the Customer/User file on `main`.

```txt
Commit: 6d206eee9f24325724eb9e69bee10ec9c6ada218
Change: collections/Users.ts now includes addressHistory join → customer-addresses.customer
```

Order/customer profile navigation is being improved so admin users do not have to rely only on the sidebar to return to the list view.

```txt
Customer profile back action commits:
3584e79e25bd916582fe06813e428362dea4e2ab
0617f78738b0533f0220cebd3ede48453eebb38c
c397e4c03fe070439880d9150964b6da8ac3eb30
e760a5a8b1ceb2a5551e1dd2ef85fee3f5512294

Order profile back action work:
934c8b8155424521eb2c11657a52857fd4de597b
86b464f318e22a311622994c60f1994a1a061a88
4e4fab3775dfd443c883a27d1c4ac3fd72d7fe68
35babec20ff01e25c748a6ffde76a9841221b205
0485c72f2d2ad4b228463de7f3ca404a3db42350
```

Important: The production Neon order schema patch still needs to be run or confirmed before relying on new Stripe fulfillment data fields.

## Stripe Tax Decision

Current decision: do not collect tax for the current Benny & Penny products because they are being treated as California-exempt for now.

The checkout code was briefly changed to enable Stripe Automatic Tax by default, but Stripe test checkout failed because the Stripe test/sandbox tax registration setup was incomplete.

Final current checkout direction:

```txt
Stripe Automatic Tax is OFF by default.
It only turns on if STRIPE_AUTOMATIC_TAX_ENABLED=true is explicitly set in Vercel.
```

Production commit for this decision:

```txt
0d2a94fe82d40d11b3b3c9b38b1dc20f61662a07
Change: app/(frontend)/api/checkout/route.ts disables Stripe Automatic Tax by default again.
```

Operational expectation:

- Current orders should show tax as `0`.
- Checkout should not require Stripe Tax registration setup.
- Do not add California tax collection unless tax/legal/accounting review later confirms it is required.
- If taxable products are added later, re-enable with `STRIPE_AUTOMATIC_TAX_ENABLED=true` and configure Stripe Tax registrations/tax codes before launch.

## Subscriber to Customer Tracking Direction

Hamilton wants to track when a subscriber becomes a customer and use that distinction for marketing segmentation.

Desired segmentation:

```txt
Subscribers who are not customers yet
Subscribers who became customers
Customers who opted into marketing
Customers who did not opt into marketing
```

Initial subscriber/customer tracking admin fields were added, but they caused production admin errors because the production `subscribers` table did not yet have the new `linked_customer_id` column.

Emergency rollback/hotfix commits:

```txt
7a1af037b40d3c5c5e6127b786f64bcb9ad980c7
993c96afe369abe92a88607a7582e73d0656fe4b
```

Current subscriber/customer tracking status:

- Concept approved.
- Schema patch documented.
- Live admin fields temporarily removed until the Neon subscriber/customer schema patch is run.
- Do not re-enable the Subscriber → Customer relationship until the database columns exist.

Schema patch doc:

```txt
docs/SUBSCRIBER_CUSTOMER_LINK_SCHEMA_PATCH.md
```

## Customer File Requirement — Source of Truth

The Customer file must eventually behave like the single admin snapshot for that customer.

When an admin opens a Customer file, it should clearly show:

- Customer contact details.
- Mailing / billing addresses.
- Shipping addresses.
- Purchase history.
- Order numbers.
- Purchase data for each order.
- Purchased item summary.
- Order totals, tax, shipping, discounts, and status.
- Links or relationship references back to the full Order file and Order Details / line items.

The current direction is to keep this relationship-based, not manually duplicated:

```txt
users.id ← orders.customer
users.id ← customer-addresses.customer
orders.id ← order-items.order
```

That means the Customer file should surface the related address and purchase records in one place, but the full source of truth stays in Orders, Order Details, and Customer Addresses.

If Payload join fields do not render the customer file cleanly enough, the fallback is to build a custom Customer detail/admin component that displays:

```txt
Contact Info
Addresses
Purchase History
Order Number
Purchase Summary
Order Totals
Order Details
```

## Reason for This Fix

Hamilton identified that the current Payload order/customer admin records are missing important basic purchase data.

The issue is not that Stripe checkout is completely broken. Stripe fulfillment is already creating:

- Orders.
- Order Details / line items.
- Customer records.
- Customer Addresses.

The issue is that the Order file itself is too thin, and the Customer file does not clearly show the customer's purchase history.

## Desired Outcome

When a Stripe sandbox/live purchase completes, the admin should be able to open the Order file and immediately see the basic purchase data without hunting through multiple records.

The admin should also be able to open a Customer file and see the customer's linked contact data, mailing/shipping addresses, order numbers, and purchase history.

## Website Repo

```txt
hpintojr/bennyandpennyadventures
```

## Code Changes in PR #5

### Orders Collection

`collections/Orders.ts` was expanded so an Order record can store:

- Customer name.
- Customer email.
- Customer phone.
- Linked customer relationship.
- Stripe checkout session ID.
- Stripe payment intent ID.
- Stripe customer ID.
- Subtotal.
- Tax total.
- Shipping total.
- Discount total.
- Final total.
- Currency.
- Item count.
- Purchased items summary.
- Billing address fields.
- Shipping address fields when applicable.

The Orders admin list should now prioritize:

```txt
orderNumber
customerName
customerEmail
itemsSummary
status
total
createdAt
```

### Stripe Fulfillment

`lib/stripeFulfillment.ts` was updated so completed Stripe checkout sessions populate the new Order fields.

The detailed line items should still be created in `order-items`; the new Order fields are meant to make the main Order file useful at a glance.

### Customer File Purchase History

`collections/Users.ts` now includes a `purchaseHistory` join field.

This is intended to show Orders linked through:

```txt
orders.customer → users.id
```

Do not create a separate manual purchase-history table unless the join field fails and another approach is needed.

### Customer File Address History

`collections/Users.ts` now includes an `addressHistory` join field.

This is intended to show addresses linked through:

```txt
customer-addresses.customer → users.id
```

This should surface:

- Billing / mailing address records.
- Shipping address records.
- Address phone numbers.
- Default shipping flag.

Address records should remain in `customer-addresses` as the source of truth.

### Neon SQL Patch

`docs/ORDER_SCHEMA_PATCH.md` was updated with the new manual SQL patch for the added Orders columns.

This patch must be run or confirmed in Neon before the new fulfillment fields can be relied on.

## Production SQL Patch

Run this in the production Neon SQL editor if it has not already been run:

```sql
alter table if exists orders
  add column if not exists customer_name varchar,
  add column if not exists customer_phone varchar,
  add column if not exists stripe_customer_id varchar,
  add column if not exists subtotal numeric default 0,
  add column if not exists tax_total numeric default 0,
  add column if not exists shipping_total numeric default 0,
  add column if not exists discount_total numeric default 0,
  add column if not exists item_count numeric default 0,
  add column if not exists items_summary varchar,
  add column if not exists billing_address_name varchar,
  add column if not exists billing_address_line1 varchar,
  add column if not exists billing_address_line2 varchar,
  add column if not exists billing_address_city varchar,
  add column if not exists billing_address_state varchar,
  add column if not exists billing_address_postal_code varchar,
  add column if not exists billing_address_country varchar,
  add column if not exists shipping_address_name varchar,
  add column if not exists shipping_address_line1 varchar,
  add column if not exists shipping_address_line2 varchar,
  add column if not exists shipping_address_city varchar,
  add column if not exists shipping_address_state varchar,
  add column if not exists shipping_address_postal_code varchar,
  add column if not exists shipping_address_country varchar;
```

## Verification SQL

```sql
select column_name
from information_schema.columns
where table_name = 'orders'
  and column_name in (
    'customer_name',
    'customer_phone',
    'stripe_customer_id',
    'subtotal',
    'tax_total',
    'shipping_total',
    'discount_total',
    'item_count',
    'items_summary',
    'billing_address_name',
    'billing_address_line1',
    'billing_address_line2',
    'billing_address_city',
    'billing_address_state',
    'billing_address_postal_code',
    'billing_address_country',
    'shipping_address_name',
    'shipping_address_line1',
    'shipping_address_line2',
    'shipping_address_city',
    'shipping_address_state',
    'shipping_address_postal_code',
    'shipping_address_country'
  )
order by column_name;
```

Expected result: 23 rows.

## Testing Checklist

After production deploy and SQL patch confirmation:

1. Run a Stripe sandbox checkout.
2. Confirm the checkout completes successfully.
3. Open `/admin/collections/orders`.
4. Confirm the order list shows customer name, item summary, status, total, and created date.
5. Open the new Order detail page.
6. Confirm the Order file shows:
   - Customer name/email/phone.
   - Stripe IDs.
   - Subtotal/tax/shipping/discount/total.
   - Item count and purchased item summary.
   - Billing address.
   - Shipping address for print orders.
7. Open `/admin/collections/order-items`.
8. Confirm individual order details/line items still exist.
9. Open the linked customer file.
10. Confirm Purchase History shows the linked order.
11. Confirm the customer file clearly shows or links to the customer's mailing/billing/shipping addresses.
12. Open `/admin/collections/customer-addresses`.
13. Confirm customer address records are still being created/deduplicated.
14. Confirm tax total is `0` for currently exempt products.

## Important Notes

- The new customer purchase history is relationship-based, not manually duplicated.
- The Customer file should become the admin-friendly customer snapshot: contact info, addresses, order numbers, and purchase history.
- The Order record stores enough purchase data for admin review and future customer-service workflows.
- The client portal should later read from the same Orders, Order Details, and Customer Addresses data.
- Current product tax decision: do not collect tax for now; Stripe Automatic Tax stays off unless explicitly enabled by env var.
- Existing sandbox orders may not have the new fields unless backfilled or recreated through a fresh checkout.
- If Payload's join field does not render as expected in admin, the fallback approach is to build a custom customer detail/admin component or store a denormalized summary on the customer record.
