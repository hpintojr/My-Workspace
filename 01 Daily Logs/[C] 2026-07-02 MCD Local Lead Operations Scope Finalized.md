# MCD — Local Lead Operations Scope Finalized

**Date:** 2026-07-02  
**Project:** MCD CRM — Agent and Admin Portals

## Decision

The preliminary local scraping/enrichment/email design was reviewed and converted into a controlled local lead-operations scope.

```txt
Local lead workspace = permitted intake, staging, research, normalization, validation, preview, explicit approval, and signed MiniCRM export.
MiniCRM = permanent system of record for lead/source/pool/ownership/suppression/proposal/audit history.
Email provider = delivery and event source, mirrored back to MiniCRM.
GHL = booked-demo and post-demo backend only.
```

## Changes required before implementation

```txt
No direct local connection to Neon/Postgres.
No direct local SQL upserts.
No direct campaign sending from raw imported files.
No contact purge to work around provider storage limits.
No SMTP mailbox probing.
No directory/social scraper, headless browser, login/cookie, CAPTCHA, proxy, anti-bot, or rate-limit bypass automation.
No automatic conclusion that a blank website field means no website exists.
```

## Source policy

Allowed local sources:

```txt
User-provided CSV/XLSX
Referrals
Web forms
PPC form leads
Licensed/approved provider data
Owned/authorized account exports
Permitted business-website research
```

Blocked local automation:

```txt
Google Maps/Places content export or storage
LinkedIn profile/listing scraping
Unapproved social/directory scraping
Browser/headless/anti-bot bypasses
Direct database access
Provider-limit circumvention
```

Original source labels remain available for attribution but do not authorize copying platform content into MiniCRM.

## Final local build

Claude is to build `mcd_lead_ops`:

```txt
Python CLI
Local SQLite staging
Source-policy engine
Allowed input adapters
Research/evidence capture
Structured Claude JSON brief
Normalization and dedupe fingerprinting
Import preview and approval workflow
Signed MiniCRM export client
Run manifests/reports/retries
Synthetic tests
```

## MiniCRM integration

Local export is blocked until MiniCRM provides:

```txt
Draft import-batch endpoint
Bounded row-upload endpoint
Server-side preview / dedupe / suppression endpoint
Submit-for-review endpoint
Reconciliation endpoint
HMAC signing, idempotency, rate limits, and audit history
```

Imported rows begin in `PENDING_REVIEW`; they do not automatically assign agents, enter campaigns, or send emails.

## Website opportunity policy

```txt
No website listed → review required → verified no website → website opportunity review.
Website sales use proposal records, not tags.
Proposal types: MCD package, MCD with included website incentive, website-only.
Website-only price guardrail: $500–$3,000 until changed by owner policy.
Manager approves scope, price, and expiry before an agent represents the offer.
```

## Email policy

```txt
No live campaign until sender domain, SPF/DKIM/DMARC, commercial footer/address, unsubscribe, MiniCRM suppression, provider webhooks, and inbox testing are complete.
Open/click is not Hot.
Clear positive reply is Hot.
Ambiguous reply enters triage.
Unsubscribe becomes email-channel suppression; explicit all-contact stop becomes global DNC.
```

## Next action

Claude should begin only Phase A of the local scope: CLI, SQLite staging, permitted input adapters, policy engine, preview reports, manifests, and synthetic tests. MiniCRM lead migration remains paused until its import API contract is ready.
