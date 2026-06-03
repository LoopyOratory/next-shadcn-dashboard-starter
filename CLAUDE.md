# Project: Admin Dashboard (TanStack Start + Shadcn UI)

## Overview

This is a TanStack Start port of [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter) by Kiranism. The original Next.js 16 + Clerk project was migrated to TanStack Start + Better Auth while preserving the full shadcn UI, component architecture, and dashboard layout.

**Author:** LoopyOratory
**Original Creator:** Kiranism
**License:** MIT

## Tech Stack

| Category | Library |
|---|---|
| Framework | TanStack Start (Vite 6 + Nitro + TanStack Router) |
| Runtime | Bun 1.3+ |
| Auth | Better Auth (SQLite, email/password) |
| Styling | Tailwind CSS v4 + shadcn/ui (New York style) |
| Light/Dark | next-themes (ThemeProvider — `attribute='class'`, `defaultTheme='system'`, `enableSystem`) |
| Design Themes | Custom `ActiveThemeProvider` with `data-theme` attribute, 13 themes |
| Data Fetching | TanStack React Query (server prefetch + `HydrationBoundary` + `useSuspenseQuery`) |
| Tables | TanStack Table with URL-synced state |
| Forms | TanStack Form + Zod |
| State | Zustand |
| Charts | Recharts |
| Command Palette | KBar |
| Lint/Format | OxLint / Oxfmt |

## Key Files

- `vite.config.ts` — Vite config (TanStack Start plugin, Tailwind, React, tsconfigPaths)
- `src/client.tsx` — Client entry (`hydrateRoot` with `StartClient`)
- `src/ssr.tsx` — SSR entry (`createStartHandler` + `defaultStreamHandler`)
- `src/start.ts` — Server start config
- `src/router.tsx` — Router with `scrollRestoration: true`
- `src/app/__root.tsx` — Root layout (ThemeProvider → ActiveThemeProvider → QueryProvider → Outlet)
- `src/app/dashboard/route.tsx` — Dashboard layout (SidebarProvider → KBar → Sidebar + Header + Outlet)
- `src/lib/auth.ts` — Better Auth server instance (SQLite via `better-sqlite3`)
- `src/lib/auth-client.ts` — Better Auth client SDK
- `src/lib/auth-functions.ts` — `getSession()` helper for route guards
- `src/app/api/auth/$.ts` — Better Auth catch-all handler
- `src/styles/globals.css` — Main CSS (Tailwind imports, `:root`/`.dark` variables, `@theme inline`, `@import theme.css`)
- `src/styles/theme.css` — Imports all 13 theme CSS files
- `scripts/migrate.cjs` — Database migration (Node.js, uses `better-sqlite3`)

## Migration Details (Next.js → TanStack Start)

### Framework
- Removed: `next`, `@sentry/nextjs`, `@clerk/nextjs`, `@clerk/tanstack-react-start`, `@tailwindcss/postcss`, `postcss`
- Deleted: `next.config.ts`, `postcss.config.js`, `src/proxy.ts`, `src/instrumentation.ts`
- Added: `@tanstack/react-start`, `@tanstack/react-router`, `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths`
- All 30+ route files converted from `export default function Page()` to `export const Route = createFileRoute(...)`
- Parallel Next.js routes inlined into single files
- `useRouter()` → `useNavigate()`, `usePathname()` → `useLocation().pathname`
- `import Link from` → `import { Link } from '@tanstack/react-router'`
- `<Link href={}>` → `<Link to={}>` for internal links
- `<a>` kept for external URLs (GitHub, mailto, etc.)

### Auth (Clerk → Better Auth)
- Removed all `@clerk/` imports, `<ClerkProvider>`, `<SignIn>`, `<SignUp>`, `<OrganizationList>`, `<OrganizationProfile>`, `<Protect>`, `<PricingTable>`
- Replaced with custom shadcn forms using `authClient.signIn.email()` / `authClient.signUp.email()`
- Better Auth configured with SQLite (`better-sqlite3`, NOT `bun:sqlite` — Vite SSR workers are Node.js)
- Database at `data/auth.db` with tables: `user`, `session`, `account`, `verification`
- Sign out requires `await authClient.signOut()` then `navigate({ to: '/auth/sign-in' })` — Better Auth doesn't redirect automatically
- Session guard: `getSession()` in route `beforeLoad`
- Org-switcher, billing, exclusive, workspaces pages simplified (Clerk org hooks removed)
- Default credentials: `admin@example.com` / `password123`

### Search Params (nuqs → TanStack Router)
- Removed: `nuqs` package, `src/lib/searchparams.ts`, `src/lib/parsers.ts`
- `useDataTable` hook rewritten to use `useLocation().searchStr` + `useNavigate()` + native `URLSearchParams`
- `UsersTable` / `ProductTable` use `useLocation().searchStr` directly
- `user-listing.tsx` / `product-listing.tsx` renamed to `.server.tsx` and use `getWebRequest()` from `@tanstack/react-start/server`
- Route `beforeLoad` no longer calls `searchParamsCache.parse()` — removed
- `FilterItemSchema` type inlined into `src/types/data-table.ts`

### Images / Fonts
- Removed `next/image`, `@next/font`
- Replaced with `@unpic/react` for images
- Fonts loaded via CSS `@import` or theme font variables

## UI Fixes Applied

### Theme System Cascade Fix
- **Problem:** Theme files loaded before `:root` block in `globals.css` — `:root` variables always overrode themes
- **Fix:** Moved `@import './theme.css'` to END of `globals.css` (after `:root`, `.dark`, and `@theme inline`)

### Radius Token Conflict Fix
- **Problem:** Theme files had duplicate `@theme inline` blocks with wrong radius calculations (e.g., `calc(var(--radius) - 4px)` instead of shadcn's `calc(var(--radius) * 0.6)`)
- **Fix:** Stripped all `@theme inline` blocks from 13 theme files. Added font/shadow tokens to the single `@theme inline` in `globals.css`. All mapping now goes through `var()` cascading.

### Dark Mode Color Tint Fix
- **Problem:** Dark mode used pure neutral grays (`oklch(... 0 0)`) — didn't match terracotta primary
- **Fix:** Tinted all dark backgrounds with primary hue (~27.5°) — subtle warmth on backgrounds, cards, muted, accent, borders

### KBar Theme Error Fix
- **Problem:** `useThemeConfig must be used within an ActiveThemeProvider` — provider was stripped when Clerk was removed
- **Fix:** Wrapped `<Outlet>` with `<ActiveThemeProvider>` (and `<ThemeProvider>` from `next-themes`) in `__root.tsx`

### Overview Cards Grid Fix
- **Problem:** Container query classes (`@xl/main:grid-cols-2`) referenced non-existent `@container/main`
- **Fix:** Replaced with standard responsive breakpoints: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`

## Theme System

### Architecture
- `next-themes` ThemeProvider: light/dark/system mode (adds `.dark` class to `<html>`)
- `ActiveThemeProvider`: design themes (sets `data-theme` attribute on `<html>`)
- 13 design themes: Claude, Neobrutualism, Supabase, Vercel, Mono, Notebook, Light Green, Zen, Astro Vista, WhatsApp, Loopy, Vivita, Henry
- Theme CSS files in `src/styles/themes/` only define CSS variables — NO `@theme inline` blocks
- Single `@theme inline` in `globals.css` maps all variables via `var()` — cascading handles theme switching

### Loopy Theme
- Terracotta/warm orange primary (shadcn preset `b4gfJS2x0`)
- `--primary: oklch(0.505 0.213 27.518)`
- Warm-tinted dark mode backgrounds

### Vivita Theme
- Purple/violet primary (shadcn preset `b38nuJHQe`)
- `--primary: oklch(0.496 0.265 301.924)`
- Purple-tinted dark mode

### Henry Theme
- Amber/orange primary (shadcn preset `b3bZpGVtPk`)
- `--primary: oklch(0.555 0.163 48.998)`
- `--radius: 0` (sharp corners — NO border radius)
- Dark mode: slate-blue dark backgrounds with warm amber accents
- Explicit `--radius-*: 0` overrides for all 7 radius tokens

## Commands

```bash
bun install
bun run dev          # http://localhost:3000
bun run build        # Production build → .output/
node scripts/migrate.cjs  # Create/reset database tables
```

## Environment

```env
BETTER_AUTH_SECRET=your-secret-key-min-32-chars-long
BETTER_AUTH_URL=http://localhost:3000
```

## Pitfalls

- `better-sqlite3` native addon can't load in Bun — use Node.js for the migration script
- Better Auth `signOut()` doesn't redirect — must `await` and navigate manually
- `@tanstack/react-start/server` imports blocked in client code — mark server-only files with `.server.tsx` extension
- `@theme inline` blocks in theme files override the main one — keep them out, use single source of truth
- Theme CSS must load AFTER `:root` defaults in `globals.css` for cascading to work
- `/dashboard/product/new` route file must exist — it's part of the auto-generated route tree
