import { Box, Typography } from "@mui/material";

export function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: { xs: 3, sm: 4 },
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          color: "#ffffff",
          mb: 1,
        }}
      >
        Trade crypto with{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          lightning speed
        </Box>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: { xs: "0.9rem", sm: "1.1rem" },
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        Swap tokens instantly with the lowest fees. No registration required.
      </Typography>
    </Box>
  );
}
