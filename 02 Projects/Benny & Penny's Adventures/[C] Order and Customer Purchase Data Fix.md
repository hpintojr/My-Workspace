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

Important: The production Neon order schema patch still needs to be run or confirmed before relying on new Stripe fulfillment data fields.

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

The admin should also be able to open a Customer file and see the customer's linked purchase history.

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
11. Open `/admin/collections/customer-addresses`.
12. Confirm customer address records are still being created/deduplicated.

## Important Notes

- The new customer purchase history is relationship-based, not manually duplicated.
- The Order record now stores enough purchase data for admin review and future customer-service workflows.
- The client portal should later read from the same Orders and Order Details data.
- Existing sandbox orders may not have the new fields unless backfilled or recreated through a fresh checkout.
- If Payload's join field does not render as expected in admin, the fallback approach is to build a custom customer purchase-history component or store a denormalized summary on the customer record.
