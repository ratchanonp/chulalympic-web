import AdminLayout from "@/components/layout/AdminLayout";
import StatBox from "@/components/partial/StatBox/StatBox";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { useGetDashboardQuery } from "@/services/dashboard";
import { colorScheme, statusName } from "@/utils/status";
import { Badge, Box, Flex, Grid, GridItem, Heading, Icon, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BiSad } from "react-icons/bi";

const AdminPage: NextPageWithLayout = () => {

    const { data, isLoading } = useGetDashboardQuery();

    return (
        <Stack w="full" spacing={5}>
            <Grid templateColumns="repeat(4, 1fr)" gap={5} w="full">
                <StatBox isLoading={isLoading} title="การแข่งขัน (วันนี้)" value={data?.todayGames || 0} unit="รายการ" />
                <StatBox isLoading={isLoading} title="ประกาศผลแล้ว (วันนี้)" value={data?.todayScoredGames || 0} unit="รายการ" />
                <StatBox isLoading={isLoading} title="การแข่งขัน (ทั้งหมด)" value={data?.totalGames || 0} unit="รายการ" />
                <StatBox isLoading={isLoading} title="ประกาศผลแล้ว" value={data?.totalScoredGames || 0} unit="รายการ" />
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} >
                <GridItem><TodayGame /></GridItem>
                <GridItem><LatestUpdateGame /></GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} >
                <GridItem><MostParticipateFaculty /></GridItem>
                <GridItem><MostMedal /></GridItem>
            </Grid>
        </Stack>
    )
}

const TodayGame = () => {

    const { data, isLoading } = useGetDashboardQuery();

    if (isLoading) {
        return (
            <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
                <Heading as="h3" size="md" color="pink.400">คณะ (เรียงลำดับตามการแข่งร่วม)</Heading>
                <Stack mt={5}>
                    {[...Array(10)].map((i) => (
                        <Skeleton key={i} height="20px" mt={2} />
                    ))}
                </Stack>
            </Box>
        )
    }

    return (
        <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
            <Heading as="h3" size="md" color="pink.400">การแข่งขันวันนี้</Heading>
            {data && data.todayGamesList.length === 0 && <Flex mt={5} h={60} justifyContent="center" alignItems="center" fontFamily="athiti" fontSize="xl" direction="column" fontWeight="semibold"><Icon as={BiSad} fontSize="5xl" mr={2} />ไม่มีการแข่งขันวันนี้</Flex>}
            {data && data?.todayGamesList?.length > 0 && (
                <TableContainer mt={5} fontFamily="athiti">
                    <Table size="sm" variant="striped">
                        <Thead>
                            <Tr>
                                <Th>เวลา</Th>
                                <Th>รหัสการแข่ง</Th>
                                <Th>สนาม</Th>
                                <Th>สถานะ</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.todayGamesList?.map((game) => (
                                <Tr key={game.id}>
                                    <Td>{new Date(game.start).toLocaleTimeString("th-TH")}</Td>
                                    <Td>{game.id}</Td>
                                    <Td>{game.venue.name}</Td>
                                    <Td><Badge colorScheme={colorScheme(game.status)}>{statusName(game.status)}</Badge></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

const LatestUpdateGame = () => {

    const { data, isLoading } = useGetDashboardQuery();



    if (isLoading) {
        return (
            <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
                <Heading as="h3" size="md" color="pink.400">คณะ (เรียงลำดับตามการแข่งร่วม)</Heading>
                <Stack mt={5}>
                    {[...Array(10)].map((i) => (
                        <Skeleton key={i} height="20px" mt={2} />
                    ))}
                </Stack>
            </Box>
        )
    }

    return (
        <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
            <Heading as="h3" size="md" color="pink.400">อัปเดตล่าสุด</Heading>
            <TableContainer mt={5}>
                <Table size="sm" variant="striped" fontFamily="athiti">
                    <Thead>
                        <Tr>
                            <Th>รหัสการแข่ง</Th>
                            <Th>สถานะ</Th>
                            <Th>update เมื่อ</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.latestUpdateGamesList.map((game) => (
                            <Tr key={game.id}>
                                <Td>{game.id}</Td>
                                <Td><Badge colorScheme={colorScheme(game.status)}>{statusName(game.status)}</Badge></Td>
                                <Td>{new Date(game.updatedAt).toLocaleDateString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const MostParticipateFaculty = () => {

    const { data, isLoading } = useGetDashboardQuery();

    if (isLoading) {
        return (
            <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
                <Heading as="h3" size="md" color="pink.400">คณะ (เรียงลำดับตามการแข่งร่วม)</Heading>
                <Stack mt={5}>
                    {[...Array(10)].map((i) => (
                        <Skeleton key={i} height="20px" mt={2} />
                    ))}
                </Stack>
            </Box>
        )
    }

    return (
        <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
            <Heading as="h3" size="md" color="pink.400">คณะ (เรียงลำดับตามการแข่งร่วม)</Heading>
            <TableContainer mt={5}>
                <Table size="sm" variant="striped" fontFamily="athiti">
                    <Thead>
                        <Tr>
                            <Th>ลำดับ</Th>
                            <Th>คณะ</Th>
                            <Th isNumeric>จำนวนการแข่ง</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.facultyParticipation.map((faculty, index) => (
                            <Tr key={faculty.id}>
                                <Td>{index + 1}</Td>
                                <Td>{faculty.name}</Td>
                                <Td isNumeric>{faculty.participation}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const MostMedal = () => {

    const { data, isLoading } = useGetDashboardQuery();

    if (isLoading) {
        return (
            <Box bg="white" borderRadius="xl" shadow="sm" w="full" p={5}>
                <Heading as="h3" size="md" color="pink.400">คณะ (เรียงลำดับตามเหรียญ)</Heading>
                <Stack mt={5}>
                    {[...Array(10)].map((i) => (
                        <Skeleton key={i} height="20px" mt={2} />
                    ))}
                </Stack>
            </Box>
        )
    }


    return (
        <Box bg="white" borderRadius="xl" shadow="sm" p={5} overflowX="scroll">
            <Heading as="h3" size="md" color="pink.400">คณะ (เรียงลำดับตามเหรียญ)</Heading>
            <TableContainer mt={5}>
                <Table size="sm" variant="striped" fontFamily="athiti" >
                    <Thead>
                        <Tr>
                            <Th>ลำดับ</Th>
                            <Th>คณะ</Th>
                            <Th isNumeric>🥇</Th>
                            <Th isNumeric>🥈</Th>
                            <Th isNumeric>🥉</Th>
                            <Th isNumeric>รวม</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.facultyMedals.map((faculty, index) => (
                            <Tr key={faculty.id}>
                                <Td>{index + 1}</Td>
                                <Td>{faculty.name}</Td>
                                <Td isNumeric>{faculty.gold}</Td>
                                <Td isNumeric>{faculty.silver}</Td>
                                <Td isNumeric>{faculty.bronze}</Td>
                                <Td isNumeric>{faculty.Total}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

AdminPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default AdminPage;