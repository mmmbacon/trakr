# Trakr

Trakr is a full-stack job application tracker. This repository is now a monorepo with a React frontend, a Rails API, and deployment config for Vercel + Fly.io.

## Apps

- `apps/web` - React + Redux frontend, served by Vercel in production.
- `apps/api` - Ruby on Rails API, served by Fly.io in production.
- `docker-compose.yml` - Local PostgreSQL for development.

## Prerequisites

- Node.js and npm
- Ruby 3.3.11
- Bundler
- Docker Desktop
- Fly CLI for production API deploys

## Local Setup

Install frontend dependencies:

```sh
cd apps/web
npm install
```

Install backend dependencies:

```sh
cd apps/api
bundle install
```

Start PostgreSQL and load the schema/demo data:

```sh
npm run db:setup
```

Run both apps from the repository root:

```sh
npm run dev
```

The frontend opens at http://localhost:8080. It proxies `/api` requests to the Rails API at http://localhost:3000 through `apps/web/src/setupProxy.js`. The root npm scripts explicitly prefer Homebrew Ruby at `/opt/homebrew/opt/ruby@3.3/bin` so they work from a fresh macOS shell.

`Procfile.dev` is also available if you prefer Foreman or Overmind, but `npm run dev` uses the npm-managed `concurrently` package by default.

## Useful Commands

```sh
npm run dev       # Start React and Rails together
npm run dev:web   # Start only the React app
npm run dev:api   # Start only the Rails API
npm run db:up     # Start local PostgreSQL
npm run db:setup  # Start DB, load schema, and seed demo data
```

## Environment Variables

Use `.env.example` as the source of truth for local and hosted environment variables.

Frontend values belong in `apps/web/.env.local` locally and in Vercel for production:

- `REACT_APP_GOOGLE_API_KEY`
- `REACT_APP_DEMO_MODE=true`

Backend local values can be exported in your shell if you need to override the Docker defaults:

- `DB_HOST=127.0.0.1`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `DB_PORT=55432`
- `DEMO_MODE=true`
- `DEMO_USER_EMAIL=beetman@shrutefarms.com`

Backend production values should be set as Fly.io secrets:

- `DATABASE_URL` (created by `fly postgres attach`)
- `RAILS_MASTER_KEY`
- `SECRET_KEY_BASE`
- `DEMO_MODE=true`
- `DEMO_USER_EMAIL=beetman@shrutefarms.com`

## Production Deploy

### API: Fly.io + Fly Postgres

From `apps/api`:

```sh
fly launch --no-deploy
fly postgres create --name trakr-db
fly postgres attach trakr-db
fly secrets set RAILS_MASTER_KEY=... SECRET_KEY_BASE=... DEMO_MODE=true DEMO_USER_EMAIL=beetman@shrutefarms.com
fly deploy
fly ssh console -C "bin/rails db:seed"
```

The included `apps/api/fly.toml` assumes an app named `trakr-api` in the `sea` region. If `fly launch` creates a different app name, update `apps/api/fly.toml` and the Vercel rewrite destination in `apps/web/vercel.json`.

### Frontend: Vercel

Create a Vercel project from this repository with:

- Root Directory: `apps/web`
- Build Command: `npm run build`
- Output Directory: `build`
- Framework: Create React App

Set Vercel environment variables for the frontend, then deploy. Vercel rewrites `/api/*` to the Fly API via `apps/web/vercel.json`, so browser requests stay same-origin.
