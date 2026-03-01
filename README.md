# QuickHire — Full-Stack Job Board

A premium, pixel-perfect job board application built with Next.js, Express, and PostgreSQL.

## 🚀 Features

- **1:1 Figma Implementation:** Meticulously crafted landing page using fixed 1440px width and absolute positioning for pixel-perfect fidelity.
- **Job Search & Filters:** Search by title, category, and location with responsive UI.
- **Job Details & Applications:** Full job descriptions and a seamless application submission flow.
- **Admin Panel:** Comprehensive dashboard for recruiters to post new jobs and manage existing listings.
- **Modern Tech Stack:**
  - **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
  - **Backend:** Express.js, TypeScript, Prisma ORM.
  - **Database:** PostgreSQL (Neon).

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (or Neon account)

### 1. Backend Setup

```bash
cd backend
npm install
# Configure .env with your DATABASE_URL
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
# Configure .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

## 📐 Design System

- **Typography:** Clash Display (Headings), Epilogue (Body), Inter, Red Hat Display.
- **Colors:**
  - Brand Indigo: `#4640DE`
  - Accent Blue: `#26A4FF`
  - Dark Navy: `#202430`
  - Neutral BG: `#F8F8FD`

## 📂 Project Structure

```
project/
├── frontend/          # Next.js Application
│   ├── src/app/       # Routes and Pages
│   ├── src/components/# UI and Layout Components
│   └── src/lib/api.ts # API Client
└── backend/           # Express Server
    ├── src/routes/    # API Boundary
    ├── src/controllers/# Business Logic
    └── prisma/        # Database Schema & Seed
```

## 📄 License

This project is part of a technical assessment for Qtec Solution Limited.
