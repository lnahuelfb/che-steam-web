import { Game } from "@/types"
import styles from "./styles.module.css"
import Image from "next/image"

export const GameCard = ({ game }: { game: Game }) => {

  const type = (game: Game) => {
    switch (game.type) {
      case 'game':
        return 'Juego'
      case 'dlc':
        return 'DLC'
      case 'bundle':
        return 'Bundle'
      default:
        return 'Juego'
    }
  }

  return (
    <article className={styles.gameCard}>
      <Image
        className={styles.image}
        src={game.image}
        alt={game.name}
        width={231}
        height={87}
      />
      <div className={styles.infoContainer}>
        <a
          href={`https://store.steampowered.com/app/${game.id}`}
          target="_blank"
          rel="noreferrer"
          className={styles.titleLink}
          aria-label={`Ver más sobre el juego ${game.name} en la tienda de Steam`}
        >
          <h1 className={styles.title}>
            {game.name} <span className={styles.typeBadge}>{type(game)}</span>
          </h1>
        </a>
        <ul className={styles.priceContainer}>
          <li className={`${styles.priceRow} ${styles.freePrice}`}>

            {game.formattedPrice === 'Gratis'
              ? <span className={styles.freePrice}>¡Gratis!</span>
              : <span className={styles.freePrice}>
                💵 {game.formattedPrice}{' '}USD
              </span>
            }

          </li>
          <li className={styles.priceRow}>
            <p>
              💳 {game.formattedTotalOfficialPrice} (🏛️
              {game.formattedOfficialTaxes})
            </p>
          </li>
          <li className={styles.priceRow}>
            <p>
              💰 {game.formattedTotalMepPrice} (🏛️{game.formattedMepTaxes})
            </p>
          </li>
          <li className={styles.priceRow}>
            <p>
              🪙 {game.formattedTotalCryptoPrice} (🏛️
              {game.formattedCryptoTaxes})
            </p>
          </li>
        </ul>
      </div>
    </article>

  )
}
