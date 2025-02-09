export type TUseGetReposForUserParams = {
  login: string;
  expanded: boolean;
  perPage?: number;
};

export type TGetReposParams = {
  pageParam: number;
  login: TUseGetReposForUserParams["login"];
  perPage: TUseGetReposForUserParams["perPage"];
};
