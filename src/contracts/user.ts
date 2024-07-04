import { z } from "zod";

export const SignUpDTOSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export const SignInDTOSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const ChangeRoleDTOSchema = z.object({
  role: z.number().min(0).max(1),
});

export type SignUpDTO = z.infer<typeof SignUpDTOSchema>;

export type SignInDTO = z.infer<typeof SignInDTOSchema>;

export type UserDb = {
  id: number;
  username: string;
  password: string;
  email: string;
  role: number;
};
