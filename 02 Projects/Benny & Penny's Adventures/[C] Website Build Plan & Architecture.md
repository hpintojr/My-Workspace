---
type: build-plan
project: Benny & Penny's Adventures
updated: 2026-06-14
status: admin dashboard and compliance infrastructure verification phase
---

# Website Build Plan & Architecture

## Current Status

The public website, Payload CMS backend, Stripe sandbox/order data flow, admin dashboard, contact/newsletter consent handling, and privacy/TCPA page structure are now substantially built in code.

The current phase is **verification and schema finalization**, not conceptual planning.

Immediate priority:

```txt
Run Neon SQL patches
Redeploy main
Test contact/newsletter/privacy request/admin data flows
Fix any schema/build issues
Then start Client Portal foundation
```

## Completed or Confirmed

### Platform / Deployment

- Cloudflare and Vercel are connected.
- GitHub deployment pipeline works.
- Vercel Node.js version is set to `20.x`.
- Vercel deployment cap issue from earlier troubleshooting is resolved, but batching commits is still preferred.
- Public route group and Payload Admin route group were separated.
- Payload Admin collection rendering issue was resolved.

### Public Website

- Homepage and most public website UI are substantially complete.
- Public `/books` and `/books/[slug]` load from Payload/Neon with local fallback data.
- Newsletter signup now routes to a newsletter-specific thank-you page.
- Checkout/order thank-you flow still uses `session_id` and clears cart.

### Payload CMS

- Payload CMS installed and configured.
- Neon Postgres connected.
- Admin login works and first admin user was created.
- Books catalog seeded with 9 records.
- Payload API can read the Books collection.
- Payload Admin collection pages render.
- Admin dashboard connected to live Payload data.

### Admin Dashboard

Dashboard now pulls live data from:

```txt
orders
order-items
customer-addresses
subscribers
support-tickets
books
users
```

Dashboard includes:

- Total revenue.
- Orders.
- Items sold.
- Subscribers.
- Interactive Sales Performance graph.
- Database Health card.
- Recent Orders table.
- Latest Subscribers table.
- System Status checks.

Sales graph behavior:

```txt
Today → hourly
Last 3 days → daily
Last 7 days → daily
Last 14 days → weekly
Last 30 days → weekly
Last 45 days → weekly
Last 60 days → weekly
Last 90 days → monthly
Last 120 days → monthly
This Past Year → monthly
```

Admin sidebar target:

```txt
Dashboard
Adventure Hub
Orders
Order Details
Customer Addresses
Subscribers
Support
Privacy Requests
Consent Logs
Settings
```

### Stripe / Commerce

- Stripe checkout/order flow is working in sandbox enough to create Payload records.
- Cart clears after successful checkout.
- Orders are created.
- Order Details are stored in `order-items`.
- Customer Addresses are stored with billing/shipping type.
- New order ID sequence is intended to use:

```txt
26-0001
26-0002
26-0003
```

Existing sandbox/test orders may still show old `BP-...` IDs unless backfilled.

### Contact, Newsletter, Consent, and Privacy

- Contact page uses an on-site form.
- `/api/contact` validates form input and sends/stores submissions.
- Contact form includes contact consent, optional email opt-in, optional SMS opt-in, phone field, and SMS/TCPA disclosure.
- Newsletter form requires email opt-in checkbox.
- Newsletter signup logs consent events.
- Privacy Requests form added at `/privacy/requests`.
- New Payload collections added:
  - `privacy-requests`
  - `consent-logs`
- Footer links to legal/privacy/TCPA pages.

Legal/compliance pages now include:

```txt
/privacy
/terms
/sms-terms
/privacy/california
/privacy/state-rights
/privacy/requests
```

## Current Blocker

The main blocker is now **database schema and deployment verification**.

Before relying on the new compliance data, run the Neon SQL patches from the website repo:

```txt
docs/CONTACT_OPT_IN_SCHEMA_PATCH.md
docs/PRIVACY_COMPLIANCE_SCHEMA_PATCH.md
```

Then redeploy `main` and verify the new collections/routes.

## Locked Stack

- Next.js 15.4.11 with TypeScript.
- Payload CMS 3.x.
- Neon Postgres.
- Vercel hosting.
- GitHub deployment.
- Cloudflare DNS.
- Stripe Checkout and webhooks/sandbox fulfillment.
- Mailjet for email once account/config is fully working.
- Cloudflare R2 later for private ebook/audiobook storage.
- Lulu Direct API later for print-on-demand.

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
- Downloads.
- SupportTickets.
- SupportMessages.
- AccessGrants.
- AuditLogs.
- PrivacyRequests.
- ConsentLogs.

## Books Collection Product Page Fields

The Books collection mirrors the public product page model:

- number.
- slug.
- title.
- topic.
- ages.
- pages.
- badge.
- status.
- shortDescription.
- longDescription.
- coverImage.
- coverImagePath.
- pagePreviewOne.
- pagePreviewTwo.
- pdfPath.
- epubPath.
- audioPath.
- priceDigital.
- priceAudiobook.
- pricePaperback.
- priceHardcover.
- digitalDescription.
- audiobookDescription.
- paperbackDescription.
- hardcoverDescription.
- pdfObjectKey.
- epubObjectKey.
- audiobookObjectKey.
- stripeLookupKey.
- Stripe price ID fields for each format.

Seeded books:

1. Home Infusion Day.
2. Port Adventure.
3. PICC Line Adventure.
4. Special Line Adventure.
5. MRI Adventure.
6. Hospital Sleepover.
7. Ambulance Adventure.
8. Surgery Day.
9. Lab Draw Adventure.

## Phase 0 — Business Foundation

- [ ] Obtain PO Box or valid business mailing address for CAN-SPAM marketing email footer.
- [ ] File DBA.
- [ ] Open business bank account.
- [ ] Create/finish Stripe account setup.
- [ ] Resolve or confirm Mailjet account/config status.
- [ ] Attorney review of Privacy, Terms, SMS Terms, California Notice, State Rights, and Privacy Requests language.
- [x] Add Payload-related Vercel environment variables.
- [x] Confirm Vercel Node.js version is `20.x`.

## Phase 1 — Payload CMS Setup

- [x] Install/configure Payload CMS.
- [x] Connect Neon Postgres database.
- [x] Configure admin login and create first admin user.
- [x] Define Books collection.
- [x] Define Users / Customers & Admins collection.
- [x] Define CustomerAddresses collection.
- [x] Define Subscribers collection.
- [x] Define ContactSubmissions collection.
- [x] Define Orders and OrderItems collections.
- [x] Define Downloads collection.
- [x] Define SupportTickets and SupportMessages collections.
- [x] Define AccessGrants collection.
- [x] Define AuditLogs collection.
- [x] Define PrivacyRequests collection.
- [x] Define ConsentLogs collection.
- [x] Seed Books catalog.
- [x] Verify Payload Admin collection panels render.
- [x] Add custom admin dashboard.
- [x] Connect dashboard to live data.
- [ ] Run latest Neon SQL patches for consent/privacy collections.
- [ ] Replace temporary setup routes with proper migrations.
- [ ] Remove temporary setup/debug routes.

## Phase 2 — Contact, Newsletter, and Consent Management

- [x] Replace `mailto:` behavior with a real web form.
- [x] Contact page submits to a Next.js API route.
- [x] API route validates form input.
- [x] Visitor sees on-page success/error message.
- [x] Connect API route to Mailjet API client.
- [x] Store contact submissions in Payload.
- [x] Store newsletter signups in Payload.
- [x] Add contact form opt-in disclosures.
- [x] Add newsletter email opt-in checkbox.
- [x] Add Consent Logs collection.
- [x] Log contact/newsletter/privacy request consent events.
- [ ] Run database patch for consent columns and logs table.
- [ ] Resolve/confirm Mailjet account/config status.
- [ ] Add CSV export workflow.
- [ ] Add spam protection, preferably Cloudflare Turnstile.

## Phase 2.5 — Legal, Privacy, and TCPA Pages

- [x] Update Privacy Policy.
- [x] Update Terms of Use.
- [x] Add Messaging Terms page.
- [x] Add California Privacy Notice.
- [x] Add State Privacy Rights page.
- [x] Add Privacy Requests / Do Not Sell or Share page.
- [x] Add working Privacy Request form.
- [x] Add footer links to legal/compliance pages.
- [ ] Add official physical mailing address / PO Box to marketing email templates.
- [ ] Attorney review before accepting payments or sending campaigns.

## Phase 3 — Private Ebook and Audiobook Delivery

- [ ] Create private Cloudflare R2 bucket.
- [ ] Upload PDF, EPUB, and audiobook files to private paths.
- [x] Add object key fields to Payload Books collection.
- [ ] Generate signed links after payment/access check.
- [ ] Track downloads/access in Payload.
- [ ] Enforce initial max 3 download/access attempts.

## Phase 4 — Stripe Checkout and Fulfillment

- [ ] Finish Stripe account/live setup.
- [ ] Configure products/prices for all formats.
- [x] Build checkout flow.
- [x] Build webhook/fallback fulfillment route enough for sandbox testing.
- [x] Create order/order item/address records after payment.
- [x] Clear cart after successful payment.
- [ ] Send confirmation/fulfillment email.
- [ ] Confirm order ID sequence in fresh sandbox test after redeploy.

## Phase 5 — Client Portal / Member Area

Next major build phase after admin/compliance verification:

- [ ] `/account` dashboard.
- [ ] `/account/orders`.
- [ ] `/account/downloads`.
- [ ] `/account/email-preferences`.
- [ ] `/account/support`.
- [ ] `/account/profile`.

## Phase 6 — Lulu Direct POD

- [ ] Evaluate Lulu Direct API requirements.
- [ ] Configure Lulu credentials.
- [ ] Map print SKUs.
- [ ] Connect print orders to Lulu order creation.
- [ ] Test sandbox and live fulfillment.

## Remaining Build Order

1. Run the Neon SQL patches.
2. Redeploy `main`.
3. Test `/contact`, newsletter signup, `/privacy/requests`, and admin compliance collections.
4. Verify dashboard graph, recent orders, system status, and sidebar after deploy.
5. Fix any schema/build issues.
6. Remove temporary setup/debug routes.
7. Rotate/delete setup secret.
8. Add business mailing address/PO box before marketing email campaigns.
9. Start Client Portal foundation.
10. Set up R2 and upload digital/audio files.
11. Build signed delivery.
12. Add Lulu Direct API later.

## Launch Blockers

### Business

- PO Box or business mailing address.
- DBA.
- Business bank account.
- Stripe live account readiness.
- Mailjet account/config readiness.
- Attorney review.

### Technical

- Neon SQL patches run.
- Latest `main` redeployed and QA tested.
- Temporary setup/debug routes removed.
- Setup secret rotated/deleted.
- Full contact/newsletter/privacy request flow verified.
- Consent Logs verified in admin.
- R2 setup.
- Fulfillment email.
- Ebook/audio delivery workflow.
- Client portal.
- POD integration.
