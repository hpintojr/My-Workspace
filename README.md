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
Customer Portal v2 is BUILT and approved (shell, dashboard, shipment tracking, account, help, branded invoice) and the Payload admin sidebar now matches it (teal theme kept). R2 automated digital delivery is confirmed working in testing. Gifting fixes are shipped. Geoapify has been removed and Google Places API (New) autocomplete is confirmed working for both customer and admin. Checkout name/address issue is already mitigated by saved-address Stripe Checkout prefill plus a fulfillment guard. Email authentication DNS is verified. Abandoned-cart tracking, guest email/consent capture, account-or-guest checkout gate, and paid-order conversion safety nets are verified. Timed abandonment, Sequenzy tagging, recovery links, unsubscribe handling, admin recovery reporting, coupon/BPG/gift attribution, Neon schema changes, and Vercel cron configuration are built. Production is in a safe dry-run: CART_RECOVERY_SEND_ENABLED=false. The immediate priority is controlled end-to-end validation before any recovery email is enabled.
```

Read first for the next Benny & Penny chat:

```txt
00 [C] Workspace Index.md
CLAUDE.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Environment Configuration and Dry Run.md
01 Daily Logs/[C] 2026-06-18 Cart Recovery Automation Sequenzy and Attribution Build.md
01 Daily Logs/[C] 2026-06-18 Database Cart Conversion Safety Net Added.md
01 Daily Logs/[C] 2026-06-18 Webhook Cart Conversion Fallback Added.md
01 Daily Logs/[C] 2026-06-17 Cart Recovery Checkout Gate and Sandbox Verification.md
01 Daily Logs/[C] 2026-06-17 Guest Cart Recovery Capture Added.md
01 Daily Logs/[C] 2026-06-17 Abandoned Cart Tracking Build Started.md
01 Daily Logs/[C] 2026-06-17 Checkout Name Guard and Email DNS Confirmed.md
01 Daily Logs/[C] 2026-06-17 Google Places Confirmed.md
01 Daily Logs/[C] 2026-06-17 Google Places and Stripe Name Guard.md
01 Daily Logs/[C] 2026-06-17 Gifting Fixes.md
01 Daily Logs/[C] 2026-06-17 Customer Portal v2 and Admin Theme.md
02 Projects/Benny & Penny's Adventures/[C] Backlog & Launch Checklist.md
02 Projects/Benny & Penny's Adventures/[C] Product Assets Digital Delivery Gifting and Marketing Handoff.md
02 Projects/Benny & Penny's Adventures/[C] Digital Readable License Rule 2026-06-17.md
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
- Google Places API (New) autocomplete is built and confirmed working for both the customer portal address book and admin CustomerAddresses.street1 field.
- Stripe Checkout name/address issue is already mitigated by saved-address prefill and a non-destructive fulfillment guard.
- Email authentication DNS is verified: DKIM, SPF, SES feedback/inbound MX, and DMARC p=none.
- Abandoned Carts admin list/detail pages work with Neon-backed records.
- Guest cart lifecycle is verified in sandbox: Active Cart → Checkout Started → Converted.
- Guest checkout now requires a valid email before Stripe, offers Create an account or Checkout as guest, supports optional cart-reminder consent, and shows an existing-member Sign in link.
- Cart reminder consent is stored in Neon as `marketing_consent` and renders as Yes/No in the admin list.
- Paid-order database trigger now converts the matching cart even when a customer closes the browser before thank-you.
- Recovery automation is configured hourly with 4-hour active-cart and 1-hour checkout-started thresholds; recovery email sending remains intentionally disabled.
- Vercel environment variables were added for Production and Preview, and the successful production redeploy is `dpl_3wjSyLkKXVBWUgbsBAhWAz2Us9Da`.

Important current assumptions:

- Product catalog data is placeholder material right now.
- Book covers, page images, and cart thumbnails are placeholders.
- Current Library UI is a testing/proof UI, not final customer experience.
- BPG gifting must consume from the same readable slot pool as PDF/EPUB downloads.
- Full paid readable license = 3 total readable slots across PDF, EPUB, and gifts.
- Gifted access = one download/device allowance unless Hamilton decides to increase it.
- Geoapify remains removed; Google Places API (New) is the active address autocomplete provider.
- Order `26-0029` cleanup is bypassed as an active blocker per Hamilton; keep the forward fix documented.
- DMARC is currently verified at `p=none`; later consider a stricter policy only after sending remains stable.
- Do not enable live cart-recovery emails until controlled dry-run validation confirms the admin state, Sequenzy tag, recovery link, and unsubscribe behavior.
- Do not store any environment-secret values in GitHub, workspace logs, screenshots, or chat transcripts.

Next focus areas:

```txt
1. Run a consented guest-cart dry-run past the configured threshold; validate abandoned status, recovery eligibility/state, and Sequenzy cart-abandoned tag while email remains disabled.
2. Enable CART_RECOVERY_SEND_ENABLED=true only for one controlled Reminder 1, recovery-link, and unsubscribe test.
3. Confirm recovered purchase records Recovered Order Number and Recovered Revenue.
4. Replace placeholder book covers, page previews, cart thumbnails, and product assets.
5. Replace dummy R2 files with real PDF, EPUB, and audio files as Books 1-4 are finalized.
6. Decide whether to raise the gift download allowance above 1 (let recipients re-download on their device).
7. Update Terms for full license vs gifted access and cart-recovery consent/privacy treatment.
8. Research official LuLu project/template requirements before print testing resumes.
9. Monitor real gift/order email inbox placement now that DNS authentication is verified.
```

Portal UX revamp, customer account setup page, Help, Orders, Addresses, Library, Gifting, Google Places autocomplete, checkout name/address mitigation, email authentication DNS, cart tracking, guest checkout gate, admin sidebar, recovery automation, and attribution foundations are DONE for the current phase. Do not start broad admin rewrites or reintroduce a cream admin palette. Controlled cart-recovery validation, real customer-facing assets/files, gift policy, Terms, and LuLu research are the active focus.
