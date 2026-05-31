import { useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { SwapCard } from "./SwapCard";
import { SwapButton } from "./SwapButton";
import { AmountInput } from "./AmountInput";
import { useSwap } from "../hooks/useSwap";
import { formatNumber } from "../utils/format";
import { MAX_BALANCE } from "../constants";
import type { Token } from "../types";

interface ExchangeFormProps {
  tokens: Token[];
}

export function ExchangeForm({ tokens }: ExchangeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const {
    control,
    handleSubmit,
    errors,
    isValid,
    reset,
    fromCurrency,
    toCurrency,
    fromToken,
    toToken,
    convertedAmount,
    usdValue,
    toUsdValue,
    exchangeRate,
    handleSwap,
    handleMaxClick,
    setFromCurrency,
    setToCurrency,
    validateAmount,
  } = useSwap(tokens);

  const onSubmit = useCallback(
    async (data: {
      amount: string;
      fromCurrency: string;
      toCurrency: string;
    }) => {
      setIsLoading(true);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );
      setIsLoading(false);

      const message = `Successfully swapped ${data.amount} ${data.fromCurrency} to ${convertedAmount ? formatNumber(convertedAmount) : ""} ${data.toCurrency}`;
      setSnackbar({ open: true, message });
      reset();
    },
    [convertedAmount, reset],
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 480 },
          p: { xs: 2, sm: 3 },
          borderRadius: "16px",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <Box
            component="span"
            sx={{ color: "primary.main", fontSize: "1.25rem" }}
          >
            ⚡
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#ffffff" }}>
            Swap
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <SwapCard
            label="From"
            tokens={tokens}
            selectedCurrency={fromCurrency}
            disabledCurrency={toCurrency}
            onCurrencyChange={setFromCurrency}
            id="from-currency"
            balance={MAX_BALANCE}
            usdValue={usdValue}
            onMaxClick={handleMaxClick}
            isLoading={isLoading}
          >
            <Controller
              name="amount"
              control={control}
              rules={{ validate: validateAmount }}
              render={({ field }) => (
                <AmountInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  error={!!errors.amount}
                />
              )}
            />
          </SwapCard>

          {errors.amount && (
            <Typography
              sx={{ color: "error.main", fontSize: "0.75rem", px: 2 }}
            >
              {errors.amount.message}
            </Typography>
          )}

          <SwapButton onClick={handleSwap} disabled={isLoading} />

          <SwapCard
            label="To"
            tokens={tokens}
            selectedCurrency={toCurrency}
            disabledCurrency={fromCurrency}
            onCurrencyChange={setToCurrency}
            id="to-currency"
            balance={null}
            usdValue={toUsdValue}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                fontWeight: 500,
                color:
                  convertedAmount !== null
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.3)",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              {convertedAmount !== null ? formatNumber(convertedAmount) : "0.0"}
            </Typography>
          </SwapCard>

          {fromToken && toToken && exchangeRate && (
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "rgba(255, 255, 255, 0.5)",
                textAlign: "center",
                mt: 1,
              }}
            >
              1 {fromToken.currency} = {formatNumber(exchangeRate)}{" "}
              {toToken.currency}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isValid || convertedAmount === null || isLoading}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "1rem",
              bgcolor: "primary.main",
              color: "#0a0a0f",
              "&:hover": { bgcolor: "#0891b2" },
              "&:disabled": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#0a0a0f" }} />
                Swapping...
              </Box>
            ) : (
              "Swap"
            )}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{
            bgcolor: "primary.main",
            color: "#ffffff",
            "& .MuiAlert-icon": { color: "#ffffff" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
