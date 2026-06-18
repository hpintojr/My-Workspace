# My Workspace

A GitHub-based workspace for project notes, daily logs, and active project context.

## Start Here

Read in this order:

```txt
README.md
00 [C] Workspace Index.md
CLAUDE.md
Current active focus files listed below
```

The workspace index contains the clean directory tree, read-order rules, and update-maintenance checklist.

---

## Current Active Focus

### Benny & Penny's Adventures

Current priority:

```txt
Customer Portal v2 is BUILT and approved (shell, dashboard, shipment tracking, account, help, branded invoice) and the Payload admin sidebar now matches it (teal theme kept). R2 automated digital delivery is confirmed working in testing. Gifting fixes are shipped. Geoapify has been removed and address autocomplete now uses Google Places API (New). Active priority is Google Places live verification, fixing order 26-0029, product asset replacement, real R2 files, deeper BPG gift/coupon tracking, Terms updates, email deliverability, and LuLu research.
```

Read first for the next Benny & Penny chat:

```txt
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
02 Projects/Benny & Penny's Adventures/[C] Google Places Address Autocomplete and Checkout Strategy.md
02 Projects/Benny & Penny's Adventures/[C] Lulu Print on Demand Plan.md
```

Confirmed working:

- Customer Portal v2 is live and approved: persistent sidebar shell (Dashboard, Library, Orders, Gifting, Addresses, Account, Help), dashboard with reading-slots meter, order shipment tracking, account + help pages, and a branded printable invoice.
- Gifting works end-to-end: gifted books show in My Library ("Gifted Book"), the gift email names the sender, and redeem is session-aware (signed-in members claim in one step; existing members are never forced to set a password).
- R2 automated digital delivery works in testing.
- Digital orders auto-create Media/Downloads records.
- Portal Library shows separate PDF, EPUB, and Audiobook buttons (with self-heal that backfills a missing format record).
- R2 signed download links work.
- Shared readable slot tracking is active (3 slots/title across PDF/EPUB/gifts).
- Current R2 folder standard is `ebooks/`, `audio/`, and `print/`.
- Admin sidebar now mirrors the portal (identity card + icon tiles); admin keeps its teal/mint palette (cream was rejected).
- Print Jobs appears under Catalog.
- LuLu queue and manual submit foundation exist, but LuLu testing is paused.
- Google Places API (New) autocomplete code is built for the portal address book and admin CustomerAddresses.street1 field; live verification is still pending Vercel/Google Cloud configuration.

Important current assumptions:

- Product catalog data is placeholder material right now.
- Book covers, page images, and cart thumbnails are placeholders.
- Current Library UI is a testing/proof UI, not final customer experience.
- BPG gifting must consume from the same readable slot pool as PDF/EPUB downloads.
- Full paid readable license = 3 total readable slots across PDF, EPUB, and gifts.
- Gifted access = one download/device allowance.
- Google Places must use the browser-readable Vercel variable `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`.
- Google Cloud must have Places API (New) enabled, billing enabled, and referrer allowlist entries for non-www, www, and localhost before autocomplete can be confirmed live.
- Existing order `26-0029` has an address typed into Stripe's name field and needs manual cleanup.

Next focus areas:

```txt
0. Confirm Google Places autocomplete works live: set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in Vercel, add https://bennyandpennyadventures.com/* and https://www.bennyandpennyadventures.com/* plus localhost to the key referrer allowlist, redeploy, and test portal + admin via DevTools Network tab.
0b. Fix existing order 26-0029 (address typed into name field); optional: prefill Stripe Checkout name/address for logged-in customers to prevent recurrence.
1. Email deliverability: set SPF/DKIM/DMARC DNS for bennyandpennyadventures.com (Sequenzy) so gift/order emails reach the inbox instead of junk.
2. Decide whether to raise the gift download allowance above 1 (let recipients re-download on their device).
3. Replace placeholder book covers, page previews, cart thumbnails, and product assets.
4. Replace dummy R2 files with real PDF, EPUB, and audio files as Books 1-4 are finalized.
5. Deepen BPG gift-code → cart/coupon tracking (current owned-copy gifting via redemption codes already works end-to-end).
6. Update Terms for full license vs gifted access.
7. Extend Google Places/address confirmation later to account setup and logged-in checkout refinements if needed.
8. Research official LuLu project/template requirements before print testing resumes.
```

Portal UX revamp, customer account setup page, Help, Orders, Addresses, Library, Gifting, and the admin sidebar are DONE for Portal v2. Do not start broad admin rewrites or reintroduce a cream admin palette. Customer-facing product assets, fulfillment, Google Places live verification, order 26-0029 cleanup, and gifting/coupon tracking are the active focus.
