import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductsTableSkelton from "./ProductsTableSkelton";
import {
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
} from "../store/services/products";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaEye, FaEdit } from "react-icons/fa";
import MyAlert from "../components/shared/AlertDialog";
import MyModal from "./shared/MyModal";
import { useSelector } from "react-redux";

const DashboardProductsTable = () => {
  const { isOnline } = useSelector((state) => state.network);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(isOnline);
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();
  const [destroyProduct, { isLoading: isDeleted, isSuccess }] =
    useDeleteDashboardProductMutation();
  const [
    updatedProduct,
    { isLoading: isUpdated, isSuccess: isUpdatedSuccess },
  ] = useUpdateDashboardProductMutation();
  useEffect(() => {
    if (isSuccess) {
      setClickedProduct(null);
      onClose();
    }
    if (isUpdatedSuccess) {
      setClickedProduct(null);
      onModalClose();
    }
  }, [isSuccess, onClose, isUpdatedSuccess, onModalClose]);

  console.log(productToEdit);
  if (isLoading || !isOnline) return <ProductsTableSkelton />;

  const onChangeHandler = (eventOrValue, valueAsNumber) => {
    if (typeof eventOrValue === "object" && eventOrValue.target) {
      const { name, value } = eventOrValue.target;
      setProductToEdit({
        ...productToEdit,
        [name]: value,
      });
    } else {
      const name = eventOrValue;
      setProductToEdit({
        ...productToEdit,
        [name]: valueAsNumber,
      });
    }
  };

  const onChangeThumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
  };
  const onSubmitHandler = () => {
    const formData = new FormData();

    // Append the "data" object as JSON
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );

    //  if (thumbnail) {
    //   formData.append("files.thumbnail", thumbnail); // Add file under the correct key
    // }

    updatedProduct({ id: clickedProduct, body: formData });
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product) => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>{product?.title}</Td>
                <Td>{product?.category?.title}</Td>
                <Td>
                  <Image
                    borderRadius={"full"}
                    objectFit={"cover"}
                    w={50}
                    src={`${product?.thumbnail?.url}`}
                    alt={`${product?.attributes?.title}`}
                  />
                </Td>
                <Td isNumeric>$ {product?.price}</Td>
                <Td isNumeric>$ {product?.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product?.documentId}`}
                    colorScheme="purple"
                    variant="solid"
                    mr={3}
                    onClick={() => {}}
                  >
                    <FaEye />
                  </Button>

                  <Button
                    colorScheme="red"
                    variant="solid"
                    mr={3}
                    onClick={() => {
                      onOpen();
                      setClickedProduct(product.documentId);
                    }}
                  >
                    <FaRegTrashAlt />
                  </Button>

                  <Button
                    colorScheme="blue"
                    variant="solid"
                    mr={3}
                    onClick={() => {
                      setClickedProduct(product.documentId);
                      setProductToEdit(product);
                      onModalOpen();
                    }}
                  >
                    <FaEdit />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <MyAlert
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        isLoading={isDeleted}
        title="Are you sure?"
        description="you want to delete this product?"
        onOkHandler={() => {
          destroyProduct(clickedProduct);
        }}
      />
      <MyModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"update Product"}
        okText={"Update"}
        onOkClick={onSubmitHandler}
        isLoading={isUpdated}
      >
        <Stack>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Product title"
              name="title"
              value={productToEdit?.title}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Product Description"
              name="description"
              value={productToEdit?.description}
              onChange={onChangeHandler}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput
              precision={2}
              step={0.2}
              name="price"
              defaultValue={productToEdit?.price}
              onChange={(valueAsString, valueAsNumber) =>
                onChangeHandler("price", valueAsNumber)
              }
            >
              <NumberInputField placeholder="Product price" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Stock</FormLabel>
            <NumberInput
              defaultValue={productToEdit?.stock}
              name="stock"
              onChange={(valueAsString, valueAsNumber) =>
                onChangeHandler("stock", valueAsNumber)
              }
            >
              <NumberInputField placeholder="Count in stock" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              id="thumbnail"
              type="file"
              h="full"
              p={2}
              accept="image/png, image/gif, image/jpeg"
              onChange={onChangeThumbnailHandler}
            />
          </FormControl>
        </Stack>
      </MyModal>
    </>
  );
};

export default DashboardProductsTable;
