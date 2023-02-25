import Navbar from "@/components/common/Navbar/Navbar"
import { useLazyGetFacultyQuery } from "@/services/faculty"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Button, Container, Flex, Heading, Icon, Skeleton } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

type Props = {}

export default function FacultyById({ }: Props) {
    return (<>
        <Navbar />
        <FacultyHeader />
        <Container maxW="container.xl" py={5}>
            <Heading>การแข่งขัน</Heading>

        </Container>
    </>
    )
}

function FacultyHeader() {
    const router = useRouter()
    const { id } = router.query

    const [trigger, { isLoading, data }] = useLazyGetFacultyQuery();

    useEffect(() => {
        if (router.isReady && id) {
            trigger(id as string)
        }
    }, [router.isReady])

    if (isLoading) return (<></>)

    return (<Flex bgColor="gray.50" py={10} as="header">
        <Container maxW="container.xl">
            <Button onClick={() => router.back()} variant="outline" borderColor="pink.400" color="pink.400" fontSize="lg" colorScheme="pink" fontFamily="athiti" fontWeight="light" px={2}>
                {" "}
                <Icon fontSize="2xl" as={ChevronLeftIcon} mr={1} /> ย้อนกลับ
            </Button>
            <Skeleton isLoaded={!isLoading} width="fit-content">
                <Heading as="h1" size="4xl" mt={10} display="flex" alignItems="center">{data?.name}</Heading>
            </Skeleton>
        </Container>
    </Flex >);

}