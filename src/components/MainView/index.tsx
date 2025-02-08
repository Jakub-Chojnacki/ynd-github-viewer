import { useAtomValue } from "jotai";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { searchTermAtom } from "@/store/atoms";

import SingleUserAccordion from "@/components/SingleUserAccordion";
import SearchUserForm from "@/forms/SearchUserForm";
import useGetUsers from "@queries/useGetUsers";

const MainView = () => {
  const searchTerm = useAtomValue(searchTermAtom);
  const { data, isLoading, error } = useGetUsers({ searchTerm });
  
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Github Viewer
      </Typography>
      <SearchUserForm />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <Alert severity="error">{error.message}</Alert>}
        {isLoading && <CircularProgress />}
        {data?.map((user) => (
          <SingleUserAccordion login={user.login} key={user.id} />
        ))}
      </Box>
    </Container>
  );
};

export default MainView;
