# Phase 3 — Agent Coordination

> **Status:** Not started  
> **Depends on:** [Phase 2](./phase-2-core-ux.md)  
> **Blocks:** Phase 4 (MCP enforces same rules as UI)  
> **Goal:** Agents are first-class assignees with claims, guarded transitions, queue view, and visible audit trail.

## Objective

Introduce **agent profiles** and coordination semantics so the app is not just a human issue tracker — it orchestrates work between you and named agents (Triage, Implementer, Scribe). API guardrails must match UI rules; Phase 4 MCP calls these same endpoints.

---

## Prerequisites

- [ ] Phase 2 complete — panel, DnD, activities
- [ ] [mcp-contract.md](./mcp-contract.md) transition guard matrix drafted
- [ ] Default workflow includes **Ready** and **In Progress** states for queue semantics

---

## 3.1 Agent profiles

### Data model

```text
agent_profiles
  id
  user_id          # owner (solo v1)
  name             # "Triage", "Implementer"
  slug             # triage, implementer
  description
  allowed_tools    # jsonb array — for MCP Phase 4
  allowed_transitions # jsonb — { from_slug, to_slug }[]
  requires_claim   # boolean — implementer true
  icon             # optional emoji or icon key
  created_at, updated_at
```

Seed three profiles for demo user. No CRUD UI required in v1 — YAML/seed or settings JSON file is enough; optional read-only list in settings.

### Display

- Settings page or sidebar footer: “Your agents”
- Assignee dropdown on issue panel includes agents

---

## 3.2 Assignee model

### Issue fields

```text
assignee_type   # null | 'human' | 'agent'
assignee_id     # user_id or agent_profile_id (polymorphic or paired columns)
```

**v1 simplification:** `assigned_agent_id` (nullable FK) + implicit human = owner when null and `assignee_type` unset. Or explicit `assignee_type` + `assignee_id`.

Unassigned = null null — eligible for Triage queue.

### UI

- Assignee control: `You` | `Triage` | `Implementer` | `Scribe` | `Unassigned`
- Issue card shows small agent icon when assigned to agent
- Filter list/board: “Assigned to Implementer”

---

## 3.3 Claim & lock

### Rules

- **Implementer** (and any profile with `requires_claim: true`) must `claim` before moving to **In Progress**
- Claim sets `claimed_by_agent_id`, `claimed_at` on issue
- Only one active claim per issue
- Claim blocks other agents from same issue (Implementer cannot double-claim)
- Human can **release claim** override from panel
- Moving out of In Progress auto-releases claim (optional)

### Issue fields

```text
claimed_by_agent_id   # nullable FK agent_profiles
claimed_at            # datetime
```

### Activities

- `kind: claim` — metadata: `{ agent_profile_id }`
- `kind: release` — human or agent

### API endpoints

```
POST /api/issues/:id/claim    { agent_profile_id }  # or auth as agent token in Phase 4
POST /api/issues/:id/release
```

Validate: issue in Ready (or allowed source state); agent profile matches; not already claimed.

---

## 3.4 Transition guards

### Server-side enforcement (critical)

All status changes go through a service object, e.g. `Issues::Transition`:

```ruby
# Pseudocode
Issues::Transition.call(
  issue:,
  to_state:,
  actor: HumanActor(user) | AgentActor(profile)
)
```

Rules:

| Actor | Allowed |
|-------|---------|
| Human | Any transition except system-reserved; can archive/delete |
| Triage | Backlog ↔ Triage; add labels; cannot mark Done |
| Implementer | Ready → In Progress (if claimed) → Done; cannot delete |
| Scribe | No status change; comments + description update only |

Rejected transitions return `422` with message agents can read in MCP.

Log every transition as `activity` with `actor_type`, `actor_id`.

### UI

- Status dropdown disables illegal options (optional; server is source of truth)
- Toast on rejected transition

---

## 3.5 Queue view

### Route

`/dashboard/projects/:projectKey/queue` or global `/dashboard/queue`

### Sections

| Section | Query |
|---------|-------|
| **Ready for agents** | state = Ready, unclaimed or assigned to agent |
| **In flight** | state = In Progress, claimed_by set |
| **Blocked on you** | state = Triage/Review or label `needs-human`; define explicit “blocked” state or label in seed |
| **Recently done** | Done, last 7 days (collapsed) |

### Card actions

- Human: move to Ready, assign agent
- Quick link to open issue panel

This is the **coordination command center** — the solo “standup board.”

---

## 3.6 Agent vs human in UI

### Activity stream

- `actor_type: human` → user initials
- `actor_type: agent` → agent icon + name (“Implementer moved to In Progress”)
- `actor_type: system` → muted text

### Badges

- `AgentBadge` component on cards and activities
- Filter activity: “Hide agent comments” (collapsible section) — optional v1

### Created by

- Issue list column or panel footer: “Created by you” / “Created by Triage” (when Phase 4 creates via MCP)

---

## 3.7 Actor attribution in API

### Request context

- Browser session → `Actor.human(current_user)`
- Phase 4 agent token → `Actor.agent(profile)` from token scope

All write endpoints pass actor into transition/activity creation.

### Activity metadata

```json
{
  "kind": "status_change",
  "actor_type": "agent",
  "actor_id": 2,
  "metadata": {
    "from_state": "ready",
    "to_state": "in_progress",
    "run_id": "optional-phase-4"
  }
}
```

---

## 3.8 Settings & config (minimal)

`/dashboard/settings/agents` — read-only list of profiles with:

- Name, slug, allowed transitions summary
- Copy MCP hint: “Use token scoped to Implementer”

Full profile editor deferred.

---

## Acceptance criteria

- [ ] Issues assignable to agent profiles
- [ ] Implementer must claim before In Progress
- [ ] Transition guards enforced server-side; UI reflects failures
- [ ] Queue view shows Ready / In flight / Blocked on you
- [ ] Activities attribute human vs agent actors
- [ ] Human can release claim and override status
- [ ] Agent profiles seeded in demo mode
- [ ] Tests cover guard rails and claim lifecycle
- [ ] Documented transition matrix matches [mcp-contract.md](./mcp-contract.md)

---

## Testing matrix

| Scenario | Expected |
|----------|----------|
| Implementer → In Progress without claim | 422 |
| Second agent claims same issue | 422 |
| Triage → Done | 422 |
| Human → any state | 200 |
| Release claim | claim cleared, activity logged |

---

## Out of scope (Phase 3)

- MCP server implementation (Phase 4) — but API must be token-ready
- Agent auto-run / scheduled triage
- `run_id` from Cursor transcripts (optional metadata field only)
- Scribe automation

---

## Next phase

[Phase 4 — MCP v1](./phase-4-mcp-v1.md): MCP server, API tokens, tool implementations wired to Phase 3 guards.
