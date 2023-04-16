import { useAppSelector } from "@/hooks";
import { GameStatus } from "@/interfaces/game.interface";
import { useLazyGetGamesQuery } from "@/services/games";
import { Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import { GameCard } from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

export function GameCardList() {

  const [trigger, { data: games, isLoading, error }] = useLazyGetGamesQuery();
  const router = useRouter();

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
    <Stack w="full" borderRadius={10} spacing={3} flex="auto" bgColor="white" py={5} alignItems="center" justifyContent="center">
      <Icon as={SlMagnifier} w={20} h={20} color="gray.400" />
      <Text textAlign="center" fontSize="2xl" fontFamily="athiti" fontWeight="medium" >ไม่พบผลการค้นหา</Text>
    </Stack>
  )

  // sort from status "scored" to "not scored" and start time
  const sorted = [...games].sort((a, b) => {
    const aStatus = a.status;
    const bStatus = b.status;

    if (aStatus === GameStatus.SCORED && bStatus !== GameStatus.SCORED) {
      return -1;
    } else if (aStatus !== GameStatus.SCORED && bStatus === GameStatus.SCORED) {
      return 1;
    } else {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    }
  }
  );

  return (
    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
      {sorted.map((game, i) => (
        <GameCard key={i} gameData={game} canEdit={router.pathname.includes("admin")} />
      ))}
    </Stack>
  );
}
