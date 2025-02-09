import StarIcon from "@mui/icons-material/Star";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { TSingleRepositoryCardProps } from "./types";

const SingleRepositoryCard = ({
  description,
  stargazers_count,
  name,
}: TSingleRepositoryCardProps) => {
  return (
    <Card variant="outlined" sx={{ my: 1, width: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="h2"
            fontWeight="700"
            fontSize={{
              xs: "medium",
              sm: "large",
            }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* maxHeight is used to optically align the text with StarIcon */}
            <Typography sx={{ maxHeight: "1.25rem" }}>
              {stargazers_count}
            </Typography>
            <StarIcon fontSize="small" />
          </Box>
        </Box>
        <Typography variant="body2">
          {description || "No description"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleRepositoryCard;
