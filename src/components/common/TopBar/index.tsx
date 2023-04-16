import { signOut } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/services/user";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, Icon, Menu, MenuButton, MenuItem, MenuList, Skeleton, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BiUserCircle } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";


type Props = {}

const TopBar = (props: Props) => {

    const router = useRouter();
    const notFilterPath = router.pathname.split("/").slice(1);
    const path = notFilterPath.filter((item) => item !== "[id]");

    const dispatch = useDispatch();

    const { data, isLoading } = useGetMeQuery();

    const capitalize = (s: string) => { return s.charAt(0).toUpperCase() + s.slice(1) }

    return (
        <Flex w="full" px={10} pt={10} justifyContent="space-between" alignItems="center" >
            {/* BreadCrumb */}
            <Stack>
                <Breadcrumb>
                    {path.map((item, index) => {

                        const href = "/admin/" + path.slice(1, index + 1).join("/");
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink as={NextLink} href={href} isCurrentPage={index === path.length - 1}>
                                    {item === "" ? "Page" : capitalize(item)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                    })}
                </Breadcrumb>
                <Heading color="pink.400">
                    {path[path.length - 1] === "" ? "Page" : capitalize(path[path.length - 1])}
                </Heading>
            </Stack>
            {/* End BreadCrumb */}
            <Menu placement="bottom-end">
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<Icon as={BiUserCircle} fontSize="2xl" />} bg="white" size="lg" border="2px solid" borderColor="gray.200">
                    {isLoading ? <Skeleton height="20px" width="150px" /> : data?.name}
                </MenuButton>
                <MenuList zIndex={20}>
                    <MenuItem color="red" onClick={() => dispatch(signOut())}><Icon as={FaSignOutAlt} mr={2} />Logout</MenuItem>
                </MenuList>
            </Menu>
        </Flex >
    )
}

export default TopBar