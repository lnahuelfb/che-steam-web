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
      setError("Debes escribir el titulo");
      return;
    }

    if (search == lastSearch) {
      return;
    }

    setGames([]);
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/games?title=${search}`);

      if (!res.ok) {
        setError(`Error: ${res.statusText}`);
      }

      const data = await res.json();


      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      setLastSearch(search);
      setGames(data);
    } catch (error) {
      console.error("Error al buscar juegos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.main}>
      <h1>¡Buscá tus juegos!</h1>
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
            <button type="submit">Buscar</button>
          </fieldset>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p>Referencia:</p>
        <p>
          💵 Precio oficial
          💳 Precio dolar Tarjeta impuestos incluidos
          💰 Precio dolar MEP impuestos incluidos
          🪙 Precio dolar Crypto
          🏛️ Impuestos
        </p>
        <div className={styles.games}>
          {
            loading && <p>Cargando...</p>
          }
          {
            games?.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          }
        </div>
      </article>
    </section>
  );
}
