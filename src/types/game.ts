export interface Game {
  id: number;
  name: string;
  image: string;
  formattedPrice: string;
  formattedTotalOfficialPrice: string;
  formattedTotalMepPrice: string;
  formattedTotalCryptoPrice: string;
  formattedOfficialTaxes: string;
  formattedMepTaxes: string;
  formattedCryptoTaxes: string;
}