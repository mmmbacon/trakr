# Phase 4 — MCP v1

> **Status:** Not started  
> **Depends on:** [Phase 3](./phase-3-agent-coordination.md) (claims, guards, actor model)  
> **Blocks:** Phase 5 demo script  
> **Goal:** Cursor and other agents manage the backlog through a first-party MCP server with the same rules as the UI.

## Objective

Ship **`packages/mcp`** — a TypeScript MCP server exposing Trakr’s API as tools. Agents can list, create, update, transition, claim, and comment on issues using personal access tokens scoped to agent profiles.

---

## Prerequisites

- [ ] [mcp-contract.md](./mcp-contract.md) complete
- [ ] Phase 3 API: claims, transitions, actor attribution
- [ ] API token auth implemented on Rails

---

## 4.1 Monorepo layout

```
packages/mcp/
  package.json
  tsconfig.json
  src/
    index.ts           # stdio entry
    server.ts          # McpServer setup
    tools/             # one file per tool
    api/
      client.ts        # fetch wrapper for Rails API
      types.ts         # generated or hand-written
    auth.ts
  README.md
```

Root `package.json` workspace entry + script: `npm run mcp:dev`.

---

## 4.2 API token auth (Rails)

### Model

```text
api_tokens
  id
  user_id
  agent_profile_id   # nullable — null = full human access
  token_digest       # bcrypt or sha256 of secret
  name               # "Cursor Implementer"
  last_used_at
  revoked_at
  created_at
```

### Auth header

```
Authorization: Bearer trakr_<secret>
```

Or `X-Trakr-Token: ...` — pick one in mcp-contract.

### Scopes

Token bound to `agent_profile_id` → requests use `Actor.agent(profile)`; tools filtered by `allowed_tools` on profile.

Human token (no profile) — all tools; for local admin only.

### Endpoints

```
POST   /api/tokens      # create (session auth only)
GET    /api/tokens      # list
DELETE /api/tokens/:id  # revoke
```

---

## 4.3 MCP transport

**v1:** stdio (Cursor local MCP config)

```json
{
  "mcpServers": {
    "trakr": {
      "command": "node",
      "args": ["packages/mcp/dist/index.js"],
      "env": {
        "TRAKR_API_URL": "http://localhost:3000/api",
        "TRAKR_API_TOKEN": "trakr_..."
      }
    }
  }
}
```

**Later:** Streamable HTTP for remote/hosted MCP.

---

## 4.4 Tool implementations

See [mcp-contract.md](./mcp-contract.md) for schemas. Summary:

| Tool | HTTP | Notes |
|------|------|-------|
| `list_issues` | `GET /issues?project=&state=&assignee=` | Paginate default 50 |
| `search_issues` | `GET /issues/search?q=` | pg_search or ILIKE v1 |
| `get_issue` | `GET /projects/:key/issues/:num` | Include activities |
| `create_issue` | `POST /projects/:key/issues` | Actor from token |
| `update_issue` | `PATCH /issues/:id` | Title, description, priority, labels |
| `transition_issue` | `POST /issues/:id/transition` | Uses guard service |
| `claim_issue` | `POST /issues/:id/claim` | |
| `add_comment` | `POST /issues/:id/activities` | kind: comment |

Optional read-only first milestone: ship `list`, `get`, `search` before writes.

### Error handling

Map API errors to MCP tool errors with agent-readable text:

```json
{ "error": "transition_denied", "message": "Implementer must claim issue before In Progress" }
```

---

## 4.5 SDK & dependencies

- `@modelcontextprotocol/sdk`
- `zod` for input validation
- Native `fetch` (Node 22)

No Redux on server — thin REST client only.

---

## 4.6 Cursor integration

### Docs in repo

`docs/planning/cursor-mcp-setup.md` or section in package README:

1. Generate token in Trakr settings (or rails console seed)
2. Add MCP config to Cursor
3. Example prompts for triage and implement flows

### Demo script (60 seconds)

1. User: “Create issue: Fix kanban scroll on mobile”
2. Agent: `create_issue` → TRK-N
3. User: “Triage the backlog”
4. Agent: `list_issues` (Backlog), `update_issue` (labels), `transition_issue` → Triage
5. User moves to Ready in UI (or agent if allowed)
6. Agent: `claim_issue`, `transition_issue` → In Progress, `add_comment`, later `transition_issue` → Done
7. Show activity trail in issue panel — all agent-attributed

---

## 4.7 Security

- Tokens never logged
- HTTPS only in production (`TRAKR_API_URL`)
- Rate limit token endpoints (rack-attack optional)
- Revoke on leak
- Agent tokens cannot delete issues or create tokens

---

## 4.8 Testing

**MCP package**

- Unit: zod schemas, API client error mapping
- Integration: mock fetch or hit Rails test server

**Rails**

- Request specs with `Authorization: Bearer` for each tool’s underlying route
- Token scope tests: Implementer token cannot human-only actions

---

## Acceptance criteria

- [ ] `packages/mcp` runs via stdio in Cursor
- [ ] All v1 tools callable and return structured JSON
- [ ] Agent token respects profile transition guards
- [ ] Writes create activities with `actor_type: agent`
- [ ] README + Cursor setup documented
- [ ] Demo script reproducible locally
- [ ] CI: lint/typecheck MCP package (add job or extend web CI workspace)

---

## Out of scope (Phase 4)

- `link_pr`, `create_sub_issues`, `list_ready_issues` (v2 tools)
- Hosted MCP / OAuth
- Auto-invoke agents (human triggers via chat only)
- Linear/GitHub MCP interoperability

---

## Next phase

[Phase 5 — Polish & Portfolio](./phase-5-polish-portfolio.md): command palette, keyboard shortcuts, docs, blog, optional GitHub linking.
