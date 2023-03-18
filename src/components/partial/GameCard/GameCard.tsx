import { Game, GameStatus, Participant } from "@/interfaces/game.interface";
import { SportCategory } from "@/interfaces/sport.interface";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Flex, HStack, Icon, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, VStack } from "@chakra-ui/react";
import { AiFillClockCircle, AiFillEnvironment, AiFillInfoCircle } from "react-icons/ai/";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
    children?: React.ReactNode;
    gameData?: Game;
    isShowSportType?: boolean;
    isLoading?: boolean;
}

function Schedule() {
    return (
        <Stack align="center" spacing={0} mx="auto">
            <Icon color="pink.400" as={AiFillClockCircle} />
            <Text fontFamily="athiti" color="pink.400" fontWeight="bold">
                {" "}
                12.00
            </Text>
        </Stack>
    );
}

function GameCard(props: Props) {

    const mobileOnly = useBreakpointValue({
        base: "flex",
        md: "none",
    });

    const desktopOnly = useBreakpointValue({
        base: "none",
        md: "flex",
    });


    const { isShowSportType = true, isLoading, gameData } = props;

    if (isLoading) return (<GameCardSkeleton />);
    if (!gameData) return (<></>);

    const { participant, sport, sportCategory, start, venue, status, id } = gameData;


    return (
        <Accordion allowMultiple>
            <AccordionItem
                w="100%"
                borderRadius={10}
                p={{
                    base: 2,
                    md: 5,
                }}
                border="2px"
                borderColor="gray.100"
                bg="white"
            >
                {({ isExpanded }) => (
                    <>
                        <AccordionButton w="100%" _hover={{}}>
                            <VStack w="100%" justifyContent="start" alignItems="start">

                                <Flex w="full">
                                    <Status status={status} />
                                    <Text ml={2} display="flex" alignItems="center" justifyContent="center" fontFamily="athiti" fontSize={{
                                        base: "xs",
                                        md: "md",
                                    }}> <Icon as={AiFillEnvironment} mr={1} /> {venue.name} </Text>


                                </Flex>
                                <HStack
                                    w="100%"
                                    display="flex"
                                    spacing={{
                                        base: 0,
                                        md: 16,
                                    }}
                                    alignItems="start"
                                >
                                    <Flex
                                        flex={1}
                                        textAlign="left"
                                        w="full"
                                        justifyContent="start"
                                        alignItems="end"
                                    >
                                        {status == GameStatus.SCHEDULED && (<VStack spacing={0} alignItems="left" mr={5} display={["none", "block"]}>
                                            <Text
                                                textColor="gray.400"
                                                fontSize="sm"
                                                fontFamily="athiti"
                                                fontWeight="500"

                                            >
                                                เวลา
                                            </Text>
                                            <Text
                                                fontFamily="athiti"
                                                fontSize={{ base: "md", md: "2xl" }}
                                                fontWeight="bold"
                                                w="auto"
                                                noOfLines={1}
                                            >
                                                <Badge
                                                    fontFamily="athiti"
                                                    colorScheme="pink"
                                                    textColor="pink.400"
                                                    fontSize={{ base: "md", md: "2xl" }}
                                                    fontWeight="bold"
                                                >
                                                    {getTime(new Date(start))}
                                                </Badge>
                                            </Text>
                                        </VStack>)}
                                        <VStack spacing={0} alignItems="left" w={["40%", (participant.length != 2 || isExpanded ? "40%" : "20%")]}>
                                            <Text
                                                textColor="gray.400"
                                                fontSize="sm"
                                                fontFamily="athiti"
                                                fontWeight="500"
                                            >
                                                กีฬา
                                            </Text>
                                            <Text
                                                fontFamily="athiti"
                                                fontSize={{ base: "md", md: "2xl" }}
                                                fontWeight="bold"
                                                w="auto"
                                                noOfLines={1}
                                            >
                                                {sport.name}
                                            </Text>
                                        </VStack>
                                        {participant.length == 2 && !isExpanded && (<VSScore participants={participant} start={new Date(start)} status={status} />)}
                                        {participant.length == 2 && isExpanded && (<MoreDetail start={new Date(start)} sportCategory={sportCategory} />)}
                                        {participant.length != 2 && (<MoreDetail start={new Date(start)} sportCategory={sportCategory} />)}
                                    </Flex>
                                </HStack>
                                <Text fontSize="sm" fontFamily="athiti" color="gray.300">{id}</Text>
                            </VStack>
                            {participant.length > 2 && (<Flex ml="auto" pl={2}>
                                <AccordionIcon />
                            </Flex>)}
                        </AccordionButton>
                        <AccordionPanel>
                            <ParticipantTable participant={participant} status={status} />
                        </AccordionPanel>
                    </>)}
            </AccordionItem>
        </Accordion >
    );
}

export { GameCard };

function VSScore({ participants, start, status }: { participants: Participant[], start: Date, status: GameStatus }) {

    if (participants.length != 2) return <></>;

    // Display like this
    // Team A 0
    // Team B 1 < winner

    if (status == GameStatus.SCHEDULED) {
        return (
            <Flex alignItems="center" justifyContent="start" w={["60%", "80%"]}>
                <Stack w="full" direction={{
                    base: "column",
                    md: "row",
                }} justifyContent={{
                    base: "space-between",
                    md: "center",
                }} alignItems={{
                    base: "start",
                    md: "center",
                }} spacing={{
                    base: 0,
                    md: 5,
                }}>
                    <HStack justifyContent={{ base: "space-between", md: "right" }} alignItems="center" w="100%">
                        <Text fontFamily="athiti" fontSize={{ base: "sm", md: "xl", lg: "2xl" }} noOfLines={1}>{participants[0].faculty.name}</Text>
                    </HStack>
                    <Box display={{ base: "none", md: "block" }}> - </Box>
                    <Stack direction={{
                        base: "row",
                        md: "row-reverse",
                    }} justifyContent={{ base: "space-between", md: "left" }} alignItems="center" w="100%">
                        <Text fontFamily="athiti" fontSize={{ base: "sm", md: "xl", lg: "2xl" }} noOfLines={1}>{participants[1].faculty.name}</Text>
                    </Stack>
                </Stack>
                <Badge
                    ml={2}
                    fontFamily="athiti"
                    colorScheme="pink"
                    textColor="pink.400"
                    fontSize={{ base: "md", md: "2xl" }}
                    fontWeight="bold"
                    display={["flex", "none"]}
                >
                    {getTime(start)}
                </Badge>
            </Flex>
        )
    }


    return (
        <Stack w={["60%", "80%"]} direction={{
            base: "column",
            md: "row",
        }} justifyContent={{
            base: "start",
            md: "center",
        }} alignItems={{
            base: "start",
            md: "center",
        }} spacing={{
            base: 0,
            md: 5,
        }}

        >
            <HStack justifyContent={{ base: "space-between", md: "right" }} alignItems="center" w="100%">
                <Text fontFamily="athiti" fontSize={{ base: "sm", md: "xl", lg: "2xl" }} >{participants[0].faculty.name}</Text> <Text fontFamily="athiti" fontSize={{ base: "lg", md: "4xl" }} fontWeight="bold">{participants[0].value}</Text>
            </HStack>
            <Box display={{ base: "none", md: "block" }}> - </Box>
            <Stack direction={{
                base: "row",
                md: "row-reverse",
            }} justifyContent={{ base: "space-between", md: "left" }} alignItems="center" w="100%">
                <Text fontFamily="athiti" fontSize={{ base: "sm", md: "xl", lg: "2xl" }} >{participants[1].faculty.name}</Text>
                <Text fontFamily="athiti" fontSize={{ base: "lg", md: "4xl" }} fontWeight="bold">{participants[1].value}</Text>
            </Stack>
        </Stack>
    )
}

function Status({ status }: { status: GameStatus }) {

    const colorScheme = () => {
        switch (status) {
            case GameStatus.SCHEDULED:
                return "yellow";
            case GameStatus.IN_PROGRESS:
                return "blue";
            case GameStatus.COMPLETE:
                return "green";
            case GameStatus.SCORED:
                return "pink";
            default:
                return "gray";
        }
    }

    const statusName = () => {
        switch (status) {
            case GameStatus.SCHEDULED:
                return "กำหนดเวลา";
            case GameStatus.IN_PROGRESS:
                return "กำลังเล่น";
            case GameStatus.COMPLETE:
                return "เสร็จสิ้น";
            case GameStatus.SCORED:
                return "ประกาศผล";
            default:
                return "ยังไม่เริ่ม";
        }
    }

    return <Badge display="flex" alignItems="center" colorScheme={colorScheme()} fontFamily="athiti" fontSize={{
        base: "xs",
        md: "md",
    }} variant='outline'><Icon as={AiFillInfoCircle} mr={1} /> {statusName()}</Badge>;
}


function getTime(date: Date) {

    const d = new Date(date);

    return d.toLocaleString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    });
}


function ParticipantTable({ participant, status }: { participant: Participant[], status: GameStatus }) {

    // sort by score high to low
    const sorted = [...participant].sort((a, b) => b.value - a.value);

    return (
        <TableContainer>
            <Table size="sm" variant='striped' fontFamily="athiti">
                <Thead>
                    <Th>อันดับ</Th>
                    <Th>คณะ</Th>
                    <Th isNumeric>คะแนน</Th>
                </Thead>
                <Tbody>
                    {sorted.map((p, i) => (
                        <Tr key={i}>
                            <Td>{status == GameStatus.SCORED ? i + 1 : "-"}</Td>
                            <Td>{p.faculty.name}</Td>
                            <Td isNumeric>{status == GameStatus.SCORED ? p.value : "-"}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

function MoreDetail({ start, sportCategory }: { start: Date, sportCategory: SportCategory }) {
    return (<Stack direction="row" alignItems="center" justifyContent="space-between" w="full" ml={2}>
        <VStack spacing={0} alignItems="left">
            <Text textColor="gray.400" fontSize="sm" fontFamily="athiti" fontWeight="500">
                ประเภท
            </Text>
            <Text fontFamily="athiti" fontSize={{
                base: "md",
                md: "2xl"
            }} fontWeight="bold" w="auto" noOfLines={1}>
                {sportCategory.name}
            </Text>
        </VStack>
        <Badge ml={2} fontFamily="athiti" colorScheme="pink" textColor="pink.400" fontSize={{
            base: "md",
            md: "2xl"
        }} fontWeight="bold" display={["flex", "none"]}>
            {getTime(start)}
        </Badge>
    </Stack>);
}
