# Trakr Web

React 18 + Vite frontend for Trakr. See the repository root `README.md` for full monorepo setup and deployment instructions.

## Tech Stack

- React 18
- Vite 6
- TypeScript (scaffold; app sources are migrating from JSX)
- Redux Toolkit
- Material UI v4 (MUI 6 migration planned)

## Setup

```sh
npm install
```

`.npmrc` sets `legacy-peer-deps=true` because Material UI v4 does not declare React 18 peer support yet.

Copy environment variables from the repo root `.env.example` into `.env.local`:

```sh
VITE_DEMO_MODE=true
VITE_GOOGLE_API_KEY=api-key-here
```

## Development

From this directory:

```sh
npm run dev
```

Opens at http://localhost:8080 and proxies `/api` to the local Rails server at http://localhost:3000.

From the repository root:

```sh
npm run dev
```

## Commands

```sh
npm run dev        # Vite dev server
npm run build      # Production build to dist/
npm run typecheck  # TypeScript check
npm run preview    # Preview production build
```
