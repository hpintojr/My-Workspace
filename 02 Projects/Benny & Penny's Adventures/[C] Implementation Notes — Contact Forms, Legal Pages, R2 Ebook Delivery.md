---
type: implementation-notes
project: Benny & Penny's Adventures
created: 2026-06-12
updated: 2026-06-13
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
→ visitor clicks Submit
→ form submits to a Next.js API route
→ server validates input
→ submission is saved to Payload CMS
→ notification email is sent to hello@bennyandpenny.com
→ visitor sees an on-page success/error message
```

### Current Status

- The public form was changed away from `mailto:` behavior.
- `/api/contact` exists.
- Mailjet API integration exists.
- Mailjet delivery is blocked because the Mailjet account is temporarily blocked.
- Contact submissions still need to be saved to Payload CMS.

### Requirements

- Do not open the visitor's email client.
- Save each inquiry in Payload CMS `ContactSubmissions`.
- Send notification to `hello@bennyandpenny.com` after Mailjet account is unblocked.
- Add spam protection, preferably Cloudflare Turnstile.
- Include inquiry categories if useful:
  - General question.
  - Book order/support.
  - Media/press.
  - School/hospital/bulk order.
  - Speaking/partnership.
  - Other.

## 2. Email List / Join List Requirement

Flow:

```txt
Visitor enters email
→ form submits to server API route
→ server validates email
→ subscriber is saved to Payload CMS Subscribers collection
→ optional notification email is sent internally
→ subscriber can be viewed/exported later
```

Requirements:

- Store email signups in Payload CMS.
- Capture source, such as homepage, footer, contact page, or popup.
- Support admin viewing inside Payload.
- Support CSV export.
- Integrate or sync with Mailjet after account unblock.
- Store marketing opt-in/opt-out preference.

## 3. Payload CMS Implementation Notes

### Current Status

Payload CMS was added to the Next.js app and connected to Neon Postgres. Payload Admin login works and the first admin user was created.

The backend data layer works:

- Raw DB debug can read Books.
- Payload API debug can read Books.
- Payload Books total is 9.

Current blocker:

- Payload Admin sidebar loads, but collection panels are blank.
- Browser console showed React minified error `#418`.
- This likely comes from a hydration mismatch caused by the public app root layout wrapping Payload Admin.

Fix direction:

```txt
app/(frontend)/layout.tsx = public site root layout
app/(payload)/layout.tsx = Payload Admin root layout
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

The public product pages now depend on Payload-compatible book fields. The Books collection should mirror the product page model.

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

## 5. Privacy Policy Starter Topics

The Privacy Policy should explain:

- What information is collected.
- Contact form submissions.
- Email signup information.
- Purchase/order information handled through Stripe.
- Ebook/audiobook download/access information.
- Email communications.
- Analytics/cookies if used.
- How information is stored and protected.
- How users can contact the business.
- Children's privacy position.

Children's privacy direction:

```txt
Benny & Penny's Adventures is created for families, parents, caregivers, and children, but the website, purchases, contact forms, and email signups are intended for use by adults. We do not knowingly collect personal information directly from children.
```

Important:

- Full legal text was drafted previously.
- After the route-group refactor, verify the full Privacy and Terms pages still contain the complete legal text and were not replaced by placeholders.
- Have final legal language reviewed before launch.

## 6. Terms of Service Starter Topics

The Terms of Service should explain:

- Use of the website.
- Digital product purchases.
- PDF/EPUB delivery.
- Audiobook/audio delivery.
- Download limits.
- Link expiration.
- Refund policy for digital products.
- Print-on-demand order handling.
- Intellectual property / copyright.
- No unauthorized copying, sharing, resale, or redistribution.
- Limitation of liability.
- Contact email: `hello@bennyandpenny.com`.

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

1. Wait for Vercel deployment limit to reset or upgrade Vercel.
2. Deploy the route-group Payload Admin layout fix once.
3. Verify Payload Admin collection pages render.
4. QA public routes after the `(frontend)` move.
5. Restore full legal/resource/thank-you page content if any placeholders remain.
6. Remove temporary setup/debug routes.
7. Rotate/delete setup secret.
8. Store contact submissions in Payload.
9. Store email list signups in Payload.
10. Resolve Mailjet account block.
11. Create private R2 bucket.
12. Upload PDF/EPUB/audiobook files.
13. Build Stripe checkout and webhooks.
14. Build signed ebook/audio delivery.
15. Build member area.
16. Integrate Lulu Direct API.

## 10. Commit and Deployment Workflow Preference

For workspace updates, use detailed commit messages.

For the website repo, avoid repeated tiny commits that trigger Vercel deployments.

Preferred website workflow:

- Work on a branch.
- Group related changes.
- Merge/deploy once per complete batch.
- Do not redeploy after every one-line troubleshooting change.
