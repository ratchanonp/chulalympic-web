import { useAppDispatch } from "@/hooks";
import { setValue } from "@/redux/features/filter/filterSlice";
import { Button } from "@chakra-ui/react";


interface Props {
  name: string;
  value: string;
}

export function OnlyBtn({
  name,
  value,
}: Props) {

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setValue({
      name,
      value: [value]
    }));
  };

  return <Button variant="outline" colorScheme="pink" onClick={onClick} size="xxs" fontSize="xs" px={0.5} opacity={1} _hover={{ opacity: 1 }}>
    only
  </Button>;
}
