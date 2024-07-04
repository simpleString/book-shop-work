import { UserDb } from "./contracts/user";

declare global {
  namespace Express {
    export interface Request {
      user?: UserDb;
    }
  }
}
