import { Container, Typography } from "@mui/material";

import SearchUserForm from "@/forms/SearchUserForm";
import UsersList from "@components/UsersList";

const MainView = () => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Github Viewer
      </Typography>
      <SearchUserForm />
      <UsersList />
    </Container>
  );
};

export default MainView;
