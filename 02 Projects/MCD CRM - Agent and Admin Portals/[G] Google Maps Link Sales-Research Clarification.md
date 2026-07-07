---
type: policy-clarification
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
---

# Google Maps Link Sales-Research Clarification

## Decision

A Google Maps URL may be retained and used as a **manual sales-research reference** during an outbound conversation, including review/reputation-management research.

Examples of permitted manual use:

- opening the business's public Maps listing before or during a call;
- reviewing public ratings and recent reviews to prepare a reputation-management conversation;
- retaining the Maps URL as a supplementary `source_evidence_url` or research reference;
- documenting a human observation in a call note without copying unnecessary review content into the CRM.

## Boundary that remains unchanged

The policy prohibition is against **automated extraction or scraping** from Google Maps, LinkedIn, directories, browser automation, or similar sources.

A row must accurately preserve how it entered the system:

```txt
Allowed:
- lead obtained through a permitted CSV, referral, web form, PPC, licensed provider, or owned-account source;
- Google Maps URL later added or used manually for research.

Not allowed without an approved policy change:
- using a scraper, automation, or bulk Google Maps/directory extraction to build the lead list;
- relabeling a scraped list as CSV import to bypass source controls.
```

## First supervised import rule

A CSV that contains a Google Maps link is not automatically disqualified. Before import, record the real source/use basis for the lead list. If the businesses came from a permitted source and the Maps column is supplemental manual research, the row can proceed through normal preview, approval, suppression, and duplicate controls.

Do not import a list solely because a Maps link exists; do not omit the actual source of the data.