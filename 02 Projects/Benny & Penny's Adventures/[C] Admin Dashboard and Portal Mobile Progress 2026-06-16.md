---
type: project-update
project: Benny & Penny's Adventures
date: 2026-06-16
status: active
updated_by: ChatGPT
---

# Admin Dashboard and Portal Mobile Progress — 2026-06-16

## Purpose

This note captures the recent progress on:

- Transactional email branding.
- Sequenzy/Mailjet email provider direction.
- Admin dashboard System Status Check.
- Admin dashboard mobile layout issues.
- Customer portal mobile improvements.

Use this with:

```txt
01 Daily Logs/[C] 2026-06-16.md
[C] Backlog & Launch Checklist.md
[C] Portal and Digital Delivery Implementation Notes.md
```

---

## Repositories

Workspace repo:

```txt
hpintojr/My-Workspace
```

Website repo:

```txt
hpintojr/bennyandpennyadventures
```

---

## Email Branding Progress

The shared transactional email layout was updated to match the approved Benny & Penny brand hierarchy:

```txt
Benny & Penny
♥ Adventures ♥
MEDICAL BOOKS FOR BRAVE LITTLE HEARTS
```

Website file:

```txt
lib/email.ts
```

Important commit:

```txt
d8d1bd00eb19a19be7f93af6c732b242863637c2
Update transactional email branding header
```

This affects shared transactional templates including:

- Gift email.
- Order receipt email.
- Gift redeemed email.
- Password setup/reset flows.

Open issue:

- Sequenzy/provider footer badge appears to be injected by the email platform, not by the repository template. Check account settings/plan controls.

---

## Email Provider Direction

Current recommended provider architecture:

```txt
Sequenzy = primary transactional email provider
Mailjet = secondary/fallback provider
```

Transactional flows should eventually route through a provider abstraction layer:

```txt
sendTransactionalEmail()
→ try Sequenzy
→ if unavailable/fails, fallback to Mailjet
→ log result
```

Primary Sequenzy flows:

- Gift emails.
- Account setup links.
- Password reset links.
- Order receipts.
- Gift redeemed confirmations.
- Digital delivery/download emails.

Mailjet should remain available for:

- Backup transactional delivery.
- Marketing/newsletter campaigns if needed.
- Failover testing.

---

## Admin Dashboard System Status Progress

Sequenzy was added to the admin dashboard System Status Check above Mailjet.

Website file:

```txt
app/(payload)/components/BeforeDashboard.tsx
```

Important commit:

```txt
f4ca40c5ada3a00cb46f16ff4fe6d334846f4711
Add Sequenzy system status logo
```

Target System Status order:

```txt
Payload CMS/API
Neon Database
Stripe API
R2 Fulfillment
Sequenzy API
Mailjet API
LuLu Press API
```

---

## Admin Dashboard Build Fix

After adding the System Status update, Vercel failed because Payload's generated import map expected a named export:

```txt
BeforeDashboard
```

The fix added:

```ts
export async function BeforeDashboard() {}
```

and preserved:

```ts
export default BeforeDashboard;
```

Important commit:

```txt
03ee988c6437d9d1a20c612689be2a7ccb5d5c43
Export BeforeDashboard by name
```

This deployment was confirmed READY.

---

## Admin Dashboard CSS / Mobile Progress

### What happened

Adding external SVG service logos caused the admin dashboard System Status Check to break visually on mobile. The logos became too large, then an overcorrection temporarily hid them. The current direction is to keep real logos but force them into small fixed icon boxes.

Files touched in website repo:

```txt
app/(payload)/components/BeforeDashboard.tsx
app/(payload)/components/BeforeDashboard.scss
app/(payload)/components/RegionCompact.scss
app/(payload)/admin-polish-overrides.scss
```

Relevant commits include:

```txt
89b3efd5e987ad9a50849867a5fed167411b790b
Show compact service logo images

edddcbefbaa340aed4b07abd514b013524bd8684
Improve admin dashboard mobile layout
```

### Current admin mobile problems

Screenshots showed:

- Search bar is cramped at the top.
- Search needs to move below the welcome text and take full width on phones.
- Dashboard content is still wider than the viewport.
- Sidebar/hamburger is inconsistent.
- Mobile sidebar/drawer can overlay the dashboard badly.
- Mobile fixes have previously interfered with desktop layout.

### Current admin mobile strategy

The admin shell needs separate desktop and mobile behavior:

```txt
Desktop:
  Keep sidebar/dashboard layout stable.

Mobile:
  Single-column dashboard.
  Search below welcome text.
  Hard max-width: 100vw.
  Sidebar/drawer width capped.
  Prevent dashboard horizontal overflow.
```

### Current status

Admin mobile work is started but **not complete**.

This is currently the largest active blocker.

---

## Customer Portal Mobile Progress

Customer portal mobile updates were patched across:

```txt
app/components/PortalSessionBar.tsx
app/components/PortalOrdersClient.tsx
app/components/PortalLibraryClient.tsx
```

Completed improvements:

- Portal session bar stacks better on phones.
- Signed-in name/email no longer crushes the navigation.
- Portal nav becomes scrollable pill navigation on mobile.
- Orders page summary rows stack better.
- Orders page detail panels and summary boxes use better phone spacing.
- Library page summary rows and format cards stack better.
- Long book titles, order numbers, order references, and status text wrap instead of forcing overflow.
- Download/status buttons are full-width on phones.

Important commits:

```txt
4a079c64d735fee92766f6f5b011092f00ffb95f
Improve portal orders mobile layout

204fcf3907940b8ceead492e04f76ffb2c6b3c32
Improve portal library mobile layout
```

Current portal status:

- Portal has been patched.
- Needs real-device validation.

Validate:

- Portal Home.
- Orders.
- Library.
- Gifts.
- Addresses.
- Signed-in and signed-out states.
- iPhone Safari.
- Chrome Mobile.
- iPad portrait.

---

## Current Priority Order

1. Finish admin mobile hamburger/sidebar/drawer behavior.
2. Fix admin dashboard search placement and alignment on mobile.
3. Ensure admin dashboard cannot exceed viewport width.
4. Confirm System Status logos show and remain compact.
5. Validate admin dashboard on iPhone Safari, Chrome Mobile, and iPad portrait.
6. Validate customer portal mobile pages on real devices.
7. Check Sequenzy account settings for footer badge removal.
8. Continue email provider abstraction/failover plan.

---

## Do Not Start Yet

Do not start these until admin mobile is stable:

- New storefront features.
- New product pages.
- New automation flows.
- Lulu/POD automation.
- Additional admin redesign beyond the current mobile fix.

---

## Next Development Prompt

Use this prompt when continuing:

```txt
Use hpintojr/bennyandpennyadventures and hpintojr/My-Workspace. Read CLAUDE.md, 01 Daily Logs/[C] 2026-06-16.md, and [C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md. Continue the admin dashboard mobile remediation. Focus only on hamburger/sidebar/search/viewport overflow. Do not start new features.
```
