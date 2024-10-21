import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {id,title,category,price, thumbnail } = product;
  const { colorMode } = useColorMode();
  console.log(product);
  return (
    <Card>
      <CardBody>
        <Image
          mx="auto"
          objectFit="cover"
          borderRadius="full"
          boxSize="150px"
          src={`${thumbnail?.url}`}
          alt="Green double couch with wooden legs"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center">
            {title}
          </Heading>
          <Text>{category?.title}</Text>
          <Text color="blue.600" fontSize="2xl">
            {price?.toLocaleString()}$
          </Text>
          <Button as={Link} to={`${product.documentId}`} colorScheme="cyan">
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
