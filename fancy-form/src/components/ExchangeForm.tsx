import { useState, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  InputAdornment,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { TokenSelect } from "./TokenSelect";
import {
  formatNumber,
  formatAmountWithCommas,
  parseAmountFromCommas,
} from "../utils/format";
import type { Token } from "../types";

interface ExchangeFormProps {
  tokens: Token[];
}

interface FormValues {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
}

const MAX_BALANCE = 10000;

export function ExchangeForm({ tokens }: ExchangeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      amount: "",
      fromCurrency: "ETH",
      toCurrency: "USD",
    },
  });

  const amount = watch("amount");
  const fromCurrency = watch("fromCurrency");
  const toCurrency = watch("toCurrency");

  const fromToken = tokens.find((t) => t.currency === fromCurrency);
  const toToken = tokens.find((t) => t.currency === toCurrency);

  const convertedAmount = useMemo(() => {
    if (!amount || !fromToken || !toToken) return null;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return null;
    const usdValue = numAmount * fromToken.price;
    return usdValue / toToken.price;
  }, [amount, fromToken, toToken]);

  const handleSwap = useCallback(() => {
    setValue("fromCurrency", toCurrency);
    setValue("toCurrency", fromCurrency);
  }, [setValue, fromCurrency, toCurrency]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      setIsLoading(true);

      const delay = 1000 + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      setIsLoading(false);

      const successMessage = `Successfully exchanged ${data.amount} ${data.fromCurrency} to ${convertedAmount ? formatNumber(convertedAmount) : ""} ${data.toCurrency}`;
      setSnackbar({ open: true, message: successMessage });

      reset();
    },
    [convertedAmount, reset]
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const validateAmount = useCallback((value: string) => {
    if (!value || value.trim() === "") {
      return "Amount is required";
    }

    const num = parseFloat(value);

    if (isNaN(num)) {
      return "Please enter a valid number";
    }

    if (num <= 0) {
      return "Amount must be greater than 0";
    }

    if (num > MAX_BALANCE) {
      return `Amount exceeds max balance (${MAX_BALANCE.toLocaleString()})`;
    }

    return true;
  }, []);

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 600 },
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 2, sm: 4 },
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(236, 72, 153, 0.2)",
          mx: "auto",
          boxShadow: "0 20px 60px rgba(236, 72, 153, 0.15)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {/* From Section */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
              borderRadius: { xs: 2, sm: 3 },
              border: "2px solid rgba(236, 72, 153, 0.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: { xs: "stretch", sm: "flex-start" },
              }}
            >
              <Controller
                name="fromCurrency"
                control={control}
                render={({ field }) => (
                  <TokenSelect
                    tokens={tokens}
                    value={field.value}
                    onChange={field.onChange}
                    label="From"
                    id="from-currency"
                  />
                )}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="label"
                  htmlFor="amount"
                  sx={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "grey.600",
                    mb: 1,
                    height: 18,
                  }}
                >
                  Amount
                </Typography>
                <Controller
                  name="amount"
                  control={control}
                  rules={{ validate: validateAmount }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={formatAmountWithCommas(field.value)}
                      onChange={(e) => {
                        const rawValue = parseAmountFromCommas(e.target.value);
                        if (
                          rawValue === "" ||
                          /^[0-9]*\.?[0-9]*$/.test(rawValue)
                        ) {
                          field.onChange(rawValue);
                        }
                      }}
                      size="medium"
                      id="amount"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      fullWidth
                      disabled={isLoading}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      slotProps={{
                        htmlInput: {
                          style: { textAlign: "right" },
                        },
                        formHelperText: {
                          sx: { mx: 0 },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "grey.600",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                }}
              >
                Max: {MAX_BALANCE.toLocaleString()}
              </Typography>
              {fromToken && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "grey.600",
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  }}
                >
                  1 {fromToken.currency} = ${formatNumber(fromToken.price)}
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Swap Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: { xs: -1, sm: -1.5 },
              position: "relative",
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={handleSwap}
              disabled={isLoading}
              aria-label="Swap currencies"
              size="medium"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.1)",
                },
                "&:disabled": {
                  bgcolor: "grey.300",
                  color: "grey.500",
                },
                transition: "all 0.2s",
                boxShadow: 4,
              }}
            >
              <SwapVertIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>

          {/* To Section */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
              borderRadius: { xs: 2, sm: 3 },
              border: "2px solid rgba(236, 72, 153, 0.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: { xs: "stretch", sm: "flex-start" },
              }}
            >
              <Controller
                name="toCurrency"
                control={control}
                render={({ field }) => (
                  <TokenSelect
                    tokens={tokens}
                    value={field.value}
                    onChange={field.onChange}
                    label="To"
                    id="to-currency"
                  />
                )}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="label"
                  sx={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "grey.600",
                    mb: 1,
                    height: 18,
                  }}
                >
                  You receive
                </Typography>
                <TextField
                  value={
                    convertedAmount !== null
                      ? formatNumber(convertedAmount)
                      : ""
                  }
                  size="medium"
                  placeholder="0.00"
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                      "aria-live": "polite" as const,
                      endAdornment: toToken && (
                        <InputAdornment position="end">
                          <Typography variant="body2" color="grey.600">
                            {toToken.currency}
                          </Typography>
                        </InputAdornment>
                      ),
                    },
                    htmlInput: {
                      style: { textAlign: "right" },
                    },
                  }}
                />
              </Box>
            </Box>
            {toToken && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "right",
                  mt: 1,
                  color: "grey.600",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                }}
              >
                1 {toToken.currency} = ${formatNumber(toToken.price)}
              </Typography>
            )}
          </Paper>

          {/* Exchange Rate */}
          {fromToken && toToken && (
            <Typography
              variant="body2"
              align="center"
              color="grey.600"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
            >
              1 {fromToken.currency} ={" "}
              {formatNumber(fromToken.price / toToken.price)} {toToken.currency}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isValid || convertedAmount === null || isLoading}
            fullWidth
            sx={{
              py: { xs: 1.25, sm: 1.5 },
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              background: "linear-gradient(90deg, #ec4899, #f472b6)",
              "&:hover": {
                background: "linear-gradient(90deg, #db2777, #ec4899)",
              },
              "&:disabled": {
                background: "rgba(209, 213, 219, 0.5)",
                color: "rgba(107, 114, 128, 0.8)",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Processing...
              </Box>
            ) : (
              "Confirm Exchange"
            )}
          </Button>
        </Box>
      </Paper>

      {/* Success Snackbar */}
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
