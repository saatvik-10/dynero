# Dynero

Dynero — a minimal, modern Next.js App Router app that integrates NextAuth (Google), Prisma, and Solana tooling for token balances and swaps.

## Quick start

Prerequisites

- Node.js 18+ (tested with 18/20)
- pnpm (recommended) or npm/yarn
- A PostgreSQL (or supported) database for Prisma (local or remote)

Clone and install

```bash
git clone <your-repo> && cd dynero
pnpm install
# or: npm install
```

Generate Prisma client (required before build)

```bash
pnpm prisma generate
# or: npx prisma generate
```

Run development server

```bash
pnpm dev
# or: npm run dev
```

The app will be available at http://localhost:3000 by default.

# Dynero — Project overview

This repository contains Dynero: a minimal Next.js app (App Router) that demonstrates a simple authenticated wallet experience with token balances and an integrated swap flow. It is intentionally compact — the code is organized to show key integration points rather than a full production product.

This README explains what the project is, the high-level architecture, security decisions, and the files you should open when you want to change behavior.

## What Dynero does (high level)

- Users sign in with Google (NextAuth). The app stores a minimal user record and associates wallet data.
- Authenticated users can view token balances for a supported set of Solana tokens and request a swap (quote via a price/quote API and then sign/submit the swap).
- The project demonstrates both client-side and server-side responsibilities: UI and session handling live in React components; signing and other sensitive operations are performed in server routes (or demonstrated as encrypted storage).

## Architecture & responsibilities

- Next.js (App Router) — UI and server routes live together under `app/`.
- NextAuth — authentication with OAuth providers (`app/api/auth/[...nextauth]/route.ts`). Server-side callbacks enrich the session with DB-backed user info.
- Prisma — database ORM (schemas and data access live where Prisma client is used). The DB holds user records, encrypted key material (examples), and convenience metadata.
- Solana tooling — `@solana/web3.js` and `@solana/spl-token` are used in `lib/` and server routes to fetch balances, build and/or sign transactions, and interact with the chain.
- Sonner — UI toasts for client-side notifications (mounted in `app/layout.tsx`).

Separation of responsibilities

- Client components (React): render UI, collect user intent, request quotes, show balances.
- Server routes (under `app/api/`): perform sensitive operations (signing with server-side keys if you choose a custodial model), return structured JSON, and enforce validations.

## Core flows

1. Authentication

   - User clicks sign-in in `components/Appbar.tsx`.
   - NextAuth handles the OAuth dance; `route.ts` in the auth folder contains callbacks (signIn/jwt/session) that map provider fields into the app's user model.

2. Balance display

   - The app fetches token balances (server helper or client hook) and renders them in `components/Wallet.tsx`.
   - Token metadata and supported tokens are declared in `lib/constants.ts` / `lib/token.ts` so the UI and price lookups use a single source of truth.

3. Pricing & quoting

   - The Swap UI (`components/Swap.tsx` + `components/SwapHelper.tsx`) requests a quote from an external price/quote API (e.g., Jupiter). Quote responses are normalized and stored in component state as `quoteResponse`.

4. Swap execution
   - The client POSTs the `quoteResponse` (or the prepared tx) to `app/api/swap/route.ts`.
   - The server validates the request, constructs or signs the transaction (if custodial), submits to Solana, and returns a structured JSON success/failure.

Notes

- The repo includes example code for both client-side and server-side signing patterns; choose one and remove the other for production clarity.

## Data model & sensitive data

- Users: minimal profile created via NextAuth callbacks; provider identifiers are saved for audit and correlation.
- Wallets / Keys: examples in the code previously saved raw key arrays; the project now demonstrates an encrypted-storage approach (AES-GCM) as a short-term pattern. See `lib/utils.ts` for helper references.

Security note (important)

- Do not store raw private keys in plaintext. Prefer a non-custodial UX (let users keep keys in their browser wallet). If you must store keys, use envelope encryption with a KMS-managed key in production.

## Where to look to change behavior

- Authentication

  - `app/api/auth/[...nextauth]/route.ts` — provider config and callbacks.

- UI / Client

  - `app/layout.tsx` — root layout, fonts, Toaster placement, head metadata.
  - `components/Appbar.tsx` — top navigation and authentication controls.
  - `components/Wallet.tsx` — balance UI, copy-to-clipboard, and loading states.
  - `components/Swap.tsx` & `components/SwapHelper.tsx` — inputs, token selection and quote handling.

- Server / API

  - `app/api/swap/route.ts` — validate and execute swap requests. Make sure every error path returns JSON with an HTTP status.
  - `app/api/*` — other server endpoints used for token list, prices, or helper endpoints.

- Utilities
  - `lib/utils.ts` — Solana helper functions, encryption examples, and wrappers.
  - `lib/constants.ts` / `lib/token.ts` — supported token metadata and price lookup keys.

## Common pitfalls you may run into (developer checklist)

- Client vs server boundaries: calling browser-only APIs (toasts, window, localStorage) from server components will fail — keep toasts and DOM interactions in client components.
- NextAuth callbacks: `signIn` and `jwt/session` callbacks receive different payloads; only the `signIn` callback receives the `account` object with provider IDs on the first sign-in.
- External API contracts: price APIs often use mint addresses as keys. If your UI expects symbol-named keys you'll get `undefined` prices.
- Always return structured JSON from server routes. Empty responses or thrown exceptions cause opaque 500s on the client.

## Why the project is organized this way

- Clarity: the App Router keeps server routes and UI colocated, making it easier to reason about which code runs where.
- Security-first examples: the repo intentionally surfaces the dangers of storing key material and provides a simple encrypted example so contributors can safely experiment.
- Minimalism: this repo is a focused sandbox for auth + wallet + swap patterns — it avoids framework bloat so developers can iterate quickly.

## Next steps and suggestions

- Decide on the signing model (non-custodial vs custodial) and consolidate code paths accordingly.
- If you keep custody, migrate encryption to a KMS-backed flow and store only ciphertext + metadata in the DB.
- Add tests for `app/api/swap/route.ts` that mock quote responses and validate error paths return JSON.

If you want, I can now:

- generate a `docs/SECURITY.md` with a migration plan to KMS, including a suggested DB schema for storing ciphertext + iv + tag + key version, or
- add example non-custodial client-side signing code (Phantom + signTransaction) to replace server-side signing examples.
