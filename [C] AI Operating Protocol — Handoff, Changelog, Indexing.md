# [C] AI Operating Protocol — Handoff, Changelog, Indexing

*Authoritative. Any AI (Claude, ChatGPT, Gemini) working on Hamilton's projects follows this. Created 2026-07-06 after three days were lost to two AIs working the same repo with no structure. Read this fully before you touch a repo.*

## Why this exists

Work kept getting redone because assistants (a) re-investigated already-solved incidents, (b) claimed root causes they never proved, (c) edited the same repo at the same time, and (d) never left a clean record of what they changed or what to do next. This protocol removes all four failure modes. It is boring on purpose.

## 1. The Lock — one executor at a time

There is exactly one "execution lock" per project. Only the lock-holder may commit, merge, deploy, run migrations, or change settings. Everyone else may read and verify only.

- The lock lives in the project folder as `LOCK.md`. Format:

```txt
holder: claude            # or chatgpt / gemini / hamilton
scope: crm.mcd            # what the lock covers
since: 2026-07-06T22:40Z  # UTC
intent: merge PR #30 and run first live import
```

- **Default holder: Claude.** To take the lock, another AI must be handed it in writing by the current holder (update `LOCK.md` and say so in a log). Never assume you hold it — read `LOCK.md` first.
- If you are NOT the holder: you may investigate read-only and write a `[G]`/`[C]` findings log, but you must not commit. Put proposed changes in the log for the holder to apply.
- Release the lock when you stop: set `holder: none` and write the handoff (section 4).

## 2. Prove before you claim

Never write "the root cause is X" unless you have direct evidence. Acceptable evidence: a build you ran, a query you executed, a diff you read, a live request you made. "The diff doesn't touch this file so it can't be the cause" is NOT evidence — the 3-day incident was a routing collision in a file the diff never touched. If you only have a hypothesis, label it **HYPOTHESIS** and say what test would confirm it.

## 3. The Changelog — every session, no exceptions

Every working session produces one daily log in `01 Daily Logs/`:

- Filename: `[C] YYYY-MM-DD <short title>.md` (Claude) or `[G] YYYY-MM-DD <short title>.md` (ChatGPT). Multiple sessions in a day get a `b`, `c` suffix.
- Required sections (keep them — downstream AIs parse these):

```txt
## What I changed        (files, commits, PRs, deploys — with SHAs/PR numbers/URLs)
## Evidence              (how I know it worked: build IDs, queries, live tests)
## Still open            (what is NOT done, with enough detail to resume cold)
## Start here next       (the single next action, and where its context lives)
## Handback              (lock status + one line for the next AI)
```

- If you changed anything outside the current scope, say so explicitly under "What I changed" so it is never a silent surprise.

## 4. Handoff — make the next AI succeed cold

Assume the next session has zero memory. In the daily log's **Handback**, state: (a) who holds the lock now, (b) the exact next action, (c) the one file to read first for context. Update the project **Overview.md** "Current status" and the workspace **CLAUDE.md** "Current next work" so they never contradict the newest log. If a log and an Overview disagree, the newest dated log wins — reconcile immediately, don't leave both.

## 5. Indexing — keep the map current

`00 [C] Workspace Index.md` lists active projects and their key docs. When you add an authoritative doc (a scope, a runbook, an incident record), add a one-line pointer to it in the Index and in the project Overview. A doc nobody links to does not exist.

## 6. Incident memory — never re-fight a solved fight

Before investigating a symptom, search `01 Daily Logs/` and the project's incident record for that symptom. If it was solved before, start from that conclusion. The "login hang" was solved twice and re-investigated a third time for 12 hours because nobody checked. Record every incident once, in the project's incident section, with: symptom, proven cause, fix, and how to recognize it again.

## 7. Scope discipline

Do the task in front of you. If you discover other problems, log them under "Still open" and raise them — do not opportunistically rewrite unrelated code. Scope creep is how a one-line fix becomes a three-day loop.

## 8. Hard safety lines (all AIs)

```txt
- No secrets/credentials/customer PII in the repo, ever.
- Claude does not provision production secrets or move money — Hamilton does those.
- No scraping adapters (Google Maps / LinkedIn / directory) — declined on ToS/policy grounds, stubbed in code.
- No local process writes directly to Neon/Postgres.
- Edit workspace + project repos through the GitHub MCP only, never local file writes.
```
