import { useLazyGetGamesQuery } from "@/services/games";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GameCard } from "../partial/GameCard";

export function GameCardList() {

  const [trigger, { data: games, isLoading }] = useLazyGetGamesQuery();

  const [filter, setFilter] = useState();

  useEffect(() => {
    trigger();
  }, [filter])

  // const isLoading = true;

  if (isLoading || !games) return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
      {
        [...Array(5)].map((_, i) => (<GameCard key={i} isLoading />))
      }
    </Stack>
  )

  return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
      {games.map((game, i) => <GameCard key={i} gameData={game} />)}
    </Stack>
  );
}



