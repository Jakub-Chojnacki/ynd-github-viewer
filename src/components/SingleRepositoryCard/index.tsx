import { Box, CardContent, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { TSingleRepositoryCardProps } from "./types";

const SingleRepositoryCard = ({
  description,
  stars,
  title,
}: TSingleRepositoryCardProps) => {
  return (
    <CardContent
      sx={{
        maxWidth: 250,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2">{title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{stars}</Typography>
          <StarIcon fontSize="small"/>
        </Box>
      </Box>
        <Typography variant="body2">{description}</Typography>
    </CardContent>
  );
};

export default SingleRepositoryCard;
