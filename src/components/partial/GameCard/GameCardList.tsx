import { useAppSelector } from "@/hooks";
import { useLazyGetGamesQuery } from "@/services/games";
import { Icon, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import { GameCard } from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

export function GameCardList() {
  const [trigger, { data: games, isLoading, error }] = useLazyGetGamesQuery();

  const filter = useAppSelector((state) => state.filter);
  const { } = filter;

  useEffect(() => {
    trigger(filter);
  }, [filter, trigger]);

  if (isLoading) {
    return (
      <Stack w="full" borderRadius={10} spacing={3} flex="auto">
        {[...Array(5)].map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </Stack>
    );
  }

  if (error || !games) return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto" bgColor="white" py={4} alignItems="center" justifyContent="center">
      <Icon as={SlMagnifier} w={20} h={20} color="gray.400" />
      <Text textAlign="center" fontSize="2xl" fontFamily="athiti" fontWeight="medium" >ไม่พบผลการค้นหา</Text>
    </Stack>
  )

  return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
      {games.map((game, i) => (
        <GameCard key={i} gameData={game} />
      ))}
    </Stack>
  );
}
