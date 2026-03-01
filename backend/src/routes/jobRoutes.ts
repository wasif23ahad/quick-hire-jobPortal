import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
  getAdminJobs,
  getEmployerJobs,
  updateJobStatus
} from "../controllers/jobController";
import { validateCreateJob } from "../middleware/validation";
import { protect, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

// GET /api/jobs - List all APPROVED public jobs
router.get("/", getAllJobs);

// GET /api/jobs/admin/all - Get all jobs (Admin)
router.get("/admin/all", protect, authorizeRoles("ADMIN"), getAdminJobs);

// GET /api/jobs/employer/me - Get jobs posted by the employer
router.get("/employer/me", protect, authorizeRoles("EMPLOYER"), getEmployerJobs);

// GET /api/jobs/:id - Get single job details
router.get("/:id", getJobById);

// POST /api/jobs - Create a new job (Admin/Employer)
router.post("/", protect, authorizeRoles("ADMIN", "EMPLOYER"), validateCreateJob, createJob);

// PATCH /api/jobs/:id/status - Update job status (Admin)
router.patch("/:id/status", protect, authorizeRoles("ADMIN"), updateJobStatus);

// DELETE /api/jobs/:id - Delete a job (Admin)
router.delete("/:id", protect, authorizeRoles("ADMIN"), deleteJob);

export default router;
