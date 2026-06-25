---
author: claude
type: daily
date: 2026-06-25
project: MCD - Mercury Call Desk
---

# Session Log — MCD: Non-compete removed + underlying vendor made confidential

## Decisions
- **No non-compete.** Removed entirely from the agent agreements and all active docs. Protection now relies on confidentiality + IP assignment + non-solicitation only.
- **Do not disclose the underlying platform vendor.** The vendor name is now treated as confidential and scrubbed from active/agent-facing docs; referred to generically as "the underlying platform" / "third-party platform base."

## What Was Changed
- Renamed the agreement: deleted `[C] Confidentiality IP and Non-Compete Agreement (DRAFT).md`; created `[C] Confidentiality and IP Agreement (DRAFT).md` (now "Confidentiality, IP & Non-Solicitation") — non-compete section removed, sections renumbered, non-solicit kept.
- Sales Partner Agreement: removed non-compete references (intro, §6.1, §11.1 now point to the Non-Solicitation agreement).
- Owner Setup: non-compete line → "REMOVED"; replaced the CA non-compete warning with a restrictive-covenants note; updated legal checklist + attorney-review note.
- AI Index: agreement filename updated; added a guardrail — "do not disclose the underlying platform vendor; no non-compete used."
- Vendor name scrubbed from: Overview, AI Index, Owner Setup, Confidentiality agreement, MCP Config Template, Reseller placeholder, plus workspace CLAUDE.md + Workspace Index.
- Screening Kit: "non-compete" wording changed to "conflicting contractual obligations" (still screens whether a candidate is blocked by someone else's agreement).

## Note
- `99-reference/` archives (original Gemini manual + conversation record) still contain the vendor name and the original non-compete text — left intact as historical source. The go-forward rule (don't disclose; no non-compete) is captured in the AI Index guardrails.
- Still not legal advice — attorney review recommended (arbitration, non-solicitation scope, 1099).

## Start Here Tomorrow
Agreements reflect: 50/50 comp, cleared-payment trigger, net-15, residuals stop at termination, CA law, binding arbitration (no opt-out), NO non-compete, vendor confidential. Next: dedicated calendar + booking links, or finalize MCP access for GHL.
