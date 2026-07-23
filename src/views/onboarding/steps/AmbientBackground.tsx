"use client";

import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function AmbientBackground() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        bgcolor: isDark ? alpha(theme.palette.background.paper, 0.5) : alpha(theme.palette.primary.light, 0.2),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 501.39,
          height: 501.39,
          left: -80.14,
          top: -101.07,
          background: `radial-gradient(ellipse 70.71% 70.71% at 50% 50%, ${alpha(theme.palette.primary.main, 0.13)} 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 476.65,
          height: 476.65,
          right: -80,
          bottom: -40,
          background: `radial-gradient(ellipse 70.71% 70.71% at 50% 50%, ${alpha(theme.palette.warning.main, 0.09)} 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300.81,
          height: 300.81,
          right: 200,
          bottom: 100,
          background: `radial-gradient(ellipse 70.71% 70.71% at 50% 50%, ${alpha(theme.palette.info.main, 0.13)} 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

    </Box>
  );
}
