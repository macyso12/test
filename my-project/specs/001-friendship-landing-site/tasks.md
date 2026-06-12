---
description: "Task list for Friendship App Landing Website"
---

# Tasks: Friendship App Landing Website

**Input**: Design documents from `specs/001-friendship-landing-site/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Tests**: TDD is constitutionally mandatory (Principle II). Test tasks are
included for all server logic and critical frontend modules.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Include exact file paths in descriptions

## Path Conventions

All paths are relative to `my-project/` (the project root).

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Bootstrap the Vite project, install dependencies, configure
tooling. No user-facing code yet.

- [ ] T001 Initialise Node project: create `package.json` with name, version,
  and scripts (`dev`, `build`, `preview`, `test`, `server`)
- [ ] T002 Install dependencies: `vite`, `express`, `better-sqlite3` and dev
  deps `vitest`, `@vitest/coverage-v8`, `eslint`
- [ ] T003 [P] Create `vite.config.js` with `/api` proxy pointing to
  `http://localhost:3000` and `public/` as static asset root
- [ ] T004 [P] Create `eslint.config.js` enforcing ES2022, no-unused-vars,
  max-complexity 10
- [ ] T005 [P] Create `.env.example` with
  `VITE_APP_STORE_LIVE=false`, `VITE_GOOGLE_PLAY_LIVE=false`,
  `VITE_APP_STORE_URL=`, `VITE_GOOGLE_PLAY_URL=`, `PORT=3000`
- [ ] T006 [P] Create `.gitignore` excluding `node_modules/`, `dist/`,
  `.env`, `server/data/*.db`
- [ ] T007 [P] Create empty directory stubs:
  `src/css/`, `src/js/`, `src/svg/`, `public/images/`,
  `server/routes/`, `server/db/`, `server/data/`,
  `tests/unit/`, `tests/integration/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: CSS design tokens, HTML shell, SQLite connection, and Express
skeleton — shared infrastructure every user story depends on.

**⚠️ CRITICAL**: No user story work begins until this phase is complete.

- [ ] T008 Create `src/css/tokens.css` defining all CSS custom properties:
  colour palette (`--color-leaf-*`, `--color-soil-*`, `--color-bloom-*`,
  `--color-neutral-*`), spacing scale (`--space-xs` through `--space-3xl`),
  typography (`--font-base`, `--font-display`, `--font-size-*`,
  `--line-height-*`), border-radius, shadow, transition tokens
- [ ] T009 [P] Create `src/css/reset.css` — minimal box-sizing + margin reset
- [ ] T010 [P] Create `src/css/global.css` importing `tokens.css` and
  `reset.css`; set base `font-family`, `color`, `background-color`, `line-height`
  on `:root` and `body`
- [ ] T011 Create `index.html` with full document shell: `<head>` with charset,
  viewport, Open Graph meta tags, title, link to `src/css/global.css`, and
  `<body>` with `<nav>`, `<main>` (empty section anchors), `<footer>`, and
  `<script type="module" src="/src/js/main.js">`
- [ ] T012 Create `src/js/main.js` importing all JS modules
  (`scroll-reveal.js`, `waitlist-form.js`, `cta-mode.js`, `nav.js`) and
  calling their init functions on `DOMContentLoaded`
- [ ] T013 Create `server/db/schema.js` exporting the `CREATE TABLE IF NOT
  EXISTS waitlist (...)` and index SQL strings (from data-model.md)
- [ ] T014 Create `server/db/connection.js` that opens `server/data/waitlist.db`
  via `better-sqlite3`, runs schema migrations on startup, and exports the `db`
  instance
- [ ] T015 Create `server/index.js` as Express entry point: JSON body parser,
  CORS header (dev: open; prod: same-origin), mount `routes/waitlist.js` at
  `/api/waitlist`, mount `GET /api/health`, listen on `process.env.PORT`
- [ ] T016 [P] Write unit test
  `tests/unit/db-connection.test.js` — verifies schema initialises without
  error using an in-memory SQLite DB (`:memory:`)

**Checkpoint**: `npm run dev` starts Vite + Express; `GET /api/health` returns
`{"status":"ok"}`; `index.html` renders a blank page with correct meta tags.

---

## Phase 3: User Story 1 — First-Time Visitor Discovers the App (P1) 🎯 MVP

**Goal**: Hero section with app name, plant/friendship value proposition
headline, and a primary CTA — all visible above the fold on desktop and mobile.

**Independent Test**: Load `http://localhost:5173` at 1440×900 cold. The app
name, value proposition, and a CTA button are visible without scrolling.
Resize to 375×812 — same content visible, text legible, CTA tappable.

### Tests for User Story 1 ⚠️ Write FIRST — confirm RED before implementing

- [ ] T017 [P] [US1] Write unit test `tests/unit/cta-mode.test.js` — verifies
  `initCtaMode()` shows waitlist form when `VITE_APP_STORE_LIVE=false` and
  shows store badges when `true`; tests run in jsdom

### Implementation for User Story 1

- [ ] T018 [US1] Create `src/css/nav.css` — sticky top nav with logo/wordmark
  on left, anchor links (`#features`, `#testimonials`, `#download`) on right;
  mobile: hamburger collapse; uses only token variables
- [ ] T019 [US1] Create `src/css/hero.css` — full-viewport hero with
  background image (`public/images/hero-bg.webp`), overlay gradient using
  `--color-leaf-*`, centred headline + subheadline + CTA button; `picture`
  element for WebP/PNG fallback; mobile-first media queries
- [ ] T020 [US1] Add `<nav>` markup to `index.html`: logo text, nav links,
  skip-to-content link for accessibility
- [ ] T021 [US1] Add `<section id="hero">` markup to `index.html`: `<picture>`
  hero background, `<h1>` app name, `<p>` value proposition tagline,
  `<div id="cta-container">` (populated by `cta-mode.js`)
- [ ] T022 [US1] Create `src/js/cta-mode.js` — reads
  `import.meta.env.VITE_APP_STORE_LIVE` / `VITE_GOOGLE_PLAY_LIVE`; injects
  app-store badge links or waitlist form HTML into `#cta-container`;
  exports `initCtaMode()`
- [ ] T023 [US1] Create `src/js/nav.js` — smooth-scroll anchor clicks,
  hamburger toggle for mobile, `IntersectionObserver` active-link highlight;
  exports `initNav()`
- [ ] T024 [US1] Add hero placeholder images to `public/images/` — 1×1 pixel
  WebP and PNG stubs so Vite does not 404 during development
- [ ] T025 [US1] Verify hero renders above the fold at 1440×900 and 375×812
  by running `npm run dev` and visually confirming layout (document result
  in quickstart.md Scenario 1)

**Checkpoint**: US1 fully functional and independently testable per quickstart
Scenario 1. CTA visible above fold on desktop and mobile.

---

## Phase 4: User Story 4 — Convinced Visitor Takes Action to Download (P1)

**Goal**: Waitlist form (when store links not live) and app-store badge CTAs
(when live) — both fully functional, zero friction.

**Independent Test**: Click primary CTA → submit `test@example.com` → see
success message. Submit again → duplicate message. Submit `bad` → validation
error. (quickstart Scenarios 4 & 5)

### Tests for User Story 4 ⚠️ Write FIRST — confirm RED before implementing

- [ ] T026 [P] [US4] Write unit test `tests/unit/waitlist-form.test.js` —
  verifies client-side email validation (`validateEmail()`): empty string →
  false, `bad` → false, `a@b.c` → true, 255-char string → false
- [ ] T027 [P] [US4] Write integration test
  `tests/integration/waitlist-api.test.js` — spins up Express with an
  in-memory DB; tests POST 201 (new), POST 200 (duplicate), POST 422
  (invalid), GET /api/health 200

### Implementation for User Story 4

- [ ] T028 [US4] Create `server/routes/waitlist.js` — validates email with
  regex, captures `source` from `req.headers.referer` or `req.query.utm_source`,
  inserts via `db`; returns 201/200/422/500 JSON per contract; rate-limit: 5
  req/IP/min using a simple in-memory Map counter
- [ ] T029 [US4] Create `src/js/waitlist-form.js` — exports `initWaitlistForm()`;
  attaches `submit` listener to `#waitlist-form` if present; validates email
  client-side; `fetch`es `POST /api/waitlist`; updates `#form-message` with
  success/duplicate/error text; disables submit button during request
- [ ] T030 [US4] Create `src/css/cta.css` — styles for waitlist form
  (input + button inline on desktop, stacked on mobile), app-store badge
  buttons, `#form-message` status text (success = `--color-leaf-*`, error =
  `--color-bloom-*`); all sizes use token variables; button min touch target
  44×44 px
- [ ] T031 [US4] Add `<section id="download">` markup to `index.html` with
  `<div id="cta-container-bottom">` mirroring hero CTA; `initCtaMode()` must
  populate both containers
- [ ] T032 [US4] Update `src/js/cta-mode.js` to populate both
  `#cta-container` (hero) and `#cta-container-bottom` (download section)
- [ ] T033 [US4] Add `<noscript>` fallback form to `index.html` inside
  `#cta-container` that POSTs directly to `/api/waitlist` (no-JS path per FR-007)
- [ ] T034 [US4] Run integration tests (`npm test`) — confirm all green

**Checkpoint**: US4 fully functional. Waitlist submission works end-to-end.
App-store CTAs render when env flags are true. No-JS form present.

---

## Phase 5: User Story 2 — Curious Visitor Explores App Features (P2)

**Goal**: Features section with at least three feature highlight cards (visual,
title, benefit description) and scroll-reveal animations.

**Independent Test**: Scroll past hero — three or more feature cards appear,
each with an icon/image, title, and one-sentence benefit. Cards animate in
on scroll (quickstart Scenario 2).

### Implementation for User Story 2

- [ ] T035 [US2] Create `src/svg/icons.svg` — inline SVG sprite with symbols
  for at least five icons: `icon-water` (watering can), `icon-grow`
  (sprouting plant), `icon-remind` (bell/calendar), `icon-connect`
  (two figures), `icon-streak` (fire/chain); each as `<symbol id="...">` with
  `viewBox`
- [ ] T036 [P] [US2] Create `src/css/features.css` — CSS grid of feature
  cards (3-col desktop, 1-col mobile); each card: icon (48×48 px SVG),
  `<h3>` title, `<p>` benefit copy; initial state for scroll-reveal:
  `opacity: 0; transform: translateY(24px)`; `.visible` state:
  `opacity: 1; transform: none; transition: 400ms ease`
- [ ] T037 [US2] Add `<section id="features">` markup to `index.html` with
  three (minimum) `<article class="feature-card">` elements, each containing
  a `<svg><use href="/src/svg/icons.svg#icon-*">`, `<h3>`, and `<p>` — copy
  uses plant/nurturing metaphor for each feature (e.g. "Water your friendships",
  "Watch them grow", "Never miss a moment")
- [ ] T038 [US2] Create `src/js/scroll-reveal.js` — exports `initScrollReveal()`;
  uses `IntersectionObserver` (threshold 0.15) to add `.visible` class to all
  `.feature-card`, `.testimonial-card`, and `[data-reveal]` elements as they
  enter the viewport; respects `prefers-reduced-motion` (skips animation)
- [ ] T039 [US2] Add second CTA (`#cta-container-features`) below feature
  cards in `index.html`; update `cta-mode.js` to populate it
- [ ] T040 [US2] Verify scroll-reveal works and three feature cards render
  correctly at 375 px and 1440 px widths (document in quickstart Scenario 2)

**Checkpoint**: US2 fully functional. Feature cards visible, animated, benefit-
focused. Second CTA present below features.

---

## Phase 6: User Story 3 — Sceptical Visitor Builds Trust via Social Proof (P3)

**Goal**: Testimonials section with at least two user quotes, attribution, and
a CTA within one viewport height of the last testimonial.

**Independent Test**: Scroll to testimonials — two cards with quote, name, and
context visible; CTA appears within one viewport height below (quickstart
Scenario 3).

### Implementation for User Story 3

- [ ] T041 [US3] Create `src/css/testimonials.css` — card layout (2-col
  desktop, 1-col mobile); each card: quotation mark decoration, `<blockquote>`,
  `<cite>` with name + context; uses token colours and spacing; initial hidden
  state for scroll-reveal
- [ ] T042 [US3] Add `<section id="testimonials">` markup to `index.html`
  with two (minimum) `<article class="testimonial-card">` elements; each
  with `<blockquote>`, `<cite>` (first name + context string e.g. "using the
  app for 3 months"); placeholder copy that matches plant/nurturing tone
- [ ] T043 [US3] Add `<section id="download">` CTA block immediately after
  testimonials in `index.html` (this is the bottom download section from T031;
  confirm it renders within one viewport height of last testimonial card)
- [ ] T044 [US3] Verify testimonial cards animate in via scroll-reveal and CTA
  is within one viewport height below last card (document in quickstart
  Scenario 3)

**Checkpoint**: US3 complete. Social proof visible and convincing. CTA
immediately follows.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Performance, accessibility, footer, final QA, and CI gate.

- [ ] T045 [P] Create `src/css/footer.css` — dark background footer with app
  name, tagline, placeholder links for Privacy Policy and Support, copyright
  line; mobile-responsive
- [ ] T046 [P] Add `<footer>` markup to `index.html` with app name, tagline,
  `<a href="#">Privacy Policy</a>`, `<a href="#">Support</a>`, copyright
- [ ] T047 Audit colour contrast for all text/background combinations in
  `tokens.css` against WCAG 2.1 AA (4.5:1 normal text, 3:1 large text);
  adjust token values as needed
- [ ] T048 [P] Add `aria-label` to all icon-only buttons; verify all interactive
  elements are keyboard-reachable (tab order logical); add `role="main"` to
  `<main>`, `role="navigation"` to `<nav>`
- [ ] T049 Run `npm run build` and `npm run preview`; run Lighthouse Mobile
  audit on `http://localhost:4173`; confirm Performance ≥ 90 and no
  render-blocking resources; document score in quickstart Scenario 7
- [ ] T050 [P] Add `<meta name="description">`, `<meta property="og:image">`,
  `<meta property="og:title">`, `<meta property="og:description">`, and
  `<link rel="icon">` placeholder to `<head>` in `index.html`
- [ ] T051 [P] Verify no-JS fallback: disable JavaScript in DevTools, reload
  `http://localhost:5173`, confirm hero headline and `<noscript>` form are
  visible (quickstart Scenario 6)
- [ ] T052 Run full test suite (`npm test`) and confirm all tests green with
  ≥ 80% coverage on `server/` code
- [ ] T053 Run ESLint (`npx eslint src/ server/`) — zero errors
- [ ] T054 [P] Update `README.md` (or create if absent) with setup, dev,
  build, and test commands

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **blocks all user stories**
- **Phase 3 (US1)**: Depends on Phase 2 — first to implement (P1)
- **Phase 4 (US4)**: Depends on Phase 2 — second to implement (P1, pairs with US1)
- **Phase 5 (US2)**: Depends on Phase 2 — can start after Phase 4 checkpoint
- **Phase 6 (US3)**: Depends on Phase 5 (scroll-reveal must exist)
- **Phase 7 (Polish)**: Depends on all story phases complete

### User Story Dependencies

- **US1 (P1)**: Foundation → implement first; no other story dependency
- **US4 (P1)**: Foundation → implement alongside US1; shares `cta-mode.js`
- **US2 (P2)**: Foundation + `scroll-reveal.js` from US2 itself → independent
- **US3 (P3)**: `scroll-reveal.js` (from US2) → depends on Phase 5

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- CSS before markup before JavaScript
- Core module before integration into `main.js`

### Parallel Opportunities

```bash
# Phase 1 — all [P] tasks in parallel:
T003 vite.config.js  |  T004 eslint.config.js  |  T005 .env.example
T006 .gitignore      |  T007 directory stubs

# Phase 2 — parallel pairs:
T008 tokens.css  |  T009 reset.css  |  T010 global.css  |  T016 db unit test
T013 schema.js   |  T014 connection.js

# Phase 3 — parallel:
T017 cta-mode.test.js  |  T018 nav.css  |  T019 hero.css  |  T024 image stubs

# Phase 4 — parallel:
T026 waitlist-form.test.js  |  T027 waitlist-api.test.js

# Phase 5 — parallel:
T035 icons.svg  |  T036 features.css

# Phase 7 — parallel:
T045 footer.css  |  T047 contrast audit  |  T048 aria  |  T050 meta tags
T051 no-JS test  |  T053 eslint         |  T054 README
```

---

## Implementation Strategy

### MVP First (US1 + US4 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (**CRITICAL** — blocks all stories)
3. Complete Phase 3: US1 — hero above the fold
4. Complete Phase 4: US4 — working download CTA / waitlist
5. **STOP and VALIDATE**: quickstart Scenarios 1, 4, 5, 6
6. Deploy/demo if ready — this is a shippable MVP

### Incremental Delivery

1. MVP (above) → hero + CTA working → ship
2. Add Phase 5 (US2) → features section → test Scenario 2 → ship
3. Add Phase 6 (US3) → social proof → test Scenario 3 → ship
4. Phase 7 Polish → Lighthouse gate → final ship

### Parallel Team Strategy

With two developers after Phase 2 completes:

- Dev A: Phase 3 (US1 hero) + Phase 5 (US2 features)
- Dev B: Phase 4 (US4 waitlist/CTA backend + frontend)
- Merge and Phase 6 (US3) together
- Both on Phase 7 polish

---

## Notes

- `[P]` = parallelizable (different files, no dependency on incomplete sibling tasks)
- `[USn]` maps task to user story for traceability
- Tests MUST be written and confirmed failing before implementation begins (TDD — Constitution Principle II)
- Each user story phase must be independently completable and testable before moving on
- Commit after each task or logical group
- Validate against quickstart.md scenarios at each checkpoint
- Constitution gates (Principle I–IV) apply throughout; ESLint and Lighthouse enforce them in CI
