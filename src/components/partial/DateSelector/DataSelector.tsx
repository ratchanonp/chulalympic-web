import RadioCard from "@/components/common/RadioCard/RadioCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { dayOfWeekTHFormat, DDMMYYY_TH_FORMAT, monthTHFormat } from "@/mock/sport";
import { setDate } from "@/redux/features/filter/filterSlice";
import { useGetDatesQuery } from "@/services/games";
import { Flex, Text, useRadioGroup } from "@chakra-ui/react";
import { DateSelectorLoading } from "./DataSelector.loading";

export function DateSelector() {

    let { date: selectDate } = useAppSelector((state) => state.filter)
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetDatesQuery();

    const radioGroup = useRadioGroup({
        name: "date",
        defaultValue: DDMMYYY_TH_FORMAT.format(new Date()),
        onChange: (value) => {
            dispatch(setDate(new Date(value)));
        },
    });

    const { getRootProps, getRadioProps, setValue, value } = radioGroup;
    const group = getRootProps();


    if (isLoading || error || !data) return <DateSelectorLoading />

    const dates = data.map(date => new Date(date));
    selectDate = dates.find(date => date >= selectDate) || dates.find(date => date <= selectDate) || dates[0];


    if (value !== DDMMYYY_TH_FORMAT.format(selectDate)) {
        setValue(DDMMYYY_TH_FORMAT.format(selectDate));
    }


    return (
        <Flex justify="space-between" {...group} bgColor="white" borderRadius={10} p={5} mt={2} gap={5} overflowX="auto" position="sticky" top={0} border="2px" borderColor="gray.100" >
            {
                dates.map(day => {
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
                })
            }
        </Flex >
    );
}
