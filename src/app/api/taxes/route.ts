import { gamesAndServicesTaxes } from "@/server/taxes";
import { jsonResponse } from "@/utils/cacheControl";

export const runtime = "edge";

export async function GET() {
  const taxes = gamesAndServicesTaxes.map((tax, index) => ({
    name: tax.tax,
    percentage: tax.percentage,
    id: index
  }));

  return jsonResponse(taxes, "taxes");
}
