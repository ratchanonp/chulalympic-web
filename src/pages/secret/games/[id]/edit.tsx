import Container from "@/components/common/Chakra/Container/Container";
import GameEditForm from "@/components/partial/GameEditForm";
import { useGetFacultiesQuery } from "@/services/faculty";
import { useLazyGetGameQuery } from "@/services/games";
import { useGetVenuesQuery } from "@/services/venue";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Heading, Icon, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    }, [id, router.isReady, trigger])

    if (isLoading) return <div>Loading...</div>
    if (error || !data) return <div>Not Found</div>

    if (isVenueLoading || isFacultyLoading) return <div>Loading...</div>
    if (!Venue || !Faculty) return <div>Not Found</div>

    return (
        <>
            <Container fontFamily="athiti">
                <Stack>
                    <Link href="/secret/games"> <Icon as={ChevronLeftIcon} mr={1} />Back</Link>
                    <Heading>{data.id}</Heading>
                    <GameEditForm gameData={data} venuesData={Venue} facultiesData={Faculty} />
                </Stack >
            </Container >
        </>
    )
}