"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import CheckCircle from "@mui/icons-material/CheckCircleOutlined";
import Error from "@mui/icons-material/ErrorOutlined";
import Warning from "@mui/icons-material/WarningOutlined";
import Info from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
};

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: Error,
  warning: Warning,
  info: Info,
};

type AppToastProps = {
  toast: Toast;
  onClose: (id: string) => void;
};

export default function AppToast({ toast, onClose }: AppToastProps) {
  const theme = useTheme();
  const Icon = icons[toast.type];
  const [visible, setVisible] = useState(false);
  const accentColor = theme.palette[toast.type].main;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 1.5,
          minWidth: 320,
          maxWidth: 420,
          p: 1.5,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[4],
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: accentColor,
          },
        }}
      >
        <Icon
          sx={{
            mt: 0.25,
            fontSize: 22,
            color: accentColor,
            flexShrink: 0,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0.25 }}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontWeight: 600, lineHeight: 1.4 }}
          >
            {toast.title}
          </Typography>
          {toast.description && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ lineHeight: 1.4 }}
            >
              {toast.description}
            </Typography>
          )}
        </Box>

        <IconButton
          size="small"
          onClick={() => onClose(toast.id)}
          sx={{
            mt: -0.25,
            mr: -0.5,
            color: "text.disabled",
            "&:hover": { color: "text.primary" },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Slide>
  );
}
