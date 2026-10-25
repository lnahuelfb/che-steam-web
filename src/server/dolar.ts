export interface DolarQuote {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export type DolarQuotes = [oficial: DolarQuote, mep: DolarQuote, crypto: DolarQuote];

// The rate barely moves day to day and prices are estimates, so a 24 h
// revalidation is enough. Next's data cache survives serverless cold starts.
const REVALIDATE_SECONDS = 24 * 60 * 60;

/** Official, MEP ("bolsa") and crypto quotes from dolarapi.com, in that order. */
export const fetchDolarPrice = async (): Promise<DolarQuotes | null> => {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares", {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const data: DolarQuote[] = await response.json();
    const byCasa = (casa: string) => data.find((d) => d.casa.toLowerCase() === casa);

    const oficial = byCasa("oficial");
    const mep = byCasa("bolsa");
    const crypto = byCasa("cripto");

    if (!oficial || !mep || !crypto) {
      console.warn("No se encontraron los tres tipos de dólares esperados.");
      return null;
    }

    return [oficial, mep, crypto];
  } catch (error) {
    console.error("Error al obtener el precio del dólar:", error);
    return null;
  }
};
