import { Sport } from "@/interfaces/sport.interface"
import { Button, FormControl, FormHelperText, FormLabel, HStack, Icon, IconButton, Input, Stack, Text } from "@chakra-ui/react"
import { FieldArray, useFormikContext } from "formik"
import { FaTrash } from "react-icons/fa"
import { IoMdAddCircle } from "react-icons/io"

const SportForm = () => {

    const { values, handleChange, handleBlur } = useFormikContext<Sport & { isNew: boolean }>()

    return (
        <Stack>
            <FormControl>
                <FormLabel fontWeight="semibold">รหัสกีฬา</FormLabel>
                <Input id="code" name="code" onChange={handleChange} onBlur={handleBlur} value={values.code} readOnly={!values.isNew} />
                <FormHelperText color="red">แก้ไขภายหลังไม่ได้</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel fontWeight="semibold">ชื่อกีฬา</FormLabel>
                <Input id="name" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
            </FormControl>
            <Text fontWeight="semibold">ประเภทการแข่งขัน</Text>
            <FieldArray name="category">
                {({ remove, push }) => (
                    <Stack>
                        {values.category?.map((category, index) => (
                            <HStack key={index} bg="gray.100" p={5} borderRadius="xl" alignItems="end">
                                <FormControl w="fit-content">
                                    <FormLabel fontWeight="semibold">รหัสประเภท</FormLabel>
                                    <Input id={`category.${index}.code`} name={`category.${index}.code`} onChange={handleChange} onBlur={handleBlur} value={category.code} bg="white" w="150px" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">ชื่อประเภท</FormLabel>
                                    <Input id={`category.${index}.name`} name={`category.${index}.name`} onChange={handleChange} onBlur={handleBlur} value={category.name} bg="white" />
                                </FormControl>
                                <IconButton colorScheme="red" aria-label="Delete" icon={<FaTrash />} onClick={() => remove(index)} />
                            </HStack>
                        ))}
                        <Button colorScheme="blue" onClick={() => push({ code: '', name: '' })} leftIcon={<Icon as={IoMdAddCircle} />}>Add Category</Button>
                    </Stack>
                )}
            </FieldArray>
        </Stack>
    )
}

export default SportForm