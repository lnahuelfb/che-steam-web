import { GameDetails } from '@/types';
import styles from './styles.module.css';

export default function GameDetailsCard({ game }: { game: GameDetails }) {
  // Función para formatear el precio en ARS
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

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
            {/* Precio en pesos */}
            <div>
              <span className={styles.initialPrice}>
                {formatPrice(game.priceOverview.priceOficial)}
              </span>
              {game.priceOverview.discount && (
                <span className={styles.finalPrice}>
                  {formatPrice(game.priceOverview.priceOficial * (game.priceOverview.final / game.priceOverview.initial))}
                </span>
              )}
              {game.priceOverview.discount && (
                <span className={styles.discount}>
                  {game.priceOverview.discountPercent}% OFF
                </span>
              )}
            </div>
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
                      <td>${sub.price} USD</td> {/* Precio en USD */}
                      <td>{formatPrice(sub.priceOficial)}</td> {/* Precio oficial en ARS */}
                      <td>{formatPrice(sub.priceMep)}</td> {/* Precio MEP en ARS */}
                      <td>{formatPrice(sub.priceCrypto)}</td> {/* Precio en criptomonedas en ARS */}
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


// import { GameDetails } from '@/types';
// import styles from './styles.module.css';

// export default function GameDetailsCard({ game }: { game: GameDetails }) {
//   return (
//     <div className={styles.card}>
//       {/* Información general del juego */}
//       <div className={styles.headerImage}>
//         <img src={game.headerImage} alt={game.name} />
//       </div>
//       <div className={styles.info}>
//         <h1 className={styles.name}>{game.name}</h1>
//         <p className={styles.description}>{game.description}</p>
//       </div>
//       <div className={styles.price}>
//         {game.isFree ? (
//           <span className={styles.free}>Gratis</span>
//         ) : (
//           <>
//             <span className={styles.initialPrice}>
//               ${game.priceOverview.initial} USD
//             </span>
//             <span className={styles.finalPrice}>
//               ${game.priceOverview.final} USD
//             </span>
//             {game.priceOverview.discount && (
//               <span className={styles.discount}>
//                 {game.priceOverview.discountPercent}% OFF
//               </span>
//             )}
//           </>
//         )}
//       </div>

//       {/* Subs (paquetes) */}
//       {game.packageGroups && game.packageGroups.length > 0 && (
//         <div className={styles.packages}>
//           <h3>Paquetes Disponibles</h3>
//           {game.packageGroups.map((group, groupIndex) => (
//             <div key={groupIndex} className={styles.packageGroup}>
//               <h4>{group.title}</h4>
//               <table className={styles.table}>
//                 <thead>
//                   <tr>
//                     <th>Título</th>
//                     <th>Precio (USD)</th>
//                     <th>Precio Oficial (ARS)</th>
//                     <th>Precio MEP (ARS)</th>
//                     <th>Precio Cripto (ARS)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {group.subs.map((sub, subIndex) => (
//                     <tr key={subIndex}>
//                       <td>{sub.title}</td>
//                       <td>${sub.price}</td>
//                       <td>${sub.priceOficial}</td>
//                       <td>${sub.priceMep}</td>
//                       <td>${sub.priceCrypto}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
