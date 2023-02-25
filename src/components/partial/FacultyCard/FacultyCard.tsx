import { Faculty } from '@/interfaces/faculty.interface'
import { getInitialLetter } from '@/utils/mapping'
import { Flex, Heading, Icon, Link, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

type Props = {
    isLoading?: boolean
    faculty?: Faculty
}

const FacultyCard = (props: Props) => {

    const { faculty, isLoading } = props

    if (isLoading || !faculty) return (
        <Flex border="1px solid" borderColor="gray.100" borderRadius="lg" p={5} alignItems="center" gap={5}>
            <SkeletonCircle size="10" />
            <Skeleton h={10} w={300} />
        </Flex>
    )


    let { id, name } = faculty

    return (
        <Link data-group href={`/faculty/${id}`} as={NextLink} display="flex" _hover={{ textDecor: "none" }} fontFamily="athiti" border="1px solid" borderColor="gray.100" borderRadius="lg" p={5} alignItems="center" gap={5}>
            <Flex fontWeight="bold" fontSize="5xl">{getInitialLetter({ name: name, })}</Flex>
            <Heading noOfLines={1} variant="h2" fontSize="xl" size="lg" fontWeight="300">{name}</Heading>
            <Text ml="auto" transition="all ease-in-out 0.3s" _groupHover={{ transform: "scale(1.1)", textColor: "pink.400" }} ><Icon w={8} h={8} as={FaArrowRight} /></Text>
        </Link>
    )
}

export { FacultyCard }
