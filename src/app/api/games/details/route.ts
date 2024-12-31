import { config } from "@/config";

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
    const response = await fetch(`${config.apiURL}/games/details/${id}`);

    const data = await response.json();

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
  }

}