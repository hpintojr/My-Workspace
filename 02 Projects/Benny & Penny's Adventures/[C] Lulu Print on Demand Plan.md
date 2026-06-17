---
type: project-plan
project: Benny & Penny's Adventures
status: paused-pending-research
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

```txt
Stay on main branch.
Use the production deployment as the controlled working environment.
The site is not live for public order traffic yet.
Stripe remains in sandbox/test mode until further notice.
LuLu remains sandbox/testing until Hamilton confirms otherwise.
```

---

## Current Status — 2026-06-17

```txt
Phase 1: Internal print-job queue complete / confirmed working.
Phase 2: Book print setup fields implemented / Neon patched.
Phase 3: Backend submit route and admin submit page/link deployed.
Current state: LuLu testing paused.
Next LuLu work: research official project/template/output setup before sandbox submission.
Auto-submit remains disabled.
```

Confirmed:

```txt
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after Neon lock-table patch.
Shipping copied into print job.
Geoapify appears in Admin Dashboard System Status Check.
LuLu backend route deployed.
Admin Submit to LuLu page/link deployed.
```

---

## Hamilton's Open LuLu Questions

Hamilton still needs to create LuLu project folders/projects for the 9-book series.

Open questions:

```txt
Do we need one LuLu project per book or one project per book per format?
If paperback and hardcover use the same trim/output size, does LuLu still require separate setup?
For 9 books, is the correct setup 9 projects or 18 projects?
How should final drafts be uploaded?
What exact PDF format, bleed, margins, cover specs, and template are required?
Does LuLu provide downloadable templates for the selected trim size?
What is the correct Canva export process for Books 1-4?
```

Current production note:

```txt
Books 1-4 are nearly assembled in Canva.
Do not upload or submit until official LuLu print-ready PDF requirements are confirmed.
```

---

## Research Needed Before Next LuLu Build

Before sandbox submission, research official LuLu documentation and create a repeatable plan for all 9 books.

Research checklist:

- LuLu project structure: one project per book vs per format.
- Paperback vs hardcover package/SKU requirements.
- Trim size and whether paperback/hardcover can share files.
- Interior PDF specs.
- Cover PDF specs.
- Bleed and safe-area requirements.
- Template availability for the chosen trim size.
- Canva export settings for print-ready PDF.
- Whether file URLs must be public, temporary signed URLs, or uploaded directly to LuLu.

---

## Implemented Website Pieces

Implemented files:

```txt
collections/PrintJobs.ts
collections/Books.ts
lib/luluPrintJobs.ts
lib/luluApi.ts
app/api/admin/print-jobs/[id]/submit-lulu/route.ts
app/(payload)/admin/lulu-submit/page.tsx
```

Important website commits:

```txt
9268413354faac6f3a76b1aa44960a6711614fa7
Add Lulu submit link to admin sidebar

3d3d43ddbaab2d4cf0c791432784bc7d9fe9b554
Allow admin session for Lulu submit route

166768e5007ac21e29bd08b58423a73d81ecd1c7
Add manual Lulu submit route

bacd0891ac3ece58e5ce6eafc5f06ffdf5c4312a
Add Lulu API submit helper

60629f4fe74618fed9a94fb700c923215db1c977
Require Lulu print setup before ready status

de086edb7fcaa72be91bb903c8ce6df73b2654b6
Add Lulu print setup fields to books
```

---

## Phase 1 — Internal Print Job Queue

Status:

```txt
Complete / working
```

Working behavior:

```txt
Stripe order paid
-> orders record created
-> order-items records created
-> paperback/hardcover items create print-jobs records
-> admin can review print jobs before LuLu submission
```

Print-job fields include order, order item, book, provider, format, quantity, status, customer/shipping snapshot, LuLu IDs, tracking fields, raw request/response, error, timestamps, and notes.

---

## Phase 2 — Book Print Setup

Status:

```txt
Implemented in code and patched in Neon.
```

Book fields:

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

A print job only becomes ready when shipping and required book print setup are complete. Otherwise it stays draft with setup notes.

---

## Phase 3 — Manual Submit to LuLu

Status:

```txt
Backend foundation and admin submit page/link are deployed.
Testing is paused.
```

Current behavior:

```txt
Admin reviews ready print jobs.
Admin can manually submit to LuLu from the admin submit page.
Submit route validates job readiness and book setup.
Auto-submit remains disabled.
```

Important blocker before testing:

```txt
Confirm print interior/cover file handling.
If values are private R2 object keys, LuLu will not be able to fetch them directly.
Need official LuLu file upload/fetch requirements before sandbox submission.
```

---

## Deferred Phases

### Phase 4 — Status and Tracking

Deferred until manual sandbox submit is proven.

Need later:

```txt
tracking number
tracking URL
shipment status
accepted/shipped/delivered timestamps
webhook or polling strategy
```

### Phase 5 — Optional Auto Submit

Deferred.

```txt
Keep automatic submit off until manual submission, file handling, and tracking are proven.
```

### Phase 6 — Customer Experience Update for Physical Delivery

Deferred until LuLu status/tracking exists.

Customer portal should later show:

- Order received.
- Preparing print order.
- Sent to printer.
- In production.
- Shipped.
- Delivered.
- Tracking number/link when available.

---

## Guardrails

- Stay on `main` unless Hamilton explicitly asks otherwise.
- Do not commit secrets, credentials, API keys, or raw env values.
- Keep auto-submit disabled until manual submission is proven.
- Use the controlled production deployment, but do not assume public-live commerce.
- Treat Stripe as sandbox/test mode until further notice.
- Treat LuLu as sandbox/test mode until further notice.
- Do not block checkout if print-job creation fails.
- Keep digital/audiobook delivery separate from print fulfillment.
- Verify Neon schema after adding collections/fields.

---

## Next LuLu Step

```txt
Research official LuLu project/template/output requirements and create a repeatable 9-book setup plan before sandbox submission.
```
