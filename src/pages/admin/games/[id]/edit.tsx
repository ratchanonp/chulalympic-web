import Container from "@/components/common/Chakra/Container/Container";
import AdminLayout from "@/components/layout/AdminLayout";
import GameEditForm from "@/components/partial/Form/GameEditForm";
import { useGetFacultiesQuery } from "@/services/faculty";
import { useLazyGetGameQuery } from "@/services/games";
import { useGetVenuesQuery } from "@/services/venue";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Link, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

type Props = {}

export default function GameEdit({ }: Props) {

    const router = useRouter();
    const { id } = router.query;

    const [trigger, { data, isLoading, error }] = useLazyGetGameQuery();

    // Venue
    const { data: Venue, isLoading: isVenueLoading } = useGetVenuesQuery();
    // Faculty
    const { data: Faculty, isLoading: isFacultyLoading } = useGetFacultiesQuery();

    useEffect(() => {
        if (router.isReady) {
            trigger(id as string);
        }
    }, [id])

    function fetchData() { trigger(id as string); }

    if (isLoading) return <div>Loading...</div>
    if (error || !data) return <div>Not Found</div>

    if (isVenueLoading || isFacultyLoading) return <div>Loading...</div>
    if (!Venue || !Faculty) return <div>Not Found</div>

    const previousId = data.id.slice(0, -4) + (parseInt(data.id.slice(-4)) - 1).toString().padStart(4, '0');
    const nextId = data.id.slice(0, -4) + (parseInt(data.id.slice(-4)) + 1).toString().padStart(4, '0');

    return (
        <Box w="full" position="relative" bg="white" borderRadius="xl" p={5} h="fit-content">
            <Stack>
                <Flex>
                    <Container fontFamily="athiti" position="relative" py={0} pt={2} pb={4}>
                        <GameEditForm gameData={data} venuesData={Venue} facultiesData={Faculty} fetchGameData={fetchData} />
                    </Container >
                </Flex>
                <Flex>
                    <Container fontFamily="athiti" position="relative" py={0} pt={2} pb={4}>
                        <HStack justifyContent="space-between">
                            <Link href={`/.topsecret/games/${previousId}/edit`}><ChevronLeftIcon /> {previousId}</Link>
                            <Link href={`/.topsecret/games/${nextId}/edit`}>{nextId}<ChevronRightIcon /></Link>
                        </HStack>
                    </Container >
                </Flex>
            </Stack >
        </Box>
    )
}

GameEdit.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}