import { useQuery } from "@tanstack/react-query";

import apiClient from "@api/apiClient";

import { TUseGetUsersParams } from "./types";
import { TSingleUser, TUserResponse, UserResponseSchema } from "./schema";

const useGetUsers = ({ searchTerm, perPage = 5 }: TUseGetUsersParams) => {
  const getUsers = async (): Promise<TSingleUser[]> => {
    const response = await apiClient.get<TUserResponse>(
      `/search/users?q=${searchTerm}&per_page=${perPage}`
    );

    const { data, success } = UserResponseSchema.safeParse(response.data);

    if (!success) {
      throw new Error("There was an error while fetching users data");
    }

    return data.items;
  };

  const query = useQuery({
    queryKey: ["getUsers", searchTerm],
    queryFn: getUsers,
    enabled: !!searchTerm,
  });

  return query;
};

export default useGetUsers;
