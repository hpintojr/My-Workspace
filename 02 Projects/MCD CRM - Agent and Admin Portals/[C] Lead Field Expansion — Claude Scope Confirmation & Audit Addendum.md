# [C] Lead Field Expansion — Claude Scope Confirmation & Audit Addendum

*Read-only advisory pass by Claude (lock held by ChatGPT). Companion to `[G] Lead Field Expansion and Owner-Only Provenance Implementation Handoff.md`. Confirms scope and adds engineering merge gates before ChatGPT implements. 2026-07-07.*

## Are we still on task? YES.
North-star scope unchanged: secure MiniCRM (Agent + Admin portals, GHL backend-only, MiniCRM system of record) → Phase D lead import (DONE, in production at d25ac9f) → first supervised import. This lead-field-expansion is NOT scope drift — it is a correctly-sequenced **pre-import prerequisite**: the first real CSV (`Raw_Leads.csv`) carries Business Address, Google Rating, and Google Maps Link, which the current import contract does not support. Properly gated. Confirmed and logged as an intentional scope addition per the Operating Protocol.

## Acquisition basis — RESOLVED by Hamilton (2026-07-07)
The list was **purchased from rawleads.org**, a lead-data provider. That is **licensed provider data**, which is explicitly on the permitted-inputs list — not scraped, not directory-harvested by us. The Google Maps links exist so Hamilton and his sales agents can **manually review a business's public reviews (especially negatives)** to pitch **reputation management as part of a social-media upsell**. That is permitted manual human research. No ToS blocker. Action: record `rawleads.org` as the documented acquisition basis inside the owner-only provenance record (that is exactly what the `OP_ACQ_072026_001` reference is for). The standing "no scraping adapters" rule is unaffected — nothing here scrapes.

## The spec is accepted. It is strong.
Separate `OwnerLeadAcquisitionProvenance` (1:1 with LeadImportBatch, OWNER-only, server-enforced, excluded from all review/audit/log projections); correctly refuses to overload shared `originalSource`/`sourceDetail`; additive nullable columns; numeric rating validation that reviews/rejects rather than coercing; Maps URL mapped to a new first-class field (not `sourceRecordUrl`); server-side (not CSS) role enforcement with authz tests; 12 acceptance tests; hard production gate. PR #32's route-collision guard + CI + production-safe DB test guard now protect this change automatically.

## Engineering gates ChatGPT should add before merge

1. **Maps URL is a stored link, never server-ingested content.** Keep `googleMapsUrl` a clickable hyperlink the agent opens manually to view public reviews. The app must never fetch or render Google Maps content server-side. This keeps the reputation-management research firmly on the permitted manual-human side and avoids any API/ToS entanglement.

2. **Timestamp the rating; use `Decimal(2,1)` not `Float`.** A vendor-supplied star rating changes over time; a cached number with no date becomes misleading in a reputation-management pitch. Add `googleRatingObservedAt` (or treat the value as "as of import date"), and label it in-app as provider-supplied as-of that date rather than a live Google figure. `Decimal(2,1)` avoids float noise (4.3 vs 4.3000001).

3. **Owner-only reads through ONE code path.** Exclude the provenance model by default from every shared Lead/Batch serializer; route the OWNER read through a single dedicated service function that is the only code selecting those columns, so leakage is auditable to one place. NOTE: the spec's own honest caveat (app-role checks can't stop direct DB/secret access) means true owner-only secrecy **raises the priority of open 13-layer item L11** (RLS + least-privilege runtime role). Link them; don't over-claim secrecy the DB layer doesn't yet enforce.

4. **Migration additive + isolated-DB tested.** New columns nullable/optional (additive — good). Test the Prisma migration against an isolated test DB using PR #32's guard (refuses production). CI + collision guard gate it automatically.

5. **Focused branch only.** Field expansion + provenance in one PR, nothing bundled. Hold the production gate: no `mcd-leads intake/approve/export` of `Raw_Leads.csv` until merged and migration verified.

## Product note — reputation-management upsell
This is a new downstream intent (offer reputation management as a social-media upsell). It reinforces the data model: keep `googleRating` + `googleMapsUrl` as agent-usable research fields (the spec already does). Future consideration only: a lightweight "reputation opportunity" flag/track on the Lead so agents can filter businesses with low/negative ratings — not required for this import, just a natural next feature once the fields exist.

## Who does what next
- **ChatGPT implements** the focused branch/PR (crm.mcd + mcd_lead_ops), per its spec + gates 1–5 above. ChatGPT holds the lock.
- Verify against the 12 acceptance tests + these gates on a preview build, then merge; then the supervised first import can proceed.
- **Hamilton**: acquisition basis is documented (rawleads.org); provisions/sets any secrets. Claude does not touch secrets or run live imports.
- Claude is available for a pre-merge leakage-audit pass on request (schemas, serializers, server actions, review pages, logs, audit metadata, broad ORM selects).
