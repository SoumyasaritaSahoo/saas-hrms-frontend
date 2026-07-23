"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Button, Stack, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import OnboardingInput from "./OnboardingInput";
import StepActionBar from "./StepActionBar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props {
  onNext: (middleName: string | null) => void;
  defaultValue?: string | null;
}

export default function StepMiddleName({ onNext, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { trans } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onNext(value.trim() || null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <AppTypography
          sx={{
            fontSize: { xs: 40, md: 48 },
            fontWeight: 300,
            lineHeight: 1.2,
            color: alpha(theme.palette.text.primary, 0.85),
          }}
        >
          {trans.anyMiddleName}
        </AppTypography>

        <AppTypography
          sx={{
            fontSize: { xs: 40, md: 48 },
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.primary.main,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {trans.totallyOptional}
        </AppTypography>
      </Box>

      <OnboardingInput
        inputRef={inputRef}
        placeholder={trans.middleNameHint}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          alignContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <StepActionBar
          onNext={() => onNext(value.trim() || null)}
          nextLabel={trans.continue}
          showEnterHint={false}
        />
        <Button
          onClick={() => onNext(value.trim() || null)}
          sx={{
            bgcolor: "transparent",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            fontSize: 14,
            pt: 5,
            fontWeight: 600,
            minWidth: "auto",
            "&:hover": { bgcolor: "transparent", opacity: 0.8 },
          }}
        >
          {trans.skip}{" "}
          <ArrowForwardIcon sx={{ fontSize: 15, color: "inherit", mx: 1 }} />
        </Button>
      </Stack>
    </Box>
  );
}
