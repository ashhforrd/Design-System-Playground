import type { Preview } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { themePresets } from "../src/tokens/theme";
import "../src/app/globals.css";

type ThemeKey = keyof typeof themePresets;

const defaultTheme = "dark" satisfies ThemeKey;

const withTheme = (Story: () => JSX.Element, context: { globals: { theme?: ThemeKey } }) => {
  const current = context.globals.theme ?? defaultTheme;
  const tokens = themePresets[current] ?? themePresets[defaultTheme];

  return (
    <div
      style={
        {
          background: tokens.background,
          color: tokens.foreground,
          minHeight: "100vh",
          padding: "1rem",
          fontFamily: '"Satoshi", system-ui, sans-serif',
          "--background": tokens.background,
          "--foreground": tokens.foreground,
          "--ds-surface": tokens.surface,
          "--ds-surface-hover": tokens.surfaceHover,
          "--ds-muted-fg": tokens.mutedForeground,
          "--ds-color-brand": tokens.brand,
          "--ds-color-brand-hover": tokens.brandHover,
          "--ds-color-on-brand": tokens.textOnBrand,
          "--ds-color-neutral-border": tokens.neutralBorder,
          "--ds-input-bg": tokens.inputBg,
          "--ds-input-placeholder": tokens.inputPlaceholder,
          "--ds-focus-ring": tokens.focusRing,
          "--ds-radius-sm": tokens.radiusSm,
          "--ds-radius-md": tokens.radiusMd,
        } as CSSProperties
      }
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Minimal black & white presets",
      defaultValue: defaultTheme,
      toolbar: {
        icon: "mirror",
        items: [
          { value: "dark", title: "Dark" },
          { value: "soft", title: "Soft" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
