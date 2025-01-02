import { GameDetails } from "@/types";
import { config } from "@/config";
import GameDetailsCard from "@/components/GameDetails/index";
import Link from "next/link";

import styles from './styles.module.css';

interface PageProps {
  params: { id: string };
}

interface Error {
  error: boolean;
  message: string;
}

async function fetchGameDetails(id: string): Promise<GameDetails | Error> {
  const response = await fetch(`${config.baseURL}/api/games/details?id=${id}`);
  if (!response.ok) {
    return { error: true, message: "Failed to fetch game details" };
  }

  const data: GameDetails | Error = await response.json();

  if ("error" in data && data.error) {
    return { error: true, message: data.message || "Unknown error occurred" };
  }

  return data;
}

function isGameDetails(data: GameDetails | Error): data is GameDetails {
  return !("error" in data);
}

export default async function GamePage(context: { params: Promise<PageProps["params"]> }) {
  const params = await context.params;
  const { id } = params;

  const game = await fetchGameDetails(id);

  if (!isGameDetails(game)) {
    return (
      <div className={styles.container}>
        <h1>Error: {game.message}</h1>);
        <Link href={'/search'} className={styles.button}>
          <p>Volver a buscar Juegos</p>
        </Link>
      </div>)
  }

  return (
    <div>
      <GameDetailsCard game={game} />
    </div>
  );
}