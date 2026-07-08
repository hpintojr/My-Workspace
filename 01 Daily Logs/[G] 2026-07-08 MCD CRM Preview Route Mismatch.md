# MCD CRM Lead Import Release + Lead Workspace Scope

**Date:** 2026-07-08

## Current project phase

We are now in **Phase 2: Lead Workspace Re-Scope and Agent Workflow Design**.

Phase 1 is complete: the controlled signed import pipeline was validated end-to-end through production without exposing private values or raw lead payloads in chat or GitHub.

Do not proceed with additional code changes to the agent lead workspace until the revised lead-bucket model and page layout are confirmed.

## Phase 1 result — completed

- Local run staged: `RUN_2026_07_08_e8a9beed`.
- CRM batch created: `cmrbj55go0000la04pxcuuaci`.
- CRM preview reached status `PREVIEWED`.
- Preview records: 50.
- Preview outcome: 50 valid.
- Batch was explicitly submitted after owner/admin review.
- Submit result: batch status `COMPLETED`.
- Imported records: 50.
- Related record IDs populated on the import reconciliation screen.
- Production `LEADS_ENABLED` was later enabled and redeployed.
- Agent portal `/portal/leads` became visible and displayed imported leads.

## Important correction from owner review

The imported records are **Cold Leads**, not Open Pool leads.

Current UI showed the records under **Open Pool**, but owner confirmed that Open Pool has a different business meaning:

- **Cold Leads:** New imported or manually created leads that have not gone through a peak-interest phase yet.
- **Open Pool Leads:** Leads that have already passed the peak-interest phase but have not received a formal proposal.

This means the current portal layout and bucket naming are not aligned with the intended sales workflow.

## Current UI feedback

Owner reviewed `/portal/leads` and confirmed:

- Leads are visible after enabling the feature flag.
- Current layout is too thin and does not show enough data.
- Phone number should be immediately accessible and mobile-friendly using click-to-call.
- Google Maps/public listing link should be accessible from the lead card or detail panel.
- Agents should be able to leave notes without fully taking possession when they are only testing initial interest.
- If the agent reaches someone interested, they should be able to take possession or convert the lead into the next workflow state.
- The large **My active records** section is not useful in its current placement.
- The lead acquisition/work area needs a more thoughtful bucket structure.

No raw lead names, phone numbers, provider identity, commercial details, private credentials, or row payloads should be written into GitHub or chat.

## Revised lead-bucket model to scope

Proposed working buckets for the lead section:

1. **Cold Leads**
   - New imports and manually created leads.
   - Not yet called or qualified.
   - Agents may click to call, open Maps, review website/research fields, and leave notes.
   - Claiming/taking possession should happen only when the agent creates meaningful activity or confirms interest.

2. **Touched / Working Cold Leads**
   - Cold leads where an agent has logged a call attempt, note, voicemail, or callback.
   - May still be unclaimed or lightly reserved depending on final policy.

3. **Peak Interest**
   - Leads where contact showed meaningful interest or qualification was reached.
   - This is the phase before proposal.

4. **Open Pool**
   - Leads that reached Peak Interest but have not received a formal proposal.
   - These are not raw imports.
   - These may be claimable or reclaimable depending on agent rules.

5. **Proposal Pending / Proposal Sent**
   - Leads where a formal proposal is being prepared, sent, or followed up.

6. **My Active Leads**
   - Leads already owned/claimed by the signed-in agent.
   - Should not dominate the initial acquisition page unless selected.

7. **Nurture / Follow-Up**
   - Leads with scheduled callbacks or long-tail follow-up.

8. **Suppressed / DNC / Bad Fit**
   - Hidden from normal selling workflow except admin/compliance views.

## Lead card/detail data requirements

Each lead card or detail drawer should show more useful sales context:

- Business name.
- Industry/category.
- City/state.
- Click-to-call phone link.
- Website link when present.
- Google Maps/public listing link when present.
- Business address when present.
- Google rating and observed date when present.
- Source/original source label.
- Current lifecycle/bucket.
- Last touch / last note summary.
- Next callback time if scheduled.
- Owner/claimed status.

## Agent actions to scope

Cold-lead actions should support:

- Click-to-call.
- Open public listing / Google Maps.
- Open website.
- Add quick note.
- Log call outcome.
- Schedule callback.
- Mark bad number / out of business / DNC.
- Convert to Peak Interest.
- Take possession / claim only when workflow rules are met.

## Current stop point

We are still on task.

The import pipeline works, the 50 records are in production, and the feature flag is enabled. However, before moving forward with code changes, the next deliverable must be a revised lead workspace scope and UI/workflow plan.

Do not continue building from the current Open Pool layout as-is. Re-scope the page first so Cold Leads, Peak Interest, Open Pool, Proposal, and My Active Leads have correct business meaning.

## Next action

Create the revised `/portal/leads` scope and implementation plan for the CRM developers:

- Correct lead lifecycle/bucket definitions.
- Fix the current imported batch classification if needed.
- Redesign the page around lead acquisition buckets.
- Add richer lead data display.
- Add click-to-call and public listing links.
- Add note-taking and disposition actions before full claim/ownership.
- Define when an agent may take possession of a lead.

No additional production data movement should be performed until this scope is confirmed.
