import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Box, CircularProgress, Container } from "@mui/material";

import SingleUserAccordion from "@/components/SingleUserAccordion";
import SearchUserForm from "@/forms/SearchUserForm";
import useGetUsers from "@queries/useGetUsers";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetUsers({ searchTerm });

  return (
    <Container>
      <h1>Github Viewer</h1>
      <SearchUserForm setSearchTerm={setSearchTerm} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isLoading && <CircularProgress />}
        {data?.map((user) => (
          <SingleUserAccordion login={user.login} key={user.id} />
        ))}
      </Box>
    </Container>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
