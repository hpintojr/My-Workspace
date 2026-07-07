---
type: daily-log
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
author: ChatGPT
next_owner: Claude
---

# [G] 2026-07-07 — Lead field expansion and owner-only provenance handoff

## User decisions recorded

```txt
- Preserve public Google Maps links as agent-usable sales research for ratings, reviews, and reputation-management calls.
- Add Business Address and Google Rating as first-class Lead fields before the first import.
- Use owner-only internal acquisition identifiers:
  source code: RAW072026
  acquisition reference: OP_ACQ_072026_001
- Do not expose the acquisition identifiers to Agents, Admins, Super Admins, Compliance,
  Finance, or import-review screens.
```

## Local readiness completed

```txt
- Hamilton has installed the local mcd-lead-ops virtual environment.
- CLI commands are available, including intake, preview, approve, export, reconcile, and status.
- Local MiniCRM configuration presence check returned True / True / True without exposing secrets.
- Uploaded CSV located locally as data/inbound/Raw_Leads.csv.
- Observed CSV headers:
  Business Name, Phone, Address, Industry, Location, Rating, Google Maps Link
```

## Current stop point

```txt
No local intake, approval, export, or live CRM import has been run.

The current production import contract does not yet support Business Address, Google Rating,
or a first-class Google Maps URL. Existing shared source fields are not an Owner-only vault.
```

## Handback

Implementation details and merge gates are in:

```txt
02 Projects/MCD CRM - Agent and Admin Portals/
[G] Lead Field Expansion and Owner-Only Provenance Implementation Handoff.md
```

Claude should implement, review, preview, and merge this focused change before the first CSV import. Existing Phase D production readiness remains valid, but it is not authorization to import this list before the new schema and authorization work is complete.
