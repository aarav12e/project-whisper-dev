# Project Whisper Dev

This repository is now organized as a MERN-style application with a Vite + React frontend and an Express + MongoDB backend.

## Project Layout

- `frontend/` - Vite React + TypeScript application with GSAP animations, React Hot Toast, Material-UI, and theme switching
- `backend/` - Express API server with Mongoose models

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier available)

## Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (free tier)
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Update `backend/.env` with your MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/project-whisper-dev?retryWrites=true&w=majority
```

## Local Setup

1. Install frontend dependencies:

```bash
npm run install:frontend
```

2. Install backend dependencies:

```bash
npm run install:backend
```

3. Start the backend server:

```bash
npm run dev:backend
```

4. Start the frontend app:

```bash
npm run dev:frontend
```

The frontend dev server runs on `http://localhost:8081` and proxies `/api` requests to `http://localhost:5000`.

## Features

### Frontend
- **Animations**: GSAP-powered smooth transitions and entrance effects
- **Notifications**: React Hot Toast for user feedback
- **UI Components**: Material-UI integration alongside shadcn/ui
- **Themes**: Light, dark, and system theme switching
- **Responsive**: Mobile-first design with bottom navigation
- **PWA**: Progressive Web App with offline capabilities

### Backend
- **REST API**: Full CRUD operations for patients, visits, vaccinations, and ANC records
- **MongoDB**: Document-based data storage with Mongoose ODM
- **TypeScript**: Type-safe backend development
- **CORS**: Cross-origin resource sharing enabled

## Backend API Routes

### Patients
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Visits
- `GET /api/visits` - List all visits
- `GET /api/visits/:id` - Get visit by ID
- `POST /api/visits` - Create new visit
- `PUT /api/visits/:id` - Update visit
- `DELETE /api/visits/:id` - Delete visit

### Vaccinations
- `GET /api/vaccinations` - List all vaccinations
- `GET /api/vaccinations/:id` - Get vaccination by ID
- `POST /api/vaccinations` - Create new vaccination
- `PUT /api/vaccinations/:id` - Update vaccination
- `DELETE /api/vaccinations/:id` - Delete vaccination

### ANC Records
- `GET /api/anc-records` - List all ANC records
- `GET /api/anc-records/:id` - Get ANC record by ID
- `POST /api/anc-records` - Create new ANC record
- `PUT /api/anc-records/:id` - Update ANC record
- `DELETE /api/anc-records/:id` - Delete ANC record

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
