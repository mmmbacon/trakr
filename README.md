# Trakr
Trakr is a full-stack app that helps track your stage in the application process, so you have all your applications easily accessible in one place.

To see the deployed version of Trakr, visit https://nostalgic-kalam-c12902.netlify.app/

## Final Product
![“trakr dashboard”](https://github.com/courtamos/final-frontend/blob/master/docs/trakr_dashboard.png?raw=true)
![“trakr job modal”](https://github.com/courtamos/final-frontend/blob/master/docs/trakr_job_modal.png?raw=true)
![“trakr search feature”](https://github.com/courtamos/final-frontend/blob/master/docs/trakr_search.png?raw=true)

## Tech Stack
- PostgreSQL
- Ruby on Rails
- ReactJS
- Redux

## Setup

### Backend (Rails API)

See [trakr-backend](../trakr-backend/README.md). Requires Ruby 3.3 and PostgreSQL.

```sh
cd ../trakr-backend
bundle install
bin/rails db:create db:schema:load
bin/rails server
```

Runs at http://localhost:3000

### Frontend

```sh
npm install
```

## Running Development Server

Start the backend first, then:

```sh
npm start
```

Opens at http://localhost:8080 and proxies `/api` to the local Rails server.