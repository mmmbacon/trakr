# Phase 0 — Planning & Design

> **Status:** Complete  
> **Completed:** 2026-05-22  
> **Depends on:** —  
> **Blocks:** [Phase 1](./phase-1-domain-pivot.md)  
> **Goal:** Nail specs before code so the domain pivot doesn’t thrash.

## Objective

Produce enough design and technical specification that Phase 1 can execute without reopening foundational decisions. Phase 0 is documentation and design tokens only — no production feature code.

---

## Deliverables

| Deliverable | Document | Status |
|-------------|----------|--------|
| Master pivot outline | [pivot-outline.md](./pivot-outline.md) | Done |
| Locked decisions | [decisions.md](./decisions.md) | Done |
| Data model + ERD | [data-model.md](./data-model.md) | Done |
| Jobs → issues migration plan | [migration-from-jobs.md](./migration-from-jobs.md) | Done |
| MCP tool contract | [mcp-contract.md](./mcp-contract.md) | Done |
| Screen map + routes | [screen-map.md](./screen-map.md) | Done |
| Design system spec | [design-system.md](./design-system.md) | Done |
| Design tokens (code) | `apps/web/src/tokens/` | Done |
| Phase specs | `phase-*.md` | Done |

---

## Tasks

### 0.1 Resolve open questions — Done

All decisions recorded in [decisions.md](./decisions.md) and [pivot-outline.md](./pivot-outline.md) §13.

| Question | Decision |
|----------|----------|
| Keep name **Trakr**? | Yes |
| Workflow states | Per-project with global template seed |
| Comments storage | Single `activities` table with `kind: comment` |
| Issue numbers | Per-project sequence (`TRK-142`) |
| MCP server location | `packages/mcp` (TypeScript) in monorepo |
| Markdown editor v1 | Plain textarea + preview tab |
| Agent run metadata | `activities.metadata.run_id` optional |

### 0.2 Data model spec — Done

See [data-model.md](./data-model.md): ERD, tables, API endpoints, TS types, Rails migration sketch, seed sketch.

### 0.3 Migration strategy — Done

See [migration-from-jobs.md](./migration-from-jobs.md): new tables + rake copy + drop; single API cutover; file checklists.

### 0.4 MCP contract — Done

See [mcp-contract.md](./mcp-contract.md): v1 tools, auth, errors, guard matrix, Cursor session example.

### 0.5 Screen map & IA — Done

See [screen-map.md](./screen-map.md): routes, layout, components, ASCII wireframes, keyboard stub.

### 0.6 Design system pass — Done

See [design-system.md](./design-system.md). Tokens added to:

- `apps/web/src/tokens/tokens.css` — semantic + workflow CSS variables
- `apps/web/src/tokens/index.ts` — `workflowColors`, `getWorkflowColor`, typography/spacing exports

Legacy job kanban tokens retained until Phase 1 removes them.

### 0.7 Positioning — Done

Added to [pivot-outline.md](./pivot-outline.md) §3.5: what we are / what we are not.

---

## Acceptance criteria

- [x] All open questions in pivot-outline §13 have recorded decisions
- [x] `data-model.md` is complete enough to write Rails migrations
- [x] `migration-from-jobs.md` lists ordered steps with file touch list
- [x] `mcp-contract.md` defines all Phase 4 v1 tools
- [x] `screen-map.md` covers MVP routes and major components
- [x] `design-system.md` defines tokens + new component names
- [x] Phase 1 doc has no TBD blockers

---

## Out of scope

- Implementation code (except design tokens)
- Wireframe PNGs
- User research / external validation
- Rebrand or marketing site

---

## Next

Start [Phase 1 — Domain Pivot](./phase-1-domain-pivot.md): migrations, API, Redux rename, remove job UI.

---

## References

- Current schema: `apps/api/db/schema.rb`
- Current routes: `apps/api/config/routes.rb`
- Current dashboard: `apps/web/src/features/dashboard/`
- Legacy planning: `apps/api/planning/` (historical only)
