import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { TSingleUserAccordionProps } from "./types";

const SingleUserAccordion = ({ login }: TSingleUserAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{login}</Typography>
      </AccordionSummary>
      <AccordionDetails>{/* Add repository cards */}</AccordionDetails>
    </Accordion>
  );
};

export default SingleUserAccordion;
