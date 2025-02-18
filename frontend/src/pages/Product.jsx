import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProductById = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate[thumbnail]=*&populate[category]=*&fields=title,price,description`
    );
    return data.data;
  };

  const {
    isLoading,
    data: product,
    error,
  } = useQuery(["products", id], getProductById);
  console.log(product)
  useEffect(() => {
    document.title = `${product?.title}`;
  }, [product]);

  if (isLoading)
    return (
      <>
        <ProductDetailsSkeleton />
      </>
    );

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  return (
    <Box m={10}>
      <Flex
        alignItems="center"
        gap={2}
        mb={4}
        cursor="pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
        <Text>Back</Text>
      </Flex>
      <Card maxW="sm">
        <CardBody>
          <Image
            mx="auto"
            objectFit="cover"
            borderRadius="full"
            boxSize="150px"
            src={`${import.meta.env.VITE_SERVER_URL}/${
              product?.thumbnail?.url
            }`}
            alt="Green double couch with wooden legs"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign="center">
              {product?.title}
            </Heading>
            <Text>{product?.description}</Text>
            <Text>{product?.category?.title}</Text>
            <Text color="blue.600" fontSize="2xl">
              {product?.price?.toLocaleString()}$
            </Text>
            <Button colorScheme="cyan" onClick={addToCartHandler}>
              Add to Cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Product;
