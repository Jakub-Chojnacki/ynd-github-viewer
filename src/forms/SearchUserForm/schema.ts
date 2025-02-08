import { z } from "zod";

export const SearchUserFormSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export type TSearchUserForm = z.infer<typeof SearchUserFormSchema>;
