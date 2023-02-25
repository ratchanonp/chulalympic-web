import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react"

type Props = {}

export default function GameCardSkeleton({ }: Props) {
    return (
        <HStack
            w="100%"
            borderRadius={10}
            px={10}
            py={7}
            border="2px"
            borderColor="gray.100"
            bg="white"
        >
            <HStack flex={1} spacing={16}>
                <VStack alignItems="left" spacing={0}>
                    <Text textColor="gray.400" fontSize="sm" fontFamily="athiti" fontWeight="500">เวลา</Text>
                    <Skeleton w={16} h="40px" />
                </VStack>
                <VStack alignItems="left" spacing={0} w="80px">
                    <Text textColor="gray.400" fontSize="sm" fontFamily="athiti" fontWeight="500">กีฬา</Text>
                    <Skeleton w={20} h="40px" />
                </VStack>
                <VStack alignItems="left" spacing={0} w="100px">
                    <Text textColor="gray.400" fontSize="sm" fontFamily="athiti" fontWeight="500">ประเภท</Text>
                    <Skeleton w={20} h="40px" />
                </VStack>
                <VStack alignItems="left" spacing={0} w="100px">
                    <Text textColor="gray.400" fontSize="sm" fontFamily="athiti" fontWeight="500">สถานที่</Text>
                    <Skeleton w={20} h="40px" />
                </VStack>
                <Skeleton w={20} h="30px" />
            </HStack>
        </HStack>
    )
}