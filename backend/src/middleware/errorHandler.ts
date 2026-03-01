import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("--- BACKEND ERROR ---");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("----------------------");

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: `Backend Error: ${err.message}`,
    error: err.name,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
