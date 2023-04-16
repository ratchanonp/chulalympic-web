import AdminLayout from "@/components/layout/AdminLayout";
import SportForm from "@/components/partial/Form/SportForm/SportForm";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { Sport } from "@/interfaces/sport.interface";
import { useAddSportMutation, useDeleteSportMutation, useEditSportMutation, useGetSportsQuery } from "@/services/sport";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, HStack, Icon, IconButton, IconButtonProps, Stack, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { Formik, useFormikContext } from "formik";
import { forwardRef, ReactElement, useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdStadium } from "react-icons/md";

const SportsPage: NextPageWithLayout = () => {

    const toast = useToast();

    const { data, isLoading, error } = useGetSportsQuery();
    const [addSport, addSportResult] = useAddSportMutation();
    const [editSport, updateSportResult] = useEditSportMutation();
    const [deleteSport, deleteSportResult] = useDeleteSportMutation();

    const { isOpen: isOpenSideBar, onOpen: onOpenSideBar, onClose: onCloseSideBar } = useDisclosure()

    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure()
    const [deleteCode, setDeleteCode] = useState<string>("")
    const cancelRef = useRef<HTMLButtonElement>(null)

    async function handelDelete() {
        if (!deleteCode) return;
        await deleteSport(deleteCode)
            .unwrap()
            .then(() => { toast({ title: "Delete Success", status: "success", duration: 3000, isClosable: true }); })
            .catch(() => { toast({ title: "Delete Fail", status: "error", duration: 3000, isClosable: true }); })
        onCloseAlert();
    }

    const initialValues: Sport & { isNew: boolean } = {
        code: "",
        name: "",
        category: [
            { code: "", name: "" }
        ],
        isNew: true,
    }

    useEffect(() => {
        console.log("rerender")
    }, [])

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { resetForm }) => {
                    const { isNew, code, name, category } = values;

                    if (values.isNew) {
                        await addSport({ code, name, category })
                            .unwrap()
                            .then(() => { toast({ title: "Create Success", status: "success", duration: 3000, isClosable: true }); })
                            .catch(() => { toast({ title: "Create Fail", status: "error", duration: 3000, isClosable: true }); })

                    } else {
                        await editSport({ code, name, category })
                            .unwrap()
                            .then(() => { toast({ title: "Update Success", status: "success", duration: 3000, isClosable: true }); })
                            .catch(() => { toast({ title: "Update Fail", status: "error", duration: 3000, isClosable: true }); })
                    }

                    resetForm();
                    onCloseSideBar();
                }}
            >
                {({
                    values,
                    submitForm,
                    resetForm,
                    setFieldValue,
                }) => (
                    <>
                        <Stack p={5} w="full">
                            <Flex justifyContent="space-between" w="full" bg="white" p={5} borderRadius="xl" border="2px solid" borderColor="gray.200">
                                <Text display="flex" alignItems="center">
                                    <Icon as={MdStadium} w={6} h={6} color="gray.500" mr={2} /> Total {data?.length} Sports
                                </Text>
                                <Button variant="solid" colorScheme="brand" onClick={() => { setFieldValue('isNew', true); resetForm(); onOpenSideBar(); }} leftIcon={<Icon as={MdStadium} />}>Create Sport</Button>
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
                                        <GridItem alignItems="center" h="full" display="flex" fontSize="xl" color="pink.400" fontWeight="semibold" >{sport.code}</GridItem>
                                        <GridItem alignItems="center" h="full" display="flex" fontSize="xl" fontWeight="semibold" >{sport.name}</GridItem>
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
                                                <EditButton sport={sport} onOpen={onOpenSideBar} aria-label="edit" />
                                                <IconButton
                                                    variant="solid" aria-label="Delete" icon={<Icon as={FaTrash} />}
                                                    onClick={() => { setDeleteCode(sport.code); onOpenAlert(); }}
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
                            size="lg"
                            onClose={onCloseSideBar}
                        >

                            <DrawerOverlay />
                            <DrawerContent
                                fontFamily="athiti"
                            >
                                <DrawerCloseButton />
                                <DrawerHeader>Sport</DrawerHeader>
                                <DrawerBody>
                                    <SportForm />
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button variant='outline' mr={3} onClick={() => { resetForm(); onCloseSideBar(); }}>Cancel</Button>
                                    <Button variant="solid" colorScheme="brand" mr={3} onClick={() => { submitForm(); onCloseSideBar(); }}>Save</Button>
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
                        ต้องการลบ <Text as="span" fontWeight="bold">{data && deleteCode && data.find(({ code }) => code == deleteCode)?.name}</Text> ใช่หรือไม่
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
    sport: Sport;
    onOpen: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>((props, ref) => {
    const { setValues } = useFormikContext<Sport & { isNew: boolean }>();

    const handleClick = () => { setValues({ ...props.sport, isNew: false }); props.onOpen(); }

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

SportsPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default SportsPage;