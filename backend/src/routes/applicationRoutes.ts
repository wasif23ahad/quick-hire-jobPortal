import { Router } from "express";
import {
  submitApplication,
  getAllApplications,
} from "../controllers/applicationController";
import { validateApplication } from "../middleware/validation";

const router = Router();

// POST /api/applications - Submit a job application
router.post("/", validateApplication, submitApplication);

// GET /api/applications - List applications (Admin)
router.get("/", getAllApplications);

export default router;
