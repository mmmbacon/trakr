# Phase 5 — Polish & Portfolio

> **Status:** Not started  
> **Depends on:** [Phase 4](./phase-4-mcp-v1.md) (MVP feature-complete)  
> **Blocks:** —  
> **Goal:** Make the product demo-ready, keyboard-fast, and portfolio-worthy.

## Objective

Layer the **feel** of Linear — command palette, shortcuts, visual polish — and ship external narrative: README, demo mode, blog post, optional GitHub PR linking. After Phase 5, the MVP is presentable as a portfolio centerpiece.

---

## Prerequisites

- [ ] MVP acceptance criteria from [pivot-outline.md](./pivot-outline.md) §11 met
- [ ] [design-system.md](./design-system.md) tokens applied consistently
- [ ] MCP demo script runs reliably

---

## 5.1 Command palette

### Trigger

- `Cmd+K` / `Ctrl+K` global
- `/` optional quick search when not in input

### Actions (v1)

| Action | Behavior |
|--------|----------|
| Search issues | Fuzzy match title + identifier |
| Open issue | Navigate to panel URL |
| Create issue | Open create form or inline title capture |
| Go to board | `g b` equivalent |
| Go to list | `g l` |
| Go to queue | `g q` |
| Switch project | Fuzzy project list |

### Implementation options

- **Radix Command** or **cmdk** — evaluate bundle size
- Palette component: `CommandBar.tsx` in `components/` or `features/command/`
- Register actions via hook `useCommandActions()`

### API

- Client-side search over Redux cache for speed
- Optional `GET /issues/search?q=` for large backlogs

---

## 5.2 Keyboard shortcuts

Document in palette footer and `docs/planning/keyboard-shortcuts.md`.

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Command palette |
| `g` then `b` | Board |
| `g` then `l` | List |
| `g` then `q` | Queue |
| `c` | Create issue (on board) |
| `Esc` | Close panel / palette |
| `j` / `k` | Move selection in list (optional) |

Use `react-hotkeys-hook` or custom listener with guard (ignore when typing in inputs).

---

## 5.3 Visual polish

Per [design-system.md](./design-system.md):

- Consistent issue card density
- Empty states for columns and queue sections
- Loading skeletons for board and panel
- Toast/snackbar for transitions and errors (extend existing pattern)
- Dark mode audit — status colors, panel contrast
- Issue identifier monospace (`TRK-42`)

### Remove dead UI

- Old search route if merged into list/palette
- Unused job assets in `public/img/` if any

---

## 5.4 GitHub PR linking (optional)

If timeboxed:

### Activity type

`kind: pr_linked`, metadata: `{ url, title }`

### UI

- Issue panel: “Link PR” field paste GitHub URL
- Activity renders as link chip

### MCP v2 tool

`link_pr` — defer to post-MVP or stub in Phase 5 if MCP v1 stable.

---

## 5.5 Settings & tokens UI

Human-facing management for Phase 4 tokens:

- `/dashboard/settings/tokens` — create, name, copy once, revoke
- Show which agent profile a token is scoped to

Required for portfolio visitors to try MCP without Rails console.

---

## 5.6 Documentation

### Repository

- Update root `README.md` — new product description, architecture diagram with MCP
- Update `AGENTS.md` — monorepo includes `packages/mcp`
- `.env.example` — `TRAKR_API_TOKEN` for local MCP

### Planning

- Mark phase docs complete
- Add `docs/planning/keyboard-shortcuts.md` if not inline

### Demo mode

- Banner copy: coordinated solo issue tracker + agents
- Seed showcases agent-attributed activities (pre-seeded demo trail)

---

## 5.7 Portfolio & blog

### bm-portfolio post

Suggested title: *“Building a solo issue tracker where my agents are the team”*

Sections:

- Problem: IDE isn’t a planning layer
- Architecture: React + Rails + MCP
- Agent profiles and queue coordination
- 60-second demo embed or screenshots
- Link to live demo + GitHub

### Live demo checklist

- [ ] Vercel deploy with `VITE_DEMO_MODE=true`
- [ ] Fly API seeded with projects/issues/agent activity
- [ ] MCP setup in README for local clone (production MCP optional)

---

## 5.8 Testing & quality

- [ ] `npm run check:web` + format
- [ ] API tests green
- [ ] MCP package typecheck in CI
- [ ] Manual QA script: board, panel, queue, palette, MCP demo
- [ ] Optional: Playwright smoke — login, open issue, DnD one card

---

## 5.9 Performance (light pass)

- Lazy-load command palette chunk
- Verify production build chunk sizes (`npm run build:web`)
- Image/asset audit

No premature optimization — document findings only.

---

## Acceptance criteria

- [ ] Command palette finds issues and navigates views
- [ ] Core keyboard shortcuts work
- [ ] README reflects pivot; AGENTS.md updated
- [ ] Token management UI for MCP
- [ ] Demo mode tells coherent agent-coordination story
- [ ] Blog post drafted or published
- [ ] CI green on main

---

## Out of scope (Phase 5)

- Multi-user, real-time, cycles (see Phase 6)
- Full markdown editor (WYSIWYG)
- Mobile-native app
- Public SaaS billing

---

## Next

[Phase 6 — Later](./phase-6-later.md) for post-MVP roadmap items.
