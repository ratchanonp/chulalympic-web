import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

export function DateSelectorLoading() {

    return (
        <Flex justify="space-between" bgColor="white" borderRadius={10} p={5} mt={2} gap={1} overflowX="auto" position="sticky" top={0} border="2px" borderColor="gray.100">
            {[...Array(10)].map((_, idx) => {
                return (
                    <Box
                        key={idx}
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
                        bgColor="gray.50"
                    >
                        <Skeleton h="15px" w={10} mb={2} />
                            <Skeleton noOfLines={1} h="30px" mb={2} />
                        <Skeleton noOfLines={1} h="15px" />
                    </Box>
                );
            })}
        </Flex>
    );
}
