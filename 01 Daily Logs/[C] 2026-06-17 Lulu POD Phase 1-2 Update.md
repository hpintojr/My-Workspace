---
type: daily-log
date: 2026-06-17
projects:
  - Benny & Penny's Adventures
updated_by: ChatGPT
---

# Daily Log — LuLu POD Phase 1–2 Update — 2026-06-17

## Summary

Hamilton continued the LuLu print-on-demand build for Benny & Penny's Adventures.

The site is still being treated as a controlled working environment:

```txt
Stay on main branch.
Production deployment is being used for controlled testing.
The site is not live for public order traffic yet.
Stripe remains sandbox/test mode until further notice.
LuLu remains sandbox/testing until further notice.
```

---

## Phase 1 — Internal Print Job Queue

Status:

```txt
Working / confirmed by Hamilton
```

Implemented in website repo:

```txt
hpintojr/bennyandpennyadventures
```

Key changes:

```txt
collections/PrintJobs.ts
payload.config.ts
lib/luluPrintJobs.ts
lib/stripeFulfillment.ts
```

What works now:

- Paperback/hardcover Stripe sandbox orders create internal Payload `print-jobs` records.
- Digital and audiobook items stay out of the print-job queue.
- Shipping snapshot is copied into the print-job record.
- Print jobs start as `draft` unless all required print-ready setup exists.
- LuLu API is not called yet.
- Print Jobs now appears under the Catalog sidebar section below Media.

Confirmed order/test:

```txt
Order 26-0024 created a Hardcover print job.
Print record 1 opened successfully after schema patch.
Hamilton confirmed everything is in the print record.
```

---

## Neon Schema Patches Applied

Neon project:

```txt
Benny & Penny's Adventures
Database: neondb
```

Applied patches:

- Created missing `print_jobs` table.
- Added `payload_locked_documents_rels.print_jobs_id` so individual print-job records open in Payload Admin.
- Added book print setup columns to `books`:
  - `lulu_project_id`
  - `lulu_paperback_sku`
  - `lulu_hardcover_sku`
  - `trim_size`
  - `print_interior_file_key`
  - `print_cover_file_key`
  - `paperback_print_ready`
  - `hardcover_print_ready`
  - `print_notes`

Important note:

```txt
Do not assume Payload auto-push will create every new table/field in Neon. Verify schema after new collections/fields are added.
```

---

## Phase 2 — Book Print Setup Fields

Status:

```txt
Implemented in code and patched in Neon.
```

Added to `collections/Books.ts`:

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

Readiness logic updated in `lib/luluPrintJobs.ts`.

A new print job only becomes `ready` when all of these are present:

```txt
shipping address complete
matching book marked paperback/hardcover print ready
LuLu project ID exists
matching LuLu SKU exists
trim size exists
print interior file key or URL exists
print cover file key or URL exists
```

Otherwise it remains:

```txt
Draft
```

and the print-job notes explain what is missing.

---

## Important Commits in Website Repo

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

## Next Step

Proceed to the manual LuLu submission layer.

Recommended next build:

```txt
Phase 3 — LuLu API client + manual Submit to LuLu action
```

Build order:

1. Add LuLu config helper that reads env vars only.
2. Add LuLu auth/token helper.
3. Add manual admin/API submit route for one print job.
4. Validate print job status is `ready` before submit.
5. Build LuLu payload from frozen print-job + book setup data.
6. Submit to LuLu sandbox/test environment only.
7. Save LuLu response, IDs, and errors back to `print-jobs`.
8. Keep auto-submit disabled.

---

## Customer Experience Reminder

After LuLu submission/tracking works, update the customer experience:

- Portal order detail should show print status and tracking.
- Thank-you page should explain physical book fulfillment.
- Receipt email should explain print timing.
- Add tracking/shipment email once LuLu tracking is available.
