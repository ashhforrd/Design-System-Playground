/**
 * Minimal black & white design tokens. Two presets:
 * - dark: default, near-black canvas
 * - soft: quiet gray (still monochrome)
 */
export const themePresets = {
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    surface: "#141414",
    surfaceHover: "#1f1f1f",
    mutedForeground: "#a3a3a3",
    brand: "#fafafa",
    brandHover: "#e5e5e5",
    textOnBrand: "#0a0a0a",
    neutralBorder: "#2e2e2e",
    inputBg: "#0a0a0a",
    inputPlaceholder: "#737373",
    focusRing: "rgba(250, 250, 250, 0.22)",
    radiusSm: "0.5rem",
    radiusMd: "1rem",
  },
  soft: {
    background: "#f4f4f5",
    foreground: "#18181b",
    surface: "#ffffff",
    surfaceHover: "#fafafa",
    mutedForeground: "#71717a",
    brand: "#18181b",
    brandHover: "#27272a",
    textOnBrand: "#fafafa",
    neutralBorder: "#e4e4e7",
    inputBg: "#ffffff",
    inputPlaceholder: "#a1a1aa",
    focusRing: "rgba(24, 24, 27, 0.14)",
    radiusSm: "0.5rem",
    radiusMd: "1rem",
  },
} as const;

export type ThemeMode = keyof typeof themePresets;

export const themeModeLabels: Record<ThemeMode, string> = {
  dark: "Dark",
  soft: "Soft",
};
