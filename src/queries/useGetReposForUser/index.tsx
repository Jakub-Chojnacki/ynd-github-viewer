import { useQuery } from "@tanstack/react-query";

import apiClient from "@api/apiClient";

import { TUseGetReposForUserParams } from "./types";
import { RepoResponseSchema, TRepoResponse, TSingleRepo } from "./schema";

const useGetReposForUser = ({ login }: TUseGetReposForUserParams) => {
  //TODO: Refactor this to use infiniteScroll
  const getRepos = async (): Promise<TSingleRepo[]> => {
    const response = await apiClient.get<TRepoResponse>(
      `/users/${login}/repos?sort=updated`
    );

    const { data, success } = RepoResponseSchema.safeParse(response.data);

    if (!success) {
      throw new Error("There was an error while fetching user's repositories");
    }

    return data;
  };

  const query = useQuery({
    queryKey: ["getRepos", login],
    queryFn: getRepos,
    enabled: !!login,
  });

  return query;
};

export default useGetReposForUser;
