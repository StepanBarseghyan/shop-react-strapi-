import { api } from ".";
import { Product } from "../../types";
import { getProducts } from "../slices/products";

interface ImageFormats {
  thumbnail: { url: string };
  small: { url: string };
  medium: { url: string };
  large: { url: string };
}

interface ImageDataAttributes {
  name: string;
  width: number;
  height: number;
  formats: ImageFormats;
  url: string;
}

interface ImageData {
  id: number;
  attributes: ImageDataAttributes;
}

interface ProductAttributes {
  title: string;
  price: number;
  discountedPrice: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  imgUrl: ImageData;
}

interface DefaultProduct {
  id: number;
  attributes: ProductAttributes;
}

interface ProductResponse {
  data: DefaultProduct[];
  meta: any;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

interface ImageData {
  data: {
    id: number;
    attributes: ImageAttributes;
  };
}

type TransformedData = {
  products: Product[];
  meta: any;
};
export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<TransformedData, string>({
      query: (search = "") =>
        `/products?populate=*&filters[title][$contains]=${search}`,
      transformResponse: (response: ProductResponse) => {
        return {
          products: response.data.map((product) => ({
            id: product.id,
            title: product.attributes.title,
            price: product.attributes.price,
            discountedPrice: product.attributes.discountedPrice,
            imgUrl: product.attributes.imgUrl.data.attributes.url,
          })),
          meta: response.meta,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => dispatch(getProducts(data)));
      },
    }),
    getProductsTitles: builder.query<Pick<Product, "id" | "title">[], string>({
      query: (search = "") =>
        `/products?populate=*&filters[title][$contains]=${search}`,
      transformResponse: (response: ProductResponse) => {
        return response.data.map((product) => ({
          id: product.id,
          title: product.attributes.title,
        }));
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useLazyGetProductsTitlesQuery,
} = productsApi;
