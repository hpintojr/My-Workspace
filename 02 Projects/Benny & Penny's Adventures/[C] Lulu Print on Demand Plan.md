---
type: project-plan
project: Benny & Penny's Adventures
status: planned
updated_by: ChatGPT
---

# LuLu Print-on-Demand Plan

## Goal

Build a safe LuLu print-on-demand foundation for Benny & Penny's Adventures.

The immediate goal is **not** to send live print orders yet. The first step is to create an internal, admin-visible POD queue so paperback and hardcover purchases can be tracked safely after Stripe checkout.

This will also set up the next customer-experience improvement phase, because physical book delivery introduces tracking, delivery status, and clearer customer communication needs.

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

## Current Repo State

The app already has the right checkout and fulfillment foundation:

- Stripe Checkout supports cart items and payment.
- Checkout can detect when cart items require shipping.
- Stripe Checkout collects shipping details for physical products.
- Successful checkout creates Payload `orders` records.
- Successful checkout creates Payload `order-items` records.
- Existing formats already include:
  - `digital`
  - `audiobook`
  - `paperback`
  - `hardcover`
- Digital and audiobook purchases already have a protected R2 delivery direction.

Missing feature:

```txt
POD/LuLu print fulfillment automation
```

---

## Safe Build Strategy

Build in phases.

Do **not** start with automatic live LuLu ordering. Start with an internal print-job queue and admin review workflow.

---

## Phase 1 — Internal Print Job Queue

Add a new Payload collection:

```txt
collections/PrintJobs.ts
```

Register it in:

```txt
payload.config.ts
```

Suggested collection slug:

```txt
print-jobs
```

Suggested labels:

```txt
Print Job
Print Jobs
```

Suggested admin columns:

```txt
order
orderItem
book
format
quantity
status
provider
luluPrintJobId
createdAt
```

Suggested fields:

```txt
order                  relationship -> orders, required
orderItem              relationship -> order-items
book                   relationship -> books
provider               select: lulu, default lulu
format                 select: paperback | hardcover, required
quantity               number, required
status                 select: draft | ready | submitted | accepted | rejected | shipped | delivered | canceled | error
customerName           text
customerEmail          email
shippingName           text
shippingLine1          text
shippingLine2          text
shippingCity           text
shippingState          text
shippingPostalCode     text
shippingCountry        text
luluPrintJobId         text
luluLineItemId         text
trackingNumber         text
trackingUrl            text
rawRequest             json or textarea
rawResponse            json or textarea
errorMessage           textarea
submittedAt            date
acceptedAt             date
shippedAt              date
deliveredAt            date
notes                  textarea
```

Purpose:

```txt
Stripe order paid -> order-items created -> paperback/hardcover items create print-jobs records -> admin can review before LuLu submission.
```

---

## Phase 2 — Add Print Specs to Books

The `books` collection currently has pricing, Stripe IDs, public cover paths, and R2 digital object keys. It needs print production metadata.

Add fields to `collections/Books.ts`:

```txt
luluProjectId
luluPaperbackSku
luluHardcoverSku
trimSize
printInteriorFileKey or printInteriorFileUrl
printCoverFileKey or printCoverFileUrl
paperbackPrintReady
hardcoverPrintReady
printNotes
```

Recommended safe approach:

- Use booleans for `paperbackPrintReady` and `hardcoverPrintReady`.
- Only create LuLu-ready jobs when the matching format is marked print-ready.
- Keep actual credentials and API values in environment variables only.

---

## Phase 3 — Generate Print Jobs After Checkout

Add a new helper:

```txt
lib/luluPrintJobs.ts
```

Suggested exported function:

```ts
createPrintJobsForOrder(payload, order, items)
```

Behavior:

- Runs after order-items are created in `lib/stripeFulfillment.ts`.
- Only handles `paperback` and `hardcover` formats.
- Skips `digital` and `audiobook` because those stay in the R2 digital delivery flow.
- Uses order shipping fields as a frozen shipping snapshot.
- Creates `print-jobs` records with status `draft` or `ready`.
- Does not call the LuLu API yet.

Suggested status logic:

```txt
If book has matching LuLu/print-ready data -> ready
If missing print data or shipping data -> draft
```

---

## Phase 4 — Admin Review and Manual Submit

After the queue exists, add an admin action/button or admin route:

```txt
Submit to LuLu
```

Flow:

```txt
Admin reviews print job
-> clicks Submit to LuLu
-> app validates shipping + book print specs
-> app builds LuLu payload
-> app calls LuLu API
-> app stores raw request/response
-> print job status changes to submitted/accepted/error
```

This is safer than immediate automatic ordering because it prevents accidental live print costs while the integration is still being tested.

---

## Phase 5 — Optional Auto Submit

Only after manual submission is proven should automation be enabled.

Suggested environment flag:

```txt
LULU_AUTO_SUBMIT=false
```

When ready:

```txt
LULU_AUTO_SUBMIT=true
```

Behavior:

```txt
Paid checkout -> print job created -> if ready and auto-submit enabled -> submit to LuLu automatically.
```

---

## Phase 6 — Customer Experience Update for Physical Delivery

After the LuLu POD queue and submission flow are stable, update the customer experience around physical book delivery.

Reason:

```txt
Print-on-demand adds shipping, tracking, delivery status, and fulfillment transparency. The current customer experience should be improved after tracking data exists.
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

Recommended implementation order:

```txt
1. Add tracking/status fields to print-jobs.
2. Surface print job status in admin.
3. Surface physical delivery status in /portal/orders.
4. Update thank-you page messaging for mixed carts.
5. Update order receipt email copy for print items.
6. Add shipment/tracking email once LuLu tracking webhooks or polling are available.
```

Do this after LuLu API setup, because the customer experience should be based on the actual tracking/status data returned by LuLu.

---

## Environment Variables Needed Later

Do not commit real values.

Likely variables:

```txt
LULU_CLIENT_KEY
LULU_CLIENT_SECRET
LULU_BASE_URL
LULU_AUTO_SUBMIT
LULU_WEBHOOK_SECRET
```

Use sandbox/test API settings first if available.

---

## First Coding Task

Implement Phase 1 only:

1. Create `collections/PrintJobs.ts`.
2. Register `PrintJobs` in `payload.config.ts`.
3. Create `lib/luluPrintJobs.ts` with a dry-run print-job generator.
4. Hook it into `fulfillCheckoutSession()` after `order-items` are created.
5. Confirm the admin dashboard can see generated print jobs.
6. Do not submit anything to LuLu yet.

---

## Guardrails

- Do not call the live LuLu API in Phase 1.
- Do not store LuLu credentials in the repo.
- Do not expose print file URLs publicly if they are private production files.
- Do not block successful checkout if print-job creation fails; log error and leave order intact.
- Keep digital/audiobook fulfillment separate from print fulfillment.
- Build admin-visible state before automation.
- Defer customer experience changes until tracking/status data exists from the LuLu integration.
- Stay on the `main` branch unless Hamilton explicitly requests otherwise.
- Treat Stripe as sandbox/test mode until further notice.
- Treat LuLu as sandbox/test mode until further notice.

---

## Acceptance Criteria for Phase 1

A test Stripe checkout with a paperback or hardcover item should:

1. Create an `orders` record.
2. Create matching `order-items` records.
3. Create one or more `print-jobs` records for physical formats only.
4. Copy shipping details into the print-job snapshot.
5. Leave digital/audiobook items out of the print-job queue.
6. Not call LuLu yet.
7. Not break checkout if print-job creation fails.

---

## Next Step

Begin Phase 1 implementation in `hpintojr/bennyandpennyadventures` on the `main` branch.
