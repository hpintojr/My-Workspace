---
type: implementation-notes
project: Benny & Penny's Adventures
created: 2026-06-12
status: reference
---

# Implementation Notes — Contact Forms, Legal Pages, R2 Ebook Delivery

This file is a quick-reference implementation guide for recurring Benny & Penny website tasks.

## 1. Contact Form Requirement

### Current Problem

The Contact page currently opens the visitor's email client. This usually means the site is using a `mailto:` link or similar behavior.

### Desired Behavior

The Contact page must submit like a regular web form.

Desired flow:

```txt
Visitor fills out Contact form
→ visitor clicks Submit
→ form submits to a Next.js server action or API route
→ server validates input
→ submission is saved to Payload CMS
→ notification email is sent to hello@bennyandpenny.com
→ visitor sees an on-page success/error message
```

### Requirements

- Do not open the visitor's email client.
- Do not rely on `mailto:` for contact submissions.
- Save each inquiry in Payload CMS `ContactSubmissions`.
- Send notification to `hello@bennyandpenny.com`.
- Add spam protection, preferably Cloudflare Turnstile.
- Include inquiry categories if useful:
  - General question.
  - Book order/support.
  - Media/press.
  - Speaking/partnership.
  - Other.

## 2. Email List / Join List Requirement

The Join List form should collect emails in a database and allow admin review/export.

Desired flow:

```txt
Visitor enters email
→ form submits to server action or API route
→ server validates email
→ subscriber is saved to Payload CMS Subscribers collection
→ optional notification email is sent internally
→ subscriber can be viewed/exported later
```

### Requirements

- Store email signups in Payload CMS.
- Capture source, such as homepage, footer, contact page, or popup.
- Support admin viewing inside Payload.
- Support CSV export.
- Integrate or sync with Mailjet for campaigns.
- Send optional internal notification when a new subscriber joins.

## 3. Privacy Policy Starter Topics

The Privacy Policy should explain:

- What information is collected.
- Contact form submissions.
- Email signup information.
- Purchase/order information handled through Stripe.
- Ebook download/access information.
- Email communications.
- Analytics/cookies if used.
- How information is stored and protected.
- How users can contact the business.
- Children's privacy position.

### Children's Privacy Position

Suggested positioning:

```txt
Benny & Penny's Adventures is created for families, parents, caregivers, and children, but the website, purchases, contact forms, and email signups are intended for use by adults. We do not knowingly collect personal information directly from children.
```

Have final legal language reviewed before launch.

## 4. Terms of Service Starter Topics

The Terms of Service should explain:

- Use of the website.
- Digital product purchases.
- PDF/EPUB delivery.
- Download limits.
- Link expiration.
- Refund policy for digital products.
- Print-on-demand order handling.
- Intellectual property / copyright.
- No unauthorized copying, sharing, resale, or redistribution.
- Limitation of liability.
- Contact email: `hello@bennyandpenny.com`.

## 5. PDF / EPUB Link Capabilities

Download limits and expiration should be controlled by the app, not by a single permanent public link.

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

### Recommended Rules

- Max downloads: 3 per purchased file.
- Signed URL expiration: 15 minutes to 1 hour.
- Purchase access window: decide later; options include 7 days, 30 days, or lifetime with 3-download limit.
- Store download events in Payload CMS `Downloads` collection.
- Never expose permanent public ebook URLs.

## 6. Cloudflare R2 Setup Steps

1. Log into Cloudflare.
2. Go to R2 Object Storage.
3. Create a private bucket, recommended name:

```txt
benny-penny-ebooks
```

4. Keep the bucket private.
5. Do not enable public access for ebook files.
6. Upload ebook files under stable object keys.

Recommended paths:

```txt
ebooks/book-1/home-infusion-day.pdf
ebooks/book-1/home-infusion-day.epub
ebooks/book-2/port-adventure.pdf
ebooks/book-2/port-adventure.epub
```

7. Create R2 API credentials for the bucket.
8. Add R2 values to Vercel environment variables:

```txt
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=benny-penny-ebooks
R2_ENDPOINT=
```

9. Store R2 object keys in the Payload Books collection, not public URLs.

Example fields:

```txt
pdfObjectKey: ebooks/book-1/home-infusion-day.pdf
epubObjectKey: ebooks/book-1/home-infusion-day.epub
```

10. Generate signed URLs from the server only after checking purchase and download limits.

## 7. Recommended Implementation Order

1. Payload CMS.
2. Postgres database.
3. Contact form submission flow.
4. Contact submission storage and notification email.
5. Email list signup storage.
6. Subscriber admin view and CSV export.
7. Privacy Policy and Terms pages.
8. R2 private bucket.
9. Upload PDF/EPUB files.
10. Stripe webhook.
11. Signed ebook delivery.
12. Lulu Direct API.

## 8. Commit Message Preference

For workspace updates, use detailed commit messages that explain the purpose of the change.

Preferred style:

```txt
Update daily log with contact form, legal page, R2 delivery, and workspace commit-message preferences
```

Avoid short/keyed commit messages when a more descriptive commit would help future recall.
