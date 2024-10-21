import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onCloseCartDrawer } from "../store/global/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart } from "../store/cart/cartSlice";

const CartDrawer = () => {
  const btnRef = React.useRef();
  const { isOpenCartDrawer } = useSelector((state) => state.global);
  const { cartProducts } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={() => {
        dispatch(onCloseCartDrawer());
      }}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart </DrawerHeader>

        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map((product) => (
              <CartDrawerItem key={product.id} product={product} />
            ))
          ) : (
            <Text>Cart is empty</Text>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="red"
            variant="outline"
            mr={3}
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
