import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ReduxProduct } from './cartSlice';
import { RootState } from '../store';
import { FetchProductsArgs } from '../../types';
import { Status } from '../../consts';

type ProductsState = {
  products: ReduxProduct[];
  status: Status;
}

export const fetchProducts = createAsyncThunk<ReduxProduct[], FetchProductsArgs>(
    'products/fetchProductsStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<ReduxProduct[]>(
          `https://648e2e662de8d0ea11e89b74.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
);

const initialState: ProductsState = {
  products: [],
  status: Status.LOADING,
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
      state.status = Status.LOADING;
      state.products = [];
    })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.products = action.payload;
          state.status = Status.SUCCESS;
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.status = Status.ERROR;
          state.products = [];
        })
  }
});

export const selectProducts = (state: RootState) => state.productsSlice;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
