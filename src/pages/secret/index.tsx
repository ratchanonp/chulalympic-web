import Container from "@/components/common/Chakra/Container/Container";
import { useGetFacultiesQuery } from "@/services/faculty";
import { useGetSportsQuery, useLazyGetSportCategoriesQuery } from "@/services/sport";
import { useGetVenuesQuery } from "@/services/venue";
import { Button, Checkbox, FormControl, FormLabel, Grid, Heading, Input, Select, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";

type Props = {}

export default function Form({ }: Props) {

    const formik = useFormik({
        initialValues: {
            sport: "",
            sportCategory: "",
            venue: "",
            faculty: [],
            start: "",
            type: "",
        },
        onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
        },
    })

    const { data: Sport, isLoading: isSportLoading } = useGetSportsQuery();
    const { data: Venue, isLoading: isVenueLoading } = useGetVenuesQuery();
    const { data: Faculty, isLoading: isFacultyLoading } = useGetFacultiesQuery();
    const [trigger, { data: SportCategory, isLoading: isSportCategoryLoading }] = useLazyGetSportCategoriesQuery();

    const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        formik.setFieldValue("sport", value);
        trigger(value);
    }

    const handleFacultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            formik.setFieldValue("faculty", [...formik.values.faculty, value]);
        } else {
            formik.setFieldValue("faculty", formik.values.faculty.filter(faculty => faculty !== value));
        }
    }

    return (
        <Container>
            <Heading>Games Adds</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Stack alignItems="start" spacing={5}>
                    <FormControl>
                        <FormLabel>กีฬา</FormLabel>
                        <Select placeholder={isSportLoading ? "กำลังโหลด..." : "เลือกกีฬา"} onChange={handleSportChange}>
                            {Sport?.map(sport => (
                                <option key={sport.code} value={sport.code}>{sport.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>ประเภทกีฬา</FormLabel>
                        <Select id="sportCategory" placeholder={isSportCategoryLoading ? "กำลังโหลด..." : "เลือกประเภทกีฬา"} onChange={formik.handleChange}>
                            {SportCategory?.map(sportCategory => (
                                <option key={sportCategory.code} value={sportCategory.code}>{sportCategory.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>สถานที่แข่ง</FormLabel>
                        <Select id="venue" placeholder={isVenueLoading ? "กำลังโหลด..." : "เลือกสถานที่แข่ง"} onChange={formik.handleChange}>
                            {Venue?.map(venue => (
                                <option key={venue.id} value={venue.id}>{venue.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>วันที่แข่ง</FormLabel>
                        <Input id="start" type="datetime-local" onChange={formik.handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>ประเภทการแข่ง</FormLabel>
                        <Select id="type" placeholder="เลือกประเภทการแข่ง" onChange={formik.handleChange}>
                            <option value="REGULAR">ปกติ</option>
                            <option value="QUALIFYING">คัดเลือก</option>
                            <option value="FINAL">รอบชิงชนะเลิศ</option>
                            <option value="QUARTER_FINAL">รอบ 8 ทีม</option>
                            <option value="SEMI_FINAL">รอบ 4 ทีม</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>คณะที่เข้าร่วม</FormLabel>
                        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                            {Faculty?.map(faculty => (
                                <FormControl key={faculty.id} display="flex" alignItems="center">
                                    <Checkbox value={faculty.id} onChange={handleFacultyChange}> {faculty.name} </Checkbox>
                                </FormControl>
                            ))}
                        </Grid>
                    </FormControl>
                    <Button isLoading={formik.isSubmitting} type="submit" loadingText="กำลังบันทึก">บันทึก</Button>
                </Stack>
            </form>
        </Container >
    )
}