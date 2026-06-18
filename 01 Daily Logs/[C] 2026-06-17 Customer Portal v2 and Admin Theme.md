---
type: daily-log
date: 2026-06-17
projects:
  - Benny & Penny's Adventures
updated_by: Claude (Cowork)
---

# Daily Log — Customer Portal v2 + Admin Sidebar Theme — 2026-06-17

## Summary

Rebuilt the customer portal into a real signed-in app (persistent sidebar shell,
dashboard, shipment tracking, account, help, branded invoice) and restructured
the Payload admin sidebar to match it. Hamilton reviewed live and approved both.
All work on `main`, deployed via Vercel.

Full detail and guardrails: see
`02 Projects/Benny & Penny's Adventures/[C] Customer Portal v2 and Admin Theme Handoff 2026-06-17.md`.

## Shipped + approved
```txt
- Portal app shell + persistent nav (Dashboard, Library, Orders, Gifting, Addresses, Account, Help).
- Dashboard with stat tiles, ready-to-read downloads, recent orders, reading-slots meter (/api/portal/overview).
- Shipment/fulfillment tracking on orders (joins print-jobs; Submitted→In production→Shipped→Delivered + tracking link).
- Library per-book slot meter + self-heal that auto-creates a missing EPUB/PDF download record.
- Account page (profile, SMS opt-in, password link) + /api/portal/account.
- Help page (support tickets) + /api/portal/support.
- Branded printable invoice at /invoice/[orderId]; business address shown ONLY here.
- Gift redeem success state (congratulations + login CTA, reads createdAccount).
- Admin sidebar: identity card + icon-tile compact rows. Teal/mint theme KEPT (cream rejected).
```

## Bugs fixed
```txt
- es5 target build error: wrap Map/Set iteration in Array.from().
- Login loop: PortalShell re-validates session on pathname change; login now full-reloads.
- Portal horizontal overflow: min-w-0 on dashboard grid columns.
```

## Key decisions
```txt
- Business address lives ONLY on the printable invoice for now: 231 E Alessandro Blvd, Ste A-208, Riverside, CA 92508.
- Gifting stays a redemption-code model (free digital access), not Stripe checkout. Stripe discount coupons would be a separate future feature.
- Admin keeps the teal/mint palette; cream was rejected. admin-portal-theme.scss is sidebar STRUCTURE only.
```

## Next start
```txt
1. Replace placeholder product assets + dummy R2 files as Books 1-4 finalize.
2. BPG gift-code → cart/coupon tracking (deeper); current owned-copy gifting works.
3. Update Terms for full license vs gifted access.
4. Geoapify autocomplete on portal address book + admin address entry.
5. Optional: auto-sign-in gift recipient after redeem.
6. Research official LuLu setup/template before resuming print testing.
```
