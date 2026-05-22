# Screen Map & Routes

> **Status:** Draft  
> **Phase:** 0 → implements Phase 1–3  
> **Related:** [phase-2-core-ux.md](./phase-2-core-ux.md), [design-system.md](./design-system.md)

## Route tree

```text
/                           → Login
/login                      → Login
/signup                     → Signup (hidden in demo mode)

/dashboard                  → Redirect to last project board
/dashboard/projects/:projectKey/board          → Kanban board
/dashboard/projects/:projectKey/list           → Issue list
/dashboard/projects/:projectKey/queue          → Agent queue (Phase 3)
/dashboard/projects/:projectKey/issues/:number → Board + issue panel (deep link)

/dashboard/settings                         → Settings layout
/dashboard/settings/agents                  → Agent profiles (read-only v1)
/dashboard/settings/tokens                    → API tokens (Phase 5)

Legacy (remove Phase 1):
/dashboard/search
/dashboard/job_stats
/dashboard/user_profile  → move to /dashboard/settings/profile
```

**Default redirect:** `/dashboard` → `/dashboard/projects/TRK/board` (or last project from localStorage)

---

## Layout hierarchy

```text
App
└── ColorModeProvider
    └── PrivateRoute
        └── DashboardLayout
            ├── AppHeader          (project context, user menu, Cmd+K trigger Phase 5)
            ├── SideNav
            │   ├── ProjectSwitcher
            │   ├── Nav: Board | List | Queue
            │   └── Nav: Settings
            └── MainOutlet
                ├── BoardView | ListView | QueueView
                └── IssuePanel (portal or sibling, open when :number param set)
```

---

## Views

### Board (`BoardView`)

| Region | Component | Notes |
|--------|-----------|-------|
| Toolbar | `BoardToolbar` | Create issue, filter chips |
| Columns | `KanbanBoard` → `BoardColumn` → `IssueCard` | DnD Phase 2 |
| Overlay | `IssuePanel` | When route has `issues/:number` |

### List (`ListView`)

| Region | Component |
|--------|-----------|
| Toolbar | `IssueListToolbar` |
| Table | `IssueListTable` |
| Overlay | `IssuePanel` |

### Queue (`QueueView`) — Phase 3

| Section | Component |
|---------|-----------|
| Ready | `QueueSection` + `IssueCard` compact |
| In flight | same |
| Blocked on you | same |

### Issue panel (`IssuePanel`)

| Section | Component |
|---------|-----------|
| Header | `IssuePanelHeader` — identifier, title |
| Meta | `IssueMetaRow` — status, priority, labels, assignee |
| Body | `IssueDescription` |
| Timeline | `ActivityStream` + `CommentComposer` |
| Footer | `IssuePanelActions` |

**Width:** 480px default; full-screen on mobile breakpoint (<768px)

---

## Component → file mapping (target)

```text
apps/web/src/features/
  layout/
    DashboardLayout.tsx
    AppHeader.tsx          (from common/)
  projects/
    ProjectSwitcher.tsx
    projectsSlice.ts
  board/
    BoardView.tsx
    KanbanBoard.tsx
    BoardColumn.tsx
  issues/
    IssueCard.tsx          (from JobItem)
    IssuePanel.tsx
    IssuePanelHeader.tsx
    IssueDescription.tsx
    ActivityStream.tsx
    issuesSlice.ts
  list/
    ListView.tsx
    IssueListTable.tsx
  queue/
    QueueView.tsx          (Phase 3)
  settings/
    SettingsLayout.tsx
    AgentsSettings.tsx
    TokensSettings.tsx     (Phase 5)
  auth/                      (unchanged)
```

---

## Issue panel URL behavior

1. User clicks `TRK-42` on board  
   → Navigate to `.../issues/42` (replace or push — push enables back-to-close)

2. Direct visit to `.../issues/42`  
   → Load project board, fetch issue by key+number, open panel

3. `Esc` or back  
   → Navigate to `.../board` without `:number`

4. Share link copies full URL

---

## SideNav items (final)

| Label | Route | Icon | Phase |
|-------|-------|------|-------|
| Board | `.../board` | Dashboard | 1 |
| List | `.../list` | List | 2 |
| Queue | `.../queue` | Inbox | 3 |
| Settings | `/dashboard/settings` | Settings | 3/5 |

Remove: Search Jobs, Statistics, Calendar external link, Job Resources FAB.

---

## Keyboard shortcuts (Phase 5)

See [phase-5-polish-portfolio.md](./phase-5-polish-portfolio.md). Stub in UI:

| Key | Action |
|-----|--------|
| `Cmd+K` | Command palette |
| `g` `b` | Go board |
| `g` `l` | Go list |
| `g` `q` | Go queue |
| `c` | Create issue |
| `Esc` | Close panel |

---

## Responsive behavior

| Breakpoint | Board | Panel |
|------------|-------|-------|
| ≥1024px | Horizontal scroll columns | Side panel |
| 768–1023px | Horizontal scroll | Full overlay |
| <768px | Single column or list default | Full screen |

---

## Empty states

| View | Message |
|------|---------|
| Board column | “No issues” |
| List | “No issues match filters” |
| Queue Ready | “Nothing ready — move issues from Triage” |
| Activity | “No activity yet” |

---

## Auth-gated routes

All `/dashboard/*` behind `PrivateRoute` (unchanged). Demo mode auto-login preserved.
