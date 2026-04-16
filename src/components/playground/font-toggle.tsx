"use client";

import { Button } from "@/components/ui";
import {
  usePlaygroundStore,
  fontFamilyLabels,
  type FontFamily,
} from "@/state/playground-store";

const fonts: FontFamily[] = ["satoshi", "manrope", "dm-sans", "poppins", "open-sans"];

export function FontToggle() {
  const fontFamily = usePlaygroundStore((state) => state.fontFamily);
  const setFontFamily = usePlaygroundStore((state) => state.setFontFamily);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {fonts.map((font) => (
        <Button
          key={font}
          size="sm"
          variant={fontFamily === font ? "primary" : "secondary"}
          onClick={() => setFontFamily(font)}
        >
          {fontFamilyLabels[font]}
        </Button>
      ))}
    </div>
  );
}
