import AdminLayout from "@/components/layout/AdminLayout";
import VenueForm from "@/components/partial/Form/VenueForm/VenueForm";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { Venue } from "@/interfaces/venue.interface";
import { useAddVenueMutation, useDeleteVenueMutation, useEditVenueMutation, useGetVenuesQuery } from "@/services/venue";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, HStack, Icon, IconButton, IconButtonProps, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Formik, useFormikContext } from "formik";
import { forwardRef, ReactElement, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdStadium } from "react-icons/md";

const VenuesPage: NextPageWithLayout = () => {

    const toast = useToast();

    const { data, isLoading, error } = useGetVenuesQuery();
    const [addVenue, addVenueResult] = useAddVenueMutation();
    const [editVenue, updateVenueResult] = useEditVenueMutation();
    const [deleteVenue, deleteVenueResult] = useDeleteVenueMutation();

    const { isOpen: isOpenSideBar, onOpen: onOpenSideBar, onClose: onCloseSideBar } = useDisclosure()

    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure()
    const [deleteId, setDeleteId] = useState<number | undefined>(undefined)
    const cancelRef = useRef<HTMLButtonElement>(null)

    async function handelDelete() {
        if (!deleteId) return;
        await deleteVenue(deleteId)
            .unwrap()
            .then(() => { toast({ title: "Delete Success", status: "success", duration: 3000, isClosable: true }); })
            .catch(() => { toast({ title: "Delete Fail", status: "error", duration: 3000, isClosable: true }); })
        onCloseAlert();
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <Formik
                initialValues={{ id: undefined, name: '' }}
                onSubmit={async (values, { resetForm }) => {
                    if (values.id) {
                        await editVenue({ id: values.id, name: values.name })
                            .unwrap()
                            .then(() => { toast({ title: "Update Success", status: "success", duration: 3000, isClosable: true }); })
                            .catch(() => { toast({ title: "Update Fail", status: "error", duration: 3000, isClosable: true }); })
                    } else {
                        await addVenue({ name: values.name })
                            .unwrap()
                            .then(() => { toast({ title: "Create Success", status: "success", duration: 3000, isClosable: true }); })
                            .catch(() => { toast({ title: "Create Fail", status: "error", duration: 3000, isClosable: true }); })
                    }

                    resetForm();
                    onCloseSideBar();
                }}
            >
                {({
                    values,
                    submitForm,
                    resetForm,
                }) => (
                    <>
                        <Stack p={5} w="full">
                            <Flex justifyContent="space-between" w="full" bg="white" p={5} borderRadius="xl" border="2px solid" borderColor="gray.200">
                                <Text display="flex" alignItems="center">
                                    <Icon as={MdStadium} w={6} h={6} color="gray.500" mr={2} /> Total {data?.length} Venues
                                </Text>
                                <Button variant="solid" colorScheme="brand" onClick={() => { resetForm(); onOpenSideBar(); }} leftIcon={<Icon as={MdStadium} />}>Create Venue</Button>
                            </Flex>
                            <Stack pb={5}>
                                {data && data.map((Venue) => (
                                    <Grid
                                        templateColumns="repeat(2, 1fr)"
                                        alignItems="start"
                                        gap={6}
                                        key={Venue.id}
                                        p={5}
                                        bg="white"
                                        borderRadius="xl" border="2px solid" borderColor="gray.200"
                                        fontFamily="athiti"
                                    >

                                        <GridItem alignItems="center" h="full" display="flex" fontSize="xl" color="pink.400" fontWeight="semibold" >{Venue.name}</GridItem>
                                        <GridItem>
                                            <HStack justifyContent="end">
                                                <EditButton Venue={Venue} onOpen={onOpenSideBar} aria-label="edit" />
                                                <IconButton
                                                    variant="solid" aria-label="Delete" icon={<Icon as={FaTrash} />}
                                                    onClick={() => { setDeleteId(Venue.id); onOpenAlert(); }}
                                                />
                                            </HStack>
                                        </GridItem>
                                    </Grid>
                                ))}
                            </Stack>
                        </Stack>

                        <Drawer
                            isOpen={isOpenSideBar}
                            placement='right'
                            onClose={onCloseSideBar}
                        >

                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>{values.id ? 'Edit' : 'Create'} Venue</DrawerHeader>
                                <DrawerBody>
                                    <VenueForm />
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button variant='outline' mr={3} onClick={() => { resetForm(); onCloseSideBar(); }}>Cancel</Button>
                                    <Button variant="solid" colorScheme="brand" mr={3} onClick={() => { submitForm(); onCloseSideBar(); }}> {values.id ? 'Save' : 'Create'} </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </>
                )}
            </Formik>
            <AlertDialog
                isOpen={isOpenAlert}
                onClose={onCloseAlert}
                leastDestructiveRef={cancelRef}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent fontFamily="athiti">
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">ยืนยันการลบ</AlertDialogHeader>
                    <AlertDialogBody>
                        ต้องการลบ <Text as="span" fontWeight="bold">{data && deleteId && data.find(({ id }) => id == deleteId)?.name}</Text> ใช่หรือไม่
                        <br />การลบข้อมูลจะไม่สามารถย้อนกลับได้
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme="red" onClick={handelDelete}> ลบ </Button>
                        <Button ref={cancelRef} onClick={onCloseAlert} ml={3}> ยกเลิก </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

interface EditButtonProps extends IconButtonProps {
    Venue: Venue;
    onOpen: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>((props, ref) => {
    const { setValues } = useFormikContext<Venue>();

    const handleClick = () => { setValues(props.Venue); props.onOpen(); }

    return (
        <IconButton
            ref={ref}
            variant="solid"
            aria-label="Edit"
            icon={<Icon as={FaEdit} />}
            onClick={handleClick}
        />
    )
})
EditButton.displayName = 'EditButton';

VenuesPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default VenuesPage;