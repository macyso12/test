# Implementation Plan: Friendship App Landing Website

**Branch**: `001-friendship-landing-site` | **Date**: 2026-06-12 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-friendship-landing-site/spec.md`

## Summary

Build a single-page marketing landing site for a plant-themed friendship app.
The site uses Vite as a build tool with vanilla HTML, CSS, and JavaScript —
no UI framework. A minimal Express API backed by a local SQLite database
handles waitlist email submissions. The page must be eye-catching, mobile-first,
and meet the performance and UX consistency gates defined in the constitution.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES2022+ (ES modules)

**Primary Dependencies**:
- `vite` 5 — build tool and dev server
- `express` 4 — minimal API server for waitlist endpoint
- `better-sqlite3` — synchronous SQLite driver (Node.js server only)
- `vitest` — test runner (Vite-native)

No UI framework. No CSS preprocessor. No icon library.

**Storage**: SQLite file at `server/data/waitlist.db` (local, not committed)

**Testing**: Vitest (unit + integration); browser-mode for DOM tests

**Target Platform**: Web — desktop and mobile browsers (evergreen)

**Performance Goals**: Lighthouse Mobile ≥ 90; above-fold TTI ≤ 3 s on 3G

**Constraints**:
- Vanilla HTML/CSS/JS — no React/Vue/Svelte/Alpine/HTMX
- Minimal library footprint (Vite, Express, better-sqlite3, Vitest only)
- Images stored locally in `public/images/` — not uploaded externally
- SQLite for all persistent metadata (waitlist entries)

**Scale/Scope**: Single-page marketing site; expected traffic spike at launch
(hundreds of concurrent visitors); static frontend scales via CDN if needed;
API handles waitlist submissions only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Code Quality | Cyclomatic complexity ≤ 10/fn; peer review required; zero lint errors | ✅ Vanilla JS modules keep functions small; ESLint configured in setup |
| II. Testing Standards | TDD; ≥ 80% coverage; suite ≤ 5 min | ✅ Vitest covers server logic; DOM smoke tests cover frontend; suite is tiny |
| III. UX Consistency | Design-system tokens; actionable errors; WCAG 2.1 AA | ✅ CSS custom properties as tokens; error messages are user-facing; contrast checked |
| IV. Performance | API p95 ≤ 200 ms; TTI ≤ 3 s on 3G per spec; CI perf gate | ✅ SQLite inserts are synchronous sub-ms; Lighthouse gate in CI |

No violations. No complexity tracking entry required.

## Project Structure

### Documentation (this feature)

```text
specs/001-friendship-landing-site/
├── plan.md              ← this file
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── waitlist-api.md
└── tasks.md             ← created by /speckit.tasks
```

### Source Code (repository root)

```text
my-project/
├── index.html                      ← single HTML entry point
├── vite.config.js                  ← Vite config + /api proxy to Express
├── .env.example
├── package.json
├── eslint.config.js
│
├── src/
│   ├── css/
│   │   ├── tokens.css              ← CSS custom properties (colours, spacing, type)
│   │   ├── reset.css               ← minimal CSS reset
│   │   ├── global.css              ← base typography, body, root layout
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── features.css
│   │   ├── testimonials.css
│   │   ├── cta.css
│   │   └── footer.css
│   ├── js/
│   │   ├── main.js                 ← entry; imports modules, initialises page
│   │   ├── scroll-reveal.js        ← IntersectionObserver scroll animations
│   │   ├── waitlist-form.js        ← form submit handler + API call
│   │   ├── cta-mode.js             ← toggles app-store CTAs vs waitlist form
│   │   └── nav.js                  ← smooth scroll + active-link highlight
│   └── svg/
│       └── icons.svg               ← inline SVG sprite (plant/leaf/heart icons)
│
├── public/
│   └── images/                     ← local images (WebP + PNG fallback)
│       ├── hero-bg.webp
│       ├── hero-bg.png
│       ├── app-mockup.webp
│       └── app-mockup.png
│
├── server/
│   ├── index.js                    ← Express app entry; mounts routes
│   ├── routes/
│   │   └── waitlist.js             ← POST /api/waitlist route handler
│   ├── db/
│   │   ├── connection.js           ← opens / initialises SQLite connection
│   │   └── schema.js               ← CREATE TABLE IF NOT EXISTS statements
│   └── data/                       ← gitignored; contains waitlist.db at runtime
│
└── tests/
    ├── unit/
    │   ├── waitlist-form.test.js   ← form validation logic
    │   └── cta-mode.test.js        ← CTA toggle logic
    └── integration/
        └── waitlist-api.test.js    ← POST /api/waitlist end-to-end
```

**Structure Decision**: Single project (Option 1 variant). Vite serves the
static frontend; Express runs alongside on a separate port (proxied via
`vite.config.js` in dev; co-deployed in prod). No monorepo or separate
packages needed at this scope.

## Complexity Tracking

> No constitution violations — this section is intentionally empty.
