import Container from "@/components/common/Chakra/Container/Container";
import Navbar from "@/components/common/Navbar/Navbar";
import { FacultyCard } from "@/components/partial/FacultyCard";
import { useGetFacultiesQuery } from "@/services/faculty";
import { Grid, Heading } from "@chakra-ui/react";

function FacultyPage() {
    const { data, isLoading } = useGetFacultiesQuery();


    return (
        <>
            <Navbar />
            <Container>
                <Heading color="pink.400" size="4xl" mb={10}>
                    คณะ / สถาบัน
                </Heading>
                {
                    isLoading
                        ? (<Grid gridTemplateColumns="repeat(3, 1fr)" gap={5}>
                            {[...Array(6)].map((_, idx) => (
                                <FacultyCard key={idx} isLoading />
                            ))}
                        </Grid>)
                        : (<Grid gridTemplateColumns="repeat(3, 1fr)" gap={5}>
                            {data?.map((faculty, idx) => (
                                <FacultyCard key={idx} faculty={faculty} />
                            ))}
                        </Grid>)
                }
            </Container>
        </>
    );
}

export default FacultyPage;
