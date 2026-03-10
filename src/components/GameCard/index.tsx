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

  const renderPriceRow = (icon: string, label: string, total: string, taxes: string, isGratis: boolean = false) => (
    <div className={styles.priceDetailRow}>
      <div className={styles.methodInfo}>
        <span className={styles.methodIcon}>{icon}</span>
        <span className={styles.methodName}>{label}</span>
      </div>
      <div className={styles.valuesInfo}>
        <span className={isGratis ? styles.priceHighlight : styles.totalValue}>
          {isGratis ? "¡GRATIS!" : total + " (Final)"}
        </span>
        {!isGratis && <span className={styles.taxValue}> {taxes} (impuestos)</span>}
      </div>
    </div>
  );

  return (
    <article className={styles.gameCard}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={game.image} alt={game.name} />
        <div className={styles.usdBadge}>
           {game.formattedPrice === "Gratis" ? "GRATIS" : `${game.formattedPrice} USD`}
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>{game.name}</h1>
          <span className={styles.typeBadge}>{gameType}</span>
        </div>

        <div className={styles.taxBreakdownContainer}>
          <p className={styles.breakdownTitle}>DESGLOSE DE PAGO (ARS)</p>
          
          {game.formattedPrice === "Gratis" ? (
             renderPriceRow("🎁", "Costo Final", "¡Gratis!", "", true)
          ) : (
            <>
              {renderPriceRow("🏛️", "Dólar Oficial", game.formattedTotalOfficialPrice, game.formattedOfficialTaxes)}
              {renderPriceRow("💳", "Dólar Tarjeta", game.formattedTotalMepPrice, game.formattedMepTaxes)}
              {renderPriceRow("🪙", "Dólar Cripto", game.formattedTotalCryptoPrice, game.formattedCryptoTaxes)}
            </>
          )}
        </div>

        <div className={styles.actions}>
          <Link href={`/games/${game.id}`} className={styles.btnSecondary}>
            Ver Detalles
          </Link>
          <a 
            href={`https://store.steampowered.com/app/${game.id}`} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.btnPrimary}
          >
            Ver en Steam
          </a>
        </div>
      </div>
    </article>
  );
};