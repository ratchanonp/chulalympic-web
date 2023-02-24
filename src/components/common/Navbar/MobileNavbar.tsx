import { navbarItems } from "@/constant/nav";
import { NavbarItem } from "@/interfaces/Navbar";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Icon, Stack, StackDivider, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNavbar(props: Props) {
    const { isOpen, onClose } = props;

    return (
        <Drawer placement="left" isOpen={isOpen} onClose={onClose} size="full">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    <Flex justifyContent="space-between">
                        <Heading as="h1" color="gray.400" fontFamily="athiti">
                            <Text as="span" color="pink.400" textTransform="uppercase">
                                Chula
                            </Text>
                            <Text as="span" textDecor="underline" textDecorationColor="pink.400">
                                lympic
                            </Text>
                        </Heading>
                        <Button onClick={onClose} variant="ghost" colorScheme="pink">
                            <Icon as={CloseIcon} w={6} h={6} color="pink.400" />
                        </Button>
                    </Flex>
                </DrawerHeader>
                <DrawerBody as="nav">
                    <Stack divider={<StackDivider borderColor="pink.400" />}>
                        {navbarItems.map(item => (
                            <NavItem key={item.name} {...item} />
                        ))}
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

function NavItem(props: NavbarItem) {
    const { name, path } = props;
    return (
        <Button as={Link} href={path} variant="ghost" fontFamily="athiti" fontWeight="medium" color="pink.400" fontSize={20} colorScheme="pink">
            {name}
        </Button>
    );
}
