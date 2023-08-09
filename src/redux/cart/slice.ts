import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

import { InitialCartState } from './types';
import { CartProduct } from '../../types';

const initialState: InitialCartState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartProduct>) {
      const findItem = state.items.find(
          (obj: CartProduct) => obj.id === action.payload.id && obj.types === action.payload.types)!;

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items =
          state.items.filter((obj: CartProduct) => obj.id !== action.payload.id || obj.types !== action.payload.types);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action) {
      const findItem = state.items.find(
          (obj: CartProduct) => obj.id === action.payload.id && obj.types === action.payload.types)!;

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
          state.totalPrice = calcTotalPrice(state.items);
        } else {
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

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
