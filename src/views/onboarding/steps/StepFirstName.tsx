"use client";

import { useState, useRef, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import OnboardingInput from "./OnboardingInput";
import StepActionBar from "./StepActionBar";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props {
  onNext: (firstName: string) => void;
  defaultValue?: string;
}

export default function StepFirstName({ onNext, defaultValue = "" }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { trans } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError(trans.firstNameError);
      return;
    }
    onNext(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
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
          {trans.hiThere}
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
          {trans.onboardingStep1}
        </AppTypography>
      </Box>

      <OnboardingInput
        inputRef={inputRef}
        placeholder={trans.eGJane}
        value={value}
        onChange={(e) => {
          setValue(e.target.value.replace(/\s/g, ""));
          setError("");
        }}
        onKeyDown={handleKeyDown}
        error={error}
      />

      <StepActionBar onNext={handleSubmit} />
    </Box>
  );
}
