# Design System

> **Status:** Draft  
> **Phase:** 0 spec → Phase 2–5 implementation  
> **Related:** [phase-2-core-ux.md](./phase-2-core-ux.md), `apps/web/src/tokens/`

## Direction

**Linear-inspired density** with Trakr-owned tokens. MUI remains an implementation detail behind `components/ui` and `adapters/mui/`.

Goals:

- Information-dense without clutter
- Subtle borders over heavy shadows
- Monospace issue identifiers
- Clear human vs agent visual language

---

## Tokens

Extend `apps/web/src/tokens/tokens.css`:

### Typography

| Token | Value | Use |
|-------|-------|-----|
| `--font-sans` | system / Inter / Geist | UI |
| `--font-mono` | ui-monospace, SF Mono | Issue IDs, timestamps |
| `--text-xs` | 11px | Metadata, badges |
| `--text-sm` | 13px | Body, issue titles on cards |
| `--text-base` | 14px | Panel body |
| `--text-lg` | 16px | Panel title |

### Spacing

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |

Tighter than default MUI — card padding `--space-3`.

### Radii

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 6px |
| `--radius-lg` | 8px |

### Colors (semantic)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-bg` | #FAFAFA | #0F0F10 | App background |
| `--color-surface` | #FFFFFF | #1A1A1C | Cards, panel |
| `--color-border` | #E5E5E7 | #2A2A2E | Dividers |
| `--color-text` | #171717 | #EDEDEF | Primary text |
| `--color-text-muted` | #71717A | #A1A1AA | Secondary |
| `--color-accent` | #5E6AD2 | #7C86E8 | Links, focus (Linear-ish purple) |
| `--color-human` | #3B82F6 | — | Human actor badge |
| `--color-agent` | #8B5CF6 | — | Agent actor badge |

### Workflow state colors

Map slugs to dot colors on `StatusPill`:

| Slug | Color |
|------|-------|
| backlog | gray |
| triage | yellow |
| ready | blue |
| in_progress | purple |
| done | green |

Store in theme helper `getWorkflowStateColor(slug)` — migrate from `getJobStatusColors`.

### Priority icons

| Priority | Visual |
|----------|--------|
| urgent | Red double chevron |
| high | Orange chevron |
| medium | Yellow dash |
| low | Blue chevron down |
| none | Hidden |

---

## Component inventory

### Keep (adapt)

| Component | Path | Changes |
|-----------|------|---------|
| `SideNav` | adapters/mui/SideNav | Project switcher, nav items |
| `AppHeader` | adapters/mui/AppHeader | Project breadcrumb |
| `Paper` | adapters/mui/Paper | Thinner border variant |
| `Modal` / confirm | components | Keep for delete confirm |
| `LoadingOverlay` | components/ui | Unchanged |
| `StatusPieChart` | — | Remove or Phase 6 cycles only |

### New

| Component | Purpose |
|-----------|---------|
| `IssueCard` | Board/list card |
| `IssuePanel` | Slide-over shell |
| `IssuePanelHeader` | ID + title |
| `StatusPill` | Colored dot + label |
| `PriorityIcon` | Priority glyph |
| `LabelChip` | Small label tag |
| `AgentBadge` | Agent avatar + name |
| `HumanBadge` | User initials |
| `ActivityStream` | Timeline list |
| `ActivityItem` | Single row by kind |
| `CommentComposer` | Textarea + submit |
| `ProjectSwitcher` | Dropdown in sidebar |
| `CommandBar` | Cmd+K palette (Phase 5) |
| `QueueSection` | Queue group header + list |

### Remove

| Component | Reason |
|-----------|--------|
| `JobItemCard` | → IssueCard |
| `SalaryStats` | Job domain |
| Job resource FAB | Job domain |

---

## Issue card spec

```text
┌─────────────────────────────────────┐
│ TRK-42  [priority icon]             │
│ Fix kanban scroll on mobile         │
│ [ui] [bug]              Implementer │
└─────────────────────────────────────┘
```

- Identifier: mono, muted
- Title: 13px, max 2 lines ellipsis
- Labels: max 2 visible + overflow count
- Assignee: agent badge or omitted if unassigned
- Height: ~72px compact

---

## Issue panel spec

```text
┌──────────────────────────┐
│ TRK-42              [×]  │
│ Title (editable)         │
│ [In Progress ▾] P2 [ui]  │
│ Assignee: Implementer    │
├──────────────────────────┤
│ Description (markdown)   │
├──────────────────────────┤
│ Activity                 │
│ ● Implementer · 2h ago   │
│   Claimed issue          │
│ ● You · 1d ago           │
│   Created                │
├──────────────────────────┤
│ [Comment...        ] [→] │
└──────────────────────────┘
```

- Slide from right, 480px
- Backdrop dim on mobile only
- Focus trap when open

---

## Agent vs human

| Element | Human | Agent |
|---------|-------|-------|
| Badge | Initials circle, blue | Robot/spark icon, purple |
| Activity label | “You” or first name | Profile name (“Implementer”) |
| Card footer | Optional | Agent name when assigned |

---

## Motion

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Panel open | 200ms | ease-out |
| Panel close | 150ms | ease-in |
| DnD lift | — | @dnd-kit default |
| Toast | 3000ms | existing snackbar |

Avoid heavy animation — speed is the brand.

---

## Accessibility

- Issue cards: `article` with `aria-label="{identifier}: {title}"`
- Panel: `role="dialog"`, `aria-labelledby` title
- StatusPill: text label, not color-only
- Keyboard: Esc closes panel; focus returns to triggering card

---

## Implementation rules

1. Features import from `components/ui` only — never `@mui/material` in features/
2. New primitives start in `adapters/mui/` until stable, then abstract if peeling
3. Prefer CSS variables from `tokens.css` in new SCSS/CSS modules
4. Dark mode: test all semantic colors in both modes before Phase 5

---

## Phase rollout

| Phase | Design work |
|-------|-------------|
| 1 | Rename copy; basic IssueCard rename |
| 2 | Panel, StatusPill, ActivityStream, token pass |
| 3 | AgentBadge, QueueSection |
| 5 | CommandBar, polish pass, empty states |
