import Container from "@/components/common/Chakra/Container/Container"
import GameCreateForm from "@/components/partial/GameCreateForm"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Flex, Heading, Icon, Link } from "@chakra-ui/react"
import NextLink from "next/link"


export default function CreateGame() {
    return (
        <>
            <Flex position="sticky" top={0} zIndex={1} bg="white" direction="row" alignItems="center" py={2} shadow="sm">
                <Container py={0}>
                    <Link as={NextLink} display="flex" alignItems="center" href="/secret/games"> <Icon fontSize="5xl" as={ChevronLeftIcon} mr={1} />  <Heading>สร้างการแข่งขัน</Heading></Link>
                </Container>
            </Flex>
            <Container py={0} pt={5} pb={5} fontFamily="athiti">
                <GameCreateForm />
            </Container>
        </>
    )
}