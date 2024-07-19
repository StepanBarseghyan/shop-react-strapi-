import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DataType, Product } from "../../types";

const initialState: DataType = { products: [], meta: null };
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, { payload }: PayloadAction<any>) => {
      return payload;
    },
  },
});

export const { getProducts } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
