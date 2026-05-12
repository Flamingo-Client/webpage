# Flamingo — Landing Page

The official landing page for **Flamingo**, a modern desktop API client. Built with React, Vite, and TailwindCSS, this page showcases Flamingo's features, download options, and brand identity.

---

## Features

- **Responsive Design** — Fully responsive layout optimized for all screen sizes
- **Animated UI** — Smooth page transitions and scroll-triggered animations powered by Framer Motion
- **Feature Showcase** — Highlights core capabilities: request builder, environments, collections, sync, and theming
- **Download Section** — Direct download links for Flamingo desktop application
- **Performance Optimized** — Fast load times with Vite's optimized build pipeline

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | TypeScript 5 |
| Styling | TailwindCSS 3 |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Routing | React Router DOM 6 |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
cd landing
npm install
```

### Development

```bash
npm run dev              # Vite dev server (port 5174)
```

### Production Build

```bash
npm run build            # TypeScript check + Vite production build
npm run preview          # Preview production build
```

---

## Project Structure

```
landing/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and helpers
│   ├── pages/            # Page components
│   │   └── Home/         # Main landing page
│   ├── styles/           # Global CSS
│   ├── App.tsx           # Root component with routing
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── postcss.config.js     # PostCSS configuration
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (port 5174) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |

---

## Configuration

### Vite (`vite.config.ts`)

- React plugin with Fast Refresh
- Path alias `@/` → `./src/`
- Dev server on port 5174
- Output directory: `dist/`

### TypeScript (`tsconfig.json`)

- Target: ES2020
- Module: ESNext with bundler resolution
- JSX: react-jsx
- Strict mode enabled

---

## License

MIT License — see [LICENSE](./LICENSE)

Copyright (c) 2024 Javier Fernández (Jallox/Jayox)
