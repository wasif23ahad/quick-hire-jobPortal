import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controllers/jobController";
import { validateCreateJob } from "../middleware/validation";

const router = Router();

// GET /api/jobs - List all jobs (with search, category, location filters)
router.get("/", getAllJobs);

// GET /api/jobs/:id - Get single job details
router.get("/:id", getJobById);

// POST /api/jobs - Create a new job (Admin)
router.post("/", validateCreateJob, createJob);

// DELETE /api/jobs/:id - Delete a job (Admin)
router.delete("/:id", deleteJob);

export default router;
