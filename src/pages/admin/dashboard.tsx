import AdminLayout from "@/components/layout/AdminLayout";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { Box, Grid } from "@chakra-ui/react";
import { ReactElement } from "react";

const AdminPage: NextPageWithLayout = () => {
    return (
        <>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} w="full">
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
            </Grid>
        </>
    )
}

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default AdminPage;