# My Canvas

Infinite canvas project with bento-style cards.

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (v3.4)
- Framer Motion (animations)
- Zustand (modal state management)
- @use-gesture/react (pan/zoom gestures)
- shadcn/ui components

## Project Structure

```
src/
├── components/
│   ├── BentoCard.tsx       # Base card component with grid span support
│   ├── BentoCluster.tsx    # Grid layout orchestrator
│   ├── Canvas.tsx          # Main infinite canvas with pan/zoom
│   ├── Modal.tsx           # Glassmorphism modal overlay
│   └── cards/              # Card type components
│       ├── ProfileCard.tsx
│       ├── AboutCard.tsx
│       ├── SocialCard.tsx
│       ├── ProjectsCard.tsx
│       ├── ThoughtsCard.tsx
│       └── SecretCard.tsx
├── data/
│   └── canvasConfig.ts     # Canvas layout configuration
├── store/
│   └── modalStore.ts       # Zustand store for modal state
└── index.css               # Tailwind base + custom CSS variables
```

## Design Tokens

```css
--bg-color: #f4f4f5        /* Canvas background */
--dot-color: #d4d4d8        /* Grid dot pattern */
--card-bg: #ffffff          /* Card background */
--text-main: #18181b        /* Primary text */
--text-muted: #71717a       /* Muted text */
--radius: 28px             /* Bento card radius */
--gap: 20px                 /* Grid gap */
```

## Tailwind Config

Custom colors: `canvas-bg`, `dot-color`, `card-bg`, `text-main`, `text-muted`
Custom shadows: `bento`, `bento-hover`
Custom border-radius: `bento` (28px)

## Modal Style

Glassmorphism modal using native CSS `backdrop-filter`:

```tsx
style={{
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
}}
```

Modal is 80vw × 80vh, rounded-3xl, closes on Esc or X click.

## Canvas Gestures

- Drag to pan (from current position)
- Wheel to zoom (0.3 - 3x range, sensitivity 0.002)
- Wheel event requires `passive: false` for preventDefault

## State Management

**禁止使用 React Context，全部使用 Zustand**

所有全局状态（modal、canvas view 等）必须通过 Zustand 管理，不得使用 React Context。

## Known Issues

- `outline-ring/50` class requires custom color definition in tailwind.config
- Chrome extension runtime errors in console are unrelated to app

## Commands

```bash
pnpm dev     # Start dev server
pnpm build   # Production build
```