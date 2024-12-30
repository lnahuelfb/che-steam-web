import { GameDetails } from "@/types";
import GameDetailsCard from "@/components/GameDetails/index";

interface PageProps {
  params: { id: string };
}

async function fetchGameDetails(id: string): Promise<GameDetails> {
  const response = await fetch(`https://che-steam-backend.vercel.app/api/games/details/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }
  const data: GameDetails = await response.json();
  return data;
}

export default async function GamePage(context: { params: Promise<PageProps["params"]> }) {
  const params = await context.params; // Espera a que `params` se resuelva
  const { id } = params;

  const game = await fetchGameDetails(id);

  return (
    <div>
      <GameDetailsCard game={game} />
    </div>
  );
}
