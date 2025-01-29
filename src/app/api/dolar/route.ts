import { config } from "@/config";

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

    return new Response(JSON.stringify(dolares), { status: 200 })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      error: "Error al obtener los impuestos."
    }), { status: 404 });
  }
}