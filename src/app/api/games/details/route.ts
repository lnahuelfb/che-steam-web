import { fetchGameDetails } from "@/server/steam";
import { jsonResponse } from "@/utils/cacheControl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Debe proporcionar un id para buscar." }),
      { status: 400 }
    );
  }

  try {
    const data = await fetchGameDetails(id);

    if (!data) {
      return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
    }

    return jsonResponse(data, "games");
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
  }
}
