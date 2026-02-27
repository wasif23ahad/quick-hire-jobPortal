import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware to handle validation errors
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: (err as any).path,
        message: err.msg,
      })),
    });
    return;
  }

  next();
};

// Validation rules for creating a job
export const validateCreateJob = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required"),
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required"),
  body("type")
    .optional()
    .isIn(["Full-Time", "Part-Time", "Remote", "Internship", "Contract"])
    .withMessage("Type must be one of: Full-Time, Part-Time, Remote, Internship, Contract"),
  body("salary")
    .optional(),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  handleValidationErrors,
];

// Validation rules for submitting an application
export const validateApplication = [
  body("jobId")
    .trim()
    .notEmpty()
    .withMessage("Job ID is required")
    .isUUID()
    .withMessage("Job ID must be a valid UUID"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("resumeLink")
    .trim()
    .notEmpty()
    .withMessage("Resume link is required")
    .isURL()
    .withMessage("Resume link must be a valid URL"),
  body("coverNote")
    .trim()
    .notEmpty()
    .withMessage("Cover note is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Cover note must be between 10 and 2000 characters"),
  handleValidationErrors,
];
