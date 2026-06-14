---
type: implementation-notes
project: Benny & Penny's Adventures
created: 2026-06-12
updated: 2026-06-14
status: active reference
---

# Implementation Notes — Contact Forms, Payload CMS, Product Catalog, Legal Pages, R2 Delivery

This file is a working implementation guide for recurring Benny & Penny website tasks.

## 1. Contact Form Requirement

### Desired Behavior

The Contact page must submit like a regular web form.

Flow:

```txt
Visitor fills out Contact form
→ visitor accepts required contact consent
→ visitor optionally opts in to email or SMS
→ visitor clicks Submit
→ form submits to a Next.js API route
→ server validates input
→ submission is saved to Payload CMS
→ consent events are logged in Consent Logs
→ notification email is sent to hello@bennyandpenny.com when Mailjet is configured
→ visitor sees an on-page success/error message
```

### Current Status

- The public form was changed away from `mailto:` behavior.
- `/api/contact` exists.
- Mailjet API integration exists.
- Contact submissions are saved to Payload `ContactSubmissions` when the schema is available.
- Contact form includes a phone field.
- Contact form includes required contact consent.
- Contact form includes optional email opt-in.
- Contact form includes optional SMS opt-in.
- SMS disclosure includes message frequency, message/data rates, STOP, HELP, and consent-not-required language.
- Contact submissions store consent proof fields.
- Contact form consent events are logged to `consent-logs`.

### Required Neon Patch

Before relying on stored contact consent records, run:

```txt
docs/CONTACT_OPT_IN_SCHEMA_PATCH.md
```

### Requirements Still Open

- Confirm Mailjet account/config works after deploy.
- Add spam protection, preferably Cloudflare Turnstile.
- Confirm consent records appear correctly in Admin.

## 2. Email List / Join List Requirement

Flow:

```txt
Visitor enters email
→ visitor checks required email opt-in box
→ form submits to server API route
→ server validates email and opt-in
→ subscriber is saved to Payload CMS Subscribers collection
→ email consent event is saved to Consent Logs
→ visitor is redirected to newsletter-specific thank-you copy
```

### Current Status

- Newsletter form submits to `/api/subscribe`.
- Subscriber records are saved to Payload `subscribers`.
- Newsletter form now requires an email opt-in checkbox.
- Newsletter signup API logs an `email-marketing` event to `consent-logs`.
- `/thank-you?email=...` now shows newsletter-specific copy instead of checkout/order copy.

### Requirements Still Open

- Confirm newsletter signup works after redeploy and Neon patch.
- Confirm Consent Logs record source, email, IP address, user agent, consent text, and related subscriber ID.
- Support CSV export later.
- Integrate or sync with Mailjet after account/config readiness.

## 3. Payload CMS Implementation Notes

### Current Status

Payload CMS is connected to Neon Postgres. Payload Admin works. Collection pages render. Books are seeded and public book pages read from Payload with fallback.

The old blocker is resolved:

```txt
Payload Admin sidebar rendered but collection panels were blank.
```

That was fixed by separating the public frontend layout from the Payload Admin layout:

```txt
app/(frontend)/layout.tsx = public site root layout
app/(payload)/layout.tsx = Payload Admin root layout
```

### Current Admin Dashboard State

Admin dashboard is now a custom dashboard connected to live Payload data.

Dashboard data sources:

```txt
orders
order-items
customer-addresses
subscribers
support-tickets
books
users
```

Dashboard sections:

- Total revenue.
- Orders.
- Items sold.
- Subscribers.
- Sales Performance graph.
- Database Health.
- Recent Orders.
- Latest Subscribers.
- System Status.

Sales graph behavior:

```txt
Today → hourly
Last 3 days → daily
Last 7 days → daily
Last 14 days → weekly
Last 30 days → weekly
Last 45 days → weekly
Last 60 days → weekly
Last 90 days → monthly
Last 120 days → monthly
This Past Year → monthly
```

Current custom admin sidebar:

```txt
Dashboard
Adventure Hub
Orders
Order Details
Customer Addresses
Subscribers
Support
Privacy Requests
Consent Logs
Settings
```

### Temporary Setup / Debug Routes

Temporary routes were created during bootstrapping and must be removed before launch:

- `/api/setup-payload`
- `/api/setup-payload-preferences`
- `/api/setup-payload-catalog`
- `/api/setup-payload-system`
- `/api/debug-books`
- `/api/debug-payload-books`

After removing them:

- Rotate/delete the setup secret.
- Replace temporary table repair logic with real migrations.

## 4. Books / Product Catalog Requirement

The public product pages depend on Payload-compatible book fields. The Books collection mirrors the product page model.

Required fields:

- number.
- slug.
- title.
- topic.
- ages.
- pages.
- badge.
- status.
- shortDescription.
- longDescription.
- coverImage.
- coverImagePath.
- pagePreviewOne.
- pagePreviewTwo.
- pdfPath.
- epubPath.
- audioPath.
- priceDigital.
- priceAudiobook.
- pricePaperback.
- priceHardcover.
- digitalDescription.
- audiobookDescription.
- paperbackDescription.
- hardcoverDescription.
- pdfObjectKey.
- epubObjectKey.
- audiobookObjectKey.
- stripeLookupKey.
- Stripe price IDs for each format.

Seeded products:

1. Home Infusion Day.
2. Port Adventure.
3. PICC Line Adventure.
4. Special Line Adventure.
5. MRI Adventure.
6. Hospital Sleepover.
7. Ambulance Adventure.
8. Surgery Day.
9. Lab Draw Adventure.

Public pages should load from Payload/Neon with local `lib/books.ts` fallback.

## 5. Privacy, TCPA, and State-Specific Legal Pages

### Current Pages

Legal/compliance pages currently include:

```txt
/privacy
/terms
/sms-terms
/privacy/california
/privacy/state-rights
/privacy/requests
```

Footer links include:

```txt
Privacy
California Notice
State Rights
Do Not Sell/Share
Terms
Messaging Terms
Contact
```

### Privacy Policy Covers

- Contact form submissions.
- Email signup information.
- Phone number if provided.
- Opt-in consent details.
- Purchase/order information handled through Stripe.
- Billing/shipping details.
- Ebook/audiobook download/access information.
- Email communications.
- SMS/Text Message opt-in.
- No sale of personal information.
- No sharing mobile opt-in/SMS consent for third-party marketing.
- Cookies/analytics caveat.
- Children's privacy position.
- State privacy rights links.

Children's privacy direction:

```txt
Benny & Penny's Adventures is created for families, parents, caregivers, and children, but the website, purchases, contact forms, and email signups are intended for use by adults. We do not knowingly collect personal information directly from children.
```

### Terms Cover

- Use of the website.
- Digital product purchases.
- PDF/EPUB delivery.
- Audiobook/audio delivery.
- Download limits.
- Print-on-demand order handling.
- Email/contact/SMS terms.
- Messaging Terms reference.
- Privacy and state rights references.
- Intellectual property / copyright.
- No unauthorized copying, sharing, resale, or redistribution.
- Contact email: `hello@bennyandpenny.com`.

### Open Legal Requirements

- Add real business mailing address / PO Box to marketing email templates before campaigns.
- Attorney review before accepting payments at scale or sending campaigns.
- Update policies if analytics, retargeting, Meta Pixel, Google Ads, or targeted advertising are added.

## 6. Privacy Request Form and Consent Logs

### Privacy Request Form

Working page:

```txt
/privacy/requests
```

Privacy request types:

- Access / Know.
- Delete.
- Correct.
- Do Not Sell or Share.
- Limit Sensitive Personal Information.
- Unsubscribe from Email.
- Opt Out of SMS.
- Other.

API route:

```txt
/api/privacy-request
```

Data should save to:

```txt
privacy-requests
```

The API also creates a related Consent Log event.

### Consent Logs

New Payload collection:

```txt
consent-logs
```

Consent Logs capture:

- Source.
- Consent type.
- Name.
- Email.
- Phone.
- Opt-in boolean.
- Consent text.
- Source path.
- IP address.
- User agent.
- Related collection.
- Related ID.
- Metadata.

Consent sources currently expected:

- `contact-form`
- `newsletter`
- `privacy-request`

Consent types currently expected:

- `contact-consent`
- `email-marketing`
- `sms`
- `privacy-request`

Required patch:

```txt
docs/PRIVACY_COMPLIANCE_SCHEMA_PATCH.md
```

## 7. PDF / EPUB / Audiobook Link Capabilities

Download limits and expiration should be controlled by the app, not by a permanent public link.

Recommended model:

```txt
Stripe purchase completed
→ app creates order/download access record in Payload
→ customer requests download
→ app checks access rules
→ if allowed, app generates short-lived signed R2 URL
→ app increments download count
→ customer downloads file from temporary signed URL
```

Recommended rules:

- Max downloads/access attempts: 3 per purchased file.
- Signed URL expiration: 15 minutes to 1 hour.
- Purchase access window: decide later.
- Store download events in Payload CMS `Downloads` collection.
- Never expose permanent public ebook or audiobook URLs.

## 8. Cloudflare R2 Setup Steps

1. Log into Cloudflare.
2. Go to R2 Object Storage.
3. Create a private bucket.
4. Keep the bucket private.
5. Do not enable public access for paid ebook or audiobook files.
6. Upload files under stable object keys.

Recommended object keys:

```txt
ebooks/book-1/home-infusion-day.pdf
ebooks/book-1/home-infusion-day.epub
audiobooks/book-1/home-infusion-day.mp3
```

Add R2 environment values to Vercel later:

```txt
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=benny-penny-ebooks
R2_ENDPOINT=
```

Store only object keys in Payload Books, not public download URLs.

## 9. Recommended Implementation Order

1. Run Neon SQL patches:
   - `docs/CONTACT_OPT_IN_SCHEMA_PATCH.md`
   - `docs/PRIVACY_COMPLIANCE_SCHEMA_PATCH.md`
2. Redeploy `main`.
3. Test `/contact`.
4. Test newsletter signup and `/thank-you?email=...`.
5. Test `/privacy/requests`.
6. Test admin collections:
   - `privacy-requests`
   - `consent-logs`
   - `orders`
   - `order-items`
   - `customer-addresses`
7. Fix schema/build issues.
8. Remove temporary setup/debug routes.
9. Rotate/delete setup secret.
10. Start Client Portal foundation.
11. Create private R2 bucket.
12. Upload PDF/EPUB/audiobook files.
13. Build signed ebook/audio delivery.
14. Add Lulu Direct API later.

## 10. Commit and Deployment Workflow Preference

For workspace updates, use detailed commit messages.

For the website repo, avoid repeated tiny commits that trigger Vercel deployments.

Preferred website workflow:

- Work on a branch where possible.
- Group related changes.
- Merge/deploy once per complete batch.
- Do not redeploy after every one-line troubleshooting change unless production is broken.
