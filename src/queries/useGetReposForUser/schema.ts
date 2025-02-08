import { z } from "zod";

export const SingleRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  stargazers_count: z.number(),
});

export const RepoResponseSchema = z.array(SingleRepoSchema);

export type TRepoResponse = z.infer<typeof RepoResponseSchema>;
export type TSingleRepo = z.infer<typeof SingleRepoSchema>;
