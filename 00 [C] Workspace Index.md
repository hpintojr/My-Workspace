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

AI receptionist / call-desk platform (built on a third-party platform base — vendor confidential, do not disclose) sold by commission-only 1099 sales partners, managed in GoHighLevel, with a reseller-partner pathway. Separate project. The 14-file Sales Partner Launch Kit was migrated in as canonical onboarding on 2026-06-24.

A dedicated `04-brand-assets/` system is now added: editable SVG masters, light/dark wordmark variants, icon-only SVG, provisional brand colors, and a catalog. The new branded 18-page Sales Partner Launch Kit is company-ready. Its cover has been corrected: the logo is integrated into the navy artwork with no hard-edged image block. The final font and an outlined production release remain open.

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

Mercury Call Desk Mini CRM is a live production foundation: protected Admin and Partner portals, public partner signup, Neon-backed system of record, and GoHighLevel as a private onboarding/document backend. It remains separate from the MCD sales-partner program project above.

### Current production status

Phase 1 onboarding has been validated end to end in production with a controlled synthetic applicant:

```txt
Signup → agent-signup in GHL → owner confirm call/approve → agent-approved
→ GHL sends four e-sign documents → four completion relay webhooks
→ Neon records all onboarding gates → Sales Agreement countersigned
→ user provisioned → IONOS activation email delivered → partner activates and reaches /portal
```

The five GHL workflows are published and working. The partner portal correctly shows all document gates complete and keeps lead access locked pending manager certification. SMTP delivery is working from `no-reply@mercurycalldesk.com`. Historical SMTP failures were resolved after correcting the mailbox credentials and redeploying production.

Production source: `hpintojr/crm.mcd` → `main` → Vercel. Production application: `https://crm.mercurycalldesk.com`. Neon base schema is applied. Agents still have no GHL logins.

### MCD CRM read next

```txt
01 Daily Logs/[C] 2026-07-01 MCD CRM Phase 1 End-to-End Onboarding Validated.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] AI Handoff & Scope Review.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] GHL Production Build-Out Runbook.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Implementation Status — 2026-07-01.md
02 Projects/MCD CRM - Agent and Admin Portals/MCD CRM - Agent and Admin Portals Overview.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Build Specs — Index & Roadmap.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] v1.2 Business-Terms Reconciliation & GHL Flows.md
02 Projects/MCD CRM - Agent and Admin Portals/[C] Automated Agent Onboarding Flow (GHL-first).md
Repo: hpintojr/crm.mcd
```

### Current next actions

1. Improve the Admin applicant view with clear account activation, email delivery, onboarding, certification, and last-login status.
2. Prevent duplicate document sends by replacing the post-approval e-sign action with a locked approved state.
3. Add optional `Company / Legal Entity Name` to signup without replacing the individual legal signer.
4. Complete California counsel review before using the agreement drafts for real partner contracting.
5. Set up the MCD demo calendar / Google Meet before Phase 1.5 booking work.
6. Create GHL attribution custom fields before Phase 2 relays.
7. Keep lead, servicing, commission, and finance feature flags disabled until their schema migrations and controlled tests are complete.

Standing rules: GHL is backend-only; never expose GHL/pricing/other-client data to agents; no per-agent GHL logins; no SSNs or raw bank data in the CRM; Finance approves payouts; every sensitive action is audited.

## Rules

- Keep portfolio, store, and book production separate.
- Use the shared WCAG specification before changes.
- Do not store secrets or customer data in this workspace.
- Do not claim legal accessibility certification without independent review.
