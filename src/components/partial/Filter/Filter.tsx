import { Sport } from "@/interfaces/sport.interface";
import { Venue } from "@/interfaces/venue.interface";
import { useGetSportsQuery } from "@/services/sport";
import { useGetVenuesQuery } from "@/services/venue";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox, Flex, Heading, Icon, Skeleton, Stack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { IoFootball, IoLocationSharp } from "react-icons/io5";

export function Filter() {

    const { data: sports, isLoading: sportsLoading } = useGetSportsQuery();
    const { data: venues, isLoading: venuesLoading } = useGetVenuesQuery();

    return (
        <Accordion
            w={{
                md: 80,
            }}
            maxW="container.xl"
            bg="white"
            borderRadius={10}
            maxH={{
                base: "full",
                md: "calc(100vh - 260px)",
            }}
            position={{
                base: "initial",
                md: "sticky",
            }}
            top="238px"
            border="2px"
            borderColor="gray.100"
            overflow="auto"
            allowMultiple
            defaultIndex={[0, 1]}
        >
            <AccordionItem fontFamily="athiti">
                <AccordionButton py={5}>
                    <FilterHeader icon={IoFootball} title="ประเภทกีฬา" />
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={5}>
                    <Stack>
                        <FilterItems items={sports as Sport[]} isLoading={sportsLoading} />
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem fontFamily="athiti">
                <AccordionButton py={5}>
                    <FilterHeader title="สถานที่" />
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={5}>
                    <Stack>
                        <FilterItems items={venues as Venue[]} isLoading={venuesLoading} />
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

function FilterItems<T extends { name: string }>({ items, isLoading }: { items: T[], isLoading: boolean }) {

    if (isLoading || !items) return (
        <>
            {[...Array(5)].map((_, i) => (
                <Checkbox defaultChecked={true} colorScheme="pink" key={i}>
                    <Skeleton h="24px" w={100} />
                </Checkbox>
            ))}
        </>
    );

    return (
        <>
            {items.map(({ name }, idx) => (
                <Checkbox defaultChecked={true} colorScheme="pink" key={idx}>
                    {name}
                </Checkbox>
            ))}
        </>
    );
}

function FilterHeader({ title, icon }: { title: string; icon?: IconType }) {
    return (
        <>
            <Flex w="full">
                <Icon as={icon || IoLocationSharp} fontSize="2xl" mr={1} />
                <Heading as="h4" size="md">
                    {title}
                </Heading>
            </Flex>
        </>
    );
}
