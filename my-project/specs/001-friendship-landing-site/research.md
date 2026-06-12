# Research: Friendship App Landing Website

**Feature**: 001-friendship-landing-site
**Date**: 2026-06-12

## Technology Decisions

### Build Tool
- **Decision**: Vite 5 (static site mode)
- **Rationale**: Zero-config bundling for vanilla HTML/CSS/JS, fast HMR in dev,
  outputs a fully optimised static bundle. `vite build` produces a `dist/`
  folder that can be served by any static host or the included Express server.
- **Alternatives considered**: Parcel (less control over output), webpack
  (heavy config for a simple site), no bundler (loses asset hashing and
  minification).

### Frontend Language
- **Decision**: Vanilla HTML5, CSS3, JavaScript ES2022+ (ES modules)
- **Rationale**: Keeps the bundle near zero. A landing page has minimal
  interactivity (smooth scroll, one form, CSS animations). No framework needed.
- **Alternatives considered**: Alpine.js (+15 kB), HTMX (overkill),
  React/Vue/Svelte (violates the "minimal libraries" constraint).

### CSS Strategy
- **Decision**: Plain CSS with CSS custom properties for design tokens
- **Rationale**: Custom properties (`--color-leaf`, `--space-md`, etc.) give
  theme consistency without a preprocessor. A single `tokens.css` file imported
  everywhere eliminates magic values.
- **Alternatives considered**: Tailwind CSS (utility-first but adds build
  complexity and breaks "minimal libraries"), Sass/SCSS (extra dependency).

### Animation
- **Decision**: CSS keyframe animations + Web Animations API where JS trigger
  needed (e.g., scroll-reveal)
- **Rationale**: Hardware-accelerated, zero dependencies.
  `IntersectionObserver` handles scroll-triggered class toggling.
- **Alternatives considered**: GSAP (licence + ~30 kB), Animate.css (extra
  stylesheet dependency).

### Icons / Illustrations
- **Decision**: Inline SVG sprites
- **Rationale**: No extra HTTP request; fully styleable via CSS (`currentColor`
  fill inherits from parent). Plant/leaf icons hand-authored as SVG paths.
- **Alternatives considered**: Font Awesome (HTTP request, icon font overhead),
  Feather Icons npm package (extra dependency).

### Waitlist Backend
- **Decision**: Minimal Express 4 server + better-sqlite3
- **Rationale**: Express is the lightest widely-understood Node HTTP server.
  `better-sqlite3` is synchronous, zero-config, and keeps data in a local
  `.db` file — no external database server needed.
- **Alternatives considered**: JSON flat file (no deduplication/querying),
  Fastify (slightly less familiar, minimal benefit here), PostgreSQL (requires
  external infra).

### Testing
- **Decision**: Vitest
- **Rationale**: Native Vite plugin; shares `vite.config.js`; supports
  browser-mode for DOM tests. Minimal extra config.
- **Alternatives considered**: Jest (needs Babel transform for ES modules),
  Playwright only (too heavy for unit tests).

## Scroll Animation Pattern

Use `IntersectionObserver` to add a `.visible` class when a section enters the
viewport. CSS defines the initial hidden state and the revealed state, keyed on
`.visible`. This avoids any animation library.

```
section.feature-card          → opacity: 0, transform: translateY(24px)
section.feature-card.visible  → opacity: 1, transform: none (transition 400ms)
```

## Performance Strategy

- **Image handling**: All images are local files (`public/images/`). Vite
  copies them as-is to `dist/`. WebP format preferred; `<picture>` element
  provides PNG fallback.
- **Font loading**: System font stack first (`-apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif`). If a brand font is supplied, load via
  `font-display: swap`.
- **Above-fold CSS**: Critical CSS for hero section inlined in `<head>`; rest
  loaded normally (Vite handles splitting).
- **JS loading**: All scripts are `type="module"` deferred; no render-blocking.

## SQLite Schema (Waitlist)

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  email     TEXT    NOT NULL UNIQUE,
  source    TEXT,                        -- utm_source or referrer
  created_at DATETIME DEFAULT (datetime('now'))
);
```

No personal data beyond email is stored. `UNIQUE` constraint prevents duplicate
sign-ups at the DB level.
