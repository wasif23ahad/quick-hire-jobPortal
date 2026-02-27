import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "QuickHire API is running" });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
