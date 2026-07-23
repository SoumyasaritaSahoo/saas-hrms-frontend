"use client";

import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";
// NOTE: the source theme.ts imported "@mui/x-date-pickers/themeAugmentation"
// (for the MuiPickerDay style override below) purely for date-picker
// theming used by other, unported feature screens. Dropped here along with
// the @mui/x-date-pickers dependency itself — the auth/login/forgot/reset
// forms never render a date picker.

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const brand = {
  primary: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED",
    700: "#6D28D9",
    800: "#5B21B6",
    900: "#4C1D95",
  },

  navy: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8",
    500: "#6366F1",
    600: "#4F46E5",
    700: "#4338CA",
    800: "#312E81",
    900: "#0B1026",
  },

  neutral: {
    50: "#FAFAFC",
    100: "#F4F4F8",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#06B6D4",
};

// ─── Brand Gradients ─────────────────────────────────────────────────────────
export const gradients = {
  primary: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",

  primaryHover: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",

  dark: "linear-gradient(155deg, #111827 0%, #050816 100%)",

  darkSubtle: "linear-gradient(155deg, #1A1F35 0%, #0B1026 100%)",

  primaryTint: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",

  navyTint: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
};

// ─── Theme Factory ────────────────────────────────────────────────────────────
export function buildTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        light: brand.primary[300],
        main: brand.primary[500],
        dark: brand.primary[700],
        contrastText: "#ffffff",
      },

      secondary: {
        light: brand.navy[400],
        main: brand.navy[600],
        dark: brand.navy[800],
        contrastText: "#ffffff",
      },

      success: { main: brand.success },
      warning: { main: brand.warning },
      error: { main: brand.error },
      info: { main: brand.info },

      background: {
        default: isDark ? "#030712" : "#F8FAFC",
        paper: isDark ? "#0B1026" : "#FFFFFF",
      },

      text: {
        primary: isDark ? "#F8FAFC" : "#111827",
        secondary: isDark ? "#CBD5E1" : "#64748B",
        disabled: isDark ? "#64748B" : "#94A3B8",
      },

      divider: isDark ? "rgba(255,255,255,.08)" : "rgba(15,23,42,.08)",
    },

    // ─── Typography ───────────────────────────────────────────────
    typography: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,

      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: "-0.015em",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h4: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
      h5: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
      h6: { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.5 },

      body1: { fontSize: "0.9375rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.6 },
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
      },
      overline: {
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
      button: {
        fontWeight: 600,
        letterSpacing: "0.01em",
        textTransform: "none",
      },
    },

    shape: { borderRadius: 10 },

    shadows: [
      "none",
      isDark ? "0 1px 2px rgba(0,0,0,0.4)" : "0 1px 2px rgba(16,19,31,0.06)",
      isDark ? "0 2px 6px rgba(0,0,0,0.45)" : "0 2px 6px rgba(16,19,31,0.08)",
      isDark ? "0 4px 12px rgba(0,0,0,0.5)" : "0 4px 12px rgba(16,19,31,0.10)",
      isDark ? "0 8px 24px rgba(0,0,0,0.55)" : "0 8px 24px rgba(16,19,31,0.12)",
      isDark
        ? "0 16px 40px rgba(0,0,0,0.6)"
        : "0 16px 40px rgba(16,19,31,0.14)",
      ...Array(19).fill("none"),
    ] as any,

    // ─── Component Overrides ──────────────────────────────────────
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*, *::before, *::after": { boxSizing: "border-box" },
          html: { scrollBehavior: "smooth" },
          body: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: isDark ? brand.neutral[300] : brand.neutral[600],
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: ({ ownerState }: any) => ({
            padding: ownerState.size === "small" ? "5px 14px" : "10px 16px",

            transition: "all .2s ease",

            "&:active": {
              transform: "scale(.98)",
            },
          }),

          contained: ({ ownerState }: any) => ({
            ...(ownerState.color === "primary" && {
              background: gradients.primary,

              "&:hover": {
                background: gradients.primaryHover,
                boxShadow: "0 8px 24px rgba(139,92,246,.35)",
              },
            }),

            ...(ownerState.color === "secondary" && {
              background: gradients.darkSubtle,

              "&:hover": {
                background: gradients.dark,
                boxShadow: "0 8px 24px rgba(79,70,229,.25)",
              },
            }),
          }),

          outlined: ({ ownerState }: any) => ({
            ...(ownerState.color === "primary" && {
              borderColor: brand.primary[500],
              color: brand.primary[600],

              "&:hover": {
                backgroundColor: brand.primary[50],
                borderColor: brand.primary[600],
              },
            }),
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",

            backgroundColor: isDark ? "#0B1026" : "#FFFFFF",

            border: isDark
              ? "1px solid rgba(255,255,255,.06)"
              : "1px solid rgba(15,23,42,.06)",

            borderRadius: 14,
          },
        },
      },

      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },

        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#030712" : "#FFFFFF",

            color: isDark ? "#F8FAFC" : "#111827",

            borderBottom: `1px solid ${isDark ? brand.neutral[800] : brand.neutral[200]}`,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },

        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,

              "& fieldset": {
                borderColor: isDark
                  ? "rgba(255,255,255,.10)"
                  : "rgba(15,23,42,.12)",
              },

              "&:hover fieldset": {
                borderColor: brand.primary[400],
              },

              "&.Mui-focused fieldset": {
                borderColor: brand.primary[500],
                borderWidth: 2,
              },
            },

            "& .MuiInputLabel-root.Mui-focused": {
              color: brand.primary[500],
            },
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 14 },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: isDark ? brand.neutral[500] : brand.neutral[400],

            "&.Mui-checked": {
              color: brand.primary[500],
            },
          },
        },
      },

      MuiRadio: {
        styleOverrides: {
          root: {
            color: isDark ? brand.neutral[500] : brand.neutral[400],

            "&.Mui-checked": {
              color: brand.primary[500],
            },
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            backgroundColor: isDark ? brand.navy[800] : "#ffffff",
            border: `1px solid ${isDark ? brand.navy[700] : brand.neutral[200]}`,
          },
        },
      },

      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 6,
            fontSize: "0.75rem",
            backgroundColor: isDark ? brand.navy[700] : brand.neutral[800],
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500, borderRadius: 6 },
          sizeSmall: { borderRadius: 4 },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isDark ? brand.neutral[300] : brand.neutral[600],
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          icon: {
            color: isDark ? brand.neutral[400] : brand.neutral[500],
          },
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: isDark ? brand.neutral[400] : brand.neutral[600],
            minWidth: 40,
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? brand.navy[800] : brand.neutral[50],
            "& .MuiTableCell-head": {
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isDark ? brand.neutral[300] : brand.neutral[500],
            },
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,

            "&.Mui-selected": {
              backgroundColor: isDark
                ? "rgba(139,92,246,.18)"
                : "rgba(139,92,246,.10)",

              color: brand.primary[600],

              "& .MuiListItemIcon-root": {
                color: brand.primary[500],
              },
            },

            "&.Mui-selected:hover": {
              backgroundColor: isDark
                ? "rgba(139,92,246,.25)"
                : "rgba(139,92,246,.15)",
            },
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${isDark ? brand.neutral[800] : brand.neutral[200]}`,
            backgroundColor: isDark ? "#030712" : "#ffffff",
          },
        },
      },
    },
  });
}
