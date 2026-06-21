---
author: ChatGPT
type: daily-log
project: bennyandpenny.com — Portfolio
date: 2026-06-20
status: deployed — device confirmation pending
---

# Portfolio Mobile Chrome Share Preview Fix

## Session outcome

Investigated the report that normal domain sharing showed an image in Safari but appeared blank in Chrome/mobile sharing. The portfolio now exposes one explicit PNG Open Graph image route and the homepage metadata points to it by absolute URL.

## Root cause addressed

The homepage had page-level metadata that could override the root metadata and was using a relative preview-image path. This created a less reliable social-card instruction for Chromium-based sharing clients.

## Production implementation

```txt
Canonical social preview: https://www.bennyandpenny.com/og-image
Format: PNG
Size: 1200 × 630
Route: app/og-image/route.tsx
Runtime: Next.js edge ImageResponse
```

Both `app/layout.tsx` and `app/page.tsx` now declare the PNG preview with:

- an absolute public image URL
- `og:image:secure_url`
- `image/png`
- explicit `1200 × 630` dimensions
- the portfolio title and descriptive social copy

The dedicated image route returned HTTP 200 with `content-type: image/png` during production validation.

## Deployment

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Commit: 744c27daa33f22ba71cbe89bb7cd3a7e053791bf
Commit message: Use absolute PNG preview URL for Chrome sharing
Vercel deployment: dpl_5bAsWNCX7CxXakii2H8uEqrgtqY3
State: READY
Production aliases: www.bennyandpenny.com, bennyandpenny.com
```

## Important distinction

Chrome's newer page-capture or clipped-page sharing behavior is browser-generated and separate from Open Graph metadata. This work fixes the standard webpage-link card, not every screenshot-style share behavior Chrome may choose to offer.

## Required device verification

1. Share `https://www.bennyandpenny.com/` from Chrome mobile in a brand-new message thread or recipient.
2. Confirm the standard link card shows the portfolio PNG instead of a blank block.
3. Record the device, Chrome version, and receiving app if a blank card remains.
4. Treat an old share card in an existing conversation as cached until a new-share test proves otherwise.

## Next portfolio work

- Complete the real-device Chrome share validation above.
- Retain the dedicated PNG route as the canonical social-preview path unless a tested sharing client proves a new fallback is needed.
- Continue the separate WCAG evidence, accessibility audit, and real Contact-submission verification work from PROJECT TRUTH.
