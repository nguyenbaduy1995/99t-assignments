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
      <CircularProgress sx={{ color: "primary.main" }} />
      <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
        Loading tokens...
      </Typography>
    </Box>
  );
}
