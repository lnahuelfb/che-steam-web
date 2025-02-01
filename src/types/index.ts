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

export interface GameDetails {
  id: string,
  name: string,
  isFree: boolean,
  type: string,
  headerImage: string,
  description: string,
  priceOverview: PriceOverview,
  packageGroups: PackageGroup[],
}

type PriceOverview = {
  initial: number,
  initialARS: number,
  final: number,
  priceOficial: number,
  priceMep: number,
  priceCrypto: number,
  discount: boolean,
  discountPercent: number,
}

type PackageGroup = {
  title: string,
  subs: Package[]
}

type Package = {
  id: number,
  title: string,
  price: number,
  priceOficial: number,
  priceMep: number,
  priceCrypto: number,
  discount: string,
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

export interface Tax {
  name: string;
  percentage: number;
  id: number;
}

export interface Dolar {
  name: string;
  price: number;
  id: number;
}


export type ChangeType = 'release' | 'feature' | 'fix';

export type ScopeType = 'web' | 'server' | 'general' | 'bot';