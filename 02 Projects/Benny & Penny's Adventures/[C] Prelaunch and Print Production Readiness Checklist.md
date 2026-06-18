---
type: launch-readiness-checklist
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-18
source_assessments:
  - [C] Backlog & Launch Checklist.md
  - [C] Website Build Plan & Architecture.md
  - [C] Customer Experience Portal Revamp Roadmap & Assessment.md
  - [C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
---

# Benny & Penny's Adventures — Prelaunch and Print Production Readiness Checklist

## Purpose

This is the current launch-readiness checklist for the website and the next print-production phase. It reconciles the earlier assessment/checklist files with the current code and verified operational tests as of June 18, 2026.

Use this document as the decision gate before accepting real customer orders or starting LuLu production submission.

---

## Assessment Reconciliation

### Now complete or materially verified since the earlier assessments

- [x] Customer Portal v2: dashboard, library, orders, gifting, addresses, account, help, shipment timeline, and printable invoice.
- [x] Admin sidebar/theme and core admin workflow are live.
- [x] Google Places API (New) works in customer and admin address entry; Geoapify is retired.
- [x] Stripe saved-address prefill and name/address guard are deployed.
- [x] R2 signed digital delivery, downloads/media creation, and readable-slot controls work in testing.
- [x] Gift redemption is session-aware and gift-only books appear in the Library.
- [x] Email authentication DNS is verified: DKIM, SPF, SES feedback/inbound MX, DMARC p=none.
- [x] Guest cart tracking and checkout state progression work.
- [x] Paid-order conversion safety includes thank-you, webhook fallback code, and verified Neon paid-order trigger.
- [x] Timed cart abandonment, consent capture, Sequenzy tagging, recovery links, unsubscribe route, recovery reporting, and attribution schema are built.
- [x] Manual email-safe cart test passed.
- [x] Controlled recovery reminder reached Gmail through Sequenzy.
- [x] Recovery-email mobile layout approved; final desktop CTA heart is Gmail-safe.
- [x] Dashboard range control now changes chart/KPIs/funnel together while Recent Orders and Community Growth remain global latest-first waterfall lists.

### Earlier checklist items that are stale and should not be treated as open build work

- [x] “Start Client Portal foundation” is obsolete: Portal v2 is already built.
- [x] “Set up R2 and build signed delivery” is obsolete as a foundation task: delivery is validated in testing.
- [x] “Build timed abandonment / conversion fallback” is obsolete as a foundation task: both are built and tested.
- [x] “Google Places live verification” is complete.
- [x] “Stripe name prefill/guard” is complete enough for launch testing.

### Open items that remain real launch or product-production work

- [ ] Finalize actual Books 1–4 production assets and content.
- [ ] Replace placeholder catalog art, previews, thumbnails, and R2 files.
- [ ] Complete recovery-link restore, unsubscribe/suppression, recovered-purchase, coupon, and BPG attribution tests.
- [ ] Finalize gifted-access policy and update Terms/Privacy accordingly.
- [ ] Freeze/validate all setup/debug exposure and production environment secrets.
- [ ] Complete business/legal/live-payment readiness.
- [ ] Complete LuLu specifications, production proofs, and fulfillment testing.

---

# A. Immediate Technical Verification

## A1. Dashboard Range Reporting

- [x] Added date options:
  - Today
  - Yesterday
  - Last 3 days
  - Last 7 days
  - Last 14 days
  - Last 30 days
  - Last 60 days
  - Last 90 days
  - Month to date
  - Last month
  - Year to date
  - This Past Year
- [x] Period change updates Performance Tracker, Total Revenue, Orders, Items Sold, Subscribers, and Launch Funnel together.
- [x] Recent Orders remains latest-first and does not become range-filtered.
- [x] Community Growth remains latest-first and does not become range-filtered.
- [ ] Manually verify 3–4 date options in production after hard refresh.
- [ ] Confirm the selected period produces expected zero/non-zero data from real records.

## A2. Cart Recovery End-to-End

- [x] Email-safe status transition verified: Checkout Started → Abandoned → Recovery Eligible? Yes → Eligible.
- [x] Sequenzy abandonment tags are written back to cart audit fields.
- [x] Controlled reminder delivery reached Gmail.
- [x] Recovery email visual treatment approved.
- [ ] Click Return to my cart in controlled email and verify the item and cart token restore in storefront.
- [ ] Complete a purchase from a restored cart.
- [ ] Verify cart captures Recovered Order Number and Recovered Revenue.
- [ ] Click Stop cart reminders in a controlled email.
- [ ] Verify subscriber/cart suppression and prove a subsequent reminder is blocked.
- [ ] Confirm `CART_RECOVERY_SEND_ENABLED=false` unless intentionally beginning live reminder delivery.

## A3. Attribution

- [x] Orders table supports coupon code, gift code, BPG code, recovered-cart marker, and source-cart relationship.
- [ ] Run a paid test using `Welcome10`.
- [ ] Verify Order coupon field and Sequenzy `coupon-user` attribution.
- [ ] Run controlled BPG flow using `BPG525`.
- [ ] Verify Order BPG fields and Sequenzy `bpg-gift-code-user` attribution.
- [ ] Verify gift sender and gift recipient attribution for a real end-to-end gift redemption.

---

# B. Product and Digital Delivery Release Gate

## B1. Product Catalog Assets

- [ ] Replace placeholder cover image for each launched book.
- [ ] Replace placeholder page-preview images.
- [ ] Replace placeholder cart thumbnail for each format.
- [ ] Verify title, subtitle, age range, topic, description, price, format availability, and product copy against final books.
- [ ] Verify each Book record has correct final R2 keys.
- [ ] Verify each Stripe Price/Lookup configuration maps to the right book and format.

## B2. Digital Files

- [ ] Upload real final PDF for each launched book.
- [ ] Upload real final EPUB for each launched book.
- [ ] Upload real final audiobook only where that format will be sold.
- [ ] Replace dummy/zero-byte files in R2.
- [ ] Test a paid purchase for each final digital format.
- [ ] Verify Library shows only formats actually purchased or granted.
- [ ] Verify signed links expire, then reissue properly from Library.
- [ ] Verify readable-slot behavior against the final license policy.

## B3. License and Gift Rules

Current intended rule:

```txt
One paid readable license = 3 total slots across PDF, EPUB, and BPG gifts.
A BPG/gift recipient receives the decided download/device allowance.
```

- [ ] Decide whether recipient re-download allowance remains 1 or increases.
- [ ] Confirm every gift action consumes the correct owner slot.
- [ ] Confirm failed/expired redemption does not consume a slot.
- [ ] Confirm Terms reflect final license, gifting, and redistribution rule.
- [ ] Confirm Library labels explain gift-only access clearly.

---

# C. Commerce and Customer Workflow Gate

## C1. Checkout

- [ ] Test guest checkout using a new email.
- [ ] Test signed-in checkout with saved address.
- [ ] Test billing/shipping address behavior for a physical item.
- [ ] Test digital-only checkout with no unnecessary shipping requirement.
- [ ] Verify Stripe name/address prefill and review-note guard in the live-like flow.
- [ ] Test payment success, cancel, retry, and failed payment behavior.
- [ ] Confirm order number, item rows, totals, discount, tax, shipping, and customer record are correct.

## C2. Post-Purchase

- [ ] Verify order confirmation/fulfillment email is received and accurate.
- [ ] Verify thank-you page after paid checkout.
- [ ] Verify browser-closed scenario still creates/fulfills paid order correctly.
- [ ] Verify portal order record and invoice.
- [ ] Verify downloadable purchases appear in Library.
- [ ] Verify gift order workflow and recipient email.
- [ ] Verify support ticket creation from portal.

---

# D. Security, Admin, and Operations Gate

## D1. Production Route and Secret Hygiene

- [ ] Confirm `ALLOW_SETUP_ROUTES` is absent or not `true` in Production.
- [ ] Confirm all setup/debug routes return 404 in Production.
- [ ] Rotate `PAYLOAD_SETUP_SECRET` after all legacy setup work is permanently finished.
- [ ] Decide whether to remove setup/debug route files entirely after final database reset and migration freeze.
- [ ] Confirm `CRON_SECRET`, recovery token secret, and unsubscribe secret are unique, private, and never committed.
- [ ] Confirm Production/Preview environment values intentionally differ where appropriate.

## D2. Access and Privacy

- [x] Admin-only collection helpers and customer-ownership restrictions are present in code.
- [ ] Test a real customer account cannot read another customer’s order, download, address, gift, or support data.
- [ ] Test unauthenticated visitor cannot access portal/API data.
- [ ] Review public API routes for data-return minimization before launch.
- [ ] Confirm Privacy Policy lists final providers actually used: Stripe, Neon, Vercel, Cloudflare R2, Google Places, Sequenzy, and LuLu when enabled.
- [ ] Add final legal language for cart reminders, unsubscribe behavior, digital access limits, gifts, BPG, and print fulfillment.
- [ ] Obtain attorney review before live campaigns/scale payments.

## D3. Security Headers and Operational Caveats

- [x] Baseline HSTS, nosniff, frame, referrer, permissions, and DNS-prefetch headers are present.
- [x] Admin-specific CSP is present.
- [ ] Consider public-site CSP only after confirming third-party image/email/analytics requirements.
- [ ] Treat dashboard System Status as an operational indicator, not a full external-service health monitor; it currently derives some statuses from successful Payload data reads/config presence.
- [ ] Resolve the PostgreSQL SSL connection-string compatibility warning before the next major dependency upgrade. Do not change working production database settings casually.

---

# E. Business and Legal Gate

- [ ] Confirm legal business name/DBA as needed.
- [ ] Confirm business bank account and bookkeeping workflow.
- [ ] Confirm Stripe live account, payout bank, statement descriptor, tax settings, and dispute contact flow.
- [ ] Add a valid business mailing address/PO Box to marketing email footer before campaigns.
- [ ] Confirm sender domain, reply-to inbox, bounce handling, and support inbox process.
- [ ] Define sales tax approach for physical vs digital products with CPA/tax advice.
- [ ] Confirm refund, cancellation, damaged-book, and support policies.
- [ ] Keep DMARC at current monitoring policy until real sending is stable; tighten later only after review.

---

# F. Print Production — Books 1–4 First

## F1. Lock Book Production Specifications

For each book, decide and document:

- [ ] Final trim size.
- [ ] Paperback, hardcover, or both.
- [ ] Interior color mode and paper choice.
- [ ] Page count after final layout.
- [ ] Bleed/no-bleed requirement.
- [ ] Safe margins, gutter, and barcode area.
- [ ] ISBN/imprint decision.
- [ ] Final retail price and print margin.

## F2. Final Interior Files

- [ ] Freeze final manuscript and illustration sequence.
- [ ] Verify all text proofreads cleanly.
- [ ] Verify page numbering/front matter/end matter.
- [ ] Verify image resolution at final print size.
- [ ] Export print-ready PDF from Canva using final LuLu template/specification.
- [ ] Run preflight for embedded fonts, trim, bleed, image resolution, blank pages, and crop marks.
- [ ] Save versioned source and final PDF in controlled production folders.

## F3. Final Covers

- [ ] Obtain final LuLu cover template after trim/page count/paper/binding are locked.
- [ ] Build full wrap cover: back, spine, front.
- [ ] Confirm spine width from final page count/template.
- [ ] Maintain barcode safe area.
- [ ] Export final cover PDF to exact template dimensions.
- [ ] Proof cover at 100% scale for text, contrast, spine, and safe areas.

## F4. LuLu Setup and Proofing

- [ ] Research current official LuLu project requirements for paperback/hardcover projects.
- [ ] Decide whether each title/format requires separate LuLu project configuration.
- [ ] Create consistent folder/project naming for all 9 titles.
- [ ] Set up Books 1–4 first before expanding to 5–9.
- [ ] Upload interior and cover to sandbox/test environment.
- [ ] Review LuLu automated preflight feedback.
- [ ] Order/inspect physical proof copies.
- [ ] Record corrections and approve final print master.
- [ ] Test order payload, status sync, shipment tracking, cancellation/refund process, and customer communication.

---

# Final Go / No-Go Decision

## Do not activate general public paid launch until all applicable gates are complete

```txt
Digital product assets/files are final.
Checkout, delivery, recovery, gifts, and support have end-to-end tests.
Live payment/business/legal details are ready.
Recovery email switch is intentionally set.
Debug/setup exposure is closed.
Terms/Privacy reflect actual operations.
Print titles have completed preflight/proof cycle before being sold as print products.
```

## Recommended Immediate Sequence

```txt
1. Verify dashboard period selector in production.
2. Finish cart recovery restore/unsubscribe/recovered-order tests.
3. Finish Welcome10 and BPG525 attribution tests.
4. Begin Books 1–4 asset replacement and final R2 uploads.
5. Lock the gift/download rule and update Terms/Privacy.
6. Begin print specification + LuLu template research before final Canva exports.
```
