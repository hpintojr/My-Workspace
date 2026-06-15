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
/api/portal/me
/api/portal/logout
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
- Portal pages now show the signed-in customer and email.
- Portal pages have a compact one-line navigation bar.
- Customer can log out from the portal bar.
- `/portal/orders` displays signed-in customer order history.
- `/portal/addresses` displays signed-in customer billing and shipping addresses.
- `/portal/library` displays purchased books and purchased formats.
- Library shows status/access buttons per purchased format.

### Portal Navigation

The portal bar was redesigned from a stacked widget into a cleaner one-line desktop layout:

```txt
Signed in as [Customer Name] [email] | Portal Home | My Orders | My Library | Addresses | Log out
```

It highlights the active portal page in coral.

### Current Library Button Labels

```txt
PDF / EPUB → Digital file pending
Audiobook → Audio file pending
Paperback → Paperback recorded
Hardcover → Hardcover recorded
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

`/portal/orders` shows the signed-in customer's order history.

Matching direction:

```txt
orders.customer equals logged-in user ID
OR
orders.customerEmail matches logged-in user email
```

Order matching was widened to account for customer relationship differences, exact email, lowercase email, and email-like matching.

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

### Current Orders UX

Orders are now collapsible.

Compact row:

```txt
Order number · status · date · format preview · total
```

Expanded view:

```txt
Purchased items
Summary
Shipping details
```

Newest order opens first by default.

## Addresses Page Logic

`/portal/addresses` shows the signed-in customer's billing and shipping addresses.

Matching direction:

```txt
customer-addresses.customer equals logged-in user ID
OR
address snapshots from matching orders
```

This fallback matters because some checkout data may exist on the order even if the reusable Customer Address record is missing.

### Current Address UX

The address page was cleaned up into a more manageable layout:

```txt
Primary Shipping Address
Primary Billing Address
Other saved addresses collapsed below
```

Duplicate addresses are filtered tighter so repeated checkout addresses do not clutter the portal.

## Address Book Direction for Lulu POD

Because future print products will use Lulu POD, the address book should become more than a read-only display.

Recommended architecture:

```txt
Cart contains print/POD item
→ require or select shipping address before Stripe payment
→ backend asks Lulu for available shipping rates
→ customer selects shipping option
→ Stripe Checkout is created with the chosen shipping charge
→ payment completes
→ order is stored with frozen address snapshot
→ POD job uses the same locked address/shipping choice
```

Address Book should eventually support:

- Default Shipping Address.
- Default Billing Address.
- Other Saved Addresses.
- Add New Address.
- Edit Address.
- Archive/Remove Address.
- Address label such as Home, Work, Grandma, etc.
- Type: Shipping, Billing, or Both.
- Last used date.

Important rule:

```txt
Orders store frozen address snapshots.
Changing an address later should not rewrite old orders.
```

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

### Current Library UX

My Library is now collapsible.

Compact row:

```txt
Book title · owned formats · latest purchase date
```

Expanded view:

```txt
Hardcover
Paperback
Audiobook
PDF / EPUB
Order references
Status buttons
```

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

- Build true Address Book add/edit/default/archive behavior.
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

5e76602ffadc0ec17cab21c9a5094d5e2676e722
Add customer portal library API

1fd84d23ce9269c46b015f9b786a9fc94d4b616a
Add safe customer portal download endpoint

b471627d81aeba0b11f0820353552dcd5643457d
Clean up portal navigation bar

8f9d7de53cc841c0de0e89ac64a787e86dc3a283
Make portal orders expandable

f2c77aebb97a1bd8d6bcc031c6d67c696bfeb923
Improve portal address management layout

d1c507d93944e04153cff732a6261a1b6ff7497c
Make portal library expandable
```

## Next Best Action

Build true Address Book management next:

```txt
Add New Address
Edit Address
Default Shipping
Default Billing
Archive/Remove Address
```

Then add account/profile and continue into digital file preparation and private delivery wiring.
