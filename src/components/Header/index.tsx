import Link from 'next/link';
import styles from './styles.module.css'
import Image from 'next/image';

export const Header = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Buscar juegos' },
    { href: '/changelog', label: 'Changelog' },
  ]

  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.link}>
        <Image src="/CheSteam.png" alt="CheSteam" width={50} height={50} />
        <h1 className={styles.title}>Che Steam!</h1>
      </Link>
      <nav className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>
                <p>{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}