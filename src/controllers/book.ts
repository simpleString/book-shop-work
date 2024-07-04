import { Request, Response, Router } from "express";
import {
  AddBookDTO,
  AddBookDTOSchema,
  UpdateBookDTO,
  UpdateBookDTOSchema,
} from "../contracts/book";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";
import { validateData } from "../middlewares/validationMiddleware";
import {
  addBookService,
  deleteBookService,
  editBookService,
  getBookService,
  getBooksService,
} from "../services/book";
import _ from "lodash/fp";
import { invalidData } from "./errors";

const router = Router();

const addBook = async (req: Request, res: Response) => {
  const bookData = req.body as AddBookDTO;

  const book = await addBookService(bookData);
  res.json(book);
};

const getAllBooks = async (_req: Request, res: Response) => {
  const books = await getBooksService();

  return res.json(books);
};

const getBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!_.isFinite(id)) {
    return invalidData(res);
  }

  const book = await getBookService(id);

  return res.json(book || {});
};

const editBook = async (req: Request, res: Response) => {
  const bookData = req.body as UpdateBookDTO;
  const id = Number(req.params.id);

  if (!_.isFinite(id)) {
    return invalidData(res);
  }

  const book = await editBookService(id, bookData);

  return res.json(book);
};

const deleteBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!_.isFinite(id)) {
    return invalidData(res);
  }

  const book = await deleteBookService(id);

  return res.json(book);
};

router.post(
  "/",
  checkRoleMiddleware(1),
  validateData(AddBookDTOSchema),
  addBook
);
router.get("/", checkRoleMiddleware(0), getAllBooks);
router.get("/:id", checkRoleMiddleware(0), getBook);
router.put(
  "/:id",
  checkRoleMiddleware(1),
  validateData(UpdateBookDTOSchema),
  editBook
);
router.delete("/:id", checkRoleMiddleware(0), deleteBook);

export default router;
