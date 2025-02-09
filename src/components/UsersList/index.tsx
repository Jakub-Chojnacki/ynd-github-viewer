import { useAtomValue } from "jotai";

import { Alert, Box, CircularProgress } from "@mui/material";

import { searchTermAtom } from "@/store/atoms";

import useGetUsers from "@queries/useGetUsers";

import NoUsersFound from "@components/NoUsersFound";
import SingleUserAccordion from "@components/SingleUserAccordion";

import { usersErrorMessage } from "./const";

const UsersList = () => {
  const searchTerm = useAtomValue(searchTermAtom);

  const { data, isLoading, error } = useGetUsers({ searchTerm });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {error && (
        <Alert severity="error" data-testid="users-error">
          {usersErrorMessage}
        </Alert>
      )}

      {isLoading && <CircularProgress data-testid="users-loading" />}

      {data?.map((user) => (
        <SingleUserAccordion login={user.login} key={user.id} />
      ))}

      {data && !data.length && <NoUsersFound />}
    </Box>
  );
};

export default UsersList;
