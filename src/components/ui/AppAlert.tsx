"use client";

import CheckCircle from "@mui/icons-material/CheckCircleOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import Alert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

type AppAlertProps = Omit<MuiAlertProps, "severity" | "variant"> & {
  type?: AlertType;
  title?: string;
  dismissible?: boolean;
  onClose?: () => void;
};

const icons: Record<AlertType, typeof CheckCircle> = {
  success: TaskAltOutlinedIcon,
  error: ErrorOutlineOutlinedIcon,
  warning: ReportProblemOutlinedIcon,
  info: InfoOutlinedIcon,
};

export default function AppAlert({
  type = "info",
  title,
  dismissible,
  children,
  onClose,
  sx,
  ...props
}: AppAlertProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const Icon = icons[type];
  const isDark = theme.palette.mode === "dark";

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  if (!open) return null;

  const mainColor = theme.palette[type].main;

  return (
    <Alert
      severity={type}
      icon={<Icon sx={{ color: mainColor }} />}
      action={
        dismissible ? (
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : undefined
      }
      sx={{
        borderRadius: 1,
        border: `1px solid ${mainColor}`,
        bgcolor: isDark ? alpha(mainColor, 0.2) : alpha(mainColor, 0.1),
        color: mainColor,
        boxShadow: theme.shadows[1],

        "& .MuiAlert-message": {
          width: "100%",
        },

        ...sx,
      }}
    >
      {title && (
        <AlertTitle
          sx={{
            color: "text.primary",
            fontWeight: 700,
            mb: 0.25,
            fontSize: "0.875rem",
          }}
        >
          {title}
        </AlertTitle>
      )}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.6 }}
      >
        {children}
      </Typography>
    </Alert>
  );
}
