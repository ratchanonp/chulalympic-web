import Navbar from "@/components/common/Navbar/Navbar";
import { GameCard } from "@/components/partial/GameCard";
import GameCardSkeleton from "@/components/partial/GameCard/GameCardSkeleton";
import { useLazyGetGamesQuery } from "@/services/games";
import { useLazyGetSportQuery } from "@/services/sport";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Heading, Icon, Skeleton, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoCalendar } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";

export default function SportById() {
    return (
        <>
            <Head>
                <title>Chula Olympic 2023 | กีฬา</title>
            </Head>
            <Navbar />
            <SportHeader />
            <Container maxW="container.xl" py={5}>
                <Heading>การแข่งขัน</Heading>
                <Stack gap={10} mt={10}>
                    <SportGames />
                </Stack>
            </Container>
        </>
    );
}

function SportHeader() {

    const router = useRouter();
    const { id } = router.query;

    // const { data, isLoading } = useGetSportQuery(id);
    const [trigger, { data, isLoading }] = useLazyGetSportQuery();

    useEffect(() => {
        if (router.isReady) {
            trigger(id as string);
        }
    }, [router.isReady])


    return (
        <Flex bgColor="gray.50" py={10} as="header">
            <Container maxW="container.xl">
                <Button onClick={() => router.back()} variant="outline" borderColor="pink.400" color="pink.400" fontSize="lg" colorScheme="pink" fontFamily="athiti" fontWeight="light" px={2}>
                    {" "}
                    <Icon fontSize="2xl" as={ChevronLeftIcon} mr={1} /> ย้อนกลับ
                </Button>
                <Skeleton isLoaded={!isLoading} width="fit-content">
                    <Heading as="h1" size="4xl" mt={10} display="flex" alignItems="center">{data?.name}</Heading>
                </Skeleton>

                {/* <Stack
                    mt={{
                        base: 5,
                        md: 10,
                    }}
                >
                    <Heading as="h2" size="lg" fontWeight="medium">
                        สรุปรางวัล
                    </Heading>
                    <Grid
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                        }}
                        gap={2}
                        fontFamily="athiti"
                    >
                        <GridItem p={5} borderRadius={10} border="1px" borderColor="gray.100" bg="white">
                            <Stack direction={{
                                base: "row",
                                md: "column"
                            }} alignItems="center" justifyContent="space-between">
                                <Heading as="h3" size="md" color="gold" w="fit-content">
                                    🥇 เหรียญทอง
                                </Heading>
                                <Text fontSize={{
                                    base: "lg",
                                    md: "3xl"
                                }} fontWeight="black">
                                    วิทยาศาสตร์
                                </Text>
                            </Stack>
                        </GridItem>
                        <GridItem p={5} borderRadius={10} border="1px" borderColor="gray.100" bg="white">
                            <Stack direction={{
                                base: "row",
                                md: "column"
                            }} alignItems="center" justifyContent="space-between">
                                <Heading as="h3" size="md" color="silver" w="fit-content">
                                    🥈 เหรียญเงิน
                                </Heading>
                                <Text fontSize={{
                                    base: "lg",
                                    md: "3xl"
                                }} fontWeight="black">
                                    วิศวกรรมศาสตร์
                                </Text>
                            </Stack>
                        </GridItem>
                        <GridItem p={5} borderRadius={10} border="1px" borderColor="gray.100" bg="white">
                            <Stack direction={{
                                base: "row",
                                md: "column"
                            }} alignItems="center" justifyContent="space-between">
                                <Heading as="h3" size="md" color="brown" w="fit-content">
                                    🥉 เหรียญทองแดง
                                </Heading>
                                <Text noOfLines={1} fontSize={{
                                    base: "lg",
                                    md: "3xl"
                                }} fontWeight="black">
                                    พานิชยศาสตร์และการบัญชี
                                </Text>
                            </Stack>
                        </GridItem>
                    </Grid>
                </Stack> */}
            </Container>
        </Flex >
    );
}

function SportGames() {
    const router = useRouter()
    const { id } = router.query

    const [trigger, { isLoading, data: games }] = useLazyGetGamesQuery();


    useEffect(() => {
        if (router.isReady && id) {
            const filter = {
                sports: [id as string]
            }
            trigger(filter)

        }
    }, [router.isReady])

    if (isLoading) {
        return (
            <Stack w="full" borderRadius={10} spacing={3} flex="auto">
                {[...Array(5)].map((_, i) => (
                    <GameCardSkeleton key={i} />
                ))}
            </Stack>
        );
    }

    if (!games) return (
        <Stack w="full" borderRadius={10} spacing={3} flex="auto" bgColor="white" py={4} alignItems="center" justifyContent="center">
            <Icon as={SlMagnifier} w={20} h={20} color="gray.400" />
            <Text textAlign="center" fontSize="2xl" fontFamily="athiti" fontWeight="medium" >ไม่พบผลการค้นหา</Text>
        </Stack>
    )


    // Group games by date
    const gamesByDate = games.reduce((acc, game) => {
        const date = new Date(game.start).toLocaleDateString()
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(game)
        return acc
    }, {} as { [key: string]: any[] })


    return (
        <Stack w="full" borderRadius={10} spacing={3} flex="auto">
            {Object.entries(gamesByDate).map(([date, games]) => (
                <Stack key={date} w="full" borderRadius={10} spacing={3} flex="auto" bgColor="white" mt={4}>
                    <Heading size="md" color="gray.400" fontWeight="medium" alignItems="center" display="flex">
                        <Icon mr={2} as={IoCalendar} />
                        {
                            new Date(date).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                        }
                    </Heading>
                    <Stack w="full" borderRadius={10} spacing={3} flex="auto">
                        {games.map((game, i) => (
                            <GameCard key={i} gameData={game} />
                        ))}
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}
