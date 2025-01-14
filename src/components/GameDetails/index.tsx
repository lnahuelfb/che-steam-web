import { GameDetails } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import styles from './styles.module.css';

export default function GameDetailsCard({ game }: { game: GameDetails }) {
  return (
    <div className={styles.card}>
      <div className={styles.headerImage}>
        <img src={game.headerImage} alt={game.name} />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{game.name}</h1>
        <p className={styles.description}>{game.description}</p>
      </div>
      <div className={styles.price}>
        {game.isFree ? (
          <span className={styles.free}>Gratis</span>
        ) : (
          <>
            {game.priceOverview.discount
              ? (
                <>
                  <div className={styles.priceContainer}>
                    <span className={styles.initialPrice}>
                      {formatPrice(game.priceOverview.initialARS)}
                    </span>
                    {game.priceOverview.discount && (
                      <span className={styles.finalPrice}>
                        {formatPrice(game.priceOverview.priceOficial)}
                      </span>
                    )}
                    {game.priceOverview.discount && (
                      <span className={styles.discount}>
                        {game.priceOverview.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <a
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.steamLink}
                  >
                    Ver en Steam
                  </a>
                </>
              )
              : (
                <>
                  <span className={styles.finalPrice}>
                    {formatPrice(game.priceOverview.initialARS)}
                  </span>
                  <a
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.steamLink}>
                    Ver en Steam
                  </a>
                </>
              )
            }
          </>
        )}
      </div>

      {/* Subs (paquetes) */}
      {game.packageGroups && game.packageGroups.length > 0 && (
        <div className={styles.packages}>
          <h3>Paquetes Disponibles</h3>
          {game.packageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.packageGroup}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Precio (USD)</th>
                    <th>Precio Oficial (ARS)</th>
                    <th>Precio MEP (ARS)</th>
                    <th>Precio Cripto (ARS)</th>
                  </tr>
                </thead>
                <tbody>
                  {group.subs.map((sub, subIndex) => (
                    <tr key={subIndex}>
                      <td>{sub.title}</td>
                      <td>${sub.price} USD</td>
                      <td>{formatPrice(sub.priceOficial)}</td>
                      <td>{formatPrice(sub.priceMep)}</td>
                      <td>{formatPrice(sub.priceCrypto)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}