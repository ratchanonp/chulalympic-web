import AdminLayout from "@/components/layout/AdminLayout";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { useGetSportsQuery } from "@/services/sport";
import { Badge, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, HStack, Icon, IconButton, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaEdit, FaTrash, FaUser, FaUserPlus } from "react-icons/fa";

const SportsPage: NextPageWithLayout = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isLoading, error } = useGetSportsQuery();
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <Stack p={5} w="full">
                <Flex justifyContent="space-between" w="full" bg="white" p={5} borderRadius="xl" border="2px solid" borderColor="gray.200">
                    <Text display="flex" alignItems="center">
                        <Icon as={FaUser} w={6} h={6} color="gray.500" mr={2} /> Total {data?.length} Sports
                    </Text>
                    <Button variant="solid" colorScheme="brand" onClick={onOpen} leftIcon={<Icon as={FaUserPlus} />}>Create Sport</Button>
                </Flex>
                <Stack pb={5}>
                    {data && data.map((sport) => (
                        <Grid
                            templateColumns="repeat(6, 1fr)"
                            alignItems="start"
                            gap={6}
                            key={sport.code}
                            p={5}
                            bg="white"
                            borderRadius="xl" border="2px solid" borderColor="gray.200"
                            fontFamily="athiti"
                        >
                            <GridItem fontSize="xl" color="pink.400" fontWeight="semibold">{sport.code}</GridItem>
                            <GridItem fontSize="xl" fontWeight="semibold">{sport.name}</GridItem>
                            <GridItem colSpan={3}>
                                <Flex gap={2} flexWrap="wrap">
                                    {sport.category &&
                                        sport.category.map((category) => (
                                            <Tooltip key={category.code} label={category.code} hasArrow placement="top">
                                                <Badge colorScheme="blue" w="fit-content" h="fit-content">{category.name}</Badge>
                                            </Tooltip>
                                        ))
                                    }
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <HStack justifyContent="end">
                                    <IconButton variant="solid" aria-label="Edit" icon={<Icon as={FaEdit} />} />
                                    <IconButton variant="solid" aria-label="Delete" icon={<Icon as={FaTrash} />} />
                                </HStack>
                            </GridItem>
                        </Grid>
                    ))}
                </Stack>
            </Stack>
            <Drawer
                isOpen={isOpen}
                placement='right'
                size="md"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create Sport</DrawerHeader>

                    <DrawerBody>
                        <Text>Form</Text>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                        <Button variant="solid" colorScheme="brand" mr={3} onClick={onClose}> Create </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}


SportsPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default SportsPage;