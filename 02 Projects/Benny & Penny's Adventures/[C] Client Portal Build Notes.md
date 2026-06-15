---
type: implementation-note
project: Benny & Penny's Adventures
created: 2026-06-15
status: active
---

# Client Portal Build Notes

## Current Status

The first customer-facing Client Portal foundation is now built in the website repo.

Website repo:

```txt
hpintojr/bennyandpennyadventures
```

Portal routes:

```txt
/portal
/portal/login
/portal/orders
/portal/addresses
/portal/library
```

Portal API routes:

```txt
/api/portal/orders
/api/portal/addresses
/api/portal/library
/api/portal/downloads
```

Public header now includes:

```txt
My Account
```

## What Is Working

### Login

`/portal/login` has a Payload login form.

Hamilton manually set a password on a customer account and confirmed login works.

Current limitation:

- Customer login works only when a password exists.
- Password reset/account activation emails are not complete yet.
- Mailjet is still under review, so automated email flows are pending.

### My Orders

Route:

```txt
/portal/orders
```

API:

```txt
/api/portal/orders
```

Shows live signed-in customer order data.

Displays:

- Order number.
- Date placed.
- Payment status.
- Purchased item list.
- Subtotal.
- Tax.
- Shipping.
- Discount.
- Total.
- Shipping summary.

Matching logic:

```txt
orders.customer = logged-in user ID
OR
orders.customerEmail = logged-in user email
```

The email fallback is intentional so older/backfilled Stripe orders can still appear in the portal even if the relationship field is missing.

### Addresses

Route:

```txt
/portal/addresses
```

API:

```txt
/api/portal/addresses
```

Shows live signed-in customer address data.

Address sources:

- `customer-addresses` records linked to the user.
- Billing/shipping snapshots stored on Orders.

The order-snapshot fallback prevents the portal from appearing empty if a checkout stored address fields on the order but did not create/link a reusable Customer Address record.

### My Library / Purchased Books

Route:

```txt
/portal/library
```

API:

```txt
/api/portal/library
```

Decision:

```txt
My Orders = receipt/accounting view
My Library = book ownership/access view
```

My Library groups purchases by book and format.

Displays:

- Purchased book title.
- Latest purchase date.
- Owned formats.
- Quantity by format.
- Related order numbers.
- Access/status button by format.

Current format button behavior:

```txt
PDF / EPUB → PDF / EPUB Access Coming Soon
Audiobook → Audiobook Access Coming Soon
Paperback → Paperback Order Recorded
Hardcover → Hardcover Order Recorded
```

## Download Delivery Foundation

A protected download endpoint foundation exists:

```txt
/api/portal/downloads
```

Current behavior:

- Requires signed-in customer.
- Checks the download belongs to the customer.
- Blocks inactive records.
- Blocks expired records.
- Does not expose raw R2 object keys.
- Returns a safe “delivery not configured yet” response until private signed file delivery is connected.

Current limitation:

- Actual PDF/EPUB/audiobook file delivery is not connected yet.
- R2 or another private file store still needs to be configured.
- Download records in Payload need to be created for each customer/book/format after checkout or admin upload.
- Library buttons are currently UI placeholders/status buttons until the signed delivery flow is wired.

## Important Commits

```txt
d53f2bc359dd3e5dec445431b25bb0a80517e019
Add customer portal login form

ce27ad80a14af9dd8106737492144292b01cf57d
Add customer portal overview page

ac864b5148e45a7aaac021b9795ec3dba8e7a522
Add customer portal login page

47f9101bc3bd579a3ab856b018f078e7f4326696
Add customer portal orders page

4470a70cf406f7a5b28c58160fbffe3753809355
Add customer portal addresses page

ba62080f237d77ae23c4b2b564976a63c80d5b1e
Add customer portal link to header

4266aa35f00f849d8fdd9edb3d39ca8b4758fcf0
Fix portal login form event type

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

## Data Sources

Portal data should stay relationship-based and read from the same Payload source of truth:

```txt
users = customers/auth
orders = receipt/order history
order-items = purchased formats
customer-addresses = billing/shipping records
downloads = digital/audiobook delivery records
```

Do not create a separate customer library table unless the relationship approach breaks down.

## Current Open Items

### Immediate

- Verify `/portal/library` after deploy.
- Verify PDF/EPUB, audiobook, paperback, and hardcover status buttons appear correctly.
- Add a customer logout action in the portal.
- Add a basic account/profile page.

### Digital Delivery

- Decide storage path/format for Book 1 PDF, EPUB, and audiobook files.
- Configure private file delivery, likely Cloudflare R2 signed links.
- Create or automate `downloads` records after checkout.
- Connect Library buttons to active `downloads` records.
- Track `downloadsUsed` and `lastDownloadedAt`.
- Enforce `maxDownloads` where appropriate.

### Email / Account Flow

- Mailjet is under review.
- Password reset/account activation should wait until email sending is ready.
- Customer welcome/order confirmation email can be added after Mailjet is approved.

### Support Flow

- Build `/portal/support` later.
- Connect support form to `support-tickets` and `support-messages`.

## Security Note

Hamilton explicitly deferred rotating `PAYLOAD_SETUP_SECRET` until after the Client Portal is completed.

Do not keep pushing secret rotation during current portal build work.

Reminder after portal completion:

```txt
Rotate PAYLOAD_SETUP_SECRET in Vercel.
```

## Next Best Actions

1. Test the deployed `/portal/library` page.
2. Add customer logout.
3. Add account/profile page.
4. Prepare first real digital files for PDF/EPUB/audiobook.
5. Wire private signed file delivery.
6. Connect Library access buttons to active Downloads records.
7. Build customer support workflow.
8. After portal completion, remind Hamilton to rotate `PAYLOAD_SETUP_SECRET`.
