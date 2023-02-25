import { Game, GameStatus, Participant } from "@/interfaces/game.interface";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Flex, HStack, Icon, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, VStack } from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai/";
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

    const { participant, sport, sportCategory, start, venue, status } = gameData;

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
                <AccordionButton w="100%" _hover={{}}>
                    <HStack
                        w="100%"
                        display="flex"
                        spacing={{
                            base: 0,
                            md: 16,
                        }}
                    >
                        <HStack
                            flex={1}
                            spacing={{
                                base: 5,
                                md: 16,
                            }}
                            textAlign="left"
                        >
                            <VStack alignItems="left" spacing={0}>
                                <Text
                                    textColor="gray.400"
                                    fontSize="sm"
                                    fontFamily="athiti"
                                    fontWeight="500"
                                >
                                    เวลา
                                </Text>
                                <Badge
                                    fontFamily="athiti"
                                    colorScheme="pink"
                                    textColor="pink.400"
                                    fontSize={{ base: "md", md: "2xl" }}
                                    fontWeight="bold"
                                >
                                    {getTime(start)}
                                </Badge>
                            </VStack>

                            <VStack spacing={0} alignItems="left">
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
                                    w={{ base: 20, md: "auto" }}
                                >
                                    {sport.name}
                                </Text>
                            </VStack>
                            <VStack spacing={0} alignItems="left">
                                <Text
                                    textColor="gray.400"
                                    fontSize="sm"
                                    fontFamily="athiti"
                                    fontWeight="500"
                                    w={{ base: 20, md: "auto" }}
                                >
                                    ประเภท
                                </Text>
                                <Text
                                    fontFamily="athiti"
                                    fontSize={{ base: "md", md: "2xl" }}
                                    fontWeight="bold"
                                >
                                    {sportCategory.name}
                                </Text>
                            </VStack>
                            <VStack spacing={0} alignItems="left">
                                <Text
                                    textColor="gray.400"
                                    fontSize="sm"
                                    fontFamily="athiti"
                                    fontWeight="500"
                                >
                                    สถานที่
                                </Text>
                                <Text
                                    fontFamily="athiti"
                                    fontSize={{ base: "md", md: "2xl" }}
                                    fontWeight="bold"
                                >
                                    {venue.name}
                                </Text>
                            </VStack>

                            <Box display={{ base: "none", md: "block" }}>
                                <Status status={status} />
                            </Box>
                        </HStack>
                        <Flex ml="auto">
                            <AccordionIcon />
                        </Flex>
                    </HStack>
                </AccordionButton>
                <AccordionPanel>
                    <ParticipantTable participant={participant} status={status} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export { GameCard };

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
                return "เสร็จสิ้น";
            default:
                return "ยังไม่เริ่ม";
        }
    }

    return <Badge colorScheme={colorScheme()} fontFamily="athiti" fontSize="md">{statusName()}</Badge>;
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
    return (
        <TableContainer>
            <Table size="sm" variant='striped' fontFamily="athiti">
                <Thead>
                    <Th>อันดับ</Th>
                    <Th>คณะ</Th>
                    <Th isNumeric>คะแนน</Th>
                </Thead>
                <Tbody>
                    {participant.map((p, i) => (
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
