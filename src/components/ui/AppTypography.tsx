"use client";

import { useTheme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

type Variant =
  | "pageTitle"
  | "pageSubtitle"
  | "sectionTitle"
  | "cardTitle"
  | "cardSubtitle"
  | "label"
  | "helperText"
  | "navItem"
  | "overline"
  | "body"
  | "bodySmall"
  | "caption"
  | "link";

type AppTypographyProps = TypographyProps & {
  brandVariant?: Variant;
};

export default function AppTypography({
  brandVariant,
  sx,
  children,
  ...props
}: AppTypographyProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const p = theme.palette.primary;

  const colors = {
    strong: "var(--typography-strong)",
    primary: "var(--typography-primary)",
    secondary: "var(--typography-secondary)",
    muted: "var(--typography-muted)",
    faint: "var(--typography-faint)",
    accent: p.main,
    accentHover: isDark ? p.light : p.dark,
  };

  const styles: Record<Variant, object> = {
    pageTitle: {
      fontSize: { xs: "1.375rem", md: "1.625rem" },  // was 2rem — calmer
      fontWeight: 700,                                 // was 800 — less punchy
      letterSpacing: "-0.025em",
      lineHeight: 1.25,
      color: colors.strong,
    },
    pageSubtitle: {
      fontSize: "0.9375rem",
      fontWeight: 400,
      letterSpacing: "0em",
      lineHeight: 1.65,
      color: colors.secondary,
    },
    sectionTitle: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "-0.015em",
      lineHeight: 1.35,
      color: colors.strong,
    },
    cardTitle: {
      fontSize: "0.9375rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
      color: colors.primary,
    },
    cardSubtitle: {
      fontSize: "0.8125rem",
      fontWeight: 400,
      lineHeight: 1.6,
      color: colors.secondary,
    },
    label: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      lineHeight: 1.4,
      color: colors.muted,
    },
    helperText: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.55,
      color: colors.faint,
    },
    navItem: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "-0.005em",
      lineHeight: 1.4,
      color: colors.primary,
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      lineHeight: 1.4,
      color: colors.muted,
    },
    body: {
      fontSize: "0.9375rem",
      fontWeight: 400,
      letterSpacing: "0em",
      lineHeight: 1.7,
      color: colors.primary,
    },
    bodySmall: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
      color: colors.secondary,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: colors.faint,
    },
    link: {
      fontSize: "inherit",
      fontWeight: 500,
      color: colors.accent,
      cursor: "pointer",
      textDecoration: "none",
      transition: "color 0.15s ease",
      "&:hover": {
        color: colors.accentHover,
        textDecoration: "underline",
        textUnderlineOffset: "3px",
      },
    },
  };

  const brandStyles = brandVariant ? styles[brandVariant] : {};

  return (
    <Typography {...props} sx={{ ...brandStyles, ...sx }}>
      {children}
    </Typography>
  );
}
