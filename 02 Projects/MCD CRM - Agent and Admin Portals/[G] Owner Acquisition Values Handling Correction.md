---
type: policy-correction
date: 2026-07-07
project: MCD CRM - Agent and Admin Portals
---

# Owner Acquisition Values Handling Correction

Treat the actual acquisition code, reference, provider identity, purchase record, and related commercial details as private local-only configuration.

Do not add actual values to future source-controlled code, workspace notes, sample YAML, issue/PR text, test fixtures, preview reports, or routine console logs.

Use placeholders in shared documentation:

```text
<owner-only code>
<owner-only reference>
<owner-only provider value>
```

The local exporter must read actual values only from a private ignored owner configuration source at runtime, then send them through the dedicated signed owner-acquisition route after batch creation and before row upload.

Existing historical records should be treated as unsuitable for secrets or commercially sensitive data. Use a fresh owner-only reference for the production run rather than relying on any value previously documented in source control.