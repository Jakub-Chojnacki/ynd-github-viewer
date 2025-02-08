import { Box, Typography } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const NoUsersFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <PersonOffIcon sx={{ fontSize: 80, color: "grey.500", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        No Users Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Try searching for a different username.
      </Typography>
    </Box>
  );
};

export default NoUsersFound;
