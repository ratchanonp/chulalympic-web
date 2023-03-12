import Container from "@/components/common/Chakra/Container/Container";
import Navbar from "@/components/common/Navbar/Navbar";
import { FacultyCard } from "@/components/partial/FacultyCard";
import { useGetFacultiesQuery } from "@/services/faculty";
import { Grid, Heading } from "@chakra-ui/react";

function FacultyPage() {
    const { data, isLoading } = useGetFacultiesQuery();

    const reponsiveGrid = {
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
    }

    if (isLoading) return;
    if (!data) return;

    // Sort faculties by name
    // data.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <>
            <Navbar />
            <Container>
                <Heading color="pink.400" size="4xl" mb={10} filter="drop-shadow(5px 5px 0px #FED7E2);" >
                    คณะ / สถาบัน
                </Heading>
                <Grid gridTemplateColumns={reponsiveGrid} gap={3}>
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (<FacultyCard key={i} isLoading />))
                    ) : (
                        data.map((faculty) => (<FacultyCard key={faculty.id} faculty={faculty} />))
                    )}
                </Grid>
            </Container>
        </>
    );
}

export default FacultyPage;
