# Mercury Call Desk — Mini CRM, Admin Panel & Agent Experience
## Master Product Scope and Developer Handoff Blueprint
**Version:** 1.1
**Purpose:** Single source of truth for product management, UX/UI, architecture, development, QA, and launch planning.

> **What changed in v1.1 (2026-06-29):** Added the GHL-as-backend operating model — the missing piece from v1.0. Sections 1–30 are unchanged from your original. New material is appended as **Part B (Sections 31–37)**: GHL backend architecture and isolation (§31), the GHL → Mini CRM event catalog and webhook contracts (§32), the **Stripe → GHL → Mini CRM funding relay** (§33), the agent-attribution model that needs **no GHL logins** (§34), the dedicated `mercurycalldesk@` email decision + migration steps (§35), recommended UX/architecture enhancements (§36), and GHL-specific acceptance tests (§37). Your two direct questions are answered in §33 (funding relay) and §34 (GHL staff users — short answer: no). Developer-level payloads live in the companion file `[C] GHL Backend Integration Spec.md`.
>
> **v1.2 note (2026-06-30):** Reconciled to the approved Partner Program Business Terms. Apply `[C] v1.2 Business-Terms Reconciliation & GHL Flows.md` over this scope — it changes the commission model to 50/50 of Net Commissionable Profit (§16/§17), makes lead protection concrete (two-way contact, referral, 45-day OpenPool, Shark Tank, close+cleared credit — §8/§10), makes service cadence MANDATORY per package and overrides §12.3, adds a countersignature + GHL Documents & Contracts e-sign onboarding (§6), and defines the two agent-GHL-attribution flows being piloted.

---

## 1. Product Vision

Mercury Call Desk is a secure, sales-focused Mini CRM for sourcing, validating, nurturing, assigning, and converting business leads into demos. It is not intended to replace GoHighLevel. The Mini CRM owns pre-demo prospecting, agent workflow, attribution, compliance controls, client service tracking, and commission accounting. GoHighLevel begins its primary workflow when a demo is booked. Stripe is the financial event source for payments, refunds, disputes, and payment failures.

The system must feel like an operating system for a sales organization, not a generic contact database.

### Product objectives
- Give agents an obvious next best action at all times.
- Prevent duplicate outreach and lead hoarding.
- Keep sales activity fast, structured, and auditable.
- Protect sensitive agent onboarding files and customer data.
- Preserve permanent source, ownership, and commission lineage.
- Enable management to see what is happening without asking agents for manual reports.
- Support monthly residual commissions, annual upfront commissions, reassignments, retirement, voluntary departure, and House Account transitions.
- Keep the prospecting application lightweight while using GoHighLevel for booked-demo operations and Stripe for payment events.

---

## 2. Decisions Already Made

| Topic | Final decision |
|---|---|
| Company | Mercury Call Desk |
| App type | Responsive dark-theme web app with strong mobile experience |
| Core app | Next.js + TypeScript, hosted on Vercel |
| CRM database | PostgreSQL is the operational system of record |
| Graph database | Neo4j is optional later for relationship intelligence; not required for launch |
| Sensitive document storage | Private Cloudflare R2 bucket with short-lived presigned upload/download URLs |
| Scraping/enrichment | Python services and background workers |
| Email campaign platform | Mailjet or Sequenzy; build a provider abstraction so either can be used |
| IONOS | Company and controlled 1-to-1 mail only; not the primary campaign engine |
| Calling model | No dialer in version 1; agents use native phone calling through `tel:` actions where supported |
| Call measurement | Log call initiation, required disposition, notes, and follow-up action; do not treat browser focus as verified talk time |
| GHL boundary | GHL workflow starts when a demo is booked |
| Stripe boundary | Stripe is the financial payment/refund/dispute event source |
| Agent residuals | Monthly residuals continue while client pays and agent retains/serves the account as defined by policy |
| Annual contracts | Annual prepaid contracts can generate upfront commission |
| Retirement | Retired agents continue collecting commissions under approved retirement policy |
| Good-standing departure | Former agent may continue commissions if they continue servicing their clients |
| Good-standing departure without service | Client accounts and future residuals move to House Account |
| Termination for cause | Future commission rights end and accounts transfer to House Account, subject to signed agreements and legal review |
| Healthy accounts | No forced quarterly check-ins; no penalty for lack of activity when client is paying and has no issues |
| Service measurement | Measure response to meaningful account events, issues, renewals, payment problems, client requests, and escalations |

---

## 3. Product Principles

1. **One source of truth per data category.** Do not build uncontrolled two-way synchronization.
2. **Ownership must be explicit.** A lead, account, task, and commission event must always have clear current ownership.
3. **Historical lineage is permanent.** Never overwrite the original source, original agent, initial sale, or past commission history.
4. **The app must guide work.** Agents should not need to search for what to do next.
5. **The system must be safe by default.** Suppressed contacts, duplicate leads, out-of-hours outreach, and unauthorized actions must be blocked or clearly warned.
6. **No fake measurement.** Call initiation may be logged; verified talk time is not assumed without a true telephony integration.
7. **Healthy paying clients are not a problem to solve.** Do not require unnecessary touchpoints simply to generate activity.
8. **Commission logic must be versioned.** Future policy changes cannot rewrite historical payouts.
9. **All sensitive changes must be auditable.** Every reassignment, suppression, payout, document access, and override needs a traceable record.
10. **Business rules belong in configurable settings.** SLAs, capacity, commission rules, campaign windows, and payout holds must not be hard-coded into screens.

---

## 4. System Architecture

### 4.1 Primary stack

```text
Frontend:
- Next.js
- TypeScript
- Responsive web app / mobile-first PWA behavior
- Dark theme by default

Backend:
- Next.js server routes or dedicated API service
- PostgreSQL
- ORM and migration framework
- Role-based access control
- Durable background job queue

Storage:
- Cloudflare R2 private bucket
- Presigned upload/download URLs
- Randomized object keys
- Encryption in transit and at rest

Workers:
- Python services for scraping, validation, enrichment, import processing, and long-running jobs
- Background integration workers for GHL, Stripe, email providers, notifications, and retries

External systems:
- GoHighLevel for demo-stage opportunity workflow, calendar, post-demo automation, invoices, and payment-link operations
- Stripe for payment status and finance events
- Mailjet or Sequenzy for campaign delivery, reply events, and suppression events
- IONOS for company mailbox and controlled one-to-one communication
```

### 4.2 Architecture rules

```text
User action
  → API request
  → PostgreSQL transaction
  → audit record
  → job queue event where needed
  → worker performs external action
  → result stored with retry/error state
```

Do not make the interface wait on slow scraper runs, external APIs, campaign sends, or webhook retries.

### 4.3 Source-of-truth matrix

| Data category | System of record |
|---|---|
| Lead source, validation, pool, ownership, activity | Mini CRM |
| Agent onboarding, permissions, documents, audit | Mini CRM |
| Compliance, DNC, consent, suppression | Mini CRM |
| Demo booking request and pre-demo history | Mini CRM |
| Booked-demo calendar and post-demo opportunity workflow | GoHighLevel |
| Package, invoice, payment-link workflow | GoHighLevel |
| Payment, refund, dispute, failure event | Stripe |
| Campaign send/reply/delivery events | Mailjet or Sequenzy, mirrored to Mini CRM |
| Commission ledger and payout eligibility | Mini CRM |
| Actual payouts | Finance/payment provider selected later, mirrored to Mini CRM |

---

## 5. Security, Privacy, and Access Control

### 5.1 Security rules
- Never store plain-text passwords.
- Do not email credentials or passwords.
- Use one-time activation links with expiration and single-use tokens.
- Require MFA for admins and finance users; make MFA available or required for agents based on launch policy.
- Use short-lived presigned R2 URLs for uploads and downloads.
- Do not expose permanent public document links.
- Store only operational lead data in the CRM.
- Do not store raw bank-account numbers, routing numbers, Social Security numbers, payment-card data, or unencrypted tax forms in PostgreSQL.
- Use a dedicated provider for contractor tax and banking intake wherever possible.
- Store only completion states for sensitive payout/tax onboarding unless finance needs a secure external reference.
- Log document upload, view, download, replace, delete, and permission changes.
- Create an immutable audit log for important actions.
- Add rate limits and session/device controls to prevent abuse.
- Encrypt secrets in a dedicated secret-management system, never in client-side code.

### 5.2 Roles

| Role | Primary abilities |
|---|---|
| Owner | Full control, high-risk settings, finance visibility, integrations, audit |
| Super Admin | Full operational administration, excluding owner-only controls if desired |
| Sales Manager | Agent performance, lead operations, reassignment, coaching, review queues |
| Compliance Manager | Suppression, consent, campaign compliance, audit review, escalation |
| Finance Manager | Commission ledger, payout approval, refund/dispute review, financial reports |
| Agent | Own leads, own tasks, callbacks, approved resources, own performance and commissions |
| Former Servicing Agent | Only approved retained client accounts, service tasks, account history, own residual view; no open lead pool |
| Read-Only Viewer | Approved dashboards and reporting only |
| House Account Service User | Assigned House Account clients, support/retention tasks, no access to unassigned leads unless separately authorized |

### 5.3 Permission model
Permissions must be granular and checked server-side, not only hidden in the UI.

Examples:
- `lead.claim`
- `lead.reassign`
- `lead.export`
- `lead.mark_dnc`
- `campaign.enroll`
- `campaign.pause`
- `agent.approve`
- `document.view_sensitive`
- `commission.approve`
- `commission.override`
- `integration.retry`
- `audit.view`
- `settings.manage`

Agents must never:
- Browse other agents’ pipelines.
- Export the full lead database.
- See House Account totals or other agents’ payouts.
- Access sensitive agent documents.
- Override compliance blocks.
- Change commission rules.

---

## 6. Agent Onboarding and Lifecycle

### 6.1 Registration flow

```text
Agent applies
  → enters basic details
  → signs Sales Agreement and NDA
  → uploads required documents through R2 presigned URLs
  → onboarding checklist becomes complete
  → status becomes PENDING_REVIEW
  → admin approves or rejects
  → approved agent receives one-time activation link
  → agent creates password and completes MFA
  → status becomes ACTIVE
  → dashboard access begins
```

### 6.2 Required onboarding data
- Legal name
- Preferred name
- Email
- Phone
- Address or business address as applicable
- Headshot
- Signed agreement records
- NDA completion
- ID verification completion
- Tax/payout onboarding completion state
- Manager assignment
- Commission plan assignment
- Training completion
- Activation status

### 6.3 Onboarding statuses

```text
DRAFT
SUBMITTED
PENDING_REVIEW
NEEDS_CORRECTION
APPROVED
REJECTED
INVITED
ACTIVE
SUSPENDED
OFFBOARDED
```

### 6.4 Agent offboarding
When an agent resigns, retires, is suspended, or is terminated:

```text
Disable or limit access based on status
  → revoke active sessions when required
  → prevent new lead claims
  → preserve all historical records
  → evaluate active leads/callbacks/client accounts
  → reassign tasks and accounts as policy requires
  → preserve commission ledger and final status
```

Never delete agent records.

---

## 7. Core Data Model

### 7.1 Primary entities

```text
users
roles
permissions
user_role_assignments
agent_profiles
agent_onboarding_records
agent_status_history
documents
document_access_logs

leads
lead_contact_methods
lead_companies
lead_sources
lead_validations
lead_duplicate_candidates
lead_pool_memberships
lead_assignments
lead_claim_events
lead_activities
lead_notes
lead_callbacks
lead_dispositions
lead_suppressions
lead_consent_records
lead_timezones

campaigns
campaign_enrollments
campaign_messages
campaign_events
campaign_replies
reply_triage_records

scraper_jobs
scraper_job_runs
scraper_results
import_batches
import_records
validation_jobs

bookings
ghl_links
stripe_links
webhook_events
integration_jobs
integration_errors

client_accounts
client_account_assignments
client_service_tasks
client_service_events
client_health_records
client_renewals
client_issues
client_transfers

commission_plans
commission_plan_versions
commission_rules
commission_ledger_entries
commission_adjustments
commission_payout_batches
commission_payouts
commission_clawbacks

house_accounts
house_account_assignments
house_account_transfers

notifications
notification_preferences
audit_logs
system_settings
feature_flags
```

### 7.2 Permanent lineage fields
Every lead/client record must preserve:
- Source and source evidence
- Original claiming agent
- Original booking agent
- Original closing attribution
- Current owner
- Current servicing owner
- All transfer events
- GHL and Stripe link records
- Commission plan/version used for each payment

---

## 8. Lead Model and Lifecycle

### 8.1 Keep these concepts separate

#### Lead lifecycle
```text
RAW
PENDING_REVIEW
VALIDATED
ELIGIBLE
NURTURE_ACTIVE
OPEN_POOL
CLAIMED
WORKING
DEMO_BOOKED
HANDOFF_TO_GHL
CLOSED_WON
CLOSED_LOST
INVALID
DNC
SUPPRESSED
ARCHIVED
```

#### Lead pool
```text
HOT
NURTURED
COLD
PRIVATE_AGENT
MANAGER_REVIEW
```

#### Ownership state
```text
UNASSIGNED
CLAIMED_BY_AGENT
ASSIGNED_BY_MANAGER
LOCKED_FOR_CALLBACK
REASSIGNED
```

#### Activity state
```text
NO_ACTIVITY
ATTEMPTED_CONTACT
CONTACTED
QUALIFIED
CALLBACK_SCHEDULED
DEMO_BOOKED
UNRESPONSIVE
DISQUALIFIED
```

### 8.2 Required lead fields
- Lead ID
- Company/contact name
- Phone(s)
- Email(s)
- Website
- Industry
- Location
- Time zone and confidence source
- Source type/name/URL
- Source record ID
- Date collected
- Validation status
- Duplicate status
- Suppression status
- Consent status
- Lead score
- Pool
- Owner
- Current activity state
- Current lifecycle state
- Last action
- Next action
- Last engagement
- GHL link status
- Notes and timeline

---

## 9. Lead Ingestion, Scraping, Validation, and Review

### 9.1 Scraper flow

```text
Admin defines search criteria
  → scraper job created
  → Python worker collects and normalizes results
  → validation/enrichment jobs run
  → duplicate and suppression checks run
  → records enter Pending Review
  → admin approves, rejects, or edits
  → approved leads route to Cold Pool or Nurture campaign
```

### 9.2 Admin scraper screen
Fields:
- Industry
- Location
- Business type
- Company size
- Decision-maker title
- Source selection
- Exclusion terms
- Existing customer exclusion
- Existing lead exclusion
- Maximum result count
- Campaign destination
- Quality threshold
- Preview sample
- Start job
- Job progress
- Import results
- Error records

### 9.3 Required validation gates
Before a lead becomes available to agents or campaigns:
1. Normalize contact/company data.
2. Detect duplicates.
3. Check internal suppression.
4. Check relevant campaign eligibility rules.
5. Validate email/phone where services are used.
6. Assign geographic time zone.
7. Calculate lead score.
8. Preserve source/provenance.
9. Require review where score or source is below threshold.

### 9.4 Lead scoring
Use a transparent 0–100 score. Example contributing factors:
- Verified email
- Valid phone
- Target industry match
- Geographic match
- Decision-maker identification
- Company fit
- Engagement signal
- Recent data freshness

Admins must see why a lead received its score.

---

## 10. Lead Pools, Claiming, and Routing

### 10.1 Pool definitions

#### Hot Pool
Prospects who replied, requested information, submitted a form, engaged with a booking link, requested contact, or were escalated.

#### Nurtured Pool
Prospects in approved marketing sequences who have not yet shown direct purchase intent.

#### Cold Pool
Validated prospects not yet touched by campaigns or agents.

### 10.2 Atomic claim rule
Lead claims must be enforced in a database transaction.

Before claim succeeds, confirm:
- Lead is still available.
- Lead is not suppressed or DNC.
- Agent is active/available.
- Agent is eligible for this pool.
- Agent has not exceeded capacity.
- Lead is within allowed outreach conditions.
- Lead is not held by another active workflow.
- Claim is not blocked by manager review.

If two people click Claim at the same time, only one succeeds.

### 10.3 Default capacity
Initial configurable defaults:

| Pool | Suggested active limit |
|---|---:|
| Hot | 3 |
| Nurtured | 15 |
| Cold | 25 |
| Callbacks | Unlimited, but all overdue callbacks are manager-visible |

### 10.4 Claim and expiration rules
All timing must be configurable.

| Pool | First required action | Auto-return / review |
|---|---|---|
| Hot | 15 minutes after claim | Return to Hot Pool after 20 minutes without action; manager alert for repeated misses |
| Nurtured | 4 business hours | Return after 1 business day without action |
| Cold | 1 business day | Return after 2 business days without action |
| Callback | At scheduled time | Overdue immediately; escalate after defined grace period |

A valid callback, active conversation, or manager-approved exception pauses auto-return.

### 10.5 Reply routing
When a campaign reply arrives:
- If original owner is active and within SLA, route as Hot to the original owner.
- If original owner is unavailable, at capacity, or misses SLA, route to Hot queue.
- If no owner exists, use configurable round robin and capacity logic.
- Positive replies become Hot.
- Unsubscribe/stop requests immediately suppress.
- Auto-replies do not become Hot.
- Ambiguous replies enter Reply Triage.

---

## 11. Agent Experience

### 11.1 Agent navigation

```text
Today
My Leads
Available Leads
Callbacks
Bookings
Client Accounts
Activity
Performance
Resources
Profile
```

### 11.2 Agent home dashboard
The first screen answers: **What should I do next?**

Display:
- Today’s goal and progress
- Hot leads waiting
- Due callbacks
- Overdue actions
- Calls initiated today
- Contacts made
- Demos booked
- Upcoming bookings
- Active paying clients
- Accounts needing service
- Monthly residuals
- Pending commissions
- Next payout projection

Primary actions:
- Call Hot Lead
- Complete Callback
- Claim Nurtured Batch
- Claim Cold Batch
- Review Client Issue
- Review Reply Triage

### 11.3 Lead workspace layout

```text
Left panel:
- Name/company
- Phone/email
- Industry/location
- Time zone
- Source
- Lead score
- Prior engagement
- Compliance warnings

Main panel:
- Call action
- Email action
- Copy buttons
- Approved script/talking points
- Disposition action
- Notes
- Next action scheduler
- Booking action

Right panel:
- Activity timeline
- Past calls/emails
- Campaign events
- Replies
- Callback schedule
- GHL sync status
- Compliance / suppression history
```

### 11.4 Dispositions
Require structured disposition after a call attempt:

```text
NO_ANSWER
VOICEMAIL_LEFT
WRONG_NUMBER
GATEKEEPER
NOT_INTERESTED
REQUESTED_CALLBACK
SPOKE_WITH_DECISION_MAKER
QUALIFIED
DEMO_BOOKED
DO_NOT_CONTACT
INVALID_INFORMATION
```

Required fields after a call action:
- Disposition
- Short note
- Next action
- Next action time if needed

### 11.5 Click-to-call behavior
- On mobile: `tel:` starts native phone flow.
- On desktop: show call action plus copy number and optional “send to phone”/QR convenience pattern.
- Immediately record `CALL_INITIATED`.
- When agent returns or manually completes, show required disposition.
- Browser focus changes may be stored as an estimate only; they are not verified talk time.
- Do not make talk time a core performance metric in version 1.

### 11.6 Agent metrics
Track:
- Lead claim compliance
- First-action time
- Calls initiated
- Completed dispositions
- Contact rate
- Qualified conversations
- Demos booked
- Callback completion
- Reply response time
- Client service response time
- Retention/account-health outcomes
- Residual commission performance

Do not reward raw activity volume without quality or compliance.

---

## 12. Client Account and Servicing Experience

### 12.1 Client account begins after conversion
A Lead becomes a Client Account when a qualifying payment or approved conversion event is received.

Client account fields:
- Client account ID
- Linked Mini CRM lead
- Linked GHL contact/opportunity
- Linked Stripe customer/subscription/invoice/payment
- Contract type
- Contract dates
- Payment frequency
- Current status
- Originating agent
- Servicing agent
- House Account if applicable
- Commission plan/version
- Current account health
- Last successful payment
- Last client request
- Next required action
- Renewal date
- Open issues

### 12.2 Account health
Statuses:

```text
HEALTHY
AT_RISK
SERVICE_OVERDUE
RENEWAL_DUE
PAST_DUE
PAYMENT_FAILED
DISPUTED
CANCELLED
CHURNED
HOUSE_MANAGED
```

### 12.3 Healthy paying account rule
When a client:
- Is current on payments,
- Has no support issue,
- Has no payment failure,
- Is not in a dispute,
- Is not at renewal/decision point,
- Has no complaint or cancellation request,

then:
- No routine quarterly call is required.
- No activity penalty applies.
- No reassignment should occur solely because there was no recent account activity.
- Residual eligibility continues according to the applicable commission plan.

### 12.4 Triggered servicing
Service activity is measured only when there is a reason to act, such as:
- Client message or request
- Support issue
- Payment failure
- Past-due account
- Renewal date
- Upgrade/downgrade request
- Cancellation request
- Complaint
- Dispute/chargeback
- Internal escalation
- Required onboarding/implementation item

Track:
- Event created time
- Assigned servicing owner
- Required SLA
- First response time
- Follow-up time
- Resolution time
- Resolution notes
- Escalation status
- Outcome

### 12.5 Suggested service SLAs
Configurable examples:
- Client request: first response within 1 business day
- Payment failure/past due: review or outreach within 2 business days
- Cancellation request: same-business-day review
- Renewal: task generated 30 days before renewal
- Chargeback/dispute: immediate manager + finance escalation
- Client complaint: first response within 1 business day

---

## 13. Admin Experience

### 13.1 Admin navigation

```text
Command Center
Lead Operations
Agents
Onboarding
Client Accounts
Campaigns
Reply Triage
Scraper & Imports
Compliance
Bookings & GHL
Commissions
Finance Review
Reports
Integrations
Audit Log
System Settings
```

### 13.2 Command Center
Show:
- Leads by pool
- Unclaimed Hot leads
- Hot-lead SLA breaches
- Agent availability
- Calls initiated today
- Contacts and demos today
- Campaign health
- Positive replies awaiting action
- Active client count
- At-risk client count
- Monthly recurring revenue
- Projected commission liability
- Refund/dispute exposure
- House Account revenue and client count
- Integration failures
- Scraper jobs running
- Compliance alerts

### 13.3 Lead Operations
Admins can:
- Review imports
- Approve/reject/edit leads
- Route to Cold/Nurture/Manager Review
- Reassign owner
- Return to pool
- Freeze/release lead
- Merge duplicates
- Mark invalid
- Mark DNC/suppressed
- Add/remove campaign
- Review lead timeline
- See source evidence and validation results
- Perform bulk operations with audit logging

### 13.4 Agent management
Admins can:
- Approve onboarding
- Change role/status
- Assign manager
- Assign commission plan
- Set availability
- View performance
- See claim/callback behavior
- Review compliance flags
- Start offboarding
- Initiate retirement or former-agent servicing transition
- Reassign accounts/leads

### 13.5 Client account operations
Admins/authorized managers can:
- View account health and payments
- Reassign servicing owner
- Move to House Account
- Create service tasks
- Review client issues
- Review retention history
- View linked GHL/Stripe events
- Apply account transfer reason
- Review commission impact before confirming transfer

---

## 14. Campaigns and Reply Triage

### 14.1 Provider abstraction
Build an email-provider interface so Mailjet or Sequenzy can be swapped without rewriting CRM workflow.

```text
create_contact
update_contact
suppress_contact
add_to_campaign
remove_from_campaign
pause_campaign
resume_campaign
send_one_to_one_message
receive_delivery_event
receive_reply_event
```

### 14.2 Campaign manager functions
- Create campaign
- Define audience rules
- Exclude suppression lists
- Preview/send test
- Start/pause/stop
- Set sending windows
- View events
- View bounce/spam/unsubscribe rates
- Review replies
- Move contacts between sequences
- Prevent re-enrollment conflicts
- See provider error states

### 14.3 Reply triage
Agents do not need direct mailbox access.

Inside Mini CRM, show:
- Full message thread
- Lead/client identity
- Campaign source
- Current owner
- Reply classification
- Suggested next action
- Approved templates
- Compliance controls
- Notes and timeline

Reply classes:
```text
POSITIVE
NEUTRAL
AMBIGUOUS
UNSUBSCRIBE
WRONG_PERSON
AUTO_REPLY
OUT_OF_OFFICE
COMPLAINT
SUPPORT_REQUEST
```

### 14.4 Compliance gate
No campaign enrollment without:
- Suppression check
- Required consent/eligibility determination
- Sending-window rules
- Unsubscribe handling
- Contact/source provenance
- Campaign owner/approval

All final outbound campaign practices must be reviewed by legal/compliance counsel before launch.

---

## 15. GoHighLevel Integration

### 15.1 Handoff trigger
When an agent books a demo:

```text
Mini CRM lead status → DEMO_BOOKED
  → create/update GHL contact
  → create/update GHL opportunity
  → create/update GHL appointment as applicable
  → store external IDs in integration-link table
  → start GHL post-booking workflow
```

### 15.2 Data passed to GHL
- `mini_crm_lead_id`
- Original agent ID/name
- Lead source
- Lead pool
- Lead score
- Company/contact data
- Phone/email
- Industry/location
- Booking data
- Pre-demo notes
- Compliance flags/status where appropriate

### 15.3 Events returned from GHL
Track:
- Appointment created
- Appointment confirmed
- Appointment rescheduled
- Appointment canceled
- Appointment no-show
- Appointment completed
- Opportunity stage changed
- Package selected
- Invoice created/sent/voided/paid if GHL manages these
- Notes or post-demo status required for Mini CRM reporting

### 15.4 Attribution rules
- The original booking agent remains historically credited unless an authorized manager changes attribution with a documented reason.
- Reschedules do not erase original booking credit.
- No-show/canceled demos enter a configurable recovery queue.
- Leads handed to GHL do not return to general lead pools without manager review.

---

## 16. Stripe and Payment Event Integration

### 16.1 Stripe responsibilities
Stripe payment events drive:
- Payment success
- Payment failure
- Refunds
- Partial refunds
- Disputes
- Dispute outcomes
- Subscription payment events where used

### 16.2 Webhook requirements
- Verify webhook signatures.
- Store event IDs for idempotency.
- Never process the same event twice.
- Queue processing.
- Keep a sanitized event record for support.
- Surface integration errors to admins.
- Allow safe retries.
- Do not create duplicate commissions on retry.

### 16.3 Required event categories
Actual event list depends on final Stripe implementation, but the architecture must support:
- Successful payment
- Failed payment
- Invoice/payment failure
- Refund created/updated/failed
- Charge/refund outcome
- Dispute created
- Dispute closed/won/lost
- Subscription/payment status change

---

## 17. Commission and Residual Engine

### 17.1 Commission concepts
The system must support:
- Initial sale commission
- Monthly residual commission
- Annual upfront commission
- Renewal commission
- Service fee/split commission
- House Account residual
- Transfer split
- Clawback
- Refund reversal
- Chargeback reversal

### 17.2 Contract types

```text
MONTHLY_RECURRING
ANNUAL_PREPAID
ANNUAL_INSTALLMENT
ONE_TIME_PAYMENT
CUSTOM_PAYMENT_PLAN
```

### 17.3 Separate originator from servicing owner
Every client account stores:

```text
originating_agent_id
servicing_agent_id
house_account_id
```

Definitions:
- **Originating agent:** The person historically credited with sourcing/booking/closing the account. This is permanent historical attribution.
- **Servicing agent:** The person currently responsible for meaningful account activity, issues, retention, and renewals.
- **House Account:** A real internal account holder that can own current servicing and future revenue rights after a transition.

### 17.4 Monthly residual logic

```text
Client payment clears
  → verify active eligible client
  → apply commission-plan version
  → create payment-specific commission ledger entries
  → place in applicable hold period
  → commission becomes eligible for finance approval
  → payout is executed through approved process
```

Calculate commissions from actual eligible collected payment amounts, not from invoices merely sent or subscriptions merely created.

### 17.5 Annual prepaid logic

```text
Annual contract payment clears
  → detect ANNUAL_PREPAID
  → calculate upfront commission under assigned plan
  → create commission record
  → apply hold/refund/dispute rules
```

The plan determines whether annual commission is upfront, spread, or partly held.

### 17.6 Commission statuses

```text
PENDING
EARNED
ON_HOLD
ELIGIBLE_FOR_PAYOUT
APPROVED
PAID
PARTIALLY_REVERSED
REVERSED
FORFEITED
```

### 17.7 Refund/dispute rules

```text
Refund created
  → affected commission moves ON_HOLD

Refund succeeds
  → PARTIALLY_REVERSED or REVERSED according to plan

Refund fails
  → restore prior eligible status

Dispute created
  → affected commission moves ON_HOLD

Dispute won
  → restore prior eligible status

Dispute lost
  → PARTIALLY_REVERSED or REVERSED
```

Do not automatically claw back a commission just because a dispute opens. Put it on hold until outcome.

### 17.8 Commission plan versioning
Each ledger entry must record:
- Commission plan ID
- Commission plan version
- Rule ID
- Eligible payment amount
- Rate/flat amount
- Commission amount
- Beneficiary
- Effective date
- Hold period
- Reversal reason if applicable

Historical payments must never be recalculated by a new commission plan unless a finance override is explicitly approved and logged.

### 17.9 Payout safety
Version 1 rule:

> The system may calculate commissions automatically, but must not automatically send payouts without Finance approval.

---

## 18. Agent Departure, Retirement, Termination, and House Account

### 18.1 Agent statuses

```text
ACTIVE
ON_LEAVE
SUSPENDED
RETIRED_VESTED
DEPARTED_GOOD_STANDING_SERVICING
DEPARTED_GOOD_STANDING_NO_SERVICE
TERMINATED_WITHOUT_CAUSE
TERMINATED_FOR_CAUSE
DEACTIVATED
```

### 18.2 Good-standing departure with client servicing
If an agent leaves on good terms and wishes to continue servicing their existing client accounts:

```text
Status → DEPARTED_GOOD_STANDING_SERVICING
Originating agent → preserved
Servicing agent → former agent
Future residuals → continue under assigned plan
Access → restricted to their retained client accounts and service workflow
No access → open lead pools, new lead claims, other agents, broad reporting
```

Requirements:
- Former-agent servicing agreement signed.
- Continued confidentiality and data-security obligations.
- Required response to meaningful client events.
- System use only through authorized account.
- Compliance and communication standards remain in force.
- Ability to audit performance and revoke servicing rights for cause.

### 18.3 Good-standing departure without servicing
If the agent does not want to manage their accounts:

```text
Status → DEPARTED_GOOD_STANDING_NO_SERVICE
Originating agent → preserved historically
Servicing agent → House Account or approved successor
Future residual rights → transfer to House Account effective on transition date
```

The transfer must include:
- Effective date
- Reason
- Accounts transferred
- Open issues
- Upcoming renewals
- Last contact
- Next required actions
- Approver
- Commission impact

### 18.4 Retirement
Retired agents continue collecting commissions under approved retirement policy.

Design requirements:
- Retirement is an approval workflow, not self-service.
- Preserve originating attribution.
- Record effective retirement date and signed acknowledgement.
- Define whether servicing remains with retired agent, successor, or House Account.
- Preserve vested residual entitlement according to the applicable plan and agreement.
- Restrict system access according to whether they retain servicing responsibility.

### 18.5 Termination for cause
For an agent terminated for cause:

```text
Future residual rights → FORFEITED effective per approved policy
Servicing ownership → House Account or reassigned agent
Original attribution → preserved historically
Past paid commissions → remain in audit history
Already-earned unpaid commissions → handled under signed agreement, policy, and legal review
```

### 18.6 House Account
House Account is a real internal entity with:
- House Account ID/name
- Assigned manager
- Finance owner
- Client count
- Revenue
- Residual revenue
- Transfer reason
- Transfer history
- Current service tasks
- Reassignment ability

Transfer reasons:
```text
AGENT_RETIRED
AGENT_RESIGNED
AGENT_TERMINATED
AGENT_SUSPENDED
AGENT_INACTIVE
CLIENT_REQUESTED_REASSIGNMENT
SERVICE_FAILURE
COMPLIANCE_REVIEW
MANAGER_REASSIGNMENT
```

### 18.7 Earned vs future commission
The system must distinguish:
- **Already earned commission:** Payment occurred before the transition/termination effective date and met plan rules.
- **Future residual commission:** Payment occurs after the transition/termination effective date.

Do not overwrite past ledger history when future rights change.

---

## 19. Client Transfer and Split Commission Support

The CRM must support:
1. Original agent keeps full residual while another person services.
2. Original agent and servicing agent split residual.
3. Servicing agent receives a fixed service fee.
4. House Account receives future residual after transfer.
5. Retired agent receives vested residual while House Account services.

Every split must be versioned with:
- Effective date
- Originating beneficiary
- Servicing beneficiary
- House beneficiary if any
- Commission rate or flat amount
- Transfer reason
- Approver
- Related agreement/policy version

---

## 20. Commission Ledger

Each eligible payment produces its own ledger entries.

Required fields:

```text
commission_ledger_id
client_account_id
lead_id
payment_id
invoice_id
originating_agent_id
servicing_agent_id
beneficiary_account_id
commission_type
commission_plan_id
commission_plan_version
gross_payment_amount
eligible_payment_amount
commission_rate
commission_amount
commission_status
earned_at
hold_until
approved_at
paid_at
reversal_amount
reversal_reason
transfer_reason
```

Finance screens must show:
- Pending earnings
- Hold periods
- Payout eligibility
- Approved payouts
- Paid payouts
- Refund/dispute exposure
- Negative balances
- Reversals
- House Account revenue
- Former-agent and retired-agent obligations

---

## 21. Audit Log

Every sensitive action must create an audit record:

```text
audit_id
actor_user_id
actor_role
action_type
entity_type
entity_id
before_value
after_value
reason
timestamp
ip_address
device_metadata
```

Required audits:
- Lead claim/release/reassignment
- Suppression/DNC action
- Campaign enrollment/removal
- Agent approval/status change
- Document access
- Commission change/payout approval
- Client transfer
- House Account transfer
- Integration retry/failure resolution
- Role/permission changes
- Export attempts
- Settings changes
- Manager overrides

---

## 22. Notifications and Alerting

### 22.1 Agent notifications
- New Hot lead
- Hot-lead SLA at risk
- Callback due
- Callback overdue
- Positive reply assigned
- Client service task due
- Client issue assigned
- Payment failure tied to their client
- Renewal task due
- Commission earned/on hold/approved/paid
- Account reassigned

### 22.2 Admin/manager notifications
- Unclaimed Hot leads
- Repeated SLA breaches
- Campaign bounce/spam issue
- Scraper failure
- Import validation failure
- Integration failure
- Payment dispute
- Refund
- Client cancellation request
- Service tasks overdue
- Agent transition/offboarding action required
- Commission payout awaiting approval

Notification channels can include in-app first, with email/Slack later if added.

---

## 23. Reporting

### 23.1 Agent reporting
- Calls initiated
- Dispositions completed
- Contact rate
- Reply response time
- Callbacks due/completed/overdue
- Demos booked
- Booking-to-show rate
- Show-to-close rate when available
- Active paying clients
- At-risk accounts
- Service response metrics
- Monthly residuals
- Pending/paid/on-hold commissions

### 23.2 Manager reporting
- Team lead inventory
- Pool utilization
- Claim-to-action time
- SLA compliance
- Agent capacity
- Conversion metrics
- Campaign reply routing performance
- Client account health
- Retention/churn indicators
- House Account workload
- Former agent servicing status
- Commission liability

### 23.3 Finance reporting
- Collected revenue by period
- Monthly recurring revenue
- Annual prepaid revenue
- Commission earned
- Commission on hold
- Payout liability
- Refund/chargeback exposure
- Clawbacks/reversals
- House Account revenue
- Retired/former-agent commission obligations

---

## 24. UI/UX Standards

### 24.1 General design
- Dark theme, modern, fast, low-clutter.
- High contrast for important warnings and primary actions.
- Mobile-first for agents; desktop-first depth for admin operations.
- Avoid giant spreadsheet experiences for agent workflow.
- Use progressive disclosure: agents see what they need now; admins can drill deeper.
- Every table needs search, filters, saved views, sorting, and clear empty states.
- Every critical action needs feedback and undo/review where appropriate.
- No silent failure.

### 24.2 Color and status approach
Use semantic status treatments consistently:
- Urgent / Hot / overdue
- Success / completed / paid
- Warning / at-risk / on hold
- Error / failed / suppressed
- Neutral / inactive / archived

Do not rely on color alone; always pair status with text/iconography.

### 24.3 Empty states
Every key screen needs helpful empty states, such as:
- “No Hot leads right now. Complete your callbacks or claim a Nurtured batch.”
- “No client issues assigned. Your healthy accounts need no action.”
- “No payout items awaiting approval.”
- “No imported leads need review.”

### 24.4 Error states
Examples:
- Lead just claimed by another agent.
- Campaign event provider unavailable.
- GHL sync pending/retry.
- Stripe event received but account link missing.
- Agent at capacity.
- Contact is suppressed.
- Action is outside configured outreach window.
- Permission denied.

---

## 25. System Settings and Configurability

The following must be configurable without code changes:
- Lead claim capacity by pool
- Claim/return SLAs
- Business hours/outreach windows
- Time-zone rules
- Agent availability states
- Campaign sending windows
- Lead scoring weights
- Lead validation thresholds
- Commission plans and versions
- Hold periods
- Refund/dispute treatment
- Payout schedules
- House Account owners
- Service SLAs
- Notification preferences
- Role permissions
- Integration keys/configuration
- Feature flags
- Retention and document policies

---

## 26. Delivery Phases

### Phase 1 — Core CRM and Control Layer
- Authentication, roles, permissions
- Agent onboarding/review
- Private document storage
- Lead import/review
- Lead pools
- Atomic claims
- Agent dashboard
- Call initiation/disposition/notes/callbacks
- Admin Command Center
- Suppression/DNC controls
- Audit logs
- Basic GHL demo handoff
- Basic Stripe payment link/event handling
- Commission ledger foundation
- House Account entity

### Phase 2 — Revenue and Client Service Layer
- Client account module
- Residual/annual commission logic
- Refund/dispute hold/reversal logic
- Former-agent/retirement workflows
- Client transfer and split commissions
- Client health/service tasks
- Finance approval/payout batches
- Detailed reporting

### Phase 3 — Campaign and Scale Layer
- Scraper UI and worker management
- Advanced validation/enrichment
- Mailjet/Sequenzy campaign integration
- Reply Triage
- Advanced routing
- Dashboard enhancements
- Admin error queue
- Saved views and exports
- Notification integrations

### Phase 4 — Intelligence Layer
- Optional Neo4j relationship graph
- Lead recommendation engine
- Predictive lead scoring
- AI activity summaries
- Coaching insights
- Churn/retention signals
- Advanced forecasting

---

## 27. Developer Deliverables

Before production launch, require:
1. Information architecture and site map.
2. Screen-by-screen wireframes.
3. Visual design system and component library.
4. PostgreSQL schema and migrations.
5. Role/permission matrix.
6. API contract documentation.
7. Webhook event contract documentation.
8. Integration configuration guide.
9. Seed data for realistic testing.
10. Test-mode Stripe integration.
11. GHL test environment or sandbox plan.
12. Automated test suite for critical workflows.
13. Admin error queue.
14. Deployment runbook.
15. Backup/recovery plan.
16. Security review checklist.
17. Launch checklist and rollback plan.

---

## 28. Required Acceptance Tests

### Lead ownership
- Two agents claim the same lead at the same time.
- Only one claim succeeds.
- The losing agent receives a clear message and next action.
- No duplicate owner or activity state is created.

### Lead expiration
- Hot lead returns to pool after SLA miss.
- Nurtured/Cold lead return rules work.
- Callback prevents return until callback time.
- Manager-approved hold prevents auto-return.
- All transitions are audited.

### Compliance
- DNC/suppressed lead cannot be claimed or campaign-enrolled.
- Unsubscribe stops future campaign activity.
- Duplicate import is flagged.
- Out-of-window action is blocked/warned.
- Compliance manager can view evidence and history.

### Agent experience
- Call initiation is logged.
- Disposition/notes are required.
- Callback creates reminders.
- Agent only sees permitted records.
- Agent cannot overclaim beyond capacity.
- Agent sees clear empty/error states.

### GHL and Stripe
- Demo booking creates/updates required GHL records.
- Rescheduled appointment does not erase attribution.
- Duplicate Stripe webhook creates no duplicate commission.
- Refund puts affected commission on hold/reverses as configured.
- Dispute puts commission on hold.
- Won dispute restores status.
- Failed integration appears in error queue and can be retried safely.

### Residuals and account transfers
- Monthly payment creates residual ledger entry.
- Annual prepaid payment creates upfront ledger entry.
- Healthy paying account requires no forced activity.
- Client issue creates service task and SLA.
- Good-standing former agent retains account/service access only to approved clients.
- Former agent who declines service transfers accounts to House Account.
- Retired agent policy preserves approved residuals.
- Termination-for-cause transfer moves future rights to House Account.
- Historical attribution never disappears.
- Split commission is applied prospectively from effective date.

---

## 29. Policy and Legal Review Checklist

Before launch, put the following in signed agent agreements, commission plans, and internal policies:
- Definition of initial sale, monthly residual, annual upfront commission, renewal commission, and service fee.
- Payment eligibility requirements.
- Hold periods and payout schedules.
- Refund, dispute, chargeback, downgrade, and cancellation treatment.
- Retirement eligibility and vested residual rules.
- Good-standing departure servicing obligations.
- Rules for voluntary departure without servicing.
- Termination-for-cause future commission forfeiture.
- Treatment of already-earned but unpaid commissions.
- Client transfer and House Account rules.
- Servicing standards and response obligations.
- Data access after departure.
- Audit rights and compliance obligations.
- Dispute resolution and exception approval process.

Have qualified legal/compliance counsel review all final compensation, outreach, privacy, contractor, and termination policies before launch.

---

## 30. Final Product Definition

The product succeeds when:

```text
An agent opens the app and instantly knows:
- what to do next,
- why it matters,
- what has already happened,
- what to say,
- what to document,
- and when to follow up.

A manager can instantly know:
- where every lead came from,
- who owns it,
- whether it was worked,
- whether it was worked correctly,
- whether a demo was booked,
- whether payment happened,
- who currently services the client,
- and who is entitled to each commission payment.

Finance can instantly know:
- what revenue was collected,
- what commissions are earned,
- what is on hold,
- what has been reversed,
- what must be paid,
- and why.
```

This is the standard to build toward: a secure, auditable, high-velocity sales and client-retention operating system for Mercury Call Desk.


---

# PART B — GHL BACKEND, FUNDING RELAY, EMAIL & RECOMMENDATIONS (v1.1)

*Added 2026-06-29. Part B is the operating layer that connects GoHighLevel to the Mini CRM. It assumes the confirmed environment: GoHighLevel Agency (Unlimited/Pro) with API v2 + Private Integration Tokens, one GHL sub-account (location) per client, Stripe already connected inside GHL, and agents who must never receive a GHL login.*

---

## 31. GHL Backend Architecture and Isolation Model

### 31.1 The core rule
GoHighLevel is a **backend event source only**. Data flows **one direction by default: GHL → Mini CRM**. Agents never see GHL. The Mini CRM is the only surface agents touch. This is what protects:
- Your other clients living in other GHL sub-accounts.
- Your true (wholesale) pricing versus the set partner pricing agents are allowed to quote.
- Your full pipeline, automations, and internal notes.

### 31.2 Why "sub-account per client" is the right structure
Because each client is an isolated GHL location, the Mini CRM can subscribe to events **per location** and map them to the correct `client_account`. No client data bleeds across boundaries, and a compromised or curious agent has no path into the GHL UI at all — they only ever receive the specific, filtered records the Mini CRM chooses to show them.

### 31.3 Connection methods (use both, for different jobs)
```text
1. Private Integration Token (API v2)  — Mini CRM → GHL for controlled reads/writes
   (create contact/opportunity/appointment at demo handoff; read current state on demand).
   Scope tokens to the minimum required. Store in the secret manager, never client-side.

2. Workflow Custom Webhook (Outbound)  — GHL → Mini CRM for real-time events
   (appointment booked/confirmed/no-show, opportunity stage change, invoice paid,
    payment failed). Fires the instant the event happens; lands on a Mini CRM endpoint.

3. (Optional later) Marketplace App + OAuth — only if you productize this across many
   agencies. Not needed for a single-agency launch.
```

### 31.4 Direction-of-truth, restated for GHL
| Data | Flows | System of record |
|---|---|---|
| Demo booking request (pre-demo) | Mini CRM creates in GHL | Mini CRM until booked, then GHL owns the calendar event |
| Booked-demo calendar + post-demo opportunity stages | GHL → Mini CRM (events) | GHL |
| Invoice / package / payment-link state | GHL → Mini CRM (events) | GHL (mirrored to Mini CRM) |
| Funded / continues-to-fund status | Stripe → GHL → Mini CRM | Stripe (origin) via GHL relay |
| Commission ledger | derived in Mini CRM from funded events | Mini CRM |

### 31.5 Hard isolation guardrails
- The Mini CRM **never** renders a GHL URL, GHL contact link, or GHL pricing to an agent.
- Inbound webhooks are validated by a shared secret/signature and an allow-list of known location IDs.
- The Private Integration Token is held only by the server/worker layer.
- All GHL-originated writes back to GHL (rare) require an explicit permission and are audited.

---

## 32. GHL → Mini CRM Event Catalog and Webhook Contracts

### 32.1 Events the Mini CRM must receive from GHL
Configure a GHL workflow Custom Webhook (Outbound) for each, per client sub-account (or one master workflow if you operate from a shared location):

```text
APPOINTMENT_BOOKED         → confirm DEMO_BOOKED, store GHL appointment + contact IDs
APPOINTMENT_CONFIRMED      → update booking status
APPOINTMENT_RESCHEDULED    → update time, preserve original booking-agent attribution
APPOINTMENT_CANCELLED      → move lead to recovery queue (configurable)
APPOINTMENT_NO_SHOW        → recovery queue + agent notification
APPOINTMENT_COMPLETED      → demo done; ready for opportunity/close tracking
OPPORTUNITY_STAGE_CHANGED  → mirror stage to Mini CRM client/lead timeline
INVOICE_CREATED / SENT     → mirror invoice reference (no $ to agents beyond set pricing)
INVOICE_PAID               → candidate funding event (validated in §33)
PAYMENT_FAILED             → account health → PAYMENT_FAILED, servicing task + alert
REFUND / DISPUTE relayed   → see §33; commission goes ON_HOLD, never auto-clawback
```

### 32.2 Inbound endpoint requirements (Mini CRM side)
Mirror the same discipline the scope already requires for Stripe (§16.2):
- Verify a shared secret / signature header on every inbound webhook.
- Store the GHL event/delivery ID for **idempotency** — never process the same event twice.
- Queue processing; do not block the request thread.
- Map `location_id → client_account` and `contact_id → lead/client`.
- On unmatched IDs, write to an **integration error queue** (admin-visible) rather than failing silently.
- Use GHL's **Webhook Logs dashboard** plus your own error queue to reconcile retries.

### 32.3 Minimum link records to persist
```text
ghl_links:
  client_account_id, location_id, ghl_contact_id, ghl_opportunity_id,
  ghl_appointment_id, last_event_type, last_event_at, raw_event_ref
```
This satisfies the scope's permanent-lineage requirement (§7.2) for GHL.

---

## 33. Stripe → GHL → Mini CRM Funding Relay (answers "did the deal fund / keep funding?")

### 33.1 Your decision, implemented
You asked to keep funding status flowing **from Stripe, through GHL, into the Mini CRM**, without re-plumbing Stripe. Stripe is **already connected inside GHL**, so the Mini CRM does **not** need its own direct Stripe integration in v1. Instead:

```text
Stripe charges/funds the client
  → Stripe notifies GHL (native GHL ↔ Stripe connection)
  → GHL workflow fires on "Payment Received" / "Invoice Paid" (and failure/refund)
  → GHL Custom Webhook posts a FUNDING event to the Mini CRM
  → Mini CRM verifies idempotency, marks the payment funded,
    and the commission engine (§17) creates the ledger entry from the
    ACTUAL collected amount — not from an invoice merely sent.
```

### 33.2 What rides on the funding webhook
```text
event_type:        FUNDED | FUNDING_FAILED | REFUND | DISPUTE
location_id, ghl_contact_id, ghl_opportunity_id
invoice_id / payment_ref (GHL's reference to the Stripe object)
amount_collected, currency
contract_type hint (monthly / annual) if available
occurred_at
```

### 33.3 Recurring funding ("continues to get funded")
For monthly/annual recurring clients, **each successful recurring charge** must fire its own FUNDED event so the Mini CRM can:
- Create a new monthly residual ledger entry per §17.4.
- Keep `client_health.last_successful_payment` current.
- Leave healthy paying accounts alone (no forced activity, per §12.3).

Set the GHL recurring workflow to fire on every successful payment, not just the first.

### 33.4 One reconciliation caveat (recommended, not required for v1)
Relaying through GHL is clean and keeps Stripe untouched. The one risk is that a relay can drop or double-fire. Mitigate with: idempotency keys (§32.2), the integration error queue, and a **monthly finance reconciliation report** that compares Mini CRM funded events to GHL's invoice list. If commission accuracy ever needs to be b/ audit-grade, add a **read-only** Stripe verification later (Phase 2/3) that confirms each relayed FUNDED event against the Stripe charge — without moving Stripe's role as event origin. This stays consistent with the scope's "calculate automatically, never auto-pay without Finance approval" rule (§17.9).

### 33.5 Refund / dispute behavior (unchanged logic, new source)
Refund and dispute events relayed from GHL follow §17.7 exactly: affected commission moves **ON_HOLD**, never auto-clawed-back, and resolves to REVERSED / restored on outcome.

---

## 34. Agent Attribution Without GHL Logins (answers "should I set up each user in GHL as a staff member?")

### 34.1 Short answer: no
**Do not create a GHL staff/user login for each agent.** A GHL user login is exactly the access you are trying to prevent — even with reduced permissions, a logged-in GHL user can see the sub-account, calendars, pricing, and other records. It also costs you seats and creates an offboarding headache. Agents live **only** in the Mini CRM.

### 34.2 How agents still get correctly credited
Represent each agent in GHL as **data, not a login**:
```text
On demo handoff, the Mini CRM (via API v2) stamps the GHL contact/opportunity with:
  custom field  mini_crm_agent_id     = the agent's Mini CRM ID
  custom field  mini_crm_agent_name   = display name (for your own readability)
  custom field  originating_agent_id  = permanent source credit
  custom field  lead_source / pool / score (per §15.2 of v1.0)
```
Every GHL event webhook echoes these custom fields back, so the Mini CRM always re-attaches the event to the right agent and `client_account` — with zero GHL seats consumed.

### 34.3 If GHL requires an "assigned user" (e.g. for round-robin calendars)
Use a **small pool of internal/service users you control** (e.g. one per manager or a single "Mercury Booking" service user), not one per agent. The real attribution always lives in the Mini CRM custom fields above. This keeps calendars working without exposing agents to GHL.

### 34.4 Net effect
- Agents: Mini CRM only. No GHL login, ever.
- Attribution: permanent and accurate via custom fields.
- Cost: no per-agent GHL seat.
- Offboarding (§18): handled entirely in the Mini CRM; nothing to revoke in GHL.

---

## 35. Dedicated Email / Calendar Account — Decision and Steps

### 35.1 Decision: yes, create a dedicated account before building
Today GHL's calendar and email run off your **personal** `hpintojr@gmail.com`. Move Mercury Call Desk onto its own identity **now**, before this CRM is built on top of it. Reasons:
- Single point of failure: if your personal account has an issue, the company calendar/integration breaks.
- Delegation: a manager or VA can be given access to a company mailbox without touching your personal life.
- Compliance/audit: the scope cares about auditable, role-based access — a shared personal Gmail undercuts that.
- Clean separation: company booking confirmations, GHL system mail, and client replies stop mixing with personal mail.

### 35.2 Use Google Workspace, not free Gmail
A free `mercurycalldesk@gmail.com` works, but **Google Workspace on your mercurycalldesk.com domain** is the better foundation:
- Professional `you@mercurycalldesk.com` addresses and shared mailboxes.
- Admin console to add/remove staff, enforce 2FA, and retain/audit mail.
- Better deliverability with proper SPF/DKIM/DMARC (the same lesson from the Benny project's email deliverability work).
- Calendars and contacts you own at the org level, not tied to one person.

### 35.3 Migration steps (no lost bookings)
```text
1. Stand up Google Workspace on mercurycalldesk.com; create:
   - mercurycalldesk@ (or admin@) primary
   - booking@ or hello@ for client-facing confirmations
2. Set SPF, DKIM, DMARC DNS records for mercurycalldesk.com.
3. In GHL, add the new Workspace account as a calendar/email integration
   ALONGSIDE the existing personal one (do not remove the old one yet).
4. Re-point the booking calendar(s) to the new account; send a test booking
   and confirm the event + confirmation email land on the new account.
5. Migrate any future-dated appointments to the new calendar (export/import or
   re-create), verify each shows in GHL.
6. Once verified, remove hpintojr@gmail.com from GHL integrations.
7. Update the Mini CRM's outbound/one-to-one mail + notification "from" identity
   to the new account (ties into the Mailjet/Sequenzy provider abstraction in §14).
```

### 35.4 Keep it consistent with the scope
The Mini CRM still sends campaign mail through Mailjet/Sequenzy (§14) and company 1-to-1 mail through the controlled mailbox (the scope's IONOS note — here, Workspace). The dedicated account is the **identity**, not the bulk-campaign engine.

---

## 36. Recommended Enhancements (best-user-experience additions)

These are additions on top of your v1.0 — each is optional but raises the product quality.

### 36.1 Agent experience
1. **"Next Best Action" engine, surfaced as one button.** Your §11.2 dashboard lists many widgets; add a single, server-decided primary CTA at the very top ("Call this Hot lead now") so the agent never has to choose. The list stays below as context.
2. **Set-pricing guardrail in the UI.** Since true pricing is hidden, give agents an approved **price/quote builder** that can only render the set partner pricing, with the package options that GHL will actually invoice. Prevents a mis-quote and reinforces the isolation model.
3. **Live booking status on the lead card.** When GHL relays APPOINTMENT_CONFIRMED / NO_SHOW, reflect it on the agent's Bookings view in near real time so they chase no-shows fast (recovery queue, §15.4).
4. **Disposition + next action enforced as one modal** (you require this in §11.4) — add quick-pick reasons and a one-tap "schedule callback" to keep call wrap-up under ~10 seconds on mobile.
5. **Offline-tolerant mobile PWA** for click-to-call: queue the disposition if signal drops mid-call, sync when back.

### 36.2 Admin / manager experience
6. **GHL integration health tile** on the Command Center (§13.2): last event received per client, failed webhooks, unmatched location IDs — so a broken relay is visible in seconds, not at payout time.
7. **Funding reconciliation widget**: Mini CRM funded events vs GHL invoices for the month, with a one-click "investigate mismatch."
8. **Attribution audit view**: for any client, show originating agent, current servicing owner, and every transfer — sourced from the lineage fields (§7.2) and GHL custom fields (§34.2).

### 36.3 Architecture / safety
9. **Webhook replay tooling**: store raw GHL payloads (sanitized) so a failed event can be safely re-processed from the error queue (§13 admin error queue is already in your deliverables list).
10. **Per-location secret rotation**: each client sub-account webhook uses its own signing secret, rotatable without touching others.
11. **Event versioning**: stamp each inbound contract with a version so future GHL payload changes don't silently break parsing.
12. **Sandbox path**: build against a GHL test sub-account and Stripe test mode (already in §27 deliverables) before pointing at live client locations.

### 36.4 Commission integrity (ties your two questions together)
13. Because funding now arrives via GHL relay (§33) and attribution via custom fields (§34), make the **commission ledger entry carry both** `ghl_opportunity_id` and the relayed `payment_ref`. That gives Finance a clean line from "agent → booked demo → funded payment → commission" without anyone opening GHL.

---

## 37. GHL-Specific Acceptance Tests (add to §28)

```text
GHL handoff
- Booking a demo in the Mini CRM creates the GHL contact + opportunity + appointment
  and stamps mini_crm_agent_id; the IDs are stored in ghl_links.
- A reschedule in GHL updates the time in the Mini CRM and preserves original booking credit.
- A no-show relays to the Mini CRM and drops the lead into the recovery queue.

Funding relay
- A successful Stripe charge relays through GHL and creates exactly one FUNDED event
  and one commission ledger entry (no duplicate on webhook retry).
- A second monthly recurring charge creates a second residual entry.
- A refund relayed from GHL moves the affected commission ON_HOLD (no auto-clawback).
- A failed payment sets account health = PAYMENT_FAILED and creates a servicing task.

Isolation
- No agent-facing screen can render a GHL link, GHL pricing, or another client's data.
- An inbound webhook with a bad signature or unknown location_id is rejected to the
  error queue, not processed.
- No GHL staff login exists for any agent; attribution still resolves correctly via
  custom fields.
```

---

*End of Part B. Developer-level webhook payloads, field maps, and endpoint specs are in the companion file `[C] GHL Backend Integration Spec.md`.*
