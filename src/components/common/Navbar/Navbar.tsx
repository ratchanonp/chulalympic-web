import { navbarItems } from "@/constant/nav";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { WebName } from "../WebName/WebName";
import { MobileNavbar } from "./MobileNavbar";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex mx={"auto"} py={3} shadow="lg" w="full">
            <Container maxW="container.xl" as={Flex} justify={"space-between"}>
                <Flex display="inline">
                    <Link href="/">
                        <Heading as="h1" color="gray.400" fontFamily="athiti">
                            <WebName />
                        </Heading>
                    </Link>
                </Flex>
                <Flex
                    display={{
                        base: "none",
                        md: "inline",
                    }}
                >
                    {navbarItems.map(item => (
                        <Button key={item.name} as={Link} href={item.path} variant="ghost" fontFamily="athiti" fontWeight="medium" color="pink.400" fontSize={20} colorScheme="pink">
                            {item.name}
                        </Button>
                    ))}
                </Flex>
                <Button
                    onClick={onOpen}
                    variant="ghost"
                    display={{
                        base: "inline",
                        md: "none",
                    }}
                >
                    <Icon as={HamburgerIcon} w={6} h={6} color="pink.400" />
                </Button>
                <MobileNavbar isOpen={isOpen} onClose={onClose} />
            </Container>
        </Flex>
    );
}

export default Navbar;
