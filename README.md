# Che Steam

Che Steam shows what a Steam game, DLC or bundle really costs in Argentine pesos (ARS). It takes the USD price from the Steam store and applies the taxes that Argentine card purchases carry, using the exchange rate you choose: official, MEP or crypto.

Live demo: <https://che-steam.vercel.app>

## Features

- **Search** games, DLCs and bundles and see the final ARS price under each exchange rate, with the tax amount broken out.
- **Game details** page with every edition/package of a title priced the same way.
- **Calculator** to price any USD (or ARS) amount without searching Steam.

## Where the data comes from

| Data | Source |
| --- | --- |
| Game list and prices (region `AR`) | Steam Store [`search/suggest`](https://store.steampowered.com/search/suggest) endpoint |
| Game details and editions | Steam Store `api/appdetails` endpoint |
| Official, MEP and crypto exchange rates | [dolarapi.com](https://dolarapi.com) (`/v1/dolares`) |
| Tax rates | Defined in the backend, in `src/config/taxes.ts` |

## How prices are calculated

For each exchange rate, the final price is:

```
final ARS = USD price × (1 + sum of applicable taxes) × exchange rate (venta)
```

| Exchange rate | Taxes applied |
| --- | --- |
| Official | IVA + IIBB |
| MEP | IVA only |
| Crypto | none |

The rates themselves (IVA, IIBB) live in a single file of the backend, so they can be updated in one place. IIBB varies by jurisdiction (2% in CABA, 3% in Buenos Aires province); since the app does not ask for a location, it uses the CABA rate. The exchange rate used is the *venta* (sell) quote.

## Architecture

```
Browser ──► Next.js route handlers (this repo, /api/*) ──► Express backend ──► Steam / dolarapi.com
```

- This repo is a Next.js (App Router) app. Its `/api/games`, `/api/games/details`, `/api/dolar` and `/api/taxes` routes proxy the backend ([cheSteam-backend](https://github.com/lnahuelfb/cheSteam-backend)), which fetches and normalizes the external data and does the price math.
- Responses are sent with `Cache-Control` headers (`s-maxage` + `stale-while-revalidate`) so the Vercel edge cache serves repeated requests without waking the serverless functions:

  | Route | `s-maxage` | `stale-while-revalidate` |
  | --- | --- | --- |
  | `/api/games`, `/api/games/details` | 1 h | 24 h |
  | `/api/dolar` | 5 min | 1 h |
  | `/api/taxes` | 24 h | 24 h |

## Running locally

Requirements: Node.js 18+ and the backend running locally.

1. Start the backend ([cheSteam-backend](https://github.com/lnahuelfb/cheSteam-backend)); it listens on port `3001` by default.
2. Install and start this app:

   ```bash
   npm install
   npm run dev
   ```

3. Open <http://localhost:3000>.

### Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api` | Base URL of the backend, including the `/api` prefix its routes are mounted under (e.g. `https://your-backend.vercel.app/api`) |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Public URL of this app, used by server-rendered pages to call its own `/api` routes |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Tech stack

Next.js 15 · React 19 · TypeScript · CSS Modules · Vercel

## Disclaimer

Prices are estimates. Actual charges depend on your bank or card issuer and on the tax rules in force when you pay. Not affiliated with Valve or Steam.
