import { Container, Paper, styled, Typography } from "@mui/material";

import SearchUserForm from "@/forms/SearchUserForm";
import UsersList from "@components/UsersList";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  background: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(6),
  },
}));

const MainView = () => {
  return (
    <Container>
      <StyledPaper elevation={2}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: "primary.main",
            fontSize: {
              xs: "1.75rem",
              md: "2.5rem",
              lg: "3rem",
            },
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Github Viewer
        </Typography>
        <SearchUserForm />
        <UsersList />
      </StyledPaper>
    </Container>
  );
};

export default MainView;
