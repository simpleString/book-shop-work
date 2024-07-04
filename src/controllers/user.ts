import { Request, Response, Router } from "express";
import { ROLES } from "../constants";
import {
  ChangeRoleDTOSchema,
  SignInDTO,
  SignInDTOSchema,
  SignUpDTO,
  SignUpDTOSchema,
} from "../contracts/user";
import { invalidData, notFound } from "./errors";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";
import { validateData } from "../middlewares/validationMiddleware";
import {
  createUserService,
  editUserRoleService,
  getUserInfoService,
  loginService,
} from "../services/user";
import _ from "lodash/fp";
import { AllreadyExistError } from "../services/errors";

const router = Router();

const signUp = async (req: Request, res: Response) => {
  const userData = req.body as SignUpDTO;

  try {
    const user = await createUserService(userData);
    return res.json(_.omit("password", user));
  } catch (error) {
    if (error instanceof AllreadyExistError) {
      return invalidData(res);
    }
    throw error;
  }
};

const signIn = async (req: Request, res: Response) => {
  const userData = req.body as SignInDTO;

  const token = await loginService(userData);
  if (!token) {
    return notFound(res);
  }

  res.json(token);
};

const me = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const user = await getUserInfoService(userId);

  if (!user) {
    return notFound(res);
  }

  res.json(_.omit("password", user));
};

const editRole = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!_.isFinite(userId)) {
    return invalidData(res);
  }

  const role = req.body.role;
  if (ROLES[role as keyof typeof ROLES] === undefined) {
    return invalidData(res);
  }

  const user = await editUserRoleService(userId, req.body.role);

  return res.json(_.omit("password", user));
};

router.post("/register", validateData(SignUpDTOSchema), signUp);
router.post("/login", validateData(SignInDTOSchema), signIn);
router.get("/me", checkRoleMiddleware(0), me);
router.put(
  "/:id/role",
  checkRoleMiddleware(1),
  validateData(ChangeRoleDTOSchema),
  editRole
);

export default router;
