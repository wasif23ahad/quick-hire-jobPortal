import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";

// GET /api/jobs — List all jobs (with search, category, location, type filters + pagination)
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, category, location, type, page, limit } = req.query;

    // Helper to extract a single string from query params (which can be string | string[] | ParsedQs etc.)
    const getQueryString = (param: any): string | undefined => {
      if (!param) return undefined;
      return Array.isArray(param) ? (param[0] as string) : (param as string);
    };

    const searchQuery = getQueryString(search);
    const categoryQuery = getQueryString(category);
    const locationQuery = getQueryString(location);
    const typeQuery = getQueryString(type);

    const where: any = {};

    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
        { company: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    if (categoryQuery) {
      where.category = { equals: categoryQuery, mode: "insensitive" };
    }

    if (locationQuery) {
      where.location = { contains: locationQuery, mode: "insensitive" };
    }

    if (typeQuery) {
      where.type = { equals: typeQuery, mode: "insensitive" };
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(getQueryString(page) || "1"));
    const pageSize = Math.min(100, Math.max(1, parseInt(getQueryString(limit) || "12")));
    const skip = (pageNum - 1) * pageSize;

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { applications: true },
          },
        },
        skip,
        take: pageSize,
      }),
      prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: pageNum,
        limit: pageSize,
        total: totalCount,
        totalPages,
      },
      message: `Found ${totalCount} jobs (showing page ${pageNum} of ${totalPages})`,
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
    const id = req.params.id as string;

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
    const id = req.params.id as string;

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
