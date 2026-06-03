<div align="center">

<img src="/public/shadcn-dashboard.png" alt="Dashboard Preview" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.12);" />

<br /><br />

# ✦ Admin Dashboard ✦

### TanStack Start · Shadcn UI · TypeScript

*A production-ready admin dashboard with 15 themes, email auth, glassmorphism, and full TanStack ecosystem*

<br />

<p>
  <a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter"><img src="https://img.shields.io/badge/author-LoopyOratory-e50914?style=for-the-badge&logo=github" /></a>
  <a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter/stargazers"><img src="https://img.shields.io/github/stars/LoopyOratory/next-shadcn-dashboard-starter?style=for-the-badge&logo=github&color=e50914" /></a>
  <a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter/network/members"><img src="https://img.shields.io/github/forks/LoopyOratory/next-shadcn-dashboard-starter?style=for-the-badge&logo=github&color=181717" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/TanStack%20Start-latest-10b981?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Bun-1.3%2B-fbf0df?style=for-the-badge&logo=bun" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss" />
</p>

<p>
  <img src="https://img.shields.io/badge/15_themes-🎨-e50914?style=flat-square" />
  <img src="https://img.shields.io/badge/auth-Better_Auth-7c3aed?style=flat-square" />
  <img src="https://img.shields.io/badge/database-SQLite-003b57?style=flat-square&logo=sqlite" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/glassmorphism-✓-ff69b4?style=flat-square" />
</p>

<br />

---

</div>

## 🫧 Origins

> This is a **TanStack Start port** of the excellent [Next.js Shadcn Dashboard Starter](https://github.com/Kiranism/next-shadcn-dashboard-starter) by **[Kiranism](https://github.com/Kiranism)** — all original UI design, component architecture, and dashboard layout credit goes to the original team. Please ⭐ the original repo.

| Migration | From → To |
|---|---|
| 🔄 Framework | Next.js 16 → **TanStack Start** (Vite + Router + Nitro) |
| 🔐 Auth | Clerk → **Better Auth** (SQLite, email/password) |
| 🖼️ Images | `next/image` → **@unpic/react** |
| 🔗 Search Params | Nuqs → **TanStack Router** (useLocation + URLSearchParams) |
| 🪟 Themes | 6 themes → **15 themes** (incl. glassmorphism) |

---

## 📊 Repository Stats

<div align="center">

<a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter/stargazers"><img src="https://img.shields.io/github/stars/LoopyOratory/next-shadcn-dashboard-starter?style=social" /></a>
<a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter/network/members"><img src="https://img.shields.io/github/forks/LoopyOratory/next-shadcn-dashboard-starter?style=social" /></a>
<a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter/issues"><img src="https://img.shields.io/github/issues/LoopyOratory/next-shadcn-dashboard-starter?style=social" /></a>
<a href="https://github.com/LoopyOratory/next-shadcn-dashboard-starter/pulls"><img src="https://img.shields.io/github/issues-pr/LoopyOratory/next-shadcn-dashboard-starter?style=social" /></a>

<br /><br />

### ⭐ Star History

<a href="https://www.star-history.com/#LoopyOratory/next-shadcn-dashboard-starter&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=LoopyOratory/next-shadcn-dashboard-starter&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=LoopyOratory/next-shadcn-dashboard-starter&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=LoopyOratory/next-shadcn-dashboard-starter&type=date&legend=top-left" width="600" />
 </picture>
</a>

<br />

*Track this project's growth over time — every ⭐ helps!*

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Dashboard

- 🧱 Sidebar + Header + Content layout
- 📊 Analytics with stat cards & 4 chart types
- 📋 Data tables — search, filter, sort, pagination
- ⌨️ Command palette (⌘K) — navigate, theme switch, dark mode
- ℹ️ Contextual infobar on every page
- 🔔 Notification center with badge & popover

</td>
<td width="50%">

### 🎨 Theme System

- 🌓 Light / Dark / **System** mode toggle
- 🪟 **15 design themes** — glassmorphism, sharp, round, warm, cool, monochrome
- 🎭 Independent color + visibility theme layers
- 🌈 Animated view transitions between themes
- 🔤 Per-theme fonts, shadows, radii

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Tech

- 🚀 **TanStack Start** — Vite 6, Nitro SSR, file routes
- 📦 **TanStack Query** — server prefetch + `HydrationBoundary`
- 📊 **TanStack Table** — URL-synced state
- 📝 **TanStack Form** + Zod validation
- 🗃️ **Zustand** for client state
- 🐕 **Husky** pre-commit hooks

</td>
<td width="50%">

### 📱 Pages

- 🔐 Sign In / Sign Up (custom shadcn forms)
- 📈 Dashboard Overview (cards + charts)
- 🛍️ Products CRUD (table + form)
- 👥 Users Table (React Query pattern)
- 📋 Kanban Board (drag & drop)
- 💬 Chat (messaging UI)
- 👤 Profile · ⚙️ Workspaces · 💳 Billing

</td>
</tr>
</table>

---

## 🪟 Themes

| Theme | Palette | Radius | Vibe |
|---|---|---|---|
| **Loopy** | 🧱 Terracotta warm | 0.625rem | Default — shadcn preset |
| **Vivita** | 💜 Violet/Purple | 0.625rem | Bold creative dashboards |
| **Henry** | 🍯 Amber/Gold | **0 (sharp)** | Industrial, no-nonsense |
| **Monica** | 🌹 Rose/Glass | **1rem (round)** | Frosted glass, modern SaaS |
| **Monica-2** | 🌹 Rose/Glass | **0 (sharp)** | Glassmorphism with sharp edges |
| Vercel | ⚫ Monochrome | 0.5rem | Clean, minimal |
| Supabase | 🟢 Green | 0.5rem | Dev-tool aesthetic |
| Claude | 🟠 Warm orange | 0.5rem | AI/chat vibes |
| + 7 more | ⋯ | ⋯ | Notebook, Zen, WhatsApp, Astro Vista, Mono, Neobrutualism, Light Green |

---

## 🛠️ Tech Stack

| Category | Library | Why |
|---|---|---|
| 🏗️ Framework | [TanStack Start](https://tanstack.com/start) | Vite 6 + Type-safe router + Nitro SSR |
| 🧭 Router | [TanStack Router](https://tanstack.com/router) | File-based, fully typed, search params |
| 🔐 Auth | [Better Auth](https://www.better-auth.com) | SQLite, no vendor lock-in |
| 🎨 Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) | Utility-first, New York style |
| 📊 Charts | [Recharts](https://recharts.org) | Composable React charts |
| 📡 Data | [TanStack Query](https://tanstack.com/query) | Server prefetch + client cache |
| 📋 Tables | [TanStack Table](https://tanstack.com/table) | Headless, URL-synced |
| 📝 Forms | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) | Type-safe validation |
| ⌨️ Cmd+K | [kbar](https://kbar.vercel.app) | Spotlight-style command palette |
| 🗃️ State | [Zustand](https://zustand-demo.pmnd.rs) | Minimal, hook-based |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/LoopyOratory/next-shadcn-dashboard-starter.git
cd next-shadcn-dashboard-starter

# Install
bun install

# Setup database tables
node scripts/migrate.cjs

# Configure environment
cp .env.example .env
# → Set BETTER_AUTH_SECRET (any 32+ char string)
# → Set BETTER_AUTH_URL (default: http://localhost:3000)

# Run
bun run dev
# → http://localhost:3000
```

**Default credentials:** `admin@example.com` / `password123`

```bash
# Production
bun run build
bun run start   # or: node .output/server/index.mjs

# Docker
docker build -t admin-dashboard .
docker run -d -p 3000:3000 \
  -e BETTER_AUTH_SECRET=*** \
  -e BETTER_AUTH_URL=https://your-domain.com \
  admin-dashboard
```

---

## 📁 Project Structure

```
src/
├── app/                    # TanStack Start file routes
│   ├── __root.tsx          # Root layout (providers, theme, html)
│   ├── router.tsx          # Router config
│   ├── client.tsx          # Client entry
│   ├── ssr.tsx             # SSR entry
│   ├── start.ts            # Server start
│   ├── auth/               # Sign-in, sign-up
│   ├── dashboard/          # All dashboard pages
│   │   └── route.tsx       # Dashboard layout shell
│   └── api/                # API handlers (auth, products, users)
│
├── components/
│   ├── ui/                 # Shadcn primitives (200+ components)
│   ├── layout/             # Sidebar, header, page container
│   ├── themes/             # Theme selector, toggle, providers
│   └── kbar/               # Command+K interface
│
├── features/               # Feature modules
│   ├── overview/           # Charts, stat cards
│   ├── products/           # CRUD, tables, forms
│   ├── users/              # User management table
│   ├── auth/               # Sign-in/up forms
│   ├── kanban/             # Drag-drop board
│   ├── chat/               # Messaging UI
│   └── notifications/      # Notification center
│
├── styles/
│   ├── globals.css         # Tailwind, CSS variables, @theme
│   ├── theme.css           # Imports all 15 theme files
│   └── themes/             # loopy.css, vivita.css, henry.css, monica.css, monica-2.css, ...
│
├── lib/                    # Auth, query-client, utils
├── hooks/                  # useDataTable, useNav, useMediaQuery
├── config/                 # Navigation, infobar, data-table configs
└── types/                  # TypeScript definitions
```

---

## ⭐ Credits

<div align="center">

### Built on the shoulders of giants

<br />

<a href="https://github.com/Kiranism/next-shadcn-dashboard-starter">
  <img src="https://img.shields.io/badge/Original_by-Kiranism-181717?style=for-the-badge&logo=github" />
</a>

<br /><br />

**Original project:** [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)
**Ported & extended by:** [LoopyOratory](https://github.com/LoopyOratory)

<br />

[![Buy Me A Coffee](https://img.shields.io/badge/Support_the_original_creator-☕_Buy_Me_A_Coffee-yellow?style=for-the-badge&logo=buymeacoffee)](https://buymeacoffee.com/kir4n)

<br />

*MIT License · Copyright (c) 2024 Kiranism*

</div>
