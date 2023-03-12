import { Checkbox, Grid, Skeleton } from "@chakra-ui/react";
export function FilterItemSkeleton() {
  return <Grid templateColumns={{
    base: "repeat(1, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(1, 1fr)"
  }}>
    {[...Array(5)].map((_, i) => <Checkbox defaultChecked={true} colorScheme="pink" key={i}>
      <Skeleton h="24px" w={100} />
    </Checkbox>)}
  </Grid>;
}
