# Quickstart Validation Guide: Friendship App Landing Website

**Feature**: 001-friendship-landing-site
**Date**: 2026-06-12

---

## Prerequisites

- Node.js 20+ installed
- npm 10+ installed
- A terminal in the project root (`my-project/`)

---

## Setup

```bash
npm install
cp .env.example .env        # edit APP_STORE_URL / GOOGLE_PLAY_URL if available
```

---

## Development

```bash
npm run dev
```

Opens Vite dev server at `http://localhost:5173` and the API server at
`http://localhost:3000`. Vite proxies `/api/*` to the API server
automatically.

---

## Validation Scenarios

### Scenario 1 — Hero renders above the fold (US1)

1. Open `http://localhost:5173` in a browser at 1440×900.
2. **Expected**: The app name, the plant/friendship value proposition headline,
   and at least one CTA button are all visible without scrolling.
3. Resize to 375×812 (mobile).
4. **Expected**: Same content visible without scrolling; text is legible; CTA
   button is tappable (min 44×44 px touch target).

### Scenario 2 — Features section (US2)

1. Scroll past the hero.
2. **Expected**: At least three feature cards appear, each with a visual (SVG
   icon or image), a title, and a one-sentence benefit description.
3. Observe scroll-reveal animations.
4. **Expected**: Cards animate in as they enter the viewport (fade + slide up).

### Scenario 3 — Social proof section (US3)

1. Continue scrolling.
2. **Expected**: At least two testimonial cards appear with a quote, a name,
   and a short context string.
3. A CTA to download or join the waitlist appears within one viewport height
   after the last testimonial.

### Scenario 4 — Waitlist form submission (US4, waitlist mode)

1. Ensure `.env` has `VITE_APP_STORE_LIVE=false`.
2. Click the primary CTA.
3. **Expected**: An email input form is shown (either inline or in a modal).
4. Enter `test@example.com` and submit.
5. **Expected**: Success message — "You're on the list!".
6. Submit the same email again.
7. **Expected**: Duplicate message — "You're already on the list!".
8. Submit an invalid value (`notanemail`).
9. **Expected**: Validation error — "Please enter a valid email address."

### Scenario 5 — App store CTA mode (US4, live mode)

1. Set `VITE_APP_STORE_LIVE=true` and `VITE_GOOGLE_PLAY_LIVE=true` in `.env`.
2. Restart the dev server.
3. **Expected**: App Store and Google Play badge buttons appear instead of the
   waitlist form.
4. Click each badge.
5. **Expected**: Opens the corresponding store URL in a new tab.

### Scenario 6 — No-JavaScript fallback

1. In browser DevTools, disable JavaScript.
2. Reload `http://localhost:5173`.
3. **Expected**: Hero headline, value proposition, and CTA text are all visible.
   The waitlist form renders as a plain HTML `<form>` with a submit button
   (falls back to a full-page POST if JS is off).

### Scenario 7 — Performance budget

```bash
npm run build
npm run preview          # serves dist/ on http://localhost:4173
```

1. Open `http://localhost:4173` in Chrome DevTools → Lighthouse.
2. Run a Mobile audit.
3. **Expected**: Performance score ≥ 90, no render-blocking resources.

---

## API Smoke Tests

```bash
# Health check
curl http://localhost:3000/api/health
# Expected: {"status":"ok"}

# Valid submission
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@example.com"}'
# Expected: {"status":"created","message":"..."}

# Duplicate
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@example.com"}'
# Expected: {"status":"duplicate","message":"..."}

# Invalid
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"bad"}'
# Expected: {"status":"error","message":"..."}
```

---

## Running Tests

```bash
npm test          # Vitest unit + integration tests
npm run test:ui   # Vitest browser-mode UI tests (optional)
```

**Expected**: All tests green.

---

## References

- API contract: `specs/001-friendship-landing-site/contracts/waitlist-api.md`
- Data model: `specs/001-friendship-landing-site/data-model.md`
- Constitution: `.specify/memory/constitution.md`
