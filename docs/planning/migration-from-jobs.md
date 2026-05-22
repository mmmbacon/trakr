# Migration from Jobs

> **Status:** Draft  
> **Phase:** 0 spec → Phase 1 execution  
> **Related:** [data-model.md](./data-model.md), [phase-1-domain-pivot.md](./phase-1-domain-pivot.md)

## Strategy

**Recommended:** New tables + one-time copy + drop old tables in a single deploy window.

Rationale: column semantics diverge heavily (company → project_id, events → activities with kinds). Rename-in-place saves little for a demo-mode app with no production user data requirement.

**Production (Fly demo):** `db:seed` after migrate is acceptable; document in deploy checklist.

---

## Migration order

### Step 1 — Add new tables (non-breaking)

1. `projects`
2. `workflow_states`
3. `labels`, `issue_labels` (optional defer)
4. `issues` (new, empty)
5. `activities` (new, empty)

Keep `jobs` and `events` until Step 3.

### Step 2 — Data migration rake task

`rails trakr:migrate_jobs_to_issues`

```ruby
# Pseudocode
User.find_each do |user|
  default_project = user.projects.create!(
    name: "Default",
    key: "TRK",
    color: "#5E6AD2"
  )
  seed_workflow_states(default_project)

  state_map = legacy_status_to_slug # 0→backlog, 1→triage, etc.

  user.jobs.find_each do |job|
    issue = default_project.issues.create!(
      user: user,
      number: next_number(default_project),
      title: job.title,
      description: job.details,
      workflow_state: default_project.workflow_states.find_by!(slug: state_map[job.status]),
      priority: "none"
    )
    job.events.each do |event|
      issue.activities.create!(
        kind: "comment",
        actor_type: "human",
        actor_id: user.id,
        body: [event.title, event.details, event.location].compact.join("\n"),
        metadata: { migrated_from_event_id: event.id, date: event.date },
        created_at: event.created_at
      )
    end
  end
end
```

**Legacy status mapping:**

| Job `status` (int) | Workflow slug |
|--------------------|---------------|
| 0 Interested | backlog |
| 1 Applied | triage |
| 2 Interviewing | in_progress |
| 3 Offer | done |
| 4 Rejected | done |

Adjust mapping to match new semantics; rejected → `done` with label `wont-do` optional.

**Dropped job fields:** salary, location, url, contact_*, resume_*, coverletter_*, extra_url — not copied unless appended to description footer in migration.

### Step 3 — Drop old tables

Migration: `drop_table :events`, `drop_table :jobs`

### Step 4 — Phase 3/4 tables (separate migrations)

- `agent_profiles`
- Add claim columns to `issues`
- `api_tokens`

Can ship after Phase 1 if Phase 3 not ready.

---

## API cutover

### Remove

```
GET/POST/PATCH/DELETE /api/jobs
GET/POST/PATCH/DELETE /api/events
```

### Add

```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:key
GET    /api/projects/:key/issues
POST   /api/projects/:key/issues
GET    /api/projects/:key/issues/:number
PATCH  /api/issues/:id
DELETE /api/issues/:id
POST   /api/issues/:id/transition      # Phase 2/3
GET    /api/projects/:key/workflow_states
POST   /api/issues/:id/activities
```

No `/api/v2` prefix for v1 — breaking change acceptable for portfolio app.

---

## Frontend rename checklist

| Path / symbol | Action |
|---------------|--------|
| `features/dashboard/jobs/` | → `features/issues/` |
| `jobsSlice` | → `issuesSlice` |
| `Job`, `JobEvent` types | → `Issue`, `Activity` |
| `JobItem.tsx` | → `IssueCard.tsx` |
| `fetchJobs` | → `fetchIssues` |
| `selectAppliedJobs` etc. | → selectors by workflow slug |
| `/dashboard/job_stats` | Remove or replace |
| `JobResources` / `Drawer.tsx` FAB | Delete |
| `SalaryStats`, `useCompanyLogo` | Delete |
| `App.test.tsx` job references | Update |
| Axios URLs `/api/jobs` | → `/api/projects/:key/issues` |

Use IDE rename + grep for `job` / `Job` in `apps/web/src`.

---

## Backend rename checklist

| Path | Action |
|------|--------|
| `app/models/job.rb` | Remove after migration |
| `app/models/event.rb` | Remove |
| `app/controllers/api/jobs_controller.rb` | → `issues_controller.rb` |
| `app/controllers/api/events_controller.rb` | → `activities_controller.rb` |
| `test/fixtures/jobs.yml` | → `issues.yml` |
| `test/fixtures/events.yml` | → `activities.yml` |
| Controller tests | Rewrite for new routes |

---

## Rollback plan

- Migrations reversible through Step 1 only
- After Step 3 drop: restore from backup or re-seed demo
- No rollback guarantee post-launch — acceptable for demo deployment

---

## Verification

```sh
npm run db:setup
npm run test:api
npm run check:web
npm run dev  # manual: board shows issues, create/edit works
```

Compare issue count to former job count in migration task output log.

---

## Timeline estimate (solo)

| Step | Effort |
|------|--------|
| Migrations + models | 1–2 days |
| API controllers + tests | 1–2 days |
| Frontend slice + types | 2–3 days |
| Remove dead UI | 0.5 day |
| QA + seed polish | 0.5 day |

**Total:** ~5–8 days focused work
