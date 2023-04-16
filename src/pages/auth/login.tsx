import WebName from '@/components/common/WebName/WebName'
import { PasswordField } from '@/components/partial/PasswordField/PasswordField'
import { signIn } from '@/redux/features/auth/authSlice'
import { RootState } from '@/redux/store'
import { useSignInMutation } from '@/services/auth'
import {
    Box, Button, Container, Flex, FormControl,
    FormLabel,
    Heading, Input,
    Stack,
    useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

const LoginPage: NextPage = () => {


    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    const [signInMuataion] = useSignInMutation();
    const toast = useToast();
    const router = useRouter();

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: async (values) => {
            await signInMuataion(values)
                .unwrap()
                .then((res) => { dispatch(signIn({ accessToken: res.access_token })) })
                .catch((err) => { toast({ title: "Username or password is incorrect", status: "error", duration: 5000, isClosable: true, position: "top" }) })
        }
    })

    if (isAuthenticated) router.push('/admin')
    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} fontFamily="athiti" >
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Flex justifyContent="center" fontSize="5xl" fontWeight="black">
                            <WebName />
                        </Flex>
                        <Heading fontFamily="kanit" size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg-surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="email">Username</FormLabel>
                                    <Input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <PasswordField id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                </FormControl>
                            </Stack>
                            <Button type="submit" colorScheme="brand" variant="solid">Sign in</Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container >
    )
}

export default LoginPage