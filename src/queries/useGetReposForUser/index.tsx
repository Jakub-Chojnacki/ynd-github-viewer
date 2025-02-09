import { useInfiniteQuery } from "@tanstack/react-query";

import apiClient from "@api/apiClient";

import { RepoResponseSchema, TRepoResponse } from "./schema";
import { TUseGetReposForUserParams, TGetReposParams, TGetRepos } from "./types";

export const getRepos = async ({
  pageParam = 1,
  login,
  perPage = 10,
}: TGetReposParams): Promise<TGetRepos> => {
  const response = await apiClient.get<TRepoResponse>(
    `/users/${login}/repos?sort=updated&page=${pageParam}&per_page=${perPage}`
  );

  const { data, success } = RepoResponseSchema.safeParse(response.data);

  if (!success) {
    throw new Error("The repositories data was malformed!");
  }

  const linkHeader = response.headers.link;
  const nextPageText = 'rel="next"';

  // Check if the link header contains the "next" link
  const hasNextPage = linkHeader?.includes(nextPageText) ?? false;

  return { data, hasNextPage };
};

const useGetReposForUser = ({
  login,
  expanded,
  perPage = 10,
}: TUseGetReposForUserParams) => {
  const query = useInfiniteQuery({
    queryKey: ["getRepos", login],
    queryFn: ({ ...props }) => getRepos({ login, perPage, ...props }),
    enabled: !!login && expanded,
    getNextPageParam: ({ hasNextPage }, allPages) => {
      console.log(hasNextPage, allPages);
      return hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    retry: 2,
  });

  return query;
};

export default useGetReposForUser;
