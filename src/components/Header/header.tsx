import Link from 'next/link';
import styles from './styles.module.css'
import Image from 'next/image';

const header = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/changelog', label: 'Changelog' },
    { href: '/search', label: 'Buscar juegos' },
  ]

  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.link}>
      <Image src="/CheSteam.png" alt="CheSteam" width={75} height={75} />
        <h1 className={styles.title}>Che Steam!</h1>
      </Link>
      <nav className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default header