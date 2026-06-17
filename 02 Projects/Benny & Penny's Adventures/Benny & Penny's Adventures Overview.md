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
- Customer support/helpdesk workflow.
- Social media and brand presence.
- Business infrastructure.

## Domains

- `bennyandpennyadventures.com` — main website.
- `bennyandpenny.com` — communications/email domain.

---

## Current Status — 2026-06-17 Repo Review

The active project focus is **Customer Experience / Portal Revamp** based on Hamilton's updated architectural blueprint and the latest repo review.

The site remains a controlled working environment:

```txt
Stay on main branch.
Production deployment is the controlled test environment.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode.
LuLu remains sandbox/testing.
```

Current active roadmap:

```txt
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md
```

LuLu status:

```txt
Print-job queue works.
Book setup fields exist.
Backend submit route exists.
Admin Submit to LuLu page/link exists.
Further LuLu testing is paused.
Auto-submit remains disabled.
```

Geoapify status:

```txt
Geoapify row appears in Admin Dashboard System Status Check.
Geoapify Vercel values are configured.
Portal/address autocomplete is not built yet.
```

---

## Repo Review Corrections to Preserve

Confirmed during code review:

```txt
Portal routes exist for home, login, orders, library, and addresses.
Portal APIs exist for account status, orders, library, addresses, and file delivery.
Cart already has thumbnails, format labels, plus/minus quantity controls, remove item, clear cart, and saved-address selectors.
Checkout already has partial saved-address prefill for signed-in customers.
R2 delivery code path exists and Library can show available digital records.
Support collections exist, but customer-facing Helpdesk is not built.
```

Important gaps found:

```txt
Verify or build the customer account setup page.
Add Geoapify metadata fields and autocomplete to Portal > Addresses.
Harden and test the existing saved-address checkout prefill.
Confirm LuLu print-file URL handling before sandbox/live submission.
Expand support model/API for affected order items and customer-visible threads.
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
- Print Jobs appears under Catalog below Media.
- Submit to LuLu appears under Catalog.
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
  Submit to LuLu
Marketing
  Promotions
  Gifts
  Subscribers
Settings
  Users
  System Status Check
  Privacy Requests
```

### Stripe / Orders / Cart

- Stripe checkout works in sandbox.
- Cart clears after checkout success.
- Orders are created.
- Order Details are stored separately in `order-items`.
- Customer Addresses are structured with billing/shipping type.
- Stripe fulfillment reads shipping details from Stripe's current collected shipping location.
- Physical formats are detected as `paperback` and `hardcover`.
- Guest-friendly checkout remains the preferred strategy.
- Cart has basic polished commerce behavior.
- Signed-in customer saved-address prefill is partially implemented.

Current product tax decision:

```txt
Do not collect tax for now.
Stripe Automatic Tax is OFF by default.
This must be reviewed before public physical-book launch.
```

### LuLu Print-on-Demand

Working behavior:

```txt
Paid physical checkout
-> order created
-> order-items created
-> print-jobs record created
-> shipping snapshot copied
-> status draft or ready
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

Implemented:

```txt
lib/luluApi.ts
POST /api/admin/print-jobs/[id]/submit-lulu
/admin/lulu-submit
```

Important note:

```txt
Do not submit LuLu jobs yet unless Hamilton explicitly resumes this path.
Before real testing, confirm print-file URL handling.
```

### Geoapify / Address Experience

Recommended route:

```txt
Guest-friendly checkout stays.
Backend creates/fetches account by email after purchase.
Customer gets setup-account prompt.
Geoapify is added first to portal address book and account setup address confirmation.
Logged-in checkout prefill is already partially implemented and needs hardening/testing.
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
/api/portal/me
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
support-tickets = future customer helpdesk records
```

Current customer portal is functional but needs a full experience revamp.

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

Important legal/business gaps:

- Marketing emails still need a valid physical mailing address or PO Box.
- Legal language still needs attorney review before launch.
- Privacy policy should be reviewed for Stripe, LuLu, Geoapify, R2, and email-provider data flows.

---

## Active Problem

The active problem is **customer experience / portal revamp**.

Current blockers:

- Customer account setup page must be verified or built.
- Portal information architecture needs redesign.
- Portal visual system needs bookstore/editorial polish.
- Address autocomplete is not built into portal yet.
- Account setup address confirmation is not built.
- Order details do not yet show clear digital vs physical fulfillment segments.
- Helpdesk workflow is not customer-facing yet.
- R2 live-file delivery E2E is still open.
- Physical tracking is not implemented yet.
- LuLu file URL handling needs confirmation before any submission testing.

---

## Next Best Actions

1. Verify or build the customer account setup page.
2. Redesign portal information architecture.
3. Add Geoapify fields and autocomplete to Portal > Addresses.
4. Add address confirmation after account setup.
5. Harden the existing saved-address checkout prefill.
6. Upgrade cart UX for mobile-first checkout clarity.
7. Add customer support/helpdesk workflow tied to orders/items.
8. Later resume LuLu sandbox testing only when ready.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Attorney/CPA review of legal, tax, and compliance decisions.

### Technical

- Customer portal revamp not finished.
- Account setup page needs verification/build.
- Address autocomplete/account confirmation not finished.
- Helpdesk/customer support portal not finished.
- Client Portal digital delivery E2E not finished.
- Customer portal physical delivery status not finished.
- LuLu file URL/status/tracking not finished.
- Temporary setup/debug/reconcile/submit routes need cleanup before launch.
- Customer-role access control needs live verification.
