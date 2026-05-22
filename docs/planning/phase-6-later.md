# Phase 6 — Later (Post-MVP)

> **Status:** Backlog  
> **Depends on:** [Phase 5](./phase-5-polish-portfolio.md) MVP shipped  
> **Goal:** Capture explicitly deferred work so Phases 1–5 stay focused.

## Objective

Document **post-MVP** capabilities without committing to timeline. Each item below should become its own mini-spec when prioritized.

---

## 6.1 Multi-user & teams

**Why deferred:** Contradicts “lone wolf” thesis; adds authz, invites, notification complexity.

**If pursued:**

- Organizations or shared projects
- Invite flow, roles (owner, viewer)
- Human assignees beyond solo owner
- Per-seat concerns — likely out of scope permanently for this product

**Alternative:** Stay single-user forever; export/import projects for sharing.

---

## 6.2 Real-time sync

**Why deferred:** Solo v1 has no multiplayer editing pressure.

**If pursued:**

- ActionCable or SSE for issue/panel updates
- “Agent is working on TRK-42” live indicator
- Optimistic conflict resolution (ETags or version column)

**Trigger:** When adding second human or multiple agent runners concurrently.

---

## 6.3 Cycles & personal sprints

**Why deferred:** Queue view covers solo planning; cycles add UI weight.

**If pursued:**

- Personal cycle entity (date range, name)
- Issues optionally scoped to cycle
- Burndown chart (reuse chart components from old JobStats)
- No team velocity — single burndown line only

---

## 6.4 Roadmaps

**Why deferred:** Stakeholder-facing; solo builder uses queue + board.

**If pursued:**

- Timeline view by project
- Milestones grouping issues
- Drag issues on timeline

---

## 6.5 Notifications

**Why deferred:** Solo + agents — in-app activity sufficient for v1.

**If pursued:**

- Email digest: “3 issues blocked on you”
- Web push (service worker)
- Webhook outbound for agent runners

---

## 6.6 Custom fields per project

**Why deferred:** JSONB schema complexity; labels + priority enough for MVP.

**If pursued:**

- Field definitions on project
- Dynamic form in issue panel
- MCP tools include custom field keys

---

## 6.7 MCP v2 tools

From [mcp-contract.md](./mcp-contract.md) — implement when MVP stable:

| Tool | Purpose |
|------|---------|
| `link_pr` | Attach GitHub PR to issue |
| `create_sub_issues` | Break down parent issue |
| `list_ready_issues` | Optimized queue query |
| `release_claim` | Agent explicit release |
| `archive_issue` | Human-only via separate scope |

---

## 6.8 Integrations

| Integration | Value |
|-------------|-------|
| **GitHub** | PR status, close issue on merge, branch naming |
| **GitLab / Bitbucket** | Same pattern |
| **Slack / Discord** | Post activity notifications |
| **Calendar** | Sync activity due dates (replace external Google link) |

Each integration: adapter in Rails `app/services/integrations/`, OAuth tokens table.

---

## 6.9 Agent automation

**Beyond MCP on-demand:**

- Scheduled triage job (cron on Fly)
- Webhook trigger: new issue → queue Triage agent run
- Agent run history page with links to Cursor transcripts
- Budget/token usage per agent run (observability)

**Risk:** Autonomy without human gates — keep human-in-loop for Ready → Implement.

---

## 6.10 Mobile & offline

- Responsive board (read-only mobile v1)
- PWA offline read cache
- Native app — unlikely; PWA sufficient

---

## 6.11 Rebrand & productization

- Rename Trakr → final brand
- Marketing landing page
- Hosted MCP endpoint
- Pricing — only if opening to external users

---

## 6.12 Technical debt paydown

| Item | Notes |
|------|-------|
| Peel MUI | Replace adapters with headless + CSS modules or Tailwind |
| E2E suite | Playwright critical paths |
| RuboCop | API style enforcement |
| OpenAPI spec | Generate MCP types from schema |
| pg_search | Replace ILIKE search |

---

## Prioritization framework

When picking Phase 6 items, score:

1. **Dogfood value** — do you hit this weekly?
2. **Portfolio story** — demo well in 30 seconds?
3. **Cohesion** — strengthens agent coordination thesis?
4. **Scope** — shippable in <2 weeks solo?

Suggested first picks after MVP:

1. MCP v2 (`link_pr`, `create_sub_issues`)
2. GitHub integration (minimal)
3. Personal cycles (lightweight)
4. Real-time (only if running parallel agents hurts)

---

## References

- [pivot-outline.md](./pivot-outline.md) §10 Phase 6 list
- [phase-4-mcp-v1.md](./phase-4-mcp-v1.md) out-of-scope tools
