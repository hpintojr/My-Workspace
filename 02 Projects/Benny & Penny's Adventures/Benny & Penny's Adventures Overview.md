---
type: project-overview
project: Benny & Penny's Adventures
updated: 2026-06-17
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
- Physical book fulfillment and tracking.
- Geoapify-powered address autocomplete/saved address experience.
- Social media and brand presence.
- Business infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

---

## Current Status — 2026-06-17

The project is currently focused on **LuLu print-on-demand fulfillment** and queued customer-experience improvements.

The site is still a controlled working environment:

```txt
Stay on main branch.
Production deployment is being used for controlled testing.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode until further notice.
LuLu remains sandbox/testing until further notice.
```

Current active work:

```txt
LuLu POD Phase 3 — backend foundation is deployed; next build is admin-facing Submit to LuLu button/tool page.
```

Current queued customer-experience workstream:

```txt
Geoapify address autocomplete for portal/account setup and later checkout prefill.
```

Confirmed status:

```txt
Phase 1: Internal print-jobs queue works.
Phase 2: Books have LuLu print setup fields and readiness logic.
Phase 3: LuLu API helper and protected manual submit route deployed.
Geoapify: Admin Dashboard System Status Check row added.
```

Confirmed test:

```txt
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after Neon lock-table patch.
Shipping copied into the print job.
LuLu API was not called during Phase 1/2.
```

---

## Completed / Confirmed

### Platform and CMS

- Cloudflare configured.
- `bennyandpennyadventures.com` connected to Vercel.
- GitHub deployment pipeline operational.
- Next.js route groups separated frontend and Payload Admin layouts.
- Payload CMS added to the Next.js project.
- Neon Postgres database created and connected.
- Payload Admin `/admin` loads and admin login works.
- First admin user was created.
- Books catalog seeded into Neon/Payload with records.
- Public `/books` and `/books/[slug]` pages read from Payload/Neon with a local fallback.

### Admin Dashboard and Admin Panel

- Admin dashboard is connected to live Payload data.
- Dashboard data sources include Orders, Order Items, Customer Addresses, Subscribers, Support Tickets, Books, Users, and Print Jobs.
- Dashboard cards show live revenue/orders/items/subscribers.
- Admin mobile polish is accepted/working on iPhone Chrome.
- Admin desktop sidebar toggle polish is accepted/working.
- Dashboard search is below the greeting.
- Welcome renders as `Welcome, Hamilton Pinto!`.
- Mobile and desktop sidebar toggle controls show the branded heart treatment.
- Print Jobs appears under Catalog below Media.
- Geoapify API appears in System Status Check with the provided logo.

Current admin sidebar direction:

```txt
Dashboard
Sales
  Orders
  Customers
  Abandoned Carts — coming soon
Catalog
  Books
  Media
  Print Jobs
Marketing
  Promotions
  Gifts
  Subscribers
Settings
  Users
  System Status Check
  Privacy Requests
```

### Stripe / Orders

- Stripe checkout works in sandbox.
- Cart clears after checkout success.
- Orders are created.
- Order Details are stored separately in `order-items`.
- Customer Addresses are structured with billing/shipping type.
- Order detail pages are working after fixing the Payload locked-document schema issue.
- Stripe fulfillment reads shipping details from Stripe's current collected shipping location.
- Physical formats are detected as `paperback` and `hardcover`.
- Guest-friendly checkout remains the preferred strategy; the backend creates/fetches a customer by email and sends setup-account email after purchase.
- Order number sequence uses yearly sequence style:

```txt
26-0001
26-0002
26-0003
```

Current product tax decision:

```txt
Do not collect tax for now.
Stripe Automatic Tax is OFF by default.
Tax remains $0 for current exempt-product assumption.
```

### LuLu Print-on-Demand

Phase 1 status:

```txt
Complete / working
```

Implemented:

```txt
collections/PrintJobs.ts
payload.config.ts
lib/luluPrintJobs.ts
lib/stripeFulfillment.ts
```

Working behavior:

```txt
Paid physical checkout
-> order created
-> order-items created
-> print-jobs record created
-> shipping snapshot copied
-> status draft or ready
```

Phase 2 status:

```txt
Implemented / Neon patched
```

Books now include:

```txt
LuLu project ID
LuLu paperback SKU
LuLu hardcover SKU
Trim size
Print interior file key or URL
Print cover file key or URL
Paperback print ready
Hardcover print ready
Print notes
```

Readiness logic:

```txt
Print job becomes ready only when shipping is complete and required book print setup fields exist.
Otherwise it remains draft and notes explain what is missing.
```

Phase 3 status:

```txt
Backend foundation implemented and deployed.
Admin UI is next.
```

Implemented:

```txt
lib/luluApi.ts
POST /api/admin/print-jobs/[id]/submit-lulu
```

Backend route behavior:

```txt
Protected route.
Requires a ready print job.
Validates customer email, shipping snapshot, and linked book print setup.
Builds LuLu request from frozen print-job data.
Submits to LuLu sandbox/test endpoint by default.
Stores raw request/response, IDs, status, and errors to print-jobs.
```

Neon schema patches applied:

```txt
print_jobs table created
payload_locked_documents_rels.print_jobs_id added
books print setup columns added
```

Important note:

```txt
Do not assume Payload auto-push creates every schema object. Verify Neon after adding collections/fields.
```

### Geoapify / Address Experience

Status:

```txt
Strategy documented.
Admin dashboard status row implemented.
Portal/account setup/checkout prefill not built yet.
```

Recommended route:

```txt
Guest-friendly checkout stays.
Backend creates/fetches account by email after purchase.
Customer gets setup-account email.
Geoapify is added first to portal address book and account setup address confirmation.
Logged-in checkout prefill comes later.
```

Strategy file:

```txt
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
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
downloads = digital/audiobook delivery records
print-jobs = physical fulfillment records, not yet surfaced to customers
```

Current My Library status buttons:

```txt
PDF / EPUB → PDF / EPUB Access Coming Soon
Audiobook → Audiobook Access Coming Soon
Paperback → Paperback Order Recorded
Hardcover → Hardcover Order Recorded
```

The customer experience should be updated after LuLu status/tracking data exists.

### Contact, Newsletter, Legal, and Compliance

- Contact page converted from `mailto:` behavior to an on-site form.
- `/api/contact` exists and is connected to transactional email/client helpers.
- Contact form includes required contact consent.
- Contact form includes optional email opt-in.
- Contact form includes optional SMS opt-in with TCPA-style language.
- Newsletter form requires email opt-in.
- Newsletter signup logs consent events.
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

---

## Active Problem

The active problem is now **admin-facing manual LuLu submission**.

The backend submit helper and protected route are deployed. The app still needs an admin-visible way to trigger the submit route safely from a ready print job.

Current blockers for LuLu submission:

- Admin button/tool page does not exist yet.
- Book 1 print setup fields need to be filled before a sandbox submission test.
- Non-ready print jobs should remain blocked.
- Tracking/status from LuLu is not implemented yet.
- Auto-submit must remain disabled until manual submission is proven.

---

## Vercel Deployment Workflow

Current working rule for this project:

```txt
Stay on main branch unless Hamilton explicitly requests otherwise.
Use production deployment as controlled test environment.
```

Recommended commit grouping going forward:

```txt
1 commit = admin submit button/tool page
1 commit = sandbox submit test polish/status display
1 commit = status/tracking persistence
1 commit = customer portal delivery-status update
1 commit = workspace/docs update
```

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

## Current Payload Collections

- Books / Product Catalog.
- Users / Customers & Admins.
- CustomerAddresses.
- ContactSubmissions.
- Subscribers.
- Orders.
- OrderItems.
- PrintJobs.
- Downloads / Media.
- SupportTickets.
- SupportMessages.
- AccessGrants.
- AuditLogs.
- PrivacyRequests.
- ConsentLogs.
- Promotions.
- Gifts.
- PasswordTokens.
- Payload system tables: preferences, locked documents, migrations.

## Temporary Setup / Debug Routes

Temporary setup/debug/reconcile/submit routes exist or have existed to bootstrap and repair Payload/Neon/Stripe/LuLu setup.

Known temporary route categories:

```txt
setup routes
debug routes
manual Stripe reconciliation route
manual LuLu submit route
```

These must be removed or locked down before production launch.

## Next Best Actions

1. Fill Book 1 LuLu print setup fields in Payload Admin.
2. Build admin-facing Submit to LuLu button/tool page.
3. Test that non-ready jobs are blocked safely.
4. Test sandbox submission only after Book 1 setup is complete.
5. Save/display LuLu request/response, IDs, and errors in Print Jobs.
6. Keep auto-submit disabled.
7. After LuLu tracking exists, update portal order experience for physical delivery.
8. Continue customer portal mobile validation.
9. Complete R2/live delivery E2E.
10. Remove temporary setup/debug/reconcile/submit routes before launch.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Attorney review of legal/compliance pages.

### Technical

- Admin-facing manual LuLu submit UI not finished.
- LuLu status/tracking not finished.
- Customer portal physical delivery status not finished.
- Client Portal digital delivery E2E not finished.
- Password reset/account activation not fully validated.
- Customer support portal not finished.
- Private file delivery/R2 signed links need real-file validation.
- Temporary setup/debug/reconcile/submit routes need cleanup before launch.
- Customer-role access control needs live verification.
