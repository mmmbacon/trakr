# MCP Tool Contract

> **Status:** Draft  
> **Phase:** 0 spec → Phase 4 implementation  
> **Related:** [phase-4-mcp-v1.md](./phase-4-mcp-v1.md), [phase-3-agent-coordination.md](./phase-3-agent-coordination.md)

## Overview

Trakr MCP server exposes issue tracker operations as tools. All writes respect **agent profile** transition guards and create **activities** with actor attribution.

**Transport:** stdio (v1)  
**Package:** `packages/mcp`  
**API base:** `TRAKR_API_URL` (e.g. `http://localhost:3000/api`)

---

## Authentication

### Header

```
Authorization: Bearer trakr_<secret>
```

### Token types

| Token scope | `agent_profile_id` | Behavior |
|-------------|-------------------|----------|
| Human | null | Full access (local dev only) |
| Agent | set | Actor is agent; tools filtered by `allowed_tools` |

### Errors

| HTTP | MCP error | Message pattern |
|------|-----------|-----------------|
| 401 | `unauthorized` | Invalid or revoked token |
| 403 | `forbidden` | Tool not allowed for this profile |
| 422 | `validation_error` | Field errors |
| 422 | `transition_denied` | Guard rule message |

---

## Tool catalog (v1)

### `list_issues`

List issues with optional filters.

**Input:**

```json
{
  "project_key": "TRK",
  "workflow_slug": "ready",
  "assignee_slug": "implementer",
  "limit": 50,
  "offset": 0
}
```

**Output:**

```json
{
  "issues": [
    {
      "identifier": "TRK-42",
      "title": "Fix scroll",
      "workflow_slug": "ready",
      "priority": "medium",
      "assignee": { "type": "agent", "slug": "implementer" }
    }
  ],
  "total": 1
}
```

---

### `search_issues`

**Input:** `{ "query": "scroll", "project_key": "TRK" }`  
**Output:** `{ "issues": [...] }` (same shape as list items)

---

### `get_issue`

**Input:** `{ "project_key": "TRK", "number": 42 }`  
**Output:** Full issue object + `activities` array (last 20)

---

### `create_issue`

**Input:**

```json
{
  "project_key": "TRK",
  "title": "Fix kanban scroll",
  "description": "Optional markdown",
  "priority": "medium",
  "workflow_slug": "backlog"
}
```

**Output:** `{ "issue": { "identifier": "TRK-43", ... } }`

**Allowed profiles:** Triage, Human

---

### `update_issue`

**Input:**

```json
{
  "project_key": "TRK",
  "number": 42,
  "title": "Updated title",
  "description": "...",
  "priority": "high",
  "label_names": ["ui", "bug"]
}
```

**Allowed profiles:** Triage, Scribe (description only for Scribe), Human

---

### `transition_issue`

**Input:**

```json
{
  "project_key": "TRK",
  "number": 42,
  "to_workflow_slug": "in_progress"
}
```

**Output:** `{ "issue": { ... }, "activity": { "kind": "status_change", ... } }`

**Errors:** `transition_denied` with human-readable reason

---

### `claim_issue`

**Input:** `{ "project_key": "TRK", "number": 42 }`

**Preconditions:**

- Token scoped to profile with `requires_claim: true`
- Issue in `ready` (or configured claimable states)
- Not already claimed

**Output:** `{ "issue": { "claimed_by": { ... } } }`

**Allowed profiles:** Implementer

---

### `add_comment`

**Input:**

```json
{
  "project_key": "TRK",
  "number": 42,
  "body": "Starting work on this."
}
```

**Output:** `{ "activity": { "kind": "comment", ... } }`

**Allowed profiles:** All agent profiles + Human

---

## Profile → tool matrix

| Tool | Triage | Implementer | Scribe | Human |
|------|--------|-------------|--------|-------|
| list_issues | ✓ | ✓ | ✓ | ✓ |
| search_issues | ✓ | ✓ | ✓ | ✓ |
| get_issue | ✓ | ✓ | ✓ | ✓ |
| create_issue | ✓ | — | — | ✓ |
| update_issue | ✓ | partial | description | ✓ |
| transition_issue | triage rules | impl rules | — | ✓ |
| claim_issue | — | ✓ | — | ✓ |
| add_comment | ✓ | ✓ | ✓ | ✓ |

---

## Transition guard matrix

| From → To | Triage | Implementer | Human |
|-----------|--------|-------------|-------|
| backlog → triage | ✓ | — | ✓ |
| triage → ready | ✓ | — | ✓ |
| ready → in_progress | — | ✓ (must claim) | ✓ |
| in_progress → done | — | ✓ | ✓ |
| any → backlog | — | — | ✓ |
| * → delete | — | — | ✓ |

Implementer **cannot** skip ready → in_progress without claim.

---

## v2 tools (Phase 6)

| Tool | Input summary |
|------|---------------|
| `release_claim` | project_key, number |
| `link_pr` | project_key, number, url |
| `create_sub_issues` | project_key, number, titles[] |
| `list_ready_issues` | project_key (shortcut) |

---

## Example Cursor session

**User:** “Triage everything in TRK backlog.”

```
1. list_issues(project_key: "TRK", workflow_slug: "backlog")
2. For each issue:
     update_issue(..., label_names: [...])
     transition_issue(..., to_workflow_slug: "triage")
3. add_comment(..., body: "Triaged: labeled and moved to Triage.")
```

**User:** “Implement TRK-42.”

```
1. get_issue(project_key: "TRK", number: 42)
2. claim_issue(project_key: "TRK", number: 42)
3. transition_issue(..., to_workflow_slug: "in_progress")
4. add_comment(..., body: "Claimed. Implementation in progress.")
# ... agent works in repo ...
5. transition_issue(..., to_workflow_slug: "done")
6. add_comment(..., body: "Completed in commit abc123.")
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TRAKR_API_URL` | Yes | API base URL |
| `TRAKR_API_TOKEN` | Yes | Bearer token |
| `TRAKR_AGENT_SLUG` | No | Override profile hint for logging |

---

## Cursor config example

```json
{
  "mcpServers": {
    "trakr": {
      "command": "node",
      "args": ["/absolute/path/to/trakr/packages/mcp/dist/index.js"],
      "env": {
        "TRAKR_API_URL": "http://localhost:3000/api",
        "TRAKR_API_TOKEN": "trakr_..."
      }
    }
  }
}
```

---

## Implementation notes

- Validate all inputs with **zod** before HTTP calls
- Return compact JSON (agents read text responses)
- Include `identifier` in every issue reference — agents reason in TRK-42 not db id
- Log tool name + identifier to stderr only (never token)
