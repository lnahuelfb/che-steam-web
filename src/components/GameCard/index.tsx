import { Game } from "@/types";
import styles from "./styles.module.css";
import Link from "next/link";

export const GameCard = ({ game }: { game: Game }) => {
  const typeLabels: Record<Game["type"], string> = {
    game: "Juego",
    dlc: "DLC",
    bundle: "Bundle",
  };

  const gameType = typeLabels[game.type] || "Juego";

  const renderPriceRow = (label: string, value: string) => (
    <li className={styles.priceRow}>
      <p>
        {label} {value}
      </p>
    </li>
  );

  return (
    <article className={styles.gameCard}>
      <img
        className={styles.image}
        src={game.image}
        alt={game.name}
      />
      <div className={styles.infoContainer}>
        <a
          href={`https://store.steampowered.com/app/${game.id}`}
          target="_blank"
          rel="noreferrer"
          className={styles.titleLink}
          aria-label={`Ver más sobre el juego ${game.name} en la tienda de Steam`}
        >
          <h1 className={styles.title}>{game.name}</h1>
          <span className={styles.typeBadge}>{gameType}</span>
        </a>
        <ul className={styles.priceContainer}>
          {game.formattedPrice === "Gratis" ? (
            <li className={styles.priceRow}>
              <span className={styles.priceHighlight}>¡Gratis!</span>
            </li>
          ) : (
            renderPriceRow("💵", `${game.formattedPrice} USD`)
          )}
          {renderPriceRow("💳", `${game.formattedTotalOfficialPrice} (🏛️${game.formattedOfficialTaxes})`)}
          {renderPriceRow("💰", `${game.formattedTotalMepPrice} (🏛️${game.formattedMepTaxes})`)}
          {renderPriceRow("🪙", `${game.formattedTotalCryptoPrice} (🏛️${game.formattedCryptoTaxes})`)}
        </ul>
        <div className={styles.linksContainer}>
          <Link href={`/games/${game.id}`}>
            <p className={styles.link}>Ver más</p>
          </Link>
          <a
            href={`https://store.steampowered.com/app/${game.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className={styles.link}>
              Ver en Steam
            </p>
          </a>
        </div>
      </div>
    </article >
  );
};