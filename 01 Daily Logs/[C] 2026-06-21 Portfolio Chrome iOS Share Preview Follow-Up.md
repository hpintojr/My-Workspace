---
author: ChatGPT
type: daily-log
project: bennyandpenny.com — Portfolio
date: 2026-06-21
status: deployed — Chrome share-sheet behavior still requires real-device confirmation
---

# Portfolio Chrome iOS Share Preview Follow-Up

## Evidence reviewed

The screenshots show two distinct behaviors:

1. Safari and Messages can render the approved BP social image in a normal shared link card.
2. Chrome's iOS share-sheet header can remain text-only even when a Messages link card later renders the proper image.
3. Earlier blank cards inside Messages are historical cards and do not update in place after metadata changes.

The browser share-sheet header and the final Messages link preview are separate presentation layers. The first is selected by the browser; the second is created by the receiving/link-preview system.

## Previous generated-preview path

The original `/og-image` route generated a PNG at request time with Next `ImageResponse`. The root and homepage metadata referenced that route with explicit image URL, secure URL, MIME type, and dimensions.

## Static-art compatibility fallback

Added `app/head.tsx` with a direct static-image fallback for clients that inspect direct head tags or `image_src`:

```txt
Static source:
https://www.bennyandpenny.com/images/og-social-background.webp?rev=20260621-static

Declared fallback tags:
- link rel=image_src
- og:image
- og:image:secure_url
- og:image:type image/webp
- og:image dimensions 1200 × 630
- twitter:image
```

The fallback uses the approved BP artwork shown in the successful Safari and Messages screenshots.

## Static-art preview route

The `/og-image` route was then changed from generated artwork to a direct raw-byte proxy for the approved static WebP asset:

```txt
Route: app/og-image/route.tsx
Source: /images/og-social-background.webp
Response content type: image/webp
Cache: long shared-cache lifetime with stale-while-revalidate
Safety header: X-Content-Type-Options nosniff
```

This removes generated-image rendering from the primary preview request while preserving the existing preview URL used by current metadata.

## Deployment

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Static fallback commit: c9280ce8a43baed65e277679f70623bb7f01886f
Static proxy commit: 04c9d5c19939da9a820c39ca9073c0d8355b3481
Vercel status: success for both commits
```

## Important boundary

Website metadata can improve the normal webpage link card. It cannot force Chrome on iOS to show a thumbnail in Chrome's own share-sheet header.

Success criteria:

- a new final Messages link card shows the approved BP social art;
- the card title and domain are correct;
- the direct preview image remains reachable;
- old blank cards are treated as historical cached previews.

## Next device check

1. In Chrome iOS, load the root domain and use Share.
2. Send the link to a new recipient or new message thread.
3. Confirm the final Messages card—not only Chrome's share sheet—uses the BP social image.
4. If it is still blank, capture the Chrome version and whether the blank occurs in the share sheet, compose preview, or delivered Messages card.
