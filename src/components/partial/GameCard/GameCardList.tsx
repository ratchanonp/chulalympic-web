import { useLazyGetGamesQuery } from "@/services/games";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GameCard } from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

export function GameCardList() {
  const [trigger, { data: games, isLoading }] = useLazyGetGamesQuery();

  const [filter, setFilter] = useState();

  useEffect(() => {
    trigger();
  }, [filter]);

  if (isLoading) {
    return (
      <Stack w="full" borderRadius={10} spacing={3} flex="auto">
        {[...Array(5)].map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </Stack>
    );
  }

  if (!games) return <>ไม่พบ</>;


  return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
      {games.map((game, i) => (
        <GameCard key={i} gameData={game} />
      ))}
    </Stack>
  );
}
