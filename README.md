# Project Whisper Dev

This repository is now organized as a MERN-style application with a Vite + React frontend and an Express + MongoDB backend.

## Project Layout

- `frontend/` — Vite React + TypeScript application
- `backend/` — Express API server with Mongoose models

## Local Setup

1. Install frontend dependencies:

```bash
npm run install:frontend
```

2. Install backend dependencies:

```bash
npm run install:backend
```

3. Create a local backend environment file using the example:

```bash
copy backend\.env.example backend\.env
```

4. Start the backend server:

```bash
npm run dev:backend
```

5. Start the frontend app:

```bash
npm run dev:frontend
```

The frontend dev server runs on `http://localhost:8080` and proxies `/api` requests to `http://localhost:5000`.

## Backend API Routes

- `GET /api/patients`
- `GET /api/patients/:id`
- `POST /api/patients`
- `PUT /api/patients/:id`
- `DELETE /api/patients/:id`

- `GET /api/visits`
- `GET /api/visits/:id`
- `POST /api/visits`
- `PUT /api/visits/:id`
- `DELETE /api/visits/:id`

- `GET /api/vaccinations`
- `GET /api/vaccinations/:id`
- `POST /api/vaccinations`
- `PUT /api/vaccinations/:id`
- `DELETE /api/vaccinations/:id`

- `GET /api/anc-records`
- `GET /api/anc-records/:id`
- `POST /api/anc-records`
- `PUT /api/anc-records/:id`
- `DELETE /api/anc-records/:id`

## Notes

- The frontend communicates with the backend through the `/api` proxy configured in `frontend/vite.config.ts`.
- MongoDB must be available locally or via the `MONGODB_URI` in `backend/.env`.
