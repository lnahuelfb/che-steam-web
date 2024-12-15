"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  const getGames = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/games?title=${search}`);
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
        <form onSubmit={getGames}>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {
          games?.map((game: any) => (
            <div key={game.id}>
              <img src={game.img} alt={game.name} />
              <h2>{game.name}</h2>
              <p>{game.price}</p>
            </div>
          ))
        }
      </section>
    </article>
  );
}
