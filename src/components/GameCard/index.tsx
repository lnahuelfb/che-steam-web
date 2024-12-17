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
      <Image className={styles.image} src={game.image} alt={game.name} />
      <div className={styles.infoContainer}>
        <a href={`https://store.steampowered.com/app/${game.id}`} target="_blank" rel="noreferrer">
          <h1 className={styles.title}>{game.name} ({type(game)})</h1>
        </a>
        <div className={styles.priceContainer}>
          <p className={styles.price}>💵 {game.formattedPrice} {game.formattedPrice === 'Gratis' ? '' : 'USD'}</p>
          <p className={styles.price}>💳 {game.formattedTotalOfficialPrice} (🏛️{game.formattedOfficialTaxes})</p>
          <p className={styles.price}>💰 {game.formattedTotalMepPrice} (🏛️{game.formattedMepTaxes})</p>
          <p className={styles.price}>🪙 {game.formattedTotalCryptoPrice} (🏛️{game.formattedCryptoTaxes})</p>
        </div>
      </div>
    </article>
  )
}
