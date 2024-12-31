import { GameDetails } from "@/types";
import GameDetailsCard from "@/components/GameDetails/index";
import { config } from "@/config";

interface PageProps {
  params: { id: string };
}

async function fetchGameDetails(id: string): Promise<GameDetails> {
  const response = await fetch(`${config.baseURL}/api/games/details?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }
  const data: GameDetails = await response.json();
  return data;
}

export default async function GamePage(context: { params: Promise<PageProps["params"]> }) {
  const params = await context.params;
  const { id } = params;

  const game = await fetchGameDetails(id);

  return (
    <div>
      <GameDetailsCard game={game} />
    </div>
  );
}
