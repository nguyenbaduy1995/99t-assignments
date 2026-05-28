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
        bgcolor: "error.light",
        borderRadius: 2,
      }}
    >
      <Typography color="error.dark" gutterBottom>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => window.location.reload()}
        sx={{ mt: 2 }}
      >
        Retry
      </Button>
    </Box>
  );
}
