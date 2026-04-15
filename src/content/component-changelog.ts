import type { PlaygroundComponent } from "@/state/playground-store";

export type ComponentTimelineEntry = {
  version: string;
  date: string;
  summary: string;
  changes: string[];
};

export const componentTimeline: Record<PlaygroundComponent, ComponentTimelineEntry[]> = {
  button: [
    {
      version: "1.1.0",
      date: "2026-04-15",
      summary: "Aligned button styles with monochrome token system.",
      changes: ["Updated spacing scale", "Added ghost hover contrast tuning"],
    },
    {
      version: "1.0.0",
      date: "2026-04-14",
      summary: "Initial release with primary/secondary/ghost variants.",
      changes: ["Introduced size options", "Exposed disabled state"],
    },
  ],
  input: [
    {
      version: "1.0.1",
      date: "2026-04-15",
      summary: "Added focus ring token integration.",
      changes: ["Unified placeholder color", "Improved dark mode readability"],
    },
    {
      version: "1.0.0",
      date: "2026-04-14",
      summary: "Initial input primitive with controlled/uncontrolled support.",
      changes: ["Base text/email/password usage"],
    },
  ],
  badge: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Introduced status badge variants for compact metadata.",
      changes: ["Added solid/outline/muted variants", "Added size scale sm/md"],
    },
  ],
  switch: [
    {
      version: "1.1.0",
      date: "2026-04-15",
      summary: "Improved accessibility attributes and controlled mode handling.",
      changes: ["Added aria-labelledby wiring", "Polished disabled behavior"],
    },
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial switch primitive.",
      changes: ["Added defaultChecked and checked support"],
    },
  ],
  checkbox: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial checkbox primitive with label support.",
      changes: ["Added hidden native input pattern"],
    },
  ],
  textarea: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial textarea primitive.",
      changes: ["Added token-based focus and disabled states"],
    },
  ],
  label: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial label primitive with optional marker.",
      changes: ["Added `(optional)` helper slot"],
    },
  ],
  separator: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial horizontal/vertical separator primitive.",
      changes: ["Introduced orientation prop"],
    },
  ],
  link: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial link primitive with internal/external routing behavior.",
      changes: ["Auto-detected external links", "Applied consistent focus style"],
    },
  ],
  card: [
    {
      version: "1.0.0",
      date: "2026-04-15",
      summary: "Initial card composition API.",
      changes: ["Added CardHeader/Content/Footer subcomponents"],
    },
  ],
};
