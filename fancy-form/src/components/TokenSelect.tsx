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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Token } from "../types";
import { formatPrice } from "../utils/format";

interface TokenSelectProps {
  tokens: Token[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export function TokenSelect({
  tokens,
  value,
  onChange,
  label,
  id,
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
    [onChange]
  );

  return (
    <>
      {/* Trigger Button */}
      <Box>
        {label && (
          <Typography
            component="label"
            htmlFor={id}
            sx={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "grey.600",
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
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 1,
            px: 2,
            height: 56,
            borderRadius: 3,
            bgcolor: "white",
            border: "1px solid",
            borderColor: "grey.300",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "rgba(236, 72, 153, 0.04)",
            },
            width: { xs: "100%", sm: 180 },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {selectedToken && <TokenIcon token={selectedToken} size={24} />}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                color: "grey.800",
              }}
            >
              {selectedToken?.currency || "Select"}
            </Typography>
          </Stack>
          <KeyboardArrowDownIcon sx={{ color: "grey.500", fontSize: 20 }} />
        </ButtonBase>
      </Box>

      {/* Token Select Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "80vh",
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
          <Typography variant="h6" fontWeight={600}>
            Select a token
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {/* Search Input */}
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
                      <SearchIcon sx={{ color: "grey.400" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "grey.50",
                },
              }}
            />
          </Box>

          {/* Token List */}
          <Box
            sx={{
              maxHeight: 350,
              overflow: "auto",
              px: 1,
              pb: 1,
            }}
          >
            {filteredTokens.length === 0 ? (
              <Typography color="grey.500" textAlign="center" sx={{ py: 4 }}>
                No tokens found
              </Typography>
            ) : (
              filteredTokens.map((token) => (
                <ButtonBase
                  key={token.currency}
                  onClick={() => handleSelect(token.currency)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    width: "100%",
                    px: 1.5,
                    py: 1.5,
                    borderRadius: 2,
                    justifyContent: "flex-start",
                    transition: "background 0.15s",
                    bgcolor:
                      token.currency === value
                        ? "rgba(236, 72, 153, 0.08)"
                        : "transparent",
                    "&:hover": {
                      bgcolor:
                        token.currency === value
                          ? "rgba(236, 72, 153, 0.12)"
                          : "grey.100",
                    },
                  }}
                >
                  <TokenIcon token={token} size={36} />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "grey.800",
                        lineHeight: 1.2,
                      }}
                    >
                      {token.currency}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "grey.500",
                      }}
                    >
                      ${formatPrice(token.price)}
                    </Typography>
                  </Box>
                  {token.currency === value && (
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
              ))
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

const FALLBACK_ICON = "/cat.svg";

function TokenIcon({ token, size = 24 }: { token: Token; size?: number }) {
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
        bgcolor: "grey.200",
        objectFit: "cover",
      }}
      onError={hasError ? undefined : handleError}
    />
  );
}
