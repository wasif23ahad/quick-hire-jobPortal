import { Router } from "express";
import {
  submitApplication,
  getAllApplications,
  getEmployerApplications,
} from "../controllers/applicationController";
import { validateApplication } from "../middleware/validation";
import { protect, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

// POST /api/applications - Submit a job application
router.post("/", validateApplication, submitApplication);

// GET /api/applications - List applications (Admin)
router.get("/", protect, authorizeRoles("ADMIN"), getAllApplications);

// GET /api/applications/employer/me - Get applications for employer jobs
router.get("/employer/me", protect, authorizeRoles("EMPLOYER"), getEmployerApplications);

export default router;
