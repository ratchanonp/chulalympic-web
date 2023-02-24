import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Game() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <Heading>Game</Heading>
            <p>id: {id}</p>
        </div>
    );
}

export default Game;
