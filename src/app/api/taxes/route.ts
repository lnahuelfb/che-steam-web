import { config } from "@/config";

interface Tax {
  name: string,
  percentage: number
}

interface Data {
  tax: string,
  percentage: number
}

export async function GET() {
  try {
    const response = await fetch(`${config.apiURL}/taxes/gamesAndServices`);

    const data: Data[] = await response.json();

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({
        error: "No se pudieron obtener los impuestos."
      }), { status: 404 });
    }

    const taxes: Tax[] = []

    data.map((tax, index) => {
      const formatTax = {
        name: tax.tax,
        percentage: tax.percentage,
        id: index
      }

      taxes.push(formatTax)
    })

    return new Response(JSON.stringify(taxes), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({
      error: "Error al obtener los impuestos."
    }), { status: 404 });
  }
}