import DataTable from "@/components/common/DataTable/DataTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { useGetMedalsQuery } from "@/services/medal";
import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement } from "react";
import { Column } from "react-table";

const MedalPage: NextPageWithLayout = () => {
    const { data, isLoading, error } = useGetMedalsQuery()
    if (isLoading) return <div>Loading...</div>

    const columns: Array<Column> = [
        {
            Header: "คณะ",
            accessor: "name",
            Cell: ({ value }) => {
                const facultyId = data?.find((faculty) => faculty.name === value)?.id;
                return (
                    <Link as={NextLink} href={`/faculty/${facultyId}`} color="pink.400" fontWeight="semibold" fontSize="xl"> {value} </Link>
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

    if (error) return <div>Error...</div>
    if (!data) return <div>No data...</div>

    return (
        <>
            <Box bg="white" borderRadius="xl" h="fit-content" mt={5} w="full">
                <DataTable data={data} columns={columns} />
            </Box>
        </>
    )
}


MedalPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default MedalPage;