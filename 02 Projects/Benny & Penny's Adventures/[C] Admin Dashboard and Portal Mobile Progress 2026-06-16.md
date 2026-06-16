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
- Latest admin dashboard row/table layout remediation.

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

### Original problem

Adding external SVG service logos caused the admin dashboard System Status Check to break visually on mobile. The logos became too large, then an overcorrection temporarily hid them. The current direction is to keep real logos but force them into small fixed icon boxes.

Files touched in website repo:

```txt
app/(payload)/components/BeforeDashboard.tsx
app/(payload)/components/BeforeDashboard.scss
app/(payload)/components/RegionCompact.scss
app/(payload)/admin-polish-overrides.scss
app/(payload)/admin-dashboard-mobile-rows.scss
app/(payload)/layout.tsx
```

Relevant commits include:

```txt
89b3efd5e987ad9a50849867a5fed167411b790b
Show compact service logo images

edddcbefbaa340aed4b07abd514b013524bd8684
Improve admin dashboard mobile layout
```

---

## Latest Admin Mobile Work

### Sidebar/hamburger status

The sidebar/hamburger interaction was improved through several CSS passes. The user confirmed the sidebar is now working well:

```txt
Side bar is perfect
```

Related commits:

```txt
4f28a8805105a4e1bb28f7d0803ed49dcd91141a
Raise mobile search breakpoint for admin dashboard

4520aedba1ae3237d91c1cef4fe62f15e20de554
Force dashboard search below welcome and reduce sidebar scroll
```

### Search bar status

The search bar was originally cramped to the right of the greeting. The root issue was structural: the search form lived inside the dashboard topbar/header next to the welcome text. It was moved into its own standalone row below the welcome copy.

Commit:

```txt
8bd83ccfe1520ca78fc144570c90c495fd82887a
Move admin dashboard search below header
```

Status:

- User confirmed progress.
- Search now sits below the greeting.
- Search bar gap below the search was improved.

Spacing commits:

```txt
8d3828698dcf16422d3594d87c50dd962aa40567
Polish mobile dashboard intro spacing

9e23aee62e989ae57860d4f1438496cb1922c278
Refine mobile dashboard greeting typography
```

### Greeting and subtitle width diagnosis

The greeting and subtitle still appeared narrow. The `AdminWelcomeName.tsx` component was inspected and confirmed to return plain text only:

```tsx
return <>{name}</>;
```

So the component itself was not forcing line breaks.

Problems found:

1. `text-wrap: balance` caused artificially balanced short lines.
2. `RegionCompact.scss` removed some width caps, but was not the only file involved.
3. `admin-polish-overrides.scss`, loaded later in the admin layout, still had global mobile caps:

```css
.bp-dashboard h1 {
  max-width: 18rem !important;
}

.bp-dashboard p {
  max-width: 21rem !important;
}
```

These rules affected more than the greeting:

- Welcome heading.
- Live order subtitle.
- System Status subtitle.
- Recent Orders subtitle.
- Launch Funnel subtitle.
- Community Growth subtitle.
- Other dashboard card paragraph text.

Related commits:

```txt
884cbe647962fd6c90715901ca0a688141502736
Apply greeting typography outside breakpoint

86294ceef89f06ca94b846061ea1c9bc44dfc90f
Remove intro text width cap on admin dashboard

e37155ce28d7252887268e077812371b693a6037
Use natural wrapping for dashboard intro text

e60fc56d7337b0fbac6af51187f32711f2d5c263
Remove mobile dashboard text width caps
```

### Card row/data stacking diagnosis

After text-width caps were fixed, the user noticed the same problem in card data rows: highlighted empty right-side space with data stacked on the left.

Affected sections:

- System Status rows.
- Recent Orders rows.
- Community Growth subscriber rows.

Cause found in `BeforeDashboard.scss`:

```css
.bp-dashboard__orderRow { grid-template-columns: minmax(0, 1fr); }
.bp-dashboard__subscriberRow { grid-template-columns: minmax(0, 1fr); }
```

Also, System Status rows were being pushed into a stacked mobile layout, including the `ONLINE` status badge.

New fix:

```txt
app/(payload)/admin-dashboard-mobile-rows.scss
```

This stylesheet is imported last in:

```txt
app/(payload)/layout.tsx
```

Commits:

```txt
4c3764f937434059851d617789932b658fac3dc3
Add final mobile dashboard row layout overrides

a55194a092729fcd645070019cb35c01a12498e3
Load mobile dashboard row overrides last
```

Goal:

```txt
Outer cards stay mobile-friendly.
Inner rows go back to compact/table-like columns.
System Status ONLINE badge stays on the right.
Recent Orders keeps order/customer, date, status, and total in row format.
Community Growth keeps subscriber, date, and status in row format.
```

Latest row override still needs visual validation on phone after deployment.

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
- Order detail panels and summary boxes use better phone spacing.
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

1. Verify latest `admin-dashboard-mobile-rows.scss` deployment and phone screenshots.
2. Confirm System Status rows use right-side space correctly on mobile.
3. Confirm Recent Orders rows no longer stack excessively on mobile.
4. Confirm Community Growth subscriber rows no longer stack excessively on mobile.
5. Confirm greeting/subtitle/card text width caps are fixed globally.
6. Ensure sidebar/hamburger remains stable after latest row override.
7. Validate customer portal mobile pages on real devices.
8. Check Sequenzy account settings for footer badge removal.
9. Continue email provider abstraction/failover plan.

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
Use hpintojr/bennyandpennyadventures and hpintojr/My-Workspace. Read CLAUDE.md, 01 Daily Logs/[C] 2026-06-16.md, and [C] Admin Dashboard and Portal Mobile Progress 2026-06-16.md. Continue admin dashboard mobile remediation. Focus only on dashboard mobile layout validation: System Status rows, Recent Orders rows, Community Growth rows, greeting/subtitle widths, sidebar stability, and search placement. Do not start new features.
```
