"use client";

import { Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";

export default function StepFooter() {
  const theme = useTheme();

  const badge = (label: string) => ({
    px: 1,
    py: 0.25,
    borderRadius: 0.5,
    bgcolor: alpha(theme.palette.text.primary, 0.05),
    outline: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
    outlineOffset: -1,
    fontSize: 10,
    fontWeight: 400,
    fontFamily: "Inter, sans-serif",
    lineHeight: "13.33px",
    color: alpha(theme.palette.text.primary, 0.25),
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3, md: 5 },
        pb: 3,
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1, sm: 0 },
      }}
    >
      <AppTypography
        sx={{
          fontSize: 11,
          fontWeight: 400,
          fontFamily: "Inter, sans-serif",
          lineHeight: "16.5px",
          color: alpha(theme.palette.text.primary, 0.2),
        }}
      >
        Protected by 256-bit SSL encryption
      </AppTypography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box component="span" sx={badge("SOC 2")}>
          SOC 2
        </Box>
        <Box component="span" sx={badge("GDPR")}>
          GDPR
        </Box>
        <Box component="span" sx={badge("ISO 27001")}>
          ISO 27001
        </Box>
      </Box>
    </Box>
  );
}
