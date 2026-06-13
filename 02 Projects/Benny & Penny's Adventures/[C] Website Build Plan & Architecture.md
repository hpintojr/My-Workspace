---
type: build-plan
project: Benny & Penny's Adventures
updated: 2026-06-13
status: Payload CMS integration and commerce infrastructure phase
---

# Website Build Plan & Architecture

## Current Status

The public website is largely built. The project is now focused on Payload CMS, Neon Postgres, payments, private fulfillment, and customer/member infrastructure.

## Completed or Confirmed

- Cloudflare and Vercel are connected.
- GitHub deployment pipeline works.
- Homepage and most public website UI are substantially complete.
- Contact page uses an on-site form instead of opening the visitor email client.
- Contact API route exists and is connected to Mailjet, but Mailjet remains blocked at the account level.
- Privacy Policy and Terms were drafted for launch, but must be rechecked after the route-group refactor.
- Audiobook product option is set at `$21.99`.
- Neon Postgres exists.
- Vercel Node.js version is set to `20.x`.
- Payload CMS was added to the Next.js app.
- Payload Admin login works and the first admin user was created.
- Payload collections were defined for the core backend model.
- Books catalog was seeded into Neon/Payload with 9 books.
- Payload API can read the Books collection.
- Public `/books` and `/books/[slug]` were wired to load from Payload/Neon with local fallback data.

## Current Blocker

Payload Admin sidebar renders, but the collection center panels are blank for all collections.

Confirmed:

- Raw database debug can read Books.
- Payload API debug can read Books.
- The issue is not a Books data problem.
- Browser console showed React error `#418`, which points to a hydration mismatch.

Likely cause:

- Payload Admin was wrapped by the public app root layout.
- Payload Admin needs its own root layout and should not be nested inside the public website layout.

Fix direction:

```txt
app/(frontend)/layout.tsx = public website layout
app/(payload)/layout.tsx = Payload Admin layout
```

Next step is to redeploy once Vercel allows it and test the admin collection pages again.

## Deployment Workflow Rule

Vercel Hobby hit the daily deployment cap during troubleshooting.

New rule:

- Do not push every tiny fix directly to `main`.
- Use feature branches for debugging.
- Group related fixes before merging/deploying.
- Deploy only when a complete batch is ready.

Recommended grouping:

```txt
1 commit = full Payload Admin route/layout fix
1 commit = product/catalog integration
1 commit = cleanup/remove setup routes
1 commit = workspace/docs update
```

## Locked Stack

- Next.js 15.4.11 with TypeScript.
- Payload CMS 3.x.
- Neon Postgres.
- Vercel hosting.
- GitHub deployment.
- Cloudflare DNS.
- Cloudflare R2 for private ebook and audiobook storage.
- Stripe Checkout and webhooks.
- Mailjet after account unblock.
- Lulu Direct API later.

## Product Format Pricing

- PDF / EPUB: `$15.99`.
- Audiobook: `$21.99`.
- Paperback: `$17.99`.
- Hardcover: `$24.99`.

## Payload CMS Purpose

Payload should manage:

- Book/product content.
- Customers/admin users.
- Orders and order items.
- Downloads and access records.
- Subscribers.
- Contact submissions.
- Support tickets and messages.
- Manual access grants.
- Audit logs.

Payload will also support the future customer/member area.

## Current / Intended Payload Collections

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

## Books Collection Product Page Fields

The Books collection now needs to mirror the current public product pages:

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

## Temporary Setup and Debug Routes

Temporary setup/debug routes were created to bootstrap and inspect the Payload/Neon setup.

Cleanup requirement:

- Remove temporary setup/debug routes before launch.
- Rotate/delete the setup secret after removal.
- Replace temporary SQL repair routes with proper migrations later.

## Phase 0 — Business Foundation

- [ ] Obtain PO Box.
- [ ] File DBA.
- [ ] Open business bank account.
- [ ] Create Stripe account.
- [ ] Resolve Mailjet temporary account block.
- [ ] Rotate Neon database password if exposed credentials are still active.
- [ ] Rotate Mailjet credentials if exposed credentials are still active.
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
- [x] Seed Books catalog.
- [ ] Verify Payload Admin collection center panels render after route-group fix.
- [ ] Replace temporary setup routes with proper migrations.
- [ ] Remove temporary setup/debug routes.

## Phase 2 — Contact and Lead Management

- [x] Replace `mailto:` behavior with a real web form.
- [x] Contact page submits to a Next.js API route.
- [x] API route validates form input.
- [x] Visitor sees on-page success/error message.
- [x] Connect API route to Mailjet API client.
- [ ] Resolve Mailjet account block.
- [ ] Store contact submissions in Payload.
- [ ] Store newsletter signups in Payload.
- [ ] Add admin subscriber dashboard.
- [ ] Add CSV export workflow.
- [ ] Add spam protection.

## Phase 2.5 — Legal Pages

- [x] Draft Privacy Policy.
- [x] Draft Terms of Service.
- [x] Add audiobook/audio disclosures.
- [ ] Verify full Privacy/Terms content after moving pages into the frontend route group.
- [ ] Restore full legal text from Git history if any placeholder content remains.
- [ ] Add optional phone-number disclosure before collecting phone numbers.
- [ ] Attorney review before accepting payments.

## Phase 3 — Private Ebook and Audiobook Delivery

- [ ] Create private Cloudflare R2 bucket.
- [ ] Upload PDF, EPUB, and audiobook files to private paths.
- [x] Add object key fields to Payload Books collection.
- [ ] Generate signed links after payment/access check.
- [ ] Track downloads/access in Payload.
- [ ] Enforce initial max 3 download/access attempts.

## Phase 4 — Stripe Checkout and Fulfillment

- [ ] Create Stripe account.
- [ ] Configure products/prices for all formats.
- [ ] Build checkout flow.
- [ ] Build webhook route.
- [ ] Create order/access records after payment.
- [ ] Send confirmation/fulfillment email.

## Phase 5 — Member Area

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

1. Wait for Vercel deployment limit reset or upgrade Vercel.
2. Deploy the route-group admin layout fix once.
3. Verify Payload Admin collection pages render.
4. Verify public routes after frontend route-group move.
5. Restore full legal/resource/thank-you content if needed.
6. Remove temporary setup/debug routes.
7. Rotate/delete setup secret.
8. Resolve Mailjet block.
9. Store contact form submissions and subscribers in Payload.
10. Set up R2 and upload digital/audio files.
11. Set up Stripe checkout/webhooks.
12. Build signed delivery.
13. Build member area.
14. Add Lulu Direct API.
15. Production launch.

## Launch Blockers

### Business

- PO Box.
- DBA.
- Business bank account.
- Stripe account.
- Mailjet account unblocked.
- Attorney review.

### Technical

- Payload Admin collection rendering verified.
- Temporary setup/debug routes removed.
- Setup secret rotated/deleted.
- Public route QA after route-group refactor.
- Full legal text verified.
- R2 setup.
- Stripe setup.
- Contact/subscriber storage.
- Ebook/audio delivery workflow.
- POD integration.
