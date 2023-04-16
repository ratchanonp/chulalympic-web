import AdminLayout from "@/components/layout/AdminLayout";
import { DateSelector } from "@/components/partial/DateSelector/DataSelector";
import { AdminFilter } from "@/components/partial/Filter/AdminFilter";
import { GameCardList } from "@/components/partial/GameCard/GameCardList";
import { useAppSelector } from "@/hooks";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { useGetFacultiesQuery } from "@/services/faculty";
import { useGetSportsQuery } from "@/services/sport";
import { useGetVenuesQuery } from "@/services/venue";
import { Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import { AiFillFilter, AiOutlineFilter } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";

const GamePage: NextPageWithLayout = () => {

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: sports, isLoading: sportsLoading } = useGetSportsQuery();
    const { data: venues, isLoading: venuesLoading } = useGetVenuesQuery();
    const { data: faculties, isLoading: facultiesLoading } = useGetFacultiesQuery();

    const { date: selectedDate, sports: selectedSports, venues: selectedVenues, faculty: selectedFaculties } = useAppSelector((state) => state.filter);
    const selectSportsName = useMemo(() => sports?.filter(sport => selectedSports.includes(sport.code)).map(sport => sport.name), [sports, selectedSports]);
    const selectVenuesName = useMemo(() => venues?.filter(venue => selectedVenues.includes(String(venue.id))).map(venue => venue.name), [venues, selectedVenues]);
    const selectFacultiesName = useMemo(() => faculties?.filter(faculty => selectedFaculties.includes(String(faculty.id))).map(faculty => faculty.name), [faculties, selectedFaculties]);

    return (
        <>
            <Stack w="full" h="full" spacing={5}>
                <HStack py={4} alignItems="center" justifyContent="space-between" borderRadius="xl" zIndex={1} bg="white" px={5}>
                    <HStack>
                        <Text fontFamily="kanit">Filter:</Text>
                        <Badge colorScheme="pink" ml={2}>{selectedDate.toLocaleDateString('th-TH')}</Badge>
                        {selectSportsName && selectSportsName.map((sport, index) => (<Badge key={sport} colorScheme="green" ml={2}>{sport}</Badge>))}
                        {selectVenuesName && selectVenuesName.map((venue, index) => (<Badge key={venue} colorScheme="yellow" ml={2}>{venue}</Badge>))}
                        {selectFacultiesName && selectFacultiesName.map((faculty, index) => (<Badge key={faculty} colorScheme="blue" ml={2}>{faculty}</Badge>))}
                    </HStack>
                    <HStack>
                        <Button onClick={onOpen} borderColor="pink.400" border="1px" bg="white" color="pink.400" leftIcon={<AiOutlineFilter />}> Filter</Button>
                        <Button onClick={() => router.push("/admin/games/create")} colorScheme="brand" leftIcon={<IoIosAddCircle />}>เพิ่มการแข่งขัน</Button>
                    </HStack>
                </HStack>
                <Box overflowY="scroll">
                    <GameCardList />
                </Box>
            </Stack>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader display="flex" alignItems="center">
                        <Icon as={AiFillFilter} mr={2} />Filter
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack>
                            <Box>
                                <DateSelector />
                            </Box>
                            <AdminFilter />
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

GamePage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default GamePage;