import { config } from "@/config";
import { jsonResponse } from "@/utils/cacheControl";

interface Dolar {
  name: string,
  price: number,
  id: number
}

interface Data {
  moneda: string,
  casa: string,
  nombre: string,
  compra: number,
  venta: number,
  fechaActualizacion: string
}

export async function GET() {
  try {
    const response = await fetch(`${config.apiURL}/dolar`);
    const data: Data[] = await response.json();

    const dolares: Dolar[] = []

    data.map((dolar, index) => {
      const newDolar = {
        name: dolar.nombre,
        price: dolar.venta,
        id: index
      }

      dolares.push(newDolar)
    })

    return jsonResponse(dolares, "dolar")
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      error: "Error al obtener el precio del dólar."
    }), { status: 404 });
  }
}