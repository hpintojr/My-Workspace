---
type: project-plan
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
---

# LuLu Print-on-Demand Plan

## Goal

Build a safe LuLu print-on-demand foundation for Benny & Penny's Adventures.

The workflow must support paperback and hardcover purchases, internal admin tracking, LuLu sandbox submission, status updates, tracking, and later customer-facing delivery visibility.

---

## Current Website Repo

```txt
hpintojr/bennyandpennyadventures
```

---

## Branch and Environment Rule

Hamilton confirmed the working rule for this project:

```txt
Stay on main branch.
Use the production deployment as the controlled working environment.
The site is not live for public order traffic yet.
Stripe remains in sandbox/test mode until further notice.
LuLu should also be treated as sandbox/testing until Hamilton confirms otherwise.
```

Do not create feature branches unless Hamilton explicitly asks.

Even though production deployment is being used, do not assume public-live commerce behavior yet.

---

## Current Status — 2026-06-17

```txt
Phase 1: Complete / confirmed working.
Phase 2: Implemented / Neon patched / ready for book data entry.
Next: Phase 3 manual Submit to LuLu route/action.
Auto-submit remains disabled.
```

Confirmed test:

```txt
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after Neon lock-table patch.
Shipping copied into print job.
LuLu API was not called.
```

---

## Phase 1 — Internal Print Job Queue

Status:

```txt
Complete / working
```

Implemented files:

```txt
collections/PrintJobs.ts
payload.config.ts
lib/luluPrintJobs.ts
lib/stripeFulfillment.ts
```

Behavior now working:

```txt
Stripe order paid
-> orders record created
-> order-items records created
-> paperback/hardcover items create print-jobs records
-> admin can review print jobs before LuLu submission
```

Print-job fields include:

```txt
order
orderItem
book
provider
format
quantity
status
customerName
customerEmail
shippingName
shippingLine1
shippingLine2
shippingCity
shippingState
shippingPostalCode
shippingCountry
luluPrintJobId
luluLineItemId
trackingNumber
trackingUrl
rawRequest
rawResponse
errorMessage
submittedAt
acceptedAt
shippedAt
deliveredAt
notes
```

Admin placement:

```txt
Catalog
  Books
  Media
  Print Jobs
```

---

## Phase 1 Neon Patches Applied

Because Payload did not automatically create every schema object, Neon was patched directly.

Neon project:

```txt
Benny & Penny's Adventures
Database: neondb
```

Patches applied:

```txt
print_jobs table created
payload_locked_documents_rels.print_jobs_id added
```

Why the second patch mattered:

```txt
The print-jobs list page worked, but individual record pages were blank.
Payload detail pages query payload_locked_documents_rels for document locks.
That lock table was missing print_jobs_id.
Adding the column fixed the print-job record detail page.
```

Schema rule going forward:

```txt
After adding a new collection or fields, verify Neon directly.
Do not assume Payload auto-push completed the full schema.
```

---

## Phase 2 — Add Print Specs to Books

Status:

```txt
Implemented in code and patched in Neon.
```

Implemented file:

```txt
collections/Books.ts
```

Book fields added:

```txt
luluProjectId
luluPaperbackSku
luluHardcoverSku
trimSize
printInteriorFileKey
printCoverFileKey
paperbackPrintReady
hardcoverPrintReady
printNotes
```

Matching Neon columns added:

```txt
lulu_project_id
lulu_paperback_sku
lulu_hardcover_sku
trim_size
print_interior_file_key
print_cover_file_key
paperback_print_ready
hardcover_print_ready
print_notes
```

---

## Print Job Readiness Logic

Implemented in:

```txt
lib/luluPrintJobs.ts
```

A new print job only becomes:

```txt
ready
```

when all requirements are met:

```txt
shipping address complete
matching book marked paperback/hardcover print ready
LuLu project ID exists
matching LuLu SKU exists
trim size exists
print interior file key or URL exists
print cover file key or URL exists
```

Otherwise the print job remains:

```txt
draft
```

and the notes explain what setup is missing.

---

## Important Website Commits

```txt
bd17cc82cbe2a9fef11b2b2594efb4ebcc329275
Add print jobs collection

fc7cb041a3dc632d62e34f59e8d716c0b7319723
Register print jobs collection

c1a82ef0eaa0d9186206780ad21d67f1d08cee07
Add dry-run Lulu print job generator

fcd736ce2c21361151a2136a6b51a6d3822bf024
Create dry-run print jobs after checkout

83038534b4da78352d8019ce9132fd396af69e57
Allow Payload to create print jobs table

60e457680af79a39b879aa5852f4e827aca42318
Support print jobs sidebar active state

a9383a2e68023a42db5dd7520004797147c5fb56
Add print jobs under catalog sidebar

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books

60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status
```

---

## Phase 3 — Manual Submit to LuLu

Status:

```txt
Next active build
```

Goal:

```txt
Admin reviews a ready print job and manually submits it to LuLu sandbox/test API.
```

Recommended implementation order:

```txt
1. Add LuLu config helper that reads env vars only.
2. Add LuLu auth/token helper.
3. Add manual API route/action for one print job.
4. Validate print job status is ready before submission.
5. Build LuLu request payload from frozen print-job + book setup data.
6. Submit to LuLu sandbox/test endpoint.
7. Save raw request/response, LuLu IDs, and errors to print-jobs.
8. Change status to submitted/accepted/error as appropriate.
9. Keep LULU_AUTO_SUBMIT=false.
```

Environment variables already discussed:

```txt
LULU_CLIENT_KEY
LULU_CLIENT_SECRET
LULU_BASIC_AUTH
LULU_BASE_URL
LULU_AUTO_SUBMIT=false
LULU_WEBHOOK_SECRET later
```

Do not commit real values.

---

## Phase 4 — Optional Auto Submit

Status:

```txt
Deferred
```

Only after manual submission is proven should automation be enabled.

Suggested environment flag:

```txt
LULU_AUTO_SUBMIT=false
```

When proven safe in controlled testing:

```txt
LULU_AUTO_SUBMIT=true
```

Behavior later:

```txt
Paid checkout -> print job created -> if ready and auto-submit enabled -> submit to LuLu automatically.
```

---

## Phase 5 — Customer Experience Update for Physical Delivery

Status:

```txt
Deferred until LuLu status/tracking exists.
```

Reason:

```txt
Print-on-demand adds shipping, tracking, delivery status, and fulfillment transparency.
The customer experience should be updated after LuLu tracking/status data exists.
```

Customer-facing improvements to plan:

- Order detail pages should clearly separate digital access from physical book delivery.
- Physical items should show print status, shipment status, tracking number, and tracking link when available.
- Customer portal order history should show simple status labels such as:
  - Order received
  - Preparing print order
  - Sent to printer
  - In production
  - Shipped
  - Delivered
- Thank-you page should tell the customer what happens next for print books.
- Order receipt emails should mention print fulfillment timing and future tracking email/portal updates.
- A shipment/tracking email should be added after LuLu tracking is received.
- Customer support messaging should make it easy to reference the order number and tracking status.

---

## Guardrails

- Stay on `main` unless Hamilton explicitly asks otherwise.
- Do not commit secrets, credentials, API keys, or raw env values.
- Keep `LULU_AUTO_SUBMIT=false` until manual submission is proven.
- Use the controlled production deployment, but do not assume public-live commerce.
- Treat Stripe as sandbox/test mode until further notice.
- Treat LuLu as sandbox/test mode until further notice.
- Do not block checkout if print-job creation fails.
- Keep digital/audiobook delivery separate from print fulfillment.
- Verify Neon schema after adding collections/fields.

---

## Next Step

Begin Phase 3 in `hpintojr/bennyandpennyadventures` on the `main` branch:

```txt
Build LuLu API client + manual Submit to LuLu action for ready print jobs.
```
