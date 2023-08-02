import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types';

export interface ReduxProduct extends Product {
  count: number,
}

export interface CartState {
  cartSlice: {
    totalPrice: number,
    items: ReduxProduct[],
  },
}

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem: ReduxProduct = state.items.find((obj: ReduxProduct) => obj.id === action.payload.id)!;

      if (findItem) {
        findItem.count++;
      } else {
        // difficulties with types
        // @ts-ignore
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj: ReduxProduct) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj: ReduxProduct) => obj.id !== action.payload);
    },
    minusItem(state, action) {
      const findItem: ReduxProduct = state.items.find((obj: ReduxProduct) => obj.id === action.payload)!;

      if (findItem) {
        if (findItem.count > 1) findItem.count--;
        else {
          console.log(action.payload)

          cartSlice.caseReducers.removeItem(state, action);
        }
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const selectCart = (state: CartState) => state.cartSlice;
export const selectCartItemById = (id: number) => (state: CartState) => state.cartSlice.items.find((obj: ReduxProduct) => obj.id === id);

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
