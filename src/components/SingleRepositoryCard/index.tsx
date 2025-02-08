import { Box, CardContent, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { TSingleRepositoryCardProps } from "./types";

const SingleRepositoryCard = ({
  description,
  stargazers_count,
  name
}: TSingleRepositoryCardProps) => {
  return (
    <CardContent
      sx={{
        maxWidth: 400,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2">{name}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{stargazers_count}</Typography>
          <StarIcon fontSize="small"/>
        </Box>
      </Box>
        <Typography variant="body2">{description}</Typography>
    </CardContent>
  );
};

export default SingleRepositoryCard;
