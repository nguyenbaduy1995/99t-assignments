import { useState, useMemo, useCallback } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  ButtonBase,
  Stack,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TokenIcon } from "./TokenIcon";
import { formatPrice } from "../utils/format";
import { POPULAR_TOKENS } from "../constants";
import type { Token } from "../types";

interface TokenSelectProps {
  tokens: Token[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id: string;
  disabledCurrency?: string;
}

export function TokenSelect({
  tokens,
  value,
  onChange,
  label,
  id,
  disabledCurrency,
}: TokenSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedToken = tokens.find((t) => t.currency === value);

  const filteredTokens = useMemo(() => {
    if (!search.trim()) return tokens;
    const query = search.toLowerCase();
    return tokens.filter((token) =>
      token.currency.toLowerCase().includes(query),
    );
  }, [tokens, search]);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);

  const handleSelect = useCallback(
    (currency: string) => {
      onChange(currency);
      setOpen(false);
      setSearch("");
    },
    [onChange],
  );

  return (
    <>
      <Box>
        {label && (
          <Typography
            component="label"
            htmlFor={id}
            sx={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              mb: 1,
              height: 18,
            }}
          >
            {label}
          </Typography>
        )}
        <ButtonBase
          id={id}
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: 2,
            height: 48,
            borderRadius: "24px",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            transition: "all 0.2s",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
            minWidth: 130,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {selectedToken && <TokenIcon token={selectedToken} size={24} />}
            <Typography
              sx={{ fontWeight: 600, fontSize: "1rem", color: "#ffffff" }}
            >
              {selectedToken?.currency || "Select"}
            </Typography>
          </Stack>
          <KeyboardArrowDownIcon
            sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 20 }}
          />
        </ButtonBase>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            maxHeight: "80vh",
            bgcolor: "#1a1a24",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#ffffff">
            Select a token
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ px: 2, pb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            />
          </Box>

          <PopularTokens
            tokens={tokens}
            value={value}
            disabledCurrency={disabledCurrency}
            onSelect={handleSelect}
          />

          <TokenList
            tokens={filteredTokens}
            value={value}
            disabledCurrency={disabledCurrency}
            onSelect={handleSelect}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

interface PopularTokensProps {
  tokens: Token[];
  value: string;
  disabledCurrency?: string;
  onSelect: (currency: string) => void;
}

function PopularTokens({
  tokens,
  value,
  disabledCurrency,
  onSelect,
}: PopularTokensProps) {
  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Typography
        sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)", mb: 1 }}
      >
        Popular
      </Typography>
      <Stack direction="row" useFlexGap spacing={1.5} sx={{ flexWrap: "wrap" }}>
        {POPULAR_TOKENS.map((currency) => {
          const isSelected = currency === value;
          const isDisabled = currency === disabledCurrency;
          const token = tokens.find((t) => t.currency === currency);

          return (
            <Chip
              key={currency}
              label={currency}
              size="medium"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(currency)}
              avatar={token ? <TokenIcon token={token} size={24} /> : undefined}
              sx={{
                bgcolor: isSelected
                  ? "primary.main"
                  : "rgba(255, 255, 255, 0.08)",
                color: isSelected ? "#0a0a0f" : "rgba(255, 255, 255, 0.8)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.4 : 1,
                px: 1,
                py: 2.5,
                "& .MuiChip-avatar": { width: 24, height: 24, ml: 0.5 },
                "&:hover": {
                  bgcolor: isDisabled
                    ? "rgba(255, 255, 255, 0.08)"
                    : isSelected
                      ? "primary.main"
                      : "rgba(255, 255, 255, 0.15)",
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

interface TokenListProps {
  tokens: Token[];
  value: string;
  disabledCurrency?: string;
  onSelect: (currency: string) => void;
}

function TokenList({
  tokens,
  value,
  disabledCurrency,
  onSelect,
}: TokenListProps) {
  if (tokens.length === 0) {
    return (
      <Typography
        color="rgba(255, 255, 255, 0.5)"
        textAlign="center"
        sx={{ py: 4 }}
      >
        No tokens found
      </Typography>
    );
  }

  return (
    <Box sx={{ maxHeight: 350, overflow: "auto", px: 1, pb: 1 }}>
      {tokens.map((token) => {
        const isDisabled = token.currency === disabledCurrency;
        const isSelected = token.currency === value;

        return (
          <ButtonBase
            key={token.currency}
            onClick={() => !isDisabled && onSelect(token.currency)}
            disabled={isDisabled}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              width: "100%",
              px: 1.5,
              py: 1.5,
              borderRadius: "12px",
              justifyContent: "flex-start",
              transition: "background 0.15s",
              opacity: isDisabled ? 0.4 : 1,
              cursor: isDisabled ? "not-allowed" : "pointer",
              bgcolor: isSelected ? "rgba(6, 182, 212, 0.15)" : "transparent",
              "&:hover": {
                bgcolor: isDisabled
                  ? "transparent"
                  : isSelected
                    ? "rgba(6, 182, 212, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <TokenIcon token={token} size={36} />
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {token.currency}
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}
              >
                ${formatPrice(token.price)}
              </Typography>
            </Box>
            {isSelected && (
              <Box
                sx={{
                  ml: "auto",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
