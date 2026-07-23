"use client";

import { useState, useRef, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import OnboardingInput from "./OnboardingInput";
import StepActionBar from "./StepActionBar";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props {
  firstName: string;
  onNext: (lastName: string) => void;
  defaultValue?: string;
}

export default function StepLastName({
  firstName,
  onNext,
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { trans } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!value.trim()) {
      setError(trans.lastNameError);
      return;
    }
    onNext(value.trim());
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
          {trans.niceToMeetYou.replace("{name}", firstName)}
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
          {trans.onboardingStep2}
        </AppTypography>
      </Box>

      <OnboardingInput
        inputRef={inputRef}
        placeholder={trans.eGDoe}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError("");
        }}
        onKeyDown={handleKeyDown}
        error={error}
      />

      <StepActionBar onNext={handleSubmit} />
    </Box>
  );
}
