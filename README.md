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
| Tax rates | Defined in this repo, in `src/server/taxes.ts` |

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

The rates themselves (IVA, IIBB) live in a single file, `src/server/taxes.ts`, so they can be updated in one place. IIBB varies by jurisdiction (2% in CABA, 3% in Buenos Aires province); since the app does not ask for a location, it uses the CABA rate. The exchange rate used is the *venta* (sell) quote.

## Architecture

```
Browser ──► Next.js route handlers (/api/*) ──► Steam Store / dolarapi.com
```

A single Next.js (App Router) app. The route handlers fetch and normalize the external data and do the price math (`src/server/`), so a request crosses one serverless function instead of two.

- `fetch` calls use Next's data cache (24 h revalidation), which persists across serverless cold starts.
- Responses are sent with `Cache-Control` headers (`s-maxage` + `stale-while-revalidate`) so the Vercel edge cache serves repeated requests without waking the function:

  | Route | `s-maxage` | `stale-while-revalidate` |
  | --- | --- | --- |
  | `/api/games`, `/api/games/details` | 1 h | 24 h |
  | `/api/dolar` | 5 min | 1 h |
  | `/api/taxes` | 24 h | 24 h |

## Running locally

Requirements: Node.js 18+.

1. Install and start the app:

   ```bash
   npm install
   npm run dev
   ```

2. Open <http://localhost:3000>.

### Environment variables

| Variable | Default | Description |
| --- | --- | --- |
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
