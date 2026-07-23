"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Stack, Button, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckIcon from "@mui/icons-material/CheckOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import StepActionBar from "./StepActionBar";
import { useTranslation } from "@/contexts/TranslationContext";
import { PASSWORD_PATTERNS, PASSWORD_MIN_LENGTH } from "@/lib/passwordRules";

interface Props {
  onSubmit: (password: string) => void;
  isLoading: boolean;
}

export default function StepPassword({ onSubmit, isLoading }: Props) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { trans } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const rules = [
    { label: trans.min8Chars, key: "length" as const },
    { label: trans.uppercaseLetter, key: "uppercase" as const },
    { label: trans.number, key: "digit" as const },
    { label: trans.specialCharacter, key: "specialChar" as const },
  ];

  const ruleTest = (key: string, val: string) => {
    if (key === "length") return val.length >= PASSWORD_MIN_LENGTH;
    return PASSWORD_PATTERNS[key as keyof typeof PASSWORD_PATTERNS]?.test(val) ?? false;
  };

  const validate = (pw: string) => {
    if (!pw) return trans.pleaseCreatePassword;
    if (pw.length < PASSWORD_MIN_LENGTH) return trans.minimum8Chars;
    if (!PASSWORD_PATTERNS.uppercase.test(pw))
      return trans.mustContainUppercase;
    if (!PASSWORD_PATTERNS.digit.test(pw))
      return trans.mustContainNumber;
    if (!PASSWORD_PATTERNS.specialChar.test(pw))
      return trans.mustContainSpecial;
    return "";
  };

  const handleSubmit = () => {
    const err = validate(value);
    if (err) {
      setError(err);
      return;
    }
    onSubmit(value);
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
          {trans.almostDone}
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
          {trans.passwordCreate}
        </AppTypography>
      </Box>

      <Box sx={{ alignSelf: "stretch", pt: 4 }}>
        <Box
          sx={{
            width: "100%",
            height: 68,
            pb: 1.5,
            overflow: "hidden",
            borderBottom: `2px solid ${alpha(theme.palette.primary.light, 0.32)}`,
            position: "relative",
          }}
        >
          <Box
            component="input"
            ref={inputRef}
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
              bgcolor: "transparent",
              outline: "none",
              fontSize: 36,
              fontWeight: 300,
              fontFamily: "Inter, sans-serif",
              color: "text.primary",
              pr: 7,
              "&::placeholder": {
                color: alpha(theme.palette.text.primary, 0.18),
                opacity: 1,
                fontWeight: 300,
              },
            }}
          />
          <Button
            onClick={() => setShow(!show)}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "auto",
              p: 0.5,
              color: alpha(theme.palette.text.primary, 0.4),
              "&:hover": {
                bgcolor: "transparent",
                color: alpha(theme.palette.text.primary, 0.6),
              },
            }}
          >
            {show ? (
              <VisibilityOffIcon sx={{ fontSize: 20 }} />
            ) : (
              <VisibilityIcon sx={{ fontSize: 20 }} />
            )}
          </Button>
        </Box>
      </Box>

      {error && (
        <AppTypography
          variant="caption"
          sx={{ color: "error.main", mt: 0.75, display: "block", fontSize: 13 }}
        >
          {error}
        </AppTypography>
      )}

      {value.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ mt: 1.5, flexWrap: { xs: "wrap", md: "nowrap" } }}>
          {rules.map((r) => {
            const ok = ruleTest(r.key, value);
            return (
              <AppTypography
                key={r.key}
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: ok
                    ? theme.palette.mode === "dark"
                      ? theme.palette.success.main
                      : theme.palette.primary.main
                    : alpha(theme.palette.text.primary, 0.35),
                }}
              >
                {ok ? (
                  <CheckIcon sx={{ fontSize: 14 }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />
                )}
                {r.label}
              </AppTypography>
            );
          })}
        </Stack>
      )}

      <StepActionBar
        onNext={handleSubmit}
        nextLabel={trans.onboardingCreateAccount}
        isLoading={isLoading}
        showEnterHint={false}
      />
    </Box>
  );
}
