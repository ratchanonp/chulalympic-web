import { Flex, Heading } from "@chakra-ui/react"

type Props = {}

const HomePage = (props: Props) => {
    return (
        <Flex
            h="100vh"
            w="100vw"
            justifyContent="center"
            alignItems="center"
        >
            <Heading variant="h1" size="4xl">
                We&apos;re closed.
            </Heading>
        </Flex>
    )
}

export default HomePage