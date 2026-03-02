# QuickHire — Full-Stack Job Board Application

A modern, comprehensive, and responsive job board application built with **Next.js 15**, **Express.js**, and **PostgreSQL** for the Qtec Solution Limited technical assessment.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-4.x-green?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

## 🌐 Live Demo & Access

- [**Frontend Live Link**](https://quick-hire-job-portal-frontend.vercel.app/)
- [**Backend Live Link**](https://quick-hire-job-portal-seven.vercel.app/)
- [**Live Demo Link**](https://www.loom.com/share/e01d621b55384142b87c2bf3a0d7d3cf/)
Note: Watch the Demo video in 1.5x for better experience
### Admin Access Credentials

To access the Admin Moderation Dashboard (Bulk Approvals/Rejections, Job Deletion):

- **URL:** `/admin/login`
- **Email:** `admin@quickhire.com`
- **Password:** `admin12345`

---

## 🚀 Quick Start (Local Setup)

If you wish to run the project locally, please jump to the **[Getting Started - Local Setup](#-getting-started)** section below for step-by-step instructions.

---

## ✨ Core Features

### Job Seekers

- **Browse 1000+ Jobs** — Paginated listing with 12 jobs per page.
- **Advanced Search & Filter** — Filter by job title, company, category, location, and job type.
- **Detailed Job Pages** — Full descriptions and dynamic tags for each job.
- **Apply to Jobs** — Submit job applications with a name, email, resume link, and cover note.
- **User Dashboard** — Track and view applied jobs and your account information.

### Admin Panel

- **Add New Jobs** — Create listings complete with title, company, location, category, description, salary, and tags.
- **Delete Jobs** — Remove listings. Features cascade deletion of associated applications.
- **Application Overview** — See who applied to each specific job.

### Authentication & Security

- **Secure Registration / Login** — JWT-based authentication with robust bcrypt password hashing.
- **Protected Routes** — User dashboard and admin routes require relevant authentication.
- **Data Validation** — Comprehensive input validation using `express-validator` to ensure data integrity across endpoints.

### UI/UX & Responsive Design

- **Figma-Faithful Design** — Pixel-accurate implementation of the provided UI template.
- **Fully Responsive** — Beautifully scales across mobile (375px), tablet, and desktop viewports utilizing Tailwind CSS flexbox and grid modules. Mobile view features an intuitive hamburger menu and properly stacking layouts.
- **Micro-Interactions** — Dynamic card hover effects with scaling, shadow elevation, and interactive gradient accent effects.
- **Dynamic Assets** — Branded company initials automatically generated via the ui-avatars.com API.
- **User Feedback** — Integrated loading states (spinners) during data fetching and toast notifications for success/error alerts.

---

## 🛠️ Tech Stack & Architecture

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| **Frontend**   | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **Backend**    | Express.js, TypeScript, REST APIs                 |
| **Database**   | PostgreSQL (Neon Serverless DB)                   |
| **ORM**        | Prisma                                            |
| **Auth**       | JSON Web Tokens (JWT) + bcryptjs                  |
| **Validation** | express-validator                                 |
| **Fonts**      | Clash Display (headings), Epilogue (body text)    |

---

## 🚀 Getting Started

Follow these detailed instructions to run the application locally.

### Prerequisites

- **Node.js** v18+ (Recommended: v20+)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (Local instance or a free [Neon](https://neon.tech) cloud account)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup

The backend serves the REST API and connects to the PostgreSQL database.

```bash
cd backend
npm install
```

**Environment Variables (`backend/.env`)**

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Your PostgreSQL connection string. Ensure it includes the database name.
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Secret key used for signing JWT tokens. Use a strong, random string.
JWT_SECRET="your-super-strong-secret-key-here"

# Port for the Express server to run on (Optional, defaults to 5000)
PORT=5000
```

**Database Migration & Seeding**

Deploy the schema using Prisma and seed the database with initial job data:

```bash
# Apply schema to the database
npx prisma migrate dev --name init

# Seed the database with 1000 sample jobs
npx prisma db seed

# Start the development server
npm run dev
```

The backend API will start at `http://localhost:5000`.

### 3. Frontend Setup

The frontend is a Next.js application that communicates with the backend API.

```bash
cd ../frontend
npm install
```

**Environment Variables (`frontend/.env.local`)**

Create a `.env.local` file in the `frontend/` directory connecting it to the backend:

```env
# The base URL for the backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Start the Next.js Server**

```bash
npm run dev
```

The frontend will start at `http://localhost:3000`. Open this URL in your browser to view the application!

---

## 💻 Usage & Demo Flow

1. **Explore Jobs:** Visit the homepage to see "Featured" and "Latest" jobs.
2. **Search:** Go to the `/jobs` page and try searching by keyword or filtering by category (e.g., Design, Marketing).
3. **View Details:** Click on a job to view its detailed description and tags.
4. **Sign Up / Login:** Create an account to be able to submit applications and view your personal dashboard.
5. **Apply:** Once logged in, use the "Apply Now" form.
6. **Admin Panel:** Visit `/admin` (or `/admin/create`) to add a new job listing to the database.

---

## 🔌 API Endpoints Summary

For complete, detailed instructions on how to use all the available endpoints including payloads, queries, and authentication mechanisms, please see the **[Full API Documentation](./API_Documents.md)**.

### Quick Reference

### Jobs & Applications

| Method   | Endpoint            | Description                                      |
| -------- | ------------------- | ------------------------------------------------ |
| `GET`    | `/api/jobs`         | Fetch jobs (supports search, filter, pagination) |
| `GET`    | `/api/jobs/:id`     | Fetch comprehensive details of a single job      |
| `POST`   | `/api/jobs`         | Create a new job listing                         |
| `DELETE` | `/api/jobs/:id`     | Delete a job listing (cascades to applications)  |
| `POST`   | `/api/applications` | Submit a job application                         |

### Authentication

| Method | Endpoint             | Description                                |
| ------ | -------------------- | ------------------------------------------ |
| `POST` | `/api/auth/register` | Register a new user account                |
| `POST` | `/api/auth/login`    | Authenticate an existing user              |
| `GET`  | `/api/auth/me`       | Fetch the logged-in user's profile profile |

---

## 🗄️ Database Architecture

The application utilizes a relational database mapped via Prisma with the following core entities:

```
User (id, name, email, password, role, created_at)
  │
  └── Application[] (1:N Relationship)

Job (id, title, company, location, category, type, description, salary, company_logo, tags, created_at, updated_at)
  │
  └── Application[] (1:N Relationship)

Application (id, job_id, user_id, name, email, resume_link, cover_note, created_at)
```

---

## 👨‍💻 Author

**Mohammad Wasif Ahad**

- **GitHub:** [wasif23ahad](https://github.com/wasif23ahad)
- **LinkedIn:** [Mohammad Wasif Ahad](https://www.linkedin.com/in/wasifahad/)

---

> This project was developed as a technical assessment for **Qtec Solution Limited**.
