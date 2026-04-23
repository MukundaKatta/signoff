# Signoff

Read contracts like a lawyer. Paste a contract. Get the red flags, the boilerplate, and the terms worth negotiating. In plain English.

**Status:** v0 skeleton — landing page + keyword-based contract scanner. Full AI not yet wired.

**Landing:** https://signoff.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 contract scanner — paste text, get mocked red flags (unlimited liability, auto-renew, IP transfer) |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "signoff"` |

## What's next

- Wire real AI (clause extraction + risk scoring) behind `/try`
- PDF / DOCX upload support
- Auth + per-user contract history
