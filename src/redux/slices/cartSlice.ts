import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../../types';
import { RootState } from '../store';

export interface ReduxProduct extends Product {
  count: number;
}

type InitialCartState = {
  totalPrice: number;
  items: ReduxProduct[];
}

const initialState: InitialCartState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj: ReduxProduct) => obj.id === action.payload.id)!;

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj: ReduxProduct) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj: ReduxProduct) => obj.id !== action.payload);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem: ReduxProduct = state.items.find((obj: ReduxProduct) => obj.id === action.payload)!;

      if (findItem) {
        if (findItem.count > 1) findItem.count--;
        else {
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

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: number) => (state: RootState) => state.cartSlice.items.find(
    (obj: ReduxProduct) => obj.id === id);

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
