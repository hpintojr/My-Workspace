# Workspace Index

**Status:** Current as of 2026-06-17 (Customer Portal v2 + admin theme + gifting fixes shipped)

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md
01 Daily Logs/[C] 2026-06-17 Gifting Fixes.md
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md
02 Projects/Benny & Penny's Adventures/[C] Customer Portal v2 and Admin Theme Handoff 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/Benny & Penny's Adventures Overview.md
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

## Current Benny & Penny Status

```txt
Customer Portal v2 is live and approved: persistent sidebar shell (Dashboard, Library,
Orders, Gifting, Addresses, Account, Help), dashboard with reading-slots meter, order
shipment tracking (print-jobs), account + help pages, and a branded printable invoice.
Payload admin sidebar now mirrors the portal (identity card + icon-tile rows); admin
keeps its teal/mint palette (cream was rejected).
Gifting tested and fixed: gifted books now show in My Library ("Gifted Book"), the gift
email names the sender, and redeem is session-aware (signed-in members claim in one step;
existing members are never forced to set a password).
R2 automated digital delivery is confirmed working in testing.
Digital checkout creates Media/Downloads records automatically.
Library shows separate PDF, EPUB, and Audiobook buttons, with self-heal that backfills
a missing format record by mirroring the R2 key.
Shared readable slot tracking is active (3 slots/title across PDF/EPUB/gifts).
Current R2 folder standard is ebooks/, audio/, and print/.
Product catalog data and images are still placeholders.
LuLu Phase 1/2 work exists, but LuLu testing remains paused.
Address autocomplete uses Google Places API (New) — Geoapify fully removed. Server-key proxy /api/geo/autocomplete + /api/geo/place; AddressAutocomplete wired into the portal address book, reusable for admin. Vercel key: GOOGLE_PLACES_API_KEY (enable Places API New, no referrer restriction). Admin status tile now "Google Places API".
```

## Build guardrails (website repo)

```txt
- tsconfig target is es5: wrap Map/Set iteration in Array.from() (no bare for-of on iterators).
- next build errors on raw apostrophes in JSX text: use &apos;.
- Portal pages do NOT wrap SiteShell/PortalSessionBar; the portal layout provides the shell.
- Login / post-auth redirects into the portal must full-reload, not router.push.
- Business address appears ONLY on the printable invoice for now.
- Admin palette = teal/mint; do not reintroduce cream. admin-portal-theme.scss is sidebar structure only.
- Gifting = redemption-code model (free digital access), not Stripe checkout.
- Reusable portal data logic lives in lib/portalData.ts.
```

## Current Next Actions

```txt
0. Confirm Google Places autocomplete works live: set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in Vercel (browser-readable), add https://bennyandpennyadventures.com/* (non-www) to the key's referrer allowlist, redeploy. Diagnose via Network tab (no request = key missing; 403 = referrer).
0b. Fix existing order 26-0029 (address typed into name field); optional: prefill Stripe checkout name/address for logged-in customers to prevent recurrence.
1. Email deliverability: set SPF/DKIM/DMARC DNS for bennyandpennyadventures.com (Sequenzy) so gift/order emails reach the inbox, not junk.
2. Decide whether to raise the gift download allowance above 1 (re-download on device).
3. Replace placeholder product assets: covers, page previews, cart thumbnails.
4. Replace dummy R2 files with real files as Books 1-4 are finalized.
5. Deepen BPG gift-code -> cart/coupon tracking (owned-copy gifting already works end-to-end).
6. Update Terms for full readable license vs gifted access.
7. Google Places autocomplete: portal address book DONE (Geoapify removed); add to admin address entry (AddressAutocomplete reusable) + optional dashboard profile-completion nudge.
8. Research official LuLu project/template setup before sandbox print testing resumes.
```

## Directory Notes

```txt
01 Daily Logs/[C] 2026-06-17 Gifting Fixes.md                       (latest session)
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md   (portal v2 build)
01 Daily Logs/[C] 2026-06-17 End of Day Wrap Up.md                   (prior same-day state)
02 Projects/Benny & Penny's Adventures/[C] Customer Portal v2 and Admin Theme Handoff 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
02 Projects/Benny & Penny's Adventures/[C] Customer Experience Portal Revamp Roadmap & Assessment.md  (roadmap; portal UX phase now built)
02 Projects/Benny & Penny's Adventures/[C] Geoapify Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```
