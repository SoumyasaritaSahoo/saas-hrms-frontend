"use client";

import { useTheme, alpha } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type Variant = "primary" | "secondary" | "tertiary" | "danger" | "outline";

type AppButtonProps = ButtonProps & {
  brandVariant?: Variant;
  loading?: boolean;
};

export default function AppButton({
  brandVariant = "primary",
  loading = false,
  children,
  disabled,
  sx,
  ...props
}: AppButtonProps) {
  const theme = useTheme();

  const base = {
    minHeight: 45,
    borderRadius: "10px",
    textTransform: "none" as const,
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: 1,
    gap: 0.75,

    "& .MuiButton-startIcon svg, & .MuiButton-endIcon svg": {
      color: "inherit",
      fontSize: 22,
    },
  };

  const variants: Record<Variant, Record<string, any>> = {
    primary: {
      background: `linear-gradient(
        135deg,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.primary.dark} 100%
      )`,
      color: "#fff",

      boxShadow: `
        0 12px 40px ${alpha(theme.palette.primary.main, 0.22)},
        0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}
      `,

      "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: `
          0 16px 48px ${alpha(theme.palette.primary.main, 0.28)},
          0 6px 18px ${alpha(theme.palette.primary.main, 0.16)}
        `,
      },
    },
    secondary: {
      bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : "#F8FAFC",

      border: `1px solid ${
        theme.palette.mode === "dark" ? alpha("#fff", 0.08) : "#E2E8F0"
      }`,

      "&.MuiButton-root": {
        color: `${alpha(theme.palette.text.primary, 0.7)} !important`,
      },

      "&:hover": {
        bgcolor:
          theme.palette.mode === "dark" ? alpha("#fff", 0.08) : "#F1F5F9",

        "&.MuiButton-root": {
          color: `${alpha(theme.palette.text.primary, 0.7)} !important`,
        },
      },
    },
    tertiary: {
      bgcolor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,

      "&:hover": {
        bgcolor: alpha(theme.palette.text.primary, 0.03),
      },
    },
    danger: {
      backgroundColor: "#EF4444",
      color: "#fff",

      "&:hover": {
        backgroundColor: "#DC2626",
      },
    },
    outline: {
      backgroundColor: "transparent",

      color: theme.palette.primary.main,

      border: `1.5px solid ${alpha(theme.palette.primary.main, 0.45)}`,

      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.04),

        borderColor: theme.palette.primary.main,
      },
    },
  };

  const variantStyles = variants[brandVariant];

  return (
    <Button
      disabled={disabled || loading}
      {...props}
      sx={{
        ...base,
        ...variantStyles,
        "&.Mui-disabled": {
          opacity: 0.5,
          filter: "grayscale(0.15)",
        },
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress
          size={22}
          sx={{
            color:
              brandVariant === "secondary" || brandVariant === "tertiary"
                ? alpha(theme.palette.text.primary, 0.6)
                : "#fff",
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
}
