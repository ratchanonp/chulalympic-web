import Navbar from "@/components/common/Navbar/Navbar";
import { DateSelector } from "@/components/partial/DateSelector/DataSelector";
import { Filter } from "@/components/partial/Filter/Filter";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Icon,
    Link,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

import { BiFilterAlt } from "react-icons/bi";
import { MdSportsHandball } from "react-icons/md";

import { GameCardList } from "@/components/partial/GameCard/GameCardList";
import animation from "@/lottie/Hero.json";
import Head from "next/head";
import { AiFillHeart } from "react-icons/ai";
import dynamic from "next/dynamic";

function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

    return (
        <>
            <Head>
                <title>Chulalympic 2023</title>
            </Head>
            <Stack justifyContent="stretch" alignItems="center">
                <Navbar />
                <Container maxW="container.xl">
                    <Stack as="section" id="hero" mt={100} spacing="" alignItems="center" pb={20}>
                        <Lottie
                            animationData={animation}
                            style={{
                                height: "300px",
                            }}
                        />
                        <Heading textAlign="center">
                            <Text
                                fontSize="6xl"
                                as="span"
                                color="pink.400"
                                textTransform="uppercase"
                            >
                                Chula
                            </Text>
                            <Text
                                as="span"
                                textDecor="underline"
                                color="gray.400"
                                textDecorationColor="pink.400"
                                size="6xl"
                            >
                                lympic
                            </Text>
                            <Text color="pink.400" fontWeight="black" fontSize="5xl">
                                2023
                            </Text>
                        </Heading>

                        <Button
                            w="fit-content"
                            p={8}
                            mt={50}
                            fontSize="xl"
                            variant="ghost"
                            colorScheme="pink"
                            fontFamily="athiti"
                            fontWeight="medium"
                            color="pink.400"
                            as="a"
                            flexDirection="column"
                            href="#today"
                        >
                            การแข่งขัน
                            <ChevronDownIcon
                                fontSize="xl"
                                textAlign="center"
                                color="pink.400"
                            />
                        </Button>
                    </Stack>
                </Container>
            </Stack>
            <Flex as="section" id="today" bgColor="gray.50">
                <Container maxW="container.xl" pos="static">
                    <Stack position="relative">
                        <Stack bg="gray.50" zIndex={10} position="sticky" top={0} pb={5}>
                            <Flex alignItems="center" justifyContent="space-between" mt={5}>
                                <Heading
                                    display="flex"
                                    alignItems="center"
                                    fontFamily="athiti"
                                    variant="h2"
                                    fontWeight="medium"
                                >
                                    <Icon as={MdSportsHandball} mr={1} />
                                    การแข่งขัน
                                </Heading>
                                <Button onClick={onOpen} display={{
                                    base: "flex",
                                    lg: "none",
                                }}>
                                    <Icon mr={2} w={5} h={5} as={BiFilterAlt} />
                                    <Text>Filter</Text>
                                </Button>
                            </Flex>
                            <DateSelector />
                        </Stack>
                        <Flex gap={5} pb={5}>
                            <Flex
                                display={{
                                    base: "none",
                                    lg: "flex",
                                }}
                            >
                                <Filter />
                            </Flex>
                            <GameCardList />
                        </Flex>
                    </Stack>

                </Container>

            </Flex>
            <Flex fontFamily="athiti" textAlign="center" alignItems="center" fontSize="xs" textColor="gray.400" justifyContent="center" bgColor="white" py={2}>
                <Text>Made with <Icon as={AiFillHeart} /> by&nbsp;<Link href="https://github.com/ratchanonp">Q</Link> Associate with&nbsp;<Link href="https://www.instagram.com/sports.sgcu/">Sports SGCU</Link></Text>
            </Flex>

            <Drawer placement="bottom" size="full" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Flex alignItems="center" justifyContent="space-between">
                            <Flex alignItems="center">
                                <Icon mr={2} w={6} h={6} strokeWidth="1" as={BiFilterAlt} />
                                <Text fontSize="2xl">Filter</Text>
                            </Flex>
                            <Button onClick={onClose} alignSelf="end">
                                <Icon as={CloseIcon} />
                            </Button>
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        <Filter />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default HomePage;
