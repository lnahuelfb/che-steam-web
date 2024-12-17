export interface Game {
  id: number;
  name: string;
  image: string;
  type: string;
  formattedPrice: string;
  formattedTotalOfficialPrice: string;
  formattedTotalMepPrice: string;
  formattedTotalCryptoPrice: string;
  formattedOfficialTaxes: string;
  formattedMepTaxes: string;
  formattedCryptoTaxes: string;
}

export interface Commands {
  command: string
  description: string
}