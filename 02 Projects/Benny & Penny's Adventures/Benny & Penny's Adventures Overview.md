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

## Current Status — 2026-06-17

The active project focus has shifted to the **customer experience / portal revamp** based on Hamilton's updated architectural blueprint.

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
Customer Experience / Portal Revamp
```

Current active roadmap:

```txt
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md
```

LuLu status:

```txt
LuLu print-job queue works.
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
- Order number sequence uses yearly sequence style.

Current product tax decision:

```txt
Do not collect tax for now.
Stripe Automatic Tax is OFF by default.
This must be reviewed before public physical-book launch.
```

### LuLu Print-on-Demand

Phase 1 status:

```txt
Complete / working
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

Phase 3 status:

```txt
Backend foundation and admin page deployed.
Testing paused.
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
```

### Geoapify / Address Experience

Status:

```txt
Strategy documented.
Admin dashboard status row implemented.
Vercel values configured.
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

Important legal/business gap:

- Marketing emails still need a valid physical mailing address or PO Box.
- Do not invent the address.
- Legal language still needs attorney review before launch.
- Privacy policy should be reviewed for Stripe, LuLu, Geoapify, R2, and email-provider data flows.

---

## Active Problem

The active problem is now **customer experience / portal revamp**.

The current portal has good technical foundations, but the customer journey needs to become clearer and more premium:

```txt
customer buys as guest
-> account gets created/fetched by email
-> customer receives setup-account prompt
-> customer confirms addresses
-> customer sees library, orders, print status, and support
```

Current blockers:

- Portal information architecture needs redesign.
- Portal visual system needs bookstore/editorial polish.
- Address autocomplete is not built into portal yet.
- Account setup address confirmation is not built.
- Order details do not yet show clear digital vs physical fulfillment segments.
- Helpdesk workflow is not customer-facing yet.
- R2 live-file delivery E2E is still open.
- Physical tracking is not implemented yet.

---

## Next Best Actions

1. Audit current portal routes and components.
2. Redesign portal information architecture.
3. Add Geoapify autocomplete to Portal > Addresses.
4. Add address confirmation to account setup.
5. Plan logged-in checkout address prefill.
6. Redesign cart UX for mobile-first checkout clarity.
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
- Address autocomplete/account confirmation not finished.
- Helpdesk/customer support portal not finished.
- Client Portal digital delivery E2E not finished.
- Customer portal physical delivery status not finished.
- LuLu status/tracking not finished.
- Password reset/account activation not fully validated.
- Temporary setup/debug/reconcile/submit routes need cleanup before launch.
- Customer-role access control needs live verification.
