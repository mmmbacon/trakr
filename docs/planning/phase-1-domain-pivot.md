# Phase 1 — Domain Pivot

> **Status:** Complete  
> **Completed:** 2026-05-22  
> **Depends on:** [Phase 0](./phase-0-planning-design.md)  
> **Blocks:** [Phase 2](./phase-2-core-ux.md)  
> **Goal:** Replace the job-tracking domain with projects, issues, and activities while keeping auth and deploy intact.

## Objective

Rename and reshape the backend and frontend domain layer from **jobs/events** to **projects/issues/activities**. Remove job-specific UI. Reseed demo data. App should feel like an issue tracker on a kanban board — even before DnD and agents.

---

## Prerequisites

- [x] [decisions.md](./decisions.md) locked
- [x] [data-model.md](./data-model.md) signed off
- [x] [migration-from-jobs.md](./migration-from-jobs.md) step order agreed
- [x] Workflow default states defined: Backlog → Triage → Ready → In Progress → Done

---

## Delivered

### Backend

- Schema: `projects`, `workflow_states`, `issues`, `activities` (dropped `jobs`, `events`)
- Models with workflow template seed on project create
- API: `/api/projects`, `/api/projects/:key/issues`, `/api/issues/:id`, activities
- Demo seeds: TRK + BMP projects with sample issues
- Controller tests (14 API tests passing)

### Frontend

- Types, `projectsSlice`, `issuesSlice`
- Project switcher in sidebar; board grouped by workflow state
- Issue cards (`TRK-42` identifier), simplified create/edit modal
- Removed: job stats, salary charts, job resources FAB, search, job form fields

---

## Acceptance criteria

- [x] API serves projects, issues, activities; old `/jobs` routes removed
- [x] Board renders issues grouped by workflow state for selected project
- [x] Create/edit/delete issue works via modal
- [x] Activities attach to issues (API + optional comment on save)
- [x] No job-specific fields in UI or API responses
- [x] Demo mode loads sample projects and issues
- [x] `npm run check:web` and API tests pass
- [x] README updated for local dev

---

## Next phase

[Phase 2 — Core UX](./phase-2-core-ux.md): issue panel, DnD, list view, activity stream UI.
