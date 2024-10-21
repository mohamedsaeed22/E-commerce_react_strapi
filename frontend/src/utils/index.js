import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const addItemToShoppingCart = (cartItems = [], cartItemToAdd = {}) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    toast({
      title: "added to cart item",
      description: "the item already in cart , will increase quantity",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  toast({
    title: "added to your cart",
     status: "success",
    duration: 2000,
    isClosable: true,
  });
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
