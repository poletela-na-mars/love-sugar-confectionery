import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from './asyncActions';

import { ProductsState } from './types';
import { Status } from '../../consts';

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

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
