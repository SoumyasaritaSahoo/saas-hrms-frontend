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
  onNext: (email: string) => void;
  defaultValue?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BLOCKED_DOMAINS = [
  // Popular public providers
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "ymail.com",
  "rocketmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
  "yandex.com",
  "yandex.ru",
  "test.com",
  "test.in",
  // Reserved/test domains
  "example.com",
  "example.net",
  "example.org",
  "example.invalid",
  "localhost",
];

export default function StepWorkEmail({
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
      setError(trans.onboardingEmailRequired);
      return;
    }
    if (!EMAIL_REGEX.test(value.trim())) {
      setError(trans.emailInvalid);
      return;
    }
    const domain = value.trim().toLowerCase().split("@")[1];
    if (BLOCKED_DOMAINS.includes(domain)) {
      setError(trans.onboardingEmailPersonalDomain);
      return;
    }
    onNext(value.trim().toLowerCase());
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
          {trans.oneMoreThingWithName.replace("{name}", firstName)}
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
          {trans.onboardingStep4}
        </AppTypography>

        <AppTypography
          sx={{
            fontSize: 14,
            color: alpha(theme.palette.text.primary, 0.35),
            mt: 2,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {trans.weWillUseThis}
        </AppTypography>
      </Box>

      <OnboardingInput
        inputRef={inputRef}
        type="email"
        placeholder={trans.emailPlaceholder}
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
