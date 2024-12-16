import { Game } from "@/types/game"
import styles from "./styles.module.css"

export const GameCard = ({ game }: { game: Game }) => {
  return (
    <article className={styles.gameCard}>
      <img className={styles.image} src={game.image} alt={game.name} />
      <h1 className={styles.title}>{game.name}</h1>
      <p className={styles.price}>💵{game.formattedPrice} USD</p>
      <p className={styles.price}>💳{game.formattedTotalOfficialPrice} (🏛️{game.formattedOfficialTaxes})</p>
      <p className={styles.price}>💰{game.formattedTotalMepPrice} Impuestos: (🏛️{game.formattedMepTaxes})</p>
      <p className={styles.price}>🪙{game.formattedTotalCryptoPrice} Impuestos: (🏛️{game.formattedCryptoTaxes})</p>
    </article>
  )
}
