import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ROLES, SECRET } from "../constants.js";
import {
  accessDenied,
  unauthorized,
  validationError,
} from "../controllers/errors.js";
import { UserDb } from "../contracts/user.js";

export const checkRoleMiddleware =
  (role: (typeof ROLES)[number]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return unauthorized(res);
    }

    let data: UserDb;
    try {
      data = jwt.verify(token, SECRET!) as UserDb;
    } catch (error) {
      return validationError(res);
    }

    if (data.role > role) {
      return accessDenied(res);
    }

    req.user = data;

    return next();
  };
