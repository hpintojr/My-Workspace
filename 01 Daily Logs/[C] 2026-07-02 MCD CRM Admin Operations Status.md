# MCD CRM — Admin Operations Status Update
**Date:** 2026-07-02
**Project:** MCD CRM — Agent and Admin Portals

## Completed

The first post-Phase-1 operating improvement is deployed to production.

The Admin applicant card now shows:

```txt
- Account state
- Onboarding completion progress
- Activation state
- Last login
- Certification state
- Lead-access state
```

Approved applicants no longer display the active approval/e-sign button. They show a non-actionable approval state instead, preventing routine duplicate document dispatch from the Admin page. The server action also treats a repeated approval attempt as a no-op.

The activation resend control appears only for a completed onboarding account that is still invited. It is not presented for an already active account.

## Validation

- Source: `hpintojr/crm.mcd` on `main`.
- Vercel production deployment completed successfully.
- No build errors were reported.
- No runtime error/fatal logs were present immediately after deployment.

## Next

1. Review the Admin status layout using the controlled test partner.
2. Stage optional Company / Legal Entity Name at signup as separate metadata; do not replace the individual legal signer.
3. Add a formal per-applicant timeline only if the status grid does not provide enough operational clarity.
