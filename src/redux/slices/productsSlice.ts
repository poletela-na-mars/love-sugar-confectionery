import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ReduxProduct } from './cartSlice';

export interface ProductsState {
  productsSlice: {
    products: ReduxProduct[],
    status: 'loading' | 'error' | 'success';
  },
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProductsStatus',
    async (params: { sortBy: string, order: string, category: string, search: string, currentPage: number }) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get(`https://648e2e662de8d0ea11e89b74.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);
      return data;
    }
);

const initialState = {
  products: [],
  status: 'loading',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, actions) {
      state.products = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
          state.products = [];
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.products = action.payload;
          state.status = 'success';
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.status = 'error';
          state.products = [];
        })
  }
});

export const selectProducts = (state: ProductsState) => state.productsSlice;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
