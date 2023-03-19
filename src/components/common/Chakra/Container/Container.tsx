import { Container as ChakraContaier } from "@chakra-ui/react";

export default function Container(props: React.ComponentProps<typeof ChakraContaier>) {
    return (
        <ChakraContaier maxW="container.xl" {...props} py={props.py ?? 10}>
            {props.children}
        </ChakraContaier>
    );
}
