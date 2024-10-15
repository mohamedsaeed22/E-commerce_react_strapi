import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";
const Products = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate[thumbnail]=*&populate[category]=*`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery(["products"], () =>
    getProductList()
  );

  if (isLoading)
    return (
      <Grid templateColumns="repeat(auto-fill, minmax(220px , 1fr))" gap={6}>
        {Array.from({ length: 3 }, (_, indx) => (
          <ProductSkeleton key={indx}/>
        ))}
      </Grid>
    );

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(220px , 1fr))" gap={6}>
      {data?.data.map((product) => (
        <ProductCard key={product._id} product={product} />
      )) || []}
    </Grid>
  );
};

export default Products;
