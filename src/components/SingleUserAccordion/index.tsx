import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import useGetReposForUser from "@/queries/useGetReposForUser";
import SingleRepositoryCard from "@components/SingleRepositoryCard";

import { TSingleUserAccordionProps } from "./types";
import { repositoriesErrorMessage } from "./const";

const SingleUserAccordion = ({ login }: TSingleUserAccordionProps) => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReposForUser({ login });

  const noRepositories = !data?.pages?.[0].length && !isLoading && !error;

  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{login}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          {isLoading && (
            <CircularProgress
              sx={{ ml: "auto", mr: "auto", display: "block" }}
            />
          )}

          {data?.pages.map((page) =>
            page.map((repo) => <SingleRepositoryCard key={repo.id} {...repo} />)
          )}

          {noRepositories && <Typography>No repositories</Typography>}

          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          )}

          {error && (
            <Alert severity="error" sx={{ flex: 1 }}>
              {repositoriesErrorMessage}
            </Alert>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleUserAccordion;
