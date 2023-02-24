import { Faculty } from '@/interfaces/faculty.interface'
import { getInitialLetter } from '@/utils/mapping'
import { Flex, Heading, Link, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import NextLink from 'next/link'

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
        <Link href={`/faculty/${id}`} as={NextLink} display="flex" _hover={{ textDecor: "none" }} fontFamily="athiti" border="1px solid" borderColor="gray.100" borderRadius="lg" p={5} alignItems="center" gap={5}>
            <Flex borderRadius="full" w={10} h={10} justifyContent="center" alignItems="center" fontWeight="bold" fontSize="3xl" bgColor="gray.100">{getInitialLetter({ name: name, })}</Flex>
            <Heading noOfLines={1} variant="h2" size="lg" fontWeight="300">{name}</Heading>
        </Link>
    )
}

export { FacultyCard }
