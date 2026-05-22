# Pivot Outline: Solo Issue Tracker with Agent Coordination

> **Status:** Draft  
> **Last updated:** 2026-05-22

## 1. Summary

Pivot Trakr from a job-application kanban into a **keyboard-first issue tracker for solo developers** — Linear’s speed and workflow density, without team/org overhead. **AI agents are first-class collaborators**, coordinated through a shared backlog, activity trail, and a first-party MCP server.

**One-liner:** *Linear speed. Zero team. All agents.*

**Thesis:** Lone wolf builder + agent pack + coordination layer = accelerated throughput.

---

## 2. Problem & Opportunity

### 2.1 Why leave job tracking

- Saturated category; limited portfolio differentiation
- Domain model (company, salary, interview stages) doesn’t generalize
- UI patterns are solid but the product story is dated

### 2.2 Gap in the market (for us)

| Tool | Gap |
|------|-----|
| Linear / Shortcut | Built for teams — invites, assignees, cycles, notifications, org UI |
| Generic kanban | No agent actors, no MCP, no coordination semantics |
| Cursor / chat UIs | No persistent structured backlog or audit trail |
| Linear MCP (consumer) | Uses Linear’s schema and UI; not our design system or rules |

### 2.3 What we’re building

The **missing middle**: structured work (issues, projects, workflow) + **agent as assignee** + rules + audit trail + custom design system + **owned MCP**.

---

## 3. Product Vision

### 3.1 Four pillars

| Pillar | Meaning |
|--------|---------|
| **Lone wolf** | Single user. Projects = repos or initiatives. No team switcher, seats, or permissions matrix. |
| **Agent management** | Named agent profiles (Triage, Implementer, Scribe) with scoped capabilities — not one vague “AI.” |
| **Coordination** | Shared backlog, claims, handoffs, unified activity stream. Human and agents never lose context. |
| **Accelerated** | Throughput via parallel lanes and zero re-explaining — not autonomous “AI runs the company.” |

### 3.2 Core loop

```text
Capture → Triage (agent) → You prioritize → Implement (agent) → You ship
                ↑                                    |
                └──── activity + MCP alignment ──────┘
```

**Human owns:** intent, priority, merge/ship, “is this done?”  
**Agents own:** breakdown, labeling, implementation drafts, bookkeeping  
**App owns:** state, history, queues, transition rules

### 3.3 Positioning

- **Category:** Agent coordination for solo dev (not CRM, not chat, not IDE)
- **Audience:** Solo builders who use Cursor/agents daily on personal and portfolio projects
- **Portfolio story:** Custom design system + Rails API + MCP that agents use to manage *your* backlog

### 3.4 Naming

**Decision:** Keep **Trakr** for v1 (repo, demo, UI). Rebrand optional later.  
Tagline options: *Lone wolf. Agent pack. One board.* / *Your backlog, coordinated.*

### 3.5 What we are / what we are not

| We are | We are not |
|--------|------------|
| Planning & agent coordination for solo devs | An IDE or editor replacement |
| System of record for issues, state, and handoffs | A team Linear clone with invites and seats |
| Keyboard-first issue tracker with owned design system | A chat wrapper or ephemeral thread UI |
| MCP-native backlog agents can read and write | Autonomous “AI runs the company” |

The IDE is where code gets written. **Trakr is where work gets coordinated** — between you and your agents.

---

## 4. Scope: What We Keep vs Cut

### 4.1 From Linear — keep

- Issue IDs (`TRK-142`)
- Projects
- Status workflow (configurable states)
- Board + list views
- Issue detail panel (slide-over, URL-routable)
- Priority, labels
- Comments / activity timeline
- Command palette (`Cmd+K`)
- Fast, dense, keyboard-first UX

### 4.2 From Linear — cut (team clunkiness)

- Teams, invites, roles, seat billing
- Human assignee picker / workload views
- Multiplayer presence
- Team notifications and @mentions across users
- Team-owned cycles and velocity theater
- Stakeholder roadmaps

### 4.3 From Trakr — reuse

| Current | Pivot target |
|---------|--------------|
| `jobs` | `issues` |
| `events` | `activities` |
| Status columns (enum) | `workflow_states` (per project or global) |
| Kanban board layout | Issue board (add DnD) |
| Job modal | Issue panel |
| Search + filters | Issue search + command palette |
| Job stats | Funnel / queue metrics |
| Auth, API, deploy stack | Unchanged foundation |
| Demo mode | Reseed with projects + sample issues + agent profiles |
| `adapters/mui/` + tokens | Evolve into owned design system |

### 4.4 From Trakr — drop or repurpose

- Job-specific fields (salary, contact_*, resume/cover letter URLs)
- Job resource FAB / external job-board links
- Google Places location autocomplete (unless reused for something else)
- “Statistics” framed as job-application funnel (reframe or replace)

---

## 5. Agent Model

### 5.1 Agents as first-class actors

```text
Actor:     human (owner) | agent (named profile)
Issue:     created_by, updated_by, assigned_to (human | agent | unassigned)
Activity:  comment | status_change | agent_run | pr_linked | system
```

### 5.2 Agent profiles (v1)

| Profile | Responsibility |
|---------|----------------|
| **Triage** | Label, prioritize, split sub-issues, add checklists |
| **Implementer** | Claim from Ready, move to In Progress, link PR, mark Done |
| **Scribe** | Update descriptions, summarize activity, postmortem notes |

Config per profile: allowed MCP tools, allowed status transitions, whether `claim` is required.

### 5.3 Trust & guardrails

- **Claim lock** — one agent owns an issue while In Progress
- **Transition guards** — agents cannot archive/delete; human-only destructive ops
- **Audit trail** — every MCP write → `activities` with `actor_type`, `actor_id`, optional `run_id`
- **Undo** — human can revert last transition; agent comments collapsible in UI

### 5.4 UI signals

- Badge: human vs agent on issues and activity rows
- Filters: “Assigned to Implementer”, “Last touched by agent”, “Blocked on you”
- Queue view: Ready / In flight (claimed) / Blocked on human

---

## 6. MCP Architecture

### 6.1 Role

MCP is the **team bus** — agents interact with the backlog without the UI. Primary integration surface for Cursor and future runners.

```text
Cursor / agents
      ↓ MCP (stdio or HTTP)
Trakr MCP server (TypeScript recommended)
      ↓ REST + API key or session token
Rails API
      ↓
Postgres
```

### 6.2 MCP tools — v1

| Tool | Purpose |
|------|---------|
| `list_issues` | Filter by project, status, assignee |
| `search_issues` | Full-text / title search |
| `get_issue` | Issue + recent activities |
| `create_issue` | New issue in project |
| `update_issue` | Title, description, labels, priority |
| `transition_issue` | Move status (respects agent profile rules) |
| `claim_issue` | Agent locks issue for work |
| `add_comment` | Activity comment |

### 6.3 MCP tools — later

- `link_pr`, `create_sub_issues`, `list_ready_issues`, `release_claim`

### 6.4 Auth

- API key or personal access token for MCP (separate from browser session)
- Scoped to owner user; no multi-user auth in v1

---

## 7. Data Model (Outline)

> Detailed ERD and migrations: [data-model.md](./data-model.md)

### 7.1 New / renamed entities

```text
users              (existing)
projects           name, key (e.g. TRK), color, description
workflow_states    name, position, project_id (nullable = global default)
issues             replaces jobs — see field mapping below
activities         replaces events — polymorphic types, actor metadata
labels             name, color
issue_labels       join
agent_profiles     name, slug, allowed_tools, allowed_transitions (JSON)
comments           optional: fold into activities with type=comment
```

### 7.2 Field mapping: `jobs` → `issues`

| Job field | Issue field |
|-----------|-------------|
| `company` | `project_id` (+ optional `external_ref`) |
| `title` | `title` |
| `status` | `workflow_state_id` |
| `details` | `description` (markdown) |
| `salary` | drop or → `estimate` / `priority` |
| `location`, `url` | `links` JSON or dedicated columns |
| `contact_*` | drop in v1 (human-only assignee later if needed) |
| `resume_url`, etc. | drop or → generic `attachments` later |
| `user_id` | `user_id` |
| `events` | `activities` |

### 7.3 Activity types

- `comment`
- `status_change` (from_state, to_state)
- `agent_run` (run_id, agent_profile_id, summary)
- `claim` / `release`
- `pr_linked` (url, optional)

---

## 8. UI & Information Architecture (Outline)

> Screen map and routes: [screen-map.md](./screen-map.md)

### 8.1 App shell

- Sidebar: project switcher, views (Board, List, Queue, Search), settings
- No team switcher
- Command palette globally (`Cmd+K`)

### 8.2 Primary views

| View | Purpose |
|------|---------|
| **Board** | Status columns, DnD, issue cards |
| **List** | Dense table, sort/filter |
| **Queue** | Agent coordination — Ready / In flight / Blocked on you |
| **Issue panel** | Slide-over from board/list; deep link `/projects/:key/issues/:number` |

### 8.3 Issue panel sections

- Title, description (markdown)
- Status, priority, labels
- Assignee: `You` \| `Triage` \| `Implementer` \| `—`
- Activity stream (human + agent + system)
- Actions: transition, assign, copy issue ID, copy MCP context

### 8.4 Design system direction

- Token-first (`tokens/`) — Linear-like density, subtle borders, tight type scale
- Feature code imports `components/ui` only; MUI stays in `adapters/mui/`
- New primitives: `IssueCard`, `IssuePanel`, `StatusPill`, `CommandBar`, `AgentBadge`
- Optional later: Radix/Ariakit for palette/combobox; `@dnd-kit` for board

---

## 9. Technical Stack (unchanged + additions)

| Layer | Choice |
|-------|--------|
| Frontend | React 18, Vite, TypeScript, Redux Toolkit, MUI 6 (peel over time) |
| Backend | Rails 7.2 API, PostgreSQL |
| Deploy | Vercel (web) + Fly.io (API) |
| **New:** DnD | `@dnd-kit` |
| **New:** MCP server | TypeScript, `@modelcontextprotocol/sdk` |
| **New:** Markdown | Issue descriptions + comments (TBD library) |

---

## 10. Phased Delivery

Detailed specs: [README](./README.md#phases)

| Phase | Doc | Status |
|-------|-----|--------|
| 0 — Planning & design | [phase-0-planning-design.md](./phase-0-planning-design.md) | Complete |
| 1 — Domain pivot | [phase-1-domain-pivot.md](./phase-1-domain-pivot.md) | Complete |
| 2 — Core UX | [phase-2-core-ux.md](./phase-2-core-ux.md) | Not started |
| 3 — Agent coordination | [phase-3-agent-coordination.md](./phase-3-agent-coordination.md) | Not started |
| 4 — MCP v1 | [phase-4-mcp-v1.md](./phase-4-mcp-v1.md) | Not started |
| 5 — Polish & portfolio | [phase-5-polish-portfolio.md](./phase-5-polish-portfolio.md) | Not started |
| 6 — Later | [phase-6-later.md](./phase-6-later.md) | Backlog |

### Phase checklist (summary)

**Phase 0:** pivot outline, [data-model](./data-model.md), [migration plan](./migration-from-jobs.md), [MCP contract](./mcp-contract.md), [screen map](./screen-map.md), [design system](./design-system.md)

**Phase 1:** jobs → issues, projects, API + Redux, reseed, remove job UI

**Phase 2:** issue panel, DnD board, list view, activity stream

**Phase 3:** agent profiles, assignees, claims, guards, queue view

**Phase 4:** MCP server, API tokens, v1 tools, Cursor demo

**Phase 5:** command palette, shortcuts, README/blog, token UI

**Phase 6:** teams, real-time, cycles, integrations — see [phase-6-later.md](./phase-6-later.md)

---

## 11. MVP Definition

**MVP proves:** “I manage a solo backlog where Cursor agents triage and implement through my tracker.”

**Must ship:**

1. Projects + issues + workflow states
2. Board with DnD + issue panel
3. Two agent profiles (Triage, Implementer) with claim + transition rules
4. MCP v1 (CRUD + search + transition + claim + comment)
5. Activity stream showing human vs agent actions
6. Queue view (Ready / In flight / Blocked on you)

**60-second demo:**

1. Create issue from UI or chat  
2. Triage agent labels and prioritizes via MCP  
3. Human moves to Ready  
4. Implementer claims, sets In Progress, adds comment, completes  
5. Full trail visible in issue panel  

---

## 12. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Scope explosion | “Solo Linear” MVP; defer teams, cycles, GitHub sync |
| Building UI + API + MCP at once | MCP read-only first, then writes |
| Agent thrashing backlog | Claims + profile-scoped transitions |
| MUI fights custom aesthetic | Token-first; peel MUI gradually |
| No external users | Dogfood on Trakr, bm-portfolio, side projects — portfolio demo is the goal |

---

## 13. Resolved Decisions (Phase 0)

All decisions locked in [decisions.md](./decisions.md).

| Question | Decision |
|----------|----------|
| Product name | Keep **Trakr** |
| Workflow states | Per-project, seeded from template |
| Comments | `activities` with `kind: comment` |
| MCP server | TypeScript in `packages/mcp` |
| Issue numbers | Per-project (`TRK-142`) |
| Markdown editor v1 | Textarea + preview tab |
| Agent run metadata | Optional `run_id` in activity `metadata` |

---

## 14. Planning Documents

All docs live in [`docs/planning/`](./README.md).

| Document | Contents |
|----------|----------|
| [phase-0-planning-design.md](./phase-0-planning-design.md) through [phase-6-later.md](./phase-6-later.md) | Per-phase goals, tasks, acceptance criteria |
| [data-model.md](./data-model.md) | ERD, tables, API JSON, TypeScript types |
| [migration-from-jobs.md](./migration-from-jobs.md) | Step-by-step rename and data migration |
| [mcp-contract.md](./mcp-contract.md) | Tool schemas, auth, guard matrix, Cursor session |
| [screen-map.md](./screen-map.md) | Routes, components, layout |
| [design-system.md](./design-system.md) | Tokens, typography, component inventory |

---

## 15. References

- Current app: job kanban, modal CRUD, search, stats — see `apps/web/src/features/dashboard/`
- Legacy bootcamp planning: `apps/api/planning/`
- Modernization blog: [Modernizing Trakr](https://github.com/mmmbacon/trakr) (bm-portfolio)
