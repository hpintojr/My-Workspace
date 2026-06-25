---
type: setup
date: 2026-06-25
project: MCD - Mercury Call Desk
status: Template — fill in the real server details + secrets locally (never commit secrets).
---

# MCP Config Template (connect an MCP server to Claude)

Goal: give Claude tools to help run the GoHighLevel CRM (and/or the underlying platform). This file is a **template** — to finalize it I need three things from you:

1. **Which MCP server** are you connecting? (e.g., the official **GoHighLevel MCP**, the **underlying-platform** MCP, or a custom one.)
2. **How it runs** — a remote URL endpoint (hosted MCP, most common today) OR a local command (npx/binary).
3. **Auth** — API key / token / OAuth (we keep these in env or local config, never in the repo).

## Option A — Remote / hosted MCP (Claude Desktop, `claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "gohighlevel": {
      "url": "https://<the-mcp-endpoint>/mcp",
      "headers": {
        "Authorization": "Bearer ${GHL_MCP_TOKEN}"
      }
    }
  }
}
```

## Option B — Local command MCP (stdio)
```json
{
  "mcpServers": {
    "gohighlevel": {
      "command": "npx",
      "args": ["-y", "<the-mcp-package-name>"],
      "env": {
        "GHL_API_KEY": "${GHL_API_KEY}",
        "GHL_LOCATION_ID": "lEdLVFW0uqKMhmkgFrsX"
      }
    }
  }
}
```
> Your GHL location/sub-account id appears in the dashboard URL: `partner.futureassistant.ai/v2/location/lEdLVFW0uqKMhmkgFrsX/...` → location id = **lEdLVFW0uqKMhmkgFrsX** (confirm this is the Mercury Call Desk sub-account).

## Where the config lives (Claude Desktop)
```txt
Windows: %APPDATA%\Claude\claude_desktop_config.json
macOS:   ~/Library/Application Support/Claude/claude_desktop_config.json
```
Edit it, paste the relevant block, restart Claude Desktop. (In Cowork, some connectors are added via the in-app connector registry instead — if the server is listed there, that's the easier path and no JSON is needed.)

## Security
- Never commit real tokens/keys to GitHub or this workspace. Use env vars or the local config only.
- Scope the token to the minimum needed (read/write contacts, opportunities, calendars).

## Tell me to finalize
Send me the server name + URL-or-command + which auth it uses, and I'll produce the exact `claude_desktop_config.json` block ready to paste.
