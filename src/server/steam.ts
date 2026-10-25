import { Game } from "./Game";
import { fetchDolarPrice } from "./dolar";
import { officialTaxes, mepTaxes } from "./taxes";

// Steam prices change rarely and are shown as estimates.
const REVALIDATE_SECONDS = 24 * 60 * 60;

const STEAM_STORE = "https://store.steampowered.com";

interface SuggestItem {
  id: number;
  type: string;
  name: string;
  price: string;
  img: string;
  small_cap: string;
}

// The Steam storefront endpoints return loosely typed JSON; `any` is kept for
// the parts of `appdetails` that are only read, never produced, by this app.
/* eslint-disable @typescript-eslint/no-explicit-any */

const RELEVANT_TYPES = new Set(["game", "sub", "dlc", "bundle"]);

const isFreeDlc = (item: SuggestItem) =>
  item.type === "dlc" && (item.price === "Gratuito" || item.price === "Free to Play");

const getSuggestions = async (title: string): Promise<SuggestItem[] | null> => {
  try {
    const response = await fetch(
      `${STEAM_STORE}/search/suggest?cc=AR&l=spanish&f=jsonfull&term=${encodeURIComponent(title)}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );

    if (!response.ok) {
      return null;
    }

    const data: SuggestItem[] = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const filtered = data.filter(
      (item) => RELEVANT_TYPES.has(item.type) && !isFreeDlc(item)
    );

    return filtered.length > 0 ? filtered : null;
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    return null;
  }
};

/** Search Steam (region AR) and price each result under every exchange rate. */
export const searchGames = async (title: string) => {
  const [games, dolar] = await Promise.all([getSuggestions(title), fetchDolarPrice()]);

  if (!games || !dolar) {
    return null;
  }

  const [oficial, mep, crypto] = dolar;

  return games
    .filter((game) => game.price && game.price.trim() !== "")
    .map((game) => {
      const g = new Game(
        game.id,
        game.name,
        game.price,
        game.small_cap,
        game.type,
        oficial.venta,
        mep.venta,
        crypto.venta
      );

      return {
        id: g.getId(),
        name: g.getName(),
        image: g.getImage(),
        type: g.getType(),
        formattedPrice: g.formattedPrice(),
        formattedTotalOfficialPrice: g.formattedTotalOfficialPrice(),
        formattedTotalMepPrice: g.formattedTotalMepPrice(),
        formattedTotalCryptoPrice: g.formattedTotalCryptoPrice(),
        formattedOfficialTaxes: g.formattedOfficialTaxes(),
        formattedMepTaxes: g.formattedMepTaxes(),
        formattedCryptoTaxes: g.formattedCryptoTaxes(),
      };
    });
};

// ---------------------------------------------------------------------------
// Game details
// ---------------------------------------------------------------------------

function calculatePrice(basePrice: number, rate: number, taxes: number[]): number {
  const totalTaxRate = taxes.reduce((acc, tax) => acc + tax, 0);
  return parseFloat((basePrice * (1 + totalTaxRate) * rate).toFixed(2));
}

function formatTitle(optionText: string): string {
  return optionText.replace(/[^a-zA-Z0-9\s\-\.\:]/g, "").split(" - span")[0];
}

function filterSubs(subs: any[]): any[] {
  return subs.filter((sub) => !sub.option_text.includes("Commercial License"));
}

/** Fetch a game's details from Steam and price it under every exchange rate. */
export const fetchGameDetails = async (id: string) => {
  const dolar = await fetchDolarPrice();
  if (!dolar) return null;

  const [oficial, mep, crypto] = dolar;

  const res = await fetch(
    `${STEAM_STORE}/api/appdetails?cc=AR&l=spanish&appids=${encodeURIComponent(id)}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  const body = await res.json();
  const game = body[id]?.data;

  if (!game) return null;

  const {
    steam_appid,
    name,
    is_free,
    type,
    header_image,
    price_overview,
    package_groups,
    short_description,
  } = game;

  return {
    id: steam_appid,
    name,
    isFree: is_free,
    type,
    headerImage: header_image,
    description: short_description,
    priceOverview: {
      initial: price_overview.initial / 100,
      initialARS: calculatePrice(price_overview.initial / 100, oficial.venta, officialTaxes),
      final: price_overview.final / 100,
      priceOficial: calculatePrice(price_overview.final / 100, oficial.venta, officialTaxes),
      priceMep: calculatePrice(price_overview.final / 100, mep.venta, mepTaxes),
      priceCrypto: ((price_overview.final / 100) * crypto.venta).toFixed(2),
      discount: price_overview.discount_percent > 0,
      discountPercent: price_overview.discount_percent,
    },
    packageGroups: package_groups.map((item: any) => ({
      title: item.title.split(" ").slice(1).join(" "),
      subs: filterSubs(item.subs).map((sub: any) => {
        const { packageid, percent_savings_text, option_text, price_in_cents_with_discount } = sub;
        const price = price_in_cents_with_discount / 100;

        return {
          id: packageid,
          title: formatTitle(option_text),
          price,
          priceOficial: calculatePrice(price, oficial.venta, officialTaxes),
          priceMep: calculatePrice(price, mep.venta, mepTaxes),
          priceCrypto: (price * crypto.venta).toFixed(2),
          discount: percent_savings_text.replace(/[^0-9]/g, ""),
        };
      }),
    })),
  };
};
