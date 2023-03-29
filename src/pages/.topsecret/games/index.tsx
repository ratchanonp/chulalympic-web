import { useGetGamesQuery } from "@/services/games";
import { Link, ListItem, UnorderedList } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {}

export default function Games({ }: Props) {

    const { data, isLoading, error } = useGetGamesQuery({});

    if (isLoading) return <div>Loading...</div>
    if (error || !data) return <div>Not Found</div>

    return (
        <>
            <UnorderedList>
                {data.map(game => (
                    <ListItem key={game.id}>
                        <Link as={NextLink} href={`games/${game.id}/edit`}>{game.id}</Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </>
    )
}