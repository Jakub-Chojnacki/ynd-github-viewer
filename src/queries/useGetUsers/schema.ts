import { z } from "zod";

export const SingleUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  html_url: z.string(),
});

export const UserResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(SingleUserSchema),
});

export type TUserResponse = z.infer<typeof UserResponseSchema>;
export type TSingleUser = z.infer<typeof SingleUserSchema>;
