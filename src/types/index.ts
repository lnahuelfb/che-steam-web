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

export interface ChangeLog {
  version: string
  changes: Changes[]
  date: string
}

export interface Changes {
  type: ChangeType
  title: string
  description?: string
  scope?: ScopeType
}

export type ChangeType = 'release' | 'feature' | 'fix';

export type ScopeType = 'web' | 'server' | 'general' | 'bot';