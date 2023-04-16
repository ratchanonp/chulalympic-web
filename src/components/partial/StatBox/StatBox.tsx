import { Box, BoxProps, forwardRef, Skeleton, Stack, Text } from "@chakra-ui/react"

interface Props extends BoxProps {
    isLoading?: boolean
    title: string
    value: number
    unit: string
}

const StatBox = forwardRef<Props, 'div'>((props, ref) => {

    const { title, value, unit, isLoading } = props

    if (isLoading) {
        return (
            <Stack px={5} py={3} borderRadius="xl" bg="white" fontFamily="athiti" shadow="sm" my={2}>
                <Skeleton height="1.5rem" w={90} />
                <Skeleton height="3rem" w="150px" transitionDuration="1s" />
                <Skeleton height="1rem" w={90} transitionDuration="2s" />
            </Stack>
        )
    }

    return (
        <Box px={5} py={3} borderRadius="xl" bg="white" fontFamily="athiti" shadow="sm" my={2}>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
            <Text display="inline-flex" alignItems="baseline" fontSize="4xl" fontWeight="black" color="pink.400">{value}</Text>
            <Text fontSize="sm" color="gray.600" fontWeight="semibold">{unit}</Text>
        </Box>
    )
})

export default StatBox