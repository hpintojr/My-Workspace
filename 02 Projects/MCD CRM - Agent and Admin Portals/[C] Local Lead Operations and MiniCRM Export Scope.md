# MCD CRM — Local Lead Operations and MiniCRM Export Scope

**Status:** Final implementation scope for Claude local setup  
**Project:** Mercury Call Desk MiniCRM  
**Date:** 2026-07-02  
**Owner:** Hamilton Pinto Jr.

---

## 1. Purpose and non-negotiable architecture

Build a local, operator-controlled research and lead-preparation workspace that sends approved, reviewable lead batches to MiniCRM.

```txt
Allowed data acquisition / approved local inputs
→ local staging and policy checks
→ public-business research and structured Claude brief
→ normalization, duplicate detection, and route validation
→ local preview report and explicit operator approval
→ signed MiniCRM import API
→ MiniCRM server-side validation, suppression check, audit, and Admin review
→ approved lead enters the correct MiniCRM pool
→ approved campaign provider sends email
→ provider events return to MiniCRM
→ reply / opt-out / bounce routing updates lead state
```

### Source-of-truth rule

```txt
Local workspace = collection, staging, research, enrichment, preview, and export preparation.
MiniCRM = permanent system of record for lead identity, source lineage, owner, pools, lifecycle, suppression, activities, proposals, and reporting.
Email provider = delivery and provider event source; events are mirrored to MiniCRM.
GHL = booked-demo and post-demo backend only.
```

The local process must **never** write directly to Neon/Postgres. It must use the protected MiniCRM import API after the MiniCRM lead foundation is live.

---

## 2. Scope changes from the preliminary draft

The preliminary scope is useful for the desired lifecycle, research brief, and export concept. The following design changes are mandatory:

```txt
Remove direct Neon/Postgres connections from local scripts.
Remove direct SQL upserts from local scripts.
Remove automated contact deletion intended to work around an email-provider contact limit.
Remove SMTP inbox probing / address harvesting as a validation method.
Remove social-directory scrapers, headless-browser bypasses, anti-bot bypasses, session/cookie automation, and rate-limit evasion.
Remove automatic campaign sends from a raw scraped CSV.
Remove any rule that assumes a missing website field proves there is no website.
Replace a single leads table with a lead foundation that preserves contacts, imports, activities, callbacks, suppression, proposals, and audit history.
```

The local system may use only permitted/authorized source adapters, operator-supplied files, approved APIs, or licensed providers. It must keep source provenance and permitted-use status for every record.

---

## 3. Source acquisition policy

### 3.1 Allowed acquisition channels

Build adapters only for the following categories:

```txt
1. User-provided CSV/XLSX exports
2. Licensed B2B data providers with a written permitted-use basis
3. Official provider APIs where the data license permits the planned use
4. Website form submissions
5. PPC / paid social form leads with campaign and UTM attribution
6. Referral intake
7. Manual business research entered by an operator
8. Owned / authorized social or platform account exports
9. Public business websites, only after terms and robots review and only for the business's own published business information
```

### 3.2 Explicitly disabled adapters

Claude must not build or enable adapters that:

```txt
Scrape or export Google Maps/Places content into a lead database.
Scrape LinkedIn profiles or listings.
Use browser automation, cookies, browser plugins, Selenium, Playwright, proxies, or bot-evasion to collect social-directory data.
Bypass bot defenses, rate limits, CAPTCHA, access controls, logins, or platform restrictions.
Harvest personal email addresses or perform mailbox-probing SMTP verification.
Scrape Yelp, Yellow Pages, Instagram, Facebook, or any other directory unless an approved API/data license and exact usage review have been documented.
```

### 3.3 Source labels remain available

The MiniCRM may retain original discovery labels such as `GOOGLE_MAPS`, `LINKEDIN`, `INSTAGRAM`, or `FACEBOOK` only when an operator independently and lawfully identifies the business, then confirms/imports the record using a permitted source.

Do not store copied directory content, copied reviews, copied profile text, or platform-exported business data merely because the source label is recorded.

### 3.4 Required provenance fields

Every staged row needs:

```txt
originalSource
intakeMethod
sourceProvider
sourceRecordReference
sourceEvidenceUrl when permitted
sourceCapturedAt
sourceUseBasis: OPERATOR_ENTERED | LICENSED_PROVIDER | OFFICIAL_API | WEB_FORM | REFERRAL | PPC | OWNED_ACCOUNT_EXPORT
sourcePolicyResult: ALLOWED | REVIEW_REQUIRED | BLOCKED
campaignName and campaignExternalId when applicable
referral identity and relationship when applicable
UTM source / medium / campaign / content / term when available
```

---

## 4. Local application architecture

Claude must create a local Python application named `mcd_lead_ops` with a clear CLI, durable local staging store, configuration files, tests, and operator documentation.

```txt
mcd_lead_ops/
  README.md
  .env.example
  pyproject.toml
  config/
    sources.example.yaml
    campaigns.example.yaml
    scoring.example.yaml
  src/mcd_lead_ops/
    cli.py
    config.py
    models.py
    policy/
      source_policy.py
      contact_policy.py
      website_policy.py
    adapters/
      csv_import.py
      referral_import.py
      web_form_import.py
      approved_provider_adapter.py
      owned_account_export.py
    research/
      website_research.py
      claude_brief.py
      evidence.py
    normalize/
      company.py
      email.py
      phone.py
      domain.py
      timezone.py
    validation/
      dedupe.py
      route_checks.py
      import_checks.py
    staging/
      sqlite_store.py
      manifest.py
      reports.py
    export/
      minicrm_client.py
      signing.py
      retry_queue.py
    email/
      provider_contract.py
      event_contract.py
      campaign_preview.py
    jobs/
      intake.py
      enrich.py
      preview.py
      export.py
      reconcile.py
    tests/
  data/
    inbound/
    staged/
    reports/
    quarantined/
```

### Local datastore

Use a local SQLite database for staging and job state. It must not be treated as the permanent CRM database.

Store:

```txt
run ID
source adapter/version
input file hash
row hash
policy decision
validation result
research result
export state
MiniCRM batch ID
error/retry state
operator approval identity and timestamp
```

Raw input data should be retained only as long as necessary for review and troubleshooting. The retention period must be configurable and the default must favor deletion after a completed, reconciled import.

### Secrets and safety

```txt
All secrets live in local environment variables or an approved OS secret store.
No credentials are written to logs, source files, CSV output, Git, or Claude prompts.
All commands support --dry-run.
No command may send email or create a MiniCRM record without an explicit operator-approved execution mode.
```

---

## 5. Canonical local lead record

Local records must map cleanly to MiniCRM but must preserve additional staging fields.

```txt
businessName
website
websiteDomain
businessPhone
businessEmail
contactName when lawfully available
contactRole when lawfully available
industry
city
state
country
timezone and timezoneConfidence
originalSource
intakeMethod
source provenance fields
campaign and UTM fields
researchBrief
researchEvidence[]
researchConfidence
personalizationAngles[]
websiteStatus
websiteOpportunityCandidate
validationStatus
suppressionCheckResult
dedupeKey
localRunId
localRowId
```

### Contact data minimization

```txt
Prefer business contact routes over personal contact data.
Do not collect sensitive personal data.
Do not infer protected traits, financial condition, health, or private personal details.
Do not use a decision-maker's social profile or personal biography as a source of speculative sales claims.
```

---

## 6. Research and Claude enrichment

### 6.1 Website and business research

The local research worker can examine the prospect's own published business website after policy review. It may collect only factual business information needed for a short sales brief:

```txt
Primary service / offering
Industry and visible specialty
Service area or geographic presence
Visible call-to-action or booking/contact path
Website status and obvious digital-gap observation
Publicly stated business value proposition
```

### 6.2 Claude research-brief contract

Claude produces structured JSON, not freeform uncontrolled copy.

```json
{
  "summary": "Maximum three factual sentences.",
  "services": ["..."],
  "targetCustomer": "...",
  "websiteObservation": "...",
  "personalizationAngles": ["..."],
  "confidence": "HIGH | MEDIUM | LOW",
  "evidence": [
    {"url": "https://business.example", "claim": "..."}
  ],
  "needsHumanReview": false
}
```

Rules:

```txt
Use only supported facts from retained evidence URLs.
Do not invent pain points, revenue, staffing, customer demographics, technology usage, or performance claims.
Do not write deceptive or manipulative cold-email copy.
Do not state that a prospect needs a website merely because the local data field is blank.
Set needsHumanReview = true when sources are thin, inconsistent, or ambiguous.
```

### 6.3 Website opportunity classification

```txt
LISTED = a working website is recorded.
NO_WEBSITE_LISTED = no website was supplied or found in the permitted source.
VERIFIED_NO_WEBSITE = an operator or approved review process has confirmed no usable website.
NEEDS_REVIEW = a URL exists but it is broken, parked, social-only, unclear, or needs human assessment.
```

Only `VERIFIED_NO_WEBSITE` may become a website opportunity candidate. It does not automatically create a promise, discount, or sales offer.

---

## 7. Validation, dedupe, and import preview

Before any export, the local process must:

```txt
1. Normalize company name, business email, phone, and website domain.
2. Create a deterministic dedupe fingerprint.
3. Detect duplicate rows inside the current batch.
4. Check duplicate candidates returned by the MiniCRM preview API.
5. Check MiniCRM suppression/DNC results through the preview API.
6. Validate business contact route format and domain syntax.
7. Reject records with no usable business contact route unless manually approved for research-only storage.
8. Verify source policy and source-use basis.
9. Classify website status.
10. Generate a human-readable preview report.
```

Do not use remote SMTP mailbox probing. Email validation is limited to syntax, domain/MX checks where appropriate, provider validation credits, bounce feedback, and human review.

### Required preview statuses

```txt
VALID
DUPLICATE_IN_BATCH
POSSIBLE_EXISTING_DUPLICATE
SUPPRESSED
REVIEW_REQUIRED
REJECTED
EXPORTED
IMPORT_ERROR
```

### Approval gate

The local CLI must require an explicit approval command after preview:

```txt
mcd-leads preview --run RUN_2026_07_02_001
mcd-leads approve --run RUN_2026_07_02_001 --operator "Hamilton Pinto Jr."
mcd-leads export --run RUN_2026_07_02_001
```

`export` must refuse to run without a completed preview and approval record.

---

## 8. MiniCRM import API contract

The lead-foundation migration and controlled MiniCRM endpoints must exist before local export is enabled.

### Endpoint sequence

```txt
POST /api/lead-imports
Create a draft import batch and return batch ID.

POST /api/lead-imports/{batchId}/rows
Upload normalized rows in bounded JSON batches.

POST /api/lead-imports/{batchId}/preview
Run MiniCRM-side dedupe, suppression, policy, and existing-client checks.

POST /api/lead-imports/{batchId}/submit
Submit only reviewed/approved rows for Admin review.

GET /api/lead-imports/{batchId}
Return counts, row-level decisions, and reconciliation state.
```

### API security

```txt
Dedicated local-import key ID and HMAC secret.
Timestamped request signature and body hash.
Five-minute replay window.
Idempotency key based on local run ID + row number + row hash.
Rate limit by key.
Audit local operator, client version, source adapter, and batch manifest.
No database credentials leave MiniCRM.
```

### MiniCRM import behavior

```txt
Imported records initially enter PENDING_REVIEW.
MiniCRM independently reruns normalization, dedupe, suppression, and field validation.
Original source remains immutable after creation, except for an audited Admin correction.
Approved rows enter Cold Pool, Referral, or another approved lane.
No imported lead is automatically assigned to an agent.
No imported lead is automatically enrolled in email outreach.
```

---

## 9. Pool, lifecycle, and website-offer rules

These concepts remain separate:

```txt
Original source = where first discovered
Intake method = how entered local/MiniCRM workflow
Campaign = outreach program or paid source
Pool = current operational lane
Lifecycle = sales stage
Owner = accountable human/House record
Suppression = global or channel-specific restriction
Proposal = commercial quote/version/terms
```

### Canonical pools

```txt
Cold Pool / Prospects
Nurture / Marketing Email Pool
Hot Leads
Open Pool
Shark Tank
Referral
House
```

### Important transitions

```txt
Approved import → Cold Pool / Prospects
Approved email campaign accepted by provider → Nurture / Marketing Email Pool
Positive, clear reply or verified inbound request → Hot Leads
Ambiguous reply → Reply Triage, not automatically Hot
Booked demo no-show + governed release → Open Pool
Active stalled proposal/quote → Shark Tank
Referral → protected Referral lane
Company-directed reassignment → House
```

### Website incentive and website-only sales

The MiniCRM must use proposal records, not loose tags.

```txt
Proposal type:
- MCD package
- MCD package with approved included website incentive
- Website-only

Required proposal fields:
- owner
- quote version
- scope/terms reference
- amount/currency
- sent date
- active/expiry date
- accepted / declined / expired state
- original closing attribution
```

A website-only offer must remain in the approved $500–$3,000 range until Hamilton changes policy. The CRM must require manager approval of price, scope, and expiry before an agent can represent it.

---

## 10. Email marketing architecture

### 10.1 Campaign safety first

Email sending remains disabled until all of the following are complete:

```txt
Dedicated sending domain/subdomain configured.
SPF, DKIM, and DMARC verified.
Provider account and current acceptable-use requirements reviewed.
Commercial-email footer, physical address, sender identity, and unsubscribe flow approved.
MiniCRM global DNC and email-only suppression active.
Bounce, complaint, unsubscribe, delivery, and reply webhooks connected.
Seed/inbox testing complete.
Initial campaign content and rate caps approved by Hamilton.
```

### 10.2 Provider abstraction

Do not hardwire campaign logic to Mailjet, Sequenzy, or a provider-specific endpoint. Build this interface:

```txt
create_contact_or_segment()
queue_campaign_message()
send_approved_batch()
get_delivery_events()
get_reply_events()
get_bounce_events()
get_unsubscribe_events()
reconcile_campaign_state()
```

Every provider action must carry a MiniCRM lead ID, campaign ID, provider message ID, and idempotency key.

### 10.3 No free-tier circumvention

```txt
Do not delete provider contacts to bypass contact storage limits.
Do not split volume across providers merely to evade plan or platform limits.
Do not treat free-tier limits as permanent operating assumptions.
Do not send a lead through two providers in the same campaign stage.
```

Use configurable provider capacities retrieved from the currently approved plan. If capacity or contact storage is insufficient, pause the batch and require an operator decision to reduce volume, use an approved paid plan, or select an approved provider.

### 10.4 Reply and event routing

```txt
Accepted/delivered = retain event; do not call Hot.
Open/click = engagement signal only; do not call Hot.
Clear positive reply / inbound request = Hot Lead.
Ambiguous reply = Reply Triage.
Negative response = activity/disposition; remove from automated campaign where appropriate.
Unsubscribe = Email-channel suppression immediately.
Stop / DNC = global suppression if the message clearly requests all contact to cease.
Hard bounce / invalid route = route-specific suppression and review.
Provider complaint = immediate campaign stop/review for the lead and alert to Admin.
```

Provider webhooks must be signed, idempotent, retry-safe, and recorded in MiniCRM audit history.

---

## 11. Local job workflow and scheduling

### Daily/local job stages

```txt
1. intake
2. policy check
3. normalize
4. research
5. validate
6. preview report
7. operator approval
8. MiniCRM export
9. MiniCRM reconciliation
10. campaign candidate report only
```

Campaign sending is a separately approved operation, not an automatic final step after import.

### Job controls

```txt
All jobs are resumable by run ID.
All retries are bounded and logged.
A failed export cannot create an automatic email send.
A failed research call marks the row review-required rather than inserting placeholder claims.
Every local run writes a Markdown summary and machine-readable manifest.
Scheduled runs use the operating system scheduler, but manual --dry-run and manual approval remain mandatory for live exports.
```

---

## 12. Required reports

Claude must generate:

```txt
Run summary
Source/policy summary
Row validation report
Duplicate and suppression report
Website opportunity review report
Research-confidence report
MiniCRM export and reconciliation report
Campaign-candidate report
Failure/retry report
```

The campaign-candidate report is only a list for approval. It must not trigger sending.

---

## 13. Acceptance tests

Before enabling live export, Claude must demonstrate these controlled tests using synthetic data:

```txt
1. Valid licensed/manual business row creates a staged record.
2. A blocked source adapter is rejected before collection/export.
3. Missing website creates NO_WEBSITE_LISTED, not VERIFIED_NO_WEBSITE.
4. Verified no-website record becomes website-opportunity review only.
5. Same normalized business/email/phone is detected as duplicate.
6. Suppressed email is rejected by MiniCRM preview.
7. Replayed export request returns idempotent success without duplicate lead creation.
8. Import starts as PENDING_REVIEW and does not auto-assign an agent.
9. Positive reply event creates one Hot transition only.
10. Ambiguous reply enters triage.
11. Email unsubscribe creates EMAIL suppression, not necessarily global DNC.
12. Global DNC prevents campaign, call, SMS, and social action.
13. Website-only quote outside $500–$3,000 is rejected.
14. Provider event retry does not duplicate activities or notifications.
15. Local logs and reports contain no secrets.
```

---

## 14. Claude implementation instructions

Claude must:

```txt
Build only allowed acquisition adapters.
Implement source policy as code, not a manual checklist.
Start with CSV, referral, web-form, manual-entry, approved-provider, and owned-account-export adapters.
Leave directory/social scraper adapters disabled and clearly marked unsupported.
Build local staging, preview, manifest, reporting, and signed MiniCRM-export modules first.
Provide unit tests and a synthetic fixture set before any real record is processed.
Implement MiniCRM API client only after endpoint contract is available.
Do not enable outbound email delivery until the MiniCRM lead foundation, suppression controls, and provider webhooks have been built and tested.
Do not use direct Neon connections.
Do not implement contact-list purges to bypass provider limits.
```

---

## 15. Ordered delivery plan

```txt
Phase A — Local foundation
- repo, environment, CLI, SQLite staging, policy engine, CSV/manual/referral/web-form adapters, reports, tests

Phase B — Research and validation
- website research, structured Claude brief, evidence capture, normalization, dedupe, preview

Phase C — MiniCRM lead foundation
- approved database migration, import API, suppression, audit, Admin review, reconciliation

Phase D — Controlled exports
- HMAC-authenticated local exporter, idempotency, dry-run, synthetic test, one manually approved pilot batch

Phase E — Campaign readiness
- sender domain, provider selection, templates, suppression, webhook relay, inbox testing, approved low-volume pilot

Phase F — Operational expansion
- provider-licensed source adapters, reply triage, website offer proposal path, Shark Tank, reporting, and GHL Demo Booked handoff
```

---

## 16. Completion definition

This scope is complete only when:

```txt
A permitted source creates a local staged batch.
The operator can inspect and approve the preview.
The batch exports through a signed MiniCRM API.
MiniCRM records source lineage, audit data, duplicate/suppression outcome, website status, and pending-review state.
No direct database connection exists in local code.
No prohibited scraper/bypass adapter exists.
No campaign send can occur without separate operator approval and working suppression controls.
A full synthetic test suite passes.
```
