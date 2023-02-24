import Container from "@/components/common/Chakra/Container/Container";
import Navbar from "@/components/common/Navbar/Navbar";
import { useGetMedalsQuery } from "@/services/medal";
import { Heading } from "@chakra-ui/react";

export default function MedalsPage() {

    const { data, isLoading } = useGetMedalsQuery();

    return (
        <>
            <Navbar />
            <Container>
                <Heading color="pink.400" size="4xl">
                    สรุปเหรียญรางวัล
                </Heading>
                {isLoading && <p>Loading...</p>}
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </Container>
        </>
    );
}
