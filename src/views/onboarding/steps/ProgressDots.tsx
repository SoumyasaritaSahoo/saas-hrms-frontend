"use client";

import { Stack, Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

interface Props {
  current: number;
  total: number;
  completed?: number;
}

export default function ProgressDots({ current, total, completed = 0 }: Props) {
  const theme = useTheme();

  return (
    <Stack direction="row" useFlexGap sx={{ gap: "8px", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const isCompleted = idx <= completed;
        const isCurrent = idx === current;
        return (
          <Box
            key={i}
            sx={{
              width: isCurrent ? 24 : 6,
              height: 6,
              borderRadius: 999,
              background: isCompleted && !isCurrent
                ? theme.palette.primary.main
                : isCurrent
                  ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                  : alpha(theme.palette.text.primary, 0.12),
              transition: "all 0.3s ease",
            }}
          />
        );
      })}
    </Stack>
  );
}
