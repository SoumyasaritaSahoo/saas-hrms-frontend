"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ColorSchemeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
  setMode: (mode: PaletteMode) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  mode: "light",
  toggleMode: () => {},
  setMode: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ColorSchemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setModeState] = useState<PaletteMode>("light");

  // Sync with localStorage + system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem(
      "optihr-color-mode",
    ) as PaletteMode | null;
    let initial: PaletteMode = "light";
    if (stored) {
      initial = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initial = "dark";
    }
    setModeState(initial);
    document.documentElement.setAttribute("data-color-mode", initial);
  }, []);

  const setMode = (newMode: PaletteMode) => {
    setModeState(newMode);
    localStorage.setItem("optihr-color-mode", newMode);
    // Sync html attribute for non-MUI elements
    document.documentElement.setAttribute("data-color-mode", newMode);
  };

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <ColorSchemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useColorScheme() {
  return useContext(ColorSchemeContext);
}
