# Trakr — Agent Instructions

Full-stack job application tracker. Monorepo: React frontend (`apps/web`), Rails API (`apps/api`), local Postgres via Docker.

## Commands

Run from the repository root unless noted.

| Task | Command |
|------|---------|
| Dev (web + API) | `npm run dev` |
| Web only | `npm run dev:web` |
| API only | `npm run dev:api` |
| DB setup | `npm run db:setup` |
| Lint / typecheck / format (web) | `npm run lint:web`, `npm run typecheck:web`, `npm run format:web` |
| Web check (lint + typecheck) | `npm run check:web` |
| Web tests | `npm run test:web` |
| Web build | `npm run build:web` |
| API tests | `npm run test:api:prepare && npm run test:api` |

After completing a task, always run `npm run check:web` and `npm run format:web`.

Node **22** (`apps/web/.nvmrc`). Ruby **3.3.11** for the API. Root scripts use `scripts/with-ruby.sh` for Ruby resolution.

## Architecture

- **Frontend** (`apps/web`): React 18, Vite 6, TypeScript, Redux Toolkit, MUI 6. Dev server on port **8080**; proxies `/api` to Rails on **3000**.
- **Backend** (`apps/api`): Rails 7.2 API-only. Controllers under `app/controllers/api/`. Demo auth via `DemoAuthentication` concern when `DEMO_MODE=true`.
- **Production**: Vercel serves `apps/web`; `/api/*` rewrites to Fly.io (`apps/web/vercel.json`). API deploys from `apps/api`.

See `README.md` for env vars, deploy steps, and CI details.

## Code Layout (web)

```
apps/web/src/
  features/       # Feature modules (auth, dashboard, jobs) — slices, screens, hooks
  adapters/mui/   # MUI wrapper components — prefer these over raw MUI in features
  components/     # Shared, non-feature components
  app/            # Redux store and typed hooks
  tokens/         # Design tokens (CSS variables)
```

- Put new UI in `features/<area>/` and reuse `adapters/mui/` primitives.
- Redux state lives in feature slices (e.g. `features/dashboard/jobs/jobsSlice.ts`).
- API calls use axios with credentials (`axios.defaults.withCredentials = true` in `main.tsx`).

## Conventions

- TypeScript throughout the web app; match existing import style (ES modules).
- Keep changes scoped — do not refactor unrelated code.
- Env reference: `.env.example`. Frontend vars are `VITE_*`.
- Do not edit `apps/api/planning/` unless explicitly asked — planning notes only.
- Do not commit or push unless the user requests it.

## Testing

- Web: Vitest + Testing Library in `apps/web`. CI runs lint, typecheck, test, and build.
- API: Rails Minitest in `apps/api/test/`. Requires Postgres (`npm run db:up` locally on port **55432**).
