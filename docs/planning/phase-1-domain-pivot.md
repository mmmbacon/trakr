# Phase 1 — Domain Pivot

> **Status:** Not started  
> **Depends on:** [Phase 0](./phase-0-planning-design.md) (data model + migration plan)  
> **Blocks:** Phase 2, Phase 3  
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

## Backend work

### 1.1 Database migrations

**New tables**

- `projects` — `name`, `key` (unique per user), `color`, `description`, `user_id`
- `workflow_states` — `name`, `position`, `project_id` (nullable), `category` (optional: backlog/active/done)
- `labels`, `issue_labels` (can defer labels to Phase 2 if needed)
- `issues` — replaces `jobs`; see data model
- `activities` — replaces `events`; add `kind`, `actor_type`, `actor_id`, `metadata` JSONB

**Migration approach** (choose one in Phase 0):

- **Option A:** Rename tables in place (`jobs` → `issues`, `events` → `activities`) + column changes
- **Option B:** New tables + one-time data copy + drop old (safer for large column diffs)

**Drop or deprecate columns** on issues: `salary`, `contact_*`, `resume_url`, `coverletter_url`, `extra_url` (unless mapped to generic links JSON)

### 1.2 Rails models

| Current | New |
|---------|-----|
| `app/models/job.rb` | `app/models/issue.rb` |
| `app/models/event.rb` | `app/models/activity.rb` |
| — | `app/models/project.rb` |
| — | `app/models/workflow_state.rb` |
| — | `app/models/label.rb` (optional v1) |

Associations:

```ruby
User has_many :projects
Project has_many :issues, has_many :workflow_states
Issue belongs_to :project, belongs_to :workflow_state, has_many :activities
Activity belongs_to :issue
```

### 1.3 Controllers & routes

| Current | New |
|---------|-----|
| `Api::JobsController` | `Api::IssuesController` |
| `Api::EventsController` | `Api::ActivitiesController` |
| — | `Api::ProjectsController` |
| — | `Api::WorkflowStatesController` (read-only or nested under project) |

Update `config/routes.rb`:

```ruby
resources :projects do
  resources :issues
  resources :workflow_states, only: [:index]
end
resources :activities, only: [:create, :update, :destroy] # or nested under issues
```

Decide nesting: `/api/projects/:project_id/issues` vs flat `/api/issues?project=TRK`.

### 1.4 Serializers / JSON shape

Example issue JSON:

```json
{
  "id": 142,
  "number": 42,
  "identifier": "TRK-42",
  "title": "Add issue panel routing",
  "description": "",
  "priority": "medium",
  "project": { "id": 1, "key": "TRK", "name": "Trakr" },
  "workflow_state": { "id": 3, "name": "In Progress", "position": 2 },
  "activities": []
}
```

### 1.5 Seeds

Replace job demo data in `db/seeds.rb`:

- 2–3 projects (e.g. `TRK` Trakr, `BMP` Portfolio)
- Default workflow states per project
- 10–15 sample issues across states
- Sample activities (comments, status changes)

### 1.6 Tests

- Migrate `test/controllers/api/jobs_controller_test.rb` → issues
- Migrate `test/controllers/api/events_controller_test.rb` → activities
- Add project + workflow_state fixture tests
- Keep CI green (`npm run test:api`)

---

## Frontend work

### 1.7 Types

Update `apps/web/src/types/index.ts`:

- `Job` → `Issue`
- `JobEvent` → `Activity`
- Add `Project`, `WorkflowState`, `IssuePayload`

### 1.8 Redux

| Current | New |
|---------|-----|
| `features/dashboard/jobs/jobsSlice.ts` | `features/issues/issuesSlice.ts` |
| Status selectors (`selectAppliedJobs`, etc.) | Selectors by `workflow_state_id` or slug |

Add `features/projects/projectsSlice.ts` for project list + active project.

### 1.9 Feature folder restructure

```
features/
  projects/
  issues/
    IssueForm*.tsx      (from JobForm*)
    IssuesModal.tsx     (temporary — replaced in Phase 2)
  board/
    KanbanBoard.tsx     (from dashboard/)
    BoardColumn.tsx
  auth/                 (unchanged)
```

Or incremental rename in place — prefer clarity over big-bang move if tests pass.

### 1.10 UI copy & navigation

Update `SideNav` labels:

- Job Board → Board (or project-scoped “Trakr Board”)
- Search Jobs → Search
- Statistics → defer reframe or remove until Phase 5
- Remove Calendar external link or repurpose

### 1.11 Remove job-specific UI

| File / feature | Action |
|----------------|--------|
| `SalaryStats.tsx` | Remove |
| `JobStats.tsx` | Remove or stub “Queue metrics” placeholder |
| `Drawer.tsx` (job resources FAB) | Remove |
| `jobResourceLinks.ts` | Remove |
| `useCompanyLogo.ts` | Remove or replace with project icon |
| Google Places in forms | Remove |
| Job contact fields in forms | Remove |

### 1.12 Kanban column source

Replace hard-coded status enum (`getKanbanColumns` + five selectors) with:

- Fetch `workflow_states` for active project
- Group issues by `workflow_state_id`

Files: `Dashboard.tsx`, `KanbanBoard.tsx`, `theme.ts` (status colors → state colors)

### 1.13 Demo mode

- Update `demoPresets.ts` for issue-shaped data
- Update demo banner copy: “sample issues” not “sample jobs”
- Verify `VITE_DEMO_MODE` seed path end-to-end

---

## File touch list (estimated)

**API**

- `db/migrate/*`
- `db/schema.rb`, `db/seeds.rb`
- `app/models/*`
- `app/controllers/api/*`
- `test/**/*`

**Web**

- `src/types/index.ts`
- `src/features/dashboard/**` → issues/board
- `src/components/JobItem.tsx` → `IssueCard.tsx`
- `src/adapters/mui/JobItemCard.tsx`
- `src/theme.ts`
- `src/App.test.tsx`

---

## Acceptance criteria

- [ ] API serves projects, issues, activities; old `/jobs` routes removed or deprecated
- [ ] Board renders issues grouped by workflow state for selected project
- [ ] Create/edit/delete issue works via existing modal pattern
- [ ] Activities attach to issues (timeline data exists in API)
- [ ] No job-specific fields in UI or API responses
- [ ] Demo mode loads sample projects and issues
- [ ] `npm run check:web` and API tests pass
- [ ] README still accurate for local dev (minimal update)

---

## Risks

| Risk | Mitigation |
|------|------------|
| Large rename diff | Single focused PR; use IDE rename symbols |
| Production Fly data | Demo mode reseed; document one-time migration for any real users |
| Broken selectors | Replace enum status with `workflow_state_id` everywhere in one pass |

---

## Out of scope (Phase 1)

- Drag-and-drop (Phase 2)
- Issue slide-over panel / deep links (Phase 2)
- Agent profiles, assignees, claims (Phase 3)
- MCP server (Phase 4)
- Labels/priority UI (can stub API fields; full UI Phase 2)
- Command palette (Phase 5)

---

## Next phase

[Phase 2 — Core UX](./phase-2-core-ux.md): issue panel, DnD, list view, activity stream UI.
