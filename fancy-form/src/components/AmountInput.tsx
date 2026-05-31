import { TextField } from "@mui/material";
import { useCallback } from "react";
import { formatAmountWithCommas, parseAmountFromCommas } from "../utils/format";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export function AmountInput({
  value,
  onChange,
  disabled,
  error,
}: AmountInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseAmountFromCommas(e.target.value);
      if (rawValue === "" || /^[0-9]*\.?[0-9]*$/.test(rawValue)) {
        onChange(rawValue);
      }
    },
    [onChange],
  );

  return (
    <TextField
      value={formatAmountWithCommas(value)}
      onChange={handleChange}
      placeholder="0.0"
      fullWidth
      disabled={disabled}
      error={error}
      variant="standard"
      slotProps={{
        input: {
          disableUnderline: true,
          sx: {
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: 500,
            color: "#ffffff",
            "&::placeholder": {
              color: "rgba(255, 255, 255, 0.3)",
            },
          },
        },
      }}
      sx={{
        flex: 1,
        "& .MuiInput-root": {
          bgcolor: "transparent",
        },
      }}
    />
  );
}
