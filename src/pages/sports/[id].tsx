import Navbar from "@/components/common/Navbar/Navbar";
import GameCard from "@/components/partial/GameCard";
import { days, gameData } from "@/mock/sport";
import { useGetSportQuery } from "@/services/sport";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Grid, GridItem, Heading, Icon, Skeleton, Stack, Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { IoCalendar } from "react-icons/io5";

export default function SportById() {
    const router = useRouter();
    const { query } = router;
    const { id } = query;

    return (
        <div>
            <Navbar />
            <SportHeader id={id as string} />
            <Container maxW="container.xl" py={5}>
                <Heading>การแข่งขัน</Heading>

                <Stack gap={10} mt={10}>
                    {days
                        .sort((a, b) => b.getTime() - a.getTime())
                        .map((day, i) => (
                            <Stack key={i} gap={1}>
                                <Heading size="md" color="gray.400" fontWeight="medium" alignItems="center" display="flex">
                                    <Icon mr={2} as={IoCalendar} />
                                    {day.getDate()} {day.toLocaleString("th-TH", { month: "long" })} {day.getFullYear()}
                                </Heading>
                                <Stack w="full" borderRadius={10} spacing={3} flex="auto">
                                    {[...Array(Math.floor(Math.random() * 3 + 1))].map((_, i) => (
                                        <GameCard isShowSportType={false} key={i} gameData={gameData} />
                                    ))}
                                </Stack>
                            </Stack>
                        ))}
                </Stack>
            </Container>
        </div>
    );
}

function SportHeader({ id }: { id: string }) {

    const { data, isLoading } = useGetSportQuery(id);


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

                <Stack
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
                </Stack>
            </Container>
        </Flex >
    );
}
