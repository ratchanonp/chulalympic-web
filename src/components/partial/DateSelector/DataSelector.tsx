import RadioCard from "@/components/common/RadioCard/RadioCard";
import { dayOfWeekTHFormat, days, DDMMYYY_TH_FORMAT, monthTHFormat, today } from "@/mock/sport";
import { Flex, Text, useRadioGroup } from "@chakra-ui/react";

export function DateSelector() {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "date",
        defaultValue: DDMMYYY_TH_FORMAT.format(today),
        onChange: console.log,
    });

    const group = getRootProps();

    const sxHideScrollbar = {
        "&::-webkit-scrollbar": {
            display: "none",
        },
        "&::-webkit-scrollbar-track": {
            display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
            display: "none",
        },
    };

    return (
        <Flex justify="space-between" {...group} bgColor="white" borderRadius={10} p={5} mt={2} gap={1} overflowX="auto" position="sticky" top={0} border="2px" borderColor="gray.100">
            {days.map(day => {
                const radio = getRadioProps({
                    value: DDMMYYY_TH_FORMAT.format(day),
                });
                return (
                    <RadioCard key={day.toString()} {...radio}>
                        {dayOfWeekTHFormat.format(day)}
                        <Text fontSize="xl" fontWeight="bold">
                            {day.getDate()}
                        </Text>
                        {monthTHFormat.format(day)}
                    </RadioCard>
                );
            })}
        </Flex>
    );
}
