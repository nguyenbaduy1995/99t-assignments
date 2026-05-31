import { Box, Typography, Button } from "@mui/material";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        bgcolor: "rgba(239, 68, 68, 0.1)",
        borderRadius: "16px",
        border: "1px solid rgba(239, 68, 68, 0.3)",
      }}
    >
      <Typography sx={{ color: "error.main" }} gutterBottom>
        {message}
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        sx={{
          mt: 2,
          bgcolor: "error.main",
          color: "#ffffff",
          "&:hover": {
            bgcolor: "#dc2626",
          },
        }}
      >
        Retry
      </Button>
    </Box>
  );
}
