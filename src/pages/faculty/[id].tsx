import Navbar from "@/components/common/Navbar/Navbar"
import { GameCard } from "@/components/partial/GameCard"
import GameCardSkeleton from "@/components/partial/GameCard/GameCardSkeleton"
import { useLazyGetFacultyQuery } from "@/services/faculty"
import { useLazyGetGamesQuery } from "@/services/games"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Button, Container, Flex, Heading, Icon, Skeleton, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { IoCalendar } from "react-icons/io5"

import { SlMagnifier } from "react-icons/sl"

type Props = {}

export default function FacultyById({ }: Props) {
    return (
        <>
            <Head>
                <title>Chulalympic 2023 | คณะ/สถาบัน</title>
            </Head>
            <Navbar />
            <FacultyHeader />
            <Container maxW="container.xl" py={5}>
                <Heading>การแข่งขัน</Heading>
                <FacultyGames />
            </Container>
        </>
    )
}

function FacultyHeader() {
    const router = useRouter()
    const { id } = router.query

    const [trigger, { isLoading, data }] = useLazyGetFacultyQuery();

    useEffect(() => {
        if (router.isReady && id) {
            trigger(id as string)
        }
    }, [router.isReady])

    if (isLoading) return (<></>)

    return (<Flex bgColor="gray.50" py={10} as="header">
        <Container maxW="container.xl">
            <Button onClick={() => router.back()} variant="outline" borderColor="pink.400" color="pink.400" fontSize="lg" colorScheme="pink" fontFamily="athiti" fontWeight="light" px={2}>
                {" "}
                <Icon fontSize="2xl" as={ChevronLeftIcon} mr={1} /> ย้อนกลับ
            </Button>
            <Skeleton isLoaded={!isLoading} width="fit-content">
                <Heading as="h1" size={["2xl", "4xl"]} mt={10} display="flex" alignItems="center">{data?.name}</Heading>
            </Skeleton>
        </Container>
    </Flex >);
}

function FacultyGames() {
    const router = useRouter()
    const { id } = router.query

    const [trigger, { isLoading, data: games }] = useLazyGetGamesQuery();


    useEffect(() => {
        if (router.isReady && id) {
            const filter = {
                faculty: [id as string]
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
            {Object.entries(gamesByDate).map(([date, games]) => {

                const spiltDate = date.split('/') // 0 = month, 1 = day, 2 = year
                const format = new Date(`${spiltDate[2]}-${spiltDate[0]}-${spiltDate[1]}`)

                return (
                    <Stack key={date} w="full" borderRadius={10} spacing={3} flex="auto" bgColor="white" mt={4}>
                        <Heading size="md" color="gray.400" fontWeight="medium" alignItems="center" display="flex">
                            <Icon mr={2} as={IoCalendar} />
                            {
                                format.toLocaleDateString('th-TH', {
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
                )
            })}
        </Stack>
    );
}