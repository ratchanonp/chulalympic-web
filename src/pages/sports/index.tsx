import Navbar from "@/components/common/Navbar/Navbar";
import { useGetSportsQuery } from "@/services/sport";
import { filterByInitialLetter, getInitialLetters } from "@/utils/mapping";
import { Container, Grid, GridItem, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import Head from "next/head";


export default function SportPage() {

    const { data, isLoading } = useGetSportsQuery();

    if (isLoading) return (<p>Loading...</p>);
    if (!data) return (<p>Something went wrong</p>);

    return (
        <div>
            <Head>
                <title>Chulalympic 2023 | กีฬา</title>
            </Head>
            <Navbar />
            <Container maxW="container.xl" mb={10}>
                <Heading as="h1" fontFamily="athiti" size="4xl" color="pink.400" my={10} filter="drop-shadow(5px 5px 0px #FED7E2);" >
                    กีฬา
                </Heading>
                <Grid
                    templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap={6}
                >
                    {getInitialLetters(data).map((char, idx) => (
                        <GridItem key={char}>
                            <Heading data-group id={char} size="2xl" fontFamily="athiti">
                                <span>
                                    {char}
                                </span>
                                <Link opacity={0} _groupHover={{ opacity: 1 }} color="pink.400" ml={1} href={`#${char}`}>#</Link>
                            </Heading>
                            <UnorderedList mt={5}>
                                {filterByInitialLetter(char, data).map((sport, idx) => (
                                    <UnorderedList key={idx}>
                                        <ListItem fontFamily="athiti" fontWeight="light">
                                            <Link href={`/sports/${sport.code}`}>{sport.name}</Link>
                                        </ListItem>
                                    </UnorderedList>
                                ))}
                            </UnorderedList>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
