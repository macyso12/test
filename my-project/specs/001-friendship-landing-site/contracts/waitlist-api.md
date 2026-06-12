# Contract: Waitlist API

**Feature**: 001-friendship-landing-site
**Date**: 2026-06-12

The landing page exposes a single HTTP endpoint for waitlist sign-ups.
All other content is static HTML served by Vite's dev server (dev) or a
static file server (production).

---

## POST /api/waitlist

Adds a visitor's email address to the waitlist.

### Request

```
POST /api/waitlist
Content-Type: application/json
```

**Body**:

```json
{
  "email": "user@example.com"
}
```

| Field | Type   | Required | Validation                        |
|-------|--------|----------|-----------------------------------|
| email | string | yes      | Valid email format, max 254 chars |

### Responses

#### 201 Created — new entry added

```json
{
  "status": "created",
  "message": "You're on the list! We'll let you know when we launch."
}
```

#### 200 OK — email already registered

```json
{
  "status": "duplicate",
  "message": "You're already on the list!"
}
```

#### 422 Unprocessable Entity — invalid input

```json
{
  "status": "error",
  "message": "Please enter a valid email address."
}
```

#### 500 Internal Server Error — unexpected failure

```json
{
  "status": "error",
  "message": "Something went wrong. Please try again later."
}
```

---

## GET /api/health

Liveness check for the API server.

### Response

#### 200 OK

```json
{
  "status": "ok"
}
```

---

## Notes

- No authentication is required on either endpoint.
- Rate limiting: max 5 requests per IP per minute on `POST /api/waitlist`
  (enforced server-side) to prevent spam.
- CORS: restricted to the site's own origin in production; open in development.
- The `source` field is captured from the `Referer` header or `utm_source`
  query parameter automatically — it is never supplied by the client body.
