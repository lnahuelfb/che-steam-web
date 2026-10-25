import { searchGames } from "@/server/steam";
import { jsonResponse } from "@/utils/cacheControl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  if (!title) {
    return new Response(
      JSON.stringify({ error: "Debe proporcionar un título para buscar." }),
      { status: 400 }
    );
  }

  try {
    const games = await searchGames(title);

    if (!games || games.length === 0) {
      return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
    }

    return jsonResponse(games, "games");
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
  }
}
