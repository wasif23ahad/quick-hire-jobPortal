import { Router } from "express";

const router = Router();

// POST /api/applications - Submit a job application
router.post("/", (_req, res) => {
  res.status(201).json({ success: true, data: null, message: "Application submitted" });
});

// GET /api/applications - List applications (Admin)
router.get("/", (_req, res) => {
  res.json({ success: true, data: [], message: "Applications list" });
});

export default router;
