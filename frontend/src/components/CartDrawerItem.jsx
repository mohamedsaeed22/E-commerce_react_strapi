import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { removeFromCart } from "../store/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartDrawerItem = ({ product }) => {
  const { id, title, price, quantity, thumbnail } = product;
  const dispatch = useDispatch();
  return (
    <>
      <Flex alignItems="center" mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}/${thumbnail?.url}`}
          alt={title}
          w="80px"
          h="80px"
          rounded="full"
          objectFit="cover"
          mr={2}
        />
        <Stack>
          <Text fontSize="sm">{title}</Text>
          <Flex gap={3}>
            <Text fontSize="sm">Price: {price} $</Text> |
            <Text fontSize="sm">Quantity: {quantity}</Text>
          </Flex>
          <Button
            leftIcon={<DeleteIcon />}
            variant={"outline"}
            colorScheme="red"
            size="sm"
            w="full"
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
