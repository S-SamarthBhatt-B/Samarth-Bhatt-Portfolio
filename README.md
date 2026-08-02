# SamarthOS

An interactive, terminal-based OS-style portfolio for Samarth Bhatt. Boot sequence → custom terminal shell → optional graphical portfolio mode.

## Stack
React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion · Zustand

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)
This repo auto-deploys via **GitHub Actions** on every push to `main` (see `.github/workflows/deploy.yml`).

One-time setup after pushing:
1. Go to your repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow builds and publishes `dist/` automatically.

Your site will be live at:
```
https://<your-username>.github.io/Samarth-Bhatt-Portfolio/
```

> ⚠️ If you rename the repo, update `base` in `vite.config.ts` to match exactly (case-sensitive).

### Manual fallback deploy
```bash
npm run deploy
```
This uses `gh-pages` to push `dist/` to a `gh-pages` branch directly, if you ever want to deploy without Actions.

## Project status
Built in phases — see project architecture notes. Current phase: **Phase 1 — Scaffold**.
