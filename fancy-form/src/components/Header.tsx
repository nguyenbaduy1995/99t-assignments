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
      <Box
        component="img"
        src="/cat.svg"
        alt="Choco Coin"
        sx={{
          width: { xs: 72, sm: 96 },
          height: { xs: 72, sm: 96 },
          borderRadius: 3,
          mb: 2,
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={(theme) => ({
          color: theme.palette.primary.main,
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
        })}
      >
        Choco Coin Exchange
      </Typography>
      <Typography
        variant="body1"
        sx={(theme) => ({
          color: theme.palette.primary.main,
          fontSize: { xs: "0.85rem", sm: "1rem" },
          mt: 1,
        })}
      >
        Swap your crypto with a purr-fect rate
      </Typography>
    </Box>
  );
}
