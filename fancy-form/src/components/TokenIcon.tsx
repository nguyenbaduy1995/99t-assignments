import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import type { Token } from "../types";
import { FALLBACK_ICON } from "../constants";

interface TokenIconProps {
  token: Token;
  size?: number;
}

export function TokenIcon({ token, size = 24 }: TokenIconProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <Box
      component="img"
      src={hasError ? FALLBACK_ICON : token.icon}
      alt={`${token.currency} icon`}
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: "rgba(255, 255, 255, 0.1)",
        objectFit: "cover",
      }}
      onError={hasError ? undefined : handleError}
    />
  );
}
