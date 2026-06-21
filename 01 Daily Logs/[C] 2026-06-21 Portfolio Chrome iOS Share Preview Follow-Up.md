---
author: ChatGPT
type: daily-log
project: bennyandpenny.com — Portfolio
date: 2026-06-21
status: deployed — Chrome share-sheet behavior still requires real-device confirmation
---

# Portfolio Chrome iOS Share Preview Follow-Up

## Evidence reviewed

The screenshots show two separate behaviors:

1. Safari and Messages can render the approved BP social image in a normal shared link card.
2. Chrome's iOS share-sheet header can remain text-only even when a Messages link card later renders the proper image.
3. Earlier blank cards inside Messages are cached historical cards and do not retroactively refresh after metadata changes.

The browser share-sheet header and the final Messages link preview are separate presentation layers. The first is chosen by the browser; the second is created by the receiving/link-preview system.

## Existing implementation retained

```txt
Dynamic image route: /og-image
Route implementation: app/og-image/route.tsx
Format: image/png
Size: 1200 × 630
```

## Follow-up fallback deployed

Added `app/head.tsx` as a static-image fallback for clients that inspect direct head tags or `image_src`:

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

The fallback points to the approved BP artwork already demonstrated in Safari and the successful Messages screenshot. The dynamic PNG route remains in place as a second compatible path.

## Deployment

```txt
Repository: hpintojr/bennyandpenny
Branch: main
Commit: c9280ce8a43baed65e277679f70623bb7f01886f
Commit message: Add static image fallback for mobile share previews
Vercel status: success
```

## Important boundary

No website metadata can force Chrome on iOS to show a thumbnail in Chrome's own share-sheet header. The metadata can control the normal webpage link card that Messages and other preview systems fetch. The success criteria are:

- a new message link card shows the approved BP social art;
- the card title and domain are correct;
- the direct preview image remains reachable;
- old blank cards are treated as cached historical previews.

## Next device check

1. In Chrome iOS, load the root domain and use Share.
2. Send the link to a new recipient or new message thread.
3. Confirm the final Messages card—not only Chrome's share sheet—uses the BP social image.
4. If it is still blank, capture the Chrome version and whether the blank occurs in the share sheet, the compose preview, or the delivered Messages card.
