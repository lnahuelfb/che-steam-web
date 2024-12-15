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
    const response = await fetch(`https://che-steam-backend.vercel.app/api/games/${title}`);

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "No se pudo encontrar el juego." }), { status: 404 });
  }

}