import { Box, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";

type Props = {};

export default function GameCardSkeleton({ }: Props) {

  return (
    <HStack
      w="100%"
      borderRadius={10}
      px={{
        base: 5,
        md: 10,
      }}
      py={{
        base: 5,
        md: 5,
      }}
      border="2px"
      borderColor="gray.100"
      bg="white"
    >
      <HStack
        flex={1}
        spacing={{
          base: 5,
          md: 16,
        }}
        textAlign="left"
      >
        <VStack alignItems="left" spacing={0}>
          <Text
            textColor="gray.400"
            fontSize="sm"
            fontFamily="athiti"
            fontWeight="500"
          >
            เวลา
          </Text>

          <Skeleton w={14}
            h={{
              base: "24px",
              md: "40px",
            }}
            startColor="pink.200"
            endColor="pink.100" />

        </VStack>

        <VStack spacing={0} alignItems="left">
          <Text
            textColor="gray.400"
            fontSize="sm"
            fontFamily="athiti"
            fontWeight="500"
          >
            กีฬา
          </Text>
          <Text
            fontFamily="athiti"
            fontSize={{ base: "md", md: "2xl" }}
            fontWeight="bold"
          >
            <Skeleton w={20} h={{
              base: "24px",
              md: "40px",
            }} />
          </Text>
        </VStack>
        <VStack spacing={0} alignItems="left">
          <Text
            textColor="gray.400"
            fontSize="sm"
            fontFamily="athiti"
            fontWeight="500"
          >
            ประเภท
          </Text>
          <Text
            fontFamily="athiti"
            fontSize={{ base: "md", md: "2xl" }}
            fontWeight="bold"
          >
            <Skeleton w={20} h={{
              base: "24px",
              md: "40px",
            }} />
          </Text>
        </VStack>
        <VStack spacing={0} alignItems="left">
          <Text
            textColor="gray.400"
            fontSize="sm"
            fontFamily="athiti"
            fontWeight="500"
          >
            สถานที่
          </Text>
          <Text
            fontFamily="athiti"
            fontSize={{ base: "md", md: "2xl" }}
            fontWeight="bold"
          >
            <Skeleton w={20} h={{
              base: "24px",
              md: "40px",
            }} />
          </Text>
        </VStack>

        <Box display={{ base: "none", md: "block" }}>
          <Skeleton w={20} h="30px" />
        </Box>
      </HStack>
    </HStack>
  );
}
