# MCD CRM — Portal, Schedule, and Lead Pool Progress

**Date:** 2026-07-02  
**Project:** MCD CRM — Agent and Admin Portals

## Production progress

### Phase 1 onboarding remains validated

The controlled partner workflow remains complete in production:

```txt
Public signup
→ GHL contact + agent-signup tag
→ owner confirmation call + approval
→ four GHL e-sign documents
→ individual completion relays
→ countersigned Sales Partner Agreement
→ MiniCRM user provisioning
→ IONOS activation email
→ credential and MFA completion
→ active Partner Portal access
```

Admin operations visibility is deployed. Applicant cards show account, onboarding, activation, last-login, certification, and lead-access status. Approved applications no longer expose a repeat e-sign approval action.

### Partner portal sidebar and Schedule

The Agent Portal sidebar is established as:

```txt
Dashboard
Tasks
Inbox
Leads
Proposals
Schedule
────────
Training
Resources
Settings
Light/Dark mode
Sign Out
```

The Schedule is a read-only MiniCRM view during this phase. GHL remains the source for booking, edits, cancellations, guest invitations, calendar identity, and Google Meet creation.

The GHL-to-MiniCRM appointment relay is validated for:

```txt
Booked
Confirmed
Cancelled
No-show
Completed / Showed
Rescheduled
```

Each event updates the same MiniCRM appointment record rather than creating a duplicate. The portal only shows **Join meeting** for Scheduled and Confirmed appointments. It hides the link for Cancelled, No-show, and Completed records.

Appointments preserve their source calendar timezone on intake. The Partner Portal formats the stored event in the signed-in viewer's browser/device timezone instead of hardcoding Pacific time.

### Calendar operating model

The company demo calendar is connected through `mercurycalldesk@gmail.com` in GHL with Google Meet. The host calendar can receive the event directly without necessarily receiving a separate invitation email. The booking contact and manually added guests receive invites.

Agents may be added as calendar guests when appropriate. Agent-owned Gmail/calendar connections are a later graduation-stage capability, after an agent is ready to book and close their own demos. Agents remain MiniCRM users and do not receive GHL logins.

### Company / legal entity registration

The optional `Company / Legal Entity Name` field is now supported for an applicant registering through an LLC, corporation, or DBA. It stays separate from the individual legal signer and does not change the current agreement execution flow.

The production data update is applied. Signup validation, signup capture, MiniCRM storage, and GHL contact input are aligned. Do not treat this field as a replacement for the individual signer name.

### Task workspace

The callback Task workspace is deployed to production. It shows the signed-in agent's scheduled callbacks split into:

```txt
Overdue follow-ups
Upcoming follow-ups
```

Each task links back to the related lead so the agent can document the result and establish the next action. The deployment is ready for controlled callback-record validation.

## Locked lead-pool naming conventions

These are separate from a lead's lifecycle, owner, referral protection, DNC/suppression state, and campaign tags.

| Pool / lane | Definition | Operating rule |
|---|---|---|
| **Cold Pool / Prospects** | Fresh scraped, validated business prospects that have not yet entered a branded email campaign or had documented two-way contact. | Company-owned records; use controlled import, assignment, DNC/suppression handling, and activity logging. |
| **Nurture / Marketing Email Pool** | Branded email-campaign prospects receiving authorized nurture messaging. | Delivery/open activity alone does not create a hot lead. Suppression and opt-outs must synchronize. |
| **Hot Leads** | A prospect that replies to a branded email or otherwise shows active intent. | Remove from automated nurture, alert the sales team, preserve source/campaign lineage, and route for prompt human follow-up. |
| **Open Pool** | Booked demo opportunities that become a no-show, plus eligible records released under the operating rules. | Available for qualifying agents to claim under the controlled, first-come claim process. |
| **Shark Tank** | Stalled prospects with an active proposal or contract-priced quote. | Quote windows can run roughly 30–90 days. The record remains in Shark Tank while the quote is active; the qualified closer able to get the prospect signed first receives the deal under the approved rule set. |
| **Referral** | Self-sourced or accurately entered referral lead. | Protected; do not place into Open Pool or Shark Tank through ordinary reassignment. |
| **House** | Company-controlled / reassigned servicing or sales record. | Mercury Call Desk may move an account to House under the business terms. |

## Lead rollout guardrails

- A cold lead earns protection only after documented two-way contact.
- Every import, claim, release, reassignment, activity, disposition, callback, booking, and suppression event must be auditable.
- DNC/opt-out is a full sales and marketing blackout. Do not message, call, email, or social-DM suppressed contacts.
- Agents do not receive GHL access. The MiniCRM owns the controlled lead workspace and only sends the appropriate demo handoff to GHL.
- Do not activate lead assignment, open-pool claiming, marketing-email routing, commission, servicing, or finance features until their migrations and controlled test cases are complete.

## Next engineering scope

1. Validate the deployed callback Task workspace with controlled callback records.
2. Build the controlled Lead Management slice: import/review, owner assignment, activity, disposition, notes, callback creation, and DNC/suppression handling.
3. Add pool-aware handling for Cold Pool / Nurture / Hot Leads / Open Pool / Shark Tank while preserving referral and House protections.
4. Connect the Demo Booked handoff to GHL only after lead ownership and appointment context are safely established.
5. Create the GHL attribution field map needed for Phase 2 payment, opportunity, invoice, and servicing relays.
