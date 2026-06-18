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
Customer Portal v2 is BUILT and approved (shell, dashboard, shipment tracking, account, help, branded invoice) and the Payload admin sidebar now matches it (teal theme kept). The R2 automated digital delivery foundation is confirmed working in testing. Active priority now shifts to product asset replacement, real R2 files, deeper BPG gift/coupon tracking, Terms updates, and Geoapify address autocomplete.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
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
- Geoapify appears in Admin Dashboard System Status Check.

Important current assumptions:

- Product catalog data is placeholder material right now.
- Book covers, page images, and cart thumbnails are placeholders.
- Current Library UI is a testing/proof UI, not final customer experience.
- BPG gifting must consume from the same readable slot pool as PDF/EPUB downloads.
- Full paid readable license = 3 total readable slots across PDF, EPUB, and gifts.
- Gifted access = one download/device allowance.

Next focus areas:

```txt
1. Email deliverability: set SPF/DKIM/DMARC DNS for bennyandpennyadventures.com (Sequenzy) so gift/order emails reach the inbox instead of junk.
2. Decide whether to raise the gift download allowance above 1 (let recipients re-download on their device).
3. Replace placeholder book covers, page previews, cart thumbnails, and product assets.
4. Replace dummy R2 files with real PDF, EPUB, and audio files as Books 1-4 are finalized.
5. Deepen BPG gift-code → cart/coupon tracking (current owned-copy gifting via redemption codes already works end-to-end).
6. Update Terms for full license vs gifted access.
7. Add Geoapify fields/autocomplete to customer and admin address entry points.
8. Research official LuLu project/template requirements before print testing resumes.
```

Portal UX revamp and the customer account setup page are DONE (portal v2 shipped). Do not start broad admin rewrites or reintroduce a cream admin palette. Customer-facing product assets, fulfillment, and gifting/coupon tracking are the active focus.
