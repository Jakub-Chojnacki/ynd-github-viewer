import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import useGetReposForUser from "@/queries/useGetReposForUser";

import LoadMoreButton from "@components/LoadMoreButton";
import SingleRepositoryCard from "@components/SingleRepositoryCard";
import InfiniteQueryErrorNotification from "@components/InfiniteQueryErrorNotification";

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

  const noRepositories = !isLoading && !error && !data?.pages?.[0]?.length;

  return (
    <Accordion sx={{ width: "100%" }} data-testid="user-accordion">
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
            <LoadMoreButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}

          <InfiniteQueryErrorNotification
            error={error}
            hasData={!!data}
            customErrorMessage={repositoriesErrorMessage}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleUserAccordion;
