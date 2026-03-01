import { Router } from "express";
import { body } from "express-validator";
import { register, login, getMe } from "../controllers/authController";
import { handleValidationErrors } from "../middleware/validation";

const router = Router();

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    handleValidationErrors,
  ],
  register
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
  ],
  login
);

// GET /api/auth/me
router.get("/me", getMe);

export default router;
