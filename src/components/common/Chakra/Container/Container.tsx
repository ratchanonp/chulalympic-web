import { Container as ChakraContaier, ContainerProps, forwardRef } from "@chakra-ui/react";

const Container = forwardRef<ContainerProps, 'div'>((props, ref) => {
    return (
        <ChakraContaier maxW="container.xl" ref={ref} py={props.py ?? 10} {...props} />
    )
});

export default Container;