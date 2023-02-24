import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { IoFootball, IoLocationSharp } from "react-icons/io5";
import { sportTypes } from "../../../mock/sport";
import { venue } from "../../../mock/venue";

export function Filter() {
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
                        <FilterItems items={sportTypes} />
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
                        <FilterItems items={venue} />
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

function FilterItems({ items }: { items: string[] }) {
    return (
        <>
            {items.slice(0, 15).map(item => (
                <Checkbox defaultChecked={true} colorScheme="pink" key={item}>
                    {item}
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
