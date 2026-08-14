# [C] ChatGPT→Claude Handoff Protocol — Composio Mandate

*Authoritative. Companion to `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md`. Where the two disagree, the Operating Protocol wins for anything outside this file's narrow subject: ChatGPT-to-Claude handbacks on the MCD CRM project, and Claude's required tool path.*

**Owner:** Hamilton Pinto Jr.  
**Written:** 2026-07-11 by Claude (Opus / 5.x) as lock holder on `hpintojr/My-Workspace` and `hpintojr/crm.mcd`.  
**Applies to:** every owner-authorized ChatGPT continuation window on MCD CRM. When the roles reverse (Claude hands back to ChatGPT), the mirror version of the same rules applies to Claude.

---

## 1. Claude MUST access My-Workspace through the Composio connector

Claude's only supported tool path for reading and writing `hpintojr/My-Workspace` (and the linked `hpintojr/crm.mcd` code repo) is the **Composio** MCP connector (`mcp__9c5746d4-...__COMPOSIO_*`).

```txt
- Read every workspace file (LOCK.md, Overview, daily logs, scope docs) via COMPOSIO_MULTI_EXECUTE_TOOL
  wrapping GITHUB_GET_REPOSITORY_CONTENT / GITHUB_GET_A_TREE / GITHUB_LIST_COMMITS.
- Verify the crm.mcd main HEAD via GITHUB_GET_A_BRANCH.
- Verify Vercel production deployments via VERCEL_GET_DEPLOYMENTS / VERCEL_GET_DEPLOYMENT.
- Commit protocol docs and daily logs via GITHUB_COMMIT_MULTIPLE_FILES (utf-8, atomic, one commit
  per session so history stays bisectable).
- Never write to a local D:\GitHub\My Workspace copy. The GitHub repo is the single source of
  truth (CLAUDE.md rule 1).
```

If Composio is not reachable in Claude's session, Claude **must** state that and stop; Claude may not fall back to inline pastes as authoritative state, guess at file contents, or ask Hamilton to hand-relay logs. The correct fix is to re-establish the Composio connection (via claude.ai connector settings or `/mcp` in an interactive session) and retry.

GitHub and Vercel are both currently connected under Composio account `github_ask-angel` (login `hpintojr`) and `vercel_robber-eight` (username `hpintojr`, team `hamiltons-projects-f65eeb81`). Claude must verify both toolkits are `ACTIVE` (via COMPOSIO_SEARCH_TOOLS' `toolkit_connection_statuses` block) before claiming to have picked up the lock.

## 2. What ChatGPT MUST produce at the end of every continuation window

Every owner-authorized ChatGPT coding window on MCD CRM ends with **all four** of the following, committed to `hpintojr/My-Workspace` `main`:

### 2.1 One `[G]` daily log per merged PR

One file in `01 Daily Logs/`, named `[G] YYYY-MM-DD MCD CRM PR<N> <short title>.md`. Required sections (identical to the Operating Protocol changelog rules):

```txt
## What I changed        (files, commits, PRs, deploys — with SHAs/PR numbers/URLs)
## Evidence              (all four required checks green, /api/status commit, smoke test)
## Still open            (what is NOT done, with enough detail to resume cold)
## Start here next       (single next action + one file to read first)
## Handback              (lock status + one line for the next AI)
## Safety boundary       (explicit list of what was NOT touched)
```

### 2.2 One continuation-window handback log per session

One file in `01 Daily Logs/`, named `[G] YYYY-MM-DD MCD CRM ChatGPT Continuation Handback <N>.md`, where `<N>` is the next unused window index. Must include:

```txt
- Owner instruction that opened the window (exact quote + timestamp).
- Scope authorized (link the LOCK.md commit that recorded the takeover).
- Every PR shipped this window with head SHA + squash commit + Vercel deployment id.
- All four required checks: Vercel Preview Comments, policy-check,
  Typecheck and contract guards, build — each explicitly "success" per PR.
- Production verification per PR: /api/status commit, protected-route sign-in
  boundary smoke test result, build-log guard "passed" line.
- Full "Safety boundary" list — no schema, no migrations, no flags, no live
  external activation, no live import/export, no real Lead business-rule
  changes, no Servicing/Commissions/Finance/payout/client-onboarding activation.
- Remaining business gate: authenticated production acceptance and owner
  production decision remain Hamilton-only.
- Explicit "Start here next" section pointing Claude at the newest daily log +
  the updated LOCK.md.
- "Lock handoff" section confirming LOCK.md was updated to holder: claude.
```

### 2.3 Updated `LOCK.md`

Same commit or immediately after the handback log:

```txt
- holder: claude
- since: <ISO 8601 UTC timestamp of the return>
- previous_holder: chatgpt, with a paragraph summarizing what was shipped,
  the latest production commit, and the safety-boundary reaffirmation.
- intent: default line — Claude resumes; authenticated production acceptance
  + owner production decision remain Hamilton-only; future work stays in
  the read-only/admin-navigation/guard scope unless Hamilton expands it.
- Latest daily logs: list the PR log(s) shipped this window AND the newest
  continuation handback log by exact filename. Do NOT invent filenames
  — they must exist in 01 Daily Logs/ on main.
- Latest production commit: the aa-style SHA that /api/status returned.
```

### 2.4 A Claude handoff prompt file

One file in `01 Daily Logs/`, named `[G] YYYY-MM-DD MCD CRM Claude Handoff Prompt After PR<N>.md`. Contains the exact literal prompt Hamilton can paste into a new Claude session to hand the lock back. Must reference **actual filenames that exist** — verify the daily-log listing before committing; a broken filename (e.g., "Handback 6.md" when only Handback 5.md exists) is a protocol violation and Claude will flag it on pickup.

## 3. Pickup checklist Claude will run every time

On every ChatGPT-to-Claude handback, Claude will:

```txt
1. Verify Composio connectivity: COMPOSIO_SEARCH_TOOLS returns has_active_connection
   true for both github and vercel toolkits.
2. Read LOCK.md. Confirm holder == claude and the previous_holder paragraph
   matches the newest ChatGPT continuation handback log.
3. Read the ChatGPT continuation handback log at the exact filename LOCK.md
   references. If it does not exist, flag it and use the newest actual one.
4. Read every [G] PR log for the window.
5. GITHUB_GET_A_BRANCH on hpintojr/crm.mcd main and confirm the head SHA
   equals the "Latest production commit" in LOCK.md.
6. VERCEL_GET_DEPLOYMENT on the deployment id ChatGPT recorded and confirm
   readyState == READY, target == production, meta.githubCommitSha ==
   LOCK.md's production commit, alias includes crm.mercurycalldesk.com.
7. Report the verified state to Hamilton (holder, production commit, deploy id,
   PR list) before proposing any new work.
8. Only after step 7 propose the next in-scope PR.
```

Any mismatch between LOCK.md, the daily logs, the crm.mcd main HEAD, and the Vercel deployment is a protocol violation and Claude will pause work until it is reconciled.

## 4. Mirror rules — Claude-to-ChatGPT handoffs

When Claude hands the lock to ChatGPT (as Claude did on 2026-07-10T22:20Z after PR #79), Claude produces the mirror set of artifacts using `[C]` prefixes: `[C] YYYY-MM-DD MCD CRM PR<N> ...`, `[C] YYYY-MM-DD MCD CRM Claude Session Handback <N>.md`, `LOCK.md` set to `holder: chatgpt`, and an optional `[C] YYYY-MM-DD MCD CRM ChatGPT Handoff Prompt After PR<N>.md` for Hamilton to paste into ChatGPT.

## 5. What this file does NOT change

- The `[C] AI Operating Protocol — Handoff, Changelog, Indexing.md` remains authoritative for everything outside this file's narrow subject.
- `CLAUDE.md`'s Protected Workspace Command Registry remains **LOCKED** — nothing here touches slash commands, aliases, or their meanings.
- The current scope allow-list and "Not authorized" list in `LOCK.md` remain in force. This file adds process discipline; it does not expand what either AI may commit.
- Authenticated production acceptance and the owner production decision remain Hamilton-only.

## 6. Change control

This file may be updated only when Hamilton explicitly asks for a change to the handoff process, and only by the current lock holder. Every change records itself in the daily log of that session with the exact diff subject line.
