import { createSlice } from '@reduxjs/toolkit';

import { ReduxProduct } from './cartSlice';

export interface ProductsState {
  productsSlice: {
    products: ReduxProduct[],
  },
}

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, actions) {
      state.products = actions.payload;
    },
  }
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
