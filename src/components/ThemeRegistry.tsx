"use client";

import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme } from "@/lib/theme";
import { useColorScheme } from "./ColorSchemeContext";

// ─── Emotion cache (SSR-safe) ─────────────────────────────────────────────────
function createEmotionCache() {
  let inserted: { name: string; isGlobal: boolean }[] = [];

  const cache = createCache({ key: "mui" });
  cache.compat = true;

  const prevInsert = cache.insert.bind(cache);
  cache.insert = (...args) => {
    const [selector, serialized, sheet, isGlobal] = args;
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push({ name: serialized.name, isGlobal });
    }
    return prevInsert(selector, serialized, sheet, isGlobal);
  };

  const flush = () => {
    const styles = inserted;
    inserted = [];
    return styles;
  };

  return { cache, flush };
}

// ─── ThemeRegistry ────────────────────────────────────────────────────────────
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useColorScheme();
  const theme = React.useMemo(() => buildTheme(mode), [mode]);

  const [{ cache, flush }] = React.useState(createEmotionCache);

  useServerInsertedHTML(() => {
    const styles = flush();
    if (!styles.length) return null;
    let css = "";
    for (const { name, isGlobal } of styles) {
      const cssText = cache.inserted[name];
      if (typeof cssText !== "boolean") {
        css += isGlobal ? cssText : `.css-${name}{${cssText}}`;
      }
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${styles.map((s) => s.name).join(" ")}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
