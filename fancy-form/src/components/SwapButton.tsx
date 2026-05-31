import { Box, IconButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

interface SwapButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function SwapButton({ onClick, disabled }: SwapButtonProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <IconButton
        onClick={onClick}
        disabled={disabled}
        aria-label="Swap currencies"
        size="medium"
        sx={{
          bgcolor: "primary.main",
          color: "#0a0a0f",
          width: 40,
          height: 40,
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#ec4899",
            color: "#ffffff",
          },
          "&:disabled": {
            bgcolor: "rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.3)",
            cursor: "not-allowed",
          },
          transition: "all 0.2s",
        }}
      >
        <SwapVertIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
}
