import { Response } from "express";

export const errorResponse = (
  res: Response,
  error: { status: number; message: string }
) => {
  res.status(error.status).json({ error: error.message });
};

export const unauthorized = (res: Response) => {
  errorResponse(res, { status: 401, message: "Unauthorized" });
};

export const validationError = (res: Response) => {
  errorResponse(res, { status: 422, message: "Validation error" });
};

export const accessDenied = (res: Response) => {
  errorResponse(res, { status: 403, message: "Access denied" });
};

export const notFound = (res: Response) => {
  errorResponse(res, { status: 404, message: "Not found" });
};

export const internalServerError = (res: Response) => {
  errorResponse(res, { status: 500, message: "Internal server error" });
};

export const invalidData = (res: Response) => {
  errorResponse(res, { status: 400, message: "Invalid data" });
};
