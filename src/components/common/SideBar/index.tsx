import { Flex, Icon, Link, Stack, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import WebName from "../WebName/WebName"
import navList from "./nav-list"

type Props = {}

const SideBar = (props: Props) => {

    const router = useRouter();
    const path = router.pathname;

    return (
        <VStack
            as="aside"
            p={10}
            w={80}
            justifyContent="start"
            alignItems="start"
            spacing={10}
        >
            <Flex fontSize="4xl" fontWeight="bold">
                <WebName />
            </Flex>
            <Stack alignItems="start" justifyContent="start" spacing={2} w="full">
                {navList.map((item, index) => {
                    return (
                        <Link
                            as={NextLink} href={item.path}
                            color={path === item.path ? "pink.400" : "black"}
                            key={index}
                            display="flex" w="full" alignItems="center"
                            fontSize="xl"
                            bg={path === item.path ? "white" : "transparent"}
                            py={2.5} px={5}
                            borderRadius="xl" border="1px solid transparent" borderColor={path === item.path ? "gray.100" : "transparent"}
                            _hover={{ border: "1px solid", borderColor: "gray.100", bg: "white", color: "pink.400" }}
                        >
                            <Icon as={item.icon} mr={3} />
                            <Text variant="h2">{item.name}</Text>
                        </Link>
                    )
                })}
            </Stack>
        </VStack >
    )
}

export default SideBar