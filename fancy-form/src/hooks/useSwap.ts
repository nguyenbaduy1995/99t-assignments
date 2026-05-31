import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import type { Token } from "../types";
import { MAX_BALANCE } from "../constants";

interface FormValues {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

export function useSwap(tokens: Token[]) {
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
      toCurrency: "USDT",
    },
  });

  const amount = watch("amount");
  const fromCurrency = watch("fromCurrency");
  const toCurrency = watch("toCurrency");

  const fromToken = useMemo(
    () => tokens.find((t) => t.currency === fromCurrency),
    [tokens, fromCurrency]
  );

  const toToken = useMemo(
    () => tokens.find((t) => t.currency === toCurrency),
    [tokens, toCurrency]
  );

  const convertedAmount = useMemo(() => {
    if (!amount || !fromToken || !toToken) return null;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return null;
    const usdValue = numAmount * fromToken.price;
    return usdValue / toToken.price;
  }, [amount, fromToken, toToken]);

  const usdValue = useMemo(() => {
    if (!amount || !fromToken) return null;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return null;
    return numAmount * fromToken.price;
  }, [amount, fromToken]);

  const toUsdValue = useMemo(() => {
    if (!convertedAmount || !toToken) return null;
    return convertedAmount * toToken.price;
  }, [convertedAmount, toToken]);

  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken) return null;
    return fromToken.price / toToken.price;
  }, [fromToken, toToken]);

  const handleSwap = useCallback(() => {
    setValue("fromCurrency", toCurrency);
    setValue("toCurrency", fromCurrency);
  }, [setValue, fromCurrency, toCurrency]);

  const handleMaxClick = useCallback(() => {
    setValue("amount", MAX_BALANCE.toString(), { shouldValidate: true });
  }, [setValue]);

  const setFromCurrency = useCallback(
    (currency: string) => setValue("fromCurrency", currency),
    [setValue]
  );

  const setToCurrency = useCallback(
    (currency: string) => setValue("toCurrency", currency),
    [setValue]
  );

  const setAmount = useCallback(
    (value: string) => setValue("amount", value),
    [setValue]
  );

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

  return {
    control,
    handleSubmit,
    errors,
    isValid,
    reset,
    amount,
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
    setAmount,
    validateAmount,
  };
}
