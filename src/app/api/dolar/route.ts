import { fetchDolarPrice } from "@/server/dolar";
import { jsonResponse } from "@/utils/cacheControl";

export const runtime = "edge";

export async function GET() {
  const quotes = await fetchDolarPrice();

  if (!quotes) {
    return new Response(JSON.stringify({
      error: "Error al obtener el precio del dólar."
    }), { status: 404 });
  }

  const dolares = quotes.map((dolar, index) => ({
    name: dolar.nombre,
    price: dolar.venta,
    id: index
  }));

  return jsonResponse(dolares, "dolar");
}
