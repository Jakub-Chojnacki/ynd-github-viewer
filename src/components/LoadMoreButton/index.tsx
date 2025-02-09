import { Button } from "@mui/material";

import { TLoadMoreButtonProps } from "./types";

const LoadMoreButton = ({
  fetchNextPage,
  isFetchingNextPage,
}: TLoadMoreButtonProps) => {
  return (
    <Button
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      data-testid="load-more-button"
    >
      {isFetchingNextPage ? "Loading more..." : "Load More"}
    </Button>
  );
};

export default LoadMoreButton;
