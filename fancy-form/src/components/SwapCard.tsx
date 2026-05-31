import { Paper, Box, Typography, Button } from "@mui/material";
import type { Token } from "../types";
import { TokenSelect } from "./TokenSelect";
import { formatPrice } from "../utils/format";
import { MAX_BALANCE } from "../constants";

interface SwapCardProps {
  label: "From" | "To";
  tokens: Token[];
  selectedCurrency: string;
  disabledCurrency: string;
  onCurrencyChange: (currency: string) => void;
  id: string;
  balance?: number | null;
  usdValue?: number | null;
  onMaxClick?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function SwapCard({
  label,
  tokens,
  selectedCurrency,
  disabledCurrency,
  onCurrencyChange,
  id,
  balance,
  usdValue,
  onMaxClick,
  isLoading,
  children,
}: SwapCardProps) {
  const showMax = label === "From" && onMaxClick;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: "16px",
        bgcolor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          Balance: {balance !== null ? balance?.toLocaleString() : "--"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {children}
        <TokenSelect
          tokens={tokens}
          value={selectedCurrency}
          onChange={onCurrencyChange}
          id={id}
          disabledCurrency={disabledCurrency}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          ≈ ${usdValue ? formatPrice(usdValue) : "0.00"}
        </Typography>
        {showMax && (
          <Button
            onClick={onMaxClick}
            disabled={isLoading}
            sx={{
              color: "primary.main",
              fontSize: "0.875rem",
              fontWeight: 600,
              minWidth: "auto",
              p: 0,
              "&:hover": {
                bgcolor: "transparent",
                opacity: 0.8,
              },
            }}
          >
            MAX
          </Button>
        )}
      </Box>
    </Paper>
  );
}
