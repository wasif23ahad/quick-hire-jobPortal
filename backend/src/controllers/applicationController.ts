import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "quickhire-secret-key-2024";

// POST /api/applications — Submit a job application
export const submitApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    // Check if the job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found. Cannot submit application.",
      });
      return;
    }

    // Try to extract userId from auth token if present
    let userId: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        userId = decoded.id;
      } catch {
        // Token invalid — proceed without userId
      }
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        resumeLink,
        coverNote,
        ...(userId ? { userId } : {}),
      },
    });

    res.status(201).json({
      success: true,
      data: application,
      message: "Application submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications — List all applications (Admin)
export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.query;

    const where: any = {};

    if (jobId) {
      where.jobId = jobId as string;
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: applications,
      message: `Found ${applications.length} applications`,
    });
  } catch (error) {
    next(error);
  }
};
