# MCD CRM — Recovery PR Acceptance Checklist

**Recovery PR:** `crm.mcd#5`  
**Branch:** `recovery/e59-route-fix`  
**Preview commit:** `92c052a99c3d0375ca178abc589ee90d38d033bf`  
**Status:** Build verified; authenticated acceptance still required

## Goal

Confirm the route-collision recovery is safe to merge before any lead-foundation branch is promoted.

## Verified automatically

```txt
- Recovery Preview is READY.
- Build completed successfully.
- The route manifest includes /login, /portal, /admin lead routes, and the existing GHL relay routes.
- The duplicate dynamic lead route collision is absent from the recovery commit.
```

## Authenticated acceptance steps

Use an authorized Admin account and an Agent account in the Preview environment.

### 1. Login and access boundaries

```txt
[ ] Admin can sign in at /login.
[ ] Agent can sign in at /login.
[ ] Admin reaches Admin workspace without error.
[ ] Agent reaches Agent portal without error.
[ ] Agent cannot access Admin-only areas.
```

### 2. Lead routes

```txt
[ ] Admin lead list loads.
[ ] Existing lead detail opens through the canonical /admin/leads/[leadId] route.
[ ] Lead create/edit flow shows no route or server error.
[ ] Agent Lead portal loads and respects ownership/pool boundaries.
[ ] Open-pool claim/release controls behave as currently intended.
```

### 3. Core portal routes

```txt
[ ] /portal loads.
[ ] /portal/leads loads.
[ ] /portal/tasks loads.
[ ] /portal/inbox loads.
[ ] /portal/account loads.
[ ] /admin loads.
[ ] /admin/settings loads.
```

### 4. Controlled non-goals

```txt
[ ] Do not test or enable new lead-import features.
[ ] Do not send email/SMS.
[ ] Do not create GHL opportunities, invoices, or financing activity.
[ ] Do not use servicing onboarding while the servicing flag remains disabled.
```

## Acceptance decision

```txt
PASS: All applicable routes load; role boundaries are correct; no unexpected external action occurs.
FAIL: Any server error, incorrect authorization result, route mismatch, or unintended external action.
```

If PASS, record the tester/date/Preview URL in the PR #5 review before merging. Then retarget or rebase the lead-import contract chain in order:

```txt
PR #6 signed contract
→ PR #8 workflow rules
→ PR #9 HTTP boundary
→ PR #7 schema proposal (documentation only)
```
