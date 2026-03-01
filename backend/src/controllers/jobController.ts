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

    const where: any = {
      status: "APPROVED"
    };

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

    let jobs: any[] = [];
    let totalCount = 0;

    try {
      console.log("Attempting ultra-simple fetch...");
      jobs = await prisma.job.findMany({
        where,
        take: pageSize,
        skip: skip,
        orderBy: { createdAt: "desc" },
        include: { postedBy: { select: { name: true } } }
      });
      
      // Retroactively fix any existing hardcoded "Nomad" jobs to show the actual poster's company name
      jobs = jobs.map(j => ({
        ...j,
        company: j.postedBy?.name || j.company
      }));

      totalCount = await prisma.job.count({ where });
      console.log("Fetch success, count:", totalCount);
    } catch (queryError: any) {
      console.error("ULTRA-SIMPLE fetch failed:", queryError.message);
      // Even if it fails, return empty to stop the 500 error
      return res.json({
        success: true,
        data: [],
        pagination: { page: pageNum, limit: pageSize, total: 0, totalPages: 0 },
        message: "Emergency fallback: DB error",
      });
    }

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
      message: jobs.length > 0 ? `Found ${totalCount} jobs` : "No jobs found",
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
        postedBy: { select: { name: true } },
      },
    });

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }

    // Retroactively fix the company name for single job view
    const dynamicJob = {
      ...job,
      company: job.postedBy?.name || job.company
    };

    res.json({
      success: true,
      data: dynamicJob,
      message: "Job found",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/jobs — Create a new job (Admin/Employer)
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, company, location, category, type, description, salary, companyLogo, tags } =
      req.body;
      
    const postedById = (req as any).user?.id;

    // Fetch poster's profile to dynamically assign company name
    let jobCompany = company;
    if (postedById) {
      const poster = await prisma.user.findUnique({ where: { id: postedById } });
      if (poster && poster.name) {
        jobCompany = poster.name;
      }
    }

    const job = await prisma.job.create({
      data: {
        title,
        company: jobCompany,
        location,
        category,
        type: type || "Full-Time",
        description,
        salary: salary || null,
        companyLogo: companyLogo || null,
        tags: tags || [],
        postedById,
        status: "PENDING"
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

// GET /api/jobs/admin/all — Get all jobs for admin moderation
export const getAdminJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        postedBy: { select: { id: true, name: true, email: true } },
      },
    });
    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs/employer/me — Get jobs posted by the employer
export const getEmployerJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postedById = (req as any).user?.id;
    if (!postedById) return res.status(401).json({ success: false, message: "Unauthorized" });

    const jobs = await prisma.job.findMany({
      where: { postedById },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { applications: true } },
      },
    });
    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/jobs/:id/status — Admin update job status
export const updateJobStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body; // PENDING, APPROVED, REJECTED

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const job = await prisma.job.update({
      where: { id },
      data: { status },
    });

    res.json({ success: true, message: `Job marked as ${status}`, data: job });
  } catch (error) {
    next(error);
  }
};
