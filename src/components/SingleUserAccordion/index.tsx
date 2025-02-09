import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import useGetReposForUser, { getRepos } from "@/queries/useGetReposForUser";

import InfiniteQueryErrorNotification from "@components/InfiniteQueryErrorNotification";
import LoadMoreButton from "@components/LoadMoreButton";
import SingleRepositoryCard from "@components/SingleRepositoryCard";

import { noRepositoriesFoundMessage, repositoriesErrorMessage } from "./const";
import { TSingleUserAccordionProps } from "./types";

const SingleUserAccordion = ({ login }: TSingleUserAccordionProps) => {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  const triedToPrefetch = useRef(false);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReposForUser({ login, expanded });

  const handleAccordionChange = (
    _: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded);
  };

  const handlePrefetch = async (): Promise<void> => {
    // Prevents prefetching multiple times if the user hovers over the accordion a lot of times
    if (triedToPrefetch.current) return;

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["getRepos", login],
      queryFn: () => getRepos({ login, pageParam: 1, perPage: 10 }),
      initialPageParam: 1,
      staleTime: Infinity,
    });

    triedToPrefetch.current = true;
  };

  const noRepositories = !isLoading && !error && !data?.pages?.[0]?.data.length;

  return (
    <Accordion
      sx={{ width: "100%" }}
      data-testid={`user-accordion-${login}`}
      expanded={expanded}
      onChange={handleAccordionChange}
      onMouseOver={handlePrefetch}
    >
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
              data-testid="repositories-loading"
              sx={{ ml: "auto", mr: "auto", display: "block" }}
            />
          )}

          {data?.pages.map((page) =>
            page.data.map((repo) => (
              <SingleRepositoryCard key={repo.id} {...repo} />
            ))
          )}

          {noRepositories && (
            <Typography data-testid="no-repositories">
              {noRepositoriesFoundMessage}
            </Typography>
          )}

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
