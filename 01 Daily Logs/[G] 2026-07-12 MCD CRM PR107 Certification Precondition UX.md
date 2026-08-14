# [G] 2026-07-12 MCD CRM PR #107 — Certification Precondition UX

**Holder:** ChatGPT  
**Scope:** `hpintojr/crm.mcd` + `hpintojr/My-Workspace`  
**Completed:** 2026-07-12T07:58Z

## Evidence

Vercel's seven-day runtime error aggregation contained an expected admin server-action failure on `/admin/agents/[id]/certify`: `Only an active agent can receive Lead eligibility.` The certification form rendered approval choices even when the agent was inactive or had incomplete onboarding documents, then relied on the server action to throw.

## Outcome

**PR:** https://github.com/hpintojr/crm.mcd/pull/107  
**Head:** `698937b34d086ab6d11bebc2db1ebcc4535faae2`  
**Squash merge:** `0c882fe3dadd85ec59b53cd234387be54fa2ec6e`

Changes:

- Added `approvalReady`, requiring Active agent status and all four onboarding documents complete.
- Disabled `APPROVED_WITH_COACHING` and `APPROVED_FOR_LIVE` until those prerequisites are met.
- Added a visible prerequisite summary with current agent status and document progress.
- Preserved `NOT_YET_APPROVED` for coaching or correction notes.
- Preserved server-side prerequisite checks for stale pages/race conditions.
- Converted expected stale prerequisite failures into redirects with clear warning banners instead of unhandled runtime errors.
- Added a success banner after a recorded decision.
- Preserved certification creation, `canClaimLeads`, approval metadata, and `AGENT_CERTIFICATION_RECORDED` audit behavior.

## Regression protection

Added `scripts/check-certification-preconditions.ts`, wired into `check:lead-flow-alignment` and the production build. Deployment verification now includes `Certification precondition UX guard passed.`

## Validation

All required release gates passed:

- Commission Policy — success.
- Verify CRM / Typecheck and contract guards — success.
- Application Build — success.
- Vercel preview `dpl_AXK1HcQZnRbqacykg8k7VKEkBpvz` — READY, zero unresolved toolbar threads.

Production:

- Deployment: `dpl_12C58zheLg4xhiETRzqxGUMLSSQC`
- State: READY
- Target: production
- Git SHA: `0c882fe3dadd85ec59b53cd234387be54fa2ec6e`
- Aliases: `crm-mcd.vercel.app`, `crm.mercurycalldesk.com`
- `/api/status`: HTTP 200, production, main, exact merge SHA, no-store and security headers intact.

## Safety boundary

- No agent was certified or changed.
- No eligibility or approval requirement changed.
- No production database record or schema changed.
- No feature gate, Lead routing, GHL, Servicing, Commission, Finance, payment, or payout action occurred.

## Next evidence-backed item

The remaining non-auth/non-cron runtime error is `Use reassignment controls for manager lead assignment.` on `/portal/leads`. The claim service correctly enforces that managers may only claim controlled test Leads, but the portal currently renders the claim button for any claim-eligible selected Lead. The next slice will align the rendered action and stale server-action boundary with the existing business rule without changing claim eligibility or ownership behavior.
