# Design System Playground

A minimal, monochrome design system workspace built with **Next.js** and **Storybook**. Browse UI primitives in a dedicated explorer, or compose them on an interactive **sandbox canvas** with drag-and-drop and a live properties panel.

## Quality Gate Status

[![Chromatic](https://github.com/<your-username>/<your-repo>/actions/workflows/chromatic.yml/badge.svg)](https://github.com/<your-username>/<your-repo>/actions/workflows/chromatic.yml)

This project uses a visual regression workflow with Chromatic. Every pull request can publish Storybook and run snapshot comparison checks.

## Core Features

### App routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with links to the explorer and the sandbox. |
| `/playground` | **Component explorer**: sidebar catalog of primitives, per-component descriptions, static and interactive showcases (variants, sizes, states), font family control, and a shortcut to the sandbox. |
| `/sandbox` | **Page builder sandbox**: drag components from a palette onto a canvas, move and stack them, edit props in the right panel, grid snap, zoom, and Alt-drag to pan. Includes a **sample layout** on first visit (and after clearing empty storage) plus a toolbar action to **reload the sample**. Canvas state is persisted in **localStorage** (with merge logic so an empty saved list does not wipe the starter demo after hydration). |

### Theming and tooling

- **Theme presets** (CSS variables on the document root): **dark** (default) and **soft**—monochrome only.
- **Storybook** for isolated development, docs, and visual tests.
- **Zustand** for playground appearance (theme, font) and sandbox canvas state.
- Optional **TypeScript prop docs** via `npm run docs:generate` (see script below).

## Getting Started

```bash
npm install
npm run docs:generate   # optional: regenerate prop docs
npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)
- Storybook: [http://localhost:6006](http://localhost:6006)

You can use **Bun** instead of npm if you prefer (`bun install`, `bun run dev`, etc.).

## Useful Scripts

- `npm run dev` — Start the Next.js app.
- `npm run build` — Production build (includes TypeScript check).
- `npm run storybook` — Start Storybook locally.
- `npm run build-storybook` — Build Storybook static output.
- `npm run chromatic` — Publish Storybook to Chromatic (requires `CHROMATIC_PROJECT_TOKEN`).
- `npm run docs:generate` — Regenerate TypeScript-oriented component docs.
- `npm run lint && npm test && npm run build` — Typical local quality pass.

## Chromatic Setup

1. Create a Chromatic project and obtain your project token.
2. Add a repository secret named `CHROMATIC_PROJECT_TOKEN`.
3. Push or open a pull request to trigger `.github/workflows/chromatic.yml`.

After setup, replace `<your-username>/<your-repo>` in the badge URL at the top of this file with your real GitHub path.
