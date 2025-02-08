import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";

import useGetReposForUser from "@/queries/useGetReposForUser";
import SingleRepositoryCard from "@components/SingleRepositoryCard";

import { TSingleUserAccordionProps } from "./types";

const SingleUserAccordion = ({ login }: TSingleUserAccordionProps) => {
  const { data, error, isLoading } = useGetReposForUser({ login });

  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{login}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data && !data.length && (
          <Alert severity="info">No repositories found</Alert>
        )}
        {data?.map((repo) => <SingleRepositoryCard key={repo.id} {...repo} />)}
        {error && <Alert severity="error">{error.message}</Alert>}
        {isLoading && <CircularProgress />}
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleUserAccordion;
