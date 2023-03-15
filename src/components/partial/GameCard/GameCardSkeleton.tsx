import { Flex, HStack, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

type Props = {};

export default function GameCardSkeleton({ }: Props) {

  return (
    <VStack
      w="100%"
      borderRadius={10}
      p={5}
      border="2px"
      borderColor="gray.100"
      bg="white"
      alignItems="start"
    >
      <HStack>
        <Skeleton w={["80px", "105px"]} h={["18px", "24px"]} />
        <Skeleton w={["100px", "125px"]} h={["18px", "24px"]} />
      </HStack>
      <Flex w="full" alignItems="center">
        <Skeleton w="80px" h="45px" startColor="pink.300" endColor="pink.100" display={["none", "block"]} />
        <Skeleton ml={[0, 4]} w={["80px", "105px"]} h="45px" />
        <Skeleton ml={[2, 24]} w={["100px", "125px"]} h="45px" />
        <Skeleton ml="auto" w="45px" h="24px" startColor="pink.300" endColor="pink.100" display={["block", "none"]} />
      </Flex>
      <SkeletonText noOfLines={1} w={100} />
    </VStack>
  );
}
