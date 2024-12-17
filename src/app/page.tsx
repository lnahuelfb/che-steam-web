import { CommandsTable } from '@/components/CommandsTable'
import { Commands } from '@/types'
import { DiscordLogo } from '@/components/DiscordLogo'
import styles from './page.module.css'

const Page = () => {
  const commands: Commands[] = [
    {
      command: '$precio [nombre del juego]',
      description: 'Muestra el precio de un juego en pesos argentinos'
    },
    {
      command: '$dolar',
      description: 'Muestra la cotizacion de los distintos tipos de dolares'
    },
    {
      command: '$dolar [tipo de cambio]',
      description: 'Muestra la cotización de un tipo de cambio, oficial, mep o cripto'
    },
    {
      command: '$help',
      description: 'Muestra una guia de comandos'
    },
    {
      command: '$support',
      description: 'Muestra un enlace para donar a mi página de cafecito'
    },
    {
      command: '$hola',
      description: 'Muestra un mensaje de bienvenida'
    }
  ]

  return (
    <>
      <section className={styles.container}>
        <figure className={styles.imageContainer}>
          <img src="/CheSteam.png" alt="Che Steam!" />
        </figure>
        <div className={styles.textContainer}>
          <h1>🎮 Che Steam! 🎮</h1>
          <h2>Conoce el Precio Real de tus Juegos</h2>
          <h3>
            Convierte precios de videojuegos en pesos argentinos, con impuestos incluidos
            y al tipo de cambio que elijas: dólar tarjeta, MEP o cripto.
          </h3>
          <p>
            Olvídate de los cálculos complicados. Che Steam te muestra el precio final de
            tus videojuegos en un segundo.
          </p>
          <button className={styles.ctaButton}>
            <DiscordLogo />
            <a href="https://discord.com/oauth2/authorize?client_id=1309597307976548472&scope=bot&permissions=3072" target="_blank" rel="noreferrer">
              <p>Invitar al Bot</p>
            </a>
          </button>
        </div>
      </section>
      <section className={styles.commandsContainer}>
        <h2 className={styles.title}>Comandos</h2>
        <CommandsTable commands={commands} />
      </section>
    </>
  )
}

export default Page
