"use client";

import { Button } from "@/components/ui";
import { usePlaygroundStore } from "@/state/playground-store";
import { themeModeLabels, type ThemeMode } from "@/tokens/theme";

const modes: ThemeMode[] = ["dark", "soft"];

export function ThemeModeToggle() {
  const themeMode = usePlaygroundStore((state) => state.themeMode);
  const setThemeMode = usePlaygroundStore((state) => state.setThemeMode);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {modes.map((mode) => (
        <Button
          key={mode}
          size="sm"
          variant={themeMode === mode ? "primary" : "secondary"}
          onClick={() => setThemeMode(mode)}
        >
          {themeModeLabels[mode]}
        </Button>
      ))}
    </div>
  );
}
