# Phase 0 Decisions

> **Status:** Locked (2026-05-22)  
> **Authority:** These decisions unblock [Phase 1](./phase-1-domain-pivot.md). Change via explicit ADR update.

## Product

| ID | Question | Decision | Rationale |
|----|----------|----------|-----------|
| P-1 | Product name | **Keep Trakr** for repo and v1 UI | Avoid rebrand churn; pivot story is positioning not naming |
| P-2 | Target user | Solo developer; single account | Core thesis: lone wolf + agents |
| P-3 | Positioning | Planning & agent coordination layer | Not IDE, not team Linear, not chat wrapper |

## Domain model

| ID | Question | Decision | Rationale |
|----|----------|----------|-----------|
| D-1 | Issue identifiers | Per-project sequence; display `{KEY}-{number}` | Matches Linear; e.g. `TRK-42`, `BMP-7` |
| D-2 | Workflow states | **Per-project**, seeded from global template on create | Allows project-specific tweaks later |
| D-3 | Default workflow | Backlog → Triage → Ready → In Progress → Done | Supports queue + agent handoff in Phase 3 |
| D-4 | Comments | Single `activities` table, `kind: comment` | One timeline model; no duplicate comment entity |
| D-5 | Priority | String enum: `none`, `low`, `medium`, `high`, `urgent` | Simple; no numeric story points in v1 |
| D-6 | Labels | User-scoped; **defer UI to Phase 2**; optional API in Phase 1 | Reduce Phase 1 scope |
| D-7 | Assignee / claim | Phase 3 columns on `issues`; not in Phase 1 schema | Phase 1 focuses on domain rename |

## API & migration

| ID | Question | Decision | Rationale |
|----|----------|----------|-----------|
| A-1 | Migration strategy | New tables → rake copy → drop `jobs`/`events` | Column semantics too different for rename-in-place |
| A-2 | API versioning | **Single cutover**; remove `/api/jobs` in same release | Portfolio app; demo reseed acceptable |
| A-3 | Production data | Fly demo: `db:migrate` + `db:seed` | No legacy user preservation requirement |
| A-4 | Issue routes | Nested: `/api/projects/:key/issues/:number` | Readable URLs; project context explicit |
| A-5 | Legacy job field mapping | See [migration-from-jobs.md](./migration-from-jobs.md) | Rejected → Done; Interested → Backlog |

## MCP & agents

| ID | Question | Decision | Rationale |
|----|----------|----------|-----------|
| M-1 | MCP server location | `packages/mcp` (TypeScript, Node 22) | Shares types with web; stdio for Cursor |
| M-2 | MCP transport v1 | stdio only | Simplest local dev; HTTP later |
| M-3 | API auth for agents | Personal access tokens; `Authorization: Bearer trakr_*` | Separate from browser session cookie |
| M-4 | Agent run metadata | `activities.metadata.run_id` optional string | No Cursor transcript URL in v1 |
| M-5 | Agent profiles seed | Triage, Implementer, Scribe (Phase 3) | Documented in seeds; not Phase 1 |

## UI & design

| ID | Question | Decision | Rationale |
|----|----------|----------|-----------|
| U-1 | Markdown v1 | Plain textarea + preview tab | No heavy editor dependency in Phase 2 |
| U-2 | Issue detail surface | Slide-over panel (Phase 2); modal OK in Phase 1 | Phase 1 may keep modal briefly if panel slips |
| U-3 | Design tokens | Extend `apps/web/src/tokens/`; Linear-like density | See [design-system.md](./design-system.md) |
| U-4 | MUI | Keep behind `adapters/mui/`; peel gradually | Avoid Phase 1 rewrite |
| U-5 | Default project key | `TRK` for Trakr dogfood project | Demo and redirects use this key |

## Explicitly out of v1

- Multi-user / teams
- Real-time sync
- Cycles / sprints
- GitHub integration (optional Phase 5)
- Separate comments table
- Global (cross-project) issue numbers
