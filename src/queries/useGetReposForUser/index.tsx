import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import { TUseGetReposForUserParams } from "./types";
import { RepoResponseSchema, TRepoResponse, TSingleRepo } from "./schema";

const useGetReposForUser = ({
  login,
  perPage = 10,
}: TUseGetReposForUserParams) => {
  const getRepos = async ({ pageParam = 1 }): Promise<TSingleRepo[]> => {
    const response = await apiClient.get<TRepoResponse>(
      `/users/${login}/repos?sort=updated&page=${pageParam}&per_page=${perPage}`
    );

    const { data, success } = RepoResponseSchema.safeParse(response.data);

    if (!success) {
      throw new Error("The repositories data was malformed!");
    }

    return data;
  };

  const query = useInfiniteQuery({
    queryKey: ["getRepos", login],
    queryFn: getRepos,
    enabled: !!login,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === perPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return query;
};

export default useGetReposForUser;
