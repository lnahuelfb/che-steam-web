"use client";

import { useState } from "react";
import { Game } from "@/types";
import { GameCard } from "@/components/GameCard";
import styles from "./page.module.css";

export default function Page() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [lastSearch, setLastSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getGames = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === "") {
      setError("Debes escribir el título");
      return;
    }

    if (search === lastSearch) {
      return;
    }

    setGames([]);
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/games?title=${search}`);

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setGames(data);
      } else {
        setGames([]); // Vacía la lista si no se encontraron juegos
        setError(data.error || "No se encontraron juegos");
      }

      setLastSearch(search);
    } catch (error) {
      console.error("Error al buscar juegos:", error);
      setError("Error al buscar los juegos");
      setGames([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className={styles.main}>
      <h1 className={styles.title}>¡Buscá tus juegos!</h1>
      <article>
        <form onSubmit={getGames} className={styles.search}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Busca tu juego, DLC o bundle</legend>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Busca tu juego, DLC o bundle"
              required
            />
            <button type="submit" className={styles.button}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

          </fieldset>
        </form>
        <p>Referencia:</p>
        <ul className={styles.referenceList}>
          <li>💵 <strong>Precio oficial</strong></li>
          <li>💳 <strong>Precio dólar tarjeta</strong></li>
          <li>💰 <strong>Precio dólar MEP</strong></li>
          <li>🪙 <strong>Precio dólar Crypto</strong></li>
          <li>🏛️ <strong>Impuestos</strong></li>
        </ul>
        <div className={styles.games}>
          {loading && <p>Cargando...</p>}
          {error && <h3>{error}</h3>}

          {games?.length > 0 &&
            games.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </article>
    </section>
  );
}
