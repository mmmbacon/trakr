# Phase 0 — Planning & Design

> **Status:** In progress  
> **Depends on:** —  
> **Blocks:** Phase 1  
> **Goal:** Nail specs before code so the domain pivot doesn’t thrash.

## Objective

Produce enough design and technical specification that Phase 1 can execute without reopening foundational decisions. Phase 0 is documentation and design tokens only — no production feature code.

---

## Deliverables

| Deliverable | Document | Status |
|-------------|----------|--------|
| Master pivot outline | [pivot-outline.md](./pivot-outline.md) | Done |
| Data model + ERD | [data-model.md](./data-model.md) | TODO |
| Jobs → issues migration plan | [migration-from-jobs.md](./migration-from-jobs.md) | TODO |
| MCP tool contract | [mcp-contract.md](./mcp-contract.md) | TODO |
| Screen map + routes | [screen-map.md](./screen-map.md) | TODO |
| Design system spec | [design-system.md](./design-system.md) | TODO |
| Phase specs (this folder) | `phase-*.md` | In progress |

---

## Tasks

### 0.1 Resolve open questions

Decisions needed before Phase 1 migrations:

| Question | Recommendation | Decision |
|----------|----------------|----------|
| Keep name **Trakr**? | Yes for now; rebrand later if needed | TBD |
| Workflow states | Per-project with global template seed | TBD |
| Comments storage | Single `activities` table with `kind: comment` | TBD |
| Issue numbers | Per-project sequence (`TRK-142`) | TBD |
| MCP server location | `packages/mcp` (TypeScript) in monorepo | TBD |
| Markdown editor v1 | Plain textarea + preview tab | TBD |

Record final decisions in [data-model.md](./data-model.md) and [pivot-outline.md](./pivot-outline.md) §13.

### 0.2 Data model spec

- Entity-relationship diagram (mermaid or vuerd export)
- Table definitions with indexes and foreign keys
- API resource shapes (JSON examples)
- TypeScript types mirroring API responses
- Seed data sketch for demo mode

See [data-model.md](./data-model.md).

### 0.3 Migration strategy

- Rename vs new tables (`jobs` → `issues`)
- Data backfill rules for existing demo users
- Rollback plan for Fly production (likely greenfield reseed in demo mode)
- API versioning: cut over in one release vs parallel routes

See [migration-from-jobs.md](./migration-from-jobs.md).

### 0.4 MCP contract

- Tool list with input/output JSON schemas
- Auth model (personal access token)
- Error codes and agent-facing messages
- Example Cursor session (triage + implement flow)
- Transition guard matrix by agent profile

See [mcp-contract.md](./mcp-contract.md).

### 0.5 Screen map & IA

- Route tree (`/projects/:key/board`, etc.)
- Component ownership (feature folders)
- Keyboard shortcut inventory (stub for Phase 5)
- Wireframe descriptions for: board, issue panel, queue, list

See [screen-map.md](./screen-map.md).

### 0.6 Design system pass

- Token audit in `apps/web/src/tokens/`
- Linear-like density targets (spacing, type scale, radii)
- Component inventory: existing vs new vs deprecate
- Color semantics for status, priority, agent badges

See [design-system.md](./design-system.md).

### 0.7 Positioning doc (optional)

Short “what we are / what we are not” for portfolio copy:

- **Are:** planning & agent coordination layer for solo devs
- **Are not:** IDE, team Linear clone, chat wrapper

Can live as a section in [pivot-outline.md](./pivot-outline.md) §3 or standalone.

---

## Acceptance criteria

- [ ] All open questions in pivot-outline §13 have recorded decisions
- [ ] `data-model.md` is complete enough to write Rails migrations
- [ ] `migration-from-jobs.md` lists ordered steps with file touch list
- [ ] `mcp-contract.md` defines all Phase 4 v1 tools
- [ ] `screen-map.md` covers MVP routes and major components
- [ ] `design-system.md` defines tokens + new component names
- [ ] Phase 1 doc has no TBD blockers

---

## Out of scope

- Implementation code
- Wireframe PNGs (optional; ASCII/wire descriptions sufficient for MVP)
- User research / external validation
- Rebrand or marketing site

---

## References

- Current schema: `apps/api/db/schema.rb`
- Current routes: `apps/api/config/routes.rb`
- Current dashboard: `apps/web/src/features/dashboard/`
- Legacy planning: `apps/api/planning/` (historical only)
