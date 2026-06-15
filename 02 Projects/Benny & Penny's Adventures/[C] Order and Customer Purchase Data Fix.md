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

Stripe checkout/order fulfillment has now been debugged through a full sandbox recovery cycle.

Confirmed current state:

- Stripe sandbox payments can be reconciled into Payload Orders.
- Missing Stripe order was manually repaired through the protected Stripe order reconciliation endpoint.
- Payload database order ID `17` was created as customer-facing order number `26-0009`.
- 4 order items were created for the repaired checkout.
- Billing address now saves to the Order record.
- Shipping address now saves to the Order record after reading Stripe's newer shipping payload location.
- Billing and shipping records should also create in `customer-addresses` when a customer record is linked.
- Tax remains `0` for current products because they are being treated as California-exempt for now.

Latest important fulfillment commits:

```txt
693631cac67ca619e080989866bc1672eaf725da
Refresh Stripe session before fulfillment

db532e591cebcde099eb3842768698be2f7e60ab
Backfill existing Stripe order addresses

56ceb2c8964eb9a04bd674badc4ec27e06c59ba8
Improve order confirmation on thank-you page

62aaa60bbfd1fccb7fdfd585c48622423861dfc7
Normalize Stripe customer emails during fulfillment

0ac62b375d82e7ff2fda4eaefb607822bac2ceb0
Fix Stripe fulfillment shipping postal code

f7b52de4458c8755e4d420a3946044c845a16c54
Return reconcile diagnostics for authorized requests

3b3ec50151ee2a4a1acc258f92f19c61d2fb11df
Read Stripe collected shipping details
```

## Key Stripe Fulfillment Lesson

Stripe Checkout shipping data may not always appear under the old/top-level field:

```txt
shipping_details
```

For the tested Checkout Session, Stripe returned shipping under:

```txt
collected_information.shipping_details
```

The fulfillment code now checks both locations.

Working tested Stripe data example:

```txt
Billing name: Hamster Diver
Billing address: 11437 Lower Azusa Road, El Monte, CA 91732, US
Shipping name: James Brown
Shipping address: 1500 Pennsylvania Avenue, San Diego, CA 92103, US
```

## Manual Reconciliation Notes

Manual reconciliation is now confirmed useful for recovering missing Stripe payments that succeeded before Payload order creation completed.

Important distinction:

```txt
orderId = Payload database ID
orderNumber = customer-facing order number
fallback confirmation reference = not the real order number
```

The protected reconciliation endpoint requires a valid Stripe Checkout Session ID and the current setup secret. Do not store the secret in this workspace.

Expected success shape:

```json
{
  "ok": true,
  "summary": {
    "orderId": 17,
    "orderNumber": "26-0009",
    "created": true,
    "orderItemsCreated": 4,
    "downloadsCreated": 0,
    "accessGrantsCreated": 0
  }
}
```

## Security Note — Setup Secret

`PAYLOAD_SETUP_SECRET` was exposed in screenshots/browser URLs during manual repair testing.

Required next action:

```txt
Rotate PAYLOAD_SETUP_SECRET in Vercel after order recovery/testing is complete.
```

Do not paste or commit the new secret value into this workspace.

## Stripe Tax Decision

Current decision: do not collect tax for the current Benny & Penny products because they are being treated as California-exempt for now.

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
- If taxable products are added later, re-enable with the env var and configure Stripe Tax registrations/tax codes before launch.

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

If Payload join fields do not render the customer file cleanly enough, the fallback is to build a custom Customer detail/admin component that displays contact info, addresses, purchase history, order numbers, totals, and order details.

## Website Repo

```txt
hpintojr/bennyandpennyadventures
```

## Code Changes in PR #5

### Orders Collection

`collections/Orders.ts` was expanded so an Order record can store customer, Stripe, totals, purchased item summary, billing address, and shipping address snapshot fields.

The Orders admin list should prioritize:

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

`lib/stripeFulfillment.ts` is the core source for Stripe → Payload order creation.

Current behavior:

- Re-fetches the Checkout Session before fulfillment.
- Normalizes Stripe customer email to lowercase.
- Finds or creates a Payload customer where possible.
- Does not let customer profile creation failure block order creation.
- Creates the Payload Order.
- Creates Order Details / line items.
- Saves billing address fields from `customer_details.address`.
- Saves shipping address fields from `shipping_details` or `collected_information.shipping_details`.
- Can update an existing order during manual reconcile/backfill.

### Customer File Purchase History

`collections/Users.ts` includes a `purchaseHistory` join field intended to show Orders linked through:

```txt
orders.customer → users.id
```

### Customer File Address History

`collections/Users.ts` includes an `addressHistory` join field intended to show addresses linked through:

```txt
customer-addresses.customer → users.id
```

Address records should remain in `customer-addresses` as the source of truth.

### Neon SQL Patch

`docs/ORDER_SCHEMA_PATCH.md` documents the manual SQL patch for added Orders columns. Confirm the production Neon schema has the order/customer/totals/billing/shipping columns before relying on these fields at launch.

Expected verification result: 23 order columns.

## Testing Checklist

After production deploy and SQL patch confirmation:

1. Run a Stripe sandbox checkout with at least one physical item.
2. Use different billing and shipping addresses.
3. Confirm checkout completes successfully.
4. Confirm tax total is `0` for currently exempt products.
5. Confirm the thank-you page shows the real `26-000X` order number when fulfillment completes.
6. Open `/admin/collections/orders`.
7. Confirm the order list shows customer name, item summary, status, total, and created date.
8. Open the new Order detail page.
9. Confirm the Order file shows customer, Stripe IDs, totals, item summary, billing address, and shipping address.
10. Open `/admin/collections/order-items` and confirm line items exist.
11. Open the linked customer file and confirm Purchase History shows the linked order.
12. Open `/admin/collections/customer-addresses` and confirm billing/shipping address records are created/deduplicated.
13. Run manual reconcile only for missing/backfill cases, not normal flow.
14. Rotate `PAYLOAD_SETUP_SECRET` after testing.

## Important Notes

- The new customer purchase history is relationship-based, not manually duplicated.
- The Customer file should become the admin-friendly customer snapshot: contact info, addresses, order numbers, and purchase history.
- The Order record stores enough purchase data for admin review and future customer-service workflows.
- The client portal should later read from the same Orders, Order Details, and Customer Addresses data.
- Current product tax decision: do not collect tax for now; Stripe Automatic Tax stays off unless explicitly enabled by env var.
- Existing sandbox orders may not have the new fields unless backfilled or recreated through a fresh checkout.
- The manual reconcile route is useful for repair but should not remain exposed long-term.
