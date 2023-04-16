import Container from "@/components/common/Chakra/Container/Container"
import { useCreateCategoryMutation, useGetSportsQuery } from "@/services/sport"
import { Button, FormControl, Heading, Input, Select, Stack, Text } from "@chakra-ui/react"
import { useFormik } from "formik"

type Props = {}

export default function AddCategory({ }: Props) {

    const [createSportCategory] = useCreateCategoryMutation();

    const formik = useFormik({
        initialValues: {
            sportCode: "",
            code: "",
            name: "",
        },
        onSubmit: async (values) => {
            await createSportCategory(values);
        }
    })

    const { data, isLoading } = useGetSportsQuery();


    return (
        <Container>
            <Heading>Category</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4} fontFamily="athiti" alignItems="start">
                    <FormControl>
                        <Text>กีฬา</Text>
                        <Select colorScheme="pink" id="sportCode" placeholder={isLoading ? "กำลังโหลด..." : "เลือกกีฬา"} onChange={formik.handleChange} required>
                            {data?.map(sport => (
                                <option key={sport.code} value={sport.code}>{sport.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <Text>รหัสประเภทกีฬา</Text>
                        <Input colorScheme="pink" id="code" placeholder="รหัสประเภทกีฬา" onChange={formik.handleChange} type="text" required />
                    </FormControl>
                    <FormControl>
                        <Text>ชื่อประเภทกีฬา</Text>
                        <Input id="name" placeholder="ชื่อประเภทกีฬา" onChange={formik.handleChange} type="text" required />
                    </FormControl>

                    <Button colorScheme="pink" type="submit" isLoading={formik.isSubmitting} loadingText="กำลังเพิ่ม">เพิ่ม</Button>
                </Stack>
            </form>
        </Container>
    )
}