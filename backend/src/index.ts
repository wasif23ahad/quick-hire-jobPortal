import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      process.env.FRONTEND_URL,
      `${process.env.FRONTEND_URL}/`,
      "http://localhost:3000",
      "https://quick-hire-job-portal-frontend.vercel.app",
      "https://quick-hire-job-portal-frontend.vercel.app/"
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 QuickHire Backend API is running!",
    endpoints: {
      health: "/api/health",
      jobs: "/api/jobs",
      applications: "/api/applications",
    },
  });
});

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
