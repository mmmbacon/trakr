# Phase 2 — Core UX

> **Status:** Not started  
> **Depends on:** [Phase 1](./phase-1-domain-pivot.md)  
> **Blocks:** Phase 3 (queue view builds on list/filters)  
> **Goal:** Feel like Linear — panel, DnD board, list view, visible activity — still human-only assignees.

## Objective

Upgrade interaction model from “modal CRUD kanban” to a **keyboard-friendly issue tracker**: URL-routable issue panel, drag-and-drop status changes, dense list view, and activity stream on the issue detail surface.

---

## Prerequisites

- [ ] Phase 1 complete — issues grouped by workflow state
- [ ] [screen-map.md](./screen-map.md) routes for issue panel approved
- [ ] [design-system.md](./design-system.md) defines `IssuePanel`, `IssueCard`, `StatusPill`

---

## 2.1 Issue panel (replace modal)

### Behavior

- Click issue card → panel slides in from right (not full-screen modal)
- URL updates: `/dashboard/projects/:projectKey/issues/:number`
- Browser back closes panel
- Direct link opens board + panel
- Panel width ~480–560px; board remains visible on desktop

### Sections (top → bottom)

1. Header: identifier (`TRK-42`), title (editable inline or click-to-edit)
2. Metadata row: status dropdown, priority, labels (if API ready)
3. Description: markdown textarea + preview tab (v1)
4. Activity stream (read-only in this phase except new comment form)
5. Footer actions: delete (human confirm), copy link, copy issue ID

### Components

| New | Replaces |
|-----|----------|
| `IssuePanel.tsx` | `JobsModal.tsx` |
| `IssuePanelHeader.tsx` | `JobFormHeader.tsx` |
| `IssueDescription.tsx` | `JobFormDetails.tsx` |
| `ActivityStream.tsx` | `JobFormEvents.tsx` (reshape) |

Remove modal overlay pattern from board cards; keep `ModalConfirm` for delete.

### Routing

Extend `Dashboard.tsx` routes per [screen-map.md](./screen-map.md):

```tsx
<Route path="projects/:projectKey/board" element={<Board />} />
<Route path="projects/:projectKey/issues/:issueNumber" element={<Board />} />
```

Panel reads `issueNumber` from URL; fetches or selects from Redux.

### API

- `GET /api/projects/:key/issues/:number` — resolve by project key + issue number
- `PATCH` for inline title/description updates (debounced save optional)

---

## 2.2 Board drag-and-drop

### Library

`@dnd-kit/core` + `@dnd-kit/sortable` (React 18 compatible, accessible).

### Behavior

- Drag issue card horizontally to another column → changes `workflow_state_id`
- Optimistic UI update in Redux; rollback on API failure
- Vertical reorder within column: **optional v1** (defer if costly; Linear reorder is nice-to-have)
- Visual: drag overlay, column highlight on drag over
- Mobile: long-press or defer mobile DnD to later

### API

- `PATCH /api/issues/:id` with `{ workflow_state_id }`
- Server creates `activity` with `kind: status_change`, `actor_type: human`

### State

- `issuesSlice` thunk: `transitionIssue({ issueId, workflowStateId })`
- Handle concurrent updates (stale response → refetch)

### Files

- `KanbanBoard.tsx` — DnD context
- `BoardColumn.tsx` — droppable zone
- `IssueCard.tsx` — draggable item

---

## 2.3 List view

### Route

`/dashboard/projects/:projectKey/list`

### Columns (table)

| Column | Source |
|--------|--------|
| ID | `identifier` |
| Title | `title` |
| Status | `workflow_state.name` |
| Priority | `priority` |
| Updated | `updated_at` relative |

### Interactions

- Row click → open issue panel (same URL pattern)
- Sort by updated, priority, status
- Filters: status (multi), priority, text search (client-side v1)

### Components

- `IssueListView.tsx`
- `IssueListToolbar.tsx` — search + filter chips

Reuse search logic from current `Search.tsx`; merge or redirect old search route.

---

## 2.4 Activity stream (UI)

### Display

Unified timeline on issue panel:

| Activity kind | Rendering |
|---------------|-----------|
| `comment` | Avatar, author, body, timestamp |
| `status_change` | “Moved from X to Y” |
| `system` | Created issue, etc. |

Phase 2: human-authored comments only in compose box.

### Compose

- Textarea + “Comment” button
- `POST /api/issues/:id/activities` with `kind: comment`

### Deprecate

- Old “events” form with title/date/location fields (job interview model)
- Replace with comment + system-generated status activities

---

## 2.5 Project switcher

### Location

Sidebar header or app header — switch active project.

### Behavior

- Lists user’s projects
- Switching project navigates to `/projects/:key/board`
- Persist last project in `localStorage`

### API

Already from Phase 1 `GET /api/projects`.

---

## 2.6 Labels & priority (minimal)

If not done in Phase 1:

- **Priority:** enum `none | low | medium | high | urgent` — dropdown in panel
- **Labels:** multi-select chips; color from seed labels

Defer label management UI (create label) to Phase 5; seed 5–8 labels in demo.

---

## 2.7 Design system implementation

Per [design-system.md](./design-system.md):

- `StatusPill` — colored dot + state name
- `IssueCard` — identifier, title, priority icon, label chips (compact)
- `IssuePanel` — layout shell, slide animation
- Token pass: tighter card padding, 13px body text option, subtle borders

Keep imports through `components/ui` barrel.

---

## Acceptance criteria

- [ ] Issue opens in side panel with shareable URL
- [ ] DnD between columns persists status and creates activity
- [ ] List view with sort, filter, row → panel
- [ ] Comments appear in activity stream
- [ ] Project switcher changes board/list context
- [ ] Old job modal removed
- [ ] `npm run check:web` passes
- [ ] Basic accessibility: panel focus trap, Esc to close, keyboard focus order

---

## Testing

- Unit: reducers/thunks for `transitionIssue`, optimistic rollback
- Component: `IssuePanel` opens/closes from URL (Vitest + MemoryRouter)
- Manual: DnD across all columns, deep link, back button

E2E (Playwright) optional — noted in Phase 5.

---

## Out of scope (Phase 2)

- Agent assignees, badges, claim (Phase 3)
- Queue view (Phase 3)
- Command palette (Phase 5)
- GitHub PR link activity type (Phase 5)
- Real-time updates

---

## Next phase

[Phase 3 — Agent Coordination](./phase-3-agent-coordination.md): agent profiles, assignee model, claims, queue view, agent/human activity attribution.
