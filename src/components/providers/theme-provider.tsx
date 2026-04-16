"use client";

import { useEffect } from "react";

import { usePlaygroundStore, fontFamilyValues, type FontFamily } from "@/state/playground-store";
import { themePresets, type ThemeMode } from "@/tokens/theme";

function resolveThemeMode(mode: string): ThemeMode {
  if (mode === "dark" || mode === "soft") return mode;
  return "dark";
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const tokens = themePresets[mode];

  root.dataset.theme = mode;
  root.style.setProperty("--background", tokens.background);
  root.style.setProperty("--foreground", tokens.foreground);
  root.style.setProperty("--ds-surface", tokens.surface);
  root.style.setProperty("--ds-surface-hover", tokens.surfaceHover);
  root.style.setProperty("--ds-muted-fg", tokens.mutedForeground);
  root.style.setProperty("--ds-color-brand", tokens.brand);
  root.style.setProperty("--ds-color-brand-hover", tokens.brandHover);
  root.style.setProperty("--ds-color-on-brand", tokens.textOnBrand);
  root.style.setProperty("--ds-color-neutral-border", tokens.neutralBorder);
  root.style.setProperty("--ds-input-bg", tokens.inputBg);
  root.style.setProperty("--ds-input-placeholder", tokens.inputPlaceholder);
  root.style.setProperty("--ds-focus-ring", tokens.focusRing);
  root.style.setProperty("--ds-radius-sm", tokens.radiusSm);
  root.style.setProperty("--ds-radius-md", tokens.radiusMd);
}

function applyFont(font: FontFamily) {
  const root = document.documentElement;
  const fontValue = fontFamilyValues[font];
  root.style.setProperty("--font-sans", fontValue);
  document.body.style.fontFamily = fontValue;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = usePlaygroundStore((state) => state.themeMode);
  const fontFamily = usePlaygroundStore((state) => state.fontFamily);

  useEffect(() => {
    applyTheme(resolveThemeMode(themeMode));
  }, [themeMode]);

  useEffect(() => {
    applyFont(fontFamily);
  }, [fontFamily]);

  return <>{children}</>;
}
