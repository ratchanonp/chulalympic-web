import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDefault, setSports, setVenues } from "@/redux/features/filter/filterSlice";
import { useGetSportsQuery } from "@/services/sport";
import { useGetVenuesQuery } from "@/services/venue";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Icon, Stack
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { IoFootball, IoLocationSharp } from "react-icons/io5";
import { FilterItemSkeleton } from './FilterItemSkeleton';

export function Filter() {
  const { data: sports, isLoading: sportsLoading } = useGetSportsQuery();
  const { data: venues, isLoading: venuesLoading } = useGetVenuesQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sports && venues) {
      dispatch(setDefault({
        sports: sports.map(sport => sport.code),
        venues: venues.map(venue => String(venue.id)),
        faculty: []
      }))
    }
  }, [sports, venues])


  const { sports: selectedSports, venues: selectedVenues } = useAppSelector((state) => state.filter);
  const sportFilterList = useMemo(() => sports?.map(sport => ({ key: sport.code, value: sport.name })), [sports]);
  const venueFilterList = useMemo(() => venues?.map(venue => ({ key: String(venue.id), value: venue.name })), [venues]);


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "sport") {
      dispatch(setSports(value))
    }

    if (name === "venue") {
      dispatch(setVenues(value))
    }
  }

  return (
    <Accordion
      w={{
        lg: 80,
      }}
      maxW="container.xl"
      bg="white"
      borderRadius={10}
      maxH={{
        base: "full",
        lg: "calc(100vh - 260px)",
      }}
      position={{
        base: "initial",
        lg: "sticky",
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
            <FilterItems items={sportFilterList} checkedItems={selectedSports} isLoading={sportsLoading} name="sport" onChange={handleFilterChange} />
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
            <FilterItems items={venueFilterList} checkedItems={selectedVenues} isLoading={venuesLoading} name="venue" onChange={handleFilterChange} />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function FilterItems<T extends { name: string }>({
  items,
  isLoading,
  name,
  checkedItems,
  onChange
}: {
  name: string,
  items: { key: string, value: string }[] | undefined
  checkedItems: string[];
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (isLoading || !items)
    return (
      <FilterItemSkeleton />
    );


  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(1, 1fr)",
      }}>
      {items.map((val, idx) => {
        const isChecked = checkedItems.includes(val.key);
        return (<Checkbox isChecked={isChecked} name={name} colorScheme="pink" key={idx} onChange={onChange} value={val.key} >{val.value}</Checkbox>)
      })}
    </Grid >
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
