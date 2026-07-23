"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactNode } from "react";

type AppTextFieldProps = TextFieldProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export default function AppTextField({
  startIcon,
  endIcon,
  sx,
  value,
  ...props
}: AppTextFieldProps) {
  return (
    <TextField
      fullWidth
      value={value ?? ""}
      {...props}
      slotProps={{
        htmlInput: {
          spellCheck: false,
          autoCorrect: "off",
          autoCapitalize: "none",
          ...(props as any).slotProps?.htmlInput,
        },
        input: {
          ...(startIcon && {
            startAdornment: (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
          }),
          ...(endIcon && {
            endAdornment: (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ),
          }),
          ...(props as any).slotProps?.input,
        },
      }}
      sx={[
        {
          // ── Root input wrapper ──────────────────────────────────────────
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.paper",
            color: "text.primary",

            "& fieldset": {
              borderColor: "divider",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },

          // ── Placeholder ─────────────────────────────────────────────────
          "& input::placeholder": {
            color: "text.disabled",
            opacity: 1,
          },

          // ── Autofill — uses CSS vars so it respects dark/light mode ─────
          "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
            {
              WebkitBoxShadow:
                "0 0 0 1000px var(--mui-palette-background-paper) inset !important",
              WebkitTextFillColor: "var(--mui-palette-text-primary) !important",
              caretColor: "var(--mui-palette-text-primary) !important",
              // Prevent Chrome from flipping the background on its own timeline
              transition: "background-color 50000s ease-in-out 0s",
            },
        },
        // Allow callers to extend / override via sx prop
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
