# QuickHire API Documentation

This document outlines the REST API endpoints available in the QuickHire backend application. The API is built using Express.js and communicates with a PostgreSQL database via Prisma ORM.

## Base URL

All endpoints are relative to the base URL of your backend server. By default in local development, this is:
`http://localhost:5000/api`

## Authentication

Many endpoints are protected and require a JSON Web Token (JWT) to access. When a route denotes an **Auth Required** status, you must include the JWT in the `Authorization` header of your HTTP request.

**Header Format:**
`Authorization: Bearer <your_jwt_token>`

Roles used for authorization:

- `USER`: Regular job seeker.
- `EMPLOYER`: Company account allowed to post and manage jobs.
- `ADMIN`: Platform administrator capable of moderating all listings.

---

## 🔐 Authentication Endpoints

### 1. Register User

Creates a new account in the system and returns a JWT token.

- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Auth Required:** No
- **Payload:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "role": "USER" // Optional. Can be "USER" or "EMPLOYER". Defaults to "USER".
  }
  ```
- **Response Structure (201 Created):**
  - `success` (boolean)
  - `message` (string)
  - `data.user` (object: User details without password)
  - `data.token` (string: JWT Token)

### 2. Login User

Authenticates an existing user and returns a JWT token.

- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Auth Required:** No
- **Payload:**
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `message` (string)
  - `data.user` (object: User profile)
  - `data.token` (string: JWT Token)

### 3. Get Current User Profile

Retrieves the profile and related records (like applications) for the currently authenticated user.

- **Method:** `GET`
- **Endpoint:** `/auth/me`
- **Auth Required:** Yes (Any role)
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (object: User profile including nested relations)

---

## 💼 Jobs Endpoints

### 1. List Public Jobs

Retrieves all `APPROVED` jobs. Supports robust querying for search, filtering, and pagination.

- **Method:** `GET`
- **Endpoint:** `/jobs`
- **Auth Required:** No
- **Query Parameters:**
  - `search` (string): Keyword search against title, description, or company.
  - `category` (string): Exact match for job category.
  - `location` (string): Search by location.
  - `type` (string): Exact match for job type (e.g., "Full-Time").
  - `page` (number): Pagination page (default: 1).
  - `limit` (number): Jobs per page (default: 12).
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (array of Job objects)
  - `pagination` (object: page, limit, total, totalPages)

### 2. Get Single Job Details

Retrieves detailed information for a specific job ID.

- **Method:** `GET`
- **Endpoint:** `/jobs/:id`
- **Auth Required:** No
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (object: Job details including application count)

### 3. Get Employer Jobs

Retrieves all jobs created by the currently authenticated employer.

- **Method:** `GET`
- **Endpoint:** `/jobs/employer/me`
- **Auth Required:** Yes (`EMPLOYER` role)
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (array of Job objects)

### 4. Get Admin Moderation Jobs

Retrieves a complete list of all jobs in the database regardless of status for moderation.

- **Method:** `GET`
- **Endpoint:** `/jobs/admin/all`
- **Auth Required:** Yes (`ADMIN` role)
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (array of Job objects populated with postedBy details)

### 5. Create Job Listing

Creates a new job listing. State defaults to `PENDING` upon creation.

- **Method:** `POST`
- **Endpoint:** `/jobs`
- **Auth Required:** Yes (`ADMIN` or `EMPLOYER` role)
- **Payload:**
  ```json
  {
    "title": "Senior Frontend Developer",
    "company": "Tech Innovators",
    "location": "Remote",
    "category": "Engineering",
    "type": "Full-Time",
    "description": "Extensive details about the role...",
    "salary": "$120k - $140k", // Optional
    "companyLogo": "https://...", // Optional
    "tags": ["React", "TypeScript"] // Optional array
  }
  ```
- **Response Structure (201 Created):**
  - `success` (boolean)
  - `data` (object: Created Job record)

### 6. Update Job Status

Allows administrators to approve or reject a submitted job listing.

- **Method:** `PATCH`
- **Endpoint:** `/jobs/:id/status`
- **Auth Required:** Yes (`ADMIN` role)
- **Payload:**
  ```json
  {
    "status": "APPROVED" // Can be "PENDING", "APPROVED", or "REJECTED"
  }
  ```
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `message` (string)
  - `data` (object: Updated Job record)

### 7. Delete Job Listing

Permanently destroys a job record. Handled with cascade deletion for associated applications.

- **Method:** `DELETE`
- **Endpoint:** `/jobs/:id`
- **Auth Required:** Yes (`ADMIN` role)
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `message` (string)

---

## 📝 Applications Endpoints

### 1. Submit Application

Submits a job application for a specific role.

- **Method:** `POST`
- **Endpoint:** `/applications`
- **Auth Required:** Yes (`USER` role)
- **Payload:**
  ```json
  {
    "jobId": "uuid-of-job",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "resumeLink": "https://linkedin.com/in/janedoe",
    "coverNote": "I am passionate about building great products..."
  }
  ```
- **Response Structure (201 Created):**
  - `success` (boolean)
  - `data` (object: Created Application record)

### 2. Get Employer Applications

Retrieves the list of cross-job applications submitted to the currently logged-in employer's job posts.

- **Method:** `GET`
- **Endpoint:** `/applications/employer/me`
- **Auth Required:** Yes (`EMPLOYER` role)
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (array of Application objects including core Job details)

### 3. Get All Applications (Admin Overview)

Retrieves a global list of all applications. Supports filtering by a specific `jobId`.

- **Method:** `GET`
- **Endpoint:** `/applications`
- **Auth Required:** Yes (`ADMIN` role)
- **Query Parameters:**
  - `jobId` (string, optional): Fetch applications only for a specific job.
- **Response Structure (200 OK):**
  - `success` (boolean)
  - `data` (array of Application objects)
