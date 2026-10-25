// Cache-Control policies for the Vercel edge cache (s-maxage) with
// stale-while-revalidate so visitors almost never wait on a cold function.
export const CACHE_POLICIES = {
  // Steam prices change rarely; serve for 1 h, stale for up to 24 h.
  games: "public, s-maxage=3600, stale-while-revalidate=86400",
  // Exchange rates move during the day; revalidate every 5 min.
  dolar: "public, s-maxage=300, stale-while-revalidate=3600",
  // Taxes are defined in the backend code; they only change on deploy.
  taxes: "public, s-maxage=86400, stale-while-revalidate=86400",
} as const;

export const jsonResponse = (
  body: unknown,
  policy: keyof typeof CACHE_POLICIES
) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": CACHE_POLICIES[policy],
    },
  });
