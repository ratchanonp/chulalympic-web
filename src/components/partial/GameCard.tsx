import { Badge, Flex, HStack, Icon, Stack, StackDivider, Text, useBreakpointValue } from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai/";
import { IoLocation } from "react-icons/io5";

interface Score {
    type: "point" | "time";
    value: number;
}

interface Team {
    faculty: string;
    score: Score;
}

export interface GameData {
    type: "1v1" | "ranked";
    teams: Team[];
}

interface Props {
    children?: React.ReactNode;
    gameData: GameData;
    isShowSportType?: boolean;
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
    const { isShowSportType = true } = props;
    const { teams } = props.gameData;

    const mobileOnly = useBreakpointValue({
        base: "flex",
        md: "none",
    });

    const desktopOnly = useBreakpointValue({
        base: "none",
        md: "flex",
    });

    return (
        <Flex
            direction={{
                base: "column",
                md: "row",
            }}
            w="100%"
            borderRadius={10}
            p={5}
            gap={{
                base: 2,
                md: 10,
            }}
            alignItems={{
                base: "left",
                md: "center",
            }}
            border="2px"
            borderColor="gray.100"
            bg="white"
        >
            {isShowSportType && <Text fontSize="3xl">⚽️</Text>}
            <Flex
                display={{
                    base: "none",
                    md: "flex",
                }}
            >
                <Schedule />
            </Flex>
            <Stack direction="row" display={mobileOnly}>
                <Badge display="flex" alignItems="center" colorScheme="blue" variant="solid" fontFamily="athiti">
                    <Icon as={IoLocation} mr={1} /> สนามกีฬาจุฬาลงกรณ์มหาวิทยาลัย
                </Badge>
            </Stack>
            <HStack divider={<StackDivider display={mobileOnly} />} gap={2}>
                <Stack
                    direction={{
                        base: "column",
                        md: "row",
                    }}
                    divider={
                        <StackDivider
                            display={{
                                base: "none",
                                md: "block",
                            }}
                        />
                    }
                    w={{
                        base: "full",
                        md: "50%",
                    }}
                    gap={{
                        base: 0,
                        md: 10,
                    }}
                >
                    {teams.map((team, index) => (
                        <TeamDisplay key={index} team={team} index={index} />
                    ))}
                </Stack>
                <Flex display={mobileOnly}>
                    <Schedule />
                </Flex>
            </HStack>
            <Stack
                display={{
                    base: "none",
                    md: "flex",
                }}
                alignItems="center"
                justifyContent="center"
                fontFamily="athiti"
                fontWeight="light"
                color="gray.400"
                fontSize="sm"
                textAlign="center"
            >
                <Icon as={IoLocation} mr={1} fontSize="3xl" />
                <Text>สนามกีฬาจุฬาลงกรณ์มหาวิทยาลัย</Text>
            </Stack>
        </Flex>
    );
}

export default GameCard;

function TeamDisplay({ team, index }: { team: Team; index: number }) {
    return (
        <Flex
            align="center"
            justify={{
                base: "space-between",
                md: index == 0 ? "end" : "start",
            }}
            direction={{
                base: "row",
                md: index == 0 ? "row" : "row-reverse",
            }}
            gap={5}
        >
            <Text
                fontFamily="athiti"
                fontSize={{
                    base: "md",
                    md: "lg",
                }}
            >
                {team.faculty}
            </Text>
            <Text
                fontFamily="athiti"
                fontSize={{
                    base: "md",
                    md: "5xl",
                }}
            >
                {team.score.value}
            </Text>
        </Flex>
    );
}
