# MCD CRM — Lead Pool and Source Taxonomy

**Status:** Locked operating taxonomy for the controlled Lead Management build  
**Project:** MCD CRM — Agent and Admin Portals  
**Last updated:** 2026-07-02

## Purpose

Lead pool, lifecycle, ownership, acquisition source, campaign, and engagement channel are separate concepts. Do not overwrite one to represent another.

Example:

```txt
A business scraped from Google Maps
→ original source: Google Maps
→ enters: Cold Pool / Prospects
→ enrolled in: branded email campaign
→ current pool: Nurture / Marketing Email Pool
→ replies: current pool becomes Hot Leads

The original source remains Google Maps throughout.
```

## 1. Canonical acquisition source

Every new lead must receive one immutable `originalSource` value at creation. A lead's source is the first known acquisition origin, not the latest marketing touch.

| Stored value | Display label | Use when |
|---|---|---|
| `GOOGLE_MAPS` | Google Maps | Business was sourced from a Google Maps / Google Business Profile search or export. |
| `INSTAGRAM` | Instagram | Business or decision-maker was sourced through Instagram. |
| `REFERRAL` | Referral | Lead was introduced by a customer, partner, agent, employee, vendor, or other referrer. |
| `PPC` | PPC | Lead was generated through a paid-per-click or paid social campaign. |
| `EMAIL` | Email | Lead originated from an email response, email list, email introduction, or manually entered email conversation not attributable to another original source. |
| `SMS` | SMS | Lead originated from an SMS response, SMS campaign, or manually entered SMS conversation not attributable to another original source. |
| `LINKEDIN` | LinkedIn | Business or decision-maker was sourced through LinkedIn. |
| `WEB_FORM` | Web Form | Lead submitted a website, landing-page, or embedded form without a stronger attributable source. |
| `FACEBOOK` | Facebook | Business or decision-maker was sourced through Facebook, including organic page/message activity. |
| `OTHER` | Other | Use only when no approved source fits. `sourceDetail` is required. |

## 2. Required attribution fields

The lead record must preserve the acquisition record, not only a source label.

```txt
originalSource           required enum at creation; immutable after first save
sourceDetail             optional short text; required when originalSource = OTHER
sourceCapturedAt         timestamp when source was recorded
sourceRecordUrl          original Google Maps listing, profile, ad/landing URL, form URL, or similar reference
campaignName             campaign / sequence / list / ad-set / outreach batch name
campaignExternalId       provider campaign, ad, form, sequence, or list identifier when available
intakeMethod             SCRAPE_IMPORT | WEB_FORM_SUBMISSION | DIRECT_MESSAGE | MANUAL_ENTRY | API_IMPORT | REFERRAL_ENTRY
referrerName             required for Referral when known
referrerType             CUSTOMER | PARTNER | AGENT | EMPLOYEE | VENDOR | OTHER
referrerLeadId           optional internal reference when the referrer is an existing lead/client
utmSource                preserve where form or paid media data provides it
utmMedium
utmCampaign
utmContent
utmTerm
```

Do not put campaign copy, full message bodies, credentials, or sensitive information into source fields.

## 3. Attribution precedence

Use the strongest known attribution at lead creation:

```txt
1. Referral with known person/entity → REFERRAL
2. Paid campaign with usable campaign/UTM data → PPC
3. Organic platform discovery → GOOGLE_MAPS / INSTAGRAM / LINKEDIN / FACEBOOK
4. Direct reply or imported contact not attributable to a platform → EMAIL or SMS
5. Unattributed inbound submission → WEB_FORM
6. Only when none fit → OTHER with required detail
```

A paid ad that submits through a website form is recorded as:

```txt
originalSource = PPC
intakeMethod = WEB_FORM_SUBMISSION
campaign/UTM = preserved
```

A Google Maps prospect who later replies to email is recorded as:

```txt
originalSource = GOOGLE_MAPS
intakeMethod = SCRAPE_IMPORT
campaign = email sequence name
currentPool = HOT_LEADS after reply
```

## 4. Lead pools and lanes

Pools represent where the lead belongs operationally now. They do not replace source.

| Pool / lane | Definition | Operating rule |
|---|---|---|
| **Cold Pool / Prospects** | Fresh scraped or validated business prospects not yet in nurture and without documented two-way contact. | Company-owned records. Controlled import, assignment, DNC/suppression, and activity logging are required. |
| **Nurture / Marketing Email Pool** | Prospects in authorized branded email outreach or nurture. | Delivery or open activity alone does not create a Hot Lead. Synchronize opt-outs and suppression. |
| **Hot Leads** | Prospect replied to a branded email, SMS, form follow-up, or otherwise demonstrated active intent. | Stop automated nurture where appropriate, notify/route sales, preserve source + campaign lineage, and require prompt human follow-up. |
| **Open Pool** | Booked-demo no-shows plus records eligible for controlled release. | Qualifying agents may claim under the governed first-come process. |
| **Shark Tank** | Stalled prospects with an active proposal or contract-priced quote. | Active quote window is generally 30–90 days. Keep record in Shark Tank while quote remains active; apply approved closer/sign-first rule. |
| **Referral** | Protected self-sourced/referral record. | Preserve referrer attribution; do not place in Open Pool or Shark Tank through routine reassignment. |
| **House** | Company-controlled/reassigned record. | Mercury Call Desk may move the account to House under approved business terms. |

## 5. Lifecycle and pool movement examples

```txt
Google Maps → Cold Pool → Nurture / Marketing Email Pool → Hot Leads → Demo Booked → Proposal → Shark Tank → Won / Lost

PPC → Web Form intake → Hot Leads → Demo Booked → Proposal → Won / Lost

Referral → Referral → Demo Booked → Proposal → Won / Lost

Booked demo → No-show → Open Pool (only after the governed release rule is met)
```

## 6. Non-negotiable controls

- `originalSource` remains immutable after the lead is created. Corrections require an Admin-only audited correction action.
- Source, campaign, pool, owner, lifecycle, every claim, reassignment, release, no-show, proposal, quote-expiry, and suppression event must be auditable.
- DNC/opt-out blocks calls, SMS, sales email, marketing email, and social DMs. It does not erase source lineage.
- Referral source must never be overwritten by later campaign activity.
- A cold lead is protected only after documented two-way contact.
- Agents do not receive GHL access; source and pool controls live in MiniCRM.
- Do not activate live assignment, pool claims, marketing automation, or commission logic until schema migration and controlled test cases are approved.

## 7. Implementation scope

The Lead Management build should introduce:

```txt
- originalSource enum
- source detail and campaign/UTM attribution fields
- intake method
- current pool
- pool movement / source correction audit history
- source, pool, owner, lifecycle, and campaign filters in Admin
- source and pool visibility in Agent lead cards without exposing confidential campaign/provider credentials
- source performance reporting later: leads, replies, demos, proposals, wins, collected revenue, and commissionable revenue by source/campaign
```
