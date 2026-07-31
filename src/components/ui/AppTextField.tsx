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
            transition: "box-shadow .2s ease, transform .2s ease",

            "& fieldset": {
              borderColor: "divider",
              transition: "border-color .2s ease",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused": {
              boxShadow: (theme) =>
                `0 0 0 3px ${theme.palette.mode === "dark" ? "rgba(139,92,246,0.25)" : "rgba(99,102,241,0.14)"}`,
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "1.5px",
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
