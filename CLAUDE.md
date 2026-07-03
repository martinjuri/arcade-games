# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm lint     # ESLint (eslint.config.mjs, Next.js ruleset)
```

Uses **pnpm** (see `packageManager` in `package.json`) — not npm/yarn.

No test suite is configured yet.

## Skills

Always use this skill /front-design to design the user interface.

## Architecture

Arcade Vault is a retro-themed arcade game portal. It uses **Next.js 16** (App Router) with **React 19** and **TypeScript**. The Vercel CLI is not installed locally.

### Single-page state machine

The entire UI lives in `app/page.tsx` as one `"use client"` component. Navigation is not handled by Next.js routing — a `Pantalla` state (`"biblioteca" | "detalle" | "jugador" | "auth" | "fama"`) controls which screen renders. All screen components (`Biblioteca`, `TarjetaJuego`, `Detalle`, `Leaderboard`, `Jugador`, `Auth`, `SalonDeLaFama`) are defined in the same file.

Game data (`juegos[]`) and leaderboard scores (`marcas`) are hardcoded static constants in `page.tsx` — there is no database or API yet.

### Language convention

All domain names, variable names, and UI labels are in **Spanish** (`juego`, `pantalla`, `marca`, `jugador`, `busqueda`, etc.). Follow this convention when adding code.

### Styling

- **Tailwind v4** is imported with `@import "tailwindcss"` in `app/globals.css`, but the UI does not use Tailwind utility classes — it's built entirely on a bespoke design-system ported from `references/resources/templates/styles.css`. Prefer the existing custom classes over Tailwind utilities when adding markup.
- **Custom component classes** (`.card`, `.btn`, `.av-nav`, `.crt`, `.hall-table`, `.leaderboard`, etc.) are defined in `app/globals.css` — not in component files or Tailwind plugins. Note the `.auth-tabs` selector is intentionally defined twice (cascade order matters): the second block wins and its active-tab class is `.on`, not `.active`.
- **Color palette**: `--cyan` (`#00f5ff`), `--magenta` (`#ff006e`), `--yellow` (`#f5ff00`), `--green` (`#00ff88`), plus `--gold`/`--silver`/`--bronze` for rankings and `--bg`/`--bg-2`/`--bg-3`/`--ink`/`--ink-dim`/`--ink-faint` for surfaces and text. Keep all UI within this retro palette.
- **Fonts**: `Press Start 2P` → `--font-display` (headings/pixel text, used via the `--pixel` stack), `JetBrains Mono` with `Courier Prime` fallback → `--mono` (body/mono text). All three loaded via `next/font/google` in `app/layout.tsx`.

When adding new UI patterns, add the CSS class to `globals.css` following the existing style (no `@layer`, flat selectors).
