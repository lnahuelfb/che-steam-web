import Link from 'next/link'
import styles from './page.module.css'

const Page = () => {
  return (
    <main>
      <section className={styles.container}>
        <figure className={styles.imageContainer}>
          <img src="/CheSteam.png" alt="Che Steam!" />
        </figure>
        <div className={styles.textContainer}>
          <h1>🎮 Che Steam 🎮</h1>
          <h2>Conoce el Precio Real de tus Juegos</h2>
          <h3>
            Convierte precios de videojuegos en pesos argentinos, con impuestos incluidos
            y al tipo de cambio que elijas: dólar tarjeta, MEP o cripto.
          </h3>
          <p>
            Olvídate de los cálculos complicados. Che Steam te muestra el precio final de
            tus videojuegos en un segundo.
          </p>
          <div className={styles.buttonsContainer}>
            <Link href="/search" className={styles.ctaButton}>
              Buscar juegos
            </Link>
            <Link href="/calculator" className={styles.secondaryButton}>
              Calculadora
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
