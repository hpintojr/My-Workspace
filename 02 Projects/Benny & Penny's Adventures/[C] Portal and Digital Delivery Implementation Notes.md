---
type: implementation-notes
project: Benny & Penny's Adventures
created: 2026-06-15
status: active
---

# Portal and Digital Delivery Implementation Notes

## Purpose

This file tracks the customer portal and digital delivery build for Benny & Penny's Adventures.

The goal is to let customers sign in, see their orders, see their billing/shipping addresses, see their purchased books, and eventually access purchased PDF/EPUB/audiobook files safely.

## Current Portal Routes

```txt
/portal
/portal/login
/portal/orders
/portal/addresses
/portal/library
```

## Current Portal API Routes

```txt
/api/portal/orders
/api/portal/addresses
/api/portal/library
/api/portal/downloads
```

## Current Portal Status

### Working

- Public header includes `My Account`.
- `/portal` shows customer account cards.
- `/portal/login` signs customers in through Payload auth when the customer has a password.
- `/portal/orders` displays signed-in customer order history.
- `/portal/addresses` displays signed-in customer billing and shipping addresses.
- `/portal/library` displays purchased books and purchased formats.
- Library shows status/access buttons per purchased format.

### Current Library Button Labels

```txt
PDF / EPUB → PDF / EPUB Access Coming Soon
Audiobook → Audiobook Access Coming Soon
Paperback → Paperback Order Recorded
Hardcover → Hardcover Order Recorded
```

## Data Source Direction

Keep the portal relationship-based. Do not create a separate portal-only database model unless required later.

Current source-of-truth model:

```txt
users = customer accounts and auth
orders = receipts and order history
order-items = purchased book formats
customer-addresses = billing and shipping records
downloads = future digital/audio delivery records
```

## Orders Page Logic

`/portal/orders` should show the signed-in customer's order history.

Matching direction:

```txt
orders.customer equals logged-in user ID
OR
orders.customerEmail equals logged-in user email
```

This fallback matters because some older or repaired Stripe orders may have the email but not the relationship field populated perfectly.

The Orders page should behave like a receipt/accounting page.

It should show:

- Order number.
- Date placed.
- Status.
- Purchased items.
- Subtotal.
- Tax.
- Shipping.
- Discount.
- Total.
- Shipping summary.

## Addresses Page Logic

`/portal/addresses` should show the signed-in customer's billing and shipping addresses.

Matching direction:

```txt
customer-addresses.customer equals logged-in user ID
OR
address snapshots from matching orders
```

This fallback matters because some checkout data may exist on the order even if the reusable Customer Address record is missing.

## Library Page Logic

`/portal/library` should show owned books, not receipts.

Difference between Orders and Library:

```txt
My Orders = what did I buy, when, and what was charged?
My Library = what books and formats do I own/access?
```

Library grouping direction:

```txt
Group order-items by book
Then show owned formats under each book
```

For each book, show:

- Book title.
- Latest purchase date.
- Formats owned.
- Quantity per format.
- Related order numbers.
- Access/status button per format.

## Digital Delivery Direction

The current portal does not yet deliver PDF/EPUB/audiobook files.

The next delivery build should:

1. Prepare final file assets for each book and format.
2. Store private files in the chosen storage provider.
3. Create or automate Payload `downloads` records for customer/book/format access.
4. Validate the signed-in customer owns the requested file.
5. Return a short-lived access link only after validation.
6. Track access count and last accessed/downloaded timestamp.
7. Enforce max access/download count if desired.

Important safety rule:

```txt
Never show raw storage keys or permanent public file URLs in the customer portal.
```

## Current Download Endpoint Foundation

The protected customer download endpoint foundation exists and should eventually become the safe file access point.

Current behavior:

- Requires logged-in customer.
- Checks that the requested download record belongs to the customer.
- Blocks inactive records.
- Blocks expired records.
- Does not reveal raw file storage keys.
- Returns a safe placeholder response until real private file delivery is connected.

## Mailjet / Account Email Limitation

Mailjet is still under review.

Do not rely on these yet:

- Customer welcome emails.
- Password reset emails.
- Account activation emails.
- Order confirmation emails.
- Digital delivery emails.
- Newsletter campaigns.

Until Mailjet is approved, customer login requires manually set passwords or a non-email activation path.

## Current Open Items

### Portal UX

- Add customer logout.
- Add account/profile page.
- Add customer support page.
- Add customer support form connected to Support Tickets.
- Add password reset/account activation when email sending is ready.

### Digital Delivery

- Prepare PDF file.
- Prepare EPUB file.
- Prepare audiobook file.
- Confirm storage provider and private bucket structure.
- Create Payload `downloads` records.
- Connect Library buttons to active Downloads records.
- Add short-lived access link generation.
- Track usage.

### Admin/Data Cleanup

- Confirm orders are linked to customers wherever possible.
- Confirm Customer Address records are created correctly.
- Keep email fallback matching in portal until all older orders are cleaned up.
- Confirm Neon SQL patches have been run.

## Important Website Commits

```txt
642a29ae7cd022d0ba43497b4ced84b7f8922496
Add customer portal orders API

c1af73543cb769c2c0c8b07e53a62706a4ea1cef
Add customer portal addresses API

6608e830d6e1638a36dd092c4400a30a948a5a1b
Add live customer portal orders component

0cc6e6aa217f24211fda9ef57bbd15ea28697f6a
Add live customer portal addresses component

6ff85b3c9fb588329764df780f979a783bdbfe49
Wire portal orders page to live data

0520fbbe5d29c74d34d19626d052bdd63476b8b3
Wire portal addresses page to live data

116478fbd4546fd043a409c101b15ebbef011a64
Find portal orders by customer email fallback

2954afea683d3f8067a4cff441fd6a53305476c1
Add order snapshot fallback for portal addresses

5e76602ffadc0ec17cab21c9a5094d5e2676e722
Add customer portal library API

519d5e26d198b559db03432a25f6baf8481441e2
Add live customer portal library component

cd6030387d8f0bac7ace6bf2094b85af56a175eb
Add customer portal library page

27a97b92e7d3475ff024221ee82485fabb53af12
Point portal library card to library page

1fd84d23ce9269c46b015f9b786a9fc94d4b616a
Add safe customer portal download endpoint

cb803a59cf71e6f595f43ae30e68e53e25aa97c8
Add library access buttons
```

## Next Best Action

Build customer logout and account/profile next, then move into digital file preparation and private delivery wiring.
