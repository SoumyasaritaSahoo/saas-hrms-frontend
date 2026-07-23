"use client";

import { Box, useTheme } from "@mui/material";
import AppTypography from "@/components/ui/AppTypography";
import { alpha } from "@mui/material/styles";

type Props = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
  type?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

export default function OnboardingInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  error,
  type,
  inputRef,
}: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ alignSelf: "stretch", pt: 4 }}>
      <Box
        sx={{
          width: "100%",
          height: 68,
          pb: 1.5,
          overflow: "hidden",
          borderBottom: `2px solid ${alpha(theme.palette.primary.light, 0.32)}`,
        }}
      >
        <Box
          component="input"
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
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
            "&::placeholder": {
              color: alpha(theme.palette.text.primary, 0.18),
              opacity: 1,
              fontWeight: 300,
            },
          }}
        />
      </Box>
      {error && (
        <AppTypography
          variant="caption"
          sx={{ color: "error.main", mt: 0.75, display: "block", fontSize: 13 }}
        >
          {error}
        </AppTypography>
      )}
    </Box>
  );
}
