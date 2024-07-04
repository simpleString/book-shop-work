import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET } from "../constants";
import { SignInDTO, SignUpDTO, UserDb } from "../contracts/user";
import { query } from "../db";
import { isPgError } from "../utils";
import { AllreadyExistError } from "./errors";
import _ from "lodash/fp";

const saltRount = 10;

export const createUserService = async (
  userData: SignUpDTO
): Promise<UserDb> => {
  const passwordHash = await bcrypt.hash(userData.password, saltRount);

  try {
    const result = await query<UserDb>(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [userData.username, passwordHash, userData.email]
    );
    return result.rows[0];
  } catch (error) {
    if (isPgError(error)) {
      if (error.code === "23505") {
        throw new AllreadyExistError();
      }
    }
    throw error;
  }
};

export const loginService = async (
  userData: SignInDTO
): Promise<{ token: string } | null> => {
  const result = await query<UserDb>(
    "SELECT * FROM users WHERE username = $1",
    [userData.username]
  );

  const user = result.rows[0];

  if (!user) {
    return null;
  }

  try {
    const result = await bcrypt.compare(userData.password, user.password);
    if (!result) {
      return null;
    }
  } catch (error) {
    return null;
  }

  const token = jwt.sign(_.omit("password", user), SECRET!);
  return { token };
};

export const getUserInfoService = async (
  id: number
): Promise<UserDb | null> => {
  const result = await query<UserDb>("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0] || null;
};

export const editUserRoleService = async (id: number, role: number) => {
  const result = await query<UserDb>(
    "UPDATE users SET role = $1 WHERE id = $2 RETURNING *",
    [role, id]
  );

  return result.rows[0];
};
