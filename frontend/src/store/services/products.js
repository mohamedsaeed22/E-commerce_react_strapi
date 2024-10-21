import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieService from "../../services/cookieService";

const baseUrl = import.meta.env.VITE_SERVER_URL;
const populateParams = "populate[thumbnail]=*&populate[category]=*";
const pageSize = 10;

export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: ({ query, mutation }) => ({
    // ============= get =================
    getDashboardProducts: query({
      query: ({ page }) => ({
        url: `api/products?${populateParams}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // ============= delete =============
    deleteDashboardProduct: mutation({
      query: (id) => ({
        url: `api/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookieService.get("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    // ============= update =============
    updateDashboardProduct: mutation({
      query: ({ id, body }) => ({
        url: `api/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookieService.get("token")}`, // No Content-Type needed
        },
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            productsApiSlice.util.updateQueryData(
              "getDashboardProducts",
              { page: 1 },
              (draft) => {
                const index = draft.data.findIndex(
                  (product) => product.id === data.data.id
                );
                if (index !== -1) {
                  draft.data[index] = data.data;
                }
              }
            )
          );
        } catch (error) {
          console.error("Update failed: ", error);
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
} = productsApiSlice;
