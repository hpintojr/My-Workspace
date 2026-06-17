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

Build status:

```txt
Vercel build for 67b5cee completed successfully.
```

## Vercel Values Needed for Testing

```txt
R2_AUTO_CREATE_DOWNLOADS=true
R2_KEY_PREFIX=books
R2_DOWNLOADS_PER_LICENSE=3
```

## Remaining Work

```txt
Polish Portal Library UI so PDF and EPUB appear as clear separate buttons.
Test paid digital checkout to download record creation to portal download.
Connect BPG gifting to the same readable slot pool.
Update Terms and Conditions for gifted vs full-license access.
```
