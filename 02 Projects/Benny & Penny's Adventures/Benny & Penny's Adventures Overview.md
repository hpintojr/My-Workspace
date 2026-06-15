---
type: problems
project: Benny & Penny's Adventures
updated: 2026-06-15
---

# Benny & Penny's Adventures Overview

## Goal

Build a children's publishing business around the Benny & Penny medical adventure book series, including:

- Public website.
- Digital ebook sales.
- Audiobook/audio sales.
- Print-on-demand book sales.
- Customer portal / member area.
- Payload CMS admin backend.
- Email list and contact management.
- Private digital/audio fulfillment.
- Social media and brand presence.
- Business infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

## Current Status

The project has moved from admin/order stabilization into the first **Client Portal** build.

Payload Admin is functional. Stripe sandbox checkout is working. Fresh checkout testing confirmed the thank-you page can show the real customer-facing order number. Billing and shipping are saving correctly. Orders, order details, customer addresses, and customer records are now usable enough to power the portal.

The Client Portal foundation is now live in code:

```txt
/portal
/portal/login
/portal/orders
/portal/addresses
/portal/library
```

Current portal status:

- Customer login works through Payload auth when a password exists.
- `/portal/orders` shows live signed-in customer order history.
- `/portal/addresses` shows live billing/shipping addresses.
- `/portal/library` shows purchased books grouped by book and format.
- Library access/status buttons exist for PDF/EPUB, audiobook, paperback, and hardcover.
- `/api/portal/downloads` exists as a protected endpoint foundation for future private file delivery.

Digital delivery is not complete yet. PDF/EPUB and audiobook buttons currently show access placeholders until R2/private signed file delivery and active `downloads` records are wired.

## Completed / Confirmed

### Platform and CMS

- Cloudflare configured.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub deployment pipeline operational.
- Vercel deployments are back to normal working conditions after the prior Hobby deployment limit reset.
- Next.js route groups separated frontend and Payload Admin layouts.
- Payload CMS added to the Next.js project.
- Neon Postgres database created and connected.
- Payload Admin `/admin` loads and admin login works.
- First admin user was created.
- Books catalog seeded into Neon/Payload with 9 records.
- Payload API confirmed it can read 9 Books records.
- Public `/books` and `/books/[slug]` pages read from Payload/Neon with a local fallback.

### Admin Dashboard and Admin Panel

- Admin dashboard is connected to live Payload data.
- Dashboard data sources include Orders, Order Items, Customer Addresses, Subscribers, Support Tickets, Books, and Users.
- Dashboard cards show live revenue/orders/items/subscribers.
- Sales Performance graph is interactive by dropdown range.
- Recent Orders table was cleaned up.
- Recent Order Details table was removed from dashboard because it felt redundant.
- System Status checks were restored.
- Dashboard expands when sidebar collapses.
- Dashboard search icon and top spacing were visually adjusted.
- Breadcrumb/profile/avatar clutter was removed from the dashboard.
- Sidebar active state now follows the current route instead of always highlighting Dashboard.
- Native Payload sidebar/current-page labels are hidden.
- Sidebar branding is centered with the rest of the nav elements.
- Customers and Users are separated by route behavior.
- Media link works by exposing the Downloads collection as Media.
- Subscribers `Marketing Opt In` displays `Yes`/`No` instead of raw `true`/`false`.
- Row checkbox styling was debugged and narrowed away from broad select/button styling.
- Logout notification/toast styling has a global dark-teal override and needs final deploy verification.

Current admin sidebar direction:

```txt
Dashboard
Adventure Hub
Orders
Customers
Books
Media
Subscribers
Users
System Status Check
Privacy Requests
Log out
```

### Stripe / Orders

- Stripe checkout works in sandbox.
- Cart clears after checkout success.
- Orders are created.
- Order Details are stored separately in `order-items`.
- Customer Addresses are structured with billing/shipping type.
- Order detail pages are working after fixing the Payload locked-document schema issue.
- Stripe fulfillment now reads shipping from both the old location and Stripe's newer `collected_information.shipping_details` location.
- Order number sequence uses yearly sequence style:

```txt
26-0001
26-0002
26-0003
```

Confirmed clean checkout result:

```txt
Order #26-0011 has been created.
```

Portal testing also showed customer order:

```txt
Order #26-0012
Total: $80.96
Status: paid
```

Current product tax decision:

```txt
Do not collect tax for now.
Stripe Automatic Tax is OFF by default.
Tax remains $0 for current exempt-product assumption.
```

### Client Portal

Built routes:

```txt
/portal
/portal/login
/portal/orders
/portal/addresses
/portal/library
```

Built APIs:

```txt
/api/portal/orders
/api/portal/addresses
/api/portal/library
/api/portal/downloads
```

Portal data source approach:

```txt
users = customers/auth
orders = receipt/order history
order-items = purchased formats
customer-addresses = billing/shipping records
downloads = future digital/audiobook delivery records
```

Portal pages now do the following:

- `/portal` gives customer account dashboard cards.
- `/portal/login` signs customers in through Payload auth.
- `/portal/orders` shows order receipt/accounting view.
- `/portal/addresses` shows billing and shipping addresses.
- `/portal/library` shows purchased books and owned formats.

My Orders vs My Library distinction:

```txt
My Orders = receipts, totals, shipping, payment/order status.
My Library = books and formats the customer owns or can access.
```

Current My Library status buttons:

```txt
PDF / EPUB → PDF / EPUB Access Coming Soon
Audiobook → Audiobook Access Coming Soon
Paperback → Paperback Order Recorded
Hardcover → Hardcover Order Recorded
```

### Contact, Newsletter, Legal, and Compliance

- Contact page converted from `mailto:` behavior to an on-site form.
- `/api/contact` exists and is connected to Mailjet client.
- Contact form includes required contact consent.
- Contact form includes optional email opt-in.
- Contact form includes optional SMS opt-in with TCPA-style language.
- Contact form stores consent proof fields when schema is available.
- Newsletter form requires email opt-in.
- Newsletter signup logs consent events.
- Newsletter thank-you page shows signup-specific copy instead of order copy.
- Privacy Request form added.
- Consent Logs collection added.
- Privacy Requests collection added.
- Footer legal links expanded.

Legal/compliance pages:

```txt
/privacy
/terms
/sms-terms
/privacy/california
/privacy/state-rights
/privacy/requests
```

Important legal/business gap:

- Marketing emails still need a valid physical mailing address or PO Box.
- Do not invent the address.
- Legal language still needs attorney review before launch.

## Active Problem

The active problem is now **finishing the Client Portal**, especially digital delivery.

The portal can show orders, addresses, and library ownership. It cannot yet deliver private PDF/EPUB/audiobook files.

Current blockers for portal completion:

- Actual PDF/EPUB/audiobook files need to be prepared/uploaded.
- Private storage/signed delivery needs to be wired, likely Cloudflare R2.
- `downloads` records need to be created/automated for customers.
- Library access buttons need to connect to active `downloads` records.
- Password reset/account activation emails are pending Mailjet approval.
- Customer logout/profile/support flows still need to be built.

## Vercel Deployment Workflow

Vercel is back to normal working conditions, but the workflow decision remains:

- Stop committing/deploying every tiny fix directly to `main` when debugging.
- Group related fixes into larger commits.
- Prefer feature branches where practical.
- Redeploy only when the batch is ready to test.

Recommended future commit grouping:

```txt
1 commit = client portal data/display fix
1 commit = download/R2 delivery integration
1 commit = customer support workflow
1 commit = admin CSS consolidation
1 commit = setup/debug route removal
1 commit = workspace/docs update
```

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

## Current Payload Collections

- Books.
- Users / Customers & Admins.
- CustomerAddresses.
- ContactSubmissions.
- Subscribers.
- Orders.
- OrderItems.
- Downloads / Media.
- SupportTickets.
- SupportMessages.
- AccessGrants.
- AuditLogs.
- PrivacyRequests.
- ConsentLogs.
- Payload system tables: preferences, locked documents, migrations.

## Temporary Setup / Debug Routes

Temporary setup/debug/reconcile routes exist or have existed to bootstrap and repair Payload/Neon/Stripe setup.

Known temporary route categories:

```txt
setup routes
debug routes
manual Stripe reconciliation route
```

These must be removed or locked down before production launch.

Hamilton explicitly deferred rotating `PAYLOAD_SETUP_SECRET` until after the Client Portal is completed. Do not keep pushing it during active portal build work. Remind him after portal completion.

## Next Best Actions

1. Verify `/portal/library` and access/status buttons after deploy.
2. Add customer logout button/state.
3. Add account/profile page.
4. Prepare first real PDF/EPUB/audiobook files for Book 1.
5. Wire private file delivery with signed links.
6. Connect Library buttons to active Downloads records.
7. Add customer support page/form connected to Support Tickets.
8. Add password reset/account activation once Mailjet is approved.
9. Confirm/run any remaining Neon SQL patches.
10. Consolidate admin CSS files after final QA.
11. Remove temporary setup/debug/reconcile routes before launch.
12. After Client Portal completion, remind Hamilton to rotate `PAYLOAD_SETUP_SECRET`.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Mailjet approval/configuration.
- Attorney review of legal/compliance pages.

### Technical

- Client Portal digital delivery not finished.
- Password reset/account activation not finished.
- Customer support portal not finished.
- Private file delivery/R2 signed links not finished.
- Neon SQL patches still need to be run/confirmed.
- Temporary setup/debug/reconcile routes need cleanup before launch.
- Admin CSS consolidation still recommended.
