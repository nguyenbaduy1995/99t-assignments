import { Box, CircularProgress, Typography } from "@mui/material";

export function LoadingState() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress color="primary" />
      <Typography color="text.secondary">Loading tokens...</Typography>
    </Box>
  );
}
