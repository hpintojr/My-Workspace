# Promotions, Gifting & Access Grants — Plan

**Status:** Planned (not built yet). Captures Hamilton's direction on 2026-06-15.
**Why:** Turn sharing into a growth loop. Each gifted download brings a new, consented user into the catalog for future marketing — a natural fit for a family/caregiver audience who already pass these books around.

---

## Two mechanisms

### 1) Admin discount / coupon codes (price off at checkout)
Owner-issued codes that reduce the checkout price (% or fixed amount).

- **Foundation already in place:** `/api/checkout` sets `allow_promotion_codes: true`, and the admin sidebar has a **Promotions → Stripe Coupons** entry. So Stripe promotion codes *already work* at checkout today.
- **To formalize:** a `promotions` collection in Payload that the owner manages in-app and that **syncs to Stripe** (creates a Stripe Coupon + Promotion Code via API on save). Track redemptions for reporting.
- **Use cases:** launch discounts, newsletter offers, influencer/partner codes, win-back.

### 2) Gift a licensed download (from a customer's download/device allowance)

**Mental model:** a purchased digital license includes `maxDownloads` (currently 3) = "use it on up to 3 of your own devices." Hamilton's goal is more control and visibility over sharing the customer would likely do anyway — turn an informal hand-off into a tracked, consented signup.

**Core rule — gifting spends a slot from the SAME pool as downloads.** Each personal download AND each gift permanently consumes one of the license's slots:
- `slotsUsed = downloadsUsed + giftsIssued`
- `giftableRemaining = maxDownloads − (downloadsUsed + giftsIssued)`

So a 3-download license can be split any way across the owner's own devices and gifts (e.g., 2 personal + 1 gift). Generating a gift code consumes a slot **immediately and permanently** (not refunded on redemption). Revoking an **unredeemed** code restores the slot.

**What the recipient gets:** one **free download** (one copy / one device), redeemable for **any digital product of the same or lesser value** than the gifted item — not locked to the exact book. The gift carries a **value ceiling** = the digital price of the item the owner gifted from.

**Gift code format:** total length **5–8 characters** = `BPG` prefix + **2–5 random digits** (e.g., `BPG12345`). Length is randomized within 5–8. The `BPG` prefix is what marks a code as a **gift** (admin **discount** codes never use `BPG`), so the two are always distinguishable. Codes are unique (retry on collision); single redemption, one download, one user, per code. Hamilton confirmed BPG + 2–5 digits is fine — lifetime gifted volume is expected well under ~2,000, so low entropy is acceptable; uniqueness is guaranteed by collision-retry on the unique field.

**Customer flow (new portal "Gift" section):**
1. Open **Gift** in the portal → see giftable balance per owned digital item (`giftableRemaining`).
2. Generate a code → enter the recipient's email → code is emailed to them (needs Mailjet; until then, show the code on-screen for manual sharing).
3. Giftable balance decrements by one (slot consumed); gift = `sent`.

**Recipient flow:**
1. Receive email/code → open `/gift/redeem?code=BPG…` → **sign up** (account + marketing consent).
2. Choose an eligible digital product (same-or-lesser value ≤ ceiling) → an **access-grant** (one download) is created → it appears in their My Library.
3. Recipient is catalogued as a consented lead, tagged `acquired_via: gift`, attributed to the gifter; gift = `redeemed`.

**Enforcement note (implementation):** the download endpoint must treat gifts as consumed slots — personal downloads allowed = `maxDownloads − giftsIssued`. Track `giftsIssued` on the license/download record (or derive from the gifts collection).

---

## Data model (reuse + add)

**Reuse `access-grants`** (already exists: customer, book, format [digital/audiobook/bundle], maxDownloads, expiresAt, reason, adminNotes) as the *result* of a redeemed gift or an admin comp — `reason: "gift redemption"` or `"admin grant"`. The Library route should surface access-grants alongside purchased downloads.

**New `gifts` collection:**
- `gifter` (relationship → users)
- `sourceDownload` (relationship → downloads, the license/slot the gift was spent from) + `sourceOrder` (optional)
- `sourceBook` (relationship → books), `format` (digital | audiobook)
- `valueCeiling` (number) — max digital price the code can be redeemed against (same-or-lesser value)
- `redemptionCode` (unique, `BPG` + 2–5 random digits = 5–8 chars total; admin may auto-generate or enter a custom code, which is normalized to start with `BPG`), `recipientEmail`
- `status` (sent | redeemed | revoked | expired)
- `downloadsGranted` (number, default 1) — one download per code per user
- `redeemedBy` (relationship → users, set on redemption), `redeemedBook` (what they chose), `redeemedAt`, `expiresAt`
- `message` (optional gift note)

**Downloads/license:** add `giftsIssued` (number, default 0) so personal-download enforcement = `maxDownloads − giftsIssued`.

**New `promotions` collection (discount codes):**
- `code`, `discountType` (percent | fixed), `amount`
- `stripeCouponId`, `stripePromotionCodeId` (synced)
- `maxRedemptions`, `timesRedeemed`, `expiresAt`, `active`
- `notes`

**Users:** add `acquiredVia` (organic | purchase | gift | admin) + optional `referredBy` for attribution.

---

## Flows

**Gifter:** My Library → "Gift" on an owned digital format → confirm (shows remaining giftable balance) → get a shareable link / send to email → balance decremented; gift = `sent`.

**Recipient:** open `/gift/redeem?code=…` → enter email + consent → account created → access-grant created → redirected to portal Library (book is there) → gift = `redeemed`.

**Admin:** create discount codes (sync to Stripe, never `BPG`); issue free access-grants (comps, reviewers, partners); **create gift codes directly** (auto-generate a random `BPG` code OR enter a custom one — auto-prefixed with `BPG` if missing); **view/track all gift codes** in the admin (status, code, gifter, recipient email, value ceiling, redeemed-by, dates) and revoke unredeemed ones; see redemption + attribution reporting.

---

## Guardrails
- One redemption per code; gifts expire (configurable); owner can **revoke** an unredeemed gift (restores balance).
- Per-customer gift limits / rate limits to prevent farming.
- Prevent trivial self-gifting abuse (same email / same account).
- **Consent & privacy:** capture marketing consent at redemption; honor the existing TCPA/privacy framework (consent-logs). Gifted recipients can unsubscribe.
- Gifts apply to **digital/audiobook** only (POD/print is a separate cost/shipping path).

---

## Suggested phasing
1. **Phase 1 — Discount codes (fastest):** `promotions` collection + Stripe sync; admin UI. (Checkout already accepts the codes.)
2. **Phase 2 — Gift-from-allowance:** `gifts` collection, giftable-balance logic, redemption page, access-grant creation, Library surfacing of grants.
3. **Phase 3 — Marketing automation:** tag + nurture gifted recipients (needs Mailjet); attribution reporting in the dashboard.

## Decisions (locked 2026-06-15)
- **Gifting consumes a real slot** from the license's `maxDownloads` pool (shared with personal downloads). Permanent on generation; restored only if an unredeemed code is revoked. No separate "gift credits" pool.
- **Recipient gets one download** (one device), redeemable for **any digital product of equal-or-lesser value** (value ceiling = gifted item's digital price). Not locked to the source book.
- **Code:** `BPG` + 2–5 random digits (5–8 chars total, randomized length); `BPG` distinguishes gift codes from admin discount codes; single-use; one download per code per user.
- **Signup required** to redeem (captures the consented lead).

## Decisions (locked 2026-06-15, part 2)
- **Gift expiry:** 90 days from generation.
- **No re-gifting:** redeemed grants are non-transferable.
- **Ship order:** build the portal Gift section now with the code shown on-screen + copy/share; add the automated recipient email when Mailjet clears.
- **Admin code management:** admin can auto-generate or enter a custom gift code (normalized to `BPG…`), and sees a tracking view of all gift codes.

---

## Dependencies
- Builds on: license-scaled download allowance (done), R2 delivery (done), set-password/account creation (done), access-grants collection (exists), Stripe promo codes (enabled).
- Needs Mailjet for gift-delivery + recipient nurture emails (currently pending).
