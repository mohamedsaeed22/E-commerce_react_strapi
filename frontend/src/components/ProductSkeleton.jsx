import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" rounded="lg" bg="gray.600">
      <SkeletonCircle size="40" mx="auto" />
      <SkeletonText mt="4" w={20} noOfLines={1} mx="auto" />
      <SkeletonText mt="4" spacing="4" />
      {/* <Flex justifyContent="space-between">
        <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" />
        <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" />
      </Flex> */}
      {/* <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" /> */}
      {/* <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" /> */}
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
    </Box>
  );
};

export default ProductSkeleton;
