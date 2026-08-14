# MCD CRM — PR #78 Admin Acceptance on Controlled Leads + Cold Lead Review Anchor

**Date:** 2026-07-10  
**Repository:** `hpintojr/crm.mcd`  
**Scope:** Bug fixes surfaced during authenticated production acceptance walkthrough

## Bugs found

During Hamilton's authenticated acceptance run on `crm.mercurycalldesk.com` (post PR #77), two real bugs blocked further step recording on the Cold Lead workflow:

1. **Owner redirected to `/login` on Save disposition.** `activeAgent()` in
   `src/lib/lead-workspace.ts` called `requireRole(["AGENT"])`. Any ADMIN_ROLES
   user (including OWNER hpinto@mercurycalldesk.com) trying to record a Cold
   Lead disposition, apply DNC, or trigger click-to-call was redirected by
   `authz.ts` to `/login?e=forbidden`. Meanwhile `getPortalContext()` allowed
   OWNER to VIEW `/portal/leads`, so the mismatch produced a silently broken
   Save flow. This blocked all live-behavior acceptance steps (7-12 in the
   acceptance board).
2. **Cold Lead review scrolled to top of list.** The `selectedColdLead`
   `<section>` had no anchor id. `Review` links only set `?selectedCold={id}`;
   `Disposition` links targeted `#coldDisposition` (a form field mid-way down).
   Operators had to scroll past the entire Cold Leads list to find the detail.

## PR #78

```txt
PR: #78 — feat(leads): allow admins to act on controlled test Leads only + Cold Lead review anchor
Status: merged to main (squash)
Head before merge: 0c4928b4086ef6ced155de38460d8a4ea3e8f25e
Merge commit: 3bccb51dd3bff14f05e28905fc13734334e28cc2
Production /api/status commit: 3bccb51dd3bff14f05e28905fc13734334e28cc2
```

## Built

```txt
1. src/lib/lead-workspace.ts
   - Added imports for ADMIN_ROLES (from @/lib/authz) and isControlledTestLead
     (from @/lib/controlled-test-leads).
   - Rewrote activeAgent() to accept optional { leadId } and handle admin path:
     * AGENT branch is unchanged - existing certification gate preserved verbatim.
     * ADMIN_ROLES branch requires an explicit leadId, fetches the target Lead,
       verifies isControlledTestLead(...), throws with a clear message if not
       controlled, and auto-provisions an APPROVED, canClaimLeads: true Agent
       for the admin's user if none exists. The auto-provisioned Agent has a
       distinctive legalName 'Acceptance Operator ({role})', a reviewNote
       pointing to PR #78, and a placeholder mobile 555-010-0000.
   - Updated three callers to pass leadId into activeAgent():
     * logColdLeadCallInitiated
     * logColdLeadDisposition
     * suppressLeadForDnc
   - logLeadInteraction (owned-Lead path) is intentionally unchanged - admins
     cannot own real Leads and there is no acceptance step that requires this
     path via the admin route.
2. src/app/portal/leads/page.tsx
   - Added id='cold-lead-review' and scroll-mt-6 on the selectedColdLead
     <section> container.
   - Updated three row-level anchors (open-cold-lead primary link,
     review-cold-lead Review, record-cold-disposition Disposition) to use
     #cold-lead-review. Deep-links now scroll straight to the detail.
3. scripts/check-lead-flow-alignment.ts
   - Six new assertContains lines protect: ADMIN_ROLES, isControlledTestLead,
     the exact 'Admins may only act on controlled test Leads' error message,
     the 'Auto-provisioned acceptance operator' reviewNote sentinel, and both
     the id='cold-lead-review' attribute and the '#cold-lead-review' href on
     the portal/leads page.
```

## Safety boundary

```txt
No Prisma schema changes.
No Neon migration.
No feature-flag changes.
No GHL workflow activation.
No live GHL API calls.
No live import/export submission.
No Servicing/Commissions/Finance/payout/client-onboarding activation.

The only Lead business-rule change is a narrowly-scoped admin permission
that lets ADMIN_ROLES record disposition/DNC/call activity on controlled
test Leads only. Real production Leads are unaffected because:
- The AGENT branch preserves the existing 'canClaimLeads: true'
  certification gate verbatim.
- The ADMIN branch throws with a clear error if the Lead is not marked
  as controlled test data (isControlledTestLead false).
- The auto-provisioned Agent for admins is clearly identifiable via its
  reviewNote sentinel, so any Agent listing query can filter it out.
```

## Verification

```txt
All four required CI checks green on PR head 0c4928b4086ef6ced155de38460d8a4ea3e8f25e:
- Vercel Preview Comments -> success
- policy-check -> success
- Typecheck and contract guards -> success
- build -> success

Vercel preview URL:
  https://crm-mcd-git-pr-78-admin-acce-b8d4bf-hamiltons-projects-f65eeb81.vercel.app

Preview smoke tests:
  /api/status -> 200 preview, branch=pr-78-admin-acceptance-controlled-and-anchor,
    commitSha=0c4928b4086ef6ced155de38460d8a4ea3e8f25e.
  /portal/leads -> 200 sign-in boundary, not 404/500.
  /admin/leads/testing -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 without CRON_SECRET (expected).

Production smoke tests on crm.mercurycalldesk.com:
  /api/status -> 200 production, branch=main,
    commitSha=3bccb51dd3bff14f05e28905fc13734334e28cc2.
  /portal/leads -> 200 sign-in boundary, not 404/500.
  /admin/leads/testing -> 200 sign-in boundary, not 404/500.
  /api/cron/leads/aging -> 401 without CRON_SECRET (expected).
```

## Follow-up for Hamilton

Now that the disposition Save flow works for admins on controlled Leads, the
9 Deferred acceptance steps (7-12, 14, 15, 16 from the walkthrough) can be
completed with real live-behavior evidence:

1. Seed a controlled test Lead at /admin/leads/controlled-test-data.
2. Walk that single Lead through: click-to-call -> no-answer -> callback
   disposition -> claim -> DNC. That single Lead's audit trail satisfies
   steps 7, 8 (via failure-path review), 9, 10, 11, and 12.
3. Assign a controlled warm reply at /admin/leads/replies -> step 14.
4. Run controlled GHL harness previews at /admin/integrations/test-events
   for appointment and opportunity families -> steps 15 and 16.
5. Open Vercel dashboard, check runtime logs for the latest production
   deployment -> step 4.
6. Record owner production decision -> step 18.

After acceptance passes: 13-layer hardening backlog remains open.

## Current state after PR #78

```txt
PR #34 through PR #78 merged and deployed.
Custom domain crm.mercurycalldesk.com is on latest production commit
  3bccb51dd3bff14f05e28905fc13734334e28cc2.
Cold Lead workflow disposition/DNC/click-to-call server actions now accept
  admin users on controlled test Leads only, unblocking the authenticated
  acceptance walkthrough for the 9 Deferred steps recorded in the
  2026-07-10 walkthrough.
Guard script scripts/check-lead-flow-alignment.ts locks the new behavior.
```
