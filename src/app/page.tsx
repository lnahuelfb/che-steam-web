import { CommandsTable } from '@/components/CommandsTable'
import { Commands } from '@/types'
import { DiscordLogo } from '@/components/DiscordLogo'
import styles from './page.module.css'
import Image from 'next/image'

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
    },
    {
      command: '$web',
      description: 'Muestra el enlace de la pagina web del bot'
    }
  ]

  return (
    <>
      <section className={styles.container}>
        <figure className={styles.imageContainer}>
          <Image src="/CheSteam.png" alt="Che Steam!" width={250} height={250} />
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
          <div className={styles.buttonsContainer}>
            <button className={styles.ctaButton}>
              <DiscordLogo />
              <a href="https://discord.com/oauth2/authorize?client_id=1309597307976548472&scope=bot&permissions=3072" target="_blank" rel="noreferrer">
                <p>Invitar al Bot</p>
              </a>
            </button>
            <a href='https://cafecito.app/che-steam' rel='noopener' target='_blank'>
              <img srcSet='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' />
            </a>
          </div>
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
