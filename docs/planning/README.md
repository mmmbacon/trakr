# Planning

Product and technical planning for Trakr pivot: **solo issue tracker with agent coordination**.

## Master doc

- [pivot-outline.md](./pivot-outline.md) — Vision, scope, MVP, risks
- [decisions.md](./decisions.md) — Locked Phase 0 ADRs

## Phases

| Phase | Document | Summary |
|-------|----------|---------|
| 0 | [phase-0-planning-design.md](./phase-0-planning-design.md) | **Complete** — specs, decisions, tokens |
| 1 | [phase-1-domain-pivot.md](./phase-1-domain-pivot.md) | Jobs → issues, projects, API + Redux |
| 2 | [phase-2-core-ux.md](./phase-2-core-ux.md) | Issue panel, DnD, list, activity UI |
| 3 | [phase-3-agent-coordination.md](./phase-3-agent-coordination.md) | Agent profiles, claims, queue view |
| 4 | [phase-4-mcp-v1.md](./phase-4-mcp-v1.md) | MCP server, API tokens, Cursor integration |
| 5 | [phase-5-polish-portfolio.md](./phase-5-polish-portfolio.md) | Command palette, docs, demo, blog |
| 6 | [phase-6-later.md](./phase-6-later.md) | Post-MVP backlog |

## Technical specs (Phase 0 deliverables)

| Document | Contents |
|----------|----------|
| [data-model.md](./data-model.md) | ERD, tables, API JSON, TypeScript types |
| [migration-from-jobs.md](./migration-from-jobs.md) | Migration steps, rename checklist |
| [mcp-contract.md](./mcp-contract.md) | Tool schemas, auth, guard matrix |
| [screen-map.md](./screen-map.md) | Routes, components, layout |
| [design-system.md](./design-system.md) | Tokens, components, visual spec |

## Suggested reading order

1. pivot-outline.md  
2. phase-0-planning-design.md  
3. data-model.md + screen-map.md  
4. phase-1 through phase-5 in order  

Historical bootcamp planning: `apps/api/planning/` (not maintained).
