import AdminLayout from "@/components/layout/AdminLayout";
import UserForm from "@/components/partial/Form/UserForm/UserForm";
import { NextPageWithLayout } from "@/interfaces/nextjs";
import { CreateUser, Role, User } from "@/interfaces/user.interface";
import { useAddUserMutation, useDeleteUserMutation, useEditUserMutation, useGetUsersQuery } from "@/services/user";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Grid, HStack, Icon, IconButton, IconButtonProps, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Formik, useFormikContext } from "formik";
import { forwardRef, ReactElement, useRef, useState } from "react";
import { FaEdit, FaTrash, FaUser, FaUserPlus, FaUserTie } from "react-icons/fa";

const UsersPage: NextPageWithLayout = () => {

    const toast = useToast();

    const { data, isLoading, error } = useGetUsersQuery();
    const [addUser, addUserResult] = useAddUserMutation();
    const [editUser, updateUserResult] = useEditUserMutation();
    const [deleteUser, deleteUserResult] = useDeleteUserMutation();

    const { isOpen: isOpenSideBar, onOpen: onOpenSideBar, onClose: onCloseSideBar } = useDisclosure()

    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure()
    const [deleteId, setDeleteId] = useState<number | undefined>(undefined)
    const cancelRef = useRef<HTMLButtonElement>(null)

    async function handelDelete() {
        if (!deleteId) return;
        await deleteUser(deleteId)
            .unwrap()
            .then(() => { toast({ title: "Delete Success", status: "success", duration: 3000, isClosable: true }); })
            .catch(() => { toast({ title: "Delete Fail", status: "error", duration: 3000, isClosable: true }); })
        onCloseAlert();
    }

    const createUserInitialValues: CreateUser = { id: undefined, username: "", password: "", confirmPassword: "", name: "", role: Role.REPORTER }

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <Formik
                initialValues={createUserInitialValues}
                onSubmit={async (values, { resetForm }) => {

                    const { id, username, name, password, role } = values;

                    if (values.id) {
                        let editUserPayload: Partial<CreateUser> = {}
                        if (password === "") editUserPayload = { id, username, name, role }
                        else editUserPayload = { id, username, name, password, role }

                        await editUser(editUserPayload)
                            .unwrap()
                            .then(() => { toast({ title: "Update Success", status: "success", duration: 3000, isClosable: true }); })
                            .catch(() => { toast({ title: "Update Fail", status: "error", duration: 3000, isClosable: true }); })
                    } else {
                        await addUser({ username, name, password, role })
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
                                    <Icon as={FaUser} w={6} h={6} color="gray.500" mr={2} /> Total {data?.length} Users
                                </Text>
                                <Button variant="solid" colorScheme="brand" onClick={() => { resetForm(); onOpenSideBar(); }} leftIcon={<Icon as={FaUserPlus} />}>Create User</Button>
                            </Flex>
                            <Stack pb={5}>
                                {data && data.map((user) => (
                                    <Grid
                                        templateColumns="repeat(4, 1fr)"
                                        alignItems="center"
                                        gap={6}
                                        key={user.id}
                                        px={5} py={2.5}
                                        bg="white"
                                        borderRadius="xl" border="2px solid" borderColor="gray.200"
                                    >

                                        <Text display="flex" alignItems="center"> <Icon as={user.role === Role.ADMIN ? FaUserTie : FaUser} w={6} h={6} color="gray.500" mr={2} /> {user.name}</Text>
                                        <Badge
                                            w="fit-content"
                                            h="fit-content"
                                            colorScheme={user.role === Role.ADMIN ? "red" : "green"}
                                        >
                                            {user.role}
                                        </Badge>
                                        <Text>{new Date(user.createdAt).toLocaleString("th-TH")}</Text>
                                        <HStack justifyContent="end">
                                            <EditButton User={user} onOpen={onOpenSideBar} aria-label="edit" />
                                            <IconButton
                                                variant="solid" aria-label="Delete" icon={<Icon as={FaTrash} />}
                                                onClick={() => { setDeleteId(user.id); onOpenAlert(); }}
                                            />
                                        </HStack>
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
                                <DrawerHeader>{values.id ? 'Edit' : 'Create'} User</DrawerHeader>
                                <DrawerBody>
                                    <UserForm />
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
    User: User;
    onOpen: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>((props, ref) => {
    const { setValues } = useFormikContext<User>();

    const handleClick = () => { setValues(props.User); props.onOpen(); }

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

UsersPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>
export default UsersPage;