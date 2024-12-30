import { GameDetails } from "@/types";
import GameDetailsCard from '../../../components/GameDetails/index';

async function fetchGameDetails(id: string) {
  const response = await fetch(`https://che-steam-backend.vercel.app/api/games/details/${id}`);
  const data: GameDetails = await response.json();

  console.log(data.packageGroups?.map((group) => group.subs.map((pkg) => pkg)));

  return data;
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const game = await fetchGameDetails(id);

  return (
    <>
      <GameDetailsCard game={game} />
    </>
  );
}