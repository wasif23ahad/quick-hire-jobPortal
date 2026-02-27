import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";

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

    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        resumeLink,
        coverNote,
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
