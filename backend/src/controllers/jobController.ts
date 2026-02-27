import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";

// GET /api/jobs — List all jobs (with search, category, location filters)
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, category, location, type } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
        { company: { contains: search as string, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { equals: category as string, mode: "insensitive" };
    }

    if (location) {
      where.location = { contains: location as string, mode: "insensitive" };
    }

    if (type) {
      where.type = { equals: type as string, mode: "insensitive" };
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    res.json({
      success: true,
      data: jobs,
      message: `Found ${jobs.length} jobs`,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs/:id — Get single job details
export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }

    res.json({
      success: true,
      data: job,
      message: "Job found",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/jobs — Create a new job (Admin)
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, company, location, category, type, description, salary, companyLogo, tags } =
      req.body;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        category,
        type: type || "Full-Time",
        description,
        salary: salary || null,
        companyLogo: companyLogo || null,
        tags: tags || [],
      },
    });

    res.status(201).json({
      success: true,
      data: job,
      message: "Job created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/jobs/:id — Delete a job (Admin)
export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }

    await prisma.job.delete({ where: { id } });

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
