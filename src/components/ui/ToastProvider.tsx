"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import Box from "@mui/material/Box";
import AppToast from "./AppToast";
import type { Toast, ToastType } from "./AppToast";

type ToastOptions = {
  title: string;
  description?: string;
  duration?: number;
};

type ToastContextValue = {
  toast: (type: ToastType, options: ToastOptions) => string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

const ToastContext = createContext<ToastContextValue>({
  toast: () => "",
  success: () => "",
  error: () => "",
  warning: () => "",
  info: () => "",
  dismiss: () => {},
  dismissAll: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (type: ToastType, options: ToastOptions): string => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const duration = options.duration ?? 4000;
      const toast: Toast = {
        id,
        type,
        title: options.title,
        description: options.description,
        duration,
      };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        const timer = setTimeout(() => removeToast(id), duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [removeToast],
  );

  const dismissAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toast: addToast,
        success: (title, description) =>
          addToast("success", { title, description }),
        error: (title, description) =>
          addToast("error", { title, description }),
        warning: (title, description) =>
          addToast("warning", { title, description }),
        info: (title, description) =>
          addToast("info", { title, description }),
        dismiss: removeToast,
        dismissAll,
      }}
    >
      {children}

      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <Box key={t.id} sx={{ pointerEvents: "auto" }}>
            <AppToast toast={t} onClose={removeToast} />
          </Box>
        ))}
      </Box>
    </ToastContext.Provider>
  );
}

export { ToastProvider };
