---
type: daily-log
date: 2026-06-17
projects:
  - Benny & Penny's Adventures
updated_by: Claude (Cowork)
---

# Daily Log — Gifting Flow Fixes — 2026-06-17

## Summary

After the Customer Portal v2 approval, Hamilton tested gifting (Adam → Hamster)
and surfaced several gaps. All fixed and ready to commit. Detail in
`02 Projects/Benny & Penny's Adventures/[C] Customer Portal v2 and Admin Theme Handoff 2026-06-17.md`
(see "Gifting fixes" section).

## Fixed
```txt
- Gifted books now appear in My Library (labeled "Gifted Book ♥"); dashboard "Books owned" counts gifts. Cause: Library was purchase-only; gifts deliver via a downloads record with no order.
- Gift email names the sender: subject "<Gifter> sent you a Benny & Penny book" + a From: name · email line in the body.
- Redeem is session-aware: signed-in members get a one-step "Claim to my library" (no email/password) and route to /portal/library.
- Existing members are no longer forced to set a password; the server only uses a password when creating a new account and never resets an existing one.
```

## Files changed
```txt
app/(frontend)/api/portal/library/route.ts
app/components/PortalLibraryClient.tsx
app/(frontend)/api/portal/overview/route.ts
lib/email.ts
app/(frontend)/api/portal/gifts/route.ts
app/(frontend)/api/gift/redeem/route.ts
app/components/GiftRedeemClient.tsx
```

## Open follow-ups
```txt
1. Gift emails land in junk — set SPF/DKIM/DMARC DNS for bennyandpennyadventures.com (Sequenzy) + verified From domain. Code change (sender in subject) is done; inbox placement needs DNS.
2. Decide whether to raise the gift download allowance above 1 so recipients can re-download on their device.
3. (Carryover) Replace placeholder product assets + real R2 files; deepen BPG gift→cart/coupon tracking; Terms update; Geoapify autocomplete; LuLu setup research.
```
