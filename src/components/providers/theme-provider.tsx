"use client";

import { useEffect } from "react";

import { usePlaygroundStore } from "@/state/playground-store";
import { themePresets } from "@/tokens/theme";

function applyTheme(mode: keyof typeof themePresets) {
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = usePlaygroundStore((state) => state.themeMode);

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  return <>{children}</>;
}
