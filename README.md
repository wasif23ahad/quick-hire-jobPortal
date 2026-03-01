# QuickHire — Full-Stack Job Board Application

A modern, responsive job board application built with **Next.js 15**, **Express.js**, and **PostgreSQL** for the Qtec Solution Limited technical assessment.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-4.x-green?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

## ✨ Features

### Job Seekers

- **Browse 1000+ Jobs** — Paginated listing with 12 jobs per page
- **Search & Filter** — By job title, company, category, location, and job type
- **Job Details** — Full descriptions with Apply Now form
- **Apply to Jobs** — Submit name, email, resume link, and cover note
- **User Dashboard** — Track applied jobs

### Admin Panel

- **Add New Jobs** — Create listings with title, company, location, category, description, salary, and tags
- **Delete Jobs** — Remove listings with cascade delete of applications
- **View Applications** — See who applied to each job

### Authentication

- **Sign Up / Login** — JWT-based authentication with bcrypt password hashing
- **Protected Routes** — Dashboard requires authentication
- **Auth-aware Navbar** — Dynamically shows user state

### UI/UX

- **Figma-faithful Design** — Pixel-accurate implementation of the provided template
- **Fully Responsive** — Mobile, tablet, and desktop layouts
- **Hover Animations** — Dynamic card interactions with scale, shadow, and accent effects
- **Company Logos** — Branded initials via ui-avatars.com API
- **Loading States** — Spinner feedback during form submissions
- **Toast Notifications** — Success/error feedback on actions

---

## 🛠️ Tech Stack

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| **Frontend**   | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **Backend**    | Express.js, TypeScript                            |
| **Database**   | PostgreSQL (Neon serverless)                      |
| **ORM**        | Prisma                                            |
| **Auth**       | JWT + bcryptjs                                    |
| **Validation** | express-validator                                 |
| **Fonts**      | Clash Display, Epilogue (custom loaded)           |

---

## 📂 Project Structure

```
project/
├── frontend/                    # Next.js Application
│   ├── src/
│   │   ├── app/                 # Routes (pages)
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── jobs/            # Job listings + detail pages
│   │   │   ├── login/           # Login page
│   │   │   ├── signup/          # Sign up page
│   │   │   ├── dashboard/       # User dashboard
│   │   │   └── admin/           # Admin panel
│   │   ├── components/          # Reusable UI components
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── jobs/            # JobCard, FeaturedJobs, LatestJobs, etc.
│   │   │   ├── admin/           # CreateJobForm, JobTable
│   │   │   └── ui/              # Badge, Button, Input, Toast
│   │   └── lib/
│   │       └── api.ts           # API client functions
│   └── tailwind.config.ts       # Tailwind config with design tokens
│
└── backend/                     # Express Server
    ├── src/
    │   ├── index.ts             # Server entry point
    │   ├── config/database.ts   # Prisma client singleton
    │   ├── controllers/         # Business logic
    │   │   ├── jobController.ts
    │   │   ├── applicationController.ts
    │   │   └── authController.ts
    │   ├── routes/              # API route definitions
    │   │   ├── jobRoutes.ts
    │   │   ├── applicationRoutes.ts
    │   │   └── authRoutes.ts
    │   └── middleware/
    │       └── validation.ts    # express-validator rules
    └── prisma/
        ├── schema.prisma        # Database schema
        └── seed.ts              # 1000-job seed script
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (recommended: v20+)
- **PostgreSQL** database (or free [Neon](https://neon.tech) account)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

Run migrations and seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

The backend will start at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will start at `http://localhost:3000`.

---

## 🔌 API Endpoints

### Jobs

| Method   | Endpoint        | Description                                 |
| -------- | --------------- | ------------------------------------------- |
| `GET`    | `/api/jobs`     | List jobs (with search, filter, pagination) |
| `GET`    | `/api/jobs/:id` | Get single job details                      |
| `POST`   | `/api/jobs`     | Create a new job (admin)                    |
| `DELETE` | `/api/jobs/:id` | Delete a job (admin)                        |

**Query Parameters** for `GET /api/jobs`:

- `search` — Search by title, company, or description
- `category` — Filter by category (e.g., Technology, Design)
- `location` — Filter by location
- `type` — Filter by job type (Full-Time, Part-Time, etc.)
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 12, max: 100)

### Applications

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| `POST` | `/api/applications` | Submit a job application |

### Authentication

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| `POST` | `/api/auth/register` | Create a new account                    |
| `POST` | `/api/auth/login`    | Log in                                  |
| `GET`  | `/api/auth/me`       | Get current user profile + applications |

---

## 🗄️ Database Models

```
User (id, name, email, password, role, created_at)
  │
  └── Application[] (one-to-many)

Job (id, title, company, location, category, type, description, salary, company_logo, tags, created_at, updated_at)
  │
  └── Application[] (one-to-many)

Application (id, job_id, user_id, name, email, resume_link, cover_note, created_at)
```

---

## 🌍 Environment Variables

| Variable              | Location              | Description                  |
| --------------------- | --------------------- | ---------------------------- |
| `DATABASE_URL`        | Backend `.env`        | PostgreSQL connection string |
| `JWT_SECRET`          | Backend `.env`        | Secret key for JWT signing   |
| `PORT`                | Backend `.env`        | Server port (default: 5000)  |
| `NEXT_PUBLIC_API_URL` | Frontend `.env.local` | Backend API base URL         |

---

## ✅ Validation

All endpoints implement comprehensive validation:

- **Jobs**: Title, company, location, category, description required
- **Applications**: Name (2+ chars), valid email, valid resume URL, cover note (10+ chars)
- **Auth**: Valid email, password (6+ chars), name (2+ chars)

---

## 📐 Design System

- **Typography:** Clash Display (headings), Epilogue (body)
- **Colors:**
  - Brand Indigo: `#4640DE`
  - Accent Blue: `#26A4FF`
  - Dark Navy: `#202430`
  - Neutral BG: `#F8F8FD`

---

## 📄 License

This project is part of a technical assessment for Qtec Solution Limited.
