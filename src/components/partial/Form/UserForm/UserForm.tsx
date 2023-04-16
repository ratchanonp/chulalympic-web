import { CreateUser, Role } from "@/interfaces/user.interface";
import { FormControl, FormHelperText, FormLabel, Input, ListItem, Radio, RadioGroup, Stack, UnorderedList } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { PasswordField } from "../../PasswordField/PasswordField";

const UserForm = () => {

    const {
        values,
        handleChange,
        handleBlur,
    } = useFormikContext<CreateUser>();

    return (
        <Stack>
            <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input type="text" id="username" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} required />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <PasswordField id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} isRequired autoComplete="new-password" />
                <FormHelperText>
                    Password must contain:
                    <UnorderedList>
                        <ListItem>At least 8 characters</ListItem>
                        <ListItem>At least 1 uppercase letter</ListItem>
                        <ListItem>At least 1 lowercase letter</ListItem>
                        <ListItem>At least 1 number</ListItem>
                        <ListItem>At least 1 special character</ListItem>
                    </UnorderedList>
                </FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <PasswordField id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} isRequired autoComplete="new-password" />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input type="text" id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} required />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="role">Role</FormLabel>
                <RadioGroup onChange={handleChange} value={values.role}>
                    <Stack direction='row'>
                        {Object.keys(Role).map((key) => (
                            <Radio key={key} value={key} name="role" onChange={handleChange} onBlur={handleBlur} isChecked={values.role === key}>{key}</Radio>
                        ))}
                    </Stack>
                </RadioGroup>
            </FormControl>
        </Stack>
    )
}

export default UserForm