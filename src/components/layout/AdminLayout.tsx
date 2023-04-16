import { RootState } from "@/redux/store"
import { Flex, VStack } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import SideBar from "../common/SideBar"
import TopBar from "../common/TopBar"

interface Props {
    children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {

    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    const router = useRouter();
    const path = router.pathname.split('/')[2]
    const capitalize = (s: string) => { return s.charAt(0).toUpperCase() + s.slice(1) }

    useEffect(() => {
        if (!isAuthenticated) router.push('/auth/login')
    });

    return (
        <>
            <Head>
                <title>{capitalize(path)} | Admin | Chulalympic</title>
            </Head>
            <Flex h="100vh" bgColor="gray.50" >
                <SideBar />
                <VStack as="main" flex="1" w="full" >
                    <TopBar />
                    <Flex w="full" px={6} overflowY="scroll">
                        {children}
                    </Flex>
                </VStack>
            </Flex>
        </>
    )
}

export default AdminLayout