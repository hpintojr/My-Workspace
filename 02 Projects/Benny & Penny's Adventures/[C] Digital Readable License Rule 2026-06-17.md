---
type: project-handoff
project: Benny & Penny's Adventures
status: active
updated_by: ChatGPT
last_updated: 2026-06-17
---

# Digital Readable License Rule — 2026-06-17

Hamilton approved the shared readable-license model.

## Rule

```txt
One purchased digital readable license grants access to both PDF and EPUB.
The license has 3 total readable access slots.
PDF downloads, EPUB downloads, and BPG gifts all spend from the same 3-slot pool.
A gifted recipient receives one digital download/device allowance.
```

## Examples

```txt
Buyer downloads PDF once and EPUB once -> 1 readable slot remains.
Buyer downloads nothing -> buyer may issue up to 3 gifts.
Buyer downloads PDF 3 times -> no EPUB or gift slots remain.
Buyer issues 1 gift -> buyer has 2 readable slots left across PDF/EPUB.
```

## Code Status

Website commits:

```txt
a2a43155006fabb66f6d1bcf180339d61a457fc9
Automate R2 download records for PDF EPUB and audio

11753be68c7058b7cea13bde9e060f13dbf53cfa
Clarify shared readable download limits

3b16a30cc0cc67e621e8f79af94442ca33d1c58a
Enforce shared readable download pool

67b5cee6f88a5b1bb3990fe3f3eec62548ec8d79
Expose PDF and EPUB download options in library API
```

Latest redeploy status:

```txt
Vercel production redeploy for 67b5cee completed successfully.
```

## Current R2 Folder Pattern

Hamilton simplified the R2 bucket into root folders:

```txt
ebooks/book-1.pdf
ebooks/book-1.epub
audio/book-1-audiobook.mp3
print/
```

This is the current standard. The app should use book records as the source of truth for exact R2 object keys.

## 2026-06-17 Test Finding and Correction

Hamilton processed order `26-0027` with digital, audiobook, paperback, and hardcover items. Order items and print jobs were created, but Media/Downloads records did not appear automatically.

Findings:

```txt
Order 26-0027 existed as order id 35.
Digital and audiobook order items existed for Book 1.
Downloads table had no records for order 26-0027.
Book object keys did not match the latest R2 folder pattern.
Automation is gated by R2_AUTO_CREATE_DOWNLOADS=true.
```

Corrections applied:

```txt
Updated all existing Book records to:
- ebooks/book-<number>.pdf
- ebooks/book-<number>.epub
- audio/book-<number>-audiobook.mp3

Updated existing Downloads records to the same R2 folder pattern.
Backfilled downloads for order 26-0027:
- PDF record
- EPUB record
- Audiobook record
```

## Vercel Values Needed for Future Automatic Creation

```txt
R2_AUTO_CREATE_DOWNLOADS=true
R2_EBOOK_PREFIX=ebooks
R2_AUDIO_PREFIX=audio
R2_DOWNLOADS_PER_LICENSE=3
```

Note:

```txt
The current fulfillment code uses Book-level R2 object keys first.
Because all Book records were updated, future orders can create the correct keys from the database.
A later code cleanup can make the fallback helper use R2_EBOOK_PREFIX and R2_AUDIO_PREFIX directly.
```

## Remaining Work

```txt
Polish Portal Library UI so PDF and EPUB appear as clear separate buttons.
Test a new paid digital order after confirming Vercel values are active.
Connect BPG gifting to the same readable slot pool.
Update Terms and Conditions for gifted vs full-license access.
```
