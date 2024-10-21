import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";

const ProductsTableSkelton = () => {
  return (
    <Stack>
      {Array.from({ length: 4 }, (_, indx) => (
        <Flex
          key={indx}
          alignItems="center"
          justifyContent="space-between"
          border="1px solid #333"
          h="50px"
          rounded={"md"}
          p={2}
        >
          <Skeleton h={"9px"} w={120} bg={"gray"} />
          <Skeleton h={"9px"} w={120} bg={"gray"} />
          <Skeleton h={"9px"} w={120} bg={"gray"} />
          <Skeleton h={"9px"} w={120} bg={"gray"} />
          <Flex>
            <Skeleton
              h={30}
              w={50}
              startColor="red.300"
              endColor="red.500"
              mr={4}
              bg={"gray"}
            />
            <Skeleton
              h={30}
              w={50}
              startColor="red.300"
              endColor="red.500"
              mr={4}
              bg={"gray"}
            />
          </Flex>
        </Flex>
      ))}
      <Box>
        <Skeleton h={15} w={250} bg={"gray"} mx={"auto"} />
      </Box>
    </Stack>
  );
};

export default ProductsTableSkelton;
