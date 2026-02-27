import { Router } from "express";

const router = Router();

// GET /api/jobs - List all jobs (with search, category, location filters)
router.get("/", (_req, res) => {
  res.json({ success: true, data: [], message: "Jobs list" });
});

// GET /api/jobs/:id - Get single job details
router.get("/:id", (req, res) => {
  res.json({ success: true, data: null, message: `Job ${req.params.id}` });
});

// POST /api/jobs - Create a new job (Admin)
router.post("/", (_req, res) => {
  res.status(201).json({ success: true, data: null, message: "Job created" });
});

// DELETE /api/jobs/:id - Delete a job (Admin)
router.delete("/:id", (req, res) => {
  res.json({ success: true, message: `Job ${req.params.id} deleted` });
});

export default router;
