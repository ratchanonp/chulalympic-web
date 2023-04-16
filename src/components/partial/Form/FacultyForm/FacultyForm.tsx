import { Faculty } from "@/interfaces/faculty.interface"
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react"
import { useFormikContext } from "formik"

const FacultyForm = () => {

    const { values, handleChange, handleBlur } = useFormikContext<Partial<Faculty>>()

    return (
        <Stack>
            <FormControl>
                <FormLabel>ชื่อคณะ</FormLabel>
                <Input id="name" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
            </FormControl>
        </Stack>
    )
}

export default FacultyForm