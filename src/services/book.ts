import { AddBookDTO, BookDb, UpdateBookDTO } from "../contracts/book";
import { query } from "../db";

export const getBooksService = async (): Promise<BookDb[]> => {
  const result = await query<BookDb>("SELECT * FROM books");

  return result.rows;
};

export const getBookService = async (id: number): Promise<BookDb> => {
  const result = await query<BookDb>("SELECT * FROM books WHERE id = $1", [id]);

  return result.rows[0];
};

export const addBookService = async (book: AddBookDTO): Promise<BookDb> => {
  const result = await query<BookDb>(
    "INSERT INTO books (title, author, genres, publicationdate) VALUES ($1, $2, $3, $4) RETURNING *",
    [book.title, book.author, book.genres, book.publicationDate]
  );

  return result.rows[0];
};

export const editBookService = async (
  id: number,
  book: UpdateBookDTO
): Promise<BookDb> => {
  const result = await query<BookDb>(
    "UPDATE books SET title = $1, author = $2, genres = $3, publicationdate = $4 WHERE id = $5 RETURNING *",
    [book.title, book.author, book.genres, book.publicationDate, id]
  );

  return result.rows[0];
};

export const deleteBookService = async (id: number): Promise<BookDb> => {
  return (await query<BookDb>("DELETE FROM books WHERE id = $1", [id])).rows[0];
};
