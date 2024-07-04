import { z } from "zod";

export const AddBookDTOSchema = z.object({
  title: z.string(),
  author: z.string(),
  genres: z.string(),
  publicationDate: z.string().date(),
});

export const UpdateBookDTOSchema = AddBookDTOSchema;

export type AddBookDTO = z.infer<typeof AddBookDTOSchema>;
export type UpdateBookDTO = z.infer<typeof UpdateBookDTOSchema>;

export type BookDb = {
  id: number;
  title: string;
  author: string;
  genres: string;
  publicationDate: string;
};
