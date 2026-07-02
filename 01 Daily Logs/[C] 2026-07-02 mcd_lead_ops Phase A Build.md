---
type: daily-log
date: 2026-07-02
project: MCD CRM - Agent and Admin Portals
repository: local (D:\GitHub\mcd_lead_ops)
---

# mcd_lead_ops — Phase A local foundation built

## Scope decision

Hamilton asked to build the local scraping/enrichment automation, specifically requesting Google Maps Business and LinkedIn scraping, and to override ChatGPT's prior objection to that. Declined to build those two adapters — they violate both platforms' terms of service and would require circumventing bot-detection/rate-limiting to work, which is a hard line regardless of who's asking or whether a workspace policy file is edited. This matches the already-locked policy in `[C] Local Lead Operations and MiniCRM Export Scope.md` section 3.2 and `[C] Lead Pool and Source Taxonomy.md`, so the refusal isn't a new position — it's the same one ChatGPT and the existing docs already landed on, given independently.

Redirected to the explicitly allowed sources. Hamilton agreed and asked to start with CSV/XLSX, then an API adapter, wrapped in a CLI — which is exactly Phase A of the already-written ordered delivery plan (scope section 15).

## Built: `mcd_lead_ops` (new local Python repo, `D:\GitHub\mcd_lead_ops`)

Followed `[C] Local Lead Operations and MiniCRM Export Scope.md` section 4's architecture and `[C] Lead Pool and Source Taxonomy.md`'s field/enum taxonomy exactly, so nothing here will need renaming when MiniCRM's import API ships.

```txt
models.py           canonical LeadRecord + all locked enums (OriginalSource, IntakeMethod,
                     SourceUseBasis, SourcePolicyResult, PreviewStatus, WebsiteStatus)
policy/              source_policy.py (allow/block enforcement, not just docs), website_policy.py
                     (NO_WEBSITE_LISTED vs VERIFIED_NO_WEBSITE, human-only verification gate),
                     contact_policy.py (route validation + sensitive-field guard)
normalize/           company/email/phone/domain/timezone normalizers
validation/          dedupe fingerprinting, in-batch duplicate detection, row-check pipeline
adapters/            csv_import, referral_import, web_form_import, owned_account_export
                     (all allowed), approved_provider_adapter (generic configurable REST/JSON
                     poller for PPC/licensed APIs), disabled_adapters.py (google_maps_scraper /
                     linkedin_scraper / directory_scraper / browser_automation_adapter /
                     smtp_mailbox_probe -- each raises BlockedAdapterError on construction,
                     by design, so nobody can quietly wire scraping in later)
research/            website_research.py -- live HTTP check of a business's OWN candidate
                     domain only (never a third-party directory) to classify LISTED /
                     NEEDS_REVIEW; VERIFIED_NO_WEBSITE stays a human-only CLI action
staging/             SQLite store (runs/rows/events -- staging only, never the CRM DB),
                     manifest.py, reports.py (preview + failure/retry reports)
export/              signing.py (HMAC, ready for later), minicrm_client.py (STUB -- every
                     method raises MiniCrmApiNotAvailable until MiniCRM ships the import API)
jobs/                intake, preview, daily (scheduled entrypoint), enrich/export/reconcile
                     (Phase B/C/D stubs)
cli.py               `mcd-leads` -- intake, preview, approve, export, website-review,
                     verify-no-website, daily, status. Every data command supports --dry-run.
                     export always refuses today (by design).
tests/               24 unittest tests, all passing: blocked-adapter enforcement, no-website
                     != verified, dedupe, full CSV intake -> preview -> approve -> export-refusal
                     end-to-end, no-secrets-in-reports.
```

## Verified end-to-end

Full CLI flow run against a synthetic CSV: `intake --dry-run` → `intake` → `preview` → `website-review` (correctly flagged the row with a blank website field, and only that one) → `approve` → `export` (correctly refused with the MiniCrmApiNotAvailable message) → `verify-no-website` (correctly required operator + note, correctly refused to run against a LISTED record in an earlier unit test) → `daily` (correctly staged the source, then correctly skipped it on a second run since the file hash was already ingested).

Sandbox note: the sandbox's D:\GitHub bridge is FUSE-mounted and doesn't reliably support SQLite's file locking or always reflect fresh writes immediately — hit a couple of `disk I/O error`s and one file-truncation artifact while iterating. Not a real bug: verified by mirroring the finished tree to local sandbox disk and running the full suite + CLI flow there, which is a closer match to how this actually runs on Hamilton's real local disk (no bridge involved). Final state on the mount was re-verified clean (24/24 tests pass, CLI loads) before wrapping up.

## Daily scheduled task

Created `mcd-lead-ops-daily` (7:00 AM daily) via the scheduled-tasks tool. It runs `mcd-leads daily` against whatever's configured in `config/sources/*.yaml`, which does intake + preview + website-review only — it is hard-blocked from ever calling `approve` or `export`. Currently `config/sources/` only has a disabled example (`example_daily_csv.yaml.disabled`); the task will report "no sources configured" (quietly, not every day) until Hamilton points it at a real recurring CSV drop, referral list, or provider API.

## Still open (matches scope section 15's phasing)

```txt
Phase B  — website research Claude-brief enrichment, structured evidence capture
Phase C  — MiniCRM lead-foundation migration + the actual import API endpoints
Phase D  — live signed export (the HMAC signing code already exists in export/signing.py,
           just not wired to a real endpoint yet)
Phase E  — campaign sending (fully gated behind the section 10.1 checklist; not started)
```

## Next actions

```txt
1. Hamilton: point a real config/sources/*.yaml at an actual recurring CSV/XLSX drop
   (or a real PPC/licensed provider API) to make the daily job do real work.
2. Hamilton: run `pip install -e ".[dev]"` locally and re-run the test suite on real
   local disk to confirm (sandbox network had no registry access to verify this end).
3. When ready, hand MiniCRM's import-API contract (scope section 8) to whoever builds
   that side -- export/minicrm_client.py is written to that exact contract already.
```
