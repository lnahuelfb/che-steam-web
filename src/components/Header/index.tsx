"use client"
import { useState } from "react"
import Link from "next/link"
import styles from "./styles.module.css"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/search", label: "Buscar juegos" },
    { href: "/calculator", label: "Calcula el precio" },
    { href: "/changelog", label: "Changelog" },
  ]

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.link}>
        <img src="/CheSteam.png" alt="CheSteam" className={styles.logo} />
        <h1 className={styles.title}>Che Steam</h1>
      </Link>
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        ☰
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✖
        </button>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link} onClick={() => setMenuOpen(false)}>
                <p>{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
