# Trakr Backend

Rails 7.2 API for the Trakr job application tracker. See the repository root `README.md` for full monorepo setup and deployment instructions.

## Prerequisites

- Ruby 3.3 (`brew install ruby@3.3`)
- PostgreSQL (`brew install postgresql@14` and `brew services start postgresql@14`)

Add Ruby to your shell (once):

```sh
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Setup

```sh
bundle install
bin/rails db:create db:schema:load
```

Seed demo data (portfolio preview with sample jobs):

```sh
bin/rails db:seed
```

Demo login is enabled when `DEMO_MODE=true` (default in development). Visitors are signed in as the seeded demo user automatically.

## Run

```sh
bin/rails server
```

API runs at **http://localhost:3000** (e.g. `GET /api/logged_in`).

## Frontend

In the repository root, start both apps with `npm run dev`. The React app proxies `/api` to this server via `apps/web/src/setupProxy.js`.
