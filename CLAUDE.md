# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint (eslint.config.mjs, Next.js ruleset)
```

No test suite is configured yet.

## Architecture

Arcade Vault is a retro-themed arcade game portal. It uses **Next.js 16** (App Router) with **React 19** and **TypeScript**. The Vercel CLI is not installed locally.

### Single-page state machine

The entire UI lives in `app/page.tsx` as one `"use client"` component. Navigation is not handled by Next.js routing — a `Pantalla` state (`"biblioteca" | "detalle" | "jugador" | "auth" | "fama"`) controls which screen renders. All screen components (`Biblioteca`, `Detalle`, `Jugador`, `Auth`, `SalonDeLaFama`, `Leaderboard`, `NavButton`) are defined in the same file.

Game data (`juegos[]`) and leaderboard scores (`marcas`) are hardcoded static constants in `page.tsx` — there is no database or API yet.

### Language convention

All domain names, variable names, and UI labels are in **Spanish** (`juego`, `pantalla`, `marca`, `jugador`, `busqueda`, etc.). Follow this convention when adding code.

### Styling

- **Tailwind v4**: imported with `@import "tailwindcss"` — not the old `@tailwind base/components/utilities` directives.
- **Custom component classes** (`.game-card`, `.pixel-button`, `.leaderboard`, `.crt-bezel`, etc.) are defined in `app/globals.css` — not in component files or Tailwind plugins.
- **Color palette** uses three neon CSS variables: `--cyan` (`#00f5ff`), `--magenta` (`#ff006e`), `--yellow` (`#f5ff00`). Keep all UI within this retro palette.
- **Fonts**: `Press Start 2P` → `--font-display` (headings/logo), `Courier Prime` → `--font-mono` (body). Both loaded via `next/font/google` in `app/layout.tsx`.

When adding new UI patterns, add the CSS class to `globals.css` following the existing style (no `@layer`, flat selectors).
