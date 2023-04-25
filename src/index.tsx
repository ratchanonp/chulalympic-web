import { Flex } from "@chakra-ui/react"

type Props = {}

const HomePage = (props: Props) => {
    return (
        <Flex
            h="100vh"
            w="100vw"
            justifyContent="center"
            alignItems="center"
        >
            We&apos;re closed.
        </Flex>
    )
}

export default HomePage