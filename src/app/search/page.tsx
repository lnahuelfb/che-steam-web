"use client";

import { useState } from "react";
import { Game } from "@/types";
import { GameCard } from "@/components/GameCard";
import styles from "./page.module.css";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const getGames = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/games?title=${search}`);

      if (!res.ok) {
        setError(`Error: ${res.statusText}`);
      }

      const data = await res.json();

      console.log(data);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      setGames(data);
    } catch (error) {
      console.error("Error al buscar juegos:", error);
    }
  };

  return (
    <article className={styles.main}>
      <h1>Home</h1>
      <section>
        <form onSubmit={getGames} className={styles.search}>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Busca tu juego, dlc o bundle"
            required
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.games}>
          {
            games?.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          }
        </div>

      </section>
    </article>
  );
}
