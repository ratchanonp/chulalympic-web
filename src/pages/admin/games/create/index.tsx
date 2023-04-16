import AdminLayout from "@/components/layout/AdminLayout"
import GameCreateForm from "@/components/partial/Form/GameCreateForm"
import { NextPageWithLayout } from "@/interfaces/nextjs"
import { Box, Flex } from "@chakra-ui/react"


const CreateGame: NextPageWithLayout = () => {
    return (
        <>
            <Flex position="sticky" top={0} zIndex={1} bg="white" direction="row" alignItems="center" py={2} shadow="sm">
                {/* <Container py={0}>
                    <Link as={NextLink} display="flex" alignItems="center" href="/secret/games"> <Icon fontSize="5xl" as={ChevronLeftIcon} mr={1} />  <Heading>สร้างการแข่งขัน</Heading></Link>
                </Container> */}
            </Flex>
            <Box w="full" h="fit-content" bg="white" p={5} mb={5} fontFamily="athiti" borderRadius="xl">
                <GameCreateForm />
            </Box>
        </>
    )
}

CreateGame.getLayout = (page) => <AdminLayout>{page}</AdminLayout>
export default CreateGame