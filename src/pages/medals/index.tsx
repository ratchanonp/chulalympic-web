import Container from "@/components/common/Chakra/Container/Container";
import DataTable from "@/components/common/DataTable/DataTable";
import Navbar from "@/components/common/Navbar/Navbar";
import { useGetMedalsQuery } from "@/services/medal";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { Column } from "react-table";

export default function MedalsPage() {

    const { data, isLoading } = useGetMedalsQuery();


    if (isLoading) return (<></>)
    if (!data) return (<></>)

    const columns: Array<Column> = [
        {
            Header: "คณะ",
            accessor: "name",
            Cell: ({ value }) => {
                const facultyId = data?.find((faculty) => faculty.name === value)?.id;
                return (
                    <Link as={NextLink} href={`/faculty/${facultyId}`} fontSize={["sm", "md"]} color="pink.400" fontWeight="medium"> {value} </Link>
                )
            }
        },
        {
            Header: "ทอง",
            accessor: "gold",
            Cell: ({ value }) => (<Text display="flex" justifyContent="center" alignItems="center" w={[5, 10]} h={[5, 10]} bgColor="gold" borderRadius="full">{value}</Text>)
        },
        {
            Header: "เงิน",
            accessor: "silver",
            Cell: ({ value }) => (<Text display="flex" justifyContent="center" alignItems="center" w={[5, 10]} h={[5, 10]} bgColor="silver" borderRadius="full">{value}</Text>)
        },
        {
            Header: "ทองแดง",
            accessor: "bronze",
            Cell: ({ value }) => (<Text display="flex" justifyContent="center" alignItems="center" w={[5, 10]} h={[5, 10]} bgColor="bronze" borderRadius="full">{value}</Text>)
        },
        {
            Header: "รวม",
            accessor: "Total",
        },
    ]




    return (
        <>
            <Head>
                <title>Chulalympic 2023 | สรุปเหรียญ    </title>
            </Head>
            <Navbar />
            <Container>
                <Heading as="h1" fontFamily="athiti" size="4xl" color="pink.400" mb={10} filter="drop-shadow(5px 5px 0px #FED7E2);">
                    สรุปเหรียญ
                </Heading>
                <Box mt={5}>
                    <DataTable data={data} columns={columns} />
                </Box>
            </Container>
        </>
    );
}
