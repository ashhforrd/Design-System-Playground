# Design System Playground

Minimal, monochrome design system playground built with Next.js and Storybook.

## Quality Gate Status

[![Chromatic](https://github.com/<your-username>/<your-repo>/actions/workflows/chromatic.yml/badge.svg)](https://github.com/<your-username>/<your-repo>/actions/workflows/chromatic.yml)

This project uses a visual regression workflow with Chromatic. Every pull request can publish Storybook and run snapshot comparison checks.

## Core Features

- Interactive `/playground` with tabs: `Preview`, `Code`, `Real Case`, `History`
- TypeScript prop docs auto-generated from component source
- Component version timeline per primitive
- Storybook catalog for isolated component development
- Monochrome theme presets: dark (default) and soft

## Getting Started

```bash
npm install
npm run docs:generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the app and [http://localhost:6006](http://localhost:6006) for Storybook.

## Useful Scripts

- `npm run dev` - Start Next.js app
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook static output
- `npm run chromatic` - Publish Storybook to Chromatic (requires token)
- `npm run docs:generate` - Regenerate TypeScript props docs
- `npm run lint && npm test && npm run build` - Full local quality checks

## Chromatic Setup

1. Create a Chromatic project and get your project token.
2. Add repository secret: `CHROMATIC_PROJECT_TOKEN`.
3. Push or open a pull request to trigger `.github/workflows/chromatic.yml`.

After setup, replace `<your-username>/<your-repo>` in the badge URL above.
