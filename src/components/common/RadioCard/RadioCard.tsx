import { Box, RadioProps, useRadio } from "@chakra-ui/react";

interface Props extends RadioProps {
    children: React.ReactNode;
}

function RadioCard(props: Props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderRadius="md"
                color="gray.600"
                fontFamily="athiti"
                _checked={{
                    bg: "pink.400",
                    color: "white",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                _hover={{
                    bg: "pink.100",
                    color: "gray.600",
                }}
                px={5}
                py={3}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default RadioCard;
