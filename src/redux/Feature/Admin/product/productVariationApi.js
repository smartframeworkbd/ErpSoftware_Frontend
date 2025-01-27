import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const productVariationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Product Variation
    addProductVariationApi: builder.mutation({
      query: (data) => ({
        url: "/product-variant/create",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('ProductVariation')
    }),

    // Get Product Variations
    getProductVariationApi: builder.query({
      query: () => ({
        url: "/product-variant",
      }),
      providesTags: getTagsByModuleName('ProductVariation')
    }),

    // Get Single Product Variation by ID
    getProductVariationApiById: builder.query({
      query: (id) => ({
        url: `/product-variant/${id}`,
      }),
      providesTags: getTagsByModuleName('ProductVariation')

    }),

    // Update Product Variation
    updateProductVariationApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-variant/update/${id}`,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('ProductVariation')

    }),

    // Delete Product Variation
    deleteProductVariationApi: builder.mutation({
      query: (id) => ({
        url: `/product-variant/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('ProductVariation')

    }),
  }),
});

export const {
  useAddProductVariationApiMutation,
  useGetProductVariationApiQuery,
  useGetProductVariationApiByIdQuery, 
  useUpdateProductVariationApiMutation,
  useDeleteProductVariationApiMutation,
} = productVariationApi;

export default productVariationApi;
