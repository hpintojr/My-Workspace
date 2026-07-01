# Workspace Index

Updated: 2026-07-01

## First read

1. README.md
2. 00 [C] Workspace Index.md
3. CLAUDE.md
4. 02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md

## Portfolio

Project: bennyandpenny.com  
Repository: hpintojr/bennyandpenny  
Branch: main  
Latest verified share-preview commit: 04c9d5c19939da9a820c39ca9073c0d8355b3481  
Vercel status: success

The portfolio includes the native accessibility launcher, approved universal-access icon, footer trigger, native preferences dialog, and approved Neon Contact storage. Social sharing now sends the approved static BP artwork through the existing `/og-image` URL as raw WebP bytes, with direct static fallback head tags in `app/head.tsx`. Chrome iOS may show a text-only browser share-sheet header even when the final Messages link card renders correctly; a real-device final-card test remains open.

### Portfolio read next

1. 02 Projects/bennyandpenny.com — Portfolio/[C] PROJECT TRUTH — Read First.md
2. 01 Daily Logs/[C] 2026-06-21 Portfolio Chrome iOS Share Preview Follow-Up.md
3. 01 Daily Logs/[C] 2026-06-20 Portfolio Mobile Chrome Share Preview Fix.md
4. 02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
5. 01 Daily Logs/[C] 2026-06-20 Workspace Sync — Portfolio Accessibility Icon and Contact Storage.md
6. 01 Daily Logs/[C] 2026-06-20 Universal Accessibility Icon Update.md
7. 01 Daily Logs/[C] 2026-06-20 Portfolio Contact Submission Storage Approved and Applied.md

## Adventures Store

Project: bennyandpennyadventures.com  
Repository: hpintojr/bennyandpennyadventures

The shared WCAG specification is required before accessibility implementation begins in this separate repository. It includes the approved universal-access person-in-circle icon, native launcher behavior, and the required store, account, library, gift, order, and support testing scope.

### Adventures read next

1. 02 Projects/[C] Shared WCAG 2.2 AA Accessibility Design & Engineering Specification.md
2. 02 Projects/Benny & Penny's Adventures/[C] Accessibility WCAG 2.2 AA Handoff.md

## Book Series

The shared specification also applies to accessible customer-facing digital books, media, downloads, and support resources.

## MCD - Mercury Call Desk

AI receptionist / call-desk platform (built on a third-party platform base — vendor confidential, do not disclose) sold by commission-only 1099 sales partners, managed in GoHighLevel, with a reseller-partner pathway. Separate project. Phases: 1) agent onboarding (now) · 2) GoHighLevel CRM (next, incl. planned GHL MCP) · 3) reseller channel (later). The 14-file Sales Partner Launch Kit was migrated in as canonical onboarding on 2026-06-24.

A dedicated `04-brand-assets/` system is now added: editable SVG masters, light/dark wordmark variants, icon-only SVG, provisional brand colors, and a catalog. The new branded 18-page Sales Partner Launch Kit is company-ready. Its cover has been corrected: the logo is now integrated into the navy artwork with no hard-edged image block. The final font and an outlined production release remain open.

Read first:

```txt
02 Projects/MCD - Mercury Call Desk/[C] AI Index & Commands.md
02 Projects/MCD - Mercury Call Desk/[C] Owner Setup & Open Decisions.md
02 Projects/MCD - Mercury Call Desk/04-brand-assets/00_READ_ME_FIRST.md
02 Projects/MCD - Mercury Call Desk/04-brand-assets/04-brand-documentation/[C] Logo Asset Catalog.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/00_READ_ME_FIRST.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/15_BRANDED_SALES_PARTNER_LAUNCH_KIT.md
02 Projects/MCD - Mercury Call Desk/01-agent-onboarding/[C] Sales Partner Launch Kit Cover Revision.md
01 Daily Logs/[C] 2026-06-25 MCD Branded Sales Partner Launch Kit.md
01 Daily Logs/[C] 2026-06-25 MCD Brand Assets Cataloged.md
01 Daily Logs/[C] 2026-06-25 MCD Remove Non-Compete and Confidential Vendor.md
01 Daily Logs/[C] 2026-06-24 MCD Project Setup.md
```

Standing rules: **no non-compete** in any agreement (confidentiality + IP + non-solicit only); **do not disclose the underlying platform vendor** to agents, prospects, or public/marketing materials.

## MCD CRM - Agent and Admin Portals

Mercury Call Desk Mini CRM is now a live production foundation: a protected Admin portal, public partner sign-up, and a Neon-backed system of record with GoHighLevel reserved as a one-way backend. It remains separate from the MCD sales-partner program project above.

Production status: `hpintojr/crm.mcd` releases directly from `main` to Vercel. `https://crm.mercurycalldesk.com` is active, the dedicated Neon production schema is applied, and the initial OWNER account has completed password + TOTP MFA activation. Slices 00–02 are live: public signup, authentication/activation, and admin applicant review. Stripe Connect, Cloudflare R2, agent portal, and live inbound GHL onboarding webhooks remain later slices.

Read first:

```txt
01 Daily Logs/[C] 2026-07-01 MCD CRM Production Foundation Launch.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] AI Handoff & Scope Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Build Specs — Index & Roadmap.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] v1.2 Business-Terms Reconciliation & GHL Flows.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Automated Agent Onboarding Flow (GHL-first).md
Repo: hpintojr/crm.mcd
```

Next action: remove the temporary owner-bootstrap deployment configuration, restore the normal Vercel build command, and redeploy. Then build Slice 03 — secure inbound GHL document webhooks and invited-user provisioning.

Standing rules: GHL is backend-only; never expose GHL/pricing/other-client data to agents; no per-agent GHL logins; no SSNs or raw bank data in the CRM; Finance approves payouts; every sensitive action is audited.

## Rules

- Keep portfolio, store, and book production separate.
- Use the shared WCAG specification before changes.
- Do not store secrets or customer data in this workspace.
- Do not claim legal accessibility certification without independent review.
