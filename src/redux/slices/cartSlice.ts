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
      const findItem: ReduxProduct | undefined = state.items.find((obj: ReduxProduct) => obj.id === action.payload.id);

      if (findItem) {
        // @ts-ignore
        findItem.count++;
      } else {
        // @ts-ignore
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj: ReduxProduct) => {
        return obj.price + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj: ReduxProduct) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    }
  }
});

export const { clearItems, removeItem, addItem } = cartSlice.actions;

export default cartSlice.reducer;
