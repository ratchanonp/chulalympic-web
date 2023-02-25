import { useLazyGetGamesQuery } from "@/services/games";
import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { GameCard } from "../partial/GameCard";

export function GameCardList() {

  const [trigger, { data: games, isLoading }] = useLazyGetGamesQuery();

  useEffect(() => {
    trigger();
  })

  if (isLoading || !games) return (
    <>
      {
        [...Array(3)].map((_, i) => (<GameCard key={i} isLoading />))
      }
    </>
  )

  return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
      {games.map((game, i) => <GameCard key={i} gameData={game} />)}
    </Stack>
  );
}



